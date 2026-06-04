import fs from "node:fs/promises";

const outFile = new URL("../src/data/articles/bengula-legacy-archive.ts", import.meta.url);

const authorBlock = `const author = {
  name: "Bengula Jacob",
  role: "Founder, Bengula Inc",
  avatar: "/images/jacob.jpg",
};`;

const linkedInEntries = [
  {
    id: "linkedin-mica-regulation-overview",
    title: "MiCA Regulation Overview",
    summary:
      "A Bengula Inc LinkedIn post on the European crypto-asset regulatory framework and its relevance to digital finance literacy.",
    category: "Digital Strategy",
    date: "May 3, 2026",
    readTime: "2 min source note",
    content: `### MiCA Regulation Overview

The public LinkedIn record identifies this Bengula Inc update as an overview of MiCA regulation. Because LinkedIn does not expose the full post body to public unauthenticated requests, this entry preserves the public record and source URL.

MiCA, the Markets in Crypto-Assets framework, is relevant to digital finance education because it shows how regulators are approaching token issuance, service providers, market conduct, and consumer protection in crypto-asset markets.

#### Why It Matters
- Digital asset literacy is no longer only about trading mechanics.
- Regulation shapes which platforms, tokens, and services can operate professionally.
- Investors and businesses need to distinguish speculation from compliant market infrastructure.

Original source: https://www.linkedin.com/posts/bengula-inc_mica-regulation-overview-activity-7456682380087599104-Mh8I`,
  },
  {
    id: "linkedin-how-to-trade-bitcoins",
    title: "How To Trade Bitcoins",
    summary:
      "A Bengula Inc LinkedIn post connected to crypto trading education and digital asset market awareness.",
    category: "Digital Strategy",
    date: "May 3, 2026",
    readTime: "2 min source note",
    content: `### How To Trade Bitcoins

The public LinkedIn record identifies this Bengula Inc update as a Bitcoin trading explainer. Because LinkedIn does not expose the full post body to public unauthenticated requests, this entry preserves the public record and source URL.

Bitcoin trading education should start with risk, custody, liquidity, volatility, and platform selection before discussing entries or exits. The point is not merely how to buy or sell, but how to understand the market structure around the asset.

#### Practical Learning Areas
- Market volatility and position sizing.
- Spot trading versus leveraged products.
- Wallet custody and exchange risk.
- Regulatory awareness before transacting.

Original source: https://www.linkedin.com/posts/bengula-inc_how-to-trade-bitcoins-activity-7456678309825830913-qp8P`,
  },
  {
    id: "bengula-inc-linkedin-company-profile",
    title: "Bengula Inc Company Profile",
    summary:
      "The public LinkedIn company profile describes Bengula Inc as a data, digital business, SEO, and online growth advisory brand.",
    category: "Digital Strategy",
    date: "June 2026",
    readTime: "3 min profile",
    content: `### Bengula Inc on LinkedIn

LinkedIn lists Bengula Inc with the slogan **Adding meaning to life** and describes the company as a digital business support brand focused on data, online services, SEO, market insight, lead generation, and sales conversion.

The profile positions Bengula Inc around a practical thesis: businesses that use data and put services online are better placed to survive fast market change.

#### Public Profile Signals
- Listed location: Malindi, Coast, Kenya
- Public follower count observed: 467 followers
- Public company size signal: 2 employees
- Brand focus: data analysis, SEO, online marketing, business insights, lead conversion

Original source: https://ke.linkedin.com/company/bengula-inc`,
  },
];

const waybackSources = [
  {
    url: "https://web.archive.org/web/20220206235253/https://bengula.co.ke/wp-json/wp/v2/posts/462",
    category: "Legacy Archive",
  },
  {
    url: "https://web.archive.org/web/20220206235206/https://bengula.co.ke/wp-json/wp/v2/posts/555",
    category: "Wealth Optimization",
  },
];

const waybackHtmlSources = [
  {
    url: "https://web.archive.org/web/20220206235210/https://bengula.co.ke/2022/01/31/how-to-make-cocoa-butter-soap/",
    id: "archive-how-to-make-cocoa-butter-soap",
    title: "How to Make Cocoa Butter Soap",
    summary: "A recovered old-domain article about making handmade cocoa butter soap at home.",
    category: "Legacy Archive",
    date: "January 31, 2022",
  },
  {
    url: "https://web.archive.org/web/20220609200138/https://bengula.co.ke/2022/06/09/a-to-z-of-customer-avators-buyer-persona-creation/",
    id: "archive-customer-avatars-buyer-persona",
    title: "A to Z of Customer Avatars: Buyer Persona Creation",
    summary: "An archived bengula.co.ke marketing article about customer avatars and buyer persona creation.",
    category: "Digital Strategy",
    date: "June 9, 2022",
  },
];

const categoryMap = {
  "7 Reasons to Start Vaping": "Legacy Archive",
  "3 Reasons To Hire a Divorce Lawyer": "Legacy Archive",
  "John Sauter Tackling Each Day a Time": "Legacy Archive",
  "Do septic tanks smell": "Legacy Archive",
  "Getting a Real Estate License in Vermont": "Real Estate",
  "After the Hire: How to Get Started with Your Virtual Assistant": "SME Trade Finance",
  "How Much Does It Cost To Start A Roofing Company?": "SME Trade Finance",
  "Roofing Forum: A Place for Professional Roofing Discussions": "SME Trade Finance",
  "4 Types of Sewer Linings for Cracked Pipes": "Legacy Archive",
  "5 Top Reasons Why You Need a Broker in Getting  a Plumbing Insurance": "SME Trade Finance",
};

function decodeHtml(value = "") {
  return value
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&quot;/g, '"')
    .replace(/&#215;/g, "x")
    .replace(/â€™/g, "'")
    .replace(/â€˜/g, "'")
    .replace(/â€œ|â€�/g, '"')
    .replace(/â€¦/g, "...")
    .replace(/â€“|â€”/g, "-")
    .replace(/â€/g, '"')
    .replace(/<span class="screen-reader-text">.*?<\/span>/gis, "")
    .replace(/<a[^>]*class="more-link"[^>]*>.*?<\/a>/gis, "");
}

function stripTags(value = "") {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function readableDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function summaryFrom(description, content) {
  const text = stripTags(description || content)
    .replace(/Continue reading.*$/i, "")
    .trim();
  return text.length > 190 ? `${text.slice(0, 187).trim()}...` : text || "A recovered Bengula Inc legacy article.";
}

function markdownFromHtml(html = "") {
  let text = decodeHtml(html);

  text = text
    .replace(/<figcaption[\s\S]*?<\/figcaption>/gi, "")
    .replace(/<img[^>]+(?:data-image-title|data-image-caption|data-medium-file|data-large-file|data-lazy-srcset|data-recalc-dims)[\s\S]*?>/gi, "");

  text = text.replace(/<figure[\s\S]*?<img[^>]+src=["']([^"']+)["'][^>]*>[\s\S]*?(?:<figcaption[^>]*>([\s\S]*?)<\/figcaption>)?[\s\S]*?<\/figure>/gi, (_m, src, caption) => {
    const cap = stripTags(caption || "");
    return `\n\n![Article image](${src}${cap ? ` "${cap.replace(/"/g, "'")}"` : ""})\n\n`;
  });

  text = text.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, (_m, src) => `\n\n![Article image](${src})\n\n`);
  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_m, body) => `\n\n### ${stripTags(body)}\n\n`);
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_m, body) => `\n\n### ${stripTags(body)}\n\n`);
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_m, body) => `\n\n#### ${stripTags(body)}\n\n`);
  text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_m, body) => `\n\n#### ${stripTags(body)}\n\n`);
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, body) => `\n- ${stripTags(body)}`);
  text = text.replace(/<\/(?:ul|ol)>/gi, "\n\n");
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_m, body) => {
    const paragraph = stripTags(body);
    return paragraph ? `\n\n${paragraph}\n\n` : "\n\n";
  });
  text = stripTags(text)
    .replace(/","created_timestamp":"0"[\s\S]*?(?:data-recalc-dims="1"\/?>|srcset="[^"]*">)/gi, "")
    .replace(/\b(?:data-image-title|data-image-caption|data-medium-file|data-large-file|data-lazy-srcset|data-lazy-sizes|data-lazy-src|srcset|sizes|class|width|height|alt|src)="[^"]*"/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\s*-\s*/gm, "- ")
    .trim();

  return text;
}

function extractArticleHtml(html = "") {
  const article = html.match(/<article[\s\S]*?<\/article>/i)?.[0] || html;
  const content =
    article.match(/<div[^>]+class=["'][^"']*(?:entry-content|nv-content-wrap)[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*(?:<\/div>\s*)?(?:<\/article>)?/i)?.[1] ||
    article.match(/<div[^>]+class=["'][^"']*content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1] ||
    article;

  return content
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<aside[\s\S]*?<\/aside>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
}

function extractItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml))) {
    const item = match[1];
    const get = (tag) => {
      const m = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
      return decodeHtml(m?.[1] || "");
    };
    const content = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i)?.[1] || "";
    items.push({
      title: stripTags(get("title")),
      link: stripTags(get("link")),
      pubDate: stripTags(get("pubDate")),
      description: get("description"),
      content,
    });
  }
  return items;
}

function toEntry(entry) {
  const content = entry.source ? `${entry.content}\n\nOriginal source: ${entry.source}` : entry.content;
  return `  {
    id: ${JSON.stringify(entry.id)},
    title: ${JSON.stringify(entry.title)},
    summary: ${JSON.stringify(entry.summary)},
    category: ${JSON.stringify(entry.category)},
    author,
    date: ${JSON.stringify(entry.date)},
    readTime: ${JSON.stringify(entry.readTime)},
    content: ${JSON.stringify(content.trim())},
  }`;
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

const feedXml = await fetchText("https://bengulish.wordpress.com/feed/");
const rssEntries = extractItems(feedXml).map((item) => {
  const content = markdownFromHtml(item.content);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    id: `bengulish-${slugify(item.title)}`,
    title: item.title,
    summary: summaryFrom(item.description, content),
    category: categoryMap[item.title] || "Legacy Archive",
    date: readableDate(item.pubDate),
    readTime: `${Math.max(3, Math.round(words / 220))} min read`,
    content,
    source: item.link,
  };
});

const waybackEntries = [];
for (const item of waybackSources) {
  const json = JSON.parse(await fetchText(item.url));
  const content = markdownFromHtml(json.content?.rendered || "");
  const words = content.split(/\s+/).filter(Boolean).length;
  waybackEntries.push({
    id: `archive-${json.slug}`,
    title: stripTags(json.title?.rendered || ""),
    summary: stripTags(json.yoast_head_json?.description || json.excerpt?.rendered || "").replace(/\s+/g, " "),
    category: item.category,
    date: readableDate(json.date_gmt || json.date),
    readTime: `${Math.max(3, Math.round(words / 220))} min read`,
    content,
    source: item.url,
  });
}

for (const item of waybackHtmlSources) {
  const html = await fetchText(item.url);
  const content = markdownFromHtml(extractArticleHtml(html));
  const words = content.split(/\s+/).filter(Boolean).length;
  waybackEntries.push({
    id: item.id,
    title: item.title,
    summary: item.summary,
    category: item.category,
    date: item.date,
    readTime: `${Math.max(3, Math.round(words / 220))} min read`,
    content: content || `### ${item.title}\n\nThis archived page was recovered from Wayback, but the article body could not be extracted cleanly.`,
    source: item.url,
  });
}

const allEntries = [...linkedInEntries, ...rssEntries, ...waybackEntries];

const output = `import { BlogPost } from "../../types";

${authorBlock}

export const bengulaLegacyArchive: BlogPost[] = [
${allEntries.map(toEntry).join(",\n")}
];
`;

await fs.writeFile(outFile, output, "utf8");
console.log(`Wrote ${allEntries.length} legacy archive entries.`);
