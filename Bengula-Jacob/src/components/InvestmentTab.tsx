/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { InvestmentOpportunity } from '../types';
import { investmentPoolsList } from '../data/investmentsData';
import { riskBadgeStyles } from '../data/portfolioTags';
import { Sparkles, TrendingUp, DollarSign, Award, ArrowUpRight, ArrowRight, Wallet, Percent, ShieldCheck, Heart, FileText, Download, Briefcase, Mail, Send } from 'lucide-react';
import { images } from '../data/media';
import { useNavigate } from 'react-router-dom';
import Seo from '../seo';

export default function InvestmentTab() {
  const navigate = useNavigate();
  const [selectedPoolId, setSelectedPoolId] = useState<string>('real-estate-project');
  const [investAmount, setInvestAmount] = useState<number>(1000000);

  // Inquiry Form State
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerBudget, setPartnerBudget] = useState('1,000,000 - 5,000,000');
  const [partnerSubject, setPartnerSubject] = useState('real-estate-project');
  const [partnerMessage, setPartnerMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const pools: InvestmentOpportunity[] = investmentPoolsList;

  const handleDownload = (title: string) => {
    let filename = "";
    if (title.includes("Annual East Africa")) {
      filename = "annual_east_africa_fiscal_macro_trends_analysis_2026.txt";
    } else if (title.includes("Agri-Horticulture")) {
      filename = "emerging_agri_horticulture_cold_chain_logistics_report.txt";
    } else {
      filename = "due_diligence_framework_for_alternative_placements.txt";
    }

    const element = document.createElement("a");
    element.href = `/documents/${filename}`;
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const activePool = useMemo(() => {
    return pools.find(p => p.id === selectedPoolId) || pools[0];
  }, [selectedPoolId]);

  const projectedReturns = useMemo(() => {
    const isStandardTax = activePool.riskProfile !== "Low"; 
    const rate = activePool.expectedYield / 100;
    const amount = investAmount;

    const grossProjectedInterest = amount * rate;
    const taxImpact = isStandardTax ? grossProjectedInterest * 0.15 : 0; 
    const netProjectedInterest = grossProjectedInterest - taxImpact;
    const totalAccumulatedVal = amount + netProjectedInterest;

    return {
      gross: Math.round(grossProjectedInterest),
      tax: Math.round(taxImpact),
      net: Math.round(netProjectedInterest),
      total: Math.round(totalAccumulatedVal)
    };
  }, [investAmount, activePool]);

  const formatKSh = (val: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val).replace('KES', 'KSh');
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormSuccess(true);
      setFormLoading(false);
      // reset fields
      setPartnerName('');
      setPartnerEmail('');
      setPartnerMessage('');
    }, 1000);
  };

  return (
    <div id="investments-tab-root" className="space-y-10 animate-fadeIn">
      <Seo
        title="Investment Pools & Opportunities | Bengula Inc"
        description="Structured education on real estate, agri-logistics, and private placement evaluation — how Bengula Inc frames risk, yield, and due diligence for East African investors."
        path="/investments"
      />

      {/* Markets banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs h-40 md:h-48">
        <img
          src={images.markets}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-violet-950/85 to-violet-950/30"></div>
        <div className="relative h-full flex flex-col justify-center px-6 md:px-10 max-w-xl">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">Alternative Placements</span>
          <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1 leading-tight">Co-Investment Syndicate Pools</h2>
          <p className="text-xs text-violet-100 mt-1.5 leading-relaxed">
            Vetted real-estate, agri-logistics, and SME placements structured through Bengula Inc.
          </p>
        </div>
      </div>

      {/* Top Section: Header & Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Pools display */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-violet-700 uppercase tracking-widest block font-extrabold font-sans">Strategic Allocations</span>
            <h2 className="text-2xl font-bold text-slate-900">Current Investment Opportunities</h2>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">
              Through Bengula Inc private holding networks, we sponsor high-gain real-estate development, agricultural exports support, and tech-driven seed cooperatives.
            </p>
          </div>

          {/* Vertical Pool Grid displays */}
          <div className="space-y-4">
            {pools.map((item) => (
              <div
                key={item.id}
                className={`border rounded-2xl p-5 transition duration-300 relative group overflow-hidden shadow-xs ${
                  selectedPoolId === item.id
                    ? 'bg-violet-50/20 border-violet-800'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Top meta row */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] bg-violet-50 text-violet-800 border border-violet-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-2 flex items-center gap-1.5">
                      <span>{item.title}</span>
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${riskBadgeStyles[item.riskProfile]}`}>
                      {item.riskProfile} Risk
                    </span>
                    <p className="text-emerald-700 font-extrabold text-sm font-mono mt-1 leading-none">{item.expectedYield}% APR</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-normal mt-3">
                  {item.description}
                </p>

                {/* Bottom key benefits */}
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 mt-4 pt-4 border-t border-slate-100 font-semibold">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-violet-800 rounded-full"></span>
                    <span>Minimum Capital: {formatKSh(item.minimumAmount)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-violet-800 rounded-full"></span>
                    <span>Horizon: {item.tenure}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 mt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedPoolId(item.id);
                      setInvestAmount(item.minimumAmount);
                    }}
                    className={`text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded cursor-pointer transition ${
                      selectedPoolId === item.id
                        ? 'bg-violet-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-500 hover:text-violet-800'
                    }`}
                  >
                    Configure Yield Simulator
                  </button>
                  {item.blogId && (
                    <button
                      type="button"
                      onClick={() => navigate(`/blog/${item.blogId!}`)}
                      className="text-[10px] font-semibold uppercase tracking-wider py-1.5 px-3 bg-white border border-slate-200 text-violet-800 hover:bg-violet-50 rounded cursor-pointer transition flex items-center gap-1"
                    >
                      <span>Read Deep Dive</span>
                      <ArrowUpRight className="w-3 h-3 text-violet-800" />
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Yield compounding Simulator */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-sm md:text-base font-bold text-violet-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-800" />
              Co-Investment Simulator
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Simulate actual annualized gains, tax outcomes, and terminal values for your selected co-investment pool.
            </p>
          </div>

          {/* Selected pool overview banner */}
          <div className="bg-slate-50 p-3.5 border border-slate-100 rounded-xl space-y-2 shadow-inner">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Active Choice:</span>
            <p className="text-xs font-bold text-slate-800">{activePool.title}</p>
            <div className="flex justify-between text-[11px] font-mono text-violet-800 font-extrabold pt-1.5 border-t border-slate-200/60">
              <span>Annual ROI Rate:</span>
              <span>{activePool.expectedYield}% APR</span>
            </div>
          </div>

          {/* Investment Amount Input slider */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-700 font-bold">Your Investment Allocation (KSh)</label>
              <span className="text-emerald-700 font-extrabold">{formatKSh(investAmount)}</span>
            </div>
            <input
              id="input-investment-slider"
              type="range"
              min={activePool.minimumAmount}
              max="10000000"
              step="50000"
              value={investAmount}
              onChange={(e) => setInvestAmount(Math.max(activePool.minimumAmount, Number(e.target.value)))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-800"
            />
            <input
              type="number"
              value={investAmount}
              onChange={(e) => setInvestAmount(Math.max(activePool.minimumAmount, Number(e.target.value)))}
              className="w-full bg-slate-50 text-slate-900 text-xs py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 transition-colors font-mono font-medium"
            />
            <span className="text-[9px] text-slate-400 block leading-tight font-medium">
              *Minimum allocation required for {activePool.title} is {formatKSh(activePool.minimumAmount)}.
            </span>
          </div>

          {/* Projected returns grid */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4 shadow-inner">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Annual Return matrix:</span>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-xs">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Gross Gains</span>
                <span className="text-sm font-bold font-mono text-slate-800 block mt-1">{formatKSh(projectedReturns.gross)}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-xs">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Withholding Tax (15%)</span>
                <span className="text-sm font-bold font-mono text-rose-700 block mt-1">-{formatKSh(projectedReturns.tax)}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-sm">
              <div className="flex items-center gap-1.5 font-bold">
                <Wallet className="w-4.5 h-4.5 text-emerald-600" />
                <span className="text-slate-800">Net Compounded Interest:</span>
              </div>
              <span className="font-mono font-extrabold text-emerald-700 text-base">{formatKSh(projectedReturns.net)}</span>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-sm font-bold">
              <span className="text-slate-900 font-extrabold">Terminal Payout Value:</span>
              <span className="font-mono text-emerald-700 font-extrabold text-lg">{formatKSh(projectedReturns.total)}</span>
            </div>
          </div>

          {/* Benefits bullets list */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-800 block">Co-Investor Safeguards Summary:</span>
            <div className="space-y-2 bg-white p-3 rounded-lg border border-slate-100 text-[11px] leading-relaxed text-slate-500 shadow-xs">
              {activePool.keyBenefits.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Structured Sections for Investment Insights & Investor Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Investment Insights Column */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-violet-800" />
              Investment Insights & Analysis
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Actionable guides and sector analysis formulated directly by the Bengula Inc private desk.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Annual East Africa Fiscal & Macro-Trends Analysis (2026)",
                type: "Market Analysis",
                size: "2.4 MB (PDF)",
                desc: "Comparing currency movements, inflation profiles, and the subsequent trajectory of Central Bank primary rate adjustments."
              },
              {
                title: "Emerging Agri-Horticulture Cold-Chain Logistics Report",
                type: "Sector Report",
                size: "1.8 MB (PDF)",
                desc: "Analyzing export volume capabilities, logistical bottlenecks, and transport unit economics across Mt. Kenya hubs."
              },
              {
                title: "Due Diligence Framework For Alternative Placements",
                type: "Due Diligence Guide",
                size: "950 KB (PDF)",
                desc: "A systematic structural checklist to auditing off-market land holdings, developers, and agricultural export agreements."
              }
            ].map((insight, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-slate-300 transition">
                <div className="flex justify-between items-center text-[10px] font-bold font-mono">
                  <span className="text-violet-800 uppercase">{insight.type}</span>
                  <span className="text-slate-400">{insight.size}</span>
                </div>
                <h4 className="font-bold text-slate-950 text-xs leading-snug">{insight.title}</h4>
                <p className="text-[10px] text-slate-500 leading-normal">{insight.desc}</p>
                <button 
                  onClick={() => handleDownload(insight.title)}
                  className="text-[10px] font-bold text-violet-800 flex items-center gap-1 hover:text-violet-700 transition cursor-pointer pt-1"
                >
                  <Download className="w-3 h-3 text-violet-800" />
                  <span>Obtain Analysis</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Investor Resources Column */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Investor Resources & Safekeeping
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              SLA templates, risk management methodologies, and operational structures.
            </p>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-950">1. Systematic Risk Management Protocols</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                We perform intensive background profiling on developers and logistic operators. All holdings are co-titled inside a secure special-purpose trustee desk monitored by licensed legal advocates.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-950">2. Investment Allocation Governance</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                We maintain complete transparency. Deposited capital proceeds directly to acquire physical assets or inventory blocks, backed by registered bills of lading and physical property certificates.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-950">3. Structured Liquidity Exits</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                Private joint syndicates hold secondary transfer rules, allowing on-rolling co-investors to take over your share in case of personal liquidity requirements before the tenure expires.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Co-Investor Partnership Inquiry Form */}
      <div id="investor-inquiry-form-container" className="bg-slate-900 rounded-2xl p-6 md:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 w-80 h-80 bg-violet-700/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-widest block font-extrabold font-mono">Structured Alliance</span>
            <h3 className="text-2xl font-extrabold text-white">Co-Investor Partnership Inquiry</h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              Ready to deploy capital into double-digit frontier placements? Submit your budget tier confidentially to request a private mandate pack.
            </p>
          </div>

          {formSuccess ? (
            <div className="bg-emerald-950 border border-emerald-900 p-6 rounded-xl text-center space-y-3 max-w-md mx-auto">
              <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-emerald-400">Mandate Request Received</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Thank your for your interest. Jacob's portfolio desk has logged your financial mandate and will dispatch the relevant due diligence binders within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-white">
              
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Your Official Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Briefcase className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Kamau"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full bg-slate-800 text-white border border-slate-700 p-2.5 pl-9 rounded focus:outline-none focus:border-violet-400 font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Your Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rkamau@domain.com"
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    className="w-full bg-slate-800 text-white border border-slate-700 p-2.5 pl-9 rounded focus:outline-none focus:border-violet-400 font-mono font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Expected Allocations Budget (KSh)</label>
                <select
                  value={partnerBudget}
                  onChange={(e) => setPartnerBudget(e.target.value)}
                  className="w-full bg-slate-800 text-white border border-slate-700 p-2.5 rounded focus:outline-none focus:border-violet-400 cursor-pointer font-semibold"
                >
                  <option value="500,000 - 1,000,000">KSh 500,000 - KSh 1,000,000</option>
                  <option value="1,000,000 - 5,000,000">KSh 1,000,000 - KSh 5,000,000</option>
                  <option value="5,000,000 - 20,000,000">KSh 5,000,000 - KSh 20,000,000</option>
                  <option value="20,000,000+">KSh 20,000,000+ (Bulk Placements)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Venture Focus Theme</label>
                <select
                  value={partnerSubject}
                  onChange={(e) => setPartnerSubject(e.target.value)}
                  className="w-full bg-slate-800 text-white border border-slate-700 p-2.5 rounded focus:outline-none focus:border-violet-400 cursor-pointer font-semibold"
                >
                  {pools.map((item) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                  ))}
                  <option value="general-co-invest">General Co-Investment Syndication Program</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-slate-300 font-bold">Confidential Brief & Criteria (Optional)</label>
                <textarea
                  rows={4}
                  placeholder="Outline any key risk benchmarks, required timeline schedules, or previous placement background."
                  value={partnerMessage}
                  onChange={(e) => setPartnerMessage(e.target.value)}
                  className="w-full bg-slate-800 text-white border border-slate-700 p-2.5 rounded focus:outline-none focus:border-violet-400 text-slate-200"
                />
              </div>

              <div className="sm:col-span-2 flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer shadow-md text-xs uppercase tracking-wider"
                >
                  {formLoading ? (
                    <span>Logging mandate details...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Transmit Partnership Inquiry</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>

    </div>
  );
}

