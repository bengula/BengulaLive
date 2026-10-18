/**
 * Read the article vault from disk for post-build scripts (sitemap, feeds).
 *
 * The app loads articles through src/data/articles/index.ts, but that module
 * relies on Vite's `import.meta.glob` and can't be imported by plain Node. This
 * is the filesystem equivalent. It deliberately does NO validation: these
 * scripts only ever run after `vite-react-ssg build`, and the loader has
 * already failed the build on anything malformed.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const CONTENT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'content');
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/**
 * Directories under content/ that hold a different content type and must not be
 * read as articles. This list has to stay in step with the negative patterns in
 * the app loader's import.meta.glob (src/data/articles/index.ts): if the two
 * disagree, the feeds advertise URLs the site never builds a page for.
 */
const NON_ARTICLE_DIRS = new Set(['insights']);

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

/** Mirror of the loader's normalization: a Date or an ISO string → YYYY-MM-DD. */
const toIsoDate = (value) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : String(value).trim();

/** Articles newest-first, matching the order the site renders them in. */
export function readArticles() {
  return markdownFiles(CONTENT_DIR)
    .map((path) => {
      const match = readFileSync(path, 'utf8').match(FRONTMATTER);
      if (!match) return null;
      const meta = yaml.load(match[1]);
      return {
        id: meta.id ?? basename(path, '.md'),
        title: meta.title,
        summary: meta.summary,
        category: meta.category,
        dateIso: toIsoDate(meta.date),
        author: meta.author,
        keywords: meta.keywords ?? [],
        body: match[2].trim(),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso));
}
