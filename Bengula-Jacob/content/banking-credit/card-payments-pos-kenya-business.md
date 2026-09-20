---
id: card-payments-pos-kenya-business
title: "Card Payments and POS for Kenyan Businesses: Terminals, Gateways, and Chargebacks"
summary: "In a country M-Pesa runs on, why would a business accept cards at all? Because some customers, tourists, corporates, online buyers, big-ticket spenders, only pay that way, and refusing the card means refusing the sale. But cards cost more than M-Pesa, settle slower, and carry a risk M-Pesa does not: the chargeback, where a completed sale is reversed out of your account weeks later. This guide covers how card acceptance works, what it really costs, and how to survive the disputes."
category: Fintech & Banking
date: August 2, 2026
readTime: 14 min read
author:
  name: Bengula Jacob
  role: Relationship Manager & Founder of Bengula Inc.
  avatar: /images/jacob.jpg
coverImage: https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=1600
---

![Hands at a card payment terminal beside cash](https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=1200 "In an M-Pesa economy, the card terminal earns its place by capturing the customer who would otherwise walk: the tourist, the corporate, the online buyer, the big-ticket spender. Photo: Pexels")

Kenya runs on M-Pesa. It is instant, near-universal, and, as [the M-Pesa for business guide](/blog/mpesa-for-business-paybill-till-kenya) shows, cheap to collect on. So a fair question for any business is: why bother accepting cards at all?

The answer is not that cards are better. They cost more than M-Pesa, they settle more slowly, and they carry a risk M-Pesa largely does not. The answer is **reach**: some customers pay only by card, and for those customers, refusing the card is refusing the sale. A tourist with a Visa and no M-Pesa line. A corporate buyer paying on a company card for the expense trail. An online shopper checking out from anywhere. A big-ticket purchase above the M-Pesa transaction limit. Turn those away and the lost sale costs far more than any card fee.

This guide is the card-and-POS piece of the payments cluster that sits alongside [the rails guide](/blog/how-to-move-money-kenya-payment-rails). It covers how card acceptance actually works, the terminal, the gateway, and the fees, what it truly costs against M-Pesa, why the money lands in your account days later rather than instantly, and the one card risk every merchant must understand before switching on a terminal: the **chargeback**, where a sale you thought was complete is reversed out of your account weeks later.

> **Key Insight:** Accept cards for the customer you would otherwise lose, not as a default. Cards cost more than M-Pesa (a percentage of every sale, not a capped fee), settle in days rather than instantly, and can be charged back long after the sale. Those are real costs, so the case for cards is never "they are cheaper", it is "this customer will not pay any other way". Where that customer exists, tourism, corporate, online, high-value, cards pay for themselves by existing. Where they do not, M-Pesa is the better default.

```cards
- icon: Globe
  title: Cards buy you reach
  desc: Tourists, corporate cards, online buyers, and purchases above the M-Pesa limit. Accept cards to capture the customer who cannot pay any other way.
- icon: Percent
  title: They cost more, and settle slower
  desc: A merchant fee on every card sale, higher than M-Pesa, and the money lands in your bank a day or more later, not instantly.
- icon: AlertTriangle
  title: Chargebacks reverse a done sale
  desc: A cardholder can dispute a payment and have it pulled back from you weeks later, plus a fee. Keep evidence; it is the card's distinctive risk.
  linkText: When money goes the wrong way
  linkUrl: /blog/recover-wrong-payment-fraud-kenya
  type: amber
```

---

### Part 1: How Card Acceptance Works

When a customer pays by card, more parties are involved than an M-Pesa payment, and understanding them explains the cost.

- **The acquirer** is the bank or fintech that lets you accept cards and pays the money into your account, Equity, KCB, Co-op, Absa, and others act as acquirers, as do specialist processors.
- **The card networks** (Visa, Mastercard, and others) carry the transaction between the customer's bank and yours.
- **The issuer** is the customer's own bank, which actually holds their money or credit.

For letting you accept the card and carrying the risk, you pay a **merchant service charge**, often called the **Merchant Discount Rate (MDR)**: a percentage taken from every card sale before the money reaches you. It bundles the network fees, the issuer's cut (interchange), and the acquirer's margin. Unlike M-Pesa's capped per-transaction fee, the MDR is a **percentage with no low cap**, which is why cards cost more on anything but the smallest tickets, and more still on international and premium cards.

That extra cost is not arbitrary. It pays for the network reach that lets a stranger's card work in your shop, and for the fraud and dispute machinery, including the chargeback system, that cards carry and M-Pesa does not.

---

### Part 2: Terminal, Gateway, or Phone

There are three ways to actually take a card, matched to how you sell.

**A physical POS terminal.** The card machine on the counter, for **in-person** sales: retail, restaurants, hotels, clinics. You get it from an acquiring bank or processor, and it takes chip-and-PIN and, increasingly, contactless tap. The right tool where the customer is physically present.

**An online payment gateway.** For **selling online**, a gateway, Pesapal, Flutterwave, DPO, iPay, Cellulant, Jenga, and others, lets your website or checkout accept cards (and usually M-Pesa) from anywhere. This is the card half of the [e-commerce checkout](/blog/ecommerce-storefront-conversion-launch), and integrating it well is part of the [embedded-finance](/blog/embedded-finance-kenya-guide) story. It matters for reach: an online business that takes only M-Pesa cannot sell to a customer abroad.

**SoftPOS (your phone as the terminal).** Newer tap-to-phone tools turn a smartphone into a contactless card reader, lowering the cost of entry for small and mobile merchants who want to take the occasional card without a dedicated machine.

Match the tool to the sale: a terminal for the counter, a gateway for online, softPOS for light or mobile card acceptance. Many businesses run more than one.

![A fan of credit cards on a surface](https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=1200 "A card works because a global network stands behind it. That reach is what you are paying the merchant fee for, and it is worth it precisely for the customer whose card is the only way they will pay. Photo: Pexels")

---

### Part 3: What Cards Really Cost, Against M-Pesa

Put a card sale next to an M-Pesa sale and the difference is clear.

On a **KES 5,000** counter sale:

| | M-Pesa Buy Goods | Card (illustrative MDR) |
|---|---|---|
| Who pays the fee | Merchant | Merchant |
| Fee shape | Small, capped per transaction | Percentage of the sale, no low cap |
| Illustrative cost | A few tens of shillings | ~KES 125 at a 2.5% MDR |
| Money reaches you | Near-instant | In a day or more (see Part 4) |

On that KES 5,000 sale, the card costs several times what M-Pesa does, and the money is slower. So on everyday, in-person, Kenyan-customer sales, **M-Pesa wins on cost, and it is not close.**

Now change the customer. A **tourist** with only a foreign Visa, a **corporate** paying on a company card, an **online buyer** abroad, or a **KES 400,000 purchase** that exceeds the M-Pesa per-transaction limit: for each of these, the alternative to accepting the card is not a cheaper M-Pesa sale, it is **no sale at all**. Against zero, a 2.5% fee is trivial.

That is the whole economics of cards in Kenya, and it dictates the decision: **cards are not for undercutting M-Pesa on your existing customers; they are for winning the customer M-Pesa cannot serve.** Price the MDR into those sales like any [cost of collection](/blog/sme-transaction-fees-fx-spreads-kenya), and judge cards on the revenue they unlock, not the fee they add.

---

### Part 4: Settlement, and the Wait for Your Money

M-Pesa lands in your business account almost instantly. Cards do not, and the gap is a working-capital fact worth planning for.

Card proceeds typically settle to your bank account on a **delay**, often the next business day or a couple of days later (commonly described as T+1 to T+3), after the acquirer has processed and netted off its fees. For a business used to instant M-Pesa, this means a slice of your takings is always **in transit** rather than spendable today.

Two consequences:

- **Your available cash is not your day's sales** if a chunk came by card; part is still settling. Build that into [your 13-week cash forecast](/blog/13-week-cash-forecast-kenya-sme) so you do not count money you cannot yet spend.
- **The settlement delay is also a small buffer against fraud and chargebacks**, because a disputed transaction can be caught before, or shortly after, it settles.

The delay is rarely a problem once you expect it. It becomes one only for a business that assumed card sales were as instantly available as M-Pesa and spent against money still in the pipe.

---

### Part 5: Chargebacks, the Card's Distinctive Risk

This is the part that surprises merchants new to cards, and the reason cards carry the cost they do. A **chargeback** is a reversal: the cardholder disputes a transaction with their own bank, and if the dispute stands, the money is **pulled back out of your account**, often weeks after the sale, usually with a chargeback fee on top.

Contrast this with M-Pesa, where a payment that reached your account is, for the merchant, largely final. Cards are the opposite: a completed, settled card sale can be undone later, and the burden is on **you** to prove the sale was legitimate.

Chargebacks arise from:

- **Fraud**, a stolen or cloned card used in your shop, where the real cardholder disputes a charge they never made.
- **"Goods or services not received"**, common in online and delivery sales.
- **"Not as described"**, disputes over quality or accuracy.
- **Friendly fraud**, a genuine customer disputing a charge they actually made, sometimes dishonestly.

Your defences are procedural, not technological:

- **Keep evidence of every card sale**: signed or PIN-verified receipts, delivery confirmation, communication with the customer. When a dispute comes, this is what you submit to contest it.
- **Use the security features**, chip-and-PIN and contactless verification in person, and address and card-security checks online, which shift liability in your favour and reduce fraud.
- **Be extra careful on high-value and card-not-present sales**, where fraud and disputes concentrate. Confirm delivery, keep records, and treat an unusually large or rushed card order the way you would treat any [payment red flag](/blog/recover-wrong-payment-fraud-kenya).

The mindset shift is real: on M-Pesa the money is yours once it lands; on cards it is yours *unless successfully disputed*, so the paperwork behind each sale is your protection.

---

### Part 6: Security and PCI Basics

Handling card data carries obligations, but modern tools do most of the heavy lifting for you.

- **Card data must be handled securely**, under the card industry's PCI-DSS standards. The practical point for most SMEs is to **use compliant terminals and reputable gateways** and to **never store raw card numbers yourself**; let the certified terminal or gateway handle the sensitive data, which keeps the bulk of the compliance burden off you.
- **Keep your acquirer and gateway accounts secured** like any other financial login, unique credentials, strong authentication, and restricted access, the same discipline as [bulk-payment controls](/blog/bulk-payments-payroll-payouts-kenya).
- **Train staff** not to write down card details and to follow the terminal's verification prompts.

The short version: choose compliant providers, do not touch raw card data, and secure your accounts. Do that and card acceptance is safe; try to shortcut it and you inherit risk the providers were built to carry.

### Risk Factors

| Risk | How it arises | Consequence |
|---|---|---|
| Treating cards as an M-Pesa substitute | Accepting cards for everyday local sales | Paying a percentage fee where a capped M-Pesa fee was cheaper |
| Chargebacks | Fraud, non-delivery, or disputes | A settled sale reversed weeks later, plus a fee |
| Spending money in transit | Counting card sales as instant cash | Overspending against takings still settling |
| Card fraud | Stolen or cloned cards, card-not-present | Chargebacks and losses on unverified sales |
| Weak evidence | No receipts or delivery proof | Losing disputes you could have won |
| PCI mishandling | Storing raw card data yourself | Compliance and breach exposure |
| No card option at all | Refusing cards on principle | Losing tourist, corporate, online, and big-ticket sales |

### Decision Framework: Should You Accept Cards?

**Do I have customers who pay only by card?** Tourists, corporates, online buyers, or purchases above the M-Pesa limit. If yes, the sale you capture justifies the fee. If no, M-Pesa is the cheaper default.

**In person, online, or both?** A terminal for the counter, a gateway for online, softPOS for light card acceptance. Match the tool to how you sell.

**Have I priced the MDR into those sales?** Treat the card fee as a cost of collection on the revenue it unlocks, not a tax on your whole turnover.

**Do I plan for settlement and chargebacks?** Expect card money a day or more later, and keep the evidence on every sale to contest disputes.

**Am I using compliant providers?** Reputable acquirer and gateway, no self-stored card data, secured accounts. Let the certified tools carry the compliance.

### Bengula View

Three observations from the desk.

First, **cards are a reach decision, not a cost decision, and the businesses that get this right add them narrowly and deliberately.** The mistake is either extreme: refusing cards on principle and quietly losing every tourist and corporate sale, or bolting on card acceptance and paying percentage fees on everyday local sales that M-Pesa handled for a fraction. The right posture is surgical: accept cards precisely where the customer would otherwise walk, and steer everyone else to M-Pesa. That is how you get the reach without the drag.

Second, **the chargeback is the concept that separates merchants who understand cards from those who just switched on a terminal.** On M-Pesa, once the money lands it is yours, so merchants develop a "payment received equals sale complete" reflex. Cards break that reflex: a sale can be reversed weeks later, and the evidence you kept, or did not, decides whether you keep the money. Any business taking cards, especially online or high-value, needs to treat receipts, verification, and delivery proof as the asset they are, because a dispute is not a question of whether you were paid, but of whether you can prove you should keep it.

Third, **the settlement delay is a small thing that trips up businesses moving from M-Pesa.** After years of instant mobile money, a day or two of card settlement feels like a glitch, and owners spend against sales that have not landed. It is not a glitch, it is how cards work, and once you expect it and forecast around it, it is a non-issue, and even a mild protection. Plan for your money to arrive on the card network's schedule, not M-Pesa's, and the whole thing runs smoothly.

### Conclusion

In an M-Pesa economy, cards earn their place not by being cheaper, they are not, but by capturing the customer who cannot or will not pay any other way: the tourist, the corporate, the online buyer, the big-ticket spender. For those sales, a merchant fee is trivial against losing the sale entirely; for everyday local sales, M-Pesa remains the cheaper default.

Accept cards deliberately and narrowly. Match the tool to how you sell, price the merchant fee into the revenue it unlocks, plan for the money to settle a day or more later, and, above all, respect the chargeback: keep the evidence on every sale, use the security features, and remember that card money is yours unless it is successfully disputed. Do that, and cards become what they should be, a way to say yes to a customer you would otherwise have turned away, at a cost that customer more than covers.

### Related Reading

- [How to Move Money in Kenya: Payment Rails Compared](/blog/how-to-move-money-kenya-payment-rails) for where cards sit among all the ways to be paid.
- [M-Pesa for Business: Pay Bill vs Buy Goods](/blog/mpesa-for-business-paybill-till-kenya) for the cheaper default rail for local sales.
- [The Hidden Leak: Fees and FX Spreads](/blog/sme-transaction-fees-fx-spreads-kenya) for treating the MDR as a managed cost of collection.
- [E-commerce Storefront and Conversion](/blog/ecommerce-storefront-conversion-launch) and [Embedded Finance in Kenya](/blog/embedded-finance-kenya-guide) for taking cards online.
- [If You Send Money to the Wrong Person](/blog/recover-wrong-payment-fraud-kenya) for the wider payment-fraud picture behind card disputes.
- [The Credit Card Interest-Free Period](/blog/credit-card-interest-free-period) for the customer's side of the card you are accepting.

### References

- [Central Bank of Kenya](https://www.centralbank.go.ke/). National payment system oversight, including card and merchant-acquiring regulation.
- [Visa](https://www.visa.co.ke/) and [Mastercard](https://www.mastercard.co.ke/). Card network rules, interchange, and chargeback (dispute) processes.
- [PCI Security Standards Council](https://www.pcisecuritystandards.org/). The PCI-DSS data-security standards for handling card payments.
- [Safaricom M-Pesa for Business](https://www.safaricom.co.ke/business/sme/m-pesa-for-business). The mobile-money alternative for local collections and its cost comparison.

*All fees, settlement timings, and MDR figures are illustrative and stated as at 2026. Merchant rates, settlement cycles, and terms are set by each acquirer, gateway, and card network and vary widely; confirm your actual pricing and dispute terms with your provider before relying on them.*

*General business education, not individualized financial, security, or compliance advice. Card acceptance carries PCI-DSS and contractual obligations; confirm current requirements with your acquirer and a qualified adviser.*
