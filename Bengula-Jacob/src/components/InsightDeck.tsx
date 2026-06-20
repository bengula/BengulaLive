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
import { renderInlineMarkdown, MarkdownContent } from '../utils/markdownText';

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
  const [shuffleState, setShuffleState] = useState<'idle' | 'flying-out' | 'flying-in'>('idle');
  const [shufflingCardIndex, setShufflingCardIndex] = useState<number | null>(null);

  const advance = () => {
    if (animating || shuffleState !== 'idle') return;

    // First tap: flip the top card to reveal the insight.
    if (!flipped) {
      setFlipped(true);
      return;
    }

    // Second tap: flip back, slide out to side, shift order, slide in to bottom of deck.
    setFlipped(false);
    setShuffleState('flying-out');
    setShufflingCardIndex(order[0]);
    setAnimating(true);

    // Wait for the fly-out flip-back phase (400ms is the peak when the card is in the air)
    window.setTimeout(() => {
      // Put the current top card at the bottom of the stack
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setShuffleState('flying-in');

      // Wait for the slide-in phase to settle
      window.setTimeout(() => {
        setShuffleState('idle');
        setShufflingCardIndex(null);
        setAnimating(false);
      }, 400);
    }, 400);
  };

  const total = order.length;
  const stackRotations = [0, -1.8, 1.2, -0.8, 1.5];

  return (
    <div className="flex w-full max-w-[40rem] flex-col items-center gap-5">
      <div className="deck relative w-full pb-14">
        {order.map((cardIndex, depth) => {
          const insight = allInsights[cardIndex];
          const Icon = insightIcons[insight.iconName] || HelpCircle;
          const isTop = depth === 0;

          const isShufflingOut = shuffleState === 'flying-out' && cardIndex === shufflingCardIndex;
          const isShufflingIn = shuffleState === 'flying-in' && cardIndex === shufflingCardIndex;

          const cardClass = `deck-card ${isTop ? 'is-top' : ''} ${
            isTop && flipped ? 'is-flipped' : ''
          } ${isShufflingOut ? 'is-shuffling-out' : ''} ${
            isShufflingIn ? 'is-shuffling-in' : ''
          }`;

          return (
            <div
              key={cardIndex}
              className={cardClass}
              style={{
                transform: `translateY(${depth * 16}px) scale(${1 - depth * 0.05}) rotate(${
                  stackRotations[depth] || 0
                }deg)`,
                zIndex: total - depth,
                opacity: depth > 3 ? 0 : 1,
                pointerEvents: isTop && shuffleState === 'idle' ? 'auto' : 'none',
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
                    {/* Glowing gold foil sheen overlay on hover */}
                    <div className="card-back-panel-sheen" />
                    <div className="card-back-medallion">
                      <div className="card-back-disc">
                        <img
                          src="/images/WhiteBengulaIncLogo.png"
                          alt=""
                          className="card-back-logo"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revealed side — the insight, set like a page from an old book. */}
                <div className="deck-face deck-face-back book-page font-charter flex flex-col gap-4 p-5 sm:p-8 md:p-10">
                  <span className="book-page-tag">{insight.tag}</span>
                  <h4 className="text-center text-xl sm:text-2xl md:text-[1.75rem] font-bold leading-snug text-[#241f14]">
                    {insight.title}
                  </h4>
                  <div className="book-page-body text-sm sm:text-[15px] md:text-base leading-relaxed animate-fadeIn">
                    <MarkdownContent
                      content={insight.body}
                      components={{
                        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-bold text-[#241f14]">{children}</strong>,
                      }}
                    />
                  </div>
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
