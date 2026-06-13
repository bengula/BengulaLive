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
  HelpCircle,
} from 'lucide-react';
import { allInsights } from '../data/insights';
import { renderInlineMarkdown } from '../utils/markdownText';

const insightIcons: Record<string, React.ElementType> = {
  Landmark,
  Percent,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Sprout,
};

export default function InsightDeck() {
  // `order` holds indices into allInsights; order[0] is the visible top card.
  const [order, setOrder] = useState(() => allInsights.map((_, i) => i));
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
          const insight = allInsights[cardIndex];
          const Icon = insightIcons[insight.iconName] || HelpCircle;
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
                    {renderInlineMarkdown(insight.body, "font-bold text-[#241f14]")}
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
