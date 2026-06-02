/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Offline knowledge base for the Bengula Jacob assistant.
 * No external API — answers are matched locally by keyword.
 * Edit / expand these entries to curate what the assistant "knows".
 */

export interface KnowledgeEntry {
  id: string;
  /** Lowercase keywords; any match (substring) routes to this answer. */
  keywords: string[];
  /** Markdown answer. `{name}` and `{savings}` are interpolated from the profile. */
  answer: string;
}

export const coachKnowledge: KnowledgeEntry[] = [
  {
    id: "dhowcsd",
    keywords: ["dhowcsd", "cds", "central depository", "cds account", "open account", "csd"],
    answer: `**Opening a CDS account via DhowCSD**

The Central Bank of Kenya runs **DhowCSD**, the digital portal for buying Treasury Bills & Bonds directly — no broker fees.

1. Visit the DhowCSD portal (or app) and register with your **ID/passport, KRA PIN, and an active bank account**.
2. Link a Kenyan commercial bank account for settlement (the same one receives your coupon payments).
3. Once verified, you can **bid in the weekly T-Bill and monthly T-Bond auctions**.
4. Set bids as *competitive* (you name the rate) or *non-competitive* (you accept the weighted average).

Tip: start with a **non-competitive bid** on a 91-day T-Bill to learn the cycle before laddering into longer bonds.`,
  },
  {
    id: "bonds-tbills",
    keywords: ["bond", "t-bill", "tbill", "treasury", "ifb", "coupon", "auction", "ladder"],
    answer: `**Treasury Bills vs Bonds (Kenya)**

- **T-Bills** — short term: **91, 182, 364 days**. Sold at a discount; you get the full face value at maturity. Great for parking cash.
- **T-Bonds** — longer term (2–30 yrs), pay a fixed **coupon twice a year**. Good for predictable income.
- **IFBs (Infrastructure Bonds)** — coupons are usually **tax-free**, which lifts the effective yield meaningfully.

**Laddering** means splitting capital across maturities (e.g. 91d / 182d / 1yr) so something is always maturing — that gives you liquidity *and* rolling reinvestment at fresh rates.`,
  },
  {
    id: "mmf",
    keywords: ["mmf", "money market", "money market fund", "unit trust", "cma"],
    answer: `**Money Market Funds (MMFs)**

MMFs pool investor cash into short-term instruments (T-Bills, fixed deposits, commercial paper). In Kenya they currently average roughly **14–15% gross annual yield**, accrued **daily** and usually paid monthly.

Why people like them:
- **Low entry** (often KSh 1,000–2,500) and easy top-ups.
- **Liquid** — withdrawals typically settle in 1–3 business days.
- **Regulated** by the CMA.

Note: the quoted yield is *gross* — **15% withholding tax** applies to the interest. Always check the fund's effective (net) rate and management fee.`,
  },
  {
    id: "tax",
    keywords: ["tax", "withholding", "wht", "withhold"],
    answer: `**Withholding tax on investment income (Kenya)**

- **Treasury Bonds** — generally **10%** withholding on the coupon (bonds with tenor ≥ 10 yrs); shorter bonds and bills are typically **15%**.
- **Infrastructure Bonds (IFBs)** — coupons are usually **tax-exempt** (a key reason their effective yield beats ordinary bonds).
- **Money Market Funds / bank interest** — **15%** withholding on interest earned.
- **Dividends (NSE shares)** — **5%** withholding for residents.

Withholding tax is normally **final** for individuals, so you don't pay again at filing — but keep the certificates for your records.`,
  },
  {
    id: "makiba",
    keywords: ["m-akiba", "makiba", "mobile bond"],
    answer: `**M-Akiba**

M-Akiba was Kenya's mobile-phone retail bond — you could invest from as little as **KSh 3,000** straight from your phone, with interest paid to your mobile money wallet.

It proved the concept of *retail* access to government debt. Today the **DhowCSD** portal is the main, fully-digital route for individuals to buy bills and bonds directly. Ask me about *DhowCSD* to see how to set that up.`,
  },
  {
    id: "sacco",
    keywords: ["sacco", "co-op", "cooperative", "co-operative"],
    answer: `**SACCOs (Savings & Credit Co-operatives)**

SACCOs are member-owned and regulated by **SASRA**. They're a solid pillar for disciplined saving:
- **Dividends on shares** + **interest (rebates) on deposits**, often **competitive double-digit** returns historically.
- Access to **credit at 3x–4x your savings**, usually cheaper than bank loans.

Watch-outs: choose a **SASRA-licensed, deposit-taking** SACCO, check its capital adequacy, and remember share capital is generally **not withdrawable** while you're a member.`,
  },
  {
    id: "nse",
    keywords: ["nse", "stock", "share", "equit", "dividend", "blue chip", "blue-chip"],
    answer: `**Nairobi Securities Exchange (NSE)**

Equities give you **capital growth + dividends**, but with more volatility than bonds.
- **Blue-chips** (banking, telco, manufacturing) tend to pay steady dividends — useful for income.
- You'll need a **CDS account through a licensed stockbroker** to trade.
- Dividends attract **5% withholding** for residents.

A common approach: anchor your portfolio in **bonds/MMFs for stability**, then add quality dividend stocks for long-term upside. Want a sample split? Ask me about *allocation*.`,
  },
  {
    id: "realestate",
    keywords: ["real estate", "land", "property", "syndicate", "reit", "plot"],
    answer: `**Real estate & syndicated placements**

Direct property needs big capital and is illiquid. Two ways to get exposure with less:
- **REITs** on the NSE — buy property income in share-sized units.
- **Syndicates / co-ownership pools** — investors combine funds for land-banking or income projects, sharing returns proportionally.

With syndicates, **due diligence is everything**: verify title deeds, the sponsor's track record, the exit timeline, and how returns are distributed. Bengula Inc structures vetted placements with documented frameworks — see the *Investment Pools* tab.`,
  },
  {
    id: "allocation",
    keywords: ["allocat", "split", "divide", "portfolio", "diversif", "how should i invest", "where to invest"],
    answer: `**A starter allocation framework**

There's no one-size-fits-all, but a balanced template for steady wealth-building:
- **Emergency buffer** → MMF (3–6 months of expenses, instantly accessible).
- **Core income** → T-Bills / Bonds laddered across maturities.
- **Growth** → NSE blue-chip dividend stocks and/or a REIT.
- **Alternative** → a vetted syndicate once the above are funded.

With **KSh {savings}/month**, a simple rule is **50% safe (MMF/T-Bills) · 30% income bonds · 20% growth** — then revisit quarterly. Book a consultation for a plan tuned to your goals.`,
  },
  {
    id: "compound",
    keywords: ["compound", "interest", "grow", "calculator", "double", "rule of 72"],
    answer: `**The power of compounding**

Compounding = earning returns *on your past returns*. The longer the runway, the more dramatic it gets.

- **Rule of 72**: divide 72 by your annual rate to estimate doubling time. At **15%**, money doubles in roughly **72 ÷ 15 ≈ 4.8 years**.
- **Reinvest** coupons and MMF interest instead of spending them — that's what turns a linear saver into an exponential one.

Try the **Wealth Compounder** on the Home page to model your own numbers.`,
  },
  {
    id: "budget",
    keywords: ["budget", "save", "saving", "debt", "emergency", "spend"],
    answer: `**Budgeting & getting started**

1. **Pay yourself first** — automate a transfer to savings/MMF the day you're paid.
2. **50/30/20** as a baseline: 50% needs, 30% wants, 20% saving & investing.
3. **Clear expensive debt** (overdrafts, mobile loans, credit cards) before chasing yields — few investments beat a 20%+ borrowing cost.
4. Build a **3–6 month emergency fund** in an MMF *before* locking money into bonds or syndicates.

Small and consistent beats large and sporadic. Ask me about *allocation* once your buffer is set.`,
  },
  {
    id: "diaspora",
    keywords: ["diaspora", "abroad", "overseas", "forex", "remit", "foreign"],
    answer: `**Investing from the diaspora**

You can invest in Kenyan bills, bonds, MMFs and equities from abroad:
- Open a **DhowCSD / CDS account** and link a Kenyan bank account (some banks offer **diaspora accounts** designed for this).
- **IFBs** are popular with the diaspora — tax-free coupons and KES-denominated returns.
- Factor in **FX risk** (KES vs your home currency) and remittance costs.

Bengula Inc runs structured guidance for diaspora clients — use the **Contact** page or **book a consultation**.`,
  },
  {
    id: "bengula-eligibility",
    keywords: ["bengula", "syndicate eligibility", "eligible", "join", "minimum", "membership"],
    answer: `**Bengula Inc syndicate eligibility**

Bengula Inc structures **private co-investment placements** (land-banking, logistics, SME funding). Typically:
- A **minimum commitment** per pool (varies by deal — see *Investment Pools*).
- A short **due-diligence / KYC** step.
- A defined **tenure and exit** for each placement.

These are **separate from regulated Absa banking products**. The best next step is to **book a consultation** so we can match you to a suitable pool.`,
  },
  {
    id: "services-pricing",
    keywords: ["service", "consult", "price", "pricing", "cost", "fee", "book", "appointment"],
    answer: `**Consulting & booking**

Available advisory tracks include **Financial Consulting** (KSh 10,000), **Investment Advisory** (KSh 15,000), **Business/SME Advisory** (KSh 17,500), and **Workshops** (from KSh 40,000).

Head to the **Services** tab to pick a track and reserve a slot, or use the **Contact** page for a tailored enquiry.`,
  },
];

export const COACH_FALLBACK = `I'm Jacob's curated finance assistant. I can walk you through topics like:

- **Treasury Bills & Bonds** and how to *ladder* them
- **DhowCSD / CDS** account setup
- **Money Market Funds**, **SACCOs**, and **NSE** dividends
- **Withholding tax** rules
- A starter **portfolio allocation**
- **Diaspora** investing and **Bengula Inc** syndicates

Try one of the quick chips below, or ask in those terms and I'll share what I know. For anything specific to your situation, **book a consultation** — Jacob reviews these personally.`;

/**
 * Pure, offline responder. Scores each entry by keyword hits and returns the best match.
 */
export function getCoachReply(
  query: string,
  profile: { name: string; monthlySavings: string },
): string {
  const q = query.toLowerCase();

  let best: KnowledgeEntry | null = null;
  let bestScore = 0;
  for (const entry of coachKnowledge) {
    const score = entry.keywords.reduce((acc, kw) => (q.includes(kw) ? acc + kw.length : acc), 0);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  const body = best ? best.answer : COACH_FALLBACK;
  return body
    .replace(/\{name\}/g, profile.name || "there")
    .replace(/\{savings\}/g, profile.monthlySavings || "your monthly amount");
}
