/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  Compass,
  Landmark,
  Layers,
  LineChart,
  Calculator,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Calculators from './Calculators';
import LoanAppraisalCalculator from './LoanAppraisalCalculator';
import Resources from './Resources';
import FAQ from './FAQ';
import Seo from '../seo';
import { siteConfig } from '../data/siteConfig';
import { keyRates } from '../data/cbkRates';

export default function HomeTab() {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = 'Newsletter signup - The Sovereign Ledger';
    const body = [
      'Please add me to The Sovereign Ledger newsletter.',
      '',
      `Email: ${newsletterEmail}`,
    ].join('\n');

    window.location.href =
      `mailto:${siteConfig.contact.wealthEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  const metrics = [
    { label: 'Who We Serve', value: 'SMEs & Owners', desc: 'Businesses, professionals, and diaspora clients in East Africa' },
    { label: 'Two Pillars', value: 'Growth + Finance', desc: 'Data & digital growth and finance & banking advisory' },
    { label: 'Banking Edge', value: 'Inside Track', desc: 'Advice from a practising bank Relationship Manager' },
    { label: 'How We Work', value: 'Plain & Practical', desc: 'Clear analysis before any product or decision' },
  ];

  const portals = [
    {
      path: '/services',
      title: 'Finance & Banking Advisory',
      desc: 'Match your business to the right bank products — accounts, lending, trade finance, treasury, and protection — with a banker structuring the deal.',
      icon: Landmark,
      btn: 'Book Session',
    },
    {
      path: '/services',
      title: 'Data & Digital Growth',
      desc: 'Turn your data and online presence into customers with analytics, SEO, and digital systems built for East African businesses.',
      icon: LineChart,
      btn: 'Grow Online',
    },
    {
      path: '/blog',
      title: 'Research Library',
      desc: 'Read practical notes on money markets, debt instruments, business finance, and getting found online.',
      icon: Compass,
      btn: 'Read Insights',
    },
    {
      path: '/about',
      title: 'About Bengula Inc',
      desc: 'Meet the firm behind "Adding meaning to life" — the founder, the philosophy, and how the two pillars work together.',
      icon: Building2,
      btn: 'View Profile',
    },
  ];

  const priorities = [
    {
      title: 'Right Banking, Properly Structured',
      text: 'Map your cash cycle and growth plan, then connect you to the accounts, lending, trade finance, and treasury tools that actually fit — and help you qualify for them.',
      icon: Landmark,
    },
    {
      title: 'Decisions Backed by Data',
      text: 'Collect the numbers that matter, turn them into clear insight, and put your services online so growth comes from evidence, not guesswork.',
      icon: Layers,
    },
    {
      title: 'A Partner on Your Side',
      text: 'You get an advisor who speaks both finance and banking and sits on your side of the table — not a form to fill in alone.',
      icon: BadgeCheck,
    },
  ];

  return (
    <div id="home-view" className="space-y-14 md:space-y-16">
      <Seo
        title="Bengula Inc | Business Growth, Data & Banking Advisory"
        description={siteConfig.brand.tagline}
        path="/"
      />
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center rounded-3xl border border-violet-100 bg-white p-6 md:p-10 shadow-sm">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 border border-violet-100 rounded-full text-[10px] font-bold text-violet-800 uppercase tracking-widest leading-none shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-700" />
            <span>Bengula Inc Advisory Platform</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.08] font-sans">
              Finance tools and advisory for businesses that need <span className="text-violet-700">clear decisions</span>, not guesswork.
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Bengula Inc helps Kenyan and East African business owners connect numbers, banking products, digital visibility, and growth strategy into one practical decision desk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto lg:mx-0">
            {([
              { label: 'Banking & capital advisory', path: '/services' },
              { label: 'Data & SEO growth', path: '/portfolio' },
              { label: 'Finance education', path: '/blog' },
            ] as { label: string; path: string }[]).map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="group bg-white border border-slate-200 rounded-lg px-3 py-2 text-[11px] font-bold text-slate-700 shadow-sm flex items-center justify-between gap-1 cursor-pointer hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50/50 transition text-left"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 shrink-0 transition-colors" />
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <button
              onClick={() => navigate('/services')}
              className="bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs px-5 py-3 rounded-lg flex items-center gap-2 cursor-pointer shadow-md transform hover:-translate-y-0.5 transition"
            >
              <span>Book Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => document.getElementById('loan-appraisal-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-bold text-xs px-5 py-3 rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 transition shadow-sm"
            >
              <span>Use Loan Calculator</span>
              <Calculator className="w-4 h-4 text-violet-700" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-violet-950 via-violet-900 to-slate-950 border border-violet-200 rounded-2xl p-6 md:p-8 shadow-lg space-y-6 text-white">
            <div className="bg-white rounded-xl p-6 flex items-center justify-center">
              <img
                src="/images/ColoredBengulaIncLogo.png"
                alt="Bengula Inc logo"
                className="w-full max-w-xs object-contain"
              />
            </div>

            <div className="space-y-2 text-center">
              <p className="text-[10px] font-bold text-violet-200 uppercase tracking-widest">Adding Meaning To Life</p>
              <h2 className="text-xl font-extrabold text-white">Bengula Inc</h2>
              <p className="text-xs text-violet-100 leading-relaxed">
                A business-growth brand pairing data, digital visibility, credit appraisal, and banking advisory.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                ['Base', siteConfig.contact.location],
                ['Founder', 'Bengula Jacob'],
                ['Focus', 'Growth + Banking'],
                ['Audience', 'Kenya + Diaspora'],
              ].map(([label, value]) => (
                <div key={label} className="border border-white/10 bg-white/5 rounded-lg p-3">
                  <span className="text-[10px] text-violet-200 uppercase tracking-wider block font-bold">{label}</span>
                  <span className="text-xs font-bold text-white block mt-1">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="quick-statistics-dashboard" className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="text-center max-w-xl mx-auto space-y-1 pb-6">
          <span className="text-[10px] font-bold text-violet-700 uppercase tracking-widest font-mono">Firm Snapshot</span>
          <h3 className="text-xl font-bold text-slate-900">Bengula Inc at a Glance</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {metrics.map((stat) => (
            <div key={stat.label} className="space-y-1.5 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xl font-black text-violet-800 block font-sans tracking-tight">{stat.value}</span>
              <span className="text-xs font-bold text-slate-900 block">{stat.label}</span>
              <span className="text-[10px] text-slate-500 block leading-tight font-medium">{stat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="cbk-key-rates" className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-2 pb-5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-violet-700 uppercase tracking-widest font-mono">Central Bank of Kenya</span>
            <h3 className="text-xl font-bold text-slate-900">Key Market Rates</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Official CBK figures · updated periodically</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-200">
                <th className="py-2 pr-4 font-bold">Rate</th>
                <th className="py-2 pr-4 font-bold text-right">Current</th>
                <th className="py-2 font-bold text-right">As of</th>
              </tr>
            </thead>
            <tbody>
              {keyRates.map((r) => (
                <tr key={r.name} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 pr-4 text-xs font-semibold text-slate-700">{r.name}</td>
                  <td className="py-2.5 pr-4 text-xs font-bold text-violet-800 font-mono text-right">{r.value}</td>
                  <td className="py-2.5 text-[11px] text-slate-500 font-mono text-right">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs font-semibold text-violet-700 uppercase tracking-widest">Two Pillars, One Desk</span>
          <h2 className="text-2xl font-bold text-slate-900">How Bengula Inc Helps Your Business</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {portals.map((portal) => (
            <div
              key={portal.title}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:border-violet-500/45 hover:shadow-md transition duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-4">
                <div className="bg-violet-50 text-violet-800 border border-violet-100 p-2.5 rounded-lg w-fit group-hover:bg-violet-700 group-hover:text-white transition duration-300">
                  <portal.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-violet-800">{portal.title}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-normal font-normal">{portal.desc}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(portal.path)}
                className="text-xs font-bold text-violet-800 hover:text-violet-900 flex items-center gap-1 pt-6 transition duration-300 cursor-pointer"
              >
                <span>{portal.btn}</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {priorities.map((item) => (
          <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
            <div className="bg-amber-50 text-amber-700 border border-amber-100 p-2.5 rounded-lg w-fit">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-950">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section id="loan-appraisal-calculator" className="space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-1.5">
          <span className="text-xs font-semibold text-violet-700 uppercase tracking-widest">Credit Decision Tool</span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">Loan Appraisal Calculator</h3>
          <p className="text-xs text-slate-500">
            Estimate qualification, repayment factors, APR, and amortization before starting a formal loan discussion.
          </p>
        </div>
        <LoanAppraisalCalculator />
      </section>

      <section className="bg-white border border-violet-100 rounded-2xl p-6 md:p-10 space-y-8 shadow-sm">
        <div className="max-w-xl mx-auto text-center space-y-1.5">
          <span className="text-xs font-semibold text-violet-700 uppercase tracking-widest">Investment Yield Tool</span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">Bond Yield & Wealth Calculator</h3>
          <p className="text-xs text-slate-500">
            Help customers compare borrowing decisions with investment outcomes across treasury bonds, infrastructure bonds, and compound savings.
          </p>
        </div>
        <Calculators />
      </section>

      <section className="space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
        <div className="text-center space-y-1 mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Professional Ecosystem</span>
          <p className="text-xs font-bold text-slate-800">Markets, Desks, and Reference Institutions</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
          {siteConfig.partners.map((partner) =>
            partner.href ? (
              <a
                key={partner.label}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${partner.label}`}
                className="text-sm font-extrabold text-slate-600 tracking-wider font-mono uppercase text-center opacity-70 hover:opacity-100 hover:text-violet-800 transition-all duration-300 cursor-pointer"
              >
                {partner.label}
              </a>
            ) : (
              <span
                key={partner.label}
                className="text-sm font-extrabold text-slate-600 tracking-wider font-mono uppercase text-center opacity-70"
              >
                {partner.label}
              </span>
            )
          )}
        </div>
      </section>

      <Resources />

      <FAQ />

      <section id="newsletter-signup-section" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 text-white relative overflow-hidden shadow-md">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-violet-300 tracking-widest uppercase font-mono">Weekly Business Notes</span>
            <h4 className="text-xl md:text-2xl font-extrabold">Subscribe to The Sovereign Ledger</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Concise, practical notes on business finance, banking products, market rates, and using data to grow — written for owners and professionals.
            </p>
          </div>

          {newsletterSuccess ? (
            <div className="bg-emerald-950/65 border border-emerald-900 p-6 rounded-xl text-center space-y-2 max-w-sm mx-auto">
              <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
              <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-widest block">Almost There</h5>
              <p className="text-[11px] text-slate-200">
                Your email app should have opened. Press send to confirm your subscription to The Sovereign Ledger.
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto text-xs">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 flex-1 focus:outline-none focus:border-violet-400 font-mono font-bold"
              />
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-lg transition cursor-pointer text-xs uppercase tracking-wider"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}


