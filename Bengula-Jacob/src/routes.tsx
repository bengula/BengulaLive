/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Route table for vite-react-ssg. Every path here is prerendered to static
 * HTML at build time; dynamic routes enumerate their pages via getStaticPaths.
 */

import React from 'react';
import type { RouteRecord } from 'vite-react-ssg';

import Layout from './App';
import HomeTab from './components/HomeTab';
import AboutTab from './components/AboutTab';
import ServicesTab from './components/ServicesTab';
import PortfolioTab from './components/PortfolioTab';
import BlogTab from './components/BlogTab';
import AuthorsTab from './components/AuthorsTab';
import InvestmentTab from './components/InvestmentTab';
import AICoach from './components/AICoach';
import ContactTab from './components/ContactTab';

import { allArticles } from './data/articles';
import { authorProfiles } from './data/authors';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomeTab /> },
      { path: 'about', element: <AboutTab /> },
      { path: 'services', element: <ServicesTab /> },
      { path: 'portfolio', element: <PortfolioTab /> },
      { path: 'investments', element: <InvestmentTab /> },
      { path: 'ai-coach', element: <AICoach /> },
      { path: 'contact', element: <ContactTab /> },
      { path: 'blog', element: <BlogTab /> },
      {
        path: 'blog/:id',
        element: <BlogTab />,
        getStaticPaths: () => allArticles.map((a) => `/blog/${a.id}`),
      },
      { path: 'authors', element: <AuthorsTab /> },
      {
        path: 'authors/:id',
        element: <AuthorsTab />,
        getStaticPaths: () => authorProfiles.map((a) => `/authors/${a.id}`),
      },
    ],
  },
];
