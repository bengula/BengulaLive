/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Layout shell: header/nav, footer, market ticker, and the routed page outlet.
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Head } from 'vite-react-ssg';

import { siteConfig } from './data/siteConfig';
import { activeNav } from './sections';
import { organizationJsonLd } from './seo';
import RateTicker from './components/RateTicker';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Redirect legacy hash links (#blog/x, #author/x) to their new paths so
  // anything shared before this change still resolves.
  useEffect(() => {
    const h = window.location.hash;
    if (h.startsWith('#blog/')) navigate('/blog/' + h.slice(6), { replace: true });
    else if (h.startsWith('#author/')) navigate('/authors/' + h.slice(8), { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to top on every route change + close the mobile menu.
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between selection:bg-blue-600/15 selection:text-blue-900">

      {/* Site-wide structured data. */}
      <Head>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      </Head>

      {/* Sovereign Market Rate Ticker (live FX + editable local rates) */}
      <RateTicker />

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/85 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-sm cursor-pointer transform hover:scale-105 transition overflow-hidden"
                aria-label="Go to Bengula Inc home"
              >
                <img
                  src="/images/ColoredBengulaIncLogo.png"
                  alt="Bengula Inc"
                  className="w-9 h-9 object-contain"
                />
              </Link>
              <div>
                <Link
                  to="/"
                  className="font-extrabold text-sm tracking-widest text-blue-900 hover:text-blue-800 cursor-pointer block leading-none font-sans"
                >
                  {siteConfig.brand.shortName.toUpperCase()}
                </Link>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold mt-0.5">Strategic Finance &amp; Advisory</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1.5 bg-slate-100 p-1 border border-slate-200/65 rounded-xl animate-fadeIn">
              {activeNav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    id={`nav-btn-${item.id}`}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive(item.path)
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-blue-900 hover:bg-white/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-blue-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white p-4 space-y-2 shadow-sm">
            {activeNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer ${
                    isActive(item.path)
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Page Area — routed content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div key={pathname} className="animate-fadeIn">
          <Outlet />
        </div>
      </main>

      {/* Main Footer */}
      <footer className="bg-white border-t border-slate-200/90 py-8 text-xs text-slate-500 font-normal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <img
                  src="/images/GrayBengulaIncLogo.png"
                  alt="Bengula Inc"
                  className="w-10 h-10 object-contain"
                />
                <p className="font-extrabold text-blue-900 text-sm tracking-widest uppercase font-sans">Bengula Inc</p>
              </div>
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
              {activeNav.map((s) => (
                <Link key={s.id} to={s.path} className="hover:text-blue-900 cursor-pointer">
                  {s.footerLabel ?? s.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 text-[10px] text-slate-400 space-y-2 text-center md:text-left leading-normal">
            <p>
              Copyright {new Date().getFullYear()} Bengula Inc. All Rights Reserved. Private holding platform. {siteConfig.contact.email}
            </p>
            <p>
              Disclaimer: The analytical calculators, projections, and educational tools provided on this site are built exclusively for academic, informational, and general financial literacy education. They do not constitute formal, binding regulated financial, legal, or licensed brokerage counsel. Any regulated banking product is opened and finalised directly with the licensed bank or provider that issues it.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
