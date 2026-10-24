# Bengula Article Pipeline

Internal planning document. Not deployed (internal-docs is excluded from the build).
Last updated: 26 September 2026.

House rules for every piece (from the Brand & Editorial Style Guide v2.0 plus owner overrides):
- Title Case headings, no em dashes, British/Kenyan spelling, "KES" never "KSh" or "Kshs".
- Every rate dated and sourced. Verbatim disclaimers from Section 8 where advice-adjacent.
- **Tax source hierarchy (owner ruling, 1 Aug 2026): KRA is the authority and its published word is final.** Advisory firms, law-firm blogs and commentators do not override it. Only a court judgment or a Tax Appeals Tribunal decision does, and where one exists, cite it. Where sources conflict, publish KRA's figure as the position and note the disagreement in a sentence. Do **not** stall an article over a conflict again.
- Absa frontline experience may inform content; never republish internal Absa material or imply Absa endorses Bengula.
- Cover/inline images: use a direct CDN URL from Pexels or Unsplash by default. ~~LoremFlickr is an approved topic-tagged, locked fallback for a duplicate cover only~~ **struck 20 September 2026: it degraded to serving one identical generic image across different topic tags and lock values, and had silently done so on four live covers. There is no fallback CDN. A duplicate cover is resolved by sourcing a different photograph from Pexels or Unsplash.** Cloudinary is for Bengula-owned/licensed imagery; Wikimedia Commons requires recorded licence and attribution. Every live cover must be topical and distinct. Never use random-image CDNs such as Picsum or a photo page URL. Tables as GFM markdown (inline-styled HTML gets sanitised). Mermaid diagrams and KaTeX formula boxes are supported.
- Signature sections where they fit: Key Insight, Risk Factors, Decision Framework, Bengula View.

Status legend: **Ready** (write any time), **Adjust** (fits after the noted angle change), **Blocked** (needs a prerequisite first).

---

## Fitness Summary

| # | Working Title | Pillar | Verdict | Main Risk |
|---|---|---|---|---|
| P1-1 | The Anatomy of a Perfect Bank Proposal | Corporate Banking & SME Trade Finance | **Shipped** | Published as [anatomy-of-a-bank-proposal-kenya] (5 C's, DSCR formula box, cash-cycle matching). |
| P1-2 | Unlocking LCs and Invoice Discounting | Corporate Banking & SME Trade Finance | **Closed by absorption, 1 Aug 2026** | Import-side LC mechanics live in [import-finance-kenya-guide]; discounting in [what-is-accounts-receivable]; the remaining export-corridor LC angle (beneficiary decisions, confirmation, negotiation/discounting, Meru-to-Rotterdam timeline) is now C4 Part 4 of [trade-finance-kenya-complete-guide]. Do not write a separate piece. |
| P1-3 | The Hidden Leak: Fees and FX Spreads | Corporate Banking & SME Trade Finance | **Shipped 19 July 2026** | Published as [sme-transaction-fees-fx-spreads-kenya]: tariff literacy, USD/KES spread anatomy with worked table, 30-day fee audit, negotiation pack, structural fixes. Links banks-make-money, hedging, guarantees, import finance. |
| P2-1 | Advanced DhowCSD Strategies: T-Bill Rollover Ladder | Bonds & Bills | **Shipped 10 July 2026** | Published as [advanced-dhowcsd-t-bill-ladder] with mid-July 2026 auction rates (91d 8.825 / 182d 8.971 / 364d 8.992). Closes the IOU printed in C2's T-bill section. Rates re-date weekly with auctions; refresh quarterly. |
| P2-2 | Chama Syndication 2.0: LLPs for Land-Banking | Wealth Optimization | **Shipped 19 July 2026** | Published as [chama-llp-land-banking-kenya]: vehicle choices, non-negotiable docs, title stack, contribution discipline, exit rules, green-light checklist. Legal disclaimer throughout; pairs with complete-chama-guide and Kikuyu Ridge cases. |
| P2-3 | The MMF Stress Test | Wealth Optimization | **Shipped 19 July 2026** | Published as [mmf-stress-test-kenya]: pure how-to (fact sheet, five stress lenses, anonymised A vs B table). Deliberately does not re-own market outlook ground held by [future-mmfs-kenya]. |
| P3-1 | The KES 0 Organic Traffic Playbook | Data & Digital Growth | **Folded 10 July 2026** | Local-search layer added to [sme-seo-inbound-lead-engine] instead of a fourth overlapping article |
| P3-2 | Data-Driven Inventory for Small Shops | Data & Digital Growth | **Shipped 19 July 2026** | Published as [data-driven-inventory-small-shops-kenya]: Excel-first run-rate, days cover, reorder point, weekly 45-min rhythm, 14-day reset. Dashboard case is the graduation path. |
| C1 | The Complete Guide to Borrowing Money in Kenya | Cornerstone | **Shipped 12 July 2026** | Published as [borrowing-money-in-kenya-guide] (featured, ~6,600 words + six-satellite cluster). Blockers cleared same day: [credit-score-kenya-guide] and [debt-consolidation-refinancing-kenya] written as F1/F2; Duplum was already absorbed into the interest-rates guide. Deliberately leaner than C2/C3 because six deep-dives carry its detail per the no-duplication rule. |
| F1 | Your Credit Score in Kenya (CRB system guide) | Gap-filler | **Shipped 12 July 2026** | [credit-score-kenya-guide]: the system/score-building companion to the existing repair guide. |
| F2 | Debt Consolidation and Refinancing in Kenya | Gap-filler | **Shipped 12 July 2026** | [debt-consolidation-refinancing-kenya]: buy-off mechanics, tenor trap, break-even test, KESONIA refinancing. |
| S1 | LPO and Purchase Order Finance (C3 spin-out) | Deep-dive | **Shipped 12 July 2026** | [lpo-purchase-order-finance-kenya]; handbook section links it. |
| S2 | Import Finance in Kenya (C3 spin-out) | Deep-dive | **Shipped 12 July 2026** | [import-finance-kenya-guide]; carries the import-side LC content, so P1-2 narrows to the export-corridor LC angle or folds entirely. |
| S3 | Business Valuation in Kenya (C3 spin-out) | Deep-dive | **Shipped 12 July 2026** | [business-valuation-kenya-guide]; normalisation, methods, multiple drivers. |
| C2 | The Ultimate Guide to Investing in Kenya | Cornerstone | **Shipped 10 July 2026** | Gaps absorbed as sections; G2/G3 become spin-out deep-dives |
| C3 | The Complete SME Finance Handbook for Kenya | Cornerstone | **Shipped 12 July 2026** | Published as [sme-finance-handbook-kenya] (SME Finance, featured, ~7,900 words). PO/LPO finance, import finance, and business valuation absorbed as full sections per plan. 27 internal links; reverse links from AR, budget, and capital articles. Rates dated 2 July 2026; re-date on refresh. |
| C4 | The Complete Guide to Trade Finance in Kenya | Cornerstone | **Shipped 1 August 2026** | Published as [trade-finance-kenya-complete-guide] (business-trade/, SME Trade Finance, featured, ~8,100 words). **Owns the ground no satellite held:** the four-rung payment ladder (advance / documentary collection / LC / open account) as a risk seesaw; the **export-side** LC (beneficiary's four decisions: issuing-bank quality, whether to confirm, reading the credit before shipment, clean presentation, then negotiating/discounting the accepted draft) which closes the P1-2 gap; the document file table (B/L vs **air waybill is not a document of title**, invoice, packing list, certificate of origin, insurance, conformity, phytosanitary); **Incoterms 2020** and the two consequences SMEs miss (the Incoterm changes the CIF customs value and therefore the whole duty stack, and CFR leaves the voyage uninsured); the landed-cost stack worked on KES 4M CIF (25% duty, **IDF 3.5%**, **RDL 2%** raised from 1.5% by the Tax Laws (Amendment) Act 2024 eff 27 Dec 2024, VAT 16% on CIF+duty+levies = KES 6,235,200 cash at the port, of which VAT is a cash event not a cost); the **trade cash gap** formula worked to 117 days; the cost-stack table (interest vs commission-per-quarter vs fixed fees, and the cash margin as an uncounted cost); trade-line approval requirements; and a five-question FAQ. EAC/AfCFTA section per the "fold AfCFTA into C4" decision: Kenya ratified and gazetted provisional tariff schedules, first Guided Trade Initiative consignment to Ghana Oct 2022, KRA issues AfCFTA certificates of origin, **logistics is the binding constraint, not the tariff**. Links import-finance, LPO, AR, guarantees, hedging, AGPO, fees/FX, contractor stack, seasonal agri, overdraft, WC cycle, 13-week forecast, bank proposal, handbook, new-business journey, RM, and the new VAT piece. Reverse links wired from import-finance, sme-trade-finance, bank-guarantees, LPO. **P1-2 is now closed by absorption** (export LC mechanics are C4 Part 4). |
| C5 | The Complete Guide to Property Money in Kenya | Cornerstone | **Shipped 1 August 2026** | Published as [property-money-kenya-complete-guide] (investing/, Real Estate, featured, ~6,000 words). Shipped with a **lean succession section that flags E2 rather than pre-empting it**, per the C2 → G2/G3 pattern. **What C5 owns:** (1) an honest, sympathetic diagnosis of *why* Kenyans over-index on land (it worked, it resists inflation, it is the collateral banks trust, the alternatives were genuinely bad, and it carries social meaning) followed by the three things that changed (DhowCSD-era alternatives now exist, the easy corridors are priced, and the round trip got more expensive); (2) the **five-vehicles table** (raw land / rental / own home / REIT / syndicate share) with the observation that only two of the five produce income, which resolves most confused property conversations; (3) **tenure**: freehold vs leasehold with the unexpired-term point (a short lease is hard to mortgage), and **sectional title under the Sectional Properties Act No. 21 of 2020** (applies to freehold or leasehold with 21+ years unexpired; long-term apartment leases to be converted), plus what a registry search does and does not prove; (4) the **transaction cost stack**, worked on a KES 8m plot to **KES 8,485,000 all-in, 6.1%**, with stamp duty **4% urban / 2% rural on the higher of assessed value or price** and the **April 2024 Lands directive that pushed Kikuyu, Ruiru and Thika into the 4% band**; (5) the **funding comparison** across cash / SACCO / chama / mortgage / KMRC, with the under-stated point that banks rarely finance raw land, so the "buy a plot on a mortgage" plan dies at underwriting; (6) **Part 9, the signature section**: the same plot sold three years later at KES 9m returns **KES 131,750** after selling costs and CGT, against roughly **KES 2,104,000** from a 364-day T-bill ladder over the same period, and the **required appreciation to merely match the bill is ~12.5% a year** (algebra shown; sale price would need to be ~KES 11,390,000); (7) **Part 10 on land banking**, naming the five real drivers of appreciation and the timing problem that prices move on announcement not completion, with three pre-commitment tests; (8) six FAQs. Three qualifications are stated explicitly so the bond comparison is fair (vacant land only, 12.5% over 3 years is a modest assumption, land is uncorrelated to policy rates). Reverse links wired from rental-income, diaspora-land, chama-llp, reits. |
| C6 | The Complete Guide to Fixed Income in Kenya | Cornerstone | **Shipped 1 August 2026** | Published as [fixed-income-kenya-complete-guide] (investing/, Bonds & Bills, featured, ~7,200 words). **Owns:** the three-jobs frame (liquidity / income / ballast) and the instrument map table; the **cross-instrument withholding tax table**, which nothing in the library held before (deposits, SACCO, MMF and T-bills 15%; **FXD under 10 years 15%, 10 years and over 10%**; **IFB exempt** where tenor is 3 years or more; listed dividends 5% for contrast); the **tax-equivalent yield** formula worked (IFB1/2021/021 at 12.737% tax-free = a taxable **14.15%** at the 10% rate, **14.98%** at 15%), against FXD1/2022/015 reopened 19 Jan 2026 at coupon 13.942% clearing at a weighted average accepted yield of **13.1669%**, so the *lower* headline pays more; coupon vs yield and how to read an issue code; primary auction vs secondary market (clean vs dirty price, accrued interest, spread as the cost of liquidity); **duration/price risk** (modified duration ~7 on a 16-year IFB, so +200bp costs ~14% of price) and reinvestment risk as the mirror; the real-return stack (savings account **-3.44% real**, deposit -0.59%, 364-day bill +1.18%, long FXD +5.11%, IFB **+5.95%**); a worked KES 3M income sleeve producing **KES 247,377 tax-free a year** across three IFBs; the SME three-tier cash policy; and seven FAQs. **Rates:** CBR 8.75% (8 Apr 2026), KESONIA 8.75% (23 Jul 2026), T-bill averages into the 6 Aug 2026 auction (91d **8.7882** / 182d **8.9545** / 364d **9.0169**, a 23bp curve), inflation 6.41% (Jun 2026), savings 3.23% and deposit 6.80% (May 2026). **Live IFB data:** CBK opened a **KES 150bn** tax-free IFB sale on 30 July 2026 reopening IFB1/2019/016 (11.75%), IFB1/2021/018 (12.667%), IFB1/2021/021 (12.737%), auction 12 Aug, settlement 17 Aug 2026. Minimums verified on CBK: **KES 50,000 non-competitive**, KES 2m per CSD account per tenor competitive, denominations of KES 50,000. Reverse links wired from kb-bond, dhowcsd-ladder, mmf-stress-test, future-mmfs, diaspora-bond, paye. **Highest maintenance item in the library: re-date the rate tables quarterly.** |
| C7 | The Complete Guide to Insurance in Kenya | Cornerstone | **Shipped 1 August 2026** | Published as [insurance-kenya-complete-guide] (investing/, Wealth Optimization, featured, ~4,900 words). **Owns:** the **frequency/severity two-by-two** (insure high-severity low-frequency; self-insure the rest; "fix the business" where a risk is both likely and ruinous) which is the organising test the cluster lacked; the **penetration hook**, 2.2% of GDP in H1 2025 down from 2.4%, against a global average of 7.4%, sourced to IRA/CBK and the Allianz Global Insurance Report 2025; an **18-row product map** covering every class a household or SME meets, with **business interruption flagged as the most consistently missing cover**; **Part 3 on distribution economics**, the honest section explaining why savings-linked products get sold over term life and giving three defences (ask for the term quote at the same sum assured, ask how the intermediary is paid, separate the two decisions); a **needs calculation** with KaTeX and a worked household showing an indicated sum assured of **KES 24.2m against the ~KES 5m of typical group cover**, which is the concrete case for term over bundled; and **Part 8 on insurer failure**, where the Policyholders Compensation Fund (Legal Notice 105 of 2004, operating from January 2005) pays a maximum of **KES 500,000 per claim**, making insurer solvency the buyer's own risk. Plus how to buy so the claim pays (disclosure, sum insured and averaging, exclusions, inner limits, waiting periods), how to claim, bank-linked credit life, a what-to-skip list, and seven FAQs. **Endowments deliberately handled in ~200 words** and handed to G13's 19,700-word treatment; A9 keeps the risk *process* and C7 takes only the product map. Motor third-party noted as compulsory. Reverse links wired from insurance-stack and business-insurance. |
| C8 | Tax, Compliance, and Cash for Earners and SMEs | Cornerstone | **Shipped 1 August 2026** | Published as [tax-compliance-cash-kenya-guide] (economy-policy/, Wealth Optimization, featured, ~6,400 words). **Deliberately leaner than C2/C3/C4** and written as an assembly per its own brief ("do not start as a cold 10k-word piece"): Part 12 is an explicit hand-off table routing readers to the ten articles that own the mechanics, and no satellite's ground is restated. **What C8 owns that nothing else does:** (1) the **three families** frame (taxes on what you earn / transact / own and transfer) with the observation that TOT sits in the "earn" family while behaving like a "transact" tax; (2) the **assessed vs collected** distinction, which is the piece's spine, and the sinking-account rule that follows from it; (3) the **employment wedge**, decomposing R3-11's KES 150,000 worker into NSSF 6,480 + SHIF 4,125 + AHL 2,250 + PAYE 33,527 = net 103,618, then adding the employer's matched 8,730 to show total employment cost **KES 158,730 against KES 103,618 received, a wedge of 55,112 or 34.7%** (the figures tie exactly to R3-11's taxable-pay figure of 137,145, which independently validates both articles); (4) the **total tax bill of one SME**, a KES 40m-turnover distributor on 6% net margin remitting **KES 2,401,000 in a year it earned KES 2,400,000**, of which only **990,000 is its own money** and 1,411,000 (59%) was collected from customers, staff and suppliers; (5) the **complete filing calendar** (monthly/quarterly/annual/on-event) including the 9th vs 20th distinction; (6) the **penalty table across every tax head**, with the actionable finding that **PAYE late filing at 25% is five times VAT's 5%**, hence "file even when you cannot pay"; (7) **WHT you must deduct** as an agent (resident 5% professional/training, 3% contractual, 5% royalties, 15% interest; 5 working-day remittance; 10% failure-to-deduct penalty), which is the mirror of R3-11's WHT-you-suffer; (8) **compliance as a commercial asset** (TCC gates tenders/AGPO/permits/credit; under-declaring caps what you can borrow against); (9) the **objection path** (30 days to object, Commissioner decides in 60 or the objection is deemed allowed, 30 days to the Tax Appeals Tribunal, 30 days to the High Court, plus ADR), which operationalises the house rule that KRA is final unless the courts or the Tribunal say otherwise; (10) the household consumption-tax coda making the point that the payslip's 30.9% is a floor. **Statutory rates verified:** SHIF 2.75% of gross employee-only, min KES 300, no cap; AHL 1.5% each side; NSSF fourth phase Feb 2026. Reverse links wired from all four tax satellites. **Round Four Phase 2 is complete.** |
| C9 | The Complete Guide to Digital Growth for Kenyan SMEs | Cornerstone | **Shipped 1 August 2026** | Published as [digital-growth-kenya-sme-guide] (technology/, Digital Strategy, featured, ~4,500 words). Pillar 3 finally has a hub. **Spine held exactly as briefed:** attention → enquiry → sale → retention → data loop, as a mermaid chain, with the argument that **money spent upstream of a broken link is wasted** and the break is rarely where the owner assumes. **Owns:** (1) the **link-to-deep-dive table**, mapping each stage to its owner in the cluster; (2) the **unit economics**, which nothing in the cluster held, `Revenue = Visitors × Conversion × AOV × Purchases per customer` plus CAC and LTV with KaTeX, worked on a retailer where doubling traffic (→ KES 369,600) is beaten by fixing conversion (→ KES 571,200) and nearly matched by lifting repeat rate (→ KES 308,000), with a derived **CAC ceiling of ~KES 500** against an LTV of KES 1,470; (3) the **symptom → broken link → fix diagnostic table**, including the row that catches the real case, "busy but not profitable" is a margin problem, not a growth problem; (4) the **five-number minimum measurement set**; (5) the **P3-1 local-search fold**, executed here as briefed (Business Profile first, then reviews, then Kenyan intent language mixing English/Swahili/Sheng, only then content and paid) with the honest note that social is an attention channel, not a buying-intent one; (6) the **Kenyan enquiry-and-sale reality** (WhatsApp not contact forms; M-Pesa-first checkout; response speed as the highest-leverage variable); (7) **hire vs outsource vs DIY** as a table with two agency tests ("which link, measured how" and "what happens when I stop paying"); (8) a **90-day sequence** whose value is the order; (9) seven FAQs. Deliberately excluded per brief: fintech trend pieces and the AI-detector opinion. Closes with the bankability angle linking anatomy-of-a-bank-proposal and new-business-journey. Reverse links wired from sme-seo, website-traffic, whatsapp, retail-dashboard. |
| C10 | Retirement, Pensions, and Leaving Money Behind | Cornerstone | **Shipped 20 September 2026** | Published as [retirement-income-annuity-drawdown-kenya], deliberately **not** a third pension explainer. Owns decumulation: longevity/sequence/inflation risk; the **Finance Act 2025 change** replacing the KES 600,000 lump sum and KES 300,000 annual caps with conditions (retirement age, ill health, or 20 years of membership) from 1 July 2025; annuity vs regulated drawdown under **LN 187/2023** (10-year minimum, **12% p.a. of the outstanding balance** as a ceiling not a target) vs a self-managed bond ladder; and Part 7, how each route's residue reaches the family, which closes the arc into R3-10 and E3. |
| A4 | How Banks Actually Make Money | Standalone | **Shipped 20 June 2026** | Published as [how-banks-actually-make-money-kenya]. Four-engine frame (interest spread/NIM, fees, FX, trade & digital) plus the cost side; generic economics, no Absa margins. Rates April 2026 CBK (lending 14.69 / deposit 6.88 / savings 3.31). |
| A5 | The Ultimate Guide to SACCO Membership in Kenya | Standalone | **Shipped 19 July 2026** | Published as [ultimate-guide-to-sacco-membership-kenya] (Wealth Optimization, ~3,000 words). Deliberately excludes lending/guarantor ground (owned by [sacco-savers-guarantors]) and savings-placement ground (owned by [bank-vs-sacco-vs-mmf-savings]). Covers share capital vs non-withdrawable deposits vs FOSA, BOSA/FOSA split, blended-return formula box, one-member-one-vote and AGM/delegates, nominees on death, the exit process (mermaid flow; guarantee release as the binding constraint), mergers/restricted licences, and the dormant Deposit Guarantee Fund vs KDIC. Reverse links wired from sacco-savers-guarantors, bank-vs-sacco-vs-mmf-savings, and the inclusion cornerstone. **Nominee law corrected 19 July 2026 (owner-supplied):** there is *no* monetary ceiling on nominee transfers under Cap 490. A valid Section 39 nomination bypasses the estate entirely and transfers directly to the nominee regardless of amount, which is itself the source of nominee-vs-heir disputes; the article now says so and carries the KenyaLaw and LawGuide citations. The separate statutory cap that does exist (no member may hold more than one fifth of issued and paid-up share capital) was added to Part 1 as a formula box. **WHT resolved 19 July 2026 (owner-supplied):** resident withholding tax is 5% on share dividends and 15% on deposit interest, both final and deducted at source; dividends are flat on share capital while deposit interest is pro-rata weighted average, so early-year contributions earn more. Part 3 now carries the rate table, an after-tax blended-return formula, and a worked KES 10,000 example (net KES 1,900 vs KES 850). Rates flagged as resident-only and Finance Act dependent. Sector stats carried from existing sourced articles, re-date on refresh. |
| A6 | Understanding Interest Rates in Kenya | Standalone | **Done via expansion, 10 July 2026** | APR article expanded and retitled (id unchanged): flat vs reducing amortisation, EIR, fine-print charges, and the Duplum Rule. The Duplum addition also gives C1 its missing link target. |
| A7 | Financial Ratios Every SME Owner Should Know | Standalone | **Shipped** | Published as [sme-financial-ratios-kenya] (seven ratios, KaTeX formulas, worked Kenyan examples). |
| A8 | How to Read Financial Statements | Standalone | **Shipped 19 July 2026** | Published as [how-to-read-financial-statements-kenya] (SME Finance, ~3,300 words). **Deliberately reuses A7's Mama Chai Foods Ltd** and presents its full income statement, balance sheet, and cash flow statement, constructed so all three articulate exactly (net profit 1.2M to retained earnings 3.8M; closing cash 1.0M matching the balance sheet). A8 teaches the statements, A7 takes over for ratios; reverse link wired into A7's example block. Includes the three tie-points as a mermaid diagram, a lender's reading order, annual-report navigation (auditor's opinion first, then notes), and non-accountant red flags. **Sourcing note:** the plan called for real NSE-listed walkthroughs, but Safaricom (403) and KCB (timeout) investor pages would not verify, so no figures are attributed to real companies; only NSE and EABL investor pages are linked (both verified 200) and readers are pointed there to practise. Composite-example status disclosed in the closing note. |
| A9 | The Complete Guide to Risk Management for SMEs | Standalone | **Shipped 19 July 2026** | Published as [sme-risk-management-kenya]: seven-domain map, one-page register, treatment order, domain playbooks, operating rhythm, 30-day stand-up. Paired with G5 insurance. |
| A10 | How to Evaluate Any Investment Opportunity | Standalone | **Shipped 19 July 2026** | Published as [evaluate-investment-opportunity-kenya] (Wealth Optimization, featured): eight tests, scoring sheet /40, three worked verdicts, printable checklist. Signature filter piece for the investing cluster. |
| R3-1 | The Overdraft That Never Clears | Banking & Credit / SME Finance | **Shipped 20 July 2026** | Published as [overdraft-that-never-clears-kenya] (SME Finance, ~2,900 words). Owns daily-utilisation interest (KaTeX sum), the clean-down covenant, the three statement patterns (swinging / sawtooth / flatlined-hardcore), the zero test, and a verified worked cost table (permanent OD 1.9M @18% = 1,026,000 interest over 3yr with principal intact vs 3yr term @16% = 504,741 interest, gap ~521k). Notes revolving facilities sit outside the KESONIA/CBR transparency regime. Reverse link wired from working-capital-cycle. |
| R3-2 | Logbook Loans in Kenya | Banking & Credit | **Shipped 23 July 2026** | Published as [logbook-loans-kenya] (Banking & Credit, ~3,300 words). Owns: what the security agreement actually creates (MPSRA 2017, which repealed the Chattels Transfer Act Cap 28 and Pawnbrokers Act Cap 529, in force 16 May 2017) plus NTSA/TIMS joint registration; the regulated-vs-credit-only split; flat-to-reducing conversion (KES 500k @ 3%/month flat over 12m = **KES 180,000 interest, 5.08%/month reducing, 61.0% nominal APR, 81.2% effective**, against 36% as naively assumed, and KES 135,600 more than the same money at 16% reducing, all IRR-verified); the non-interest cost stack (valuation, tracker, forced comprehensive cover, early-settlement penalty); and the enforcement timeline as a mermaid flow. **Statutory spine (verified against Kenya Law AKN text and independently against Ckoile & Co commentary):** s.71(1) possession without court order where the grantor consented in the security agreement or does not object, no advance notice; s.73 notice of intended disposal at least **five working days** before sale, to grantor/debtor/registered secured creditors, sale to be commercially reasonable, s.73(5) perishable exception; s.69 redemption at full balance plus costs until sale; s.74(4) debtor remains liable for any shortfall. Reframes the harm as asset-value destruction rather than shortfall (worked waterfall: 1.2M car, 380k debt, 850k quick sale, 120k costs, 350k surplus, ~470k of net worth destroyed). Regulatory status dated: Business Laws (Amendment) Act 2024 → draft NDTCP Regulations 2025 (published Aug 2025, comment closed 5 Sept 2025, KES 20m licensing threshold, reaches logbook lenders) flagged **as draft, not yet in force**; 252 licensed DCPs as at July 2026. Reverse links wired from borrowing-money-in-kenya-guide (x2), asset-finance-vs-conventional-loans, and debt-consolidation-refinancing-kenya. Re-check the NDTCP draft status on refresh. |
| R3-3 | Check-Off and Salary Loans | Banking & Credit | **Shipped 20 July 2026** | Published as [check-off-salary-loans-kenya] (Banking & Credit, ~2,900 words). Owns: three-party mechanism, **Employment Act 2007 s.19 two-thirds deduction ceiling** (verified via Kenya Law/sheriaplex, KaTeX inequality + worked 80k-net example), flat-vs-reducing trap (9% flat ≈ 16% reducing on 500k/4yr, verified), employer-scheme vs open-market vs SACCO-multiplier comparison, invisible-deduction stacking, double-deduction month, employer non-remittance, and clean-check-off-history as a CRB asset. Reverse link wired from debt-consolidation. |
| R3-4 | The 13-Week Cash Forecast for SMEs | SME Finance | **Shipped 26 July 2026** | Published as [13-week-cash-forecast-kenya-sme] (business-trade/, SME Finance). Five-block build (opening cash, cash in split contracted vs expected, cash out split fixed vs variable, net/closing with KaTeX, minimum cash line), worked six-week sheet with a profitable-but-insolvent Week 6, three scenarios (base/slow-collections/shock), lever-matching by gap shape (invoice/overdraft/fix-the-model), and the "forecast sizes the facility" RM pitch (depth = size, recovery = repayment). Mermaid decision flow. Reverse links available from WC cycle, statements, ratios, anatomy-of-a-bank-proposal, AR, overdraft. |
| R3-5 | Hire Purchase vs Asset Finance vs Logbook | Banking & Credit | **Shipped 26 July 2026** | Published as [hire-purchase-vs-asset-finance-vs-logbook-kenya]. Nine-row comparison table (ownership timing, rate method, deposit, tenor, default, best-when); worked KES 2M vehicle showing 13% flat HP ≈ 22% reducing, ~KES 288k dearer than 16% asset finance (KaTeX flat/reducing formulas); flat≈1.8-1.9× reducing rule; "lipa mdogo mdogo" instalment illusion; murabaha/ijara alternative (compare totals); mermaid decision tree. R3-2 supplies the logbook leg, so it links out rather than re-explains. Links asset-finance, logbook, APR, islamic-banking, borrowing hub, WC cycle. |
| R3-6 | Contractor Cash Flow Stack | SME Trade Finance | **Shipped 26 July 2026** | Published as [contractor-cash-flow-stack-kenya]. Full contractor cash cycle as mermaid (bid bond → performance bond → advance → mobilise → bleed → progress claim → certification lag → payment less retention → retention tail); pricing bid/performance/advance guarantees into the bid AND the shared-limit clash with the overdraft; advance-worked-off-from-certificates discipline; LPO for materials + overdraft for the running bleed; certificate-as-financeable-receivable; public vs private payment behaviour + AGPO reality; two-stage retention release and the retention bond. Stitches bank-guarantees, LPO, AGPO, AR, overdraft into one system. |
| R3-7 | Seasonal Agri Working Capital | SME Trade Finance | **Shipped 26 July 2026** | Published as [seasonal-agri-working-capital-kenya]. Owns the *domestic* seasonal loop (deliberately hands export corridors to agri-export/sme-trade-finance and stays out of agronomy). Seasonal cash-map mermaid (plant-out → harvest-in, price-floor-at-glut); input credit vs honestly-priced merchant credit; short harvest-bridge (repay-from-proceeds); warehouse-receipt / inventory finance under the **Warehouse Receipt System Act 2019** (WRSC regulator) with a store-vs-sell KaTeX test; the term-loan shape-mismatch as the core error ("seasonal income needs seasonal repayment"); the aggregating trader's price-bet version. |
| R3-8 | Dividend Income on the NSE | Wealth Optimization | **Shipped 26 July 2026** | Published as [dividend-income-nse-kenya] (investing/, Wealth Optimization). Yield-vs-total-return worked table (8%-yield share losing 7%, 4%-yield share up 19%); four sustainability tests (payout ratio KaTeX, profit-as-cash, consistency, leverage); **5% resident WHT final at source** on listed dividends (15% non-resident; 12.5%-holding company exemption), dated July 2026, flagged Finance Act variable, after-tax-yield formula; income-sleeve placement above MMF/bonds as the growth-and-income (not safe) layer; concentration as the sleeve's hidden risk. No specific share figures attributed (illustrative only); NSE 20 +56.13% 2025 carried from the investing cornerstone. |
| R3-9 | Rental Income Cash Flow for Landlords | Real Estate | **Shipped 27 July 2026** | Published as [rental-income-yield-tax-kenya] (investing/, Real Estate). Gross-vs-net waterfall on a KES 6M / KES 40k-per-month unit (8.0% gross to ~4.8% net, KaTeX yield formulas + mermaid leakage flow); **residential MRI tax** owned: 7.5% of *gross* rent (final, no deductions, reduced from 10% eff 1 Jan 2024), KES 288k-15M band, election-out into the normal regime for high-cost years, commercial-rent/VAT boundary, non-resident WHT, dated 2026 + KRA disclaimer; vacancy/deposit/tenant-risk section; the awkward net-yield-vs-IFB/MMF/REIT table; and a worked negative-carry leverage trap (net income 287k vs 711k mortgage = ~424k/yr subsidy). Reverse links available from diaspora-land, reits, chama-llp, mortgage-decision, evaluate-opportunity, kb-bond. |
| R3-10 | Wills, Nominees, and Owner Succession | Wealth Optimization | **Shipped 20 September 2026** | Published as [wills-nominees-business-continuity-kenya]. Intestacy under Cap 160 (s.35 life interest and the remarriage proviso, s.36/38/39/40, s.41 minors' trust, s.45 intermeddling, s.71 six-month confirmation bar). Signature ground is the **three-way nomination contrast**: SACCO nomination bypasses the estate outright (Co-op Act s.39), a life policy pays outside it (Insurance Act s.111 and the MWPA trust), a **pension nomination does not bind trustees**, who may refuse and record reasons. Plus sole trader vs company bank access on death. |
| R3-11 | PAYE, Withholding, and Freelance Tax | Wealth Optimization | **Shipped 29 July 2026** | Published as [paye-withholding-freelance-tax-kenya] (investing/, Wealth Optimization, ~2,500 words). Owns the **order of operations**: allowable deductions reduce taxable pay, bands apply, personal relief is credited last (mermaid two-path flow showing contributions hitting both the tax calc and the cash). Bands verified against PwC as effective **1 July 2023 and still current**: 10/25/30/32.5/35 with monthly equivalents; personal relief KES 2,400/month. **The Key Insight is the 27 Dec 2024 TLAA change**: SHIF and AHL moved from reliefs to allowable deductions (ITA s.15(2)(ae) and s.15(2)(ac), s.30A repealed), so a contribution costs `amount × (1 − marginal rate)`; worth ~KES 1,913/month to the worked earner. Pension cap now KES 360,000 p.a. (from 240,000); mortgage interest KES 360,000 p.a. and extended to construction by Finance Act 2025. **NSSF fourth phase, Feb 2026**: LEL 8,000→9,000, UEL 72,000→108,000, rate unchanged at 6%, max employee KES 6,480/month. Full worked payslip on KES 150,000 gross: taxable 137,145, PAYE 33,527, net 103,618, marginal 30% vs **effective 22.4%** vs total deductions 30.9%. Freelance half owns WHT as **advance not settlement**: 5% resident on gross invoice value (not profit), KES 24,000/month aggregate exemption, 5-working-day remittance; worked 1.2M billing year where 60,000 withheld against a 178,600 liability leaves **118,600 due at filing**, plus instalment tax at the KES 40,000 threshold on 20 Apr/Jun/Sep/Dec. Deliberately does not restate the two-thirds deduction ceiling (owned by [check-off-salary-loans-kenya]), MRI (owned by [rental-income-yield-tax-kenya]), or dividend WHT (owned by [dividend-income-nse-kenya]). **TOT deliberately excluded**: sources conflict (see T2). Unblocks C8. |
| R3-12 | How to Choose and Switch Your SME Bank | Banking & Credit | **Shipped 20 September 2026** | Published as [choose-switch-sme-bank-kenya]. Adjusted as briefed: no product re-listing. Owns the **seven-criterion scorecard** (RM, full tariff, FX pricing, trade/lending capability, digital rails, collections fit, multi-currency and branch reality), the rational multi-bank case, a **nine-step switch sequence whose load-bearing step is negotiating facilities before moving flows**, the red flags, and the counter-flag that several declines means the problem is the numbers, not the bank. |
| T2 | Turnover Tax vs Corporation Tax | Round Four (Tax) | **Shipped 1 August 2026** | Published as [turnover-tax-vs-corporation-tax-kenya] (business-trade/, SME Finance, ~4,100 words). **The 29 July rate conflict was resolved by the owner ruling that KRA is the authority**, so the article states **1.5% of gross sales**, effective **1 July 2023 per Finance Act 2023**, and explicitly tells readers the widely-quoted 3% is the stale pre-Finance Act 2023 figure. **Owns the break-even**: `0.015 × turnover = 0.30 × profit` gives a **5% net margin** indifference point for companies, worked either side of it (thin-margin distributor, KES 20m turnover at 3% margin, pays 300k TOT vs 180k corporation tax, an **effective 50% on actual profit**; salon, KES 8m at 20% margin, pays 120k vs 480k, an effective 7.5%). **Sole-trader leg** worked separately because the graduated bands change the answer: annual bands 288k/388k/6m/9.6m at 10/25/30/32.5/35, personal relief KES 28,800 a year exactly cancelling the tax on the first KES 288,000, so the crossover on KES 8m turnover is ~**8.8%** not 5%, and it **moves with turnover**. **Two KRA facts corrected my own brief**: TOT applies to any resident **person *or corporate***, so limited companies inside the band are eligible (incorporation does not decide the regime); and there is an **election out in writing to the Commissioner**, so the band is not a sentence. Also owns: the **loss year** (TOT payable on sales with no relief and no carry-forward, so volatility argues for the normal regime even above break-even); growing through the KES 25m ceiling without books; what TOT does **not** exempt you from (VAT, eTIMS, PAYE, WHT, records); and the compliance-rhythm table (TOT monthly on the 20th, late filing **KES 1,000/month**, vs instalments on the 20th of months 4/6/9/12, balance within 4 months of year end, return within 6 months, instalment threshold KES 40,000, agricultural 75/25). Corporation tax stated at **30%**, with the old 37.5% branch rate noted as repealed. **The consultant angle landed as briefed**: professional/management/training fees are excluded outright, so most freelancers cannot use TOT on fee income at all. Reverse links wired from vat-for-smes, paye, etims, new-business-journey. |
| T3 | VAT for SMEs: Registration, Input Credits, Cash Flow | Round Four (Tax) | **Shipped 1 August 2026** | Published as [vat-for-smes-kenya] (business-trade/, SME Finance, ~3,700 words). Held the cash-flow lane throughout. **Owns:** the `16/116` gross-extraction formula (VAT inside a gross figure is 13.79%, not 16%, and applying 16% to a gross understates by a sixth); the **registration decision as a two-variable matrix** (who your customers are × how much input VAT you carry), not a size question, with the "registered customers + high input VAT = register even voluntarily" mechanism worked; the **KES 1M-on-20-February worked trap** (KES 10M invoice + 1.6M VAT issued 5 Jan on 60-day terms, 600k input VAT, so 1.0M remitted three weeks before the customer pays); zero-rated vs exempt as opposites (exempt supplier is 16% worse off on every vatable input, invisibly); the three input-credit killers (**six-month window**, **supplier must have declared the sale** since 2023 so supplier compliance is now your commercial risk, valid eTIMS invoice); and the VAT sinking-account discipline. **Verified:** threshold **KES 5m** rolling 12 months (KRA), standard **16%**, fuel 8%, filing and payment by the **20th**, nil returns still required, late filing higher of 5% or **KES 10,000**, late payment 5% plus **1%/month** interest. **Change log 2023-2026** included: 2023 supplier-declaration condition; 2024 90:10 apportionment removed and business transfers exempted; 2025 tax invoices required regardless of supply type; **2026 bad-debt relief restored to three years eff 1 July 2026** (reversing the Finance Act 2025 shortening), **financial services exemption narrowed to bring digital payment processing, merchant acquiring and gateway services into the 16% net**, labour/outsourcing disbursements excluded from taxable value. **Flagged as proposal, not law:** KRA's 2026 float of scrapping the KES 5m threshold entirely. Deliberately does **not** touch TOT (owned by T2, still rate-unresolved), PAYE/WHT ([paye-withholding-freelance-tax-kenya]) or MRI ([rental-income-yield-tax-kenya]). Reverse links wired from etims, 13-week forecast, WC cycle, paye. |
| T4 | Capital Gains Tax: Land, Shares, and Business Exit | Round Four (Tax) | **Shipped 1 August 2026** | Published as [capital-gains-tax-kenya] (investing/, Wealth Optimization, ~4,200 words). **Rate verified on KRA: 15% of the net gain, effective 1 January 2023, up from 5% (Finance Act 2022), a final tax, paid by the transferor.** Tax point is the **earlier of the vendor receiving the full purchase price or registration of the transfer instrument**, so the article frames CGT as a *completion* problem rather than a filing-season one. **The organising idea is that CGT is a records tax wearing a rate:** the same plot sale is worked twice, once with full documentation (adjusted cost 3,250,000, net gain 5,390,000, CGT **808,500**) and once where the seller cannot evidence 750,000 of legitimate stamp duty and improvement spend (net gain 6,140,000, CGT **921,000**), a **KES 112,500 penalty for lost receipts** on an otherwise identical transaction. Also carries the enhancement-vs-maintenance boundary, the net-proceeds point (seller keeps 7,831,500 of a 9,000,000 headline, ~87%), and the file-to-keep checklist. **Exemption table** from KRA's FAQ: land at or under **KES 3,000,000**; private residence occupied continuously **3 years**; agricultural land **under 50 acres** outside a municipality/urban area (note: several advisory sources say 100 acres, which does not match KRA or the Eighth Schedule, so 50 is used); **securities on a licensed exchange, which is why NSE gains are exempt**; spouse/former spouse/immediate family; personal representative to beneficiary and estate sales within 2 years of death; registered family trusts; property transferred as security; a company issuing its own shares; and restructurings. Flags that exemptions must be claimed and evidenced, not assumed. **Indirect-transfer rules effective 1 July 2023** included (foreign entity deriving >20% of value from Kenyan immovable property; non-resident disposing of >20% interest in a Kenyan company), which matters for diaspora holding structures. **The share-sale vs asset-sale section is the piece's strongest original ground**: one tax layer vs two, sellers prefer shares and buyers prefer assets, mermaid decision flow, and the instruction to *reprice* rather than refuse when a buyer insists on assets. Closes with the "when it is not CGT at all" fork (property dealers taxed as business income at ordinary rates, up to 35%, which routes to T2). Reverse links wired from business-valuation, diaspora-land, how-to-buy-shares-nse, chama-llp. |
| E2 | Land Succession and the Diaspora Problem | Round Four (Estate) | **Shipped 20 September 2026** | Published as [land-succession-transmission-kenya]. Separates the three steps families conflate: **succession cause, transmission (LRA 2012 s.61), transfer**, with s.60 joint tenancy as the contrast. Prices the delay honestly (heirs multiply, evidence decays, and occupation can ripen into adverse possession under Limitation of Actions Act s.7/s.38). Diaspora POA formalities. KRA's exemption for transfer of family property on the demise of the registered member. Closes with the buyer's eight-point check. C5's handoff sentence now points here. |
| E3 | Family Trusts and Holding Structures | Round Four (Estate) | **Shipped 20 September 2026** | Published as [family-trusts-holding-structures-kenya]. The 2021 amendment (statutory family trust definition, Principal Registrar, 60-day decision), the Finance Act 2021 exemptions (ITA First Schedule Part I paras 36(g), 57, 58; Stamp Duty Act s.52(2)(b)) and **where they stop: shares are movable property, so the immovable-property CGT exemption does not reach them**. Trust vs LLP vs holding company decided on one row, whether the asset bypasses the estate. Deliberately argues most families need a will and updated nominations instead. |
| M1 | How to Read a CBK Rate Decision | Round Four (Rates) | **Shipped 20 September 2026** | Published as [how-to-read-cbk-rate-decision-kenya], category **Rates & Policy** (new; one line added to `src/data/media.ts`). Evergreen mechanics as briefed: MPC composition including the **non-voting Treasury seat**, at least every two months, read the reasoning not the number. Owns the **two-channel model** (credit channel to loan repricing, yield channel to bills and MMFs) and the **asymmetry table**: lending 14.39% vs savings 3.53% (Jul 2026) with the 91-day bill at 8.784% sitting between them. |
| M2 | The Kenyan Yield Curve | Round Four (Rates) | **Shipped 20 September 2026** | Published as [kenyan-yield-curve-explained]. Reads the **10 September 2026 auction**: 91d 8.767 / 182d 8.930 / 364d 9.067, so **273 extra days buys 30bp, about KES 3,000 on a million**. Teaches reading an auction properly (bid-to-cover **3.70x at 91d against 1.30x at both longer tenors**, accepted vs received, then the rate), and converts shape into a ladder-tenor rule. Flags explicitly that the flat **bill** curve says nothing about the bond end. |
| M3 | Inflation, the Shilling, and Your Real Return | Round Four (Rates) | **Shipped 20 September 2026** | Published as [inflation-shilling-real-return-kenya]. The pillar's signature move, executed: Fisher formula box, then the full stack across six instruments against **6.6% inflation (Aug 2026)**. Savings **-3.38%**, deposit **-0.67%**, 91d bill **+0.81%**, 364d bill **+1.04%**, long FXD **+4.31%**, IFB **+5.76%**, so the **lower headline tax-exempt bond beats the higher taxed one**. Currency handled as a household matching problem at KES 129.46/USD (28 Aug 2026), not a trading view. |
| X1 | Digital Assets in Kenya (crypto remediation) | Round Four (Fix) | **Shipped 20 September 2026, blocker cleared** | Published as [digital-assets-kenya-regulation-tax]. Verification done before drafting, as required. **VASP Act 2025 commenced 4 Nov 2025**, CMA takes exchanges/brokers/advisers/managers/offerings and CBK takes payments/custody/wallets, licensing pending regulations, **transition window closes 4 Nov 2026**. Tax: the **3% DAT was repealed from 1 July 2025** and replaced by a **10% excise duty on VASP fees**; the **Finance Act 2026** (assented 23 June, gazetted 26 June) added **VASP information returns to KRA and automatic exchange of information from 1 July 2026**, with KES 100k/100k/1m penalties. MiCA is one comparison paragraph, never the frame. |

---

## Pillar 1: Corporate Banking & SME Trade Finance

### P1-1. The Anatomy of a Perfect Bank Proposal: What Your RM Looks for Before Approving a KES 10M Facility
**Verdict: Ready.** No existing article covers credit appraisal from the banker's side of the desk. Natural companions already live: [how-kenyan-banks-price-loans], [why-rm-is-sme-growth-asset], [ultimate-guide-to-banking-in-kenya], [how-to-build-an-accurate-startup-budget].
- Angles: the 5 C's of credit, structuring cash cycles, positioning DSCR (KaTeX formula box + worked example).
- Caution: frontline Absa experience is the differentiator, but keep it generic to Kenyan banking practice. No internal templates, thresholds, or margins.

### P1-2. Unlocking LCs and Invoice Discounting: How SME Exporters Avoid the Cash-Crunch Trap
**Verdict: Adjust.** Invoice discounting is already covered in detail (facilities, limits, documentation) in [what-is-accounts-receivable]. Writing it again splits the topical authority.
- Reframe as **the LC mechanics guide**: no dedicated Letter of Credit explainer exists anywhere in the library despite four articles mentioning LCs. Cover LC parties and flow (mermaid diagram), corridor risk pricing (Meru to Mombasa), LCs vs overdrafts on cost, and link out to [what-is-accounts-receivable] for the discounting half.
- Case-study tie-in: [zindua-agri-logistics] and [agri-export-supply-chain] both exist and link naturally.

### P1-3. The Hidden Leak: How Kenyan SMEs Bleed Money on Undisclosed Transaction Fees and FX Spreads
**Verdict: Ready.** Fresh territory. [usd-shilling-hedging] covers hedging, not spread anatomy; [ultimate-guide-to-banking-in-kenya] touches tariffs without the negotiation playbook.
- Angles: negotiating bespoke corporate tariff guides, spotting the margin inside a USD/KES quote (worked table: advertised rate vs interbank vs effective cost), a fee audit checklist.

---

## Pillar 2: Wealth Optimization & Alternative Assets

### P2-1. Advanced DhowCSD Strategies: A Rollover Ladder for 91-Day, 182-Day, and 364-Day T-Bills
**Verdict: Ready; highest-leverage quick win.** DhowCSD is mentioned in ten existing articles and the ladder idea already exists as a one-liner insight ([5-ladder-tenors], [4-cds-online]); nothing walks through the portal step by step.
- Angles: portal walkthrough, automated reinvestment management, tracking CBK rate changes (the site's rates ticker is a natural cross-reference), compounding without manual execution (formula box + ladder table).
- Style-guide note: every quoted rate dated and sourced; CBK data feeds already exist in the repo.

### P2-2. Chama Syndication 2.0: Legal and Financial Frameworks for Land-Banking Without Tears
**Verdict: Ready.** The educational backbone the two case studies ([kikuyu-ridge-syndicate], [kikuyu-ridge-infrastructure]) currently lack.
- Angles: LLP setup for chamas, title handling, exit horizons vs raw appreciation (comparison table).
- Caution: legal-framework content needs the standard "not legal advice" disclaimer and a recommendation to involve an advocate.

### P2-3. The MMF Stress Test: Evaluating Fund Manager Portfolios Beyond the Advertised Yield
**Verdict: Adjust.** [future-mmfs-kenya] owns the market-outlook ground. Keep this strictly a reader skill: how to read an asset allocation sheet, commercial paper concentration red flags, liquidity risk hiding behind headline yield.
- Include a worked "stress test" table on an anonymised fund sheet. Links: [future-mmfs-kenya], [monthly-income-engine-kenya], [3-mmfs-compounding].

---

## Pillar 3: Data & Digital Growth

### P3-1. The KES 0 Organic Traffic Playbook: How an Agri-Brand Multiplied Revenue via Local Search
**Verdict: Adjust; the crowded corner of the library.** [sme-seo-inbound-lead-engine] covers SEO economics, [website-traffic-zero-enquiries] covers conversion failure, [ecommerce-storefront-conversion-launch] holds the 1.1% to 3.4% conversion story this proposal cites.
- Differentiate or fold: the un-owned angle is **local search specifically** (Google Business Profile, location keywords, buying-intent phrases in Kenyan English/Swahili mix). If it cannot hold that lane, upgrade the existing SEO article instead of adding a fourth overlapping piece.

### P3-2. Data-Driven Inventory: How Small Shops Stop Overstocking Capital
**Verdict: Ready.** Educational companion to [retail-data-decision-dashboard]; ties inventory maths to the working-capital theme in [what-is-accounts-receivable] and [sme-packager-optimization].
- Angle adjustment: lead with Excel (the audience's actual tool), position Python/open systems as the graduation step, not the headline. Include a run-rate formula box and a stock-cover table.

---

## Cornerstones (Pillar-and-Cluster Strategy)

### C1. The Complete Guide to Borrowing Money in Kenya (8,000-12,000 words)
**Verdict: Blocked until three gap-fillers exist.** The cluster is otherwise strong.
- Existing supporting articles: [bengula_apr_breakdown_article_improved] (APR, TCC), [how-to-fix-your-crb-listing-kenya] (CRB), [sacco-savers-guarantors] (guarantors), [mobile-digital-loans-real-cost-kenya], [how-kenyan-banks-price-loans], [credit-card-interest-free-period], [asset-finance-vs-conventional-loans].
- **Gaps that must be written first (the plan assumes them as link targets): the Duplum Rule (zero coverage today), a standalone credit score guide, and debt consolidation/loan refinancing.** Write these as normal-length supporting pieces, then assemble the cornerstone.
- Note on length: 8,000+ words is fine for SEO but consider a linked table of contents at the top; the article page has no TOC component.

### C2. The Ultimate Guide to Investing in Kenya
**Verdict: SHIPPED 10 July 2026** as [ultimate-guide-to-investing-in-kenya] (Wealth Optimization, featured, ~9,600 words).
- **Strategy change from the original plan:** rather than waiting for the four missing deep-dives, the cornerstone covers NSE equities, REITs, gold, foreign ETFs, risk profiling, and a pension-wrapper section itself, with sourced 2025/2026 data (NSE 20 +56.13% in 2025; REIT table incl. Fahari -45% and ALP's March 2026 debut; Absa NewGold ETF; Ndovu/Hisa minimums). G2 (NSE) and G3 (REITs) are no longer blockers; when written, they become spin-out deep-dives that take over the detailed ground and receive links from the cornerstone's sections.
- 18 internal links to the existing cluster wired in-text; reverse links added from future-mmfs, bank-vs-sacco-vs-mmf, and the chama guide.
- **Maintenance:** rates snapshot dated 2 July 2026; NSE/REIT figures dated 2025/March 2026; pension cap cited as post-Finance Act 2024 (verify); re-date on refresh, and re-check the REIT table annually per the article's own advice.

### C3. The Complete SME Finance Handbook for Kenya
**Verdict: SHIPPED 12 July 2026.** Structured around the cash conversion cycle; covers becoming bankable, every facility class (working capital, receivables, LPO/PO with mermaid flow, trade/import/export, asset finance, term debt with KESONIA/Premium K and DSCR), the 5 C's in evidence, security anatomy, sector notes, government/DFI money, valuation with a worked earnings-multiple example, restructuring playbook, five-year roadmap, FAQ, and glossary. P1-1 (bank proposal) and P1-2 (LC guide) remain viable as deep-dives that can spin out of the term-debt and trade sections respectively.
- Existing cluster: [sme-trade-finance], [what-is-accounts-receivable] (invoice finance), [asset-finance-vs-conventional-loans], [how-to-build-an-accurate-startup-budget], [how-to-raise-startup-capital-kenya], [how-kenyan-banks-price-loans], [sme-packager-optimization], [agri-export-supply-chain], [etims-kenya-sme-guide].
- Remaining gaps (can be sections of the handbook rather than standalone pieces): purchase order finance, import finance, business valuation. *(PO/import/valuation later shipped as S1–S3 spin-outs.)*

### Already-live hubs (not re-numbered; do not duplicate)

These already function as cornerstones on the site. Round Three and C4–C10 must **link into them**, not rewrite them:

| Live hub | Slug | Owns |
|---|---|---|
| Banking map | [ultimate-guide-to-banking-in-kenya] | Products, accounts, rails, KDIC context |
| Personal finance system | [ultimate-guide-to-personal-finance-kenya] | Household blueprint (budget → invest → estate sketch) |
| Financial inclusion | [ultimate-guide-to-financial-inclusion-kenya] | Access, formalisation, inclusion stack |
| BaaS / platform banking | [banking-as-a-service-kenya-baas-guide] | Embedded rails for builders and partners |
| SACCO membership | [ultimate-guide-to-sacco-membership-kenya] | Ownership side of SACCOs (A5) |

---

### C4. The Complete Guide to Trade Finance in Kenya (8,000–12,000 words)
**Verdict: Ready.** Highest-leverage new cornerstone. C3 maps *which facility*; C4 walks the *trade deal* from order to payment.
- **Organising spine:** importer journey vs exporter journey, with guarantees and FX as shared infrastructure.
- **Absorb or section:** import LCs and loans ([import-finance-kenya-guide]), invoice tools ([what-is-accounts-receivable]), LPO/PO ([lpo-purchase-order-finance-kenya]), guarantees ([bank-guarantees-kenya-sme-guide]), hedging ([usd-shilling-hedging]), AGPO cash flow ([agpo-tender-cash-flow-kenya]), fees/FX ([sme-transaction-fees-fx-spreads-kenya]), export narrative ([sme-trade-finance], [agri-export-supply-chain]).
- **Still thin (write as C4 sections or keep P1-2 spin-out):** export-corridor LC mechanics, document checklist (B/L, invoice, packing list, inspection), Incoterms cash implications for Kenyan SMEs.
- **Satellites that remain deep-dives after C4 ships:** P1-2 (export LCs), R3-6 (contractor stack), R3-7 (seasonal agri WC).
- Folder: `business-trade/`. Featured.

### C5. The Complete Guide to Property Money in Kenya
**Verdict: Ready.** One map for "Kenyan wealth in dirt and buildings" without redoing conveyancing manuals.
- **Parts:** (1) why Kenyans over-index on land, (2) how to buy (title stack, diaspora remote control), (3) how to fund (cash, SACCO, mortgage, KMRC, chama LLP), (4) how to hold for yield (rental net yield; link R3-9), (5) paper property (REITs), (6) exit and fraud defences, (7) decision framework vs bonds/equities.
- **Existing cluster:** [diaspora-land-purchase-kenya], [chama-llp-land-banking-kenya], [complete-chama-guide-kenya], [kikuyu-ridge-syndicate], [kikuyu-ridge-infrastructure], [reits-in-kenya-guide], [kmrc-affordable-housing-mortgage], [mortgage-decision-framework-kenya], [sleeping-asset-optimization].
- **Gap-filler that strengthens C5:** R3-9 (rental income cash flow). Can ship C5 with a lean rental section and spin R3-9 later (same pattern as C2 → G2/G3).
- Caution: standard not-legal-advice / not-a-valuer disclaimers; no Absa mortgage product sheets.
- Folder: `investing/`. Featured.

### C6. The Complete Guide to Fixed Income in Kenya
**Verdict: Ready; natural Bonds & Bills pillar hub.**
- **Parts:** cash and MMFs as the on-ramp, T-bill ladder, Treasury bonds and IFBs, green/sovereign context, how CBR and auctions reprice the book, diaspora DhowCSD access, tax (WHT vs IFB tax-free), building a laddered income sleeve, common mistakes.
- **Existing cluster:** [kb-bond-guide-2026], [advanced-dhowcsd-t-bill-ladder], [cbk-diaspora-bond-access], [cbr-cycle-portfolio-positioning-kenya], [future-mmfs-kenya], [mmf-stress-test-kenya], [fixed-deposit-lending-arbitrage], [1-infrastructure-bonds], [5-ladder-tenors], [sovereign-debt-explained], [green-financing-kenya-guide] (overlap: use-of-proceeds only).
- **Do not re-own:** equity, REITs, gold (C2). Point out, don't duplicate.
- **Maintenance burden:** highest of all cornerstones (auction rates); date every yield and point to CBK/DhowCSD.
- Folder: `investing/`. Featured. Category: Bonds & Bills.

### C7. The Complete Guide to Insurance in Kenya
**Verdict: Shipped 1 August 2026.** See the Fitness Summary row for what the published piece owns. Original brief retained below.
- **Parts:** what insurance is for (transfer of ruin, not "investment"), household life-stage stack, medical and life, motor and property, SME stack, credit life and bank-tied covers, endowments vs pure protection + MMF, how to buy and claim, what to skip.
- **Existing cluster:** [insurance-stack-kenya-life-stages], [business-insurance-kenya-sme-guide], [endowment-plans-kenya-guide], [sme-risk-management-kenya] (risk register owns process; C7 owns the product map), bank-linked notes inside facilities articles.
- **Differentiation:** A9 = risk management operating system; C7 = insurance product and shopping guide. Endowment deep-dive stays G13; C7 positions it honestly as hybrid.
- Folder: `investing/` or `banking-credit/`. Featured.

### C8. Tax, Compliance, and Cash: What Kenyan Earners and SMEs Actually Keep
**Verdict: Adjust; do not start as a cold 10k-word piece.** Tax content ages with every Finance Act; build from satellites up.
- **Prerequisites (write first or as C8 sections with hard date stamps):** R3-11 (PAYE / WHT / freelance), rental tax notes inside R3-9 or C5, existing [etims-kenya-sme-guide], investment tax notes scattered in C2/unit trusts/IFB.
- **Parts once unblocked:** employee keep-what-you-earn, freelancer/provisional tax rhythm, SME VAT and eTIMS discipline, investment tax (WHT, IFB exemption, capital gains high level), common filing calendar, "tax is a cash-flow line" decision framework.
- **Mandatory:** date every band; "confirm on KRA"; not a substitute for a tax agent; Section 8 disclaimers.
- Folder: `economy-policy/` or `investing/`.

### C9. The Complete Guide to Digital Growth for Kenyan SMEs
**Verdict: Shipped 1 August 2026.** See the Fitness Summary row. The P3-1 local-search fold was executed inside it, so P3-1 is now fully closed. Original brief retained below.
- **Organising spine:** attention → enquiry → sale → retention → data loop (not "more posts").
- **Existing cluster:** [sme-seo-inbound-lead-engine], [whatsapp-sales-channel-kenya], [ecommerce-storefront-conversion-launch], [website-traffic-zero-enquiries], [bengula-inc-linkedin-company-profile], [data-driven-inventory-small-shops-kenya], [retail-data-decision-dashboard], [archive-customer-avatars-buyer-persona], [embedded-finance-kenya-guide] (payments layer).
- **Absorb lightly:** local search (the P3-1 fold), persona basics, when to hire vs DIY.
- **Do not absorb:** pure fintech trend pieces and AI-detector opinion as core chapters; link from a "tools and noise" sidebar if needed.
- Folder: `technology/`. Featured. Category: Digital Strategy.

### C10. Retirement, Pensions, and Leaving Money Behind
**Verdict: Adjust.** [retirement-planning-kenya-guide] already carries NSSF, private pensions, and drawdown. C10 is only worth writing if it **extends the arc** into decumulation products, drawdown vs annuity vs bond ladder in depth, and estate/succession (R3-10), rather than republishing G4.
- **Preferred path A:** Expand G4 into C10 (retitle/extend, keep id or redirect carefully) once R3-10 exists as the estate half.
- **Preferred path B:** Keep G4 as the pension deep-dive; write a shorter "Leaving Money Behind" companion (R3-10) and a thin hub page later if SEO demands it.
- **Do not:** publish a third overlapping pension explainer.
- Links: [retirement-planning-kenya-guide], [nssf-tier-ii-vs-private-pension-kenya], [endowment-plans-kenya-guide], [monthly-income-engine-kenya], R3-10, C6 bond ladder.
- Folder: `investing/`.

---

## Cornerstone sequencing (C4–C10)

Write after enough satellites exist so the hub can link out rather than invent detail:

| Order | ID | Depends on | Notes |
|---|---|---|---|
| 1 | ~~**C4 Trade finance**~~ | Cluster already live | **Shipped 1 Aug 2026.** Absorbed P1-2 and the AfCFTA corridor section |
| 2 | ~~**C6 Fixed income**~~ | Cluster already live | **Shipped 1 Aug 2026.** Highest maintenance (rates); quarterly re-date required |
| 3 | ~~**C5 Property money**~~ | R3-9, T4 | **Shipped 1 Aug 2026** with a lean succession section flagging E2, which remains a genuine spin-out rather than a blocker |
| 4 | ~~**C7 Insurance**~~ | G5 + life-stage stack live | **Shipped 1 Aug 2026.** Was indeed a clean assembly; the new ground was the severity grid, the needs calculation and the PCF cap |
| 5 | ~~**C9 Digital growth**~~ | Round Two digital batch live | **Shipped 1 Aug 2026.** Pillar 3 hub; absorbed the P3-1 local-search fold |
| 6 | ~~**C8 Tax hub**~~ | ~~R3-11, T2, T3, T4~~ all done | **Shipped 1 Aug 2026** after all four satellites, exactly as sequenced |
| 7 | **C10 Retirement + estate** | R3-10; prefer expand G4 | Only if it adds estate arc, not a G4 clone |

**Round Three alignment:** R3-1–R3-5 deepen C1; R3-4/R3-6/R3-7 feed C3/C4; R3-8 feeds C2/C6; R3-9 feeds C5; R3-10 feeds C10; R3-11 feeds C8; R3-12 feeds the banking hub (not a new cornerstone).

---

## Standalone Articles

### A4. How Banks Actually Make Money
**Verdict: Ready.** Reader-literacy piece; partial overlap with [how-kenyan-banks-price-loans] (NIM) and [fixed-deposit-lending-arbitrage] (deposit spread) is fine because the frame is the whole income statement: NIM, fees, FX, trade finance, cards, digital.
- Caution: describe industry economics generically. No Absa-specific margin structures.

### A5. The Ultimate Guide to SACCO Membership in Kenya
**Verdict: Ready.** Clean expansion of [sacco-savers-guarantors] beyond loans: shares vs deposits, dividends, exit process, nominees, governance and elections, mergers, insolvency and the deposit guarantee question. Strong search demand, weak existing competition.

### A6. Understanding Interest Rates in Kenya
**Verdict: Adjust.** [bengula_apr_breakdown_article_improved] already owns APR vs interest rate and TCC, with formula boxes. Two honest options:
1. Expand the existing APR article into this fuller guide (flat vs reducing balance, effective rate, penalties, insurance, processing fees) and re-date it; or
2. Narrow this piece to the one thing not yet covered well: **flat rate vs reducing balance with side-by-side amortisation tables**, linking to the APR article for the rest.
Do not publish a third near-duplicate.

### A7. Financial Ratios Every SME Owner Should Know
**Verdict: Ready.** Gross/net margin, current ratio, debt ratio, ROA, ROE, cash conversion cycle; each as a KaTeX formula box with a worked Kenyan example. Cash conversion cycle links [what-is-accounts-receivable] and [sme-packager-optimization].
- Downloadable spreadsheet: feasible; ship the .xlsx in public/downloads/ and link it. Needs building alongside the article.

### A8. How to Read Financial Statements
**Verdict: Ready.** Balance sheet, income statement, cash flow statement, using published annual reports of NSE-listed companies (Safaricom, KCB, EABL) as walkthrough examples; public documents, so no sourcing risk. Links [9-cash-flow-before-profit], [what-is-accounts-receivable], A7.

### A9. The Complete Guide to Risk Management for SMEs
**Verdict: Ready.** Financial, currency ([usd-shilling-hedging]), operational, cyber, credit ([what-is-accounts-receivable]), insurance, supply chain ([agri-export-supply-chain]). Fits the house risk-first posture; Risk Factors signature section becomes the organising spine.

### A10. How to Evaluate Any Investment Opportunity
**Verdict: Ready; candidate signature piece.** Framework: expected return, liquidity, risk, tax, time horizon, opportunity cost, inflation, exit. Ends with a printable Decision Framework checklist. Links [sleeping-asset-optimization], [monthly-income-engine-kenya], [10-tax-drag], and (once written) C2.

---

## Round Two: Catalogue Gap-Fillers (added 9 July 2026)

Ten proposals targeting the equities / retirement / insurance / group-finance holes. Nine are genuine gaps; one is already published.

| # | Working Title | Verdict | Notes |
|---|---|---|---|
| G1 | The Complete Chama Guide: Structuring, Banking, and Investing Group Money | **Shipped 9 July 2026** | Published as [complete-chama-guide-kenya] (Wealth Optimization). Reverse links wired from friends-family and kikuyu-ridge-syndicate. P2-2 now narrows to the LLP land-banking legal deep-dive. |
| G2 | How to Buy Shares on the NSE: A Beginner's Guide | **Shipped 10 July 2026** | Published as [how-to-buy-shares-nse-kenya]. Linked from the cornerstone's equities section. |
| G3 | REITs in Kenya: Rental Income Without Buying a Building | **Shipped 10 July 2026** | Published as [reits-in-kenya-guide], built on the Cytonn FY'2025 scorecard. Linked from the cornerstone's REIT section. Re-check REIT table annually. |
| G11 | How to Invest in Gold in Kenya | **Shipped 10 July 2026** | Published as [how-to-invest-in-gold-kenya]: NewGold ETF, physical, offshore, fake-gold scam anatomy. Linked from the cornerstone's gold section. |
| G12 | Foreign ETFs and Offshore Investing From Kenya | **Shipped 10 July 2026** | Published as [foreign-etfs-offshore-investing-kenya]: platforms, fee layers, currency effect, estate wrinkles. Linked from the cornerstone's ETF section. |
| G13 | Endowment Plans in Kenya: The Complete Guide | **Shipped 10 July 2026** | Owner's ~19,000-word draft ("Endowment Plans in Kenya.md") made publish-ready as [endowment-plans-kenya-guide]: frontmatter added, headings normalised, KSh→KES, oaicite artifacts and all embedded editorial-suggestion blocks removed, ASCII diagrams converted to mermaid/tables, star ratings to numbers, real internal links wired. **Factual correction:** the draft's closing note misdescribed Akiba Halisi as single-premium (that is Wealth Builder); the case study instead now carries the verified anticipated-payout structure (15/25/60 + bonuses) and correct 6-18 year terms from APA's published spec. Reverse link wired from bank-vs-sacco-vs-mmf-savings. |
| G4 | Retirement Planning in Kenya: NSSF, Personal Pensions, Drawdown | **Shipped 12 July 2026** | Published as [retirement-planning-kenya-guide] (Wealth Optimization). Three-pillar frame; NSSF Year 4 tiers (Feb 2026: 6% each side, Tier I to KES 9,000/KES 540, Tier II to KES 108,000/KES 5,940, max KES 6,480/side, sourced NSSF); pension tax relief raised to KES 30,000/mo (Tax Laws Amendment Act 2024, eff 27 Dec 2024, sourced RBA + KRA); accumulation-vs-decumulation split; annuity/drawdown/bond-ladder income table. Closes the retirement IOU printed in C2's pension section; reverse link wired. Rates dated; re-check NSSF tiers each February. |
| G5 | Business Insurance in Kenya: What SMEs Need and Can Skip | **Shipped 19 July 2026** | Published as [business-insurance-kenya-sme-guide]: tiered SME stack (need / high value / situational / often skip), sector notes, bank-linked covers, worked distributor example. Complements household [insurance-stack-kenya-life-stages]; pairs with A9. |
| G6 | From Registration to First Facility: The New Business Banking Journey | **Shipped 19 July 2026** | Published as [new-business-banking-journey-kenya]: registration → tax/eTIMS → accounts → 6-12 month bankable trail → first facility match → RM rhythm. Chapter zero before proposal anatomy and loan pricing. |
| G7 | eTIMS and the SME | **Already published** | [etims-kenya-sme-guide] (June 2026) covers this. Drop from pipeline; refresh the existing piece if the compliance rules change. |
| G8 | Buying Land From the Diaspora Without Getting Burned | **Shipped 19 July 2026** | Published as [diaspora-land-purchase-kenya]: remote control stack, payment path, POA discipline, red flags, go/no-go checklist. Bonds remain the clean diaspora start via [cbk-diaspora-bond-access]. |
| G9 | Bank Account vs SACCO vs MMF vs Insurance: Where Should Your Savings Sit? | **Shipped 9 July 2026; extended 10 July** | Published as [bank-vs-sacco-vs-mmf-savings] (Wealth Optimization). Extended with endowment/insurance savings as a fourth vehicle plus a sourced top-performer-vs-typical table (Nabo, Nyati, Credit Bank, mid-2026). Reverse links wired from sacco-savers-guarantors and future-mmfs-kenya. Rates cited as CBK indicative 2 July 2026 + league tables mid-2026; re-date on refresh. Partial groundwork for G5 (insurance). |
| G10 | Selling on WhatsApp: Kenya's Favourite App as a Sales Channel | **Shipped 19 July 2026** | Published as [whatsapp-sales-channel-kenya]: Business profile, order template, payment proof rules, SLA, sheet CRM, when to add a storefront. Extends ecommerce conversion + cashless/embedded finance. |

---

## Round Three: Catalogue Gap-Fillers (added 20 July 2026)

Twelve proposals targeting product deep-dives the cornerstones name but never own, plus household/landlord/succession holes Round Two left open. Audited against the full content library on 20 July 2026; each is a genuine gap or a deliberate spin-out, not a near-duplicate.

| # | Working Title | Verdict | Notes |
|---|---|---|---|
| R3-1 | The Overdraft That Never Clears | **Ready** | C1 calls the permanent OD the commonest mispurchase; WC cycle and C3 assume the reader already knows OD mechanics. Own: utilisation pricing, clean-down covenants, when to convert to a term loan, and the "never touches zero" diagnostic. |
| R3-2 | Logbook Loans in Kenya | **Ready** | High consumer harm + search demand. Own: regulated vs fringe, joint registration, insurance assignment, real APR vs advertised, default-to-towing timeline, and the "when asset finance is better" fork. |
| R3-3 | Check-Off and Salary Loans | **Ready** | Cheapest mainstream unsecured path for salaried Kenyans. Own: payslip math, statutory deduction protection, employer-scheme vs bank check-off, double-deduction month on refinance, and comparison to SACCO multiplier loans. |
| R3-4 | The 13-Week Cash Forecast for SMEs | **Ready** | A7/A8 teach history; this teaches the forward sheet. Excel-first weekly inflows/outflows, minimum cash line, and how the forecast becomes the facility-sizing conversation with an RM. |
| R3-5 | Hire Purchase vs Asset Finance vs Logbook | **Ready** | Decision matrix for buying a vehicle or machine. Flat-rate HP traps, asset-finance deposit economics ([asset-finance-vs-conventional-loans]), and logbook as a last resort against an already-owned car. |
| R3-6 | Contractor Cash Flow Stack | **Ready** | Bridges [bank-guarantees-kenya-sme-guide], [agpo-tender-cash-flow-kenya], and [lpo-purchase-order-finance-kenya] into one contractor operating system: bid → bond → mobilisation → progress claim → retention → collection. |
| R3-7 | Seasonal Agri Working Capital | **Adjust** | [agri-export-supply-chain] and [sme-trade-finance] own export corridors. This owns the *domestic* seasonal loop: input credit, harvest bridge, warehouse receipts / inventory finance where available, and why annual term loans mis-match crop cycles. |
| R3-8 | Dividend Income on the NSE | **Ready** | Spin-out from C2 equities + [how-to-buy-shares-nse-kenya]. Yield vs total return, WHT on dividends, payout sustainability checks, and building an income sleeve next to bonds/MMFs. |
| R3-9 | Rental Income Cash Flow for Landlords | **Ready** | Complements land-banking and REITs without redoing title due diligence. Gross-to-net yield, vacancy and maintenance drag, rental income tax, and "is this better than a bond ladder?" |
| R3-10 | Wills, Nominees, and Owner Succession | **Ready** | Household + SME continuity. Will basics, SACCO/insurance nominees vs estate (link A5's corrected nominee law), key-person risk, and what happens to a sole-proprietor bank account. Not legal advice; advocate CTA mandatory. |
| R3-11 | PAYE, Withholding, and Freelance Tax | **Ready** | What earners and independent contractors actually keep. PAYE bands, common WHT situations, provisional tax for freelancers, and the "tax is a cash-flow line" frame that pairs with [10-tax-drag]. Re-check every Finance Act. |
| R3-12 | How to Choose and Switch Your SME Bank | **Adjust** | Do not re-list every product in [ultimate-guide-to-banking-in-kenya]. Own the scorecard: RM quality, tariff, digital rails, multi-bank strategy, and a clean switch sequence without breaking facilities. |

### R3-1. The Overdraft That Never Clears: Turning Float into Permanent Debt
**Verdict: Ready.** Highest-leverage spin-out from C1's one-paragraph trap diagnosis.
- Angles: how OD interest accrues on daily utilisation; clean-down / annual cleanse expectations; the statement pattern an RM reads as "this is a term loan in disguise"; conversion path (restructure to amortising term debt); worked cost table vs invoice tools for the same gap.
- Links: [working-capital-cycle-kenya-smes], [sme-finance-handbook-kenya], [borrowing-money-in-kenya-guide], [what-is-accounts-receivable], [debt-consolidation-refinancing-kenya].
- Folder: `banking-credit/`.

### R3-2. Logbook Loans in Kenya: What the Rate Really Costs and What Default Looks Like
**Verdict: Ready.** Consumer-protection + product literacy; fits house risk-first posture.
- Angles: regulated bank/MFB logbook vs non-bank fringe; joint logbook registration and comprehensive insurance assignment; flat vs reducing quotes; default notices and repossession timeline; when to use [asset-finance-vs-conventional-loans] instead (buying) vs logbook (already own the car).
- Caution: no scare-mongering without process accuracy; date any statutory notice periods from current law.
- Folder: `banking-credit/`.

### R3-3. Check-Off and Salary Loans: The Payslip Product Most Kenyans Under-Compare
**Verdict: Ready.**
- Angles: ability-to-pay from net pay; protected portion of basic pay; employer schemes vs open-market check-off; total cost vs SACCO loan for members; refinancing double-deduction month (already flagged in [debt-consolidation-refinancing-kenya]); CRB effect of clean check-off history.
- Folder: `banking-credit/`.

### R3-4. The 13-Week Cash Forecast Every Kenyan SME Should Run
**Verdict: Ready.** Skill article, Excel-first (same posture as P3-2 inventory).
- Angles: weekly columns, opening cash, contracted inflows vs hoped-for sales, fixed vs variable outflows, minimum cash line, and three scenario columns (base / slow collections / shock). Show how the forecast sizes an OD or invoice limit before the bank does.
- Links: [how-to-read-financial-statements-kenya], [sme-financial-ratios-kenya], [working-capital-cycle-kenya-smes], [anatomy-of-a-bank-proposal-kenya].
- Optional download: simple `.xlsx` in `public/downloads/` (same pattern planned for A7).
- Folder: `banking-credit/` or `business-trade/`.

### R3-5. Hire Purchase vs Asset Finance vs Logbook: Buying the Asset Without the Wrong Debt
**Verdict: Ready.** Comparison piece; short and sharp.
- Angles: side-by-side table (ownership timing, rate method, deposit, security, early settlement); flat-rate HP worked example next to reducing asset finance; "lipa mdogo mdogo" consumer trap; Islamic murabaha cross-link.
- Links: [asset-finance-vs-conventional-loans], [islamic-banking-kenya-murabaha-musharaka-hajj-savings], R3-2 when written.
- Folder: `banking-credit/`.

### R3-6. Contractor Cash Flow: Guarantees, Mobilisation, Progress Claims, and Retention
**Verdict: Ready.** Sector playbook that stitches existing tools.
- Angles: mermaid of the contractor cash cycle; pricing bid/performance/advance guarantees into the margin ([bank-guarantees-kenya-sme-guide]); mobilisation vs materials funding; progress-certificate lag; retention release; public vs private employer payment behaviour (AGPO cross-link).
- Folder: `business-trade/`.

### R3-7. Seasonal Working Capital for Agribusiness: Input Credit, Harvest Bridge, and Inventory Finance
**Verdict: Adjust.** Keep export-corridor ground with [agri-export-supply-chain] / [sme-trade-finance]; own the seasonal calendar and domestic trader/processor WC.
- Angles: crop-calendar cash map; input credit vs merchant credit; harvest bridge facilities; warehouse receipt / inventory finance where the market actually works; why a 5-year term loan is usually the wrong shape.
- Caution: no crop agronomy; finance and cash timing only.
- Folder: `business-trade/`.

### R3-8. Dividend Income on the NSE: Building a Payout Sleeve Without Chasing Yield
**Verdict: Ready.**
- Angles: dividend yield vs total return; sustainability (payout ratio, earnings quality); WHT on listed dividends; calendar and CDS mechanics pointer to [how-to-buy-shares-nse-kenya]; sleeve sizing next to [kb-bond-guide-2026] and MMFs; concentration risk in a few high-yield names.
- Folder: `investing/`.

### R3-9. Rental Income in Kenya: Gross Yield, Net Yield, Tax, and Vacancies
**Verdict: Ready.**
- Angles: gross-to-net waterfall (voids, repairs, agency, insurance, rates); rental income tax treatment at a high level; deposits and tenant risk; comparison to REIT yield and bond ladder; when leveraged rental buying fails the [evaluate-investment-opportunity-kenya] tests.
- Links: [diaspora-land-purchase-kenya], [reits-in-kenya-guide], [chama-llp-land-banking-kenya].
- Caution: not a conveyancing guide; link out for title due diligence.
- Folder: `investing/`.

### R3-10. Wills, Nominees, and Business Continuity When an Owner Dies
**Verdict: Ready; signature household + SME piece.**
- Angles: why intestacy is expensive; will vs nomination on SACCOs/insurance/pensions (cite A5 nominee correction); sole prop vs company bank access after death; key-person insurance pointer ([business-insurance-kenya-sme-guide]); simple continuity checklist for a one-owner SME.
- Mandatory: Section 8 legal disclaimer; recommend an advocate; no DIY will templates that pretend to be valid instruments.
- Folder: `investing/` or `banking-credit/`.

### R3-11. PAYE, Withholding, and Freelance Tax: What You Actually Keep
**Verdict: Shipped 29 July 2026.** See the Fitness Summary row for what the published piece owns. Original brief retained below.
- Angles: PAYE as a cash-flow reality for employees; common WHT events for SMEs and freelancers; provisional tax rhythm for independent contractors; allowable deductions at a high level; worked "gross to net" examples. Pair with investment after-tax thinking in [10-tax-drag].
- Caution: Finance Act changes yearly; date every band and flag "confirm on KRA". Not a substitute for a tax agent on complex affairs.
- Folder: `investing/` or `economy-policy/`.

### R3-12. How to Choose and Switch Your SME Bank
**Verdict: Adjust.** Differentiate hard from the banking cornerstone.
- Angles: scorecard (RM responsiveness, tariff, FX, trade desk, digital, branch vs app, multi-currency); when multi-bank is rational; switch sequence without calling facilities; red flags that justify leaving.
- Links: [ultimate-guide-to-banking-in-kenya], [why-rm-is-sme-growth-asset], [sme-transaction-fees-fx-spreads-kenya], [new-business-banking-journey-kenya].
- Folder: `banking-credit/`.

## Suggested Sequencing

**Completed through 19 July 2026 write-order batch:** A10 → P1-3 → G5 + A9 → G6 → P2-2 → P2-3 → G8 → P3-2 → G10.

### Proposed Round Three write order

Credit product literacy first (feeds C1 reverse links), then SME operating tools, then household wealth gaps:

1. ~~**R3-1 (overdrafts)**~~ → ~~**R3-3 (check-off)**~~ → ~~**R3-2 (logbook)**~~ → ~~**R3-5 (HP vs asset finance vs logbook)**~~
2. ~~**R3-4 (13-week forecast)**~~ → ~~**R3-6 (contractor stack)**~~ → ~~**R3-7 (seasonal agri WC)**~~ *(angle held: domestic seasonal loop + warehouse receipts, export corridors left with agri-export)*
3. ~~**R3-9 (rental yield)**~~ → ~~**R3-11 (personal tax)**~~ → **R3-10 (wills/succession)** *(next)*
4. **R3-12 (choose/switch bank)** after fee and banking guides feel dense enough, or fold scorecard into a refresh of [ultimate-guide-to-banking-in-kenya]

### Still open (carry-overs + Round Three + cornerstones)

**As at 20 September 2026 the written backlog is empty.** Everything in the Fitness Summary is Shipped, Folded, Closed or Done. What remains is a blocked item and maintenance.

1. ~~**P1-2 (export-corridor LCs only)**~~ closed 1 Aug 2026 by absorption into **C4** Part 4.
2. **KESONIA loan pricing** is the **only blocked item left**, and it is blocked on an owner-supplied Absa example. Do not start without it.
3. ~~**Round Three R3-1 through R3-12**~~ complete. R3-10 and R3-12 shipped 20 September 2026.
4. ~~**Cornerstones C4–C10**~~ complete. C10 shipped 20 September 2026 as the decumulation piece rather than a G4 clone, exactly as the Adjust verdict required.
5. ~~**Round Four Clusters B, C and D**~~ complete. E2, E3, M1, M2, M3 and X1 all shipped 20 September 2026; X1's regulatory blocker was cleared by verification before drafting.
6. **Maintenance, now the main standing job.** The rates pillar (M1–M3) and M2 in particular are **auction-sensitive and will decay fastest in the library**: M2 quotes a single weekly auction and M3 quotes six instruments against one month's inflation. Re-date M1–M3 and C6 quarterly at minimum. Also re-date C2/C3/A5, run the annual REIT table check, and watch X1, where the VASP licensing regulations were still being implemented at publication and the 4 November 2026 transition deadline falls shortly after.
7. ~~**Next pipeline refresh should source new items**~~ done 20 September 2026: see **Round Five** below. The library is **133 articles** (133 markdown files under `content/`, excluding the 12 `insights/` cards and the template, and 133 built pages in `dist/blog`). The earlier figure of 142 was wrong and every no-duplication test should run against 133.

## Round Four: Gap-Closure Plan (added 29 July 2026)

### Diagnosis

An external content-gap audit was checked against the live catalogue (121 files). Most of its claimed gaps were already covered. Three things survived scrutiny, and one it missed entirely.

| Finding | Evidence |
|---|---|
| Tax is distributed, never owned | Turnover tax appears in 1 file, VAT registration in 1, CGT in 5 but only in passing. eTIMS, MRI, dividend WHT, and SACCO WHT each sit inside articles about something else. |
| Succession is thin | Nothing outside SACCO nominees (A5) and a sketch in the personal-finance cornerstone. |
| The macro pillar barely exists | `economy-policy/` is 3 files averaging 1,291 words, against 2,976 (banking-credit) and 2,922 (investing). |
| The audit's central claim is wrong for our main pillars | It called the clusters thin. Banking is 41 files and investing 39, both averaging near 2,950 words. The deficit is **hubs, not depth**, which C4 to C9 already record. |
| Two files sit below house standard | `linkedin-how-to-trade-bitcoins` (1,240 words) and `linkedin-mica-regulation-overview` (1,161) are LinkedIn-era imports. An EU regulation as the primary crypto frame on a Kenya site is a positioning error. |

The macro gap matters most because it is closest to the moat. Bonds, T-bill ladders, IFBs, MMF yields, and loan pricing are all functions of the CBR and the auction curve, and `data/key-rates.csv` already auto-updates weekly via `.github/workflows/update-cbk-rates.yml` with nothing editorial built on top of it.

---

### Cluster A: Tax (satellites, then C8)

R3-11 already sits at the top of the Round Three order and unblocks C8. Three satellites join it so C8 can link out rather than invent detail.

#### T2. Turnover Tax vs Corporation Tax: Which Regime Should Your Business Be In
**Verdict: Shipped 1 August 2026.** See the Fitness Summary row for what the published piece owns. Original brief and the verified figures retained below.
- **Verified figures (KRA, confirmed 1 Aug 2026, cite and date these):** rate **1.5% of gross sales**, effective **1 July 2023 per Finance Act 2023**; band **above KES 1,000,000 and not exceeding KES 25,000,000** per year of income; return and payment by the **20th of the following month**; **no expenses deductible**; **final tax**. **Excluded from TOT entirely:** rental income, management/professional/training fees, and any income under a final withholding tax.
- Angles: eligibility band and rate; why TOT is charged on gross turnover rather than profit, so it punishes thin-margin traders; the crossover point where the normal regime wins (KaTeX break-even on net margin, worked both ways); what incorporating changes; the record-keeping burden difference.
- Key Insight: the regime choice is driven by **net margin, not revenue**. A high-turnover, low-margin trader is the classic TOT casualty. Break-even sits where 1.5% of turnover equals 30% of net profit, so the indifference net margin is **5%**: below that, TOT costs more than corporation tax on the same book. Worth a formula box and a worked pair either side of it.
- Second angle, arguably the stronger one: **the freelancer trap.** Consultants routinely assume TOT is their cheap regime, but professional and management fees are excluded from it outright, so fee income cannot use TOT at all. This lands straight into the freelance half of [paye-withholding-freelance-tax-kenya] and is a genuine misconception worth correcting.
- Links: [etims-kenya-sme-guide], [vat-for-smes-kenya] (registration is a separate, independent decision from regime choice, say so explicitly), [sme-finance-handbook-kenya], [new-business-banking-journey-kenya], [sme-financial-ratios-kenya], [startup-budget-kenya-final], [paye-withholding-freelance-tax-kenya].
- Caution: the TOT threshold and rate have moved repeatedly through Finance Acts, so date every figure and keep the "confirm on KRA" line. Do **not** cite the advisory sources still quoting 3%; that is the pre-Finance Act 2023 position.

#### T3. VAT for Kenyan SMEs: Registration, Input Credits, and the Cash-Flow Trap
**Verdict: Ready; strongest differentiation in the tax cluster.**
- Angles: registration threshold and when voluntary registration pays; output vs input VAT; **VAT collected is not your money**, and the failure mode of spending it before the remittance date; the gap between invoicing with VAT and being paid, which is a working-capital event; zero-rated vs exempt (commonly confused, materially different for input credits); filing rhythm and penalties.
- Frame it as cash flow, not compliance. That is the lane no generic tax blog occupies.
- Links: [etims-kenya-sme-guide], [13-week-cash-forecast-kenya-sme], [working-capital-cycle-kenya-smes], [what-is-accounts-receivable].

#### T4. Capital Gains Tax in Kenya: Land, Shares, and Selling Your Business
**Verdict: Shipped 1 August 2026.** See the Fitness Summary row for what the published piece owns. Original brief retained below.
- Angles: what triggers CGT; land transfer as the most common event; the adjusted cost base (acquisition cost, improvements, transfer costs) and why receipts matter a decade later; exemptions; share transfers and business exit; how CGT changes an exit valuation.
- Links: [business-valuation-kenya-guide], [diaspora-land-purchase-kenya], [chama-llp-land-banking-kenya], [types-of-acquisitions], [how-to-buy-shares-nse-kenya], [reits-in-kenya-guide].
- Caution: the rate moved from 5% to 15% in 2023. Verify the current rate and the exemption list, and date them.

**Then C8** assembles R3-11, T2, T3, T4, plus the MRI notes already owned by [rental-income-yield-tax-kenya] and the WHT notes in [dividend-income-nse-kenya] and [ultimate-guide-to-sacco-membership-kenya].

---

### Cluster B: Succession (satellites, then C10)

R3-10 is already written up above and stays as briefed. Two satellites join it.

#### E2. Land Succession in Kenya: Transmission, Transfer, and the Diaspora Problem
**Verdict: Ready; highest search intent in this plan.**
- Angles: succession cause vs transmission; ancestral land still titled to a parent who died years ago; why that title cannot be sold or charged until succession completes; the diaspora version (running it from abroad, power of attorney, relatives in occupation); realistic cost and timeline; what a **buyer** must check before paying for land caught in an incomplete estate.
- Doubles as a buyer-protection piece, which is why it earns its place next to [diaspora-land-purchase-kenya].
- Links: [diaspora-land-purchase-kenya], [chama-llp-land-banking-kenya], R3-10, C5.
- Caution: Law of Succession Act Cap 160; verify provisions against Kenya Law before citing. Section 8 disclaimer, advocate recommendation mandatory, no DIY templates presented as valid instruments.

#### E3. Family Trusts and Holding Structures: When They Are Worth It
**Verdict: Ready.**
- Angles: when a trust is genuinely warranted vs when it is expensive theatre; registered family trust vs LLP vs holding company, as a comparison table; what a trust does and does not protect against; setup and annual administration cost; the "hold the asset, not the argument" frame; how this extends the LLP work already done for chamas.
- Links: [chama-llp-land-banking-kenya], [complete-chama-guide-kenya], [business-valuation-kenya-guide], R3-10, E2.
- Caution: verify the current family-trust statutory position (Trustees (Perpetual Succession) (Amendment) Act 2021) before writing. Heavy legal disclaimer throughout.

**Then C10** delivers the full arc from retirement accumulation into estate, per its existing brief, rather than cloning [retirement-planning-kenya-guide].

---

### Cluster C: The Rates and Policy Pillar (new)

Three evergreen pieces that give `economy-policy/` a spine and put the auto-updating rates feed to editorial work.

#### M1. How to Read a CBK Rate Decision
**Verdict: Ready.**
- Angles: what the MPC actually decides and when it sits; the transmission path CBR to KESONIA to your loan repricing; the second path CBR to T-bill and bond yields to your MMF return; the asymmetry every borrower feels, where loans reprice faster than deposits; what to do at each end of the cycle.
- Links: [cbr-cycle-portfolio-positioning-kenya], [how-kenyan-banks-price-loans], [risk-based-credit-pricing-kesonia-cbr-kenya], [future-mmfs-kenya], [advanced-dhowcsd-t-bill-ladder].
- **Design constraint:** write it as evergreen mechanics with dated worked examples. The moment it becomes a recap of one meeting it starts decaying and joins the quarterly refresh burden.

#### M2. The Kenyan Yield Curve: What the 91, 182, and 364 Spread Is Telling You
**Verdict: Ready; genuinely unclaimed ground.**
- Angles: reading the curve normal, flat, and inverted, and what each says about expectations; why a long end barely above the short end destroys the case for locking money up; using the shape to choose a ladder tenor; reading auction results (bid-to-cover, accepted vs rejected bids) rather than only the headline rate.
- Links: [advanced-dhowcsd-t-bill-ladder], [5-ladder-tenors], [kb-bond-guide-2026], [sovereign-debt-explained], C6.
- Source the live spread from `data/key-rates.csv` and date it.

#### M3. Inflation, the Shilling, and Your Real Return
**Verdict: Ready.**
- Angles: nominal vs real return with a Fisher formula box; the full stack applied to one number, so a headline T-bill yield less withholding tax less inflation becomes the real figure; why the 3.23% savings rate (May 2026, in the rates CSV) is a guaranteed real loss; the shilling's effect on import-linked costs and on offshore holdings; currency exposure as a household decision, not a trader's one.
- Links: [6-saving-vs-wealth], [bank-vs-sacco-vs-mmf-savings], [usd-shilling-hedging], [foreign-etfs-offshore-investing-kenya], [10-tax-drag].
- This is the signature move of the pillar: it takes an advertised yield and lands on what the reader actually keeps.

**Small code task:** the `category:` value drives the filter pill and the default cover photo via `src/data/media.ts`. A new `Rates & Policy` value needs one line added there. Optional, and only worth it if M1 to M3 should filter as their own pillar rather than borrowing `Bonds & Bills`.

---

### Cluster D: Remediation

#### X1. Digital Assets in Kenya
**Verdict: Blocked pending regulatory verification.**
- Replaces [linkedin-how-to-trade-bitcoins] and retires [linkedin-mica-regulation-overview] as a standalone. MiCA becomes at most a comparison paragraph, never the frame.
- Angles once unblocked: the CMA and CBK jurisdictional split; Kenya's own virtual-asset licensing position; how digital assets are taxed here; stablecoins as the actual use case in a remittance economy; platform and custody risk, tying to [11-platform-risk].
- Caution: **verify Kenya's virtual-asset legislation and tax treatment as at 2026 before writing.** Education tone, never promotion. This is the one Round Four item that must not be drafted from memory.

---

### Round Four Write Order

Hubs need no new research, so they are interleaved with the research-heavy satellites to keep throughput up rather than batched at the end.

| Phase | Items | Rationale |
|---|---|---|
| 1 | ~~**R3-11**~~ → ~~**C4**~~ → ~~**C6**~~ | **Complete.** R3-11 shipped 29 July 2026; C4 and C6 shipped 1 August 2026. C4 also closed P1-2 by absorption. |
| 2 | ~~**T3**~~ → ~~**T2**~~ → ~~**T4**~~ → ~~**C8**~~ | **Phase complete, all four shipped 1 August 2026.** The tax pillar now runs satellites-plus-hub with no overlap: R3-11 (PAYE/WHT/freelance), T2 (regime choice), T3 (VAT), T4 (CGT), and C8 as the assembly, calendar and penalty map that links to all of them plus MRI, dividend WHT, SACCO WHT, the fixed-income tax table and eTIMS. |
| 3 | ~~**C5**~~ → ~~**R3-10**~~ → ~~**E2**~~ → ~~**E3**~~ → ~~**C10**~~ | **Phase complete, all shipped 20 September 2026** in the briefed order. The succession arc now runs R3-10 (instruments and the nomination contrast) → E2 (land, and the buyer's side) → E3 (structures, and when not to build one) → C10 (decumulation into estate). |
| 4 | ~~**M1**~~ → ~~**M2**~~ → ~~**M3**~~ | **Phase complete, all shipped 20 September 2026.** The pillar has its own `Rates & Policy` category (one line added to `src/data/media.ts`; the filter pills derive from post categories automatically, so no other code change was needed). Highest-decay content in the library: re-date quarterly. |
| Opportunistic | ~~**C7**~~, ~~**C9**~~, ~~**R3-12**~~, ~~**X1**~~ | **All shipped.** R3-12 and X1 shipped 20 September 2026. X1's blocker was cleared by verifying the VASP Act 2025 commencement, the CBK/CMA split, the DAT repeal and the Finance Act 2026 reporting duties before any drafting. |

### Verify Before Drafting

House rule is that every rate is dated and sourced. These are the Round Four items that must be confirmed rather than recalled, and most are Finance Act sensitive:

- ~~TOT threshold and rate (T2)~~: resolved 1 Aug 2026 by the owner ruling that KRA is the authority: 1.5% of gross sales, KES 1m to 25m band, effective 1 July 2023 per Finance Act 2023, professional/management/training fees and rental income excluded
- ~~VAT registration threshold, standard rate, and the zero-rated vs exempt treatment (T3)~~: resolved 1 Aug 2026 against KRA and PwC: KES 5m rolling 12 months, 16% standard, 8% fuel, filing and payment by the 20th, six-month input-tax window, supplier-declaration condition since 2023
- ~~CGT rate and current exemptions (T4)~~: resolved 1 Aug 2026 on KRA: 15% of net gain effective 1 Jan 2023 (from 5%), final tax, tax point at the earlier of full payment or registration; exemption list taken from KRA's own FAQ. Note the **agricultural-land acreage conflict**: KRA and the Eighth Schedule say under **50 acres** outside an urban area, while several advisory sources say 100. Per the KRA-is-final rule, 50 was used
- ~~PAYE bands and reliefs (R3-11)~~: resolved 29 July 2026
- Law of Succession Act Cap 160 provisions (E2, R3-10)
- Family trust statutory position (E3)
- Virtual-asset licensing and digital-asset tax status (X1)
- Live CBR, T-bill, savings and deposit rates: take from `data/key-rates.csv`, which the workflow keeps current (M1 to M3)

### Deliberately Not Doing

- **Standalone AfCFTA or rules-of-origin piece.** Confirmed as a true blank (zero hits across all 121 files), but it is thought leadership rather than search-intent content. Fold the corridor angle into **C4** as a section instead.
- **Generic VC theory and carbon-credit market content.** Easy to write, hard to own against specialists, and away from the moat.
- **The WordPress-era positioning items** (ghostwriting samples, youth hub, industry pages). Obsolete against the current advisory and literacy platform.
- **More NSE and REIT intros.** The audit asked for depth there; the honest answer is that equity depth ranks below tax, succession, and rates, and below the five hubs already sitting Ready.

---

## Round Five: Gap-Closure Plan (added 20 September 2026)

### Diagnosis

The library is **133 articles** and it is dense on the acquisition side of every money relationship. It explains how to borrow, how to invest, how to pay, how to be taxed and how to pass wealth on. It stops at the point where a credit relationship breaks down.

The enforcement vocabulary is almost entirely absent. Searched word-for-word across all 133 articles:

| Term | Articles that use it |
|---|---:|
| attachment | 0 |
| decree | 0 |
| proclamation | 0 |
| garnishee | 0 |
| debt collector | 0 |
| statute of limitation | 0 |
| auctioneer | 1 (logbook loans only) |

We tell a reader how to take a logbook loan and never tell them what happens when they cannot service it. C1 and the CRB piece stop at the listing; nothing follows the money past default into demand, decree, attachment and auction.

Two smaller gaps sit alongside it. **The employment money stack**: SHIF, the Housing Levy and NSSF appear as deduction lines inside five pieces each, and no article owns them. `severance` and `gratuity` return zero. **Cross-border and life-event personal money**: `tax residency`, `double taxation` and `HELB` all return zero.

### Where These Candidates Came From

Two sources, and the second one needs stating plainly so nobody later mistakes it for a citation.

1. **Internal gap analysis** against the 133-article library, using the same no-duplication test as earlier rounds.

2. **External demand signal: the TikTok account Blissio II** (`@kungu34`, 40.1K followers, 234.3K likes), a Kenyan finance and business educator. His enforcement posts outperform the rest of his catalogue by a wide margin: "Properties that are protected by the law from auction" at 20.6K likes, "Civil imprisonment is tied to execution of a court decree" at 14.5K, "What does it mean for a loan to be written off" at 8.8K, against roughly 1K to 4K on his retail-operations posts. Other recurring subjects: debt collector regulations, whether M-Pesa can be attached, the fraction of salary protected from attachment, how long a decree stays executable, credit life insurance paying off a defaulted loan, and what happens when debts exceed assets.

**This is a demand signal and nothing more.** No wording, framing or claim from that account is reproduced here or in any resulting article. The topics tell us where reader demand sits; **every legal proposition must be built from statute** under the Verify Before Drafting rule below. Where the popular version of a rule disagrees with the statute, we publish the statute and note the disagreement in a sentence, exactly as the house conflict rule requires.

### Cluster F: Default and Enforcement

The largest single gap in the library and a candidate for a pillar of its own. Six pieces, hub and satellites.

| ID | Working Title | Verdict | Main gap / caution |
|---|---|---|---|
| F1 | What Happens When You Cannot Pay: The Enforcement Ladder in Kenya | **Shipped 21 September 2026** | Published as [debt-enforcement-ladder-kenya] (banking-credit/, Banking & Credit). Owns the full sequence: arrears, demand, listing, suit, decree, execution. Every statutory step sourced from the Civil Procedure Act. |
| F2 | What a Creditor Cannot Take: Protected Income and Protected Property | **Shipped 21 September 2026** | Published as [protected-property-attachment-kenya] (banking-credit/, Banking & Credit). Section 44 exemptions, two-thirds salary rule, tools of trade, pension protections, the seven-day objection procedure. |
| F3 | When a Customer Will Not Pay: Demand Letters, Small Claims Court and Statutory Demands | **Shipped 26 September 2026** | Published as [creditor-recovery-demand-small-claims-kenya] (banking-credit/, Banking & Credit). The creditor side: demand letters, Small Claims Court (KES 1,000,000 limit, s.12(3) SCC Act 2016), summary judgment, statutory demands (KES 250,000 company / KES 500,000 individual), cost-benefit table, limitation periods for creditors. |
| F4 | Debt Collectors and Auctioneers: What the Rules Actually Allow | **Shipped 26 September 2026** | Published as [debt-collectors-auctioneers-rules-kenya] (banking-credit/, Banking & Credit). Covers Data Protection Act, CBK DCP Regulations, Business Laws Amendment Act, and Auctioneers Act. Clarifies differences between collectors and auctioneers. |
| F5 | Written Off Is Not Written Away: Write-Offs, Decrees and How Long a Debt Follows You | **Shipped 22 September 2026** | Published as [written-off-debt-limitation-kenya] (banking-credit/, Banking & Credit). Write-off vs discharge, the bank's clock vs the law's clock, limitation periods, and the acknowledgement trap. |
| F6 | When Debts Exceed Assets: Insolvency, Bankruptcy and Business Rescue | **Shipped 26 September 2026** | Published as [insolvency-bankruptcy-business-rescue-kenya] (banking-credit/, Banking & Credit). Insolvency Act 2015: individual bankruptcy (3-year discharge), company liquidation (priority waterfall), administration (rescue route), director liability (wrongful/fraudulent trading), and the decision tree. |

- **Do not re-own:** the CRB listing and its repair ([how-to-fix-your-crb-listing-kenya]), digital-loan pricing ([mobile-digital-loans-real-cost-kenya]), logbook repossession mechanics ([logbook-loans-kenya]), or the overdraft debt spiral ([overdraft-that-never-clears-kenya]).
- **Links:** C1 borrowing guide, the CRB piece, the overdraft piece, logbook loans, the 13-week forecast, business insurance. Folder: `banking-credit/`. Category: Banking & Credit, or a new **Default & Recovery** category if the cluster reaches six live pieces.
- **Credit life insurance** is deliberately folded into F1 and F5 rather than given its own piece. [insurance-kenya-complete-guide] and [business-insurance-kenya-sme-guide] already carry credit life, and a standalone would be thin.

### Cluster S: The Employment Money Stack

| ID | Working Title | Verdict | Main gap / caution |
|---|---|---|---|
| S1 | The Statutory Deduction Stack: PAYE, SHIF, Housing Levy, NSSF and NITA | **Shipped 26 September 2026** | Published as [statutory-deductions-payroll-kenya] (business-trade/, SME Finance, ~2,900 words). Owns the full deduction stack across both employee take-home and employer cost (NITA KES 50/employee, NSSF Phase IV, SHIF 2.75%, Housing Levy 1.5%/1.5%, PAYE bands/reliefs), total employment wedge (34.7%), 9th-of-month compliance rhythm, penalties, and sinking-account discipline. |
| S2 | When a Job Ends: Notice, Severance, Gratuity and Terminal Dues | **Shipped 26 September 2026** | Published as [job-ends-notice-severance-terminal-dues-kenya] (investing/, Wealth Optimization). Employment Act 2007: four exit types (resignation, dismissal, redundancy, expiry), notice periods (s.35, 28-day minimum for monthly), severance (s.40, 15 days per completed year, redundancy only), gratuity as contractual not statutory, leave payout (s.28), pension access, tax on terminal dues, probation (s.42). |

- **Do not re-own:** PAYE band mechanics ([paye-withholding-freelance-tax-kenya]), pension choice ([nssf-tier-ii-vs-private-pension-kenya]), or decumulation ([retirement-income-annuity-drawdown-kenya]).
- **Links:** the PAYE piece, NSSF Tier II, C8 tax cornerstone, check-off loans, personal finance guide. Folder: `investing/` or `business-trade/`. Category: Wealth Optimization for S2, SME Finance for S1.

### Cluster L: Compliance SMEs Skip

| ID | Working Title | Verdict | Main gap / caution |
|---|---|---|---|
| L1 | Data Protection for Kenyan SMEs: ODPC Registration, Consent and What a Breach Costs | **Shipped 26 September 2026** | Published as [data-protection-smes-odpc-kenya] (technology/, Digital Strategy). Explains who must register, the reality of consent vs contract, the marketing trap, and ODPC administrative penalties. |
| L2 | The County Layer: Single Business Permits and Devolved Levies | **Adjust** | `single business permit` returns zero, but regimes differ by county. Needs a framing that teaches the structure rather than quoting 47 fee schedules. |

- **Links:** C9 digital growth, eTIMS, new-business-banking-journey, C3 SME handbook. Folder: `technology/` for L1, `business-trade/` for L2.

### Cluster T and Cluster H: Personal Money Gaps

| ID | Working Title | Verdict | Main gap / caution |
|---|---|---|---|
| T1 | Tax Residency and Foreign Income: Remote Work, Diaspora Returns and Double Taxation | **Shipped 26 September 2026** | Published as [tax-residency-foreign-income-kenya] (investing/, Wealth Optimization). Covers physical presence tests (183 days, averaging), taxation of remote work, non-resident taxes on Kenyan income, and Double Taxation Agreements (DTAs). |
| H1 | Paying for University: HELB, Education Policies and Fee Plans | **Shipped 26 September 2026** | Published as [paying-for-university-helb-kenya] (investing/, Wealth Optimization). Explains HELB mechanics, the new NHEF means-tested model, and using private education policies vs bond ladders for the household contribution gap. |
| H2 | Money and Marriage: Matrimonial Property, Joint Accounts and What Splits | **Adjust** | `matrimonial` already appears inside E3 and C1. Needs an angle that does not re-own the trust and succession material. |

### Cluster R: Retail Operating Economics

Lower priority and included only where the question is genuinely financial. The external signal carries a large volume of retail-operations content, most of which is general business advice and off-brand for this library.

| ID | Working Title | Verdict | Main gap / caution |
|---|---|---|---|
| R5-1 | What Rent Should Cost: Occupancy Ratios, Lease Terms and Deposits | **Ready** | A ratio question, which is on-brand. Sits beside [sme-financial-ratios-kenya]. |
| R5-2 | Running the Shop You Are Not Standing In: Cash Controls and Reconciliation | **Adjust** | Only worth it if it holds ground the 13-week forecast and the M-Pesa collection piece do not already cover. |

### Verify Before Drafting (Round Five)

Round Five is **more exposed than any previous round**, because most of Cluster F is statutory rather than commercial, and because the demand signal that surfaced it is a social media account. Nothing in this cluster may be drafted from memory or from the videos.

**Verification pass run 21 September 2026. Cluster F is cleared to draft.** What follows records what was confirmed and from which source, so a challenge can be answered without redoing the work.

**Source note.** Kenya Law returns HTTP 403 to direct fetches on both `new.kenyalaw.org` and `kenyalaw.org`, and is also blocked to the browser, the same obstacle hit when drafting C10. Primary statute text below was read from archival PDF copies of the official Revised Editions. Each item says which edition, because a later amendment would not show in them.

#### Confirmed From Primary Statute Text

- ~~Civil Procedure Act and Rules: attachment, the proportion of salary protected, the list of exempt property~~: **resolved 21 September 2026** from Civil Procedure Act Cap 21, Revised Edition 2012, section 44. All property of a judgment-debtor is liable to attachment and sale, subject to a proviso listing eleven exemptions. **Two thirds of the salary of a public officer or other person in employment is exempt** (s.44(1)(viii)), so one third is attachable. Also exempt: necessary wearing apparel, cooking vessels, beds and bedding of the debtor, his wife and children (i); tools and implements necessary for his trade or profession (ii); for an agriculturalist, the first KES 10,000 in value of livestock, the first KES 5,000 of implements, plant and machinery, and the first KES 1,000 of agricultural produce (iii); books of accounts (iv); a right to sue in damages (v); a right of personal service (vi); government pensions, service family pension fund payments and political pensions (vii); contingent interests and expectancy of succession by survivorship (ix); a right of future maintenance (x); and any fund or allowance declared exempt by law (xi). Amendments cited in the text: Act No. 10 of 1969 and Act No. 1 of 1981 s.25.
- **The agriculturalist thresholds are the story F2 should lead with.** KES 10,000 of livestock, KES 5,000 of equipment and KES 1,000 of produce were set by the 1969 and 1981 amendments and have never been uprated. In 2026 that protection is close to meaningless for a real farmer, and no popular explainer says so. This is the kind of point the library exists to make.
- **Stale cross-reference to flag, not repeat.** s.44(2) still refers to the Armed Forces Act Cap 199, which the Kenya Defence Forces Act 2012 replaced. Note the lag in a sentence rather than citing the repealed Act.
- ~~Civil imprisonment: the current statutory position~~: **resolved.** Statutory basis is Civil Procedure Act ss.38, 40, 42 and 43 with Order 22 rule 34(2) of the Civil Procedure Rules. s.42(1) caps detention at **six months** where the decree is for a sum exceeding KES 100 and **six weeks** otherwise, with release before expiry on payment of the warrant amount, on the decree being otherwise satisfied, on the creditor's request, or on the creditor's failure to pay subsistence allowance. s.42(2) is the one readers get wrong: release **does not discharge the debt**, but the debtor cannot be re-arrested under the same decree. s.41 has the Minister fix subsistence scales, payable by the creditor who asked for the detention. s.43 lets the court cancel a warrant or release the debtor on serious illness. s.40 bars entering a dwelling-house after sunset and before sunrise, and requires immediate release if the debtor pays the decree and arrest costs to the arresting officer.
- **The means test is the whole story and the popular version omits it.** In re Zipporah Wambui Mathara [2010] eKLR held committal for civil debt contrary to Article 11 of the ICCPR, applied through Article 2(6) of the Constitution. Later decisions did not abolish committal, they confined it: it is available only where the court is satisfied the debtor **has the means and has wilfully refused or neglected to pay**, never for simple inability. See Kailikia v M'Thiringi & 2 others (Civil Appeal E017 of 2024) [2024] KEHC 5860 (KLR). Publish the distinction plainly.
- ~~Limitation of Actions Act: how long a decree remains executable~~: **resolved** from Cap 22, Revised Edition 2012 [2010], s.4(4): an action may not be brought upon a judgment after **twelve years** from the date the judgment was delivered, or from the date of default where the judgment or a later order directed payment at a certain date or at recurring periods; and **arrears of interest on a judgment debt may not be recovered after six years** from the date the interest became due. Drafting note: s.4(4) governs an action **upon** a judgment. The execution timeline also engages Order 22 of the Rules, and caselaw runs time from the last execution attempt. State the statute first, then the practice, and do not merge the two.

#### Resolved By Research, And It Changes A Verdict

- ~~Whether debt collection is regulated as its own activity~~: **it is not.** Kenya has no standalone debt collectors statute and no debt collector licence. Collection conduct is bound by four separate instruments: the **CBK Digital Credit Providers Regulations 2022**, which licence and supervise DCPs; the **Business Laws (Amendment) Act 2024**, which extends CBK supervision to all credit providers and outlaws digital debt-shaming; the **Data Protection Act 2019**, enforced by the ODPC, which is where harassment and third-party contact actually get punished; and the **Auctioneers Act and Rules** for auctioneers. ODPC enforcement is real rather than theoretical: a digital credit provider was fined KES 2,975,000 for using contact details obtained from third parties to send threatening debt-recovery messages, and Whitepath was fined KES 250,000 in March 2025 for listing a person as a loan guarantor without consent.
- **F4 therefore moves from Adjust to Ready**, with its angle now settled: there is no debt collectors act, here are the four rulebooks that actually bind a collector, and here is where a complaint goes.
- ~~Whether a mobile money balance can be attached~~: **yes.** M-Pesa funds are reachable by **garnishee order under Order 23 of the Civil Procedure Rules**, in the usual two stages of an order nisi followed by an order absolute after the garnishee shows cause. Kenyan courts have made garnishee orders absolute against Safaricom PLC over funds held for a judgment debtor in an M-Pesa account and in a till number. This is the single most-asked question in the external signal and the answer is the opposite of what most readers assume, which makes it a strong F1 section rather than a throwaway line.

#### Confirmed From Secondary Sources Only: Read The Statute Before Publishing

These are consistent across multiple sources but were not read from primary text, because Kenya Law was unreachable. None may be published as a bare figure without a direct check.

- **Small Claims Court pecuniary limit: KES 1,000,000**, attributed to s.12(3) of the Small Claims Court Act 2016. The Chief Justice may vary it by notice in the Gazette, so date it and mark it confirm current. Needed for F3.
- **Insolvency Act 2015 thresholds:** creditor's bankruptcy petition KES 250,000; debtor's own petition KES 500,000; small bankruptcy level KES 100,000; company liquidation available where a statutory demand goes unsatisfied for 21 days. Needed for F6.
- **Auctioneers Rules 1997:** 45 days notice for immovable property; movable attachment proceeds by proclamation with a signed inventory under Rules 12 and 13. **The movable notice period was not pinned down** and must be read from the Rules before F1 or F4 states one.
- **Data Protection Act 2019:** ODPC may impose an administrative penalty of up to **KES 5 million or 1% of annual turnover, whichever is lower** (s.63), with complaints under s.56. Needed for F4 and L1.

#### Still Outstanding For The Other Clusters

Not covered by this pass. Cluster S, L, T and H remain unverified and are not cleared to draft.

- SHIF rate and base, Housing Levy rate, NSSF Tier I and Tier II limits, NITA levy, all Finance Act sensitive (S1)
- Employment Act: notice, severance and terminal dues, and whether gratuity is statutory or contractual (S2)
- HELB: current loan terms, repayment trigger and penalties (H1)
- Tax residency tests and Kenya's double taxation agreements in force, KRA being the authority (T1)

### Round Five Write Order

Enforcement core first, because it is the biggest hole and the strongest demand, then the payslip stack, then the rest.

1. ~~**F1 (hub)**~~ then ~~**F2 (protected property)**~~ then ~~**F5 (write-offs and limitation)**~~
2. ~~**S1 (deduction stack)**~~ then ~~**S2 (terminal dues)**~~
3. ~~**F3 (creditor recovery)**~~ then ~~**F6 (insolvency)**~~
4. ~~**L1 (data protection)**~~ then ~~**T1 (tax residency)**~~ then ~~**H1 (HELB)**~~
5. ~~**F4**~~, **L2, H2, R5-1, R5-2** as capacity allows, each subject to its Adjust condition being met

### Deliberately Not Doing

- **CRB removal timelines as a standalone.** Owned by [how-to-fix-your-crb-listing-kenya]. F5 links to it rather than repeating it.
- **Selling on TikTok as a standalone.** Channel strategy is owned by [digital-growth-kenya-sme-guide] and [whatsapp-sales-channel-kenya]. Revisit only if TikTok Shop Kenya develops settlement and payout mechanics worth a satellite of C9.
- **General "why your sales are low" business advice.** Off-brand for a finance library, whatever it does on social.
- **Investment scam spotting as a standalone.** Substantially owned by [ultimate-guide-to-personal-finance-kenya] and [evaluate-investment-opportunity-kenya].

### Library Remediation Done 20 September 2026

**Cover image audit.** Two faults found and fixed across 19 articles:

1. **Fifteen pairs shared a cover**, in breach of the house rule that every live cover must be topical and distinct. Four of the fifteen were in the 20 September batch, which had reused covers from older pieces.
2. **LoremFlickr has degraded.** Four of the nine articles using it were serving **one identical generic image**: [kmrc-affordable-housing-mortgage], [seasonal-agri-working-capital-kenya], [usd-shilling-hedging] and [fixed-deposit-lending-arbitrage]. Under test, four different tag and lock combinations all returned the same file.

All 19 were replaced with distinct, topical Pexels photographs. Each new URL was checked to return `image/jpeg`, to carry a checksum different from every other new cover, and to use a photo ID not already present in the library. **Zero duplicate covers now remain.**

**House rule amendment proposed.** The rule currently names LoremFlickr as the approved fallback for a duplicate cover. It is no longer safe and should be struck, with Pexels or Unsplash direct CDN URLs used in all cases. Five articles still carry LoremFlickr covers and currently render distinct images ([etims-kenya-sme-guide], [hire-purchase-vs-asset-finance-vs-logbook-kenya], [logbook-loans-kenya], [sme-transaction-fees-fx-spreads-kenya], [sme-trade-finance]); migrate them at the next pass before they degrade too.

**Date correction applied 20 September 2026.** The four payments-cluster pieces shipped on 20 September had carried `date: August 2, 2026` in frontmatter, copied from the Pay-1 hub. Owner ruled they should read their true ship date, so [receiving-money-from-abroad-kenya], [recover-wrong-payment-fraud-kenya], [bulk-payments-payroll-payouts-kenya] and [card-payments-pos-kenya-business] are now `September 20, 2026`. All thirteen pieces in that batch now share one date and sort together, newest first. The hub itself ([how-to-move-money-kenya-payment-rails]) and Pay-1 ([mpesa-for-business-paybill-till-kenya]) keep 2 August, which is when they actually shipped.

---

## Already Planned Elsewhere

- KESONIA loan pricing article: owner will supply an Absa example before writing (do not start without it).

## Content Pipeline Audit & Maintenance (26 September 2026)

- **Filename & ID Alignment Audit**: Resolved 8 article filename/ID mismatch warnings flagged by `validate-content.ts`:
  - `baas-kenya-cornerstone.md` -> `banking-as-a-service-kenya-baas-guide.md`
  - `bengula_apr_breakdown_article_improved.md` -> `mobile-loan-vs-bank-loan-apr-breakdown.md`
  - `green-financing-kenya.md` -> `green-financing-kenya-guide.md`
  - `friends-family-investments-final.md` -> `how-to-structure-friends-and-family-investments.md`
  - `pitch-deck-narrative-kenya.md` -> `how-to-create-a-pitch-deck-narrative.md`
  - `startup-budget-kenya-final.md` -> `how-to-build-an-accurate-startup-budget.md`
  - `ai-in-fintech-kenya.md` -> `role-of-ai-in-fintech-kenya.md`
  - `embedded-finance-kenya.md` -> `embedded-finance-kenya-guide.md`
- **Validation Result**: 136 article markdown files validated with 0 errors and 0 warnings (390,799 total words, avg 2,874 words/article).
- **Build & Asset Generation**: Verified content validation, sitemap generation, RSS feed generation, and SSG web build.

## Shipped 20 September 2026 (Round Four Phases 3 and 4, plus the payments cluster tail)

Thirteen articles in one batch. Every rate, statute and tax position was verified before drafting, per the Verify Before Drafting rule.

| ID | Published slug | Folder | Category | Words |
|---|---|---|---|---:|
| Pay-2 | receiving-money-from-abroad-kenya | banking-credit/ | Banking & Credit | ~2,900 |
| Pay-3 | recover-wrong-payment-fraud-kenya | banking-credit/ | Banking & Credit | ~3,300 |
| Pay-4 | bulk-payments-payroll-payouts-kenya | banking-credit/ | SME Finance | ~2,900 |
| (off-pipeline) | card-payments-pos-kenya-business | banking-credit/ | Fintech & Banking | ~2,900 |
| R3-10 | wills-nominees-business-continuity-kenya | investing/ | Wealth Optimization | ~4,500 |
| E2 | land-succession-transmission-kenya | investing/ | Real Estate | ~3,900 |
| E3 | family-trusts-holding-structures-kenya | investing/ | Wealth Optimization | ~3,900 |
| C10 | retirement-income-annuity-drawdown-kenya | investing/ | Wealth Optimization | ~4,500 |
| M1 | how-to-read-cbk-rate-decision-kenya | economy-policy/ | **Rates & Policy** | ~3,600 |
| M2 | kenyan-yield-curve-explained | economy-policy/ | **Rates & Policy** | ~3,300 |
| M3 | inflation-shilling-real-return-kenya | economy-policy/ | **Rates & Policy** | ~3,100 |
| R3-12 | choose-switch-sme-bank-kenya | banking-credit/ | SME Finance | ~3,500 |
| X1 | digital-assets-kenya-regulation-tax | economy-policy/ | **Rates & Policy** | ~3,700 |

**Card and POS piece is off-pipeline**, proposed the way the rails hub was. It earns its place because the **chargeback** had no owner anywhere in the library: nothing else covers a completed sale being reversed weeks later.

**Code change:** `Rates & Policy` added to `categoryIds` in `src/data/media.ts`. The blog filter pills derive from post categories automatically, so nothing else was needed.

**Reverse links wired (13):** C5 property-money (its "next piece in this cluster" sentence now points at E2, and the closing instruction links it too), retirement-planning (hands off to C10 from the decumulation table), cbr-cycle-positioning (to M1), SACCO membership (to R3-10 from the nominee section), monthly-income-engine (to C10 and M3), sovereign-debt-explained (to M2), dhowcsd-t-bill-ladder (its existing "flat curve" line now points at M2), diaspora-land-purchase (to E2), chama-llp-land-banking (to E3), banking hub (to R3-12), receiving-money-from-abroad (to X1), bank-vs-sacco-vs-mmf (to M3).

**Verification notes, because these are the claims most likely to be challenged:**
- **Cap 160** read from the statute text, not commentary: ss. 5, 9, 11, 26, 29, 30, 32, 33, 35 to 41, 45, 71.
- **Finance Act 2025 pensions:** the KES 300,000 annual and KES 600,000 lump sum exemptions were **deleted** from 1 July 2025 and replaced with conditions. Several KRA and RBA pages still display the old figures; C10 states the statutory position and flags the lag in a sentence, per the house conflict rule.
- **LN 187/2023** drawdown limits are sourced from RBA-derived summaries because Kenya Law and RBA both 403 direct fetches. Stated with a confirm-current caveat.
- **X1** was the one item that must not be drafted from memory. Verified: VASP Act 2025 commencement notice, the CMA/CBK functional split, the DAT repeal and its 10% excise replacement, and the Finance Act 2026 reporting sections with their 1 July 2026 effective date.

---

## Shipped 2 August 2026 (standalone, off-pipeline)

| ID | Published slug | Folder | Category | Words |
|---|---|---|---|---:|
| P1 (payments) | how-to-move-money-kenya-payment-rails | banking-credit/ | Banking & Credit | ~3,600 |

**Payment rails** (owner-proposed, not previously in the pipeline). Genuine gap: the rails were named in the banking cornerstone, cashless-economy and fees/FX pieces but nothing **owned the "which rail should I use" decision guide**. Everyday-decision framing (chosen over SME-payables and fraud-only angles). Covers M-Pesa, PesaLink, EFT, RTGS/KEPSS and international TT/SWIFT across the five deciders (speed, cost, limit, cut-off, reversibility) in one comparison table, plus a mermaid decision tree (domestic/international → size → urgency → recipient). **The original ground is the reversibility gradient**: protection against error *falls* as the amount rises, so RTGS (largest payments) is effectively irrevocable, which frames the business-email-compromise fraud warning and the "verify big account details twice" rule. Cut-off-time discipline and an SME payables section (EFT for payroll, PesaLink urgent, RTGS big-ticket, Pay Bill/Till collections). All limits/tariffs dated *as at 2026, confirm current*; sourced to CBK, Safaricom, IPSL/PesaLink, KBA. Links sme-transaction-fees-fx-spreads, how-banks-make-money, banking hub, cashless-economy, 13-week forecast, whatsapp, embedded-finance-guide, new-business-journey. **Reverse links wired (6):** banking hub (into the RTGS/EFT/PesaLink FAQ answer), fees/FX, how-banks-make-money, cashless-economy, 13-week forecast, new-business-journey. **PesaLink pricing corrected 2 August 2026 (owner-supplied):** PesaLink is *cheaper than M-Pesa*, not merely "below RTGS", commonly free under ~KES 1,000 then a **flat ~KES 20** up to its ~KES 1,000,000 ceiling (each bank sets its own tariff). The teaching point is flat-vs-tiered: M-Pesa's cost climbs with the amount while PesaLink's stays flat, so PesaLink wins for all but the smallest bank-to-bank sends and the gap widens as the sum grows. Table cost cell, Part 2 cost point, card, and Part 1 description all updated; PesaLink speed also corrected from "near-instant" to **instant**. YAML card-block bug (unquoted colon in a `desc`) fixed in the same pass. Shipped commits: article + reverse links, then the PesaLink correction, both on origin/main.

### Payments cluster follow-ons (planned, seeded by the rails hub)

The rails hub ([how-to-move-money-kenya-payment-rails]) is now the cluster's link target. These satellites each take one lane the hub deliberately left thin, and each maps to an angle we consciously did *not* make the hub's primary framing. Remaining write order: **Pay-3 → Pay-2**, with Pay-4 only if it holds distinct operational ground. (Pay-1 shipped 2 August 2026.)

**Hub update 2 August 2026 (owner-supplied):** the rails hub now states that *both* M-Pesa and PesaLink display the recipient's registered name before you confirm, so the name check at the point of sending is the strongest protection on those two rails, while EFT/RTGS/TT give no such check and therefore demand independent verification.

| ID | Working Title | Verdict | Main gap / caution |
|---|---|---|---|
| Pay-1 | M-Pesa for Business: Pay Bill vs Buy Goods, Charges, and Reconciliation | **Shipped 2 August 2026** | Published as [mpesa-for-business-paybill-till-kenya] (banking-credit/, Fintech & Banking, ~3,400 words). |
| Pay-2 | Receiving Money From Abroad: Remittances, M-Pesa Global, and the Cheapest Way In | **Shipped 20 September 2026** | Published as [receiving-money-from-abroad-kenya]. Inbound channels compared on shillings landed, not headline fee. |
| Pay-3 | If You Send Money to the Wrong Person: Reversals, Fraud, and Getting It Back | **Shipped 20 September 2026** | Published as [recover-wrong-payment-fraud-kenya]. Reversal process by rail, the first-hour playbook, and the frauds that engineer a wrong payment. |
| Pay-4 | Bulk Payments and Payroll Payouts: EFT Batches, Portals, and Host-to-Host | **Shipped 20 September 2026** | Published as [bulk-payments-payroll-payouts-kenya]. Cleared the bar: EFT batches, maker-checker, cut-offs, and reconciling returns are distinct operational ground. |

#### Pay-1. M-Pesa for Business: Pay Bill vs Buy Goods, Charges, and Reconciliation
**Verdict: Shipped 2 August 2026** as [mpesa-for-business-paybill-till-kenya]. The hub compares rails for *sending*; nothing owned the SME *collection* decision. **Reconciliation is framed as the real decision** (not charges): Buy Goods for the counter (free to customer, no reference), Pay Bill for anyone who invoices (the account-reference field maps payments to accounts automatically). Cost-of-collection KaTeX formula; who-bears-the-charge (till = merchant, paybill = configurable); settlement to the linked bank and the working-capital timing; the **fake-confirmation scam** with the "your account is the truth, not the customer's SMS" rule; **KRA visibility** of till/paybill turnover reframed as a bankable asset not a trap; and the graduation ladder (personal number → till → paybill → Daraja/ERP integration). Links the rails hub, whatsapp, fees/FX, 13-week forecast, etims, vat, turnover-tax, new-business-journey, embedded-finance. Reverse links into it not yet wired. Owns: Pay Bill vs Buy Goods (Till) and who bears the charge (customer vs merchant), settlement to the linked bank account and its timing, the transaction-cost bands, reference discipline and **reconciliation** (matching M-Pesa statements to invoices), Fuliza/overdraft on tills, the tax-visibility reality now that till/paybill data is legible to KRA, and when to graduate to a paybill + accounting/ERP integration.
- **Do not re-own:** selling on WhatsApp ([whatsapp-sales-channel-kenya]), the embedded-finance concept ([embedded-finance-kenya-guide]), or the send-side rails ([how-to-move-money-kenya-payment-rails]).
- Links: the rails hub, whatsapp, embedded-finance-guide, 13-week forecast, new-business-journey, fees/FX. Folder: `banking-credit/` or `technology/`. Category: Fintech & Banking.

#### Pay-2. Receiving Money From Abroad: Remittances, M-Pesa Global, and the Cheapest Way In
**Verdict: Ready.** The hub owns outbound TT; the inbound remittance rail is a clean gap with heavy diaspora search intent. Owns: the channels (bank TT, Wise, WorldRemit/Sendwave, M-Pesa Global, card top-ups) compared on the **FX spread on the way in**, fee, speed, and limit for a worked amount; the "the fee is the small part, the rate is the cost" lesson applied to inbound; landing money into M-Pesa vs a bank account; and remittance scams targeting senders abroad.
- **Do not re-own:** outbound TT (hub), diaspora land/bond specifics ([diaspora-land-purchase-kenya], [cbk-diaspora-bond-access]).
- Links: the rails hub, fees/FX, diaspora-land, cbk-diaspora-bond, foreign-etfs-offshore. Folder: `investing/` or `banking-credit/`. Category: Banking & Credit. Caution: remittance-provider availability, rates, and limits move fast; date everything and mark "confirm current".

#### Pay-3. If You Send Money to the Wrong Person: Reversals, Fraud, and Getting It Back
**Verdict: Ready; signature risk-first spin-out.** The fraud/reversibility angle we consciously declined as the hub's primary framing, now given its own piece. Owns: reversibility by rail as an actual *process* (the M-Pesa reversal steps, PesaLink/EFT recall, RTGS finality, TT recall-request), the **first-hour playbook** when money goes to the wrong recipient, business-email-compromise + SIM-swap + reversal-con anatomy, how recovery really works and its honest odds, and prevention (Hakikisha, independent callback verification, "verify big account details twice"). Fits the house risk-first posture.
- Links: the rails hub, fees/FX, [how-to-fix-your-crb-listing-kenya], [mobile-digital-loans-real-cost-kenya]. Folder: `banking-credit/`. Category: Banking & Credit. Caution: process and statutory accuracy; date any procedures and reversal windows.

#### Pay-4. Bulk Payments and Payroll Payouts: EFT Batches, Portals, and Host-to-Host
**Verdict: Adjust.** The SME payables operational angle. Only worth a standalone if it clears the hub's SME-payables section and the [13-week-cash-forecast-kenya-sme]. Distinct ground if it holds it: batch file formats, maker-checker approval workflows, host-to-host / API payout integration, cut-off orchestration across rails, reconciliation of a batch, and failed/returned-payment handling. Otherwise fold into a refresh of the banking hub or the handbook. Folder: `banking-credit/` or `business-trade/`. Category: SME Finance.

---

## Shipped 1 August 2026 (Round Four Phase 1 and the head of Phase 2)

| ID | Published slug | Folder | Category | Words |
|---|---|---|---|---:|
| C4 | trade-finance-kenya-complete-guide | business-trade/ | SME Trade Finance (featured) | ~8,100 |
| C6 | fixed-income-kenya-complete-guide | investing/ | Bonds & Bills (featured) | ~7,200 |
| T3 | vat-for-smes-kenya | business-trade/ | SME Finance | ~3,700 |
| T2 | turnover-tax-vs-corporation-tax-kenya | business-trade/ | SME Finance | ~4,100 |
| T4 | capital-gains-tax-kenya | investing/ | Wealth Optimization | ~4,200 |
| C8 | tax-compliance-cash-kenya-guide | economy-policy/ | Wealth Optimization (featured) | ~6,400 |
| C5 | property-money-kenya-complete-guide | investing/ | Real Estate (featured) | ~6,000 |
| C7 | insurance-kenya-complete-guide | investing/ | Wealth Optimization (featured) | ~4,900 |
| C9 | digital-growth-kenya-sme-guide | technology/ | Digital Strategy (featured) | ~4,500 |

Reverse links wired in this pass: import-finance, sme-trade-finance, bank-guarantees and LPO → C4; kb-bond, dhowcsd-ladder, future-mmfs, mmf-stress-test, diaspora-bond and paye → C6; etims, 13-week forecast, WC cycle and paye → T3; vat-for-smes, paye, etims and new-business-journey → T2; business-valuation, diaspora-land, how-to-buy-shares-nse and chama-llp → T4; all four tax satellites → C8; rental-income, diaspora-land, chama-llp and reits → C5.

**Cornerstone count after this batch: C4, C5, C6, C7, C8 and C9 all shipped 1 August 2026.** Of the C4–C10 set only **C10 (retirement + estate)** remains, and it is still gated on R3-10 as its estate half; the standing instruction not to publish a third pension explainer stands, so C10 is only worth writing as the decumulation-plus-estate arc.

**Every pillar now has a hub.** Trade (C4), property (C5), fixed income (C6), insurance (C7), tax (C8), digital growth (C9), alongside the live hubs for banking, personal finance, inclusion, BaaS, SACCOs, investing (C2), SME finance (C3) and borrowing (C1). The library's remaining gaps are satellites and the rates pillar, not hubs. **Round Four Phase 1 and 2 are complete, Phase 3 is complete except the succession satellites, and Phase 4 (M1–M3) is untouched.**

**The tax pillar is complete: four satellites plus the hub, all shipped 1 August 2026.** Non-overlapping by design:

| Article | Owns |
|---|---|
| [paye-withholding-freelance-tax-kenya] | PAYE order of operations, reliefs vs deductions, the freelance WHT-as-advance rhythm |
| [vat-for-smes-kenya] | VAT as a working-capital event; registration decision; zero-rated vs exempt; input-credit rules |
| [turnover-tax-vs-corporation-tax-kenya] | The income tax regime choice, decided by net margin; the professional-fees exclusion |
| [capital-gains-tax-kenya] | CGT on land, shares and business exit; adjusted cost as a records problem; share vs asset sale |
| [tax-compliance-cash-kenya-guide] | **The hub.** Three families frame; assessed vs collected; the employment wedge and the SME total; filing calendar; penalty table; WHT you must deduct; TCC as a commercial asset; the objection path |

C8 respects those boundaries: Part 12 is an explicit hand-off table routing to all four plus MRI ([rental-income-yield-tax-kenya]), dividend WHT ([dividend-income-nse-kenya]), SACCO WHT ([ultimate-guide-to-sacco-membership-kenya]), the fixed-income tax table ([fixed-income-kenya-complete-guide]), eTIMS ([etims-kenya-sme-guide]) and the import duty stack ([trade-finance-kenya-complete-guide]). **Anything added to the pillar from here should extend a satellite, not the hub.**

**Refresh discipline for the tax pillar:** re-verify after every Finance Act, in this order, because C8 carries figures sourced from all four satellites. PAYE bands and NSSF/SHIF/AHL rates (R3-11 and C8 Part 3, which tie to each other and will both break together), VAT threshold and rate (T3), TOT rate and band (T2), CGT rate and exemptions (T4), then C8's penalty table and calendar.

**Two housekeeping notes from this batch.**

1. **Insight slugs are not blog routes.** `src/data/articles/index.ts` excludes `content/insights/**`, so links of the form `/blog/10-tax-drag` do not resolve. One pre-existing instance was found and replaced in [paye-withholding-freelance-tax-kenya]. Do not link to insight files as if they were articles.
2. **Maintenance debt is now concentrated in C6.** Its rate tables (CBR, KESONIA, three T-bill tenors, inflation, savings, deposit, and the live IFB coupons) are dated to August 2026 and should be re-dated quarterly alongside the auction-sensitive satellites.

## Shipped 26 July 2026 (Round Three write-order batch)

| ID | Published slug | Folder | Category |
|---|---|---|---|
| R3-5 | hire-purchase-vs-asset-finance-vs-logbook-kenya | banking-credit/ | Banking & Credit |
| R3-4 | 13-week-cash-forecast-kenya-sme | business-trade/ | SME Finance |
| R3-6 | contractor-cash-flow-stack-kenya | business-trade/ | SME Trade Finance |
| R3-7 | seasonal-agri-working-capital-kenya | business-trade/ | SME Trade Finance |
| R3-8 | dividend-income-nse-kenya | investing/ | Wealth Optimization |

Note: reverse links from existing companions into this batch not yet added (forward links from the new pieces are wired). Optional reverse-link pass: WC cycle → R3-4/R3-6; asset-finance & logbook → R3-5; bank-guarantees/AGPO/LPO → R3-6; how-to-buy-shares-nse & kb-bond → R3-8.

## Shipped 19 July 2026 (write-order batch)

| ID | Published slug | Folder |
|---|---|---|
| A10 | evaluate-investment-opportunity-kenya | investing/ |
| P1-3 | sme-transaction-fees-fx-spreads-kenya | banking-credit/ |
| G5 | business-insurance-kenya-sme-guide | banking-credit/ |
| A9 | sme-risk-management-kenya | business-trade/ |
| G6 | new-business-banking-journey-kenya | banking-credit/ |
| P2-2 | chama-llp-land-banking-kenya | investing/ |
| P2-3 | mmf-stress-test-kenya | investing/ |
| G8 | diaspora-land-purchase-kenya | investing/ |
| P3-2 | data-driven-inventory-small-shops-kenya | technology/ |
| G10 | whatsapp-sales-channel-kenya | technology/ |
