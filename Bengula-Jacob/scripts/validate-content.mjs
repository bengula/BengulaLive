/**
 * Fast pre-flight validation of the article vault.
 *
 * `npm run build` is the AUTHORITY on whether content is valid: the real rules
 * live in src/data/articles/index.ts, which runs inside Vite and can't be
 * imported by plain Node. This script mirrors that file's mechanical checks so
 * you get the same errors in under a second instead of two minutes into an SSG
 * build. It is deliberately a SUBSET — it cannot catch a broken Mermaid block
 * or a bad card grid, only malformed frontmatter.
 *
 * If you change a rule in the loader, change it here too. The category list is
 * read straight out of articleCategories.ts so that one, at least, cannot drift.
 *
 * Usage: npm run validate
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, basename, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'content');
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/** Must stay in step with the loader's import.meta.glob negative patterns. */
const NON_ARTICLE_DIRS = new Set(['insights']);
const MAX_SUMMARY_LENGTH = 160;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Single-source the categories: pull the keys of categoryPhotos out of the TS. */
function readCategories() {
  const src = readFileSync(join(ROOT, 'src/data/articleCategories.ts'), 'utf8');
  const block = src.match(/categoryPhotos\s*=\s*\{([\s\S]*?)\n\}/);
  if (!block) throw new Error('could not parse categoryPhotos from articleCategories.ts');
  return new Set([...block[1].matchAll(/^\s*'([^']+)'\s*:/gm)].map((m) => m[1]));
}

function markdownFiles(dir, found = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (!name.startsWith('.') && !NON_ARTICLE_DIRS.has(name)) markdownFiles(path, found);
    } else if (name.endsWith('.md') && !name.startsWith('_')) {
      found.push(path);
    }
  }
  return found;
}

const isAuthorShaped = (v) =>
  !!v && typeof v === 'object' &&
  typeof v.name === 'string' && v.name.trim() &&
  typeof v.role === 'string' && v.role.trim();

function validIsoDate(value) {
  if (value instanceof Date) return !Number.isNaN(value.getTime());
  if (typeof value !== 'string' || !ISO_DATE.test(value.trim())) return false;
  const iso = value.trim();
  const parsed = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === iso;
}

const CATEGORIES = readCategories();
const problems = [];
const seen = new Map();

for (const path of markdownFiles(CONTENT_DIR)) {
  const rel = relative(ROOT, path);
  const fail = (m) => problems.push(`${rel}: ${m}`);
  const file = basename(path, '.md');

  const match = readFileSync(path, 'utf8').match(FRONTMATTER);
  if (!match) { fail('missing YAML frontmatter (the file must open with a --- fenced block)'); continue; }

  let meta;
  try {
    meta = yaml.load(match[1]);
  } catch (error) {
    fail(`frontmatter is not valid YAML — ${error.message}`);
    continue;
  }
  if (!meta || typeof meta !== 'object') { fail('frontmatter is not a YAML mapping'); continue; }

  const id = typeof meta.id === 'string' ? meta.id.trim() : '';
  if (!id) fail('`id` is missing or empty');
  else if (!URL_SAFE_ID.test(id)) fail(`\`id\` "${id}" must be lowercase letters, digits and single hyphens`);
  else if (id !== file) fail(`\`id\` "${id}" must equal the filename "${file}"`);

  if (id) {
    const first = seen.get(id);
    if (first) problems.push(`${rel}: duplicate \`id\` "${id}" — already used by ${first}`);
    else seen.set(id, rel);
  }

  if (!(typeof meta.title === 'string' && meta.title.trim())) fail('`title` is missing or empty');

  const summary = typeof meta.summary === 'string' ? meta.summary.trim() : '';
  if (!summary) fail('`summary` is missing or empty');
  else if (summary.length > MAX_SUMMARY_LENGTH)
    fail(`\`summary\` is ${summary.length} chars; keep it under ${MAX_SUMMARY_LENGTH} — it is the meta description`);

  if (!match[2].trim()) fail('the Markdown body is empty');

  if (!CATEGORIES.has(meta.category))
    fail(`\`category\` ${JSON.stringify(meta.category)} is not one of: ${[...CATEGORIES].join(', ')}`);

  if (!validIsoDate(meta.date))
    fail(`\`date\` ${JSON.stringify(meta.date)} must be an ISO calendar date, e.g. 2026-01-28`);

  if (!isAuthorShaped(meta.author)) fail('`author` must have a non-empty `name` and `role`');
  if (meta.coAuthors !== undefined) {
    if (!Array.isArray(meta.coAuthors)) fail('`coAuthors` must be a list');
    else meta.coAuthors.forEach((c, i) => {
      if (!isAuthorShaped(c)) fail(`\`coAuthors[${i}]\` must have a non-empty \`name\` and \`role\``);
    });
  }

  if (meta.keywords !== undefined && !(Array.isArray(meta.keywords) && meta.keywords.every((k) => typeof k === 'string')))
    fail('`keywords` must be a list of strings');
  if (meta.coverImage !== undefined && typeof meta.coverImage !== 'string')
    fail('`coverImage` must be a path or URL string');
  if (meta.featured !== undefined && typeof meta.featured !== 'boolean')
    fail('`featured` must be true or false');
  if (meta.readTime !== undefined)
    fail('`readTime` is computed from the body word count — remove it from the frontmatter');
  if (meta.metaTitle !== undefined || meta.metaDescription !== undefined)
    fail('`metaTitle`/`metaDescription` are unused — title comes from `title`, description from `summary`');
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s) found in content/:\n`);
  for (const p of problems) console.error(`  • ${p}`);
  console.error(`\nSee content/_TEMPLATE.md for the expected frontmatter.\n`);
  process.exit(1);
}

console.log(`✓ ${seen.size} articles valid`);
