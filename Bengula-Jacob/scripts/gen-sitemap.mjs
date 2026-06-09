// Post-build: generate dist/sitemap.xml from the prerendered HTML pages, so the
// sitemap always matches exactly what was built (static routes + every article
// + every author).
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

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

const urls = walk(DIST)
  .map((f) => f.slice(DIST.length + 1).replace(/\\/g, "/").replace(/\.html$/, ""))
  .filter((rel) => rel !== "404")
  .map((rel) => (rel === "index" ? `${SITE}/` : `${SITE}/${rel}`));

const unique = [...new Set(urls)].sort();
const today = new Date().toISOString().slice(0, 10);

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  unique.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
  `\n</urlset>\n`;

writeFileSync(join(DIST, "sitemap.xml"), xml);
console.log(`sitemap.xml: ${unique.length} urls`);
