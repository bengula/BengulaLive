import { writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

const categoryFolderMap: Record<string, string> = {
  // Main articles
  "kb-bond-guide-2026": "investing",
  "future-mmfs-kenya": "investing",
  "sme-trade-finance": "business-trade",
  "sovereign-debt-masterclass": "economy-policy",
  "tea-cooperative-restructure": "business-trade",
  "kikuyu-ridge-syndicate": "investing",
  "zindua-agri-logistics": "business-trade",
  "sleeping-asset-optimization": "investing",
  "sme-packager-optimization": "business-trade",
  "kikuyu-ridge-infrastructure": "investing",
  "agri-export-supply-chain": "investing",
  "fintech-agri-cooling": "technology",
  "east-african-sovereign-summit": "economy-policy",
  "sacco-savers-guarantors": "banking-credit",

  // Legacy archive articles
  "linkedin-mica-regulation-overview": "economy-policy",
  "linkedin-how-to-trade-bitcoins": "investing",
  "bengula-inc-linkedin-company-profile": "business-trade",
  "bengulish-7-reasons-to-start-vaping": "business-trade",
  "bengulish-3-reasons-to-hire-a-divorce-lawyer": "business-trade",
  "bengulish-john-sauter-tackling-each-day-a-time": "business-trade",
  "bengulish-do-septic-tanks-smell": "business-trade",
  "bengulish-getting-a-real-estate-license-in-vermont": "business-trade",
  "bengulish-after-the-hire-how-to-get-started-with-your-virtual-assistant": "business-trade",
  "bengulish-how-much-does-it-cost-to-start-a-roofing-company": "business-trade",
  "bengulish-roofing-forum-a-place-for-professional-roofing-discussions": "business-trade",
  "bengulish-4-types-of-sewer-linings-for-cracked-pipes": "business-trade",
  "bengulish-5-top-reasons-why-you-need-a-broker-in-getting-a-plumbing-insurance": "business-trade",
  "archive-how-to-set-fm-in-pioneer-car-stereo": "technology",
  "archive-the-best-us-parent-loans": "banking-credit",
  "archive-how-to-make-cocoa-butter-soap": "business-trade",
  "archive-customer-avatars-buyer-persona": "business-trade",
};

// Generate list of keywords based on categories/ids to bootstrap SEO keywords
function getKeywords(id: string, category: string): string[] {
  const base = [category.toLowerCase()];
  if (id.includes("bond")) base.push("treasury bonds", "fixed income", "kenya");
  if (id.includes("sacco")) base.push("sacco", "savings", "guarantor risk");
  if (id.includes("mmf") || id.includes("trust")) base.push("money market fund", "unit trusts");
  if (id.includes("seo") || id.includes("wordpress") || id.includes("linkedin")) base.push("seo", "digital marketing", "growth");
  if (id.includes("agri")) base.push("agriculture", "logistics", "trade");
  if (id.includes("sme")) base.push("sme finance", "trade finance", "working capital");
  return [...new Set(base)];
}

async function migrate() {
  const articlesDir = join(__dirname, "..", "src", "data", "articles");
  console.log(`Scanning articles in ${articlesDir}...`);

  const files = readdirSync(articlesDir).filter(
    f => f.endsWith(".ts") && f !== "index.ts" && !f.startsWith("_")
  );

  console.log(`Found ${files.length} article files to process.`);

  const list: any[] = [];

  for (const file of files) {
    const filePath = join(articlesDir, file);
    
    // Convert absolute path to a file:// URL for dynamic import on Windows
    const fileUrl = new URL(`file://${filePath}`).href;
    const module = await import(fileUrl);
    
    // Each file might export an array (like legacy archive) or a single object.
    for (const key of Object.keys(module)) {
      const val = module[key];
      if (Array.isArray(val)) {
        list.push(...val);
      } else if (val && typeof val === 'object' && val.id) {
        list.push(val);
      }
    }
  }

  console.log(`Loaded ${list.length} articles from files.`);

  for (const article of list) {
    const { id, title, summary, category, date, readTime, coverImage, author, coAuthors, content } = article;
    
    const folder = categoryFolderMap[id] || "business-trade";
    const destDir = join(__dirname, "..", "content", folder);
    const destFile = join(destDir, `${id}.md`);

    // Ensure directory exists
    mkdirSync(destDir, { recursive: true });

    // Build frontmatter metadata
    const frontmatter: Record<string, any> = {
      id,
      title,
      summary,
      category,
      date,
      readTime,
    };

    if (coverImage) {
      frontmatter.coverImage = coverImage;
    }

    frontmatter.author = {
      name: author.name,
      role: author.role,
    };
    if (author.avatar) {
      frontmatter.author.avatar = author.avatar;
    }

    if (coAuthors && coAuthors.length > 0) {
      frontmatter.coAuthors = coAuthors.map((ca: any) => {
        const res: any = { name: ca.name, role: ca.role };
        if (ca.avatar) res.avatar = ca.avatar;
        return res;
      });
    }

    // Add SEO improvements
    frontmatter.keywords = getKeywords(id, category);
    frontmatter.metaTitle = `${title} | Bengula Inc`;
    frontmatter.metaDescription = summary.length > 150 ? summary.slice(0, 150) + "..." : summary;

    const yamlStr = yaml.dump(frontmatter, { lineWidth: -1 }).trim();
    const mdFileContent = `---\n${yamlStr}\n---\n\n${content.trim()}\n`;

    writeFileSync(destFile, mdFileContent, 'utf-8');
    console.log(`Migrated: ${id} -> content/${folder}/${id}.md`);
  }

  console.log("Migration complete!");
}

migrate().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
