/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Central site configuration — contact details, socials, and brand info.
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
    tagline: "We help East African businesses grow, pairing data-driven digital visibility with finance and banking advisory.",
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

  contact: {
    email: "business@bengula.co.ke",      // primary public inbox (shown on Contact page + footer)
    workEmail: "business@bengula.co.ke",  // where general inquiries are routed
    wealthEmail: "money@bengula.co.ke",   // where wealth growing / investment requests are routed
    phone: "+254 741 418 199",            // shown + used for WhatsApp link
    whatsapp: "254741418199",             // digits only, country code, no +
    location: "Nairobi & Malindi, Kenya", // city / region (no street unless you want it)
    website: "https://bengula.co.ke",     // public site URL — leave "" to hide
  },

  // "Professional Ecosystem" logos on the home page. Each links out to the
  // partner's official site (opens in a new tab). Leave href "" to show the
  // name as plain text (e.g. a private co-op with no public website).
  // Market rates shown in the site ticker come from data/forex.csv + data/key-rates.csv
  // (see src/data/cbkRates.ts), not from this file.
  // ⚠️ Verify each URL before going live.
  partners: [
    // Official CBK DhowCSD investor portal (not www.dhowcsd.go.ke — that host does not resolve).
    { label: "CBK DhowCSD Portal", href: "https://dhowcsd.centralbank.go.ke/" },
    { label: "Nairobi Securities Exchange", href: "https://www.nse.co.ke" },
    { label: "Capital Markets Authority", href: "https://www.cma.or.ke" },
    { label: "Meru Agri Co-op",   href: "" }, // no public site — add if one exists
  ] as PartnerLink[],

  // Bengula Store (merch) settings. Checkout runs client-side because the site
  // is a static build, so only the PUBLIC (publishable) Paystack key lives here.
  //
  //   • paystackPublicKey: paste your live/test PUBLIC key (starts "pk_live_" /
  //     "pk_test_") to turn on card + M-Pesa payment. Leave "" and the store
  //     falls back to WhatsApp ordering, which works with no setup.
  //     NEVER put a secret key (sk_...) here — it would ship to every browser.
  //   • deliveryFeeKsh: flat fee added at checkout. Set 0 to fold it into prices
  //     or to quote delivery per-order on WhatsApp.
  //   • freeDeliveryThresholdKsh: order subtotal at/above which delivery is free
  //     (null to disable).
  commerce: {
    paystackPublicKey: "", // e.g. "pk_live_xxx" — see note above
    currency: "KES" as const,
    deliveryFeeKsh: 300,
    freeDeliveryThresholdKsh: 5000 as number | null,
    deliveryNote:
      "Nairobi delivery in 1-3 days; upcountry via courier (G4S/Wells Fargo), confirmed on WhatsApp.",
  },

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

