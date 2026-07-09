/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Mail, Phone, Globe, ShieldCheck, ChevronRight, MessageCircle, CalendarCheck } from 'lucide-react';
import { siteConfig, telHref, whatsappHref } from '../data/siteConfig';
import Seo from '../seo';
import { openMailto } from '../utils/mailto';
import { trackConversion } from '../utils/conversion';

export default function ContactTab() {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactBody, setContactBody] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Static-host friendly: open a pre-filled email instead of POSTing to a server.
    openMailto(siteConfig.contact.email, contactSubject || `Website enquiry from ${contactName}`, [
      `Name:  ${contactName}`,
      `Email: ${contactEmail}`,
      ``,
      contactBody,
      ``,
      `Sent from the Bengula Jacob website.`,
    ]);
    trackConversion('contact_email_prepare', 'contact_form');

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
          <span className="text-xs font-semibold text-violet-700 uppercase tracking-widest block font-bold">Start a Conversation</span>
          <h1 className="text-2xl font-bold text-slate-900">Tell Us What You Need to Solve</h1>
          <p className="text-slate-600 text-xs">
            Share the challenge in plain language. We will help you identify the most useful next step.
          </p>
          <a
            href={whatsappHref(siteConfig.contact.whatsapp, 'Hi Bengula, I found your website and would like help with: ')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('whatsapp_click', 'contact_primary')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-3 rounded-lg shadow-md transition"
          >
            <MessageCircle className="w-4 h-4" />
            Start on WhatsApp
          </a>
        </div>

        {/* Address Cards */}
        <div className="glass-strong rounded-2xl p-6 space-y-5">
          <div className="flex gap-4">
            <div className="bg-blue-50 text-blue-900 p-2.5 rounded-xl border border-blue-100 w-fit shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Location</h2>
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
              <h2 className="text-sm font-bold text-slate-800">Email</h2>
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
              <h2 className="text-sm font-bold text-slate-800">Phone / WhatsApp</h2>
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
                <h2 className="text-sm font-bold text-slate-800">Website</h2>
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
          <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-900" />
            Send a Short Enquiry
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Four fields are enough to start. Your email app will open with the message ready to send.
          </p>
        </div>

        {contactSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3 py-10">
            <div className="w-12 h-12 bg-emerald-100/60 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200/80 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-sm md:text-base font-bold text-emerald-900">Email Ready to Send</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-normal">
              Your email app should have opened with your message pre-filled, just press <strong>send</strong>. If nothing opened, email <strong>{siteConfig.contact.email}</strong> directly.
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
                <label htmlFor="input-contact-name" className="text-xs text-slate-700 font-semibold">Your Name</label>
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
                <label htmlFor="input-contact-email" className="text-xs text-slate-700 font-semibold">Email Address</label>
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
              <label htmlFor="input-contact-subject" className="text-xs text-slate-700 font-semibold">What Do You Need Help With?</label>
              <input
                id="input-contact-subject"
                type="text"
                required
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="e.g. Website lead generation or business finance"
                className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-900 focus:bg-white focus:ring-1 focus:ring-blue-900 transition-colors text-sm font-medium"
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label htmlFor="input-contact-body" className="text-xs text-slate-700 font-semibold">Short Message</label>
              <textarea
                id="input-contact-body"
                required
                rows={5}
                value={contactBody}
                onChange={(e) => setContactBody(e.target.value)}
                placeholder="Briefly describe the problem, goal, or decision you are working through."
                className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-900 focus:bg-white focus:ring-1 focus:ring-blue-900 transition-colors text-sm"
              />
            </div>

            {/* Submit */}
            <button
              id="submit-contact-form"
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-xl transition flex justify-center items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Prepare Enquiry Email</span>
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </form>
        )}
      </div>

      {/* Appointment booking (Zoho Calendar slot-booking embed) */}
      <div className="lg:col-span-12 glass-strong rounded-2xl p-6 md:p-8 space-y-5">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-blue-900" />
            Book a Consultation Slot
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Prefer to skip the back-and-forth? Pick an open slot directly in the calendar below and it lands in our diary instantly.
          </p>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white h-[75vh] min-h-[560px]">
          <iframe
            src="https://calendar.zoho.com/zc/view/slot-booking/zz08011220d2b35e0df86cbc8eaaa450bf2cb93df64ec035fc23613ffbfb4c63195611a26b"
            title="Appointment Booking"
            frameBorder={0}
            loading="lazy"
            style={{
              overflow: 'hidden',
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            height="100%"
            width="100%"
          />
        </div>
        <p className="text-[11px] text-slate-400 text-center">
          Calendar not loading?{' '}
          <a
            href="https://calendar.zoho.com/zc/view/slot-booking/zz08011220d2b35e0df86cbc8eaaa450bf2cb93df64ec035fc23613ffbfb4c63195611a26b"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('booking_page_open', 'contact_booking_fallback')}
            className="font-bold text-violet-800 hover:text-violet-700 underline decoration-violet-800/40"
          >
            Open the booking page in a new tab
          </a>
          .
        </p>
      </div>

    </div>
  );
}
