/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  ARTICLE TEMPLATE — copy this file to add a new blog post.           │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * HOW TO ADD AN ARTICLE (e.g. from a Word document):
 *
 *  1. Copy this file to a new name, e.g.  src/data/articles/my-article.ts
 *  2. Rename the exported constant (here: `templateArticle`) to something
 *     unique, e.g. `myArticle`.
 *  3. Fill in the fields below (title, summary, author, date, content).
 *     Paste your Word text into `content` and mark it up using the simple
 *     formatting shown in the CONTENT section further down.
 *  4. Register it in src/data/articles/index.ts:
 *        - add:  import { myArticle } from "./my-article";
 *        - add `myArticle` to the `allArticles` array (and the export block).
 *  5. Run `npm run build`. Done — the card + cover image appear automatically.
 *
 * NOTE: this template file is intentionally NOT registered in index.ts, so it
 *       never shows on the live site. It exists only as a reference to copy.
 */

import { BlogPost } from "../../types";

export const templateArticle: BlogPost = {
  // ── Identity ──────────────────────────────────────────────────────────
  // `id` must be unique and URL-safe (lowercase, words-separated-by-hyphens).
  // It becomes the share link: yoursite.com/#blog/your-id
  id: "your-article-id",

  title: "Your Article Headline Goes Here",

  // One or two sentences shown on the card under the title.
  summary:
    "A short teaser that makes someone want to click. Keep it to one or two sentences.",

  // ── Cover image ───────────────────────────────────────────────────────
  // There is NO image field here. The cover photo is chosen automatically
  // from the article's `category` (see src/data/media.ts → categoryIds).
  // Use one of these exact category names to get a matching cover image:
  //   "Bonds & Bills" | "Unit Trusts" | "SME Trade Finance"
  //   "Real Estate"   | "Agri-Logistics" | "Wealth Optimization"
  // (Any other value still works but falls back to a generic chart photo.)
  category: "Bonds & Bills",

  // ── Author(s) ─────────────────────────────────────────────────────────
  // Primary author is required. `avatar` is optional — give it an Unsplash
  // URL or a local path like "/images/jane.jpg" (file goes in public/images/).
  author: {
    name: "Jacob Bengula",
    role: "Relationship Manager, Absa Kenya & Founder of Bengula Inc.",
    // avatar: "/images/jacob.jpg",
  },

  // CO-AUTHORS (optional): delete this whole block for a single-author post.
  // Add as many as you like — names join as "By A & B & C" on the card, and
  // their avatars stack on the article page.
  coAuthors: [
    {
      name: "Jane Mwangi",
      role: "Guest Analyst, Agri-Finance",
      // avatar: "/images/jane.jpg",
    },
  ],

  // ── Meta ──────────────────────────────────────────────────────────────
  date: "June 2, 2026",      // any readable format; shown as-is
  readTime: "6 min read",    // your estimate

  // featured: true,         // optional flag (reserved for future use)

  // ── Content ───────────────────────────────────────────────────────────
  // Plain text in backticks. Separate every block with a BLANK LINE.
  // Supported formatting:
  //   ###  Heading            (section title)
  //   #### Sub-heading
  //   -    bullet point       (one per line; **bold** works inside)
  //   **bold text**
  //   $$ formula $$           (renders as a highlighted formula box)
  //   | ... with the word "Feature" → renders a comparison table (advanced)
  // Everything else becomes a normal paragraph.
  content: `### Start With a Clear Section Heading

This is a normal paragraph. Write naturally — paste your Word text here and
split it into blocks separated by blank lines.

#### A Smaller Sub-heading

Use bullet points to list key takeaways:
- **Bold lead-in:** followed by the explanation.
- A second point that stands on its own.
- A third point to round it out.

You can highlight a calculation or formula like this:
$$\\text{Net Yield} = \\text{Gross} \\times (1 - \\text{Tax Rate})$$

Close with a strong concluding paragraph that ties the article back to the
reader's goals.`,
};
