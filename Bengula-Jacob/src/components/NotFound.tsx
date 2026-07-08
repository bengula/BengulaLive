/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Catch-all 404 page. The Cloudflare Worker serves index.html for every
 * unknown path (single-page-application fallback), so without this route a
 * mistyped or stale URL rendered the site shell with an empty page.
 */

import React from 'react';
import { BookOpen, Compass, Home, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../seo';

const suggestions = [
  { to: '/', label: 'Back to Home', desc: 'Start from the main decision desk.', icon: Home },
  { to: '/blog', label: 'Research Library', desc: 'Browse practical finance and growth notes.', icon: BookOpen },
  { to: '/services', label: 'Advisory Services', desc: 'See the banking and growth tracks.', icon: Compass },
  { to: '/contact', label: 'Contact Us', desc: 'Tell us what you were looking for.', icon: MessageCircle },
];

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto text-center py-10 md:py-16 space-y-8 animate-fadeIn">
      <Seo
        title="Page Not Found | Bengula Inc"
        description="The page you were looking for does not exist or has moved. Explore the Bengula Inc research library, advisory services, or contact the team."
        path="/404"
      />

      <div className="space-y-3">
        <span className="text-xs font-extrabold text-violet-700 uppercase tracking-widest">Error 404</span>
        <h1 className="editorial-heading text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">
          This Page Does Not Exist
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          The link may be mistyped, or the page may have moved. Here are a few useful places to continue from.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        {suggestions.map((item) => (
          <Link
            key={item.to + item.label}
            to={item.to}
            className="glass-card rounded-xl p-5 flex items-start gap-4 group"
          >
            <span className="bg-violet-50 text-violet-800 border border-violet-100 p-2.5 rounded-lg shrink-0 group-hover:bg-violet-700 group-hover:text-white transition duration-300">
              <item.icon className="w-5 h-5" />
            </span>
            <span>
              <span className="text-sm font-bold text-slate-900 group-hover:text-violet-800 transition-colors block">
                {item.label}
              </span>
              <span className="text-xs text-slate-500 block mt-1 leading-normal">{item.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
