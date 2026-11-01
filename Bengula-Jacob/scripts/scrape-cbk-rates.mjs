// Scrape Central Bank of Kenya rates and refresh the CSVs the ticker is built from:
//   • data/key-rates.csv — the "Key Rates" box on https://www.centralbank.go.ke/forex/
//   • data/forex.csv     — the latest day of CBK indicative exchange rates
// Runs server-side (no CORS), so it works in CI.
//
// Used by the scheduled GitHub Action (.github/workflows/update-cbk-rates.yml);
// you can also run it locally:  node scripts/scrape-cbk-rates.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const URL = "https://www.centralbank.go.ke/forex/";
// The "Indicative Exchange Rates" table on that page (wpDataTables id 193) loads
// its rows from this endpoint. Columns: Date (dd/mm/yyyy), Currency, EXCHANGE RATE.
const FX_AJAX = "https://www.centralbank.go.ke/wp-admin/admin-ajax.php?action=get_wdtable&table_id=193";
const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; BengulaRatesBot/1.0)" };
const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "data");

async function scrapeKeyRates() {
  const res = await fetch(URL, { headers: HEADERS });
  if (!res.ok) throw new Error(`CBK fetch failed: HTTP ${res.status}`);
  const html = await res.text();

  const start = html.indexOf("Key Rates");
  if (start < 0) throw new Error('"Key Rates" section not found — page structure may have changed');

  // The box is a table: [Name, Value%, Date] triplets. Strip tags to a cell list.
  const cells = html
    .slice(start, start + 2600)
    .replace(/<[^>]+>/g, "│")
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+/g, " ")
    .split("│")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(1); // drop the "Key Rates" heading cell

  const VALUE = /^\d+(?:\.\d+)?%$/;
  const rows = [];
  const seen = new Set();
  for (let n = 0; n + 2 < cells.length; n += 3) {
    const [name, value, date] = [cells[n], cells[n + 1], cells[n + 2]];
    if (!VALUE.test(value)) break; // left the rates block
    const key = name.toLowerCase();
    if (seen.has(key)) break; // hit the duplicate KESONIA rows that follow KBRR
    seen.add(key);
    rows.push({ name, value, date: date.replace(/,/g, " ").trim() });
  }

  if (rows.length < 5) {
    throw new Error(`Only parsed ${rows.length} rates — aborting so we don't overwrite with junk`);
  }

  const csv = "Name,Value,Date\n" + rows.map((r) => `${r.name},${r.value},${r.date}`).join("\n") + "\n";
  writeFileSync(join(DATA_DIR, "key-rates.csv"), csv);

  console.log(`Wrote ${rows.length} key rates to data/key-rates.csv:`);
  for (const r of rows) console.log(`  ${r.name.padEnd(22)} ${r.value.padEnd(9)} ${r.date}`);
}

// dd/mm/yyyy -> sortable yyyymmdd number
const dayKey = (d) => {
  const [dd, mm, yyyy] = d.split("/").map(Number);
  return yyyy * 10000 + mm * 100 + dd;
};

async function scrapeForex() {
  // DataTables server-side request: newest dates first, enough rows to cover a full day.
  const body = new URLSearchParams({
    draw: "1",
    start: "0",
    length: "100",
    "order[0][column]": "0",
    "order[0][dir]": "desc",
    "search[value]": "",
  });
  for (const i of [0, 1, 2]) {
    body.set(`columns[${i}][data]`, String(i));
    body.set(`columns[${i}][orderable]`, "true");
    body.set(`columns[${i}][searchable]`, "true");
  }

  const res = await fetch(FX_AJAX, { method: "POST", headers: HEADERS, body });
  if (!res.ok) throw new Error(`CBK forex fetch failed: HTTP ${res.status}`);
  const json = await res.json();
  const all = (json.data ?? []).filter(
    (r) => Array.isArray(r) && /^\d{2}\/\d{2}\/\d{4}$/.test(r[0]) && r[1] && Number.isFinite(Number(r[2])),
  );
  if (!all.length) throw new Error("CBK forex response had no usable rows");

  const latest = all.reduce((a, r) => (dayKey(r[0]) > dayKey(a) ? r[0] : a), all[0][0]);
  const rows = all.filter((r) => r[0] === latest);
  if (rows.length < 15 || !rows.some((r) => r[1] === "US DOLLAR")) {
    throw new Error(`Only parsed ${rows.length} FX rates for ${latest} — aborting so we don't overwrite with junk`);
  }

  // Keep the currency order already used in forex.csv (it sets the ticker order);
  // anything new goes at the end.
  const path = join(DATA_DIR, "forex.csv");
  let existing = "";
  try {
    existing = readFileSync(path, "utf8");
  } catch {
    // first run: no file yet
  }
  const prev = existing
    .replace(/^﻿/, "")
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => line.replace(/^"|"$/g, "").split('","'))
    .filter((cols) => cols.length === 3);
  const prevDate = prev[0]?.[0];
  if (prevDate && dayKey(prevDate) > dayKey(latest)) {
    console.log(`forex.csv already has newer rates (${prevDate}) than CBK returned (${latest}); leaving it.`);
    return;
  }
  const order = prev.map((c) => c[1]);
  const rank = (c) => (order.includes(c) ? order.indexOf(c) : order.length);
  rows.sort((a, b) => rank(a[1]) - rank(b[1]));

  const csv =
    '"Date","Currency","EXCHANGE RATE"\n' +
    rows.map(([d, c, r]) => `"${d}","${c}","${Number(r).toFixed(4)}"`).join("\n") +
    "\n";
  writeFileSync(path, csv);

  console.log(`Wrote ${rows.length} FX rates for ${latest} to data/forex.csv:`);
  for (const [, c, r] of rows) console.log(`  ${c.padEnd(22)} ${r}`);
}

// Run both; one source failing shouldn't stop the other from updating,
// but the job still fails so a broken scrape is visible in the Actions tab.
let failed = false;
for (const [name, job] of [
  ["key rates", scrapeKeyRates],
  ["forex", scrapeForex],
]) {
  try {
    await job();
  } catch (err) {
    failed = true;
    console.error(`✗ ${name}: ${err.message}`);
  }
}
if (failed) process.exitCode = 1;
