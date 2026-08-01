---
id: advanced-dhowcsd-t-bill-ladder
title: "Advanced DhowCSD Strategies: Building a T-Bill Rollover Ladder for 91, 182, and 364 Days"
summary: The DhowCSD registration is the easy part. This guide covers what comes after, building a rollover ladder across the three T-bill tenors so a tranche matures every quarter, running reinvestments through the portal without manual drama, the discount maths behind what you actually pay and receive, and how to read CBK rate moves so the ladder adapts instead of just repeating.
category: Bonds & Bills
date: July 10, 2026
readTime: 11 min read
author:
  name: Bengula Jacob
  role: Relationship Manager & Founder of Bengula Inc.
  avatar: /images/jacob.jpg
coverImage: https://images.pexels.com/photos/6801647/pexels-photo-6801647.jpeg?auto=compress&cs=tinysrgb&w=1600
---

DhowCSD solved the access problem: any Kenyan with an ID, a KRA PIN, and KES 50,000 can now lend to the government directly, from a phone, with no broker and no fees. What the portal does not hand you is a system. Most retail investors buy one bill, wait, receive the maturity, let it idle in a bank account for three weeks, and repeat, leaking yield at every joint.

The fix is the oldest tool in fixed income: the **ladder**. Split the money across the three tenors, let a tranche mature every few months, and roll each maturity straight back through the portal. Liquidity every quarter, no timing decisions, and money that is never idle. This guide builds one, with the actual mid-2026 numbers.

> **Key Insight:** A T-bill ladder converts three separate anxieties, "when do I get my money back?", "what if rates change?", and "did I forget to reinvest?", into one calendar habit. You are not forecasting rates; you are averaging them, while keeping a maturity within reach at all times. The entire strategy is a table and a reminder.

---

### The Three Rungs, Priced Today

The weekly CBK auctions offer three tenors. The most recent published weighted averages as at the mid-July 2026 auctions:

| Tenor | Latest Average Rate | Auction Rhythm | Natural Job |
|---|---|---|---|
| 91-day | 8.825% | Weekly | The liquidity rung: money back every quarter |
| 182-day | 8.971% | Weekly | The middle rung: half-year goals |
| 364-day | 8.992% | Weekly | The yield rung: the longest lock a bill allows |

Notice the shape: the curve is **almost flat**, barely 17 basis points separate three months from twelve. That flatness is information. It means the market expects rates to keep easing (nobody pays much extra for your longer commitment), and it means a ladder currently costs almost nothing in yield versus locking everything long, while buying you far better liquidity. In steep-curve years the ladder trades liquidity for yield; in mid-2026 it is close to a free lunch.

All three rates carry 15% withholding tax, deducted at source. Net of tax, the rungs run roughly 7.50% to 7.64%, comfortably above the 6.41% inflation print (July 2026) and far above any savings account.

---

### The Discount Maths: What You Actually Pay

T-bills pay no coupon. You buy at a discount and receive face value at maturity; the discount is your interest, and the withholding tax is deducted upfront. The price per KES 100 of face value:

$$ \text{Price} = \frac{100}{1 + r \times \frac{d}{365}} = \frac{100}{1 + 0.08825 \times \frac{91}{365}} = 97.85 $$

Concretely, at the 91-day rate of 8.825%: a KES 100,000 face value bill costs about **KES 97,847**. At maturity, KES 100,000 lands in your account. The KES 2,153 difference is your interest, on which the 15% tax (about KES 323) is netted in the settlement figures the portal shows you. Two practical consequences:

1. **Bid in face value, budget in price.** The KES 50,000 minimum is face value; the cash you need is slightly less. The portal's invoice after auction tells you the exact figure to pay.
2. **Returns quoted are annualised.** A 91-day bill at 8.825% earns roughly a quarter of that per cycle; the annual figure assumes you reinvest, which is precisely what the ladder automates.

---

### Building the Ladder: A KES 600,000 Worked Example

Split the pot equally across the rungs in a single auction week:

| Tranche | Face Value | Tenor | Rate at Purchase | Matures | Then |
|---|---|---|---|---|---|
| A | KES 200,000 | 91-day | 8.825% | ~October 2026 | Roll into a new bill |
| B | KES 200,000 | 182-day | 8.971% | ~January 2027 | Roll into a new bill |
| C | KES 200,000 | 364-day | 8.992% | ~July 2027 | Roll into a new bill |

The blended gross yield is about **8.93%**, within a whisker of the best single rate, and the structure now behaves like this:

- **Tranche A returns every quarter.** Rolled into successive 91-day bills, it is your standing liquidity valve: four times a year, KES 200,000 passes through your hands on its way back into the market, available to redirect if life demands it.
- **Tranches B and C add semi-annual and annual touchpoints**, so across a full year the ladder hands you a decision point roughly every quarter without ever having everything unlocked at once.
- **Every reinvestment reprices at the current auction**, so your average yield tracks the rate cycle up and down instead of betting on one moment.

**The yield-maximising variant.** Instead of rolling each rung into itself, roll *every* maturity into a new 364-day bill. After a transition year, all your money earns the longest rate with maturities still staggered through the calendar. In a flat curve it changes little; if the curve steepens, it captures the slope. The cost is a looser maturity rhythm, so run it only once your liquidity valve has proven unnecessary for a full year.

---

### Running It on DhowCSD Without Manual Drama

The portal (and app) reduce the ladder to five habits:

1. **Know the calendar.** Bills auction weekly; the offer for each week's issues is on the portal with bidding deadlines. Put a recurring reminder two days before the weekly cutoff.
2. **Bid non-competitive.** You accept the auction's weighted average rate and always get filled. Competitive bidding (from KES 2 million, naming your own rate) is for institutions with rate views; a retail ladder wants certainty of execution, not negotiation.
3. **Use the reinvestment election.** When a bill approaches maturity, the portal supports rolling the proceeds into a new issue rather than paying out to your bank, the single feature that turns the ladder from a chore into a system. Where you prefer manual control, the maturity pays to your registered bank account and your reminder puts it back in the next auction.
4. **Reconcile monthly.** The portal's statements show holdings, maturities, and settlement amounts; five minutes a month confirms every rung is where the table says it is.
5. **Keep the float boundary.** The ladder is for dated money. The emergency fund stays in the MMF ([the jobs framework](/blog/bank-vs-sacco-vs-mmf-savings) governs); the ladder should never be broken for a want.

---

### The Compounding Case for Never Being Idle

Rolling the 91-day bill four times at the current rate compounds to more than the headline suggests:

$$ \left(1 + 0.08825 \times \tfrac{91}{365}\right)^{4} - 1 = 9.10\% \text{ effective annual (gross)} $$

That 9.10% from disciplined rolling actually edges the 364-day's 8.99%, a quirk of the flat curve worth understanding rather than chasing: it holds only if rates stay put, and the whole point of 2026's curve is that the market expects them to fall. The deeper lesson is the cost of gaps: a maturity that sits in a current account for three weeks between cycles drags your effective yield down by roughly a quarter of a percent on that tranche. The ladder's real yield edge over ad-hoc buying is not clever tenor selection; it is the elimination of idle days.

---

### Reading the Rate Cycle Like a Ladder Operator

You never need to forecast, but three signals tell you what your next rolls will look like (all live on this site's rates ticker and CBK's weekly releases):

- **The Central Bank Rate (8.75%, July 2026).** Cuts flow into bill auctions within weeks. In a cutting cycle, each roll reprices slightly lower, the argument for shading new money toward the 364-day rung, and for pairing the ladder with longer bonds for money you will not need ([the bond guide](/blog/kb-bond-guide-2026) takes over there, including tax-free infrastructure issues).
- **Auction performance.** Heavy oversubscription pushes accepted rates down; undersubscription props them up. The weekly results PDF shows both, one day after the professionals see it.
- **Inflation (6.41%).** Your net yield minus inflation is the only return that matters; if the gap compresses toward zero, the ladder is preserving money, not growing it, and the growth layers of [the investing map](/blog/ultimate-guide-to-investing-in-kenya) matter more.

---

### Risk Factors

- **Reinvestment risk is the ladder's native weather.** In a falling cycle each roll earns less; the ladder averages the slide rather than escaping it. The escape is extending duration into bonds, deliberately, with dated money.
- **Bills are hold-to-maturity in practice.** There is no meaningful retail secondary market; CBK rediscounting exists as a punitive last resort. Never ladder money whose date you do not actually know.
- **Sovereign risk in shillings is the lowest available, not zero.** It is the same credit the entire banking system leans on; treat it as the benchmark, and remember concentration in any single borrower, even this one, is still concentration.
- **Operational drift.** Missed reminders, stale bank details, an unwatched portal message: the system fails at its human joints. The monthly reconciliation habit is the maintenance schedule.

### Decision Framework: Is the Ladder Your Next Move?

1. Emergency fund already parked in an MMF? (The ladder is not it.)
2. At least KES 150,000 of dated money (three rungs Ã— the KES 50,000 minimum)?
3. Comfortable that this money is locked to each maturity date, with the quarterly valve as your only tap?
4. Willing to keep the two-minute weekly habit and the monthly reconciliation?
5. Clear on the boundary where the ladder ends and bonds begin (money beyond ~18 months belongs further up [the curve](/blog/kb-bond-guide-2026))?

Five yeses: place the three bids in the same auction week and the ladder exists by Friday.

### Bengula View

The desk regards the T-bill ladder as the single highest-value habit available to an ordinary Kenyan saver in 2026: sovereign credit, near-nine-percent gross yields, quarterly liquidity, zero fees, and a structure that removes both timing decisions and idle cash, the two places retail yield actually dies. The flat curve makes this the cheapest moment in years to hold the liquid version of the strategy. Build the three-rung ladder with dated money, elect the rollovers, shade toward the long rung while the cutting cycle lasts, and let the machine be boring. Boring, compounding, and never idle is the entire strategy.

---

### Sources and Further Reading

- [Treasury Bills, Central Bank of Kenya](https://www.centralbank.go.ke/bills-bonds/treasury-bills/): tenors, minimums, auction mechanics, and weekly results (rates cited are the published weighted averages from the mid-July 2026 auctions).
- [DhowCSD Portal, CBK](https://dhowcsd.centralbank.go.ke/): registration, bidding, and statements.
- [Investing in Government Securities via DhowCSD, Kenyan Wallstreet](https://kenyanwallstreet.com/investing-in-govt-bonds-using-cbks-dhowcsd): independent walkthrough of the portal journey.
- Bengula Inc: [The Complete Guide to Fixed Income in Kenya](/blog/fixed-income-kenya-complete-guide) (the hub this ladder sits inside), [Sovereign Debt Explained](/blog/sovereign-debt-explained), [Kenyan Treasury Bonds Guide](/blog/kb-bond-guide-2026), [The Ultimate Guide to Investing in Kenya](/blog/ultimate-guide-to-investing-in-kenya), [Monthly Income Engine](/blog/monthly-income-engine-kenya), [Bank Account vs SACCO vs MMF vs Insurance](/blog/bank-vs-sacco-vs-mmf-savings)

*General financial education, not investment advice. Rates are the published averages for the auctions dated in the text and change weekly; confirm the current offer on DhowCSD before bidding. Withholding tax and auction terms are as published by CBK and may change.*
