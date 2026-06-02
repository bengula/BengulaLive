/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Scrolling market ticker.
 *  • FX (USD/KES, EUR/KES, GBP/KES) is fetched LIVE from a free, no-key,
 *    CORS-enabled API (open.er-api.com) — works on a static host.
 *  • Kenyan local-market rates come from siteConfig.marketRates (editable),
 *    since there's no free browser-accessible API for those.
 *  • If the fetch fails (offline), it silently falls back to indicative FX.
 */

import React, { useEffect, useState } from 'react';
import { siteConfig } from '../data/siteConfig';

interface Fx {
  pair: string;
  value: string;
}

const FX_FALLBACK: Fx[] = [
  { pair: 'USD/KES', value: '129.50' },
  { pair: 'EUR/KES', value: '140.20' },
  { pair: 'GBP/KES', value: '164.80' },
];

const REFRESH_MS = 5 * 60 * 1000; // 5 minutes

export default function RateTicker() {
  const [fx, setFx] = useState<Fx[]>(FX_FALLBACK);
  const [live, setLive] = useState(false);
  const [updated, setUpdated] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        const r = data?.rates;
        if (r?.KES && r?.EUR && r?.GBP) {
          const usdKes: number = r.KES;
          const next: Fx[] = [
            { pair: 'USD/KES', value: usdKes.toFixed(2) },
            { pair: 'EUR/KES', value: (usdKes / r.EUR).toFixed(2) },
            { pair: 'GBP/KES', value: (usdKes / r.GBP).toFixed(2) },
          ];
          if (!cancelled) {
            setFx(next);
            setLive(true);
            setUpdated(new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' }));
          }
        }
      } catch {
        /* keep indicative fallback */
      }
    };

    load();
    const timer = window.setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  // One full pass of the ticker content (rendered twice for a seamless loop).
  const Run = () => (
    <div className="flex gap-8 items-center pr-8 shrink-0">
      <span className="text-amber-400 font-bold">🇰🇪 Sovereign Rates Ticker</span>
      <span className="text-slate-500">•</span>

      {fx.map((f) => (
        <span key={f.pair} className="flex items-center gap-1.5">
          {f.pair}: <strong className="text-emerald-400">{f.value}</strong>
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

      {/* Live / indicative status badge (masks the scroll on the right edge) */}
      <div className="hidden sm:flex absolute right-0 top-0 h-full items-center pl-6 pr-4 bg-gradient-to-l from-blue-950 via-blue-950 to-transparent">
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${live ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
          <span className={live ? 'text-emerald-300' : 'text-amber-300'}>
            {live ? `FX LIVE · ${updated}` : 'FX indicative'}
          </span>
        </span>
      </div>
    </div>
  );
}
