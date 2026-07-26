import React from 'react';
import Seo from '../seo';
import LoanAppraisalCalculator from './LoanAppraisalCalculator';
import Calculators from './Calculators';
import CreditCardGraceCalculator from './CreditCardGraceCalculator';

export default function ToolsPage() {
  return <div className="space-y-14 animate-fadeIn">
    <Seo title="Financial Education Tools | Bengula Inc" description="Educational tools for assessing loan affordability, bond and savings scenarios, and credit-card grace periods." path="/tools" />
    <header className="text-center max-w-2xl mx-auto space-y-3"><span className="text-xs font-semibold text-violet-700 uppercase tracking-widest">Educational tools</span><h1 className="text-3xl font-bold text-slate-900">Make the numbers easier to understand</h1><p className="text-sm text-slate-600">Use these calculators for general financial literacy. Outputs are illustrations, not an offer, approval, or personalised advice.</p></header>
    <section className="space-y-6"><div className="text-center"><h2 className="text-2xl font-bold text-slate-900">Loan appraisal</h2><p className="text-xs text-slate-500">Estimate repayment factors and affordability before a formal discussion.</p></div><LoanAppraisalCalculator /></section>
    <section className="glass-strong rounded-2xl p-6 md:p-10 space-y-8"><div className="text-center"><h2 className="text-2xl font-bold text-slate-900">Bond yield and wealth</h2><p className="text-xs text-slate-500">Explore savings and fixed-income scenarios using your own assumptions.</p></div><Calculators /></section>
    <section className="space-y-6"><div className="text-center"><h2 className="text-2xl font-bold text-slate-900">Credit-card grace period</h2><p className="text-xs text-slate-500">See how billing dates can affect an interest-free period.</p></div><CreditCardGraceCalculator /></section>
  </div>;
}
