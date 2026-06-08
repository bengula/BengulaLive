/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Mail, Phone, Globe, ShieldCheck, ChevronRight } from 'lucide-react';
import { siteConfig, telHref, whatsappHref } from '../data/siteConfig';
import Seo from '../seo';

export default function ContactTab() {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactBody, setContactBody] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Static-host friendly: open a pre-filled email instead of POSTing to a server.
    const subject = contactSubject || `Website enquiry from ${contactName}`;
    const body = [
      `Name:  ${contactName}`,
      `Email: ${contactEmail}`,
      ``,
      contactBody,
      ``,
      `Sent from the Bengula Jacob website.`,
    ].join('\n');

    window.location.href =
      `mailto:${siteConfig.contact.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactSubject('');
    setContactBody('');
  };

  return (
    <div id="contact-view" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      <Seo
        title="Contact Bengula Inc | Book a Consultation"
        description="Get in touch with Bengula Inc for banking, finance, and digital-growth advisory. Book a confidential consultation or reach us by email, phone, or WhatsApp."
        path="/contact"
      />

      {/* Left Column: Coordinates */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-violet-700 uppercase tracking-widest block font-bold">Confidential Desk</span>
          <h2 className="text-2xl font-bold text-slate-900">Contact Bengula Jacob</h2>
          <p className="text-slate-600 text-xs">
            Please route questions concerning corporate advisor structures, bulk treasury placements, or Bengula Inc syndications directly.
          </p>
        </div>

        {/* Address Cards */}
        <div className="glass-strong rounded-2xl p-6 space-y-5">
          <div className="flex gap-4">
            <div className="bg-blue-50 text-blue-900 p-2.5 rounded-xl border border-blue-100 w-fit shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Location</h4>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                {siteConfig.contact.location}
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-t border-slate-100 pt-4">
            <div className="bg-blue-50 text-blue-900 p-2.5 rounded-xl border border-blue-100 w-fit shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Email</h4>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-xs text-slate-500 font-mono mt-1 leading-normal hover:text-blue-900 transition-colors block">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <div className="flex gap-4 border-t border-slate-100 pt-4">
            <div className="bg-blue-50 text-blue-900 p-2.5 rounded-xl border border-blue-100 w-fit shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Phone / WhatsApp</h4>
              <div className="text-xs text-slate-500 font-mono mt-1 leading-normal flex flex-wrap gap-x-3 gap-y-1">
                <a href={telHref(siteConfig.contact.phone)} className="hover:text-blue-900 transition-colors">
                  {siteConfig.contact.phone}
                </a>
                <a href={whatsappHref(siteConfig.contact.whatsapp, 'Hello Bengula Jacob, I have an enquiry from your website.')} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-600 transition-colors font-bold">
                  WhatsApp →
                </a>
              </div>
            </div>
          </div>

          {siteConfig.contact.website && (
            <div className="flex gap-4 border-t border-slate-100 pt-4">
              <div className="bg-blue-50 text-blue-900 p-2.5 rounded-xl border border-blue-100 w-fit shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Website</h4>
                <a href={siteConfig.contact.website} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 font-mono mt-1 leading-normal hover:text-blue-900 transition-colors block">
                  {siteConfig.contact.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Compliance separation banner */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 text-[11px] p-4 rounded-xl leading-relaxed flex gap-2 shadow-xs">
          <span className="font-bold uppercase tracking-wider text-xs block leading-none shrink-0 mt-0.5">⚠️</span>
          <div>
            <span className="font-extrabold block mb-0.5 text-xs text-amber-900">A Note on How We Work:</span>
            Bengula Inc is an independent advisory firm, not a bank. We help you choose and prepare for banking and capital products; the products themselves are opened, regulated, and finalised directly with the licensed bank or provider on their official channels.
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Form panel */}
      <div className="lg:col-span-7 glass-strong rounded-2xl p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-900" />
            E-Desk Messaging Terminal
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Complete your transmission below for direct receipt by our portfolio administration.
          </p>
        </div>

        {contactSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3 py-10">
            <div className="w-12 h-12 bg-emerald-100/60 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200/80 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="text-sm md:text-base font-bold text-emerald-900">Email Ready to Send</h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-normal">
              Your email app should have opened with your message pre-filled — just press <strong>send</strong>. If nothing opened, email <strong>{siteConfig.contact.email}</strong> directly.
            </p>
            <button
              onClick={() => setContactSuccess(false)}
              className="text-xs text-blue-900 font-bold hover:text-blue-800 transition cursor-pointer pt-2 underline decoration-blue-900/40"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs text-slate-700 font-semibold">Your Name</label>
                <input
                  id="input-contact-name"
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Grace Wambui"
                  className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-900 focus:bg-white focus:ring-1 focus:ring-blue-900 transition-colors text-sm font-medium"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs text-slate-700 font-semibold">Email Address</label>
                <input
                  id="input-contact-email"
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. gwambui@domain.co.ke"
                  className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-900 focus:bg-white focus:ring-1 focus:ring-blue-900 transition-colors text-sm font-mono"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="text-xs text-slate-700 font-semibold">Subject Matter</label>
              <input
                id="input-contact-subject"
                type="text"
                required
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="e.g. Diaspora Treasury Bond Sourcing Consultation"
                className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-900 focus:bg-white focus:ring-1 focus:ring-blue-900 transition-colors text-sm font-medium"
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-xs text-slate-700 font-semibold">Message Narrative</label>
              <textarea
                id="input-contact-body"
                required
                rows={5}
                value={contactBody}
                onChange={(e) => setContactBody(e.target.value)}
                placeholder="Detail your objectives, assets profile, or advisory questions confidentially."
                className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-900 focus:bg-white focus:ring-1 focus:ring-blue-900 transition-colors text-sm"
              />
            </div>

            {/* Submit */}
            <button
              id="submit-contact-form"
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-xl transition flex justify-center items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Transmit confidential query</span>
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
