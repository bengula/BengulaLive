/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Centralized imagery. All photos are served from the Unsplash CDN
 * (free to hot-link). Swap any photo by changing its id below.
 * `u(id)` builds an optimized, responsive URL.
 */

import { categoryPhotos, isArticleCategory } from './articleCategories';

/** Build an Unsplash CDN url with sane defaults (auto format, cropped). */
export const u = (id: string, w = 1200, q = 70) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  /** Corporate towers — hero / banking. */
  heroCorporate: u('photo-1486406146926-c627a92ad1ab', 1400),
  /** Modern building exterior — About banner. */
  aboutBuilding: u('photo-1448630360428-65456885c650', 1200),
  /** Person studying with tablet — education / coaching. */
  education: u('photo-1611348586804-61bf6c080437', 800),
  /** Trading screen — markets. */
  markets: u('photo-1590283603385-17ffb3a7f29f', 1000),
};

/**
 * Topical photo for each blog category. The category→photo map lives in
 * data/articleCategories.ts so the canonical category list and its imagery
 * can't drift apart — the loader rejects any category missing from it, which
 * is what stopped five articles from quietly sharing one fallback photo.
 */
const FALLBACK_ID = 'photo-1518186285589-2f7649de83e0'; // chart on laptop

export const categoryImage = (category: string, w = 800) =>
  u(isArticleCategory(category) ? categoryPhotos[category] : FALLBACK_ID, w);

