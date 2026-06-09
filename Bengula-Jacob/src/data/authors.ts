/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  AUTHOR REGISTRY
 *  Central profiles for everyone who writes on the site. The blog bylines
 *  and the Authors page both read from here.
 *
 *  Articles still declare their author(s) inline (name + per-article role).
 *  We MATCH those to the profiles below BY NAME — so the name in an article's
 *  `author` / `coAuthors` must match a `name` here exactly to become a link.
 *
 *  HOW TO ADD AN AUTHOR:
 *   1. Add an entry below with a unique `id` (lowercase-hyphenated).
 *   2. `name` MUST match what the articles use in their byline.
 *   3. Fill in role, bio, optional avatar (file in public/images/), and links.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface AuthorLink {
  label: string;       // e.g. "LinkedIn", "Website"
  href: string;
}

export interface AuthorProfile {
  id: string;          // URL-safe; becomes #author/<id>
  name: string;        // MUST match the byline name used in articles
  role: string;        // canonical role shown on the profile (byline role may vary per article)
  avatar?: string;     // /images/... path or external URL
  bio: string;
  links?: AuthorLink[];
}

export const authorProfiles: AuthorProfile[] = [
  {
    id: "jacob-bengula",
    name: "Bengula Jacob",
    role: "Relationship Manager & Founder of Bengula Inc.",
    avatar: "/images/jacob.jpg",
    bio: "Bengula Jacob is a private wealth relationship manager at Absa Bank Kenya (Malindi Branch) and the founder of Bengula Inc. He writes on financial education, personal branding, and alternative assets across East Africa — translating sovereign debt, unit trusts, SME trade finance, and real-estate syndication into practical strategy for everyday savers and investors.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/bengula/" },
    ],
  },
  {
    id: "winnie-njoroge",
    name: "Winnie N.",
    role: "Creative Strategist, Bengula Inc",
    avatar: "/images/bebe.jpg",
    bio: "Winnie N. is a creative strategist at Bengula Inc, where she shapes brand narrative and editorial direction. She collaborates on long-form features that make complex financial topics clear, human, and engaging for a wider readership.",
  },
];

/** Look up a profile by the exact byline name (returns undefined if none). */
export const getAuthorProfile = (name: string): AuthorProfile | undefined =>
  authorProfiles.find((a) => a.name === name);

/** Look up a profile by its URL id. */
export const getAuthorById = (id: string): AuthorProfile | undefined =>
  authorProfiles.find((a) => a.id === id);

