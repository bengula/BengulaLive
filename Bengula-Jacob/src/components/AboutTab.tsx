/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Award, ShieldCheck, Milestone, ArrowRight, Star } from 'lucide-react';
import { images } from '../data/media';
import Seo from '../seo';

export default function AboutTab() {
  const navigate = useNavigate();
  return (
    <div id="about-tab-root" className="space-y-12 animate-fadeIn">
      <Seo
        title="About Bengula Inc | Founder & Two-Pillar Philosophy"
        description="Meet Bengula Jacob and the firm behind Bengula Inc — how content creation and investment advisory work together to scale businesses and grow wealth."
        path="/about"
      />
      {/* Bio Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Founder profile frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group w-full max-w-sm">
            {/* Soft decorative background rings */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-800 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-35 transition duration-1000 group-hover:duration-200"></div>
            {/* Visual Profile Panel */}
            <div className="relative glass-strong rounded-2xl p-6 md:p-8 text-center space-y-4">
              <img
                src="/images/jacob.jpg"
                alt="Bengula Jacob"
                loading="lazy"
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Bengula Jacob</h3>
                <p className="text-sm text-violet-800 font-extrabold mt-1">Relationship Manager, Absa Bank (Malindi Branch)</p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Founder, Bengula Inc</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 font-mono border border-slate-100 text-left space-y-2">
                <div className="flex justify-between">
                  <span>HQ Location:</span>
                  <span className="text-slate-800 font-semibold">Malindi, Kenya</span>
                </div>
                <div className="flex justify-between">
                  <span>Credentials:</span>
                  <span className="text-slate-800 font-semibold">B.Sc. Math & Econ (IT)</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialties:</span>
                  <span className="text-slate-800 font-semibold">Bonds, Syndicated Real Estate</span>
                </div>
              </div>
              
              <div className="flex justify-center gap-2 items-center text-xs text-amber-800 bg-amber-50 py-1.5 px-3 border border-amber-200/55 rounded-lg font-bold">
                <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                <span className="tracking-wider uppercase">Accredited RM Representative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative bio details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-extrabold text-violet-700 uppercase tracking-widest block">Executive Profile</span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Who is Bengula Jacob?</h1>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
            I currently operate as a <strong>Relationship Manager at Absa Bank's Malindi branch</strong>, where I manage and deepen relationships with a portfolio of over 5,000 retail and high-profile clients, ensuring AML/KYC/CDD compliance under CBK guidelines. I hold a B.Sc. in Mathematics and Economics with IT from Maseno University (2014-2017).
          </p>
          
          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl space-y-2 text-xs">
            <h3 className="font-bold text-violet-800 font-sans uppercase tracking-widest text-[10px]">Bengula Inc Mission & Vision</h3>
            <p className="text-slate-600 leading-relaxed font-normal">
              Founded in 2014, <strong>Bengula Inc</strong> has been helping customers scale their businesses through data-driven content creation and digital growth strategy. We also help individuals and organizations make wise, calculated investments in sovereign debt, unit trusts, and alternative assets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="glass-card p-4 rounded-xl space-y-1.5">
              <ShieldCheck className="w-5 h-5 text-violet-800" />
              <p className="text-sm font-bold text-slate-800">Business Scaling & Content</p>
              <p className="text-xs text-slate-500">Helping businesses achieve organic growth and high visibility via SEO-optimized content creation, copywriting, and digital tools.</p>
            </div>
            <div className="glass-card p-4 rounded-xl space-y-1.5">
              <User className="w-5 h-5 text-violet-800" />
              <p className="text-sm font-bold text-slate-800">Wise Investment Advisory</p>
              <p className="text-xs text-slate-500">Advising individuals and organizations on secure capital placement, bond laddering, MMF allocation, and risk management.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs font-extrabold text-violet-700 uppercase tracking-widest block">Foundational Beliefs</span>
          <h3 className="text-2xl font-bold text-slate-950">Our Core Values</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Integrity First",
              desc: "Absolute compliance and ethical clarity. We preserve clear boundaries between formal regulated banking and independent holdings."
            },
            {
              title: "Financial Literacy",
              desc: "True wealth starts with education. We build trust by clarifying complex financial yield mechanics into easy, actionable rules."
            },
            {
              title: "Continuous Innovation",
              desc: "Embracing automation, AI-driven portfolio matching, and modern digital portals (like DhowCSD) to optimize returns."
            },
            {
              title: "Sustainable Wealth",
              desc: "Chasing reliable long-term double-digit cash flows rather than volatile, high-risk, or speculative get-rich-quick vectors."
            }
          ].map((val, idx) => (
            <div key={idx} className="glass-card rounded-xl p-5 space-y-2 border-t-4 border-t-violet-700">
              <h4 className="font-bold text-slate-950 text-sm">{val.title}</h4>
              <p className="text-xs text-slate-500 leading-normal">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bengula Inc Vision Card */}
      <div className="bg-violet-950 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden shadow-md">
        <img
          src={images.aboutBuilding}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-violet-950/90 to-violet-950/60"></div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="relative flex items-center gap-3">
          <div className="bg-violet-800/50 p-2.5 rounded-xl border border-violet-700">
            <Award className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">About Bengula Inc</h3>
            <p className="text-xs text-violet-200 font-medium">Founded in 2014 · Scaling Content & Wise Investments</p>
          </div>
        </div>
        <p className="relative text-violet-100 text-sm leading-relaxed font-normal font-sans">
          Founded in 2014, <strong>Bengula Inc</strong> has spent over a decade helping businesses scale through premium, data-driven content creation and high-impact digital strategy. In parallel, we empower individuals and organizations to make wise investments in the Kenyan financial landscape, specializing in Treasury Bonds, bills, Money Market Funds, and structured private wealth solutions.
        </p>
      </div>

      {/* Media & Recognition Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-extrabold text-violet-700 uppercase tracking-widest block">Global Resonance</span>
          <h3 className="text-2xl font-bold text-slate-950 leading-snug">Media & Recognition</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Bengula's professional insights on sovereign debt coupon laddering and SME growth strategy are regularly featured across leading channels:
          </p>
          <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-xl text-xs text-amber-950 space-y-1">
            <span className="font-bold block">🎙️ Speaking Bookings:</span>
            <p className="font-medium text-[11px] text-amber-900">
              Available for corporate pension workshops, university financial literacy summits, and diaspora investment forums. Submit a consultation request via the Contact page.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {[
            {
              type: "Conference Speaking",
              title: "East African Sovereign Debt & Inflation Summit 2025",
              venue: "Radisson Blu, Upper Hill, Nairobi",
              desc: "Delivered a keynote presentation on standardizing CD-ledger access models via mobile portals, simplifying sovereign infrastructure placements for retail investors.",
              blogId: "east-african-sovereign-summit"
            },
            {
              type: "Industry Publication",
              title: "SME Trade Finance & Supply-Chain Optimization in Frontier Markets",
              venue: "East African Chartered Bankers Review, Q1 2026",
              desc: "Analyzed logistical capital bottlenecks for agricultural exporters, showing how private syndicates mitigate high-interest bank overdraft lines.",
              blogId: "sme-trade-finance"
            },
            {
              type: "Media Interview",
              title: "The Future of MMFs & Double-Digit Fixed Yields in Kenya",
              venue: "Kenya Wall Street Broadcast Special",
              desc: "Discussed the CBK's rate movements and compared the compounding advantages of local yield aggregates versus physical property investments.",
              blogId: "future-mmfs-kenya"
            }
          ].map((rec, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(`/blog/${rec.blogId}`)}
              className="glass-card rounded-xl p-4 space-y-1.5 transition cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] bg-violet-50 text-violet-800 border border-violet-100 font-extrabold tracking-wide uppercase px-2.5 py-0.5 rounded-full inline-block font-mono">
                  {rec.type}
                </span>
                <span className="text-[9px] text-violet-800 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-violet-800 transition-colors">{rec.title}</h4>
              <p className="text-[11px] text-slate-500 font-semibold">{rec.venue}</p>
              <p className="text-xs text-slate-500 font-light leading-relaxed pt-1">{rec.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-6">
        <div className="space-y-2 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start items-center gap-2 text-xs text-violet-700 font-extrabold tracking-wider uppercase">
            <Milestone className="w-4 h-4" />
            <span>Our Chronology</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-950">Professional Journey & Milestones</h3>
        </div>

        {/* Timeline Line items */}
        <div className="relative border-l border-slate-200 pl-6 ml-4 space-y-8">
          {[
            {
              year: "2014",
              title: "Founding of Bengula Inc & Academic Launch",
              company: "Bengula Inc / Maseno University (Kisumu, Kenya)",
              desc: "Founded Bengula Inc to help customers scale their businesses through data-driven content creation. Enrolled for a B.Sc. in Mathematics and Economics with IT."
            },
            {
              year: "2018",
              title: "Economic Analyst",
              company: "County Government of Bungoma",
              desc: "Conducted public economic research, authored feasibility studies, and formulated budget analyses and funding proposals."
            },
            {
              year: "2020 - 2022",
              title: "Direct Sales Representative",
              company: "National Bank of Kenya (NBK) (Mombasa)",
              desc: "Onboarded and managed retail accounts, retail products, and Islamic Finance (Amanah) solutions, ensuring full AML/KYC/CDD compliance."
            },
            {
              year: "2025",
              title: "Sales Associate",
              company: "Platinum Credit Limited (Malindi)",
              desc: "Managed a portfolio of active lending clients, coordinating consumer credit lifecycle evaluations and risk profiling."
            },
            {
              year: "2025 - Present",
              title: "Relationship Manager",
              company: "Absa Bank Kenya (Malindi Branch)",
              desc: "Overseeing end-to-end relationships for over 5,000 retail and premium client portfolios, executing data-driven deep-selling and portfolio optimization."
            }
          ].map((milestone, i) => (
            <div key={i} className="relative">
              {/* Dot decoration */}
              <span className="absolute -left-9 top-1.5 bg-white border-2 border-violet-800 rounded-full w-4 h-4 z-10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-violet-800 rounded-full"></span>
              </span>
              <div className="space-y-1">
                <span className="text-[10px] bg-violet-50 text-violet-800 border border-violet-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                  {milestone.year}
                </span>
                <h4 className="text-base font-bold text-slate-800 pt-1">{milestone.title}</h4>
                <p className="text-xs text-slate-500 font-medium">{milestone.company}</p>
                <p className="text-xs text-slate-500 leading-relaxed pt-1.5">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

