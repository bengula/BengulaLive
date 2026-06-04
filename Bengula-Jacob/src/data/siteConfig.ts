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
    fullName: "Bengula Keith W Jacob",
    shortName: "Bengula Inc",
    initials: "BJ",
    role: "Relationship Manager, Corporate & Business Banking",
    company: "Bengula Inc",
    slogan: "Adding meaning to life",
    // One-line positioning used in the hero + meta description.
    tagline: "We help East African businesses grow — pairing data-driven digital visibility with finance and banking advisory.",
    // The two equal pillars the whole brand is organised around. Reused across
    // the home page, services, and about so the message stays consistent.
    pillars: [
      {
        key: "growth",
        name: "Data & Digital Growth",
        promise: "Turn your data and online presence into customers.",
        blurb: "Data analysis, SEO, and digital systems that help businesses make decisions with evidence and get found online.",
      },
      {
        key: "finance",
        name: "Finance & Banking Advisory",
        promise: "Match your business to the right banking and capital tools.",
        blurb: "Practical finance advisory that connects you to business accounts, lending, trade finance, treasury, and protection products that fit your cash cycle.",
      },
    ] as { key: string; name: string; promise: string; blurb: string }[],
  },

  // ──────────────────────────────────────────────────────────────
  // TODO: replace these placeholders with real, public contact info.
  // ──────────────────────────────────────────────────────────────
  contact: {
    email: "bookings@bengula.co.ke",      // primary public inbox (shown on Contact page + footer)
    workEmail: "bookings@bengula.co.ke",  // where booking + contact requests are emailed (dedicated Bengula Inc inbox)
    phone: "+254 741 418 199",            // shown + used for WhatsApp link
    whatsapp: "254741418199",             // digits only, country code, no +
    location: "Nairobi & Malindi, Kenya", // city / region (no street unless you want it)
    website: "https://bengula.co.ke",     // public site URL — leave "" to hide
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
      { label: "Tier-1 Bank Dividend Yield", value: "~11.5%" },
      { label: "NSE Blue-chips", value: "Accumulation Stage" },
    ] as { label: string; value: string; tone?: "amber" }[],
  },

  // "Professional Ecosystem" logos on the home page. Each links out to the
  // partner's official site (opens in a new tab). Leave href "" to show the
  // name as plain text (e.g. a private co-op with no public website).
  // ⚠️ Verify each URL before going live.
  partners: [
    { label: "CBK DhowCSD Portal", href: "https://www.dhowcsd.go.ke" },
    { label: "Nairobi Securities Exchange", href: "https://www.nse.co.ke" },
    { label: "Capital Markets Authority", href: "https://www.cma.or.ke" },
    { label: "Meru Agri Co-op",   href: "" }, // no public site — add if one exists
  ] as PartnerLink[],

  // Add only the socials you actually use; leave the array empty to hide the bar.
  socials: [
    { label: "LinkedIn",  href: "https://www.linkedin.com/in/bengula/", handle: "bengula" },
    { label: "X",         href: "https://x.com/EruditeElder",           handle: "@EruditeElder" },
    { label: "Instagram", href: "https://www.instagram.com/bengula_bengula/",   handle: "@bengula_bengula" },
  ] as SocialLink[],
};

/** Convenience: a tel: href with non-digits stripped. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Convenience: a wa.me link from the configured whatsapp number. */
export const whatsappHref = (digits: string, text?: string) =>
  `https://wa.me/${digits.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
