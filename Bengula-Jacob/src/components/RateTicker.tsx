/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Scrolling market ticker.
 *  • FX (USD/KES, EUR/KES, GBP/KES, …) comes from official Central Bank of
 *    Kenya indicative rates in src/data/exchangeRates.ts. Refresh them daily:
 *    download the CBK CSV, run `npm run update-rates`, then commit + push.
 *  • Kenyan local-market rates come from siteConfig.marketRates (editable).
 */

import React from 'react';
import { siteConfig } from '../data/siteConfig';
import { exchangeRates } from '../data/exchangeRates';

export default function RateTicker() {
  // One full pass of the ticker content (rendered twice for a seamless loop).
  const Run = () => (
    <div className="flex gap-8 items-center pr-8 shrink-0">
      <span className="text-amber-400 font-bold">🇰🇪 Sovereign Rates Ticker</span>
      <span className="text-slate-500">•</span>

      {exchangeRates.rates.map((f) => (
        <span key={f.label} className="flex items-center gap-1.5">
          {f.label}: <strong className="text-emerald-400">{f.value}</strong>
        </span>
      ))}

      {siteConfig.marketRates.items.map((it, i) => (
        <React.Fragment key={i}>
          <span className="text-slate-500">•</span>
          <span>
            {it.label}:{' '}
            <strong className={it.tone === 'amber' ? 'text-amber-400' : 'text-emerald-400'}>
              {it.value}
            </strong>
          </span>
        </React.Fragment>
      ))}
      <span className="text-slate-500">•</span>
      <span className="text-slate-400">Local rates as of {siteConfig.marketRates.asOf}</span>
    </div>
  );

  return (
    <div className="bg-blue-950 py-1.5 pl-4 overflow-hidden relative text-[10px] text-blue-100 font-mono border-b border-blue-900/40">
      <div className="flex w-max animate-marquee">
        <Run />
        <Run />
      </div>

      {/* Source / freshness badge (masks the scroll on the right edge) */}
      <div className="hidden sm:flex absolute right-0 top-0 h-full items-center pl-6 pr-4 bg-gradient-to-l from-blue-950 via-blue-950 to-transparent">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="text-emerald-300">CBK · {exchangeRates.asOf}</span>
        </span>
      </div>
    </div>
  );
}
