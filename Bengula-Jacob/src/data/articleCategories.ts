/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  ARTICLE CATEGORIES — the single source of truth
 *
 *  `category:` in an article's frontmatter MUST be one of the keys below.
 *  The loader (data/articles/index.ts) fails the build on anything else, so
 *  a typo can never create a phantom filter pill on the blog page.
 *
 *  Each category also carries the Unsplash photo used as the fallback cover
 *  for articles that don't set their own `coverImage`. Keeping the list and
 *  the photos together means adding a category forces you to pick its photo.
 *
 *  NOTE: the `content/<section>/` folders are an authoring convenience only
 *  (they make the vault pleasant to browse in Obsidian). They are NOT the
 *  taxonomy — the loader ignores them entirely, and the blog filter reads
 *  `category` below. Put a file in whichever folder feels right.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * Category name → Unsplash photo id for its fallback cover.
 *
 * Every key here is a category in live use. The five marked (placeholder)
 * were added when this list was reconciled against the full article set —
 * their photos are ids already proven elsewhere in this repo, picked for a
 * plausible fit rather than chosen by eye. Swap any of them freely; the id
 * is the only thing that matters.
 */
export const categoryPhotos = {
  'Bonds & Bills': 'photo-1590283603385-17ffb3a7f29f', // trading screen
  'Unit Trusts': 'photo-1591696205602-2f950c417cb9', // green line chart
  'SME Trade Finance': 'photo-1542838132-92c53300491e', // fresh produce / retail
  'Real Estate': 'photo-1560518883-ce09059eeffa', // house + keys
  'Agri-Logistics': 'photo-1500382017468-9049fed747ef', // farm field at sunset
  'Wealth Optimization': 'photo-1565514020179-026b92b84bb6', // rolled cash
  'Digital Strategy': 'photo-1460925895917-afdab827c52f', // analytics dashboard
  'Rates & Policy': 'photo-1554224155-6726b3ff858f', // rate charts on paper
  'Banking & Credit': 'photo-1486406146926-c627a92ad1ab', // corporate towers (placeholder)
  'Fintech & Banking': 'photo-1518770660439-4636190af475', // circuit board (placeholder)
  'Corporate Finance': 'photo-1448630360428-65456885c650', // modern building exterior (placeholder)
  'Startup Finance': 'photo-1611348586804-61bf6c080437', // person studying with tablet (placeholder)
  'SME Finance': 'photo-1518186285589-2f7649de83e0', // chart on laptop (placeholder)
} as const;

export type ArticleCategory = keyof typeof categoryPhotos;

export const ARTICLE_CATEGORIES = Object.keys(categoryPhotos) as ArticleCategory[];

export const isArticleCategory = (value: unknown): value is ArticleCategory =>
  typeof value === 'string' && value in categoryPhotos;
