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
    title: 'Infrastructure Bonds Pay Tax-Free',
    body: 'Unlike most treasury bonds, CBK infrastructure bonds are exempt from the 10–15% withholding tax — so their coupon is effectively a higher real yield than the headline suggests.',
    icon: Landmark,
  },
  {
    tag: 'Borrowing',
    title: 'APR Is Not the Interest Rate',
    body: 'The APR folds in negotiation fees, service charges, excise duty and credit-life insurance. Two loans at the same 13% rate can have very different true costs — always compare APR.',
    icon: Percent,
  },
  {
    tag: 'Saving',
    title: 'MMFs Compound the Boring Way',
    body: 'A Kenyan money-market fund yielding ~13% with daily compounding quietly outpaces most "high-return" schemes — because consistency, not excitement, is what builds the balance.',
    icon: PiggyBank,
  },
  {
    tag: 'Access',
    title: 'You Can Open a CDS Online',
    body: 'DhowCSD lets you open a Central Bank CDS account and bid for T-bills and bonds straight from your phone — no broker, minimum bids from KSh 50,000.',
    icon: ShieldCheck,
  },
  {
    tag: 'Strategy',
    title: 'Ladder Your Tenors',
    body: 'Splitting capital across 91-day, 1-year and longer instruments keeps cash maturing regularly while still capturing the higher yields further out the curve.',
    icon: TrendingUp,
  },
  {
    tag: 'Mindset',
    title: "You Can't Save Your Way Out of Poverty",
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
                {/* Face-down side — an ordinary playing-card back. */}
                <div className="deck-face card-back" aria-hidden="true">
                  <div className="card-back-panel">
                    <div className="card-back-medallion">
                      <span className="font-charter">B</span>
                    </div>
                  </div>
                </div>

                {/* Revealed side — the insight, set like a page from an old book. */}
                <div className="deck-face deck-face-back book-page font-charter flex flex-col gap-4 p-8 md:p-10">
                  <span className="book-page-tag">{insight.tag}</span>
                  <h4 className="text-center text-2xl sm:text-[1.75rem] font-bold leading-snug text-[#241f14]">
                    {insight.title}
                  </h4>
                  <p className="book-page-body text-[15px] sm:text-base leading-relaxed">
                    {insight.body}
                  </p>
                  <span className="mt-auto flex flex-col items-center gap-1 pt-1">
                    <Icon className="h-4 w-4 text-[#9a7434]" aria-hidden="true" />
                    <span className="text-xs italic text-[#9a7434]">
                      Tap to shuffle to the next card
                    </span>
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
