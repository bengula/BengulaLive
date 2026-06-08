/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Card-stack flip deck — tap the top card to flip it and read the insight,
 * tap again to send it to the bottom of the deck and reveal the next one.
 * (3D flip + shuffle effect, after Madison Dickson's "card stack flip".)
 */

import React, { useState } from 'react';
import {
  Landmark,
  Percent,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Sprout,
  RotateCw,
} from 'lucide-react';

type Insight = {
  tag: string;
  title: string;
  body: string;
  icon: React.ElementType;
};

const INSIGHTS: Insight[] = [
  {
    tag: 'Sovereign Debt',
    title: 'Infrastructure bonds pay tax-free',
    body: 'Unlike most treasury bonds, CBK infrastructure bonds are exempt from the 10–15% withholding tax — so their coupon is effectively a higher real yield than the headline suggests.',
    icon: Landmark,
  },
  {
    tag: 'Borrowing',
    title: 'APR is not the interest rate',
    body: 'The APR folds in negotiation fees, service charges, excise duty and credit-life insurance. Two loans at the same 13% rate can have very different true costs — always compare APR.',
    icon: Percent,
  },
  {
    tag: 'Saving',
    title: 'MMFs compound the boring way',
    body: 'A Kenyan money-market fund yielding ~13% with daily compounding quietly outpaces most "high-return" schemes — because consistency, not excitement, is what builds the balance.',
    icon: PiggyBank,
  },
  {
    tag: 'Access',
    title: 'You can open a CDS online',
    body: 'DhowCSD lets you open a Central Bank CDS account and bid for T-bills and bonds straight from your phone — no broker, minimum bids from KSh 50,000.',
    icon: ShieldCheck,
  },
  {
    tag: 'Strategy',
    title: 'Ladder your tenors',
    body: 'Splitting capital across 91-day, 1-year and longer instruments keeps cash maturing regularly while still capturing the higher yields further out the curve.',
    icon: TrendingUp,
  },
  {
    tag: 'Mindset',
    title: "You can't save your way out of poverty",
    body: 'Saving protects what you already earn; it rarely multiplies it. Lasting wealth comes from growing your income and putting capital to work — a business, investments, yield-bearing assets — not from cutting expenses alone.',
    icon: Sprout,
  },
];

export default function InsightDeck() {
  // `order` holds indices into INSIGHTS; order[0] is the visible top card.
  const [order, setOrder] = useState(() => INSIGHTS.map((_, i) => i));
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);

  const advance = () => {
    if (animating) return;

    // First tap: flip the top card to reveal the insight.
    if (!flipped) {
      setFlipped(true);
      return;
    }

    // Second tap: flip back, then shuffle this card to the bottom.
    setFlipped(false);
    setAnimating(true);
    window.setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setAnimating(false);
    }, 650);
  };

  const total = order.length;

  return (
    <div className="flex w-full max-w-[34rem] flex-col items-center gap-5">
      <div className="deck relative w-full pb-14">
        {order.map((cardIndex, depth) => {
          const insight = INSIGHTS[cardIndex];
          const Icon = insight.icon;
          const isTop = depth === 0;

          return (
            <div
              key={cardIndex}
              className={`deck-card ${isTop ? 'is-top' : ''} ${
                isTop && flipped ? 'is-flipped' : ''
              }`}
              style={{
                transform: `translateY(${depth * 16}px) scale(${1 - depth * 0.05})`,
                zIndex: total - depth,
                opacity: depth > 3 ? 0 : 1,
                pointerEvents: isTop ? 'auto' : 'none',
              }}
              onClick={isTop ? advance : undefined}
              onKeyDown={
                isTop
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        advance();
                      }
                    }
                  : undefined
              }
              role={isTop ? 'button' : undefined}
              tabIndex={isTop ? 0 : -1}
              aria-label={
                isTop
                  ? flipped
                    ? `${insight.title}. Tap to shuffle to the next insight.`
                    : `Insight: ${insight.tag}. Tap to reveal.`
                  : undefined
              }
            >
              <div className="deck-card-inner">
                {/* Front face — the prompt. */}
                <div className="deck-face flex flex-col justify-between bg-white/95 border border-white/80 p-7 md:p-8 shadow-2xl shadow-violet-900/20 ring-1 ring-violet-100">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-700 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white">
                      {insight.tag}
                    </span>
                    <span className="bg-violet-50 text-violet-700 border border-violet-100 p-2.5 rounded-xl">
                      <Icon className="w-6 h-6" />
                    </span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-slate-950">
                    {insight.title}
                  </h4>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-violet-700">
                    <RotateCw className="w-4 h-4" />
                    Tap to reveal
                  </span>
                </div>

                {/* Back face — the explanation. */}
                <div className="deck-face deck-face-back flex flex-col justify-between bg-gradient-to-br from-violet-950 via-violet-900 to-slate-950 p-7 md:p-8 text-white shadow-2xl shadow-violet-900/40 ring-1 ring-violet-300/20">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-violet-200">
                    {insight.tag}
                  </span>
                  <p className="text-base sm:text-lg leading-relaxed text-violet-50 font-medium">
                    {insight.body}
                  </p>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <RotateCw className="w-4 h-4" />
                    Tap to shuffle next
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {order.map((cardIndex, depth) => (
          <span
            key={cardIndex}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              depth === 0 ? 'w-5 bg-violet-700' : 'w-1.5 bg-violet-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
