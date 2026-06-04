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
 */

import yaml from "js-yaml";
import { BlogPost } from "../../types";

// Vite inlines each Markdown file's raw text into the bundle at build time, so
// no runtime filesystem access is needed (works with the static server too).
// The negative pattern excludes underscore-prefixed files (e.g. _TEMPLATE.md)
// so the template is never bundled or loaded.
const rawFiles = import.meta.glob(["/content/**/*.md", "!/content/**/_*.md"], {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function parseArticle(path: string, text: string): BlogPost {
  const match = text.match(FRONTMATTER);
  if (!match) throw new Error(`Article ${path} is missing YAML frontmatter`);
  const meta = yaml.load(match[1]) as Omit<BlogPost, "content">;
  return { ...meta, content: match[2].trim() };
}

const basename = (p: string) => p.split("/").pop() ?? p;

export const allArticles: BlogPost[] = Object.entries(rawFiles)
  .filter(([path]) => !basename(path).startsWith("_")) // skip _TEMPLATE.md
  .map(([path, text]) => parseArticle(path, text))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)); // newest first
