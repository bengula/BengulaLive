// Scrape the CBK "Key Rates" box from https://www.centralbank.go.ke/forex/ and
// write data/key-rates.csv. Runs server-side (no CORS), so it works in CI.
//
// Used by the scheduled GitHub Action (.github/workflows/update-cbk-rates.yml);
// you can also run it locally:  node scripts/scrape-cbk-rates.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const URL = "https://www.centralbank.go.ke/forex/";

const res = await fetch(URL, { headers: { "User-Agent": "Mozilla/5.0 (compatible; BengulaRatesBot/1.0)" } });
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
const out = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "key-rates.csv");
writeFileSync(out, csv);

console.log(`Wrote ${rows.length} key rates to data/key-rates.csv:`);
for (const r of rows) console.log(`  ${r.name.padEnd(22)} ${r.value.padEnd(9)} ${r.date}`);
