---
id: mpesa-for-business-paybill-till-kenya
title: "M-Pesa for Business: Pay Bill vs Buy Goods, Charges, and Reconciliation"
summary: "Almost every Kenyan business gets paid through M-Pesa, and almost none chooses deliberately between a Pay Bill and a Buy Goods till. The two are priced differently, settle differently, and, above all, reconcile differently. This guide explains which to use, who actually pays the charge, why the account-reference field is the real decision, how to survive the fake-confirmation scam, and when your till becomes visible to KRA."
category: Fintech & Banking
date: August 2, 2026
readTime: 14 min read
author:
  name: Bengula Jacob
  role: Relationship Manager & Founder of Bengula Inc.
  avatar: /images/jacob.jpg
coverImage: https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1600
---

![A small business owner packing customer orders](https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1200 "Getting paid is the easy part in Kenya. Getting paid in a way you can reconcile, at a cost you chose, and can prove landed, is the part most businesses never set up on purpose. Photo: Pexels")

Almost every business in Kenya is paid through M-Pesa, and almost none of them chose deliberately between the two ways of doing it. They took whichever one the Safaricom shop set up first, and they have been living with its costs and its reconciliation headaches ever since.

The two options are **Buy Goods** (a Lipa na M-Pesa till) and **Pay Bill** (a paybill number with an account reference). They look almost identical to a customer, one asks for a till number, the other for a business number plus an account, but underneath they price differently, settle differently, and, most importantly, they **reconcile** differently. Pick the wrong one for how your business actually sells and you will either overpay on charges, or spend hours each week guessing which customer sent which payment, or both.

This guide is the collection-side companion to the [payment rails guide](/blog/how-to-move-money-kenya-payment-rails), which covers sending money out. Here the question is the reverse: how should money come *in*? It covers what each option is, who really pays the charge, why the account-reference field is the decision that matters most, how funds reach your bank, the fake-confirmation scam that costs merchants real stock, and the fact that your till is now legible to KRA. It does not re-cover selling on WhatsApp, that operating rhythm is in [the WhatsApp sales channel guide](/blog/whatsapp-sales-channel-kenya); this is about the payment plumbing underneath it.

> **Key Insight:** Buy Goods and Pay Bill are not "the same thing with a different number". The single question that should decide between them is reconciliation: do you need to know *which customer* paid *which invoice*? If yes, Pay Bill's account-reference field is worth more than any charge difference, because it maps payments to invoices automatically. If you are selling over a counter where the sale and the payment are the same moment, Buy Goods is simpler and free to your customer. Choose on how you sell, not on which the agent set up.

```cards
- icon: Store
  title: Buy Goods for the counter
  desc: A Lipa na M-Pesa till is free to the customer and ideal where the sale and the payment happen together. Simple, but no account reference to reconcile.
- icon: FileText
  title: Pay Bill for invoices
  desc: The account-reference field maps each payment to a customer or invoice automatically. Worth more than the charge for any business that bills.
- icon: ShieldCheck
  title: Your confirmation is the truth
  desc: A customer's M-Pesa SMS or screenshot proves nothing. Release goods only against the confirmation that reaches your own account.
  linkText: Payment-proof rules
  linkUrl: /blog/whatsapp-sales-channel-kenya
  type: amber
```

---

### Part 1: What Each One Actually Is

Both are "Lipa na M-Pesa", Safaricom's business payment service, but they are built for different sales.

**Buy Goods (a till number).** The customer selects Lipa na M-Pesa, chooses Buy Goods, enters your **till number** and the amount, and pays. There is no field for who they are or what they are paying for. It is designed for **point-of-sale**: a shop, a kiosk, a restaurant, where the person paying is standing in front of you and the sale and the payment are the same event. Its defining feature for the customer is that **Buy Goods is free to the customer**, there is no transaction charge added to the buyer.

**Pay Bill (a business number plus an account).** The customer selects Pay Bill, enters your **business number**, then an **account number**, then the amount. That account field is the whole point: it is where the customer types their invoice number, account reference, house number, admission number, or phone number, so the payment arrives tagged with who it is from and what it is for. Pay Bill is built for **billing**: utilities, rent, schools, SACCOs, subscriptions, and any business that invoices and needs to match payments to accounts.

The one-line distinction: **Buy Goods is for a sale happening now, in front of you, with no reference needed. Pay Bill is for a payment against an account you need to identify.** Everything else, cost, settlement, reconciliation, flows from that difference.

---

### Part 2: Who Actually Pays the Charge

This is where businesses lose money quietly, because the charge structure differs between the two and is easy to misread.

- **Buy Goods (till):** free to the customer. The **merchant** pays a transaction fee, typically a small percentage of the amount with a cap per transaction. So the cost sits with you, the business, not the buyer.
- **Pay Bill:** the charging model varies by how the paybill is configured. On many paybills the **customer** pays a transaction charge (similar in shape to an M-Pesa withdrawal tariff); on others the **business absorbs** it so the customer pays nothing extra. You choose the model when you set it up, and it is a real customer-experience and cost decision.

Treat the merchant charge as what it is: a **cost of collection**, a line in your margin exactly like bank fees or card-processing fees. Over a month it adds up, and it belongs in the same fee audit as the rest of your transaction costs, the discipline in [the hidden-leak guide on fees and FX spreads](/blog/sme-transaction-fees-fx-spreads-kenya).

$$
\text{Cost of collection} = \frac{\text{Total M-Pesa merchant charges in the period}}{\text{Total collected in the period}} \times 100
$$

Run that percentage every month. If it is drifting up, either your ticket sizes have fallen (so the capped per-transaction fee is a bigger slice of each sale) or your mix has shifted, and it is worth a conversation with Safaricom about your tariff band, because business tariffs are negotiable at volume in the same way bank tariffs are. Exact fees and caps are set by Safaricom and change; treat any figure as *indicative and as at 2026* and confirm your current tariff on your own statement.

![Hands counting cash beside a card terminal](https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=1200 "Every collection carries a charge. On a till it is yours; on a paybill it may be the customer's or yours by choice. Either way it is a margin line, so measure it. Photo: Pexels")

---

### Part 3: Reconciliation, the Decision That Actually Matters

Cost is what businesses compare. Reconciliation is what they should compare, because it is where the two options genuinely diverge and where the hours are won or lost.

**Buy Goods gives you an amount and a time, and nothing else.** When ten customers pay KES 2,000 into your till in an afternoon, your statement shows ten payments of KES 2,000. Which was for which order? You are matching on memory, timing, and the customer's phone number, and at any real volume this becomes guesswork. For a counter business where each payment is settled face-to-face at the moment of sale, that is fine, the reconciliation happened in person. For anything invoiced or remote, it is a nightmare.

**Pay Bill gives you the account reference, and that changes everything.** Because the customer types their invoice or account number, each payment arrives already tagged. Ten customers paying KES 2,000 each show up as ten payments *against ten identifiable accounts*, and matching them to invoices is automatic rather than detective work. For any business that bills, rent, subscriptions, wholesale accounts, schools, services delivered before payment, this single field is worth more than a small difference in charges.

This is the real decision rule, and it is worth stating plainly:

- **Sale and payment are the same moment, in person?** Buy Goods. You do not need a reference because you reconciled at the counter.
- **You invoice, deliver first, sell remotely, or bill recurring accounts?** Pay Bill. The account reference is your reconciliation, and doing without it will cost you far more in hours than the charge ever will.

The reconciliation habit itself, matching every M-Pesa payment to an invoice and chasing the gaps, is part of the same weekly discipline as the [13-week cash forecast](/blog/13-week-cash-forecast-kenya-sme): you cannot forecast cash you cannot yet attribute.

---

### Part 4: How the Money Reaches Your Bank

Money paid into your till or paybill lands first in your **M-Pesa business (organization) account**, not directly in your bank. From there it settles to your linked bank account, and the *timing* of that settlement is a working-capital decision people rarely think about.

- Depending on your setup, funds settle to the bank **automatically on a schedule** (often daily) or **on demand** when you initiate a transfer.
- Money sitting in the M-Pesa business account is not earning anything and is exposed to your own withdrawal discipline, so a regular, automated sweep to the bank is usually the cleaner arrangement.
- If you also **pay suppliers or salaries** out, remember those go out on the rails covered in the [payment rails guide](/blog/how-to-move-money-kenya-payment-rails), from your bank via EFT, PesaLink, or RTGS, so getting collections into the bank promptly keeps the whole cycle on one clean ledger.

For a growing business, the aim is a boring, automatic flow: customers pay the till or paybill, funds sweep to the bank on a schedule, and payouts leave from the bank on the right rail. Manual movement between M-Pesa and bank is where errors and untracked cash creep in.

---

### Part 5: The Fake-Confirmation Scam

Every merchant who takes M-Pesa needs to internalise one rule, because breaking it is how businesses lose stock to fraud daily.

**A customer's M-Pesa confirmation message proves nothing. Your own confirmation is the only truth.**

The scam is simple and common: a customer shows you an SMS that looks exactly like an M-Pesa payment confirmation, or a screenshot of one, and asks you to release the goods. The message is fake, or edited, or a genuine confirmation for a payment that was reversed or sent to a different number. By the time you check your actual balance, the customer and the goods are gone.

The defence is absolute and costs nothing:

- **Release goods only against the confirmation that reaches your own account**, the SMS Safaricom sends *you*, or the balance you can see in your own till, not the customer's phone.
- For remote or high-value orders, **check the balance yourself** rather than trusting any forwarded message.
- Train every person who handles the till on this one rule, because the scam targets the busy, trusting moment at the counter.

This is the till-specific version of the payment-proof discipline that [the WhatsApp sales guide](/blog/whatsapp-sales-channel-kenya) sets out for remote selling: the proof is what *you* received, never what the customer *shows* you.

---

### Part 6: Your Till Is Now Visible to KRA

For years, informal businesses treated M-Pesa collections as invisible income. That assumption is now dangerous, and it is worth stating clearly.

As at 2026, tax administration in Kenya has moved decisively toward integrating mobile-money and till data with tax systems, alongside the [eTIMS electronic invoicing rollout](/blog/etims-kenya-sme-guide). The practical implication for any business is simple: **treat your till and paybill turnover as fully visible, and declare it.** The days of a Buy Goods till being a quiet, untaxed channel are ending, and building a business on the assumption that they are not is building on a fault line.

This connects your collection choice to your tax position in two ways:

- Your till turnover is the starting point for your [turnover tax or corporation tax](/blog/turnover-tax-vs-corporation-tax-kenya) position, and, above the threshold, your [VAT obligation](/blog/vat-for-smes-kenya). Clean, reconciled collection records are what make those returns accurate rather than a guess.
- A clean, declared M-Pesa trading history is also an **asset**, not just a liability. It is exactly the evidence trail a bank wants to see when you apply for a facility, the point made in [the new business banking journey](/blog/new-business-banking-journey-kenya): a well-run paybill with reconciled records is a lender's view into a real, bankable business.

The reframing worth making is that visible, well-kept collection records are not a tax trap to avoid but the foundation of a business that can borrow, plan, and scale. The businesses hurt by KRA's visibility are the ones who assumed invisibility; the ones who kept clean records were building an asset all along.

---

### Part 7: When to Graduate

Collection setups should grow with the business, and there is a natural ladder.

1. **A personal number.** Where most micro-businesses start, and where they should stop as soon as they are real, because mixing personal and business money destroys reconciliation and your bankable trail from day one.
2. **A Buy Goods till.** The right first business step for a counter business: free to customers, separates business money, gives you a business statement.
3. **A Pay Bill.** The step up for any business that invoices or bills recurring accounts, because the account reference is the reconciliation you will otherwise do by hand.
4. **Pay Bill plus integration.** At volume, connecting the paybill to your accounting or ERP system through Safaricom's Daraja API so that payments reconcile against invoices automatically and in real time. This is the move that turns collection from a daily chore into infrastructure, and it is the payments equivalent of the automation described in [the embedded-finance guide](/blog/embedded-finance-kenya-guide).

The trigger to move up a rung is always the same: when the current setup is costing you hours of reconciliation or blurring your records, the next rung pays for itself.

### Risk Factors

| Risk | How it arises | Consequence |
|---|---|---|
| Wrong option for the sale | Taking whatever the agent set up | Overpaying on charges or reconciling by guesswork |
| No account reference | Using a till for invoiced sales | Cannot match payments to customers or invoices |
| Fake confirmation | Trusting the customer's SMS or screenshot | Goods released for a payment that never landed |
| Uncontrolled charges | Never measuring cost of collection | Margin quietly eroded, especially on small tickets |
| Cash stranded in M-Pesa | No automatic sweep to bank | Idle funds, weaker records, exposure to withdrawal slippage |
| Assuming invisibility | Treating till income as untaxed | Exposure as KRA integrates mobile-money data |
| Personal-number trading | Business money on a personal line | No clean records, no bankable trail, mixed funds |

### Decision Framework: Pay Bill or Buy Goods?

**Do the sale and the payment happen at the same moment, in person?** If yes, Buy Goods is simpler and free to the customer. If the payment comes before or after delivery, or remotely, you need Pay Bill.

**Do I need to know which customer paid which invoice?** If yes, Pay Bill's account reference is non-negotiable, and worth more than any charge difference.

**Who should bear the charge, and have I measured it?** Decide deliberately whether the customer or the business absorbs the fee, and track your cost of collection as a monthly percentage.

**Does my collection sweep to the bank automatically?** Set up a regular settlement so money is not stranded in the M-Pesa business account.

**Are my collection records clean enough to declare and to bank on?** Reconciled till and paybill records are both your tax foundation and your facility application. Build them as an asset from the start.

### Bengula View

Three observations from the desk.

First, **the reconciliation difference is the whole decision, and almost no one is told this.** Businesses agonise over the charge and ignore the account reference, when the account reference is worth many times the charge for anyone who invoices. I have watched competent businesses lose entire afternoons every week trying to work out which of forty identical till payments was for which order, a problem that would not exist on a paybill. If you bill, use Pay Bill, and stop paying for the missing reference in hours instead of shillings.

Second, **the fake-confirmation scam is beaten by one rule that costs nothing, and it is still the commonest way small merchants lose stock.** The customer's screen is not evidence; your account is. Every business that takes M-Pesa should train every till operator on this before they train them on anything else, because the loss is immediate, total, and completely preventable. The busier and more trusting the counter, the more the scam works, so the rule has to be a reflex, not a policy in a drawer.

Third, **the shift to visibility is an opportunity dressed as a threat.** The instinct is to fear KRA seeing your till, but the businesses that kept clean, reconciled, declared collection records are precisely the ones that can now walk into a bank and get a facility, because they have a legible trading history. The paybill you set up to reconcile invoices is the same paybill that makes you bankable. Invisibility was never an asset; a clean record always was. Build the record, and both your tax position and your access to credit take care of themselves.

### Conclusion

Every Kenyan business gets paid through M-Pesa, but far too few choose *how* on purpose. Buy Goods is for the counter: free to the customer, simple, and reconciled in person. Pay Bill is for anyone who invoices: its account-reference field maps every payment to a customer automatically, and that is worth more than any charge difference. Decide on how you actually sell, measure your cost of collection as a margin line, sweep funds to the bank on a schedule, and never release goods against a customer's confirmation instead of your own.

And treat the whole thing as an asset. A well-chosen, well-reconciled, honestly-declared collection setup is not just how you get paid, it is your tax foundation and your evidence to a lender that the business is real. Set it up deliberately now, and it compounds into something you can plan and borrow on; leave it to whatever the shop configured, and you pay for that default every week for the life of the business.

### Related Reading

- [How to Move Money in Kenya: Payment Rails Compared](/blog/how-to-move-money-kenya-payment-rails) for the send side, and where M-Pesa sits among all the rails.
- [Selling on WhatsApp](/blog/whatsapp-sales-channel-kenya) for the payment-proof rules and the operating rhythm around collections.
- [The Hidden Leak: Fees and FX Spreads](/blog/sme-transaction-fees-fx-spreads-kenya) for auditing your cost of collection alongside every other transaction cost.
- [The 13-Week Cash Forecast](/blog/13-week-cash-forecast-kenya-sme) for turning reconciled collections into a forward cash view.
- [eTIMS and the SME](/blog/etims-kenya-sme-guide), [VAT for Kenyan SMEs](/blog/vat-for-smes-kenya), and [Turnover Tax vs Corporation Tax](/blog/turnover-tax-vs-corporation-tax-kenya) for the tax position your till turnover feeds.
- [The New Business Banking Journey](/blog/new-business-banking-journey-kenya) for how clean collection records become a bankable trail.
- [Embedded Finance in Kenya](/blog/embedded-finance-kenya-guide) for integrating payments into your systems as you scale.

### References

- [Safaricom M-Pesa for Business (Lipa na M-Pesa)](https://www.safaricom.co.ke/business/sme/m-pesa-for-business). Buy Goods (till) and Pay Bill products, merchant tariffs, settlement, and the M-Pesa business account. Charges and caps are set by Safaricom and change; confirm your current tariff on your statement.
- [Safaricom Daraja API](https://developer.safaricom.co.ke/). The developer platform for integrating Pay Bill and Buy Goods with accounting or ERP systems for automatic reconciliation.
- [Kenya Revenue Authority](https://www.kra.go.ke/). eTIMS electronic invoicing and the integration of business payment data with tax administration; confirm the current position, which changes with each Finance Act.
- [Central Bank of Kenya](https://www.centralbank.go.ke/). National Payments Strategy and mobile-money oversight.

*All charges, caps, settlement timings, and thresholds are indicative and stated as at 2026. They are set by Safaricom and the tax authority and change over time; confirm current figures on your own statement and with Safaricom or KRA before relying on them.*

*General business education, not individualized financial, tax, or legal advice. Tariffs, tax rules, and payment products change; verify current terms with Safaricom and KRA, and work with a qualified accountant on your tax position.*
