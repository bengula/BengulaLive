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
  label: string;       // e.g. "LinkedIn", "Website", "Try Claude"
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
    name: "Jacob Bengula",
    role: "Relationship Manager, Absa Kenya & Founder of Bengula Inc.",
    avatar: "/images/jacob.jpg",
    bio: "Jacob Bengula is a private wealth relationship manager at Absa Kenya and the founder of Bengula Inc. He writes on financial education, personal branding, and alternative assets across East Africa — translating sovereign debt, unit trusts, SME trade finance, and real-estate syndication into practical strategy for everyday savers and investors.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/bengula/" },
    ],
  },
  {
    id: "winnie-njoroge",
    name: "Winnie Njoroge",
    role: "Creative Strategist, Martin Munroe LLC",
    avatar: "/images/bebe.jpg",
    bio: "Winnie Njoroge is a creative strategist at Martin Munroe LLC, where she shapes brand narrative and editorial direction. She collaborates on long-form features that make complex financial topics clear, human, and engaging for a wider readership.",
  },
  {
    id: "claude-opus",
    name: "Claude Opus",
    role: "AI Research & Drafting Assistant",
    avatar: "/images/claude-avatar.svg",
    bio: "Claude Opus is an AI assistant by Anthropic, used in the editorial process for research synthesis, structural drafting, and copy refinement. Its contributions are reviewed and edited by the human authors before publication.",
    links: [
      { label: "About Claude", href: "https://claude.ai" },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    role: "AI Research Assistant",
    avatar: "/images/gemini-avatar.svg",
    bio: "Gemini is an AI assistant by Google, used in the editorial process for research, fact-gathering, and drafting support. Its contributions are reviewed and edited by the human authors before publication.",
    links: [
      { label: "About Gemini", href: "https://gemini.google.com" },
    ],
  },
];

/** Look up a profile by the exact byline name (returns undefined if none). */
export const getAuthorProfile = (name: string): AuthorProfile | undefined =>
  authorProfiles.find((a) => a.name === name);

/** Look up a profile by its URL id. */
export const getAuthorById = (id: string): AuthorProfile | undefined =>
  authorProfiles.find((a) => a.id === id);
