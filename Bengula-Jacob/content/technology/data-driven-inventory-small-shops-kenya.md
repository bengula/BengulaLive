---
id: data-driven-inventory-small-shops-kenya
title: "Data-Driven Inventory: How Small Shops Stop Overstocking Capital"
summary: "Dead stock is a working-capital problem wearing a retail face. This Excel-first guide shows Kenyan shop owners how to measure stock cover, run-rates, and reorder points, free cash from shelves, and graduate to dashboards only after the maths works on a spreadsheet."
category: Digital Strategy
date: July 19, 2026
readTime: 12 min read
author:
  name: Bengula Jacob
  role: Relationship Manager & Founder of Bengula Inc.
  avatar: /images/jacob.jpg
coverImage: https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1600
---

![Small retail shelves with products and a notebook for stock counts](https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1200 "If the shelf cannot pay its rent in turns, it is a warehouse funded by your overdraft. Photo: Pexels")

Many Kenyan shops do not have a "sales problem" first. They have a **capital stuck in the wrong SKUs** problem. Fast movers stock out while slow movers decorate the shelf for six months. The owner funds both with cash, supplier credit, or a bank line, then wonders why profit never becomes cash.

This guide is the educational companion to the [retail data dashboard](/blog/retail-data-decision-dashboard) case study. It starts in **Excel** (or Google Sheets), because that is the real tool for most single- and multi-branch SMEs. Python and fancy BI are graduation steps, not the entry ticket. The finance link is deliberate: inventory is a working-capital decision ([working capital cycle](/blog/working-capital-cycle-kenya-smes)).

> **Key Insight:** Every slow-moving unit is a loan you made to the shelf. Until it sells, it pays no interest, risks expiry or theft, and blocks the reorder of what customers actually buy. Inventory control is treasury management with barcodes.

```cards
- icon: Package
  title: Measure cover
  desc: Days of stock on hand per SKU beat gut feel and supplier sweet-talk.
  linkText: Working capital
  linkUrl: /blog/working-capital-cycle-kenya-smes
- icon: FileSpreadsheet
  title: Excel first
  desc: A clean sales and stock sheet beats a dashboard on dirty data.
  linkText: Retail dashboard case
  linkUrl: /blog/retail-data-decision-dashboard
  type: amber
- icon: BadgePercent
  title: Free the cash
  desc: Markdown, return, or stop-buying rules convert dead stock into oxygen.
  linkText: Margin discipline
  linkUrl: /blog/sme-packager-optimization
  type: emerald
```

---

### The Three Numbers That Matter

#### 1. Sales run-rate

For each SKU (or tight category):

$$ \text{Daily run-rate} = \frac{\text{Units sold in period}}{\text{Days in period}} $$

Use 28 or 30 days for fast movers; 90 days for slow categories so one promotion does not lie to you.

#### 2. Stock cover (days on hand)

$$ \text{Days cover} = \frac{\text{Units on hand}}{\text{Daily run-rate}} $$

If run-rate is zero, cover is infinite: you are funding a museum piece.

#### 3. Reorder point (simple)

$$ \text{Reorder point} \approx (\text{Daily run-rate} \times \text{Lead time days}) + \text{Safety stock} $$

Lead time is supplier reality in Kenya, not the brochure: include transport and stock-outs at the distributor.

---

### A Minimal Excel Layout

Create one sheet with columns:

| Column | Example |
|---|---|
| SKU / barcode | 6001-Milk-500ml |
| Category | Dairy |
| Units on hand | 48 |
| Unit cost (KES) | 55 |
| Stock value (KES) | 2,640 |
| Units sold (last 30d) | 120 |
| Daily run-rate | 4.0 |
| Days cover | 12 |
| Supplier lead time (days) | 3 |
| Safety stock (units) | 8 |
| Reorder point | 20 |
| Action | OK / Reorder / Excess / Dead |

**Stock value** is what the bank and your stomach should care about:

$$ \text{Stock value} = \text{Units on hand} \times \text{Unit cost} $$

Sort by stock value descending once a week. Your biggest cash prisoners surface immediately.

---

### Action Rules You Can Actually Run

| Signal | Rule of thumb | Action |
|---|---|---|
| Days cover below reorder logic | Risk of stock-out on a mover | Reorder |
| Days cover 60-90 on non-seasonal goods | Capital getting sleepy | Stop buying; promote |
| Days cover 90+ or zero sales in 60 days | Dead or dying | Markdown ladder; return if possible; do not reorder |
| High value + slow cover | Working-capital leak | Priority clearance |
| Fast cover + frequent stock-outs | Understocked winner | Raise min stock; protect availability |

Seasonality (school calendars, Ramadan, festive periods) needs a separate note column so you do not kill stock that is meant to peak next month.

---

### From Gut Purchase to Buying Discipline

Suppliers win when you buy on relationship and "special offer" quantity breaks without run-rate maths.

Before any non-trivial order, answer:

1. How many days cover will this order create at current run-rate?
2. What is expiry or fashion risk?
3. What else will I **not** be able to buy if cash sits here?
4. Is this SKU in the top sellers by margin, not only by noise?

Margin matters: a fast seller at near-zero margin can still be a bad use of shelf if it crowds higher-contribution items ([packager / margin discipline](/blog/sme-packager-optimization)).

---

### Weekly Operating Rhythm (45 Minutes)

| Step | Time | Output |
|---|---|---|
| Update sales from POS or sales book | 15 min | Fresh sold units |
| Spot count top 20 value SKUs | 15 min | Trust in on-hand figures |
| Sort excess and stock-out lists | 10 min | Actions |
| Place or delay orders | 5 min | Cash protection |

Multi-branch shops add a transfer column: move stock before you buy more. The dashboard case study is simply this rhythm automated ([retail dashboard](/blog/retail-data-decision-dashboard)).

---

### Worked Mini-Example

A kiosk tracks three items (illustrative):

| SKU | On hand | Sold 30d | Days cover | Value at cost | Action |
|---|---:|---:|---:|---:|---|
| Cooking oil 1L | 10 | 90 | 3.3 | KES 3,500 | Reorder |
| Biscuits assorted promo | 120 | 15 | 240 | KES 9,600 | Markdown; stop buy |
| Airtime scratch (fast) | 40 | 200 | 6 | KES 4,000 | OK / slight reorder |

The biscuits are the villain: almost KES 10,000 frozen for eight months of cover. Clearing them at a thin margin can fund oil availability and reduce the need for expensive short-term borrowing ([SME finance handbook](/blog/sme-finance-handbook-kenya)).

---

### Graduation Path (When Excel Is Not Enough)

1. **Clean master data** - one code per item, consistent names.
2. **Automatic daily export** from POS to sheet.
3. **Simple dashboard** - sales, stock value, excess list, stock-outs.
4. **Only then** heavier tools or scripts.

Skipping to software on dirty codes produces expensive fiction. The Mombasa/Nairobi retailer story in the [dashboard article](/blog/retail-data-decision-dashboard) starts with cleaning source data for a reason.

---

### Links to Cash and Risk

- Inventory days are part of the cash conversion cycle ([working capital](/blog/working-capital-cycle-kenya-smes)).
- Overstock funded by overdraft is a pricing and facility-design problem ([fees and facilities](/blog/sme-transaction-fees-fx-spreads-kenya), [SME finance](/blog/sme-finance-handbook-kenya)).
- Theft and damage are operational risks ([SME risk management](/blog/sme-risk-management-kenya)); counts are a control, not a ceremony.
- Insurance does not fix chronic dead stock ([business insurance](/blog/business-insurance-kenya-sme-guide)).

---

### Risk Factors

- **Bad counts** make perfect formulae wrong.
- **Promotions** distort run-rates if you do not flag them.
- **Supplier minimums** can force excess; negotiate or change supplier.
- **Understocking winners** while hunting dead stock loses sales; balance both lists.
- **This is education**, not an inventory-optimisation software sale.

---

### Decision Framework: 14-Day Reset

**Day 1-2:** List top 50 SKUs by stock value.  
**Day 3-5:** Compute 30-day run-rate and days cover.  
**Day 6-8:** Tag Excess / Dead / Reorder / OK.  
**Day 9-11:** Markdown or return plan for Dead/Excess; protect Reorder winners.  
**Day 12-14:** Write buying rules; schedule weekly 45-minute review.

If you need help turning the sheet into a live decision view, the path is documented in the [retail dashboard case](/blog/retail-data-decision-dashboard) and via [services](/services).

---

### Bengula View

The desk's retail view is unromantic: shops die from polite shelves. Owners remember the supplier who gave thirty days; they forget the biscuit carton that ate those thirty days of cash.

Start with Excel honesty. Rank by value. Force cover maths before purchase orders. Automate only after the behaviour exists. Inventory excellence is not a software badge; it is a weekly habit that turns stock back into options.

For the wider cash system, read [working capital](/blog/working-capital-cycle-kenya-smes). For margin structure, read [packager optimisation](/blog/sme-packager-optimization). To implement a decision dashboard, [book a session](/contact).

---

### Sources and Further Reading

- Bengula Inc: [Retail Data Decision Dashboard](/blog/retail-data-decision-dashboard), [Working Capital Cycle](/blog/working-capital-cycle-kenya-smes), [SME Packager Optimization](/blog/sme-packager-optimization), [SME Finance Handbook](/blog/sme-finance-handbook-kenya), [Accounts Receivable](/blog/what-is-accounts-receivable), [SME Risk Management](/blog/sme-risk-management-kenya).

*General business education for Kenyan retailers and distributors, not accounting or inventory-system advice for a specific shop. Adapt lead times and thresholds to your category and supplier reality.*
