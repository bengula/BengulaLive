/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabId = 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'investments' | 'ai-coach' | 'contact';

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown supported content
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  featured?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Featured Projects' | 'Business Ventures' | 'Case Studies';
  description: string;
  impact: string;
  location: string;
  year: string;
  metrics: { label: string; value: string }[];
  blogId?: string;
  riskProfile?: 'Low' | 'Moderate' | 'High';
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  duration: string;
  pricing: string;
  iconName: string;
}

export interface InvestmentOpportunity {
  id: string;
  title: string;
  riskProfile: 'Low' | 'Moderate' | 'High';
  minimumAmount: number; // in KSh
  expectedYield: number; // Annualized APR in %
  tenure: string; // e.g., "5.5 Years", "91 Days"
  category: 'Real Estate Projects' | 'Business Partnerships' | 'Startup Investments';
  description: string;
  keyBenefits: string[];
  blogId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface UserFinanceProfile {
  name: string;
  age: string;
  monthlySavings: string; // in KSh
  goal: string;
  riskTolerance: 'Low (Bond/Treasury focus)' | 'Moderate (Diversified wealth)' | 'High (Equities/Real estate)';
}
