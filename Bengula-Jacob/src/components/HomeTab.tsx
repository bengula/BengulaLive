/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, ChevronRight, ArrowUpRight, User, Layers, BookOpen, Compass } from 'lucide-react';
import Calculators from './Calculators';
import Resources from './Resources';
import FAQ from './FAQ';
import { TabId } from '../types';
import { siteConfig } from '../data/siteConfig';

export default function HomeTab({ navigate }: { navigate: (id: TabId) => void }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Static-host friendly: open a pre-filled subscription email.
    const subject = 'Newsletter signup — The Sovereign Ledger';
    const body = [
      `Please add me to The Sovereign Ledger newsletter.`,
      ``,
      `Email: ${newsletterEmail}`,
    ].join('\n');

    window.location.href =
      `mailto:${siteConfig.contact.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  return (
    <div id="home-view" className="space-y-16">

      {/* Premium Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-105 rounded-full text-[10px] font-bold text-blue-900 uppercase tracking-widest leading-none">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
            <span>Private Wealth & Asset Portfolios</span>
          </div>

          <h1 className="text-3.5xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-sans">
            Secure Alternative <span className="text-blue-900 underline decoration-amber-500 decoration-3">Yields</span> & Compound Your Capital
          </h1>

          <p className="text-xs md:text-sm font-extrabold text-blue-950 uppercase tracking-wider block font-sans">
            ✨ Financial Education, Investment Insights & Business Consulting
          </p>

          <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Welcome to the private digital gateway of <strong>Jacob Bengula</strong>. As an active Senior Relationship Manager at Absa Kenya, my career centers on corporate treasury bid structures. Through Bengula Inc, I provide local and diaspora clients with transparent financial education, structured alternative investment syndicates, and custom portfolio alignment plans.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate('services')}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-md transform hover:-translate-y-0.5 transition"
            >
              <span>Book Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('blog')}
              className="border border-slate-200 hover:border-slate-350 bg-white text-slate-700 font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 transition shadow-xs"
            >
              <span>Explore Resources</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('newsletter-signup-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-slate-100 hover:bg-slate-200 text-blue-950 font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer transition shadow-xs"
            >
              <span>Subscribe to Newsletter</span>
            </button>
          </div>
        </div>

        {/* Professional Headshot Placement Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md space-y-6 relative overflow-hidden shadow-lg flex flex-col items-center text-center">
            <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>

            {/* Headshot */}
            <div className="relative w-36 h-36 rounded-2xl bg-gradient-to-tr from-blue-950 via-blue-900 to-amber-700 p-0.5 shadow-md">
              <div className="w-full h-full rounded-[14px] bg-slate-900 relative overflow-hidden">
                <img
                  src="/images/jacob.jpg"
                  alt="Jacob Bengula"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 pt-6 pb-2 text-center bg-gradient-to-t from-slate-900/90 to-transparent">
                  <span className="text-[7.5px] bg-emerald-950 text-emerald-300 border border-emerald-900 px-2 py-0.5 rounded-full uppercase font-bold font-mono">Senior Absa RM</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-slate-900">Jacob Bengula</h3>
              <p className="text-xs text-slate-500 max-w-xs font-medium">
                Corporate Banker & Strategic Alternative Investment Sponsor of the Bengula Inc private holding model.
              </p>
            </div>

            <div className="w-full pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-left">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Banking Focus</span>
                <span className="text-xs font-bold text-slate-800 block">Sovereign Debt Desk</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">HQ Office</span>
                <span className="text-xs font-bold text-slate-800 block">Absa Plaza, Nairobi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Statistics Dashboard */}
      <div id="quick-statistics-dashboard" className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
        <div className="text-center max-w-xl mx-auto space-y-1 pb-6">
          <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest font-mono">Track Record</span>
          <h3 className="text-xl font-bold text-slate-900">Bengula Jacob in Statistics</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Years in Banking", value: "10+ Years", desc: "Corporate Treasury Bid focus" },
            { label: "Businesses Consulted", value: "45+ SMEs", desc: "For margin & supply chains" },
            { label: "Educational Articles", value: "120+ Key Analyses", desc: "Demystifying bonds & MMFs" },
            { label: "Projects Reviewed", value: "85+ Placements", desc: "Intensive co-ownership pools" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1.5 p-4 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-150">
              <span className="text-2xl font-black text-blue-900 block font-sans tracking-tight">{stat.value}</span>
              <span className="text-xs font-bold text-slate-900 block">{stat.label}</span>
              <span className="text-[10px] text-slate-500 block leading-tight font-medium">{stat.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid Highlights */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs font-semibold text-blue-900 uppercase tracking-widest">Interactive Pathways</span>
          <h2 className="text-2xl font-bold text-slate-900">Portfolio Portals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: "about",
              title: "About Jacob & Bengula",
              desc: "Review my professional journey within Absa Kenya corporate team and the founding philosophy behind Bengula Inc holdings.",
              icon: User,
              btn: "Read Story"
            },
            {
              id: "services",
              title: "Advisory Desk",
              desc: "Configure 1-on-1 consultations directly into my executive calendar, structured for corporate banking and alternative placements.",
              icon: Layers,
              btn: "Secure Slot"
            },
            {
              id: "blog",
              title: "Financial Education",
              desc: "Browse premium, highly accurate analyses regarding MMFs, NSE dividends, CBK auction procedures, and compound models.",
              icon: BookOpen,
              btn: "Learn Wealth"
            },
            {
              id: "investments",
              title: "Simulate Placements",
              desc: "Explore details of active co-ownership real-estate and Agri-tech pools with compound potential simulators.",
              icon: Compass,
              btn: "Simulate ROI"
            }
          ].map((portal, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-900/35 hover:shadow-md transition duration-350 flex flex-col justify-between group shadow-xs"
            >
              <div className="space-y-4">
                <div className="bg-blue-50 text-blue-900 border border-blue-100/50 p-2.5 rounded-xl w-fit group-hover:bg-blue-900 group-hover:text-white transition duration-300">
                  <portal.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-blue-900 group-hover:text-blue-800 transition-colors duration-200">{portal.title}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-normal font-normal">{portal.desc}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(portal.id as TabId)}
                className="text-xs font-bold text-blue-900 hover:text-blue-800 flex items-center gap-1 pt-6 transition duration-300 cursor-pointer"
              >
                <span>{portal.btn}</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Home Calculator Preview Module */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 space-y-8 shadow-xs">
        <div className="max-w-xl mx-auto text-center space-y-1.5">
          <span className="text-xs font-semibold text-blue-900 uppercase tracking-widest">Live Math Tool</span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">Interactive Wealth Compounder</h3>
          <p className="text-xs text-slate-500">
            Use our financial education compound calculator directly below to see how standard rates expand.
          </p>
        </div>
        <Calculators />
      </div>

      {/* Testimonials Quote Cards */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">Alumni Validation</span>
          <h3 className="text-2xl font-bold text-slate-900">Co-Investor Testimonials</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              quote: "Sitting in Jacob's strategic review unlocked the Central Bank's CSD procedures on our first call. We structured a rolling treasury-bill ladder that yields tax-adjusted passive income twice standard retail rates.",
              author: "Mark Macharia",
              role: "Senior Operations Director",
              company: "Expatriate Logistics Network"
            },
            {
              quote: "Having Jacob review our packaging SME pricing margins saved over 3M in high-overdraft borrowing interest. We redirected cashflow into a real-estate holding syndics, converting liabilities to real land.",
              author: "Grace Wanjiku",
              role: "Founder & Lead Designer",
              company: "Horticulture Outlets East Africa"
            }
          ].map((t, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-slate-350 transition shadow-xs flex flex-col justify-between">
              <p className="text-slate-600 text-xs italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex gap-3 items-center pt-4 border-t border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-xs text-slate-900">{t.author}</p>
                  <p className="text-[10px] text-slate-500">{t.role} • <span className="font-semibold text-slate-600">{t.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Organizations Monochromatic grid */}
      <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
        <div className="text-center space-y-1 mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Professional Ecosystem</span>
          <p className="text-xs font-bold text-slate-800">Collaborative Networks & Desks</p>
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
                className="text-sm font-extrabold text-slate-600 tracking-wider font-mono uppercase text-center opacity-65 grayscale hover:opacity-100 hover:grayscale-0 hover:text-blue-900 transition-all duration-300 cursor-pointer"
              >
                {partner.label}
              </a>
            ) : (
              <span
                key={partner.label}
                className="text-sm font-extrabold text-slate-600 tracking-wider font-mono uppercase text-center opacity-65 grayscale"
              >
                {partner.label}
              </span>
            )
          )}
        </div>
      </div>

      {/* Resource Downloads section */}
      <Resources />

      {/* FAQ section */}
      <FAQ />

      {/* Newsletter Signup Form section */}
      <div id="newsletter-signup-section" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase font-mono">Weekly Insights Blueprint</span>
            <h4 className="text-xl md:text-2xl font-extrabold">Subscribe to The Sovereign Ledger</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Receive weekly visual analyses comparing Treasury rates, NSE dividend schedules, Real Estate development layouts, and B2B growth cases.
            </p>
          </div>

          {newsletterSuccess ? (
            <div className="bg-emerald-950/65 border border-emerald-900 p-6 rounded-xl text-center space-y-2 max-w-sm mx-auto">
              <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
              <h5 className="text-xs font-bold text-emerald-450 uppercase tracking-widest block">Almost There</h5>
              <p className="text-[11px] text-slate-200">
                Your email app should have opened — press <strong>send</strong> to confirm your subscription to The Sovereign Ledger.
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto text-xs">
              <input
                type="email"
                required
                placeholder="Your premier email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-3 flex-1 focus:outline-none focus:border-blue-400 font-mono font-bold"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition cursor-pointer text-xs uppercase tracking-wider"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}
