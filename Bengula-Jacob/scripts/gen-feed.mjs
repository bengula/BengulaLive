// Post-build: write dist/rss.xml (RSS 2.0) and dist/feed.json (JSON Feed 1.1)
// from the article vault, so readers and aggregators can subscribe.
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { readArticles } from "./lib/readArticles.mjs";

const SITE = "https://bengula.co.ke";
const DIST = "dist";
const TITLE = "Bengula Inc — Financial Education Hub";
const DESCRIPTION =
  "Practical notes on Kenyan treasury bonds, MMFs, SACCOs, SME trade finance, real estate, and using data to grow.";

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]);

/** RSS requires RFC-822; the date is a bare calendar day, so anchor it at UTC noon. */
const rfc822 = (iso) => new Date(`${iso}T12:00:00Z`).toUTCString();

const articles = readArticles();
const latest = articles[0]?.dateIso;

const rss =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
  `<channel>\n` +
  `  <title>${escapeXml(TITLE)}</title>\n` +
  `  <link>${SITE}/blog</link>\n` +
  `  <description>${escapeXml(DESCRIPTION)}</description>\n` +
  `  <language>en</language>\n` +
  `  <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />\n` +
  (latest ? `  <lastBuildDate>${rfc822(latest)}</lastBuildDate>\n` : "") +
  articles
    .map(
      (a) =>
        `  <item>\n` +
        `    <title>${escapeXml(a.title)}</title>\n` +
        `    <link>${SITE}/blog/${a.id}</link>\n` +
        `    <guid isPermaLink="true">${SITE}/blog/${a.id}</guid>\n` +
        `    <description>${escapeXml(a.summary)}</description>\n` +
        `    <category>${escapeXml(a.category)}</category>\n` +
        `    <author>${escapeXml(a.author?.name ?? "Bengula Inc")}</author>\n` +
        `    <pubDate>${rfc822(a.dateIso)}</pubDate>\n` +
        `  </item>`
    )
    .join("\n") +
  `\n</channel>\n</rss>\n`;

const jsonFeed = {
  version: "https://jsonfeed.org/version/1.1",
  title: TITLE,
  home_page_url: `${SITE}/blog`,
  feed_url: `${SITE}/feed.json`,
  description: DESCRIPTION,
  language: "en",
  items: articles.map((a) => ({
    id: `${SITE}/blog/${a.id}`,
    url: `${SITE}/blog/${a.id}`,
    title: a.title,
    summary: a.summary,
    date_published: `${a.dateIso}T12:00:00Z`,
    tags: [a.category, ...a.keywords],
    authors: [{ name: a.author?.name ?? "Bengula Inc" }],
  })),
};

writeFileSync(join(DIST, "rss.xml"), rss);
writeFileSync(join(DIST, "feed.json"), `${JSON.stringify(jsonFeed, null, 2)}\n`);
console.log(`rss.xml + feed.json: ${articles.length} items`);
