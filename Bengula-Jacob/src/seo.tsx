/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Per-route <head> management. Drop a <Seo .../> into any page component to set
 * its title, description, canonical URL, Open Graph / Twitter tags, and optional
 * JSON-LD. Values are baked into the prerendered HTML, so search engines, social
 * cards, and AI crawlers all see them without running JS.
 */

import React from 'react';
import { Head } from 'vite-react-ssg';

export const SITE_URL = 'https://bengula.co.ke';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/ColoredBengulaIncLogo.png`;

const absolute = (url?: string) =>
  !url ? DEFAULT_OG_IMAGE : url.startsWith('http') ? url : `${SITE_URL}${url}`;

export interface SeoProps {
  title: string;
  description: string;
  /** Route path, e.g. "/blog/kb-bond-guide-2026". */
  path: string;
  /** Absolute URL or root-relative path; falls back to the brand logo. */
  image?: string;
  type?: 'website' | 'article';
  /** One or more JSON-LD objects injected as <script type="application/ld+json">. */
  jsonLd?: object | object[];
}

export default function Seo({ title, description, path, image, type = 'website', jsonLd }: SeoProps) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const img = absolute(image);
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content="Bengula Inc" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  );
}

/** Site-wide Organization JSON-LD (rendered once in the Layout). */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bengula Inc',
  url: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  slogan: 'Adding meaning to life',
  description:
    'Bengula Inc helps East African businesses grow — pairing data-driven digital visibility with finance and banking advisory across Kenya and the diaspora.',
  areaServed: 'Kenya and the East African diaspora',
  sameAs: [
    'https://www.linkedin.com/in/bengula/',
    'https://x.com/EruditeElder',
    'https://www.instagram.com/bengula_bengula/',
  ],
};
