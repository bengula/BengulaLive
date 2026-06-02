/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  SECTION REGISTRY
 *  This single array defines every section of the site, in order.
 *
 *  • To REMOVE a section (e.g. the AI Wealth Coach): delete its entry below,
 *    or set `enabled: false`. The nav link AND its page disappear together.
 *  • To ADD a section: build a component, import it, and add one entry here.
 *  • To REORDER: move entries up/down in this array.
 *
 *  Nothing else needs to change — the nav, footer links, and page router all
 *  read from this list.
 * ─────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Building, User, Layers, Briefcase, BookOpen, Compass, MessageSquare, Phone,
} from 'lucide-react';

import { TabId } from './types';
import HomeTab from './components/HomeTab';
import AboutTab from './components/AboutTab';
import ServicesTab from './components/ServicesTab';
import PortfolioTab from './components/PortfolioTab';
import BlogTab from './components/BlogTab';
import InvestmentTab from './components/InvestmentTab';
import AICoach from './components/AICoach';
import ContactTab from './components/ContactTab';

/** Shared helpers passed to every section's render function. */
export interface SectionContext {
  /** Switch tabs. Navigating to "blog" resets to the article list. */
  navigate: (id: TabId) => void;
  /** Open a specific blog article by id. */
  goToBlogPost: (postId: string) => void;
  /** Currently open blog article (null = show the list). */
  activeBlogPostId: string | null;
  setActiveBlogPostId: (id: string | null) => void;
}

export interface SectionDef {
  id: TabId;
  /** Label shown in the nav + footer. */
  label: string;
  /** Shorter label for the compact footer link (falls back to `label`). */
  footerLabel?: string;
  icon: LucideIcon;
  /** Set false to hide everywhere without deleting the entry. */
  enabled?: boolean;
  /** Renders the section's page content. */
  render: (ctx: SectionContext) => React.ReactNode;
}

export const sections: SectionDef[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Building,
    render: (ctx) => <HomeTab navigate={ctx.navigate} />,
  },
  {
    id: 'about',
    label: 'About Us',
    icon: User,
    render: (ctx) => <AboutTab onNavigateToBlog={ctx.goToBlogPost} />,
  },
  {
    id: 'services',
    label: 'Services',
    icon: Layers,
    render: () => <ServicesTab />,
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: Briefcase,
    render: (ctx) => <PortfolioTab onNavigateToBlog={ctx.goToBlogPost} />,
  },
  {
    id: 'blog',
    label: 'Blog & Education',
    footerLabel: 'Blog',
    icon: BookOpen,
    render: (ctx) => (
      <BlogTab activePostId={ctx.activeBlogPostId} setActivePostId={ctx.setActiveBlogPostId} />
    ),
  },
  {
    id: 'investments',
    label: 'Investment Pools',
    footerLabel: 'Pools',
    icon: Compass,
    render: (ctx) => <InvestmentTab onNavigateToBlog={ctx.goToBlogPost} />,
  },
  {
    id: 'ai-coach',
    label: 'AI Wealth Coach',
    footerLabel: 'Coach',
    icon: MessageSquare,
    render: () => <AICoach />,
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Phone,
    render: () => <ContactTab />,
  },
];

/** Only the sections that are enabled (default = enabled). */
export const activeSections = sections.filter((s) => s.enabled !== false);
