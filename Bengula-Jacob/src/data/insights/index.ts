/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Loader for Insight Cards.
 * Insights live as Markdown files in content/insights/*.md
 * (YAML frontmatter + Markdown body).
 */

import yaml from "js-yaml";

export interface Insight {
  tag: string;
  title: string;
  body: string;
  iconName: string;
  order: number;
}

const rawFiles = import.meta.glob(["/content/insights/*.md", "!/content/insights/_*.md"], {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function parseInsight(path: string, text: string): Insight {
  const match = text.match(FRONTMATTER);
  if (!match) throw new Error(`Insight ${path} is missing YAML frontmatter`);
  const meta = yaml.load(match[1]) as Omit<Insight, "body">;
  return {
    ...meta,
    body: match[2].trim(),
  } as Insight;
}

export const allInsights: Insight[] = Object.entries(rawFiles)
  .map(([path, text]) => parseInsight(path, text))
  .sort((a, b) => a.order - b.order);
