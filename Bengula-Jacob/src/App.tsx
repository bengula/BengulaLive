/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Layout shell: header/nav, footer, market ticker, and the routed page outlet.
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp, ChevronDown, Menu, MessageCircle, X } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Head } from 'vite-react-ssg';

import { siteConfig, whatsappHref } from './data/siteConfig';
import { activeNav } from './sections';
import { organizationJsonLd } from './seo';
import RateTicker from './components/RateTicker';
import { trackConversion } from './utils/conversion';

/** Floating "back to top" control; appears once the page is meaningfully scrolled. */
function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed left-4 bottom-4 md:left-6 md:bottom-6 z-50 glass-strong text-violet-800 hover:text-violet-950 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

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

  // Scroll to top on every route change + close the mobile menu. The jump is
  // instant on purpose: the global `scroll-behavior: smooth` would otherwise
  // animate from the old page's scroll position, making navigation feel slow.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setMobileMenuOpen(false);
  }, [pathname]);

  // Let Escape dismiss the mobile menu.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(path + '/');

  const primaryNav = activeNav.filter((item) =>
    ['home', 'services', 'tools', 'portfolio', 'blog', 'contact'].includes(item.id)
  );
  const exploreNav = activeNav.filter((item) =>
    ['about', 'investments', 'ai-coach', 'authors', 'faq'].includes(item.id)
  );

  return (
    <div className="site-shell relative min-h-screen text-slate-800 font-sans flex flex-col justify-between selection:bg-violet-600/15 selection:text-violet-900">

      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Animated aurora backdrop — gives the frosted-glass surfaces light to refract. */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob a"></div>
        <div className="aurora-blob b"></div>
        <div className="aurora-blob c"></div>
      </div>

      {/* Everything sits above the backdrop. */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">

      {/* Site-wide structured data. */}
      <Head>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      </Head>

      {/* Sovereign Market Rate Ticker (live FX + editable local rates) */}
      <RateTicker />

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/60 shadow-sm">
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
                  className="font-extrabold text-sm tracking-widest text-violet-800 hover:text-violet-900 cursor-pointer block leading-none font-sans"
                >
                  {siteConfig.brand.shortName.toUpperCase()}
                </Link>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold mt-0.5">Strategic Finance &amp; Advisory</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 glass p-1 rounded-xl animate-fadeIn" aria-label="Primary navigation">
              {primaryNav.map((item) => {
                return (
                  <Link
                    key={item.id}
                    id={`nav-btn-${item.id}`}
                    to={item.path}
                    className={`sheen px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center transition-all cursor-pointer ${
                      isActive(item.path)
                        ? 'bg-violet-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-violet-800 hover:bg-white/80'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="nav-more relative">
                <button
                  className={`sheen px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    exploreNav.some((item) => isActive(item.path))
                      ? 'bg-violet-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-violet-800 hover:bg-white/80'
                  }`}
                  aria-haspopup="true"
                >
                  Explore <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="nav-more-menu absolute right-0 top-full pt-2 w-60">
                  <div className="glass-strong rounded-2xl p-2 shadow-2xl shadow-violet-950/15">
                    {exploreNav.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.id} to={item.path} className="flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-bold text-slate-700 hover:bg-white/80 hover:text-violet-900 transition-colors">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-100/80 text-violet-700"><Icon className="h-4 w-4" /></span>
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-violet-800 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-white/60 glass-strong p-4 space-y-2 shadow-sm animate-fadeIn">
            {activeNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer ${
                    isActive(item.path)
                      ? 'bg-violet-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-violet-800 hover:bg-slate-50'
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
      <main id="main-content" className="page-shell flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div key={pathname} className="animate-fadeIn">
          <Outlet />
        </div>
      </main>

      <BackToTopButton />

      <a
        href={whatsappHref(
          siteConfig.contact.whatsapp,
          'Hi Bengula, I found your website and would like a quick fit check for my business challenge.'
        )}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackConversion('whatsapp_click', 'site_floating_button')}
        aria-label="Start a WhatsApp enquiry with Bengula Inc"
        title="Start a WhatsApp enquiry"
        className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-900/25 rounded-full w-13 h-13 flex items-center justify-center transition-transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-emerald-200"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Main Footer */}
      <footer className="glass-strong border-t border-white/60 py-10 md:py-14 text-xs text-slate-500 font-normal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr_1fr] gap-10 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <img
                  src="/images/GrayBengulaIncLogo.png"
                  alt="Bengula Inc"
                  className="w-10 h-10 object-contain"
                />
                <p className="font-extrabold text-violet-800 text-sm tracking-widest uppercase font-sans">Bengula Inc</p>
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
                      className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-violet-700 hover:text-white border border-slate-200 px-2.5 py-1 rounded-full transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="footer-heading">Company</p>
              <div className="mt-4 grid gap-3 font-semibold text-slate-600">
                {primaryNav.slice(1).map((s) => (
                  <Link key={s.id} to={s.path} className="hover:text-violet-800 cursor-pointer">{s.footerLabel ?? s.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="footer-heading">Tools &amp; knowledge</p>
              <div className="mt-4 grid gap-3 font-semibold text-slate-600">
                {exploreNav.map((s) => (
                  <Link key={s.id} to={s.path} className="hover:text-violet-800 cursor-pointer">{s.footerLabel ?? s.label}</Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 text-[10px] text-slate-400 space-y-2 text-center md:text-left leading-normal">
            <p>
              Copyright {new Date().getFullYear()} Bengula Inc. All Rights Reserved. Private holding platform. {siteConfig.contact.email}
            </p>
            <p>
              Disclaimer: The analytical calculators, projections, and educational tools provided on this site are built exclusively for academic, informational, and general financial literacy education. They do not constitute formal, binding regulated financial, legal, or licensed brokerage counsel. Any regulated banking product is opened and finalised directly with the licensed bank or provider that issues it.
            </p>
            <p className="space-x-3">
              <Link to="/disclaimer" className="hover:text-violet-800">Disclaimer</Link>
              <Link to="/privacy" className="hover:text-violet-800">Privacy</Link>
              <Link to="/terms" className="hover:text-violet-800">Terms</Link>
              <Link to="/faq" className="hover:text-violet-800">FAQ</Link>
            </p>
          </div>
        </div>
      </footer>

      </div>
    </div>
  );
}
