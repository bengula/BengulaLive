/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { PortfolioCategory, RiskProfile } from './data/portfolioTags';

export type TabId = 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'authors' | 'investments' | 'ai-coach' | 'contact';

export interface Author {
  name: string;
  role: string;
  avatar?: string; // optional photo: an Unsplash URL or a /images/... path
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown supported content
  category: string;
  coverImage?: string;  // optional — own cover (Unsplash URL or /images/... path); falls back to the category photo
  author: Author;       // primary author
  coAuthors?: Author[]; // optional — additional authors for a co-authored piece
  date: string;
  readTime: string;
  featured?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  impact: string;
  location: string;
  year: string;
  metrics: { label: string; value: string }[];
  blogId?: string;
  riskProfile?: RiskProfile;
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
  riskProfile: RiskProfile;
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
