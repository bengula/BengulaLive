import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, ShieldCheck } from 'lucide-react';
import Seo from '../seo';
import { openMailto } from '../utils/mailto';
import { siteConfig } from '../data/siteConfig';

const resources = [
  { title: 'Annual East Africa Fiscal & Macro-Trends Analysis (2026)', type: 'Market analysis', file: '/documents/annual_east_africa_fiscal_macro_trends_analysis_2026.pdf', desc: 'A research note on currency movements, inflation, and monetary policy.' },
  { title: 'Emerging Agri-Horticulture Cold-Chain Logistics Report', type: 'Sector report', file: '/documents/emerging_agri_horticulture_cold_chain_logistics_report.pdf', desc: 'Research on export logistics, bottlenecks, and operating economics.' },
  { title: 'Due Diligence Framework for Alternative Placements', type: 'Due diligence guide', file: '/documents/due_diligence_framework_for_alternative_placements.pdf', desc: 'A checklist for assessing off-market assets, operators, and agreements.' },
];

export default function InvestmentTab() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General investment education');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    openMailto(siteConfig.contact.wealthEmail, `Private investment enquiry: ${topic}`, ['Hello Bengula Inc,', '', 'I would like to request an educational or private-placement discussion.', '', `Name: ${name}`, `Email: ${email}`, `Topic: ${topic}`, '', 'Context:', message || '(none provided)', '', 'I understand this enquiry is not an offer, recommendation, or guarantee of returns.']);
    setSent(true);
  };
  return <div className="space-y-12 animate-fadeIn">
    <Seo title="Investment Education & Private Enquiries | Bengula Inc" description="Investment education, due diligence resources, and confidential enquiries for private discussions with Bengula Inc." path="/investments" />
    <header className="glass-strong rounded-3xl p-7 md:p-12 max-w-4xl space-y-5"><span className="text-xs font-bold text-violet-700 uppercase tracking-widest">Investment education</span><h1 className="text-3xl md:text-4xl font-bold text-slate-900">Research first. Decisions with the right licensed provider.</h1><p className="text-sm leading-relaxed text-slate-600 max-w-2xl">We share research and practical due-diligence frameworks for people evaluating Treasury instruments, money-market funds, and alternative assets. Bengula Inc does not make a public offer, accept investment funds, or guarantee returns.</p><Link to="/disclaimer" className="inline-flex text-xs font-bold text-violet-800 hover:text-violet-600">Read the investment disclaimer</Link></header>
    <section className="grid md:grid-cols-3 gap-5">{['Treasury instruments', 'Money-market funds', 'Alternative assets'].map((item) => <div key={item} className="glass-card rounded-xl p-6 space-y-2"><ShieldCheck className="w-5 h-5 text-violet-700" /><h2 className="font-bold text-slate-900">{item}</h2><p className="text-xs leading-relaxed text-slate-600">Understand the issuer, risk, liquidity, costs, tax treatment, and documentation before making a decision.</p></div>)}</section>
    <section className="space-y-5"><div><span className="text-xs font-bold text-violet-700 uppercase tracking-widest">Research library</span><h2 className="text-2xl font-bold text-slate-900 mt-1">Downloadable analysis</h2></div><div className="grid md:grid-cols-3 gap-5">{resources.map((resource) => <article key={resource.file} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3"><div className="flex items-center gap-2 text-violet-800"><FileText className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest">{resource.type}</span></div><h3 className="font-bold text-sm text-slate-900">{resource.title}</h3><p className="text-xs leading-relaxed text-slate-600">{resource.desc}</p><a href={resource.file} download className="inline-flex items-center gap-1 text-xs font-bold text-violet-800 hover:text-violet-600"><Download className="w-3.5 h-3.5" /> Download PDF</a></article>)}</div></section>
    <section className="bg-slate-900 rounded-2xl p-7 md:p-10 text-white"><div className="max-w-2xl mx-auto space-y-6"><div className="text-center space-y-2"><span className="text-xs font-bold text-violet-300 uppercase tracking-widest">Confidential enquiry</span><h2 className="text-2xl font-bold">Request a private discussion</h2><p className="text-sm text-slate-300">For a specific private-placement or research enquiry, provide only the information needed to start a conversation. Do not send account details or funds.</p></div>{sent ? <p className="text-center text-sm text-emerald-300">Your email application should have opened with the enquiry pre-filled. Review it and send when ready.</p> : <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 text-sm"><input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-2.5" /><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-2.5" /><select value={topic} onChange={(e) => setTopic(e.target.value)} className="sm:col-span-2 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2.5"><option>General investment education</option><option>Treasury instruments or money-market funds</option><option>Alternative asset due diligence</option><option>Private-placement enquiry</option></select><textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="What would you like to discuss?" className="sm:col-span-2 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2.5" /><button className="sm:col-span-2 bg-violet-600 hover:bg-violet-500 rounded-lg px-4 py-3 font-bold">Prepare confidential enquiry</button></form>}</div></section>
  </div>;
}
