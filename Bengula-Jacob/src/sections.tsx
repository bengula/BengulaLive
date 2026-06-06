/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  NAV REGISTRY
 *  Single source of truth for the header/footer navigation: order, labels,
 *  icons, and the route path each item links to. The actual route → component
 *  wiring lives in src/routes.tsx.
 *
 *  • To hide an item everywhere without deleting it: set `enabled: false`.
 *  • To reorder: move entries in this array.
 * ─────────────────────────────────────────────────────────────────────────
 */

import type { LucideIcon } from 'lucide-react';
import {
  Building, User, Layers, Briefcase, BookOpen, Users, Compass, MessageSquare, Phone,
} from 'lucide-react';

import { TabId } from './types';

export interface NavItem {
  id: TabId;
  /** Route path this item links to. */
  path: string;
  /** Label shown in the nav + footer. */
  label: string;
  /** Shorter label for the compact footer link (falls back to `label`). */
  footerLabel?: string;
  icon: LucideIcon;
  /** Set false to hide everywhere without deleting the entry. */
  enabled?: boolean;
}

export const navItems: NavItem[] = [
  { id: 'home', path: '/', label: 'Home', icon: Building },
  { id: 'about', path: '/about', label: 'About Us', icon: User },
  { id: 'services', path: '/services', label: 'Services', icon: Layers },
  { id: 'portfolio', path: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'blog', path: '/blog', label: 'Blog & Education', footerLabel: 'Blog', icon: BookOpen },
  { id: 'authors', path: '/authors', label: 'Authors', icon: Users },
  { id: 'investments', path: '/investments', label: 'Investment Pools', footerLabel: 'Pools', icon: Compass },
  { id: 'ai-coach', path: '/ai-coach', label: 'AI Wealth Coach', footerLabel: 'Coach', icon: MessageSquare },
  { id: 'contact', path: '/contact', label: 'Contact', icon: Phone },
];

/** Only the nav items that are enabled (default = enabled). */
export const activeNav = navItems.filter((n) => n.enabled !== false);
