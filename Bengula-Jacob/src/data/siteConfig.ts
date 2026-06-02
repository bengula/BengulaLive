/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Central site configuration — contact details, socials, and brand info.
 * ⚠️ REPLACE the placeholder values below with Jacob's real details.
 * Everything that displays a contact point reads from here.
 */

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface PartnerLink {
  label: string;
  href: string; // official site — leave "" to show the name without a link
}

export const siteConfig = {
  brand: {
    fullName: "Jacob Bengula",
    shortName: "Bengula Jacob",
    initials: "BJ",
    role: "Relationship Manager, Absa Kenya",
    company: "Bengula Inc",
    tagline: "Financial education, personal branding, and alternative assets in East Africa.",
  },

  // ──────────────────────────────────────────────────────────────
  // TODO: replace these placeholders with real, public contact info.
  // ──────────────────────────────────────────────────────────────
  contact: {
    email: "REPLACE_ME@example.com",      // primary public email (shown on Contact page)
    workEmail: "REPLACE_ME@example.com",  // where booking requests are emailed (your work inbox)
    phone: "+254 7XX XXX XXX",            // shown + used for WhatsApp link
    whatsapp: "2547XXXXXXXX",             // digits only, country code, no +
    location: "Nairobi, Kenya",           // city / region (no street unless you want it)
    website: "",                          // e.g. "https://yourdomain.com" — leave "" to hide
  },

  // Ticker: Kenyan market rates. FX (USD/KES etc.) is fetched live in the
  // browser; these local-market figures have no free live API, so edit them
  // here and update `asOf` when you refresh them.
  marketRates: {
    asOf: "June 2026",
    items: [
      { label: "MMF Average Yield", value: "~14.5% APR" },
      { label: "CBK T-Bills (91-Day)", value: "15.82%" },
      { label: "CBK T-Bills (182-Day)", value: "16.35%" },
      { label: "Sovereign IFB 17Yr (Tax-Free)", value: "16.85% coupon", tone: "amber" as const },
      { label: "Absa Group Dividend Yield", value: "~11.5%" },
      { label: "NSE Blue-chips", value: "Accumulation Stage" },
    ] as { label: string; value: string; tone?: "amber" }[],
  },

  // "Professional Ecosystem" logos on the home page. Each links out to the
  // partner's official site (opens in a new tab). Leave href "" to show the
  // name as plain text (e.g. a private co-op with no public website).
  // ⚠️ Verify each URL before going live.
  partners: [
    { label: "Absa Bank Kenya",   href: "https://www.absabank.co.ke" },
    { label: "CBK DhowCSD Portal", href: "https://www.dhowcsd.go.ke" },
    { label: "Nairobi Securities Exchange", href: "https://www.nse.co.ke" },
    { label: "Meru Agri Co-op",   href: "" }, // no public site — add if one exists
  ] as PartnerLink[],

  // Add only the socials you actually use; leave the array empty to hide the bar.
  socials: [
    // { label: "LinkedIn",  href: "https://linkedin.com/in/your-handle", handle: "Jacob Bengula" },
    // { label: "X",         href: "https://x.com/your-handle",           handle: "@yourhandle" },
    // { label: "Instagram", href: "https://instagram.com/your-handle",   handle: "@yourhandle" },
  ] as SocialLink[],
};

/** Convenience: a tel: href with non-digits stripped. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Convenience: a wa.me link from the configured whatsapp number. */
export const whatsappHref = (digits: string, text?: string) =>
  `https://wa.me/${digits.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
