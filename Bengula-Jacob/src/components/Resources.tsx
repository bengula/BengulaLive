/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileText, Download, TrendingUp, ShieldCheck, Sprout, Palette } from 'lucide-react';

interface ResourceDoc {
  title: string;
  tag: string;
  desc: string;
  file: string; // path under /public
  icon: React.ElementType;
}

// Files live in /public/documents and ship with the static build.
const resources: ResourceDoc[] = [
  {
    title: "East Africa Fiscal & Macro-Trends Analysis (2026)",
    tag: "Market Analysis",
    desc: "Annual dossier on regional fiscal direction, CBK rate movements, and the macro backdrop for treasury and equity positioning.",
    file: "/documents/annual_east_africa_fiscal_macro_trends_analysis_2026.pdf",
    icon: TrendingUp,
  },
  {
    title: "Due Diligence Framework for Alternative Placements",
    tag: "Due Diligence Guide",
    desc: "The checklist Bengula Inc uses to vet syndicates and private placements: titles, sponsor track record, exit terms, and risk flags.",
    file: "/documents/due_diligence_framework_for_alternative_placements.pdf",
    icon: ShieldCheck,
  },
  {
    title: "Agri-Horticulture Cold-Chain Logistics Report",
    tag: "Sector Report",
    desc: "Deep-dive into capital bottlenecks and opportunities across Kenya's horticulture export and cold-chain supply lines.",
    file: "/documents/emerging_agri_horticulture_cold_chain_logistics_report.pdf",
    icon: Sprout,
  },
  {
    title: "Bengula Inc Brand Style Guide",
    tag: "Brand Guide",
    desc: "Reusable guidance for brand voice, colors, typography, layouts, and marketing material across PDFs, decks, social, and web.",
    file: "/documents/bengula_inc_brand_style_guide.pdf",
    icon: Palette,
  },
];

export default function Resources() {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <span className="text-xs font-semibold text-violet-800 uppercase tracking-widest flex items-center gap-1.5 justify-center">
          <FileText className="w-3.5 h-3.5" />
          Free Resource Library
        </span>
        <h3 className="text-2xl font-bold text-slate-900">Download Research & Frameworks</h3>
        <p className="text-xs text-slate-500">
          Complimentary dossiers prepared by Jacob's desk: no signup required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((doc, idx) => {
          const Icon = doc.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between transition group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="bg-violet-50 text-violet-800 border border-violet-100/60 p-2.5 rounded-xl w-fit group-hover:bg-violet-800 group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] bg-slate-100 text-slate-600 border border-slate-200 font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
                    {doc.tag}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-violet-800 transition-colors">{doc.title}</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{doc.desc}</p>
                </div>
              </div>

              <a
                href={doc.file}
                download
                className="mt-6 inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-violet-800 hover:bg-violet-700 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Dossier</span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
