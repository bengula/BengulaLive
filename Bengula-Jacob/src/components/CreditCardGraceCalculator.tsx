/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Credit Card Interest-Free (Grace) Period Calculator.
 *
 * A card's headline "up to 50 days interest-free" is the MAXIMUM grace, earned
 * only by a purchase made on the first day of a statement cycle. This tool shows
 * the interest-free days a specific purchase actually earns:
 *
 *   interest-free days = (statement closing date - purchase date) + grace days
 *
 * and where it sits between the minimum (grace only) and the card's maximum
 * (cycle length + grace). Interest-free applies only if the full statement
 * balance is paid by the due date.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { CreditCard, CalendarDays, Info } from 'lucide-react';

const DAY = 86_400_000;

const parseDate = (iso: string): Date | null => {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const addDays = (date: Date, days: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const fmt = (date: Date): string =>
  date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export default function CreditCardGraceCalculator() {
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [statementDay, setStatementDay] = useState<number>(1);
  const [graceDays, setGraceDays] = useState<number>(21);

  // Default the purchase date to "today" on the client to avoid an SSR mismatch.
  useEffect(() => {
    const t = new Date();
    const iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
    setPurchaseDate(iso);
  }, []);

  const result = useMemo(() => {
    const purchase = parseDate(purchaseDate);
    if (!purchase) return null;
    const sDay = clamp(Math.round(statementDay) || 1, 1, 28);
    const grace = clamp(Math.round(graceDays) || 0, 0, 60);

    // First statement closing date on/after the purchase date.
    let statementClose = new Date(purchase.getFullYear(), purchase.getMonth(), sDay);
    if (statementClose.getTime() < purchase.getTime()) {
      statementClose = new Date(purchase.getFullYear(), purchase.getMonth() + 1, sDay);
    }
    const prevStatement = new Date(statementClose.getFullYear(), statementClose.getMonth() - 1, sDay);
    const dueDate = addDays(statementClose, grace);

    const cycleLen = Math.round((statementClose.getTime() - prevStatement.getTime()) / DAY);
    const interestFree = Math.round((dueDate.getTime() - purchase.getTime()) / DAY);
    const maxFree = cycleLen + grace;
    const minFree = grace;
    const pct = maxFree > minFree ? clamp(((interestFree - minFree) / (maxFree - minFree)) * 100, 0, 100) : 100;

    return { statementClose, dueDate, interestFree, maxFree, minFree, cycleLen, pct };
  }, [purchaseDate, statementDay, graceDays]);

  return (
    <div className="rounded-2xl border border-violet-100 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-violet-100 bg-violet-50/70 px-5 py-4 md:px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-violet-700">Card Cost Tool</p>
            <h3 className="mt-1 flex items-center gap-2 text-xl font-black tracking-tight text-slate-950">
              <CreditCard className="h-5 w-5 text-violet-800" />
              Interest-Free Period Calculator
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-600">
              See how many interest-free days a purchase actually earns on a card that advertises "up to 50 days".
            </p>
          </div>
          <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-800">
            Grace period
          </span>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3 md:p-6">
        <label className="space-y-1.5">
          <span className="block text-[11px] font-bold text-slate-700">Purchase date</span>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-violet-700 focus:outline-none focus:ring-1 focus:ring-violet-700"
          />
        </label>
        <label className="space-y-1.5">
          <span className="block text-[11px] font-bold text-slate-700">Statement closing day of month</span>
          <input
            type="number"
            min={1}
            max={28}
            value={statementDay}
            onChange={(e) => setStatementDay(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-violet-700 focus:outline-none focus:ring-1 focus:ring-violet-700"
          />
          <span className="block text-[10px] text-slate-400">The day your statement is generated (1–28).</span>
        </label>
        <label className="space-y-1.5">
          <span className="block text-[11px] font-bold text-slate-700">Days until payment due</span>
          <input
            type="number"
            min={0}
            max={60}
            value={graceDays}
            onChange={(e) => setGraceDays(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-violet-700 focus:outline-none focus:ring-1 focus:ring-violet-700"
          />
          <span className="block text-[10px] text-slate-400">Grace period after the statement date (often ~21).</span>
        </label>
      </div>

      {/* Result */}
      {result && (
        <div className="border-t border-violet-100 bg-slate-50/70 px-5 py-5 md:px-6">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Interest-free days for this purchase
            </span>
            <span className="font-mono text-4xl font-black text-violet-800">{result.interestFree}</span>
            <span className="text-xs text-slate-500">
              Statement date <strong className="text-slate-700">{fmt(result.statementClose)}</strong>, pay in full by{' '}
              <strong className="text-slate-700">{fmt(result.dueDate)}</strong>
            </span>
          </div>

          {/* Scale: where this purchase sits between minimum and maximum grace */}
          <div className="mt-5">
            <div className="relative h-2.5 w-full rounded-full bg-gradient-to-r from-rose-200 via-amber-200 to-emerald-300">
              <div
                className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-violet-700 shadow"
                style={{ left: `${result.pct}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-slate-500">
              <span>Min {result.minFree} days (bought near statement date)</span>
              <span>Max {result.maxFree} days (bought day after statement)</span>
            </div>
          </div>

          <p className="mt-4 flex items-start gap-2 rounded-lg bg-violet-50 px-3 py-2.5 text-[11px] leading-relaxed text-slate-600">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-700" />
            <span>
              You only keep these interest-free days if you pay the <strong>full statement balance</strong> by the due
              date. Pay less than the full amount and interest is charged, usually back to each purchase date. Cash
              withdrawals are never interest-free.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
