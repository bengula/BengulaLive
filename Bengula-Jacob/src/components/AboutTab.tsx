/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, Briefcase, Award, ShieldCheck, Milestone, ArrowRight, Star } from 'lucide-react';
import { images } from '../data/media';

export default function AboutTab({ onNavigateToBlog }: { onNavigateToBlog: (blogId: string) => void }) {
  return (
    <div id="about-tab-root" className="space-y-12 animate-fadeIn">
      {/* Bio Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Placeholder Avatar / Profile Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group w-full max-w-sm">
            {/* Soft decorative background rings */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-900 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-35 transition duration-1000 group-hover:duration-200"></div>
            {/* Visual Profile Panel */}
            <div className="relative bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-center space-y-4 shadow-md">
              <img
                src="/images/jacob.jpg"
                alt="Jacob Bengula"
                loading="lazy"
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Jacob Bengula</h3>
                <p className="text-sm text-blue-900 font-extrabold mt-1">Relationship Manager, Absa Kenya</p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Founder, Bengula Inc</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 font-mono border border-slate-100 text-left space-y-2">
                <div className="flex justify-between">
                  <span>HQ Location:</span>
                  <span className="text-slate-800 font-semibold">Nairobi, Kenya</span>
                </div>
                <div className="flex justify-between">
                  <span>Credentials:</span>
                  <span className="text-slate-800 font-semibold">CISB, Wealth Advisory</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialties:</span>
                  <span className="text-slate-800 font-semibold">Bonds, Syndicated Real Estate</span>
                </div>
              </div>
              
              <div className="flex justify-center gap-2 items-center text-xs text-amber-850 bg-amber-50 py-1.5 px-3 border border-amber-200/55 rounded-lg font-bold">
                <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                <span className="tracking-wider uppercase">Accredited RM Representative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative bio details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block font-extrabold">Executive Profile</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Who is Bengula Jacob?</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
            I currently operate as an active <strong>Senior Relationship Manager (RM) for Absa Kenya</strong>, overseeing premium corporate portfolios, investment lines, and bulk treasury allocations. My career journey centers on helping corporate entities and high-net-worth clients navigate complex treasury bid options, trade financing, and sovereign bond allocations.
          </p>
          
          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl space-y-2 text-xs">
            <h3 className="font-bold text-blue-900 font-sans uppercase tracking-widest text-[10px]">Mission & Vision</h3>
            <p className="text-slate-600 leading-relaxed font-normal">
              <strong>Mission:</strong> To democratize high-grade financial education, closing the gap between institutional banking and individual wealth, making alternative compound assets safe and accessible.
              <br />
              <strong className="mt-1.5 block">Vision:</strong> To serve as East Africa's premier digital bridging office, helping over 50,000 local and diaspora professionals build sustainable wealth through structured sovereign portfolios and private investment syndicates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-1.5 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-blue-900" />
              <p className="text-sm font-bold text-slate-800">Banking Experience</p>
              <p className="text-xs text-slate-500">Over a decade of core commercial banking experience, managing liquid assets, structured debt, and relationship management lines.</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-1.5 shadow-xs">
              <User className="w-5 h-5 text-blue-900" />
              <p className="text-sm font-bold text-slate-800">Tech & Finance Interests</p>
              <p className="text-xs text-slate-505">Leveraging Artificial Intelligence, automated credit risk evaluation, and modern digital portals (like DhowCSD) to optimize returns.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block font-extrabold">Foundational Beliefs</span>
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
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-xs border-t-4 border-t-blue-900">
              <h4 className="font-bold text-slate-950 text-sm">{val.title}</h4>
              <p className="text-xs text-slate-500 leading-normal">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bengula Inc Vision Card */}
      <div className="bg-blue-950 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden shadow-md">
        <img
          src={images.aboutBuilding}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/90 to-blue-950/60"></div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="relative flex items-center gap-3">
          <div className="bg-blue-900/50 p-2.5 rounded-xl border border-blue-800">
            <Award className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">About Bengula Inc</h3>
            <p className="text-xs text-blue-200 font-medium">Private Alternative Holding & Advisory</p>
          </div>
        </div>
        <p className="relative text-blue-100 text-sm leading-relaxed font-normal font-sans">
          <strong>Bengula Inc</strong> is an independent advisory and alternative private assets holding corp. We observe that while active professional careers provide essential baseline capital, sustainable wealth multiplication requires systematic co-investment syndicates. Bengula Inc structures private placements in real estate land-banking, export logistics support, and SME venture funding, ensuring your passive reserves outpace inflation safely.
        </p>
      </div>

      {/* Media & Recognition Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block font-extrabold">Global Resonance</span>
          <h3 className="text-2xl font-bold text-slate-950 leading-snug">Media & Recognition</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Jacob's professional insights on sovereign debt coupon laddering and SME growth strategy are regularly featured across leading channels:
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
              onClick={() => onNavigateToBlog(rec.blogId)}
              className="bg-white border border-slate-200 rounded-xl p-4 space-y-1.5 shadow-xs hover:border-blue-900/40 hover:shadow-xs transition cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] bg-blue-50 text-blue-900 border border-blue-100 font-extrabold tracking-wide uppercase px-2.5 py-0.5 rounded-full inline-block font-mono">
                  {rec.type}
                </span>
                <span className="text-[9px] text-blue-900 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-900 transition-colors">{rec.title}</h4>
              <p className="text-[11px] text-slate-500 font-semibold">{rec.venue}</p>
              <p className="text-xs text-slate-500 font-light leading-relaxed pt-1">{rec.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-6">
        <div className="space-y-2 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start items-center gap-2 text-xs text-blue-900 font-extrabold tracking-wider uppercase">
            <Milestone className="w-4 h-4" />
            <span>Our Chronology</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-950">Professional Journey & Milestones</h3>
        </div>

        {/* Timeline Line items */}
        <div className="relative border-l border-slate-200 pl-6 ml-4 space-y-8">
          {[
            {
              year: "2018 - 2020",
              title: "Early Foundations & Portfolio Support",
              company: "Commercial Bank Environment (Nairobi)",
              desc: "Engineered baseline investment reviews and structured private savings frameworks for retail clients, mastering the logistics of CDS Accounts and local money markets."
            },
            {
              year: "2021 - Present",
              title: "Senior Relationship Manager (RM)",
              company: "Absa Bank Kenya PLC",
              desc: "Managing high-profile corporate deposits, commercial credit facilities, and liquidity structures. Leading capital placement strategies in double-digit yield Treasury Bond auctions (now averaging 15%+ APR)."
            },
            {
              year: "2023",
              title: "Establishment of Bengula Inc",
              company: "Private Alternative Syndicate",
              desc: "Founded Bengula Inc to support private wealth consulting. Created vetted co-investment frameworks in high-yield syndicates, addressing a lack of reliable local advisory desks."
            },
            {
              year: "2025",
              title: "Digital Access Initiative",
              company: "Financial Education & Digital Assistance Portal",
              desc: "Created the digital advisory platform to democratize corporate bond knowledge, launching interactive tools to simplify compound calculation rules for local and diaspora Kenyans."
            }
          ].map((milestone, i) => (
            <div key={i} className="relative">
              {/* Dot decoration */}
              <span className="absolute -left-9 top-1.5 bg-white border-2 border-blue-900 rounded-full w-4 h-4 z-10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-blue-900 rounded-full"></span>
              </span>
              <div className="space-y-1">
                <span className="text-[10px] bg-blue-50 text-blue-900 border border-blue-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
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
