/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  ARTICLE LOADER                                                       │
 * │  Articles live as Markdown files in  content/<section>/<id>.md        │
 * │  (YAML frontmatter + Markdown body). This module loads every one of   │
 * │  them at build time and exposes them as `allArticles`.                │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * TO ADD AN ARTICLE: copy content/_TEMPLATE.md into the right section folder,
 * rename it to your-article-id.md, fill in the frontmatter + body. That's it —
 * the card and page appear automatically. No code change needed.
 *
 * Files whose name starts with "_" (e.g. _TEMPLATE.md) are ignored.
 *
 * EVERY article is validated below and the build FAILS on a bad one, listing
 * every problem across every file at once. That is deliberate: a silently
 * malformed article used to produce a blank title or a duplicate route that
 * nobody noticed until it was live.
 *
 * Two fields are DERIVED here rather than authored, so they cannot drift:
 *   • readTime — computed from the body word count
 *   • date     — the display string, formatted from the authored ISO date
 */

import yaml from "js-yaml";
import { BlogPost } from "../../types";
import { ARTICLE_CATEGORIES, isArticleCategory } from "../articleCategories";

// Vite inlines each Markdown file's raw text into the bundle at build time, so
// no runtime filesystem access is needed (works with the static server too).
// The negative patterns exclude underscore-prefixed files (e.g. _TEMPLATE.md)
// so the template is never bundled or loaded, and content/insights/, which is a
// separate content type (short cards for the InsightDeck, loaded by
// data/insights/index.ts) whose frontmatter carries no `category` and would
// therefore fail article validation. Touch this file when adding a brand-new
// article during local dev if Vite has a stale glob cache.
const rawFiles = import.meta.glob(
  ["/content/**/*.md", "!/content/**/_*.md", "!/content/insights/**/*.md"],
  {
    eager: true,
    query: "?raw",
    import: "default",
  }
) as Record<string, string>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/** Average adult reading speed for non-fiction prose. */
const WORDS_PER_MINUTE = 225;

/** Google truncates meta descriptions past roughly this length. */
const MAX_SUMMARY_LENGTH = 160;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const basename = (path: string) => path.split("/").pop()!.replace(/\.md$/, "");

/**
 * Normalize an authored date to a YYYY-MM-DD calendar date.
 *
 * js-yaml resolves an unquoted `2026-01-28` to a Date at UTC midnight, while a
 * quoted "2026-01-28" stays a string; both are accepted and both land on the
 * same answer. Anything else (a Date with a time, "June 2026", "Jan 28, 2026")
 * is rejected — those are exactly the ambiguous forms that used to shift a day
 * when serialized for JSON-LD.
 */
function toIsoDate(value: unknown): string | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && ISO_DATE.test(value.trim())) {
    const iso = value.trim();
    // Reject calendar-invalid dates like 2026-02-31, which Date would roll over.
    const parsed = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toISOString().slice(0, 10) === iso ? iso : null;
  }
  return null;
}

/**
 * Format an ISO date for display, e.g. "January 28, 2026".
 *
 * `timeZone: "UTC"` is load-bearing: without it the formatter interprets the
 * UTC-midnight instant in the local zone and renders the previous day for
 * anywhere east of Greenwich (Kenya is UTC+3).
 */
const DISPLAY_DATE = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const formatDisplayDate = (iso: string) =>
  DISPLAY_DATE.format(new Date(`${iso}T00:00:00Z`));

/** Words in the Markdown body, ignoring syntax that isn't read aloud. */
function countWords(markdown: string): number {
  const prose = markdown
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → their label
    .replace(/[#>*_`|$-]/g, " "); // leftover Markdown punctuation
  const words = prose.match(/\S+/g);
  return words ? words.length : 0;
}

const readTimeFor = (markdown: string) =>
  `${Math.max(1, Math.round(countWords(markdown) / WORDS_PER_MINUTE))} min read`;

function isAuthorShaped(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const author = value as Record<string, unknown>;
  return typeof author.name === "string" && author.name.trim().length > 0 &&
    typeof author.role === "string" && author.role.trim().length > 0;
}

/**
 * Parse one article, collecting every problem into `problems` rather than
 * throwing on the first — so one build reports everything wrong in the vault.
 */
function parseArticle(path: string, text: string, problems: string[]): BlogPost | null {
  const fail = (message: string) => problems.push(`${path}: ${message}`);

  const match = text.match(FRONTMATTER);
  if (!match) {
    fail("missing YAML frontmatter (the file must open with a --- fenced block)");
    return null;
  }

  let meta: Record<string, unknown>;
  try {
    const loaded = yaml.load(match[1]);
    if (!loaded || typeof loaded !== "object") {
      fail("frontmatter is not a YAML mapping");
      return null;
    }
    meta = loaded as Record<string, unknown>;
  } catch (error) {
    fail(`frontmatter is not valid YAML — ${(error as Error).message}`);
    return null;
  }

  const body = match[2].trim();
  const file = basename(path);
  const before = problems.length;

  // --- id -----------------------------------------------------------------
  const id = typeof meta.id === "string" ? meta.id.trim() : "";
  if (!id) fail("`id` is missing or empty");
  else if (!URL_SAFE_ID.test(id))
    fail(`\`id\` "${id}" must be lowercase letters, digits and single hyphens — it becomes the /blog/<id> URL`);
  else if (id !== file)
    fail(`\`id\` "${id}" must equal the filename "${file}" (rename one to match the other)`);

  // --- text fields --------------------------------------------------------
  const title = typeof meta.title === "string" ? meta.title.trim() : "";
  if (!title) fail("`title` is missing or empty");

  const summary = typeof meta.summary === "string" ? meta.summary.trim() : "";
  if (!summary) fail("`summary` is missing or empty");
  else if (summary.length > MAX_SUMMARY_LENGTH)
    fail(`\`summary\` is ${summary.length} chars; keep it under ${MAX_SUMMARY_LENGTH} — it is used verbatim as the meta description and truncates in search results`);

  if (!body) fail("the Markdown body is empty");

  // --- category -----------------------------------------------------------
  if (!isArticleCategory(meta.category))
    fail(`\`category\` ${JSON.stringify(meta.category)} is not one of: ${ARTICLE_CATEGORIES.join(", ")}`);

  // --- date ---------------------------------------------------------------
  const dateIso = toIsoDate(meta.date);
  if (!dateIso)
    fail(`\`date\` ${JSON.stringify(meta.date)} must be an ISO calendar date, e.g. 2026-01-28`);

  // --- authors ------------------------------------------------------------
  if (!isAuthorShaped(meta.author)) fail("`author` must have a non-empty `name` and `role`");
  if (meta.coAuthors !== undefined) {
    if (!Array.isArray(meta.coAuthors)) fail("`coAuthors` must be a list");
    else
      meta.coAuthors.forEach((coAuthor, i) => {
        if (!isAuthorShaped(coAuthor)) fail(`\`coAuthors[${i}]\` must have a non-empty \`name\` and \`role\``);
      });
  }

  // --- optional fields ----------------------------------------------------
  if (meta.keywords !== undefined && !(Array.isArray(meta.keywords) && meta.keywords.every((k) => typeof k === "string")))
    fail("`keywords` must be a list of strings");
  if (meta.coverImage !== undefined && typeof meta.coverImage !== "string")
    fail("`coverImage` must be a path or URL string");
  if (meta.featured !== undefined && typeof meta.featured !== "boolean")
    fail("`featured` must be true or false");
  if (meta.readTime !== undefined)
    fail("`readTime` is computed from the body word count — remove it from the frontmatter");
  if (meta.metaTitle !== undefined || meta.metaDescription !== undefined)
    fail("`metaTitle`/`metaDescription` are unused — the page title is built from `title` and the description from `summary`");

  if (problems.length > before) return null;

  return {
    id,
    title,
    summary,
    content: body,
    category: meta.category as BlogPost["category"],
    dateIso: dateIso!,
    date: formatDisplayDate(dateIso!),
    readTime: readTimeFor(body),
    author: meta.author as BlogPost["author"],
    ...(meta.coAuthors ? { coAuthors: meta.coAuthors as BlogPost["coAuthors"] } : {}),
    ...(meta.keywords ? { keywords: meta.keywords as string[] } : {}),
    ...(meta.coverImage ? { coverImage: meta.coverImage as string } : {}),
    ...(meta.featured ? { featured: true } : {}),
  };
}

function loadArticles(): BlogPost[] {
  const problems: string[] = [];
  const articles: BlogPost[] = [];

  for (const [path, text] of Object.entries(rawFiles)) {
    const article = parseArticle(path, text, problems);
    if (article) articles.push(article);
  }

  // A duplicate id silently collapses two articles into one route and gives
  // React two identical keys, so it has to be a hard error.
  const seen = new Map<string, string>();
  for (const [path, text] of Object.entries(rawFiles)) {
    const id = text.match(/^---\r?\n[\s\S]*?^id:\s*(.+)$/m)?.[1]?.trim();
    if (!id) continue;
    const first = seen.get(id);
    if (first) problems.push(`${path}: duplicate \`id\` "${id}" — already used by ${first}`);
    else seen.set(id, path);
  }

  if (problems.length > 0) {
    throw new Error(
      `${problems.length} problem(s) found in content/:\n` +
        problems.map((p) => `  • ${p}`).join("\n") +
        `\n\nSee content/_TEMPLATE.md for the expected frontmatter.`
    );
  }

  // Newest first. Comparing ISO strings is a plain lexicographic compare — no
  // Date parsing, so no timezone can get involved.
  return articles.sort((a, b) => b.dateIso.localeCompare(a.dateIso));
}

export const allArticles: BlogPost[] = loadArticles();
