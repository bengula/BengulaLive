/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { portfolioItemsList } from '../data/portfolioData';
import { Award, Layers, TrendingUp, Building, Code2, MapPin, Calendar, Compass, ArrowUpRight, HelpCircle } from 'lucide-react';

export default function PortfolioTab({ onNavigateToBlog }: { onNavigateToBlog: (id: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Featured Projects' | 'Business Ventures' | 'Case Studies'>('All');

  const filteredItems = activeCategory === 'All'
    ? portfolioItemsList
    : portfolioItemsList.filter(item => item.category === activeCategory);

  const categories: ('All' | 'Featured Projects' | 'Business Ventures' | 'Case Studies')[] = [
    'All', 'Featured Projects', 'Business Ventures', 'Case Studies'
  ];

  return (
    <div id="portfolio-tab-root" className="space-y-8 animate-fadeIn">
      
      {/* Tab Header details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-205 pb-6">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block font-extrabold font-sans">Executive Placements</span>
          <h2 className="text-2xl font-bold text-slate-900">Portfolio & Case Studies</h2>
          <p className="text-slate-500 text-xs">
            A review of structured bond campaigns, corporate consulting projects, and seed investments conducted by Jacob Bengula and Bengula Inc.
          </p>
        </div>

        {/* Category Pill Filters (horizontal scrolling on mobile) */}
        <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-blue-900 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => item.blogId && onNavigateToBlog(item.blogId)}
            className={`bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-900/40 hover:shadow-md transition duration-300 relative group overflow-hidden shadow-xs ${
              item.blogId ? 'cursor-pointer' : ''
            }`}
          >
            {/* Top Row: category & icon */}
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-1.5">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] bg-blue-50 text-blue-900 border border-blue-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                    {item.category}
                  </span>
                  {item.riskProfile && (
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider font-mono ${
                      item.riskProfile === 'Low' ? 'bg-emerald-50 text-emerald-800 border border-emerald-150' :
                      item.riskProfile === 'Moderate' ? 'bg-amber-50 text-amber-800 border border-amber-150' :
                      'bg-red-50 text-red-800 border border-red-150'
                    }`}>
                      {item.riskProfile} Risk
                    </span>
                  )}
                </div>

                <div className="text-slate-400 group-hover:text-blue-900 transition-colors duration-300">
                  {item.category === "Featured Projects" && <Award className="w-5 h-5 text-blue-900" />}
                  {item.category === "Business Ventures" && <Layers className="w-5 h-5 text-indigo-600" />}
                  {item.category === "Case Studies" && <TrendingUp className="w-5 h-5 text-emerald-600" />}
                </div>
              </div>

              {/* Title & Narrative */}
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors duration-200">
                    {item.title}
                  </h3>
                  {item.blogId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToBlog(item.blogId!);
                      }}
                      className="text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-100 px-2 py-0.5 rounded font-extrabold flex items-center gap-0.5 cursor-pointer transition shrink-0 font-sans"
                    >
                      <span>Analysis</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-blue-900" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-normal font-normal">
                  {item.description}
                </p>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs italic text-slate-650 border-l-2 border-l-amber-500">
                  <span className="font-bold text-blue-900 not-italic uppercase text-[9px] block mb-0.5">Tactical Outcome</span>
                  {item.impact}
                </div>
              </div>
            </div>

            {/* Bottom Row: metadata & active metrics */}
            <div className="space-y-4 pt-6 mt-6 border-t border-slate-100">
              {/* Context row */}
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.year}</span>
                </div>
              </div>

              {/* Metrics blocks */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-inner">
                {item.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold leading-none">{metric.label}</span>
                    <span className="text-xs font-bold font-mono text-emerald-700 block mt-1.5 leading-none">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Footer reassurance callout */}
      <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-100 text-xs text-blue-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <span className="font-semibold text-center sm:text-left">To coordinate custom placement pipelines or syndicate investments via Absa Securities or Bengula Inc desks:</span>
        <button
          onClick={() => {
            const btn = document.getElementById('nav-btn-services');
            if (btn) btn.click();
          }}
          className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-xl font-bold text-[11px] shrink-0 transition-all uppercase tracking-wider cursor-pointer shadow-xs"
        >
          Book Strategic Briefing
        </button>
      </div>

    </div>
  );
}
