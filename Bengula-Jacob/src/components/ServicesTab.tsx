/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Briefcase, ArrowRight, BookOpen, Layers, Shield, Sparkles, Clock, CheckCircle, Calendar, Send, Landmark } from 'lucide-react';
import Seo from '../seo';
import { ServiceDetail } from '../types';
import { servicesList } from '../data/servicesData';
import { siteConfig } from '../data/siteConfig';

export default function ServicesTab() {
  const [selectedService, setSelectedService] = useState<string>('banking-finance-advisory');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; id?: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const services: ServiceDetail[] = servicesList;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !time) {
      setErrorMsg("Please fill in all mandatory booking inputs.");
      return;
    }

    setErrorMsg('');

    // Static-host friendly: open a pre-filled email to Jacob's work inbox.
    const svcTitle = services.find(s => s.id === selectedService)?.title || selectedService;
    const ref = "BNG-" + Math.random().toString(36).slice(2, 8).toUpperCase();

    const subject = `Consultation request — ${svcTitle} [${ref}]`;
    const body = [
      `Hello Jacob,`,
      ``,
      `I'd like to book a consultation. Details below:`,
      ``,
      `Reference: ${ref}`,
      `Service:   ${svcTitle}`,
      `Name:      ${name}`,
      `Email:     ${email}`,
      `Date:      ${date}`,
      `Time:      ${time} (EAT)`,
      ``,
      `Objectives / notes:`,
      notes || "(none provided)",
      ``,
      `Sent from bengula.co.ke`,
    ].join("\n");

    const mailto =
      `mailto:${siteConfig.contact.workEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    // Trigger the user's email client.
    window.location.href = mailto;

    setBookingResult({ success: true, id: ref });
    setName('');
    setEmail('');
    setDate('');
    setTime('');
    setNotes('');
  };

  const activeSvc = services.find(s => s.id === selectedService) || services[0];

  return (
    <div id="services-tab-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      <Seo
        title="Services | Banking, Finance & Digital Growth Advisory — Bengula Inc"
        description="Book Bengula Inc advisory: banking & business finance, investment & treasury, business consulting, technology & digital growth, and corporate training across East Africa."
        path="/services"
      />
      
      {/* Left Column: List and Detailed Card */}
      <div className="lg:col-span-7 space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-violet-700 uppercase tracking-widest block font-extrabold font-sans">Two Pillars, One Desk</span>
          <h2 className="text-2xl font-bold text-slate-900">How Bengula Inc Helps Your Business</h2>
          <p className="text-slate-500 text-xs">
            Finance & banking advisory and data & digital growth — pick the service that fits where your business is now.
          </p>
        </div>

        {/* Vertical Service list buttons */}
        <div className="space-y-3">
          {services.map((svc) => (
            <button
              key={svc.id}
              onClick={() => {
                setSelectedService(svc.id);
                setBookingResult(null);
              }}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex gap-4 items-center group shadow-xs ${
                selectedService === svc.id
                  ? 'bg-violet-50/55 border-violet-800 text-violet-950'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-violet-800 hover:bg-slate-50'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${
                selectedService === svc.id ? 'bg-violet-800 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
              }`}>
                {svc.iconName === "Landmark" && <Landmark className="w-5 h-5" />}
                {svc.iconName === "Layers" && <Layers className="w-5 h-5" />}
                {svc.iconName === "Shield" && <Shield className="w-5 h-5" />}
                {svc.iconName === "Briefcase" && <Briefcase className="w-5 h-5" />}
                {svc.iconName === "Sparkles" && <Sparkles className="w-5 h-5" />}
                {svc.iconName === "BookOpen" && <BookOpen className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-800 group-hover:text-violet-800 transition-colors">{svc.title}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{svc.description}</p>
              </div>
              <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${selectedService === svc.id ? 'translate-x-1 text-violet-800' : 'text-slate-400'}`} />
            </button>
          ))}
        </div>

        {/* Detailed Service Inspection Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{activeSvc.title}</h3>
              <p className="text-xs text-amber-700 font-extrabold mt-0.5">{activeSvc.pricing}</p>
            </div>
            <span className="text-[10px] bg-violet-50 border border-violet-100/55 text-violet-800 py-1 px-2.5 rounded-full font-bold font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-violet-800" />
              {activeSvc.duration}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {activeSvc.longDescription}
          </p>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-800 block">Key Deliverables Included:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {activeSvc.benefits.map((benefit, idx) => (
                <li key={idx} className="flex gap-2 text-slate-500 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Right Column: Live Interactive Booking Scheduler Form */}
      <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-violet-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-violet-800" />
            Strategic Booking Desk
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Reserve a highly confidential 1-on-1 strategy allocation slot. All discussions are securely recorded.
          </p>
        </div>

        {bookingResult?.success ? (
          // Booking Success View
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-4 py-8">
            <div className="w-12 h-12 bg-emerald-100/60 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-emerald-950">Booking Email Ready</h4>
              <p className="text-xs text-slate-600 leading-normal">
                Your email app should have opened with the request pre-filled — just press <strong>send</strong> and Jacob's office will confirm your slot. If nothing opened, email <strong>{siteConfig.contact.workEmail}</strong> with your reference below.
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-xs border border-slate-100 space-y-1 text-left font-mono text-slate-700 shadow-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Booking ID:</span>
                <span className="text-emerald-700 font-bold">{bookingResult.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Service Area:</span>
                <span className="text-slate-800 truncate font-semibold">
                  {services.find(s => s.id === selectedService)?.title || selectedService}
                </span>
              </div>
            </div>
            <button
              onClick={() => setBookingResult(null)}
              className="text-xs font-bold text-violet-800 hover:text-violet-700 transition duration-200 underline decoration-violet-800/30"
            >
              Schedule Another Consultation slot
            </button>
          </div>
        ) : (
          // Booking Form View
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-lg font-medium">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Selected Service indicator */}
            <div className="space-y-2">
              <label className="text-xs text-slate-700 font-semibold block">Service Focus Area</label>
              <select
                id="select-booking-service"
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  setBookingResult(null);
                }}
                className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 font-medium cursor-pointer"
              >
                {services.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.title}
                  </option>
                ))}
              </select>

              {/* Dynamic Selected Service Detail Pop-In */}
              <div className="p-3.5 bg-violet-50/70 border border-violet-100/45 rounded-xl space-y-2 animate-fadeIn text-xs">
                <div className="flex justify-between items-center font-bold text-violet-950 text-xs">
                  <span className="text-slate-800 font-bold">{activeSvc.title}</span>
                  <span className="text-amber-700 font-extrabold text-[11px] whitespace-nowrap">{activeSvc.pricing}</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed font-normal">
                  {activeSvc.longDescription}
                </p>
                <div className="flex items-center gap-1.5 font-bold text-violet-800 text-[10px] uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Format: {activeSvc.duration}</span>
                </div>
                <div className="pt-2 border-t border-violet-100/30 space-y-1">
                  <span className="font-extrabold text-violet-950 text-[10px] uppercase tracking-widest block">Key Outcomes Included:</span>
                  <div className="grid grid-cols-1 gap-1 text-[10px] text-slate-600 font-medium">
                    {activeSvc.benefits.slice(0, 3).map((benefit, bIdx) => (
                      <div key={bIdx} className="flex gap-1.5 items-start">
                        <span className="text-emerald-600 font-extrabold">✓</span>
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs text-slate-700 font-semibold block">Your Name</label>
              <input
                id="input-booking-name"
                type="text"
                required
                placeholder="e.g. David Mwangi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 transition-colors font-medium text-sm"
              />
            </div>

            {/* Business Email */}
            <div className="space-y-1">
              <label className="text-xs text-slate-700 font-semibold block">Your Email Address</label>
              <input
                id="input-booking-email"
                type="email"
                required
                placeholder="e.g. dmwangi@domain.co.ke"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 transition-colors font-mono text-sm"
              />
            </div>

            {/* Date and Time row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-700 font-semibold block">Select Date</label>
                <input
                  id="input-booking-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 font-mono text-xs cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-700 font-semibold block">Select Slot Time</label>
                <select
                  id="select-booking-time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 font-mono text-xs cursor-pointer"
                >
                  <option value="">-- Choose --</option>
                  <option value="09:00 AM">09:00 AM (EAT)</option>
                  <option value="11:00 AM">11:00 AM (EAT)</option>
                  <option value="02:00 PM">02:00 PM (EAT)</option>
                  <option value="04:00 PM">04:00 PM (EAT)</option>
                </select>
              </div>
            </div>

            {/* Strategic Notes */}
            <div className="space-y-1">
              <label className="text-xs text-slate-700 font-semibold block">Discuss Objectives & Assets (Optional)</label>
              <textarea
                id="input-booking-notes"
                rows={3}
                placeholder="Briefly state your liquid asset tier or current investment challenges (Confidential)."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 text-xs py-2.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-violet-800 focus:bg-white focus:ring-1 focus:ring-violet-800 transition-colors text-xs"
              />
            </div>

            {/* Professional Submit button */}
            <button
              id="submit-booking-form"
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-violet-800 hover:bg-violet-700 transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                loading ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              {loading ? (
                <span>Registering details ...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Secure Strategic Consultation Slot</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

