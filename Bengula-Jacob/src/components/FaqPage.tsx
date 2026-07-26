import React from 'react';
import Seo from '../seo';
import FAQ from './FAQ';

export default function FaqPage() {
  return <div className="animate-fadeIn"><Seo title="Frequently Asked Questions | Bengula Inc" description="Answers about Bengula Inc, consultations, confidentiality, diaspora investing, and financial education." path="/faq" /><FAQ /></div>;
}
