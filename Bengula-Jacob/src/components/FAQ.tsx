/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "Are you giving regulated financial advice?",
    a: "No. Everything on this site — the calculators, articles, and the Wealth Coach — is for financial education and general literacy. It is not formal, binding, or licensed investment advice. Formal banking products are handled only through official Absa Bank Kenya channels.",
  },
  {
    q: "How is Bengula Inc different from Absa Kenya?",
    a: "They are kept strictly separate. Jacob's role at Absa covers regulated corporate banking. Bengula Inc is an independent advisory and private-placement holding company. Retail deposits and conventional banking are never handled through Bengula Inc.",
  },
  {
    q: "How do I book a consultation?",
    a: "Open the Services tab, pick the advisory track that fits, choose a date and time, and submit. Your email app opens with the request pre-filled — press send and the office confirms your slot.",
  },
  {
    q: "What does a consultation cost?",
    a: "Tracks range from KSh 10,000 for a personal finance blueprint to KSh 40,000+ for full-day workshops. Each service card on the Services tab shows its exact fee and duration.",
  },
  {
    q: "Can I invest from the diaspora?",
    a: "Yes. You can open a DhowCSD / CDS account and link a Kenyan bank account to buy Treasury bills, bonds (IFBs are popular and tax-free), and money market funds from abroad. Ask the Wealth Coach about 'diaspora' or book a consultation for a tailored plan.",
  },
  {
    q: "Is my information kept confidential?",
    a: "Yes. Enquiries and booking requests go directly to Jacob's office by email and are not shared. Only provide what you're comfortable putting in an email.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <span className="text-xs font-semibold text-blue-900 uppercase tracking-widest flex items-center gap-1.5 justify-center">
          <HelpCircle className="w-3.5 h-3.5" />
          Common Questions
        </span>
        <h3 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
        <p className="text-xs text-slate-500">
          Quick answers on consultations, compliance, and how the desk works.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <div
              key={idx}
              className={`bg-white border rounded-xl overflow-hidden transition-colors shadow-xs ${
                isOpen ? 'border-blue-900/40' : 'border-slate-200'
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : idx)}
                className="w-full flex justify-between items-center gap-4 text-left p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-bold text-slate-800">{item.q}</span>
                <span className={`shrink-0 p-1 rounded-full ${isOpen ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 -mt-1 animate-fadeIn">
                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
