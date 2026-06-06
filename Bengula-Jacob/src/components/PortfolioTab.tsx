/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Seo from '../seo';
import { portfolioItemsList } from '../data/portfolioData';
import { categoryBadgeStyles, portfolioCategoryFilters, portfolioItemTags, type PortfolioCategory, type PortfolioCategoryFilter, riskBadgeStyles } from '../data/portfolioTags';
import { Award, Layers, TrendingUp, Building, Code2, MapPin, Calendar, Compass, ArrowUpRight, HelpCircle } from 'lucide-react';

export default function PortfolioTab() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<PortfolioCategoryFilter>('All');

  const filteredItems = activeCategory === 'All'
    ? portfolioItemsList
    : portfolioItemsList.filter(item => item.category === activeCategory);

  const categoryIcons: Record<PortfolioCategory, React.ReactNode> = {
    [portfolioItemTags.project]: <Award className="w-5 h-5 text-violet-800" />,
    [portfolioItemTags.businessVenture]: <Layers className="w-5 h-5 text-violet-600" />,
    [portfolioItemTags.caseStudy]: <TrendingUp className="w-5 h-5 text-amber-600" />,
  };

  return (
    <div id="portfolio-tab-root" className="space-y-8 animate-fadeIn">
      <Seo
        title="Portfolio & Case Studies | Bengula Inc"
        description="Selected Bengula Inc work across both pillars — data, SEO, and digital growth projects alongside finance, banking, and investment engagements in East Africa."
        path="/portfolio"
      />
      
      {/* Tab Header details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-violet-700 uppercase tracking-widest block font-extrabold font-sans">Selected Work</span>
          <h1 className="text-2xl font-bold text-slate-900">Portfolio & Case Studies</h1>
          <p className="text-slate-500 text-xs">
            Work across both Bengula Inc pillars — data, SEO, and digital growth projects alongside finance, banking, and investment engagements.
          </p>
        </div>

        {/* Category Pill Filters (horizontal scrolling on mobile) */}
        <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto pb-1">
          {portfolioCategoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-violet-800 text-white border-violet-800'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-violet-800 hover:bg-slate-200'
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
            onClick={() => item.blogId && navigate(`/blog/${item.blogId}`)}
            className={`bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-violet-800/40 hover:shadow-md transition duration-300 relative group overflow-hidden shadow-xs ${
              item.blogId ? 'cursor-pointer' : ''
            }`}
          >
            {/* Top Row: category & icon */}
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-1.5">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono ${categoryBadgeStyles[item.category]}`}>
                    {item.category}
                  </span>
                  {item.riskProfile && (
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider font-mono ${riskBadgeStyles[item.riskProfile]}`}>
                      {item.riskProfile} Risk
                    </span>
                  )}
                </div>

                <div className="text-slate-400 group-hover:text-violet-800 transition-colors duration-300">
                  {categoryIcons[item.category]}
                </div>
              </div>

              {/* Title & Narrative */}
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-800 transition-colors duration-200">
                    {item.title}
                  </h3>
                  {item.blogId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/blog/${item.blogId!}`);
                      }}
                      className="text-[10px] bg-violet-50 hover:bg-violet-100 text-violet-800 border border-violet-100 px-2 py-0.5 rounded font-extrabold flex items-center gap-0.5 cursor-pointer transition shrink-0 font-sans"
                    >
                      <span>Analysis</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-violet-800" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-normal font-normal">
                  {item.description}
                </p>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs italic text-slate-600 border-l-2 border-l-amber-500">
                  <span className="font-bold text-violet-800 not-italic uppercase text-[9px] block mb-0.5">Tactical Outcome</span>
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
      <div className="bg-violet-50/70 rounded-xl p-4 border border-violet-100 text-xs text-violet-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <span className="font-semibold text-center sm:text-left">To plan a growth engagement, banking introduction, or co-investment with the Bengula Inc desk:</span>
        <button
          onClick={() => {
            const btn = document.getElementById('nav-btn-services');
            if (btn) btn.click();
          }}
          className="bg-violet-800 hover:bg-violet-700 text-white py-2 px-4 rounded-xl font-bold text-[11px] shrink-0 transition-all uppercase tracking-wider cursor-pointer shadow-xs"
        >
          Book Strategic Briefing
        </button>
      </div>

    </div>
  );
}

