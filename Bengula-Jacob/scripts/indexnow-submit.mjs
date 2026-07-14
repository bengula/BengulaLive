// Submit new/changed article URLs to IndexNow (shared endpoint feeds Bing,
// Yandex, Seznam, etc.). Triggered by the .github/workflows/indexnow.yml
// workflow on push to main when content/**/*.md changes.
//
// Flow:
//   1. Diff the pushed commits for added/modified article markdown.
//   2. Resolve each file's frontmatter `id:` to its /blog/<id> URL.
//   3. Wait until each URL is actually LIVE as a prerendered page (not the
//      SPA fallback, which returns 200 for any path), then submit.
//
// Auth is the key file at the site root (public/<key>.txt), so no secrets.
//
// Env:
//   BASE_SHA, HEAD_SHA  the push range (github.event.before / github.sha)
//   DRY_RUN=1           print the payload instead of POSTing
//   SKIP_WAIT=1         skip the liveness poll (useful for local runs)

import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const SITE = "https://bengula.co.ke";
const HOST = "bengula.co.ke";
const KEY = "68a7e10a854049a6863d70c87209620d";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const CONTENT_DIR = "Bengula-Jacob/content";

const zero = (s) => !s || /^0+$/.test(s);
const HEAD = process.env.HEAD_SHA || "HEAD";
const BASE = zero(process.env.BASE_SHA) ? `${HEAD}~1` : process.env.BASE_SHA;

function git(cmd) {
  return execSync(`git ${cmd}`, { encoding: "utf8" });
}

function changedFiles() {
  // --diff-filter=d keeps Added/Modified/Renamed, drops Deleted.
  try {
    return git(`diff --name-only --diff-filter=d ${BASE} ${HEAD} -- ${CONTENT_DIR}`)
      .split("\n").map((s) => s.trim()).filter(Boolean);
  } catch {
    // BASE not in history (first push, shallow clone): fall back to HEAD's own diff.
    return git(`show --name-only --diff-filter=d --pretty=format: ${HEAD} -- ${CONTENT_DIR}`)
      .split("\n").map((s) => s.trim()).filter(Boolean);
  }
}

function idFor(file) {
  if (!file.endsWith(".md")) return null;
  if (file.includes("/content/insights/")) return null;       // insights aren't /blog routes
  if ((file.split("/").pop() || "").startsWith("_")) return null; // templates
  if (!existsSync(file)) return null;
  const fm = readFileSync(file, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const m = fm[1].match(/^id:\s*["']?([^"'\r\n]+?)["']?\s*$/m);
  return m ? m[1].trim() : null;
}

async function fetchText(url) {
  try {
    const r = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(10000) });
    return r.ok ? await r.text() : "";
  } catch {
    return "";
  }
}

// A prerendered article page carries its own canonical/og:url ending in the id;
// the SPA fallback (served with 200 for undeployed paths) does not. So we poll
// for that marker, which distinguishes "really deployed" from "200 shell".
async function waitLive(idUrls, rounds = 12, delayMs = 30000) {
  const pending = new Map(idUrls); // url -> id
  for (let r = 0; r < rounds && pending.size; r++) {
    for (const [url, id] of [...pending]) {
      const html = await fetchText(url);
      if (html.includes(`/blog/${id}"`)) pending.delete(url);
    }
    if (pending.size && r < rounds - 1) await new Promise((res) => setTimeout(res, delayMs));
  }
  return [...pending.keys()]; // never confirmed live
}

async function main() {
  const ids = [...new Set(changedFiles().map(idFor).filter(Boolean))];
  if (ids.length === 0) {
    console.log("IndexNow: no changed article pages in this push.");
    return;
  }

  const articleUrls = ids.map((id) => [`${SITE}/blog/${id}`, id]);
  console.log(`IndexNow: ${ids.length} changed article(s):`);
  for (const [url] of articleUrls) console.log(`  ${url}`);

  if (!process.env.SKIP_WAIT && !process.env.DRY_RUN) {
    const notLive = await waitLive(new Map(articleUrls));
    if (notLive.length) {
      console.log(`IndexNow: ${notLive.length} URL(s) not confirmed live within the wait window; submitting anyway (IndexNow re-crawls).`);
    }
  }

  // Aggregate pages that also change when an article is added or edited.
  const urlList = [...new Set([...articleUrls.map(([u]) => u), `${SITE}/blog`, `${SITE}/`])];
  const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

  if (process.env.DRY_RUN) {
    console.log("IndexNow DRY_RUN payload:\n" + JSON.stringify(payload, null, 2));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const ok = res.status === 200 || res.status === 202; // 202 = accepted, key validation pending
  console.log(`IndexNow: submitted ${urlList.length} URL(s) -> HTTP ${res.status}${ok ? " (accepted)" : ""}`);
  if (!ok) {
    console.log(await res.text().catch(() => ""));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("IndexNow submit failed:", e);
  process.exit(1);
});
