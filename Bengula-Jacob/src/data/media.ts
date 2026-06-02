/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Centralized imagery. All photos are served from the Unsplash CDN
 * (free to hot-link). Swap any photo by changing its id below.
 * `u(id)` builds an optimized, responsive URL.
 */

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

/** Topical photo for each blog category (falls back to a markets chart). */
const categoryIds: Record<string, string> = {
  'Bonds & Bills': 'photo-1590283603385-17ffb3a7f29f',     // trading screen
  'Unit Trusts': 'photo-1591696205602-2f950c417cb9',       // green line chart
  'SME Trade Finance': 'photo-1542838132-92c53300491e',    // fresh produce / retail
  'Real Estate': 'photo-1560518883-ce09059eeffa',          // house + keys
  'Agri-Logistics': 'photo-1500382017468-9049fed747ef',    // farm field at sunset
  'Wealth Optimization': 'photo-1565514020179-026b92b84bb6', // rolled cash
};

const FALLBACK_ID = 'photo-1518186285589-2f7649de83e0'; // chart on laptop

export const categoryImage = (category: string, w = 800) =>
  u(categoryIds[category] ?? FALLBACK_ID, w);
