/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Calculator, Award, TrendingUp, DollarSign, ArrowRight, CornerDownRight, Percent, Calendar } from 'lucide-react';

export default function Calculators() {
  const [activeCalc, setActiveCalc] = useState<'compound' | 'bond'>('compound');

  // --- Compound Interest State ---
  const [initialAmount, setInitialAmount] = useState<number>(100000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10000);
  const [annualRate, setAnnualRate] = useState<number>(14); // 14% typical in MMF/Bonds
  const [years, setYears] = useState<number>(10);
  const [compoundingPeriod, setCompoundingPeriod] = useState<'daily' | 'monthly' | 'semi-annually' | 'annually'>('daily');

  // --- Bond Yield State ---
  const [bondFaceValue, setBondFaceValue] = useState<number>(500000);
  const [bondCoupon, setBondCoupon] = useState<number>(16.5); // 16.5% standard for premium CBK issues
  const [bondTenure, setBondTenure] = useState<number>(10);
  const [bondType, setBondType] = useState<'infrastructure' | 'standard-long' | 'standard-short'>('infrastructure');

  // --- Helpers to format Currency (KSh) ---
  const formatKSh = (val: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val).replace('KES', 'KSh');
  };

  // --- Compound Calculator Computations ---
  const compoundResults = useMemo(() => {
    const P = initialAmount;
    const PMT = monthlyContribution;
    const r = annualRate / 100;
    const t = years;

    let n = 365; // Daily
    if (compoundingPeriod === 'monthly') n = 12;
    else if (compoundingPeriod === 'semi-annually') n = 2;
    else if (compoundingPeriod === 'annually') n = 1;

    const yearlyBreakdown: { year: number; principal: number; interest: number; total: number }[] = [];
    let currentTotal = P;
    let accumulatedContribution = P;

    const ratePerPeriod = r / n;

    for (let y = 1; y <= t; y++) {
      // Direct accumulation math month by month within each year
      for (let period = 1; period <= n; period++) {
        currentTotal = currentTotal * (1 + ratePerPeriod) + (PMT * (12 / n));
        accumulatedContribution += (PMT * (12 / n));
      }
      
      const yearInterest = currentTotal - accumulatedContribution;
      yearlyBreakdown.push({
        year: y,
        principal: Math.round(accumulatedContribution),
        interest: Math.round(yearInterest),
        total: Math.round(currentTotal)
      });
    }

    const finalTotal = currentTotal;
    const totalPrincipal = accumulatedContribution;
    const totalInterest = finalTotal - totalPrincipal;

    return {
      finalTotal: Math.round(finalTotal),
      totalPrincipal: Math.round(totalPrincipal),
      totalInterest: Math.round(totalInterest),
      yearlyBreakdown
    };
  }, [initialAmount, monthlyContribution, annualRate, years, compoundingPeriod]);

  // --- Bond Calculator Computations ---
  const bondResults = useMemo(() => {
    const faceValue = bondFaceValue;
    const couponRate = bondCoupon / 100;
    const tenure = bondTenure;

    let taxRate = 0; // Infrastructure (Tax-free)
    if (bondType === 'standard-long') {
      taxRate = 0.10; // 10% for tenures 10 years and above
    } else if (bondType === 'standard-short') {
      taxRate = 0.15; // 15% for tenures below 10 years
    }

    const annualGrossPayout = faceValue * couponRate;
    const annualTax = annualGrossPayout * taxRate;
    const annualNetPayout = annualGrossPayout - annualTax;
    const semiAnnualNetPayout = annualNetPayout / 2;
    const totalNetEarningsOverTenure = annualNetPayout * tenure;

    return {
      annualGross: Math.round(annualGrossPayout),
      annualTax: Math.round(annualTax),
      annualNet: Math.round(annualNetPayout),
      semiAnnualNet: Math.round(semiAnnualNetPayout),
      totalEarnings: Math.round(totalNetEarningsOverTenure),
      taxRatePercent: taxRate * 100
    };
  }, [bondFaceValue, bondCoupon, bondTenure, bondType]);

  // Max value in breakdown for custom chart scaling
  const maxChartValue = compoundResults.yearlyBreakdown[compoundResults.yearlyBreakdown.length - 1]?.total || 1;

  return (
    <div id="calculators-container" className="space-y-8 animate-fadeIn">
      {/* Calculator Selector Tabs */}
      <div className="flex border border-slate-200 p-1 bg-slate-50 rounded-xl max-w-md mx-auto shadow-xs">
        <button
          id="tab-compound-calc"
          onClick={() => setActiveCalc('compound')}
          className={`flex-1 py-3 text-center text-sm font-bold rounded-lg transition-all cursor-pointer ${
            activeCalc === 'compound'
              ? 'bg-violet-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-violet-800 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Compound Interest</span>
          </div>
        </button>
        <button
          id="tab-bond-calc"
          onClick={() => setActiveCalc('bond')}
          className={`flex-1 py-3 text-center text-sm font-bold rounded-lg transition-all cursor-pointer ${
            activeCalc === 'bond'
              ? 'bg-violet-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-violet-800 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4" />
            <span>Bond Yields</span>
          </div>
        </button>
      </div>

      {activeCalc === 'compound' ? (
        // ================= COMPOUND CALCULATOR SCREEN =================
        <div id="compound-calculator-element" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section */}
          <div className="lg:col-span-5 glass-strong rounded-2xl p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-violet-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-violet-800" />
                Investment Parameters
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Simulate how high-yielding setups like local Money Market Funds and laddered debt expand over time.
              </p>
            </div>

            {/* Initial Investment */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">Initial Principal (KSh)</label>
                <span className="text-emerald-700 font-extrabold">{formatKSh(initialAmount)}</span>
              </div>
              <input
                id="input-initial-amount"
                type="range"
                min="5000"
                max="5000000"
                step="5000"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-800"
              />
              <input
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 text-slate-900 text-sm py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 font-mono font-semibold"
              />
            </div>

            {/* Monthly Contribution */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">Monthly Savings Contribution (KSh)</label>
                <span className="text-emerald-700 font-extrabold">{formatKSh(monthlyContribution)} / month</span>
              </div>
              <input
                id="input-monthly-contrib"
                type="range"
                min="0"
                max="500000"
                step="1000"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-800"
              />
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 text-slate-900 text-sm py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 font-mono font-semibold"
              />
            </div>

            {/* Rate & Tenure row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-700 font-bold flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-violet-800" />
                  Interest (APR %)
                </label>
                <input
                  id="input-annual-rate"
                  type="number"
                  min="1"
                  max="40"
                  step="0.1"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="w-full bg-slate-50 text-slate-900 text-sm py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500 font-medium leading-none block">Standard Kenyan MMF yields ~13%-15%</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-700 font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-violet-800" />
                  Horizon (Years)
                </label>
                <input
                  id="input-years"
                  type="number"
                  min="1"
                  max="40"
                  value={years}
                  onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-50 text-slate-900 text-sm py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500 font-medium leading-none block">Long term yields more compound power</span>
              </div>
            </div>

            {/* Compounding Frequency */}
            <div className="space-y-2">
              <label className="text-xs text-slate-700 font-bold block">Compounding Frequency</label>
              <div className="grid grid-cols-2 gap-2">
                {(['daily', 'monthly', 'semi-annually', 'annually'] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setCompoundingPeriod(freq)}
                    className={`py-2 text-xs font-bold rounded-lg capitalize border transition-all cursor-pointer ${
                      compoundingPeriod === freq
                        ? 'bg-violet-50 border-violet-800 text-violet-800'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-violet-800 hover:bg-slate-100'
                    }`}
                  >
                    {freq.replace('-', ' ')}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 leading-normal font-medium">
                {compoundingPeriod === 'daily' && "Excellent for Money Market Funds (compounded daily, paid out monthly)."}
                {compoundingPeriod === 'semi-annually' && "Aligns perfectly with Central Bank of Kenya sovereign bond coupons."}
                {compoundingPeriod === 'monthly' && "Useful for standard commercial savings and mortgage models."}
                {compoundingPeriod === 'annually' && "Provides general conservative annual wealth modeling projections."}
              </p>
            </div>
          </div>

          {/* Results Visual & Breakdown Section */}
          <div className="lg:col-span-7 glass-strong rounded-2xl p-6 md:p-8 space-y-8">
            
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-inner min-w-0">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total Balance</span>
                <p className="text-xl md:text-lg xl:text-xl font-bold font-mono text-violet-950 mt-1 leading-tight tracking-tight tabular-nums break-words">
                  {formatKSh(compoundResults.finalTotal)}
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-inner min-w-0">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Contributions</span>
                <p className="text-xl md:text-lg xl:text-xl font-bold font-mono text-slate-700 mt-1 leading-tight tracking-tight tabular-nums break-words">
                  {formatKSh(compoundResults.totalPrincipal)}
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-inner min-w-0">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Interest Gained</span>
                <p className="text-xl md:text-lg xl:text-xl font-bold font-mono text-emerald-700 mt-1 leading-tight tracking-tight tabular-nums break-words animate-pulse">
                  {formatKSh(compoundResults.totalInterest)}
                </p>
              </div>
            </div>

            {/* Elegant Custom SVG Chart Representation */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-4 shadow-inner">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800 font-sans">Geometric Growth Curve (Years 1 - {years})</span>
                <div className="flex gap-4 text-[10px] font-semibold">
                  <span className="flex items-center gap-1 text-slate-500">
                    <span className="w-2.5 h-2.5 bg-slate-300 rounded-full inline-block"></span>
                    Principal
                  </span>
                  <span className="flex items-center gap-1 text-violet-800">
                    <span className="w-2.5 h-2.5 bg-violet-800 rounded-full inline-block"></span>
                    Interest Earned
                  </span>
                </div>
              </div>

              {/* Graphic container */}
              <div className="h-56 w-full flex items-end gap-1.5 pt-6 pb-2 border-b border-slate-200 relative">
                {compoundResults.yearlyBreakdown.map((item, index) => {
                  const totalHeightPercent = (item.total / maxChartValue) * 85; // cap at 85% for display padding
                  const principalHeightPercent = (item.principal / item.total) * totalHeightPercent;
                  const interestHeightPercent = totalHeightPercent - principalHeightPercent;

                  // Render limited columns nicely on cramped responsive views
                  if (years > 12 && index % Math.ceil(years / 10) !== 0 && index !== years - 1) return null;

                  return (
                    <div key={item.year} className="flex-1 flex flex-col justify-end items-center h-full group relative">
                      {/* Tooltip on hovering graph bar */}
                      <div className="absolute bottom-full mb-2 bg-slate-950 border border-slate-900 text-[10px] text-slate-200 rounded p-2.5 hidden group-hover:block z-10 w-32 text-center pointer-events-none shadow-md">
                        <p className="font-extrabold text-amber-400">Year {item.year}</p>
                        <p className="font-semibold">Total: {formatKSh(item.total)}</p>
                        <p className="text-[9px] text-slate-400">Contrib: {formatKSh(item.principal)}</p>
                        <p className="text-[9px] text-emerald-400">Interest: {formatKSh(item.interest)}</p>
                      </div>

                      {/* Bar columns */}
                      <div className="w-full flex flex-col justify-end rounded-t overflow-hidden cursor-pointer" style={{ height: `${totalHeightPercent}%` }}>
                        <div className="w-full bg-violet-800 hover:bg-violet-700 transition-colors" style={{ height: `${interestHeightPercent}%` }}></div>
                        <div className="w-full bg-slate-300 hover:bg-slate-300 transition-colors" style={{ height: `${principalHeightPercent}%` }}></div>
                      </div>

                      <span className="text-[9px] text-slate-500 font-semibold mt-2">Yr {item.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Yearly Breakdown List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 block">Key Milestones:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Year 1 Baseline", data: compoundResults.yearlyBreakdown[0] },
                  { label: "Midway Compound", data: compoundResults.yearlyBreakdown[Math.floor(years / 2) - 1] },
                  { label: `Year ${years} Harvest`, data: compoundResults.yearlyBreakdown[years - 1] }
                ].map((milestone, idx) => {
                  if (!milestone.data) return null;
                  return (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2 text-xs shadow-xs hover:border-slate-300 transition">
                      <Award className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-800">{milestone.label}</span>
                        <div className="text-slate-500 space-y-0.5 mt-1 font-mono">
                          <p>Principal: {formatKSh(milestone.data.principal)}</p>
                          <p className="text-emerald-700 font-semibold font-bold">Interest: +{formatKSh(milestone.data.interest)}</p>
                          <p className="text-violet-950 font-extrabold text-sm pt-0.5 font-sans">Total: {formatKSh(milestone.data.total)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      ) : (
        // ================= BOND CALCULATOR SCREEN =================
        <div id="bond-calculator-element" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs */}
          <div className="lg:col-span-5 glass-strong rounded-2xl p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-violet-800 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-violet-800" />
                Bond Selection & Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Central Bank of Kenya (CBK) bonds pay fixed interest coupons twice a year. Calculate actual pre and post-tax returns.
              </p>
            </div>

            {/* Bond Type Selector */}
            <div className="space-y-2">
              <label className="text-xs text-slate-700 font-bold block">Security Instrument Classification</label>
              <div className="flex flex-col gap-2">
                <button
                  id="bond-type-infra"
                  onClick={() => setBondType('infrastructure')}
                  className={`p-3 text-left text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    bondType === 'infrastructure'
                      ? 'bg-violet-50/50 border-violet-800 text-violet-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-violet-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>Infrastructure Bond (IFB)</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full uppercase">0% Tax-Free</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 font-normal">Specifically allocated to national infrastructure. Yields are entirely tax-free.</p>
                </button>

                <button
                  id="bond-type-std-long"
                  onClick={() => setBondType('standard-long')}
                  className={`p-3 text-left text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    bondType === 'standard-long'
                      ? 'bg-violet-50/50 border-violet-800 text-violet-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-violet-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>Standard Bond (≥ 10 Yr Tenure)</span>
                    <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full uppercase bg-amber-50">10% W/Tax</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 font-normal">Standard treasury issues. Sub-10% tax rate encourages long-duration compounding.</p>
                </button>

                <button
                  id="bond-type-std-short"
                  onClick={() => setBondType('standard-short')}
                  className={`p-3 text-left text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    bondType === 'standard-short'
                      ? 'bg-violet-50/50 border-violet-800 text-violet-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-violet-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>Standard Bond (&lt; 10 Yr Tenure)</span>
                    <span className="text-[10px] bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 rounded-full uppercase">15% W/Tax</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 font-normal">Shorter duration bonds. Highest tax rate, but provides faster capital turnover.</p>
                </button>
              </div>
            </div>

            {/* Bond Face Value */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">Bond Face Value (KSh)</label>
                <span className="text-emerald-700 font-extrabold">{formatKSh(bondFaceValue)}</span>
              </div>
              <input
                id="input-bond-fvalue"
                type="range"
                min="50000"
                max="10000000"
                step="50000"
                value={bondFaceValue}
                onChange={(e) => setBondFaceValue(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-800"
              />
              <input
                type="number"
                value={bondFaceValue}
                onChange={(e) => setBondFaceValue(Math.max(50000, Number(e.target.value)))}
                className="w-full bg-slate-50 text-slate-900 text-sm py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 font-mono font-semibold"
              />
              <span className="text-[10px] text-slate-500 block leading-tight font-medium">Minimum CBK Bond bids start at KSh 50,000</span>
            </div>

            {/* Coupon and Tenure rows */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-700 font-bold block">Coupon rate (% APR)</label>
                <input
                  id="input-bond-coupon"
                  type="number"
                  min="5"
                  max="25"
                  step="0.05"
                  value={bondCoupon}
                  onChange={(e) => setBondCoupon(Number(e.target.value))}
                  className="w-full bg-slate-50 text-slate-900 text-sm py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 font-mono font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-700 font-bold block">Tenure (Years)</label>
                <input
                  id="input-bond-tenure"
                  type="number"
                  min="1"
                  max="30"
                  value={bondTenure}
                  onChange={(e) => setBondTenure(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-50 text-slate-900 text-sm py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-7 glass-strong rounded-2xl p-6 md:p-8 space-y-6">
            <h4 className="text-xs font-extrabold text-violet-800 uppercase tracking-widest font-sans">Projected Inflow Matrix</h4>
            
            {/* Main Yield Card */}
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-xs text-emerald-900 font-semibold">Total Net Yield Over {bondTenure} Years</span>
                <p className="text-3xl font-bold font-mono text-emerald-800 mt-1">
                  {formatKSh(bondResults.totalEarnings)}
                </p>
              </div>
              <div className="bg-emerald-100 text-emerald-800 rounded-full p-3 border border-emerald-200 shadow-xs">
                <TrendingUp className="w-8 h-8 text-emerald-800" />
              </div>
            </div>

            {/* Distribution Breakdown rows */}
            <div className="divide-y divide-slate-200 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden text-sm shadow-inner">
              <div className="flex items-center justify-between p-4 bg-slate-100/50">
                <span className="text-slate-600 font-medium">Coupon Rate (Sovereign Fixed)</span>
                <span className="font-mono text-slate-900 font-bold">{bondCoupon}% APR</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-slate-600 font-medium">Annual Gross Inflow</span>
                <span className="font-mono text-slate-800 font-semibold">{formatKSh(bondResults.annualGross)}</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 font-medium">Withholding Tax</span>
                  <span className="text-[10px] bg-rose-50 text-rose-800 border border-rose-100 px-2.5 py-0.5 rounded-full font-bold">
                    {bondResults.taxRatePercent}%
                  </span>
                </div>
                <span className="font-mono text-rose-700 font-bold">-{formatKSh(bondResults.annualTax)}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-100/50 font-bold">
                <span className="text-slate-900 font-extrabold">Annual Net Cash Payout</span>
                <span className="font-mono text-emerald-700 font-extrabold">{formatKSh(bondResults.annualNet)}</span>
              </div>
            </div>

            {/* Cash Flow Distribution Schedule */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 block">Payout Timing Logistics (Kenya Protocol):</span>
              <div className="bg-white p-4 border border-slate-200 rounded-xl space-y-4 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="bg-violet-50 text-violet-800 border border-violet-100 px-3 py-1.5 rounded-lg text-xs font-extrabold shrink-0 mt-0.5">H1</div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800 text-sm">First Half-Year Coupon Payment</p>
                    <p className="text-slate-500 mt-0.5 leading-relaxed font-semibold">Paid direct to your bank account via CBS RTGS transfer every 6 months.</p>
                    <p className="text-emerald-700 font-bold mt-1.5 font-mono text-sm">{formatKSh(bondResults.semiAnnualNet)} Net</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-slate-100 pt-4">
                  <div className="bg-violet-50 text-violet-800 border border-violet-100 px-3 py-1.5 rounded-lg text-xs font-extrabold shrink-0 mt-0.5">H2</div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800 text-sm">Second Half-Year Coupon Payment</p>
                    <p className="text-slate-500 mt-0.5 leading-relaxed font-semibold">Final annualized return coupon segment for the operating calendar.</p>
                    <p className="text-emerald-700 font-bold mt-1.5 font-mono text-sm">{formatKSh(bondResults.semiAnnualNet)} Net</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-amber-50 text-amber-900 text-xs p-4 border border-amber-200/50 rounded-xl leading-relaxed flex gap-2.5 shadow-xs font-medium">
              <span className="shrink-0 font-bold text-amber-800 text-sm">💡 Note:</span>
              <p>
                Infrastructure Bonds (IFB) are highly liquid on the NSE secondary market. If you require cash before the {bondTenure}-year maturity, any licensed broker can sell your outstanding holding to other retail or diaspora buyers, with settlement completing in T+3 days.
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}


