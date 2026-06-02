/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { TabId } from './types';
import { siteConfig } from './data/siteConfig';
import { activeSections, SectionContext } from './sections';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeBlogPostId, setActiveBlogPostId] = useState<string | null>(null);

  // Navigate between sections. Landing on the Blog tab resets to the article
  // list (so you don't reopen the last article you happened to read).
  const navigate = (id: TabId) => {
    if (id === 'blog') setActiveBlogPostId(null);
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open a specific article (used by About / Portfolio / Investments links).
  const goToBlogPost = (postId: string) => {
    setActiveBlogPostId(postId);
    setActiveTab('blog');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = `blog/${postId}`;
  };

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#blog/')) {
        const blogId = hash.replace('#blog/', '');
        if (blogId) {
          setActiveBlogPostId(blogId);
          setActiveTab('blog');
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const ctx: SectionContext = { navigate, goToBlogPost, activeBlogPostId, setActiveBlogPostId };

  // Resolve the section to render; fall back to the first section if the
  // active id was removed/disabled in the registry.
  const current = activeSections.find((s) => s.id === activeTab) ?? activeSections[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between selection:bg-blue-600/15 selection:text-blue-900">

      {/* Sovereign Market Rate Ticker */}
      <div className="bg-blue-950 py-1.5 px-4 overflow-hidden relative text-[10px] text-blue-100 font-mono border-b border-blue-900/40">
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          <span className="text-amber-400 font-bold">🇰🇪 Sovereign Rates Ticker:</span>
          <span>MMF Average Yield: <strong className="text-emerald-400">~14.5% APR</strong></span>
          <span>•</span>
          <span>CBK T-Bills (91-Day): <strong className="text-emerald-400">15.82%</strong></span>
          <span>•</span>
          <span>CBK T-Bills (182-Day): <strong className="text-emerald-400">16.35%</strong></span>
          <span>•</span>
          <span>Sovereign IFB 17Yr (Tax-Free): <strong className="text-amber-400">16.85% coupon</strong></span>
          <span>•</span>
          <span>Absa Group Dividend Yield: <strong className="text-emerald-400">~11.5%</strong></span>
          <span>•</span>
          <span>Nairobi Securities Exchange blue-chips: <strong className="text-emerald-400 font-bold">Accumulation Stage</strong></span>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/85 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo / Personal Brand */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => navigate('home')}
                className="w-9 h-9 bg-blue-900 rounded-lg flex items-center justify-center font-black text-white text-base shadow-md cursor-pointer transform hover:scale-105 transition"
              >
                {siteConfig.brand.initials}
              </div>
              <div>
                <span
                  onClick={() => navigate('home')}
                  className="font-extrabold text-sm tracking-widest text-blue-900 hover:text-blue-800 cursor-pointer block leading-none font-sans"
                >
                  {siteConfig.brand.shortName.toUpperCase()}
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold mt-0.5">Absa RM • Bengula Inc Founder</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1.5 bg-slate-100 p-1 border border-slate-200/65 rounded-xl animate-fadeIn">
              {activeSections.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`nav-btn-${item.id}`}
                    onClick={() => navigate(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-blue-900 hover:bg-white/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-blue-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white p-4 space-y-2 shadow-sm">
            {activeSections.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Page Area — rendered from the section registry */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div key={current.id} className="animate-fadeIn">
          {current.render(ctx)}
        </div>
      </main>

      {/* Main Footer */}
      <footer className="bg-white border-t border-slate-200/90 py-8 text-xs text-slate-500 font-normal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="space-y-2">
              <p className="font-extrabold text-blue-900 text-sm tracking-widest uppercase font-sans">Bengula Jacob holdings</p>
              <p className="text-[10px] mt-0.5 text-slate-500">{siteConfig.brand.tagline}</p>
              {siteConfig.socials.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1">
                  {siteConfig.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-blue-900 hover:text-white border border-slate-200 px-2.5 py-1 rounded-full transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 font-semibold text-slate-600">
              {activeSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigate(s.id)}
                  className="hover:text-blue-900 cursor-pointer"
                >
                  {s.footerLabel ?? s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 text-[10px] text-slate-400 space-y-2 text-center md:text-left leading-normal">
            <p>
              © {new Date().getFullYear()} Bengula Jacob / Bengula Inc. All Rights Reserved. Private holding platform. {siteConfig.contact.email}
            </p>
            <p>
              Disclaimer: The analytical calculators, projections, and educational tools provided on this site are built exclusively for academic, informational, and general financial literacy education. They do not constitute formal, binding regulated financial, legal, or licensed brokerage counsel. Formal commercial banking requests must be finalized on official channels at Absa Bank Kenya key locations.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
