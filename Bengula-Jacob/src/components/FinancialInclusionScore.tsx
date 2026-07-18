/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Interactive Financial Inclusion Score for Kenyan households/SMEs.
 * Ten equally weighted binary checks → 0–100. Educational only.
 */

import React, { useMemo, useState } from 'react';
import { Gauge, RotateCcw, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type CheckItem = {
  id: string;
  label: string;
  hint: string;
  link?: { to: string; text: string };
};

const CHECKS: CheckItem[] = [
  {
    id: 'wallet',
    label: 'I can send and receive money on mobile money or a digital wallet',
    hint: 'Payments access is the first inclusion rail in Kenya.',
    link: { to: '/blog/what-is-a-cashless-economy', text: 'Cashless economy' },
  },
  {
    id: 'account',
    label: 'I have a bank account, microfinance account, or deposit-taking SACCO membership',
    hint: 'A formal store of value beyond the wallet float.',
    link: { to: '/blog/ultimate-guide-to-banking-in-kenya', text: 'Banking guide' },
  },
  {
    id: 'buffer',
    label: 'I keep at least one month of essential expenses in a liquid buffer (e.g. MMF)',
    hint: 'Access without a buffer is fragile inclusion.',
    link: { to: '/blog/bank-vs-sacco-vs-mmf-savings', text: 'Where to park savings' },
  },
  {
    id: 'no_roll',
    label: 'I am not rolling digital/mobile loans month after month',
    hint: 'Rolled app debt often prices at triple-digit effective rates.',
    link: { to: '/blog/mobile-digital-loans-real-cost-kenya', text: 'Real cost of digital loans' },
  },
  {
    id: 'crb',
    label: 'I have checked my CRB report in the last 12 months (or know I have a clean file)',
    hint: 'Your file prices every future regulated loan.',
    link: { to: '/blog/credit-score-kenya-guide', text: 'Credit score guide' },
  },
  {
    id: 'cheap_credit',
    label: 'I have a path to cheaper structural credit (SACCO, bank, employer scheme) if I need it',
    hint: 'Inclusion deepens when credit is available at survivable cost.',
    link: { to: '/blog/borrowing-money-in-kenya-guide', text: 'Borrowing map' },
  },
  {
    id: 'protect',
    label: 'I have basic protection (medical cover and/or term life if others depend on me)',
    hint: 'One uninsured shock can force expensive debt.',
    link: { to: '/blog/insurance-stack-kenya-life-stages', text: 'Insurance stack' },
  },
  {
    id: 'save',
    label: 'I save regularly beyond day-to-day float (SACCO deposits, MMF, standing order)',
    hint: 'Usage of savings products, not only payments.',
    link: { to: '/blog/future-mmfs-kenya', text: 'MMF deep dive' },
  },
  {
    id: 'invest',
    label: 'I have at least one longer-horizon product (pension, bonds, unit trust, shares)',
    hint: 'Depth: money that is meant to grow for years.',
    link: { to: '/blog/ultimate-guide-to-investing-in-kenya', text: 'Investing guide' },
  },
  {
    id: 'system',
    label: 'I run a simple system (budget / separate business money / written goals)',
    hint: 'Agency turns products into a financial system.',
    link: { to: '/blog/ultimate-guide-to-personal-finance-kenya', text: 'Personal finance' },
  },
];

function bandFor(score: number): {
  label: string;
  tone: string;
  bar: string;
  summary: string;
} {
  if (score <= 30) {
    return {
      label: 'Fragile access',
      tone: 'text-rose-700 bg-rose-50 border-rose-100',
      bar: 'bg-rose-500',
      summary:
        'You may have a wallet or none at all, but shocks still force expensive debt. Start with rails, a tiny buffer, and CRB hygiene.',
    };
  }
  if (score <= 50) {
    return {
      label: 'Access only',
      tone: 'text-amber-800 bg-amber-50 border-amber-100',
      bar: 'bg-amber-500',
      summary:
        'You can move money, but savings, protection, and cheap credit are thin. Build the emergency sleeve before more products.',
    };
  }
  if (score <= 70) {
    return {
      label: 'Active user',
      tone: 'text-violet-800 bg-violet-50 border-violet-100',
      bar: 'bg-violet-600',
      summary:
        'You use formal tools regularly. Focus on cost of credit, guarantor risk, and converting app habits into structural facilities.',
    };
  }
  if (score <= 85) {
    return {
      label: 'Quality inclusion',
      tone: 'text-emerald-800 bg-emerald-50 border-emerald-100',
      bar: 'bg-emerald-600',
      summary:
        'Access, usage, and resilience are working together. Deepen investing and insurance; keep digital credit as a rare tool.',
    };
  }
  return {
    label: 'Deep inclusion',
    tone: 'text-slate-900 bg-slate-100 border-slate-200',
    bar: 'bg-slate-900',
    summary:
      'You operate a full system: rails, buffer, clean credit identity, protection, and growth. Review annually and help others climb.',
  };
}

export default function FinancialInclusionScore() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CHECKS.map((c) => [c.id, false]))
  );

  const score = useMemo(
    () => CHECKS.reduce((sum, c) => sum + (checked[c.id] ? 10 : 0), 0),
    [checked]
  );

  const answered = useMemo(
    () => CHECKS.filter((c) => checked[c.id]).length,
    [checked]
  );

  const band = bandFor(score);
  const nextGaps = CHECKS.filter((c) => !checked[c.id]).slice(0, 3);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const reset = () => {
    setChecked(Object.fromEntries(CHECKS.map((c) => [c.id, false])));
  };

  return (
    <div
      id="financial-inclusion-score"
      className="not-prose my-8 rounded-2xl border border-violet-100 bg-white shadow-sm overflow-hidden"
    >
      <div className="border-b border-violet-100 bg-violet-50/70 px-5 py-4 md:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-violet-700">
              Interactive tool
            </p>
            <h3 className="mt-1 flex items-center gap-2 text-xl font-black tracking-tight text-slate-950">
              <Gauge className="h-5 w-5 text-violet-800" />
              Financial Inclusion Score
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-600">
              Tick every statement that is true for you today. Each item is worth 10 points (max 100).
              This is an educational self-check, not a credit score or CRB product.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600 shadow-xs hover:bg-slate-50 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-5">
        <ul className="lg:col-span-3 divide-y divide-slate-100">
          {CHECKS.map((item, i) => {
            const on = checked[item.id];
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className={`flex w-full items-start gap-3 px-5 py-3.5 text-left transition cursor-pointer md:px-6 ${
                    on ? 'bg-emerald-50/40' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">
                    {on ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 space-y-0.5">
                    <span className="flex items-start gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-400 pt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 leading-snug">
                        {item.label}
                      </span>
                    </span>
                    <span className="block pl-7 text-[11px] text-slate-500 leading-relaxed">
                      {item.hint}
                      {item.link && (
                        <>
                          {' '}
                          <Link
                            to={item.link.to}
                            onClick={(e) => e.stopPropagation()}
                            className="font-bold text-violet-800 hover:underline"
                          >
                            {item.link.text} →
                          </Link>
                        </>
                      )}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[10px] font-bold text-slate-400">
                    +10
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-violet-100 bg-slate-50/60 p-5 md:p-6 space-y-5">
          <div className="text-center space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Your score
            </p>
            <p className="font-mono text-5xl font-black text-violet-800 tabular-nums">{score}</p>
            <p className="text-xs text-slate-500">
              {answered} of {CHECKS.length} items ticked · out of 100
            </p>
            <div className="mx-auto h-2.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-300 ${band.bar}`}
                style={{ width: `${score}%` }}
              />
            </div>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold ${band.tone}`}
            >
              {band.label}
            </span>
          </div>

          <p className="text-xs leading-relaxed text-slate-600">{band.summary}</p>

          {nextGaps.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Next upgrades
              </p>
              <ul className="space-y-2">
                {nextGaps.map((g) => (
                  <li
                    key={g.id}
                    className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700"
                  >
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-700" />
                    <span>
                      {g.label}
                      {g.link && (
                        <>
                          {' '}
                          <Link to={g.link.to} className="font-bold text-violet-800 hover:underline">
                            Guide
                          </Link>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {score === 100 && (
            <p className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-[11px] leading-relaxed text-emerald-900">
              Full marks on this checklist. Re-score after any job change, new business line, or debt
              clean-up, and keep reviewing product costs yearly.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
