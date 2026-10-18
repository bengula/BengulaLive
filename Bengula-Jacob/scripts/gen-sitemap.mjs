// Post-build: generate dist/sitemap.xml from the prerendered HTML pages, so the
// sitemap always matches exactly what was built (static routes + every article
// + every author).
//
// `lastmod` for an article URL is its own publication date, not the build date.
// Stamping today's date on all 20 articles every deploy told crawlers the whole
// archive had changed, which is noise that devalues the signal.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { readArticles } from "./lib/readArticles.mjs";

const SITE = "https://bengula.co.ke";
const DIST = "dist";

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (name.endsWith(".html")) files.push(p);
  }
  return files;
}

const articleDates = new Map(readArticles().map((a) => [`blog/${a.id}`, a.dateIso]));
const today = new Date().toISOString().slice(0, 10);

const urls = walk(DIST)
  .map((f) => f.slice(DIST.length + 1).replace(/\\/g, "/").replace(/\.html$/, ""))
  .filter((rel) => rel !== "404")
  .map((rel) => ({
    loc: rel === "index" ? `${SITE}/` : `${SITE}/${rel}`,
    lastmod: articleDates.get(rel) ?? today,
  }));

const unique = [...new Map(urls.map((u) => [u.loc, u])).values()].sort((a, b) =>
  a.loc.localeCompare(b.loc)
);

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  // Cosmetic only: renders the sitemap as a branded page in browsers.
  // Crawlers ignore the stylesheet and parse the XML directly.
  `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  unique
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`)
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(join(DIST, "sitemap.xml"), xml);
console.log(`sitemap.xml: ${unique.length} urls (${articleDates.size} dated from article frontmatter)`);
