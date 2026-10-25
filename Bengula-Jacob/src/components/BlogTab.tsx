/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, useSearchParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { categoryImage } from '../data/media';
import { getAuthorProfile } from '../data/authors';
import { fetchCounts, getLikedIds, toggleLike } from '../data/likes';
import type { ArticleHeading } from '../utils/markdownText';
import { extractHeadings, getTextContent, MarkdownContent, slugifyHeading } from '../utils/markdownText';
import Seo, { SITE_URL } from '../seo';
import { Search, BookOpen, Clock, Calendar, ArrowLeft, Heart, Share2, SearchX, UserCircle2, List, X } from 'lucide-react';

/** Thin progress bar pinned to the top of the viewport while reading an article. */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 pointer-events-none" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-violet-700 via-violet-500 to-fuchsia-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/**
 * Sticky contents rail for an article. Long pieces run well past a screenful of
 * scrolling, so readers get the shape of the piece up front and a way back to a
 * section they half-remember. Highlights whichever section is currently in view.
 */
function ArticleToc({ headings }: { headings: ArticleHeading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    if (!headings.length) return;

    const nodes = headings
      .map((h) => document.getElementById(h.id))
      .filter((n): n is HTMLElement => n !== null);
    if (!nodes.length) return;

    // The heading nearest the top of the viewport (but still above the fold)
    // is the section being read; fall back to the first when scrolled above all.
    const onScroll = () => {
      const offset = 120;
      let current = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top - offset <= 0) current = node;
        else break;
      }
      setActiveId(current.id);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [headings]);

  return (
    <nav aria-label="Article contents" className="glass rounded-2xl p-5">
      <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-violet-800">
        <List className="w-3.5 h-3.5" />
        On this page
      </p>
      <ul className="mt-4 space-y-1 border-l border-violet-200/70">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={activeId === h.id ? 'true' : undefined}
              className={`block border-l-2 py-1.5 text-[11px] leading-snug transition-colors ${
                h.level === 3 ? 'pl-6' : 'pl-3 font-semibold'
              } ${
                activeId === h.id
                  ? 'border-violet-700 text-violet-900'
                  : 'border-transparent text-slate-500 hover:text-violet-800'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Articles added to the list per page / "show more" press. */
const PAGE_SIZE = 12;

export default function BlogTab() {
  const { id } = useParams();
  const location = useLocation();
  const currentActivePostId = id ?? null;

  // The search box and category live in the URL rather than in component state,
  // so a filtered view of the library can be linked and bookmarked, and so
  // coming back from an article lands on the list the reader left rather than
  // on an unfiltered one. Written with `replace` so typing does not fill the
  // back button with one entry per keystroke.
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';
  const selectedCategory = searchParams.get('category') ?? 'All';

  const updateFilters = (next: { q?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(next)) {
      if (value && value !== 'All') params.set(key, value);
      else params.delete(key);
    }
    setSearchParams(params, { replace: true });
  };
  const setSearchQuery = (q: string) => updateFilters({ q });
  const setSelectedCategory = (category: string) => updateFilters({ category });

  // Set by the card that opened this article; empty on a direct arrival.
  const listSearch = (location.state as { listSearch?: string } | null)?.listSearch ?? '';
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [shared, setShared] = useState<Record<string, boolean>>({});
  // The library is 140+ articles. Rendering every card (and its cover image)
  // on first paint made the page heavy and the scroll endless, so the list
  // grows a page at a time.
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Load this device's liked state + the global counts (client-side only).
  useEffect(() => {
    setLikedIds(getLikedIds());
    fetchCounts(blogPosts.map((p) => p.id)).then((counts) => {
      if (Object.keys(counts).length) setLikes((prev) => ({ ...counts, ...prev }));
    });
  }, []);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(blogPosts.map((post) => post.category)))],
    []
  );

  // --- Filter and Search ---
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // A new search or category starts the list again from the top page.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, selectedCategory]);

  const activePost = useMemo(() => {
    return blogPosts.find(p => p.id === currentActivePostId);
  }, [currentActivePostId]);

  // Section headings of the open article, used by the contents rail.
  const headings = useMemo(
    () => (activePost ? extractHeadings(activePost.content) : []),
    [activePost]
  );

  // Heading renderers that stamp the very ids the contents rail links to, so a
  // duplicated title ("Worked example" twice) still resolves to one anchor
  // rather than two competing ones.
  const headingComponents = useMemo(() => {
    const idByText = new Map<string, string>();
    for (const h of headings) if (!idByText.has(h.text)) idByText.set(h.text, h.id);

    const idFor = (children: React.ReactNode) => {
      const text = getTextContent(children).trim();
      return idByText.get(text) ?? slugifyHeading(text);
    };

    return {
      h2: ({ children }: { children?: React.ReactNode }) => (
        <h2
          id={idFor(children)}
          className="text-2xl font-extrabold text-slate-950 pt-8 pb-2 border-b-2 border-slate-200 leading-snug"
        >
          {children}
        </h2>
      ),
      h3: ({ children }: { children?: React.ReactNode }) => (
        <h3
          id={idFor(children)}
          className="text-xl font-bold text-slate-900 pt-6 pb-2 border-b border-slate-200"
        >
          {children}
        </h3>
      ),
    };
  }, [headings]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const wasLiked = likedIds.has(id);

    // Optimistic update; reconciled with the server's authoritative count below.
    setLikes(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + (wasLiked ? -1 : 1)) }));
    setLikedIds(prev => {
      const next = new Set(prev);
      if (wasLiked) next.delete(id); else next.add(id);
      return next;
    });

    toggleLike(id).then(({ count }) => {
      if (count !== null) setLikes(prev => ({ ...prev, [id]: count }));
    });
  };

  const handleShare = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blog/${id}`;

    // Native share sheet where available (mostly mobile); clipboard otherwise.
    if (typeof navigator.share === 'function') {
      navigator.share({ title, url }).catch(() => {});
      return;
    }

    navigator.clipboard.writeText(url).catch(() => {});
    setShared(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setShared(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const articleImage = activePost
    ? activePost.coverImage ?? categoryImage(activePost.category, 1200)
    : undefined;
  // Use the authored calendar date (dateIso), never the formatted `date`:
  // parsing "August 1, 2026" builds a local-midnight Date, and toISOString then
  // shifts it back three hours into the previous day for a UTC+3 reader.
  const articleIso = activePost?.dateIso;
  const articleJsonLd = activePost
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: activePost.title,
        description: activePost.summary,
        image: articleImage,
        datePublished: articleIso,
        author: [activePost.author, ...(activePost.coAuthors ?? [])].map((a) => ({
          '@type': 'Person',
          name: a.name,
        })),
        publisher: {
          '@type': 'Organization',
          name: 'Bengula Inc',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/ColoredBengulaIncLogo.png` },
        },
        mainEntityOfPage: `${SITE_URL}/blog/${activePost.id}`,
        articleSection: activePost.category,
      }
    : undefined;

  // Related reading: same-category articles first, then fill to 3 with others.
  const relatedPosts = activePost
    ? [
        ...blogPosts.filter((p) => p.id !== activePost.id && p.category === activePost.category),
        ...blogPosts.filter((p) => p.id !== activePost.id && p.category !== activePost.category),
      ].slice(0, 3)
    : [];

  // Unknown /blog/:id — show a dedicated not-found panel instead of silently
  // falling back to the full listing (which looked like a soft 200 success).
  if (currentActivePostId && !activePost) {
    return (
      <div id="blog-article-not-found" className="max-w-2xl mx-auto text-center py-10 md:py-16 space-y-8 animate-fadeIn">
        <Seo
          title="Article Not Found | Bengula Inc"
          description="This article does not exist or may have been moved. Browse the Bengula Inc research library for practical finance and growth notes."
          path={`/blog/${currentActivePostId}`}
        />
        <div className="space-y-3">
          <span className="text-xs font-extrabold text-violet-700 uppercase tracking-widest">Error 404</span>
          <h1 className="editorial-heading text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">
            Article Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            We could not find an article at <span className="font-mono text-slate-800">/blog/{currentActivePostId}</span>.
            It may have been renamed or removed.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/blog"
            className="sheen inline-flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold px-5 py-3 rounded-lg shadow-md transition"
          >
            <BookOpen className="w-4 h-4" />
            Browse the research library
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-violet-800 text-xs font-bold px-5 py-3 rounded-lg shadow-xs transition"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="blog-tab-root" className="space-y-8 animate-fadeIn">

      {activePost ? (
        <Seo
          title={activePost.metaTitle ?? `${activePost.title} | Bengula Inc`}
          description={activePost.metaDescription ?? activePost.summary}
          path={`/blog/${activePost.id}`}
          image={articleImage}
          type="article"
          jsonLd={articleJsonLd}
        />
      ) : (
        <Seo
          title="Blog & Education | Bengula Inc"
          description="Practical notes on Kenyan treasury bonds, MMFs, SACCOs, SME trade finance, real estate, and using data to grow, financial education for owners and professionals."
          path="/blog"
        />
      )}

      {currentActivePostId && activePost ? (
        // ================= EDITORIAL DETAIL ARTICLE VIEW =================
        <div id="blog-editorial-article-detail" className="w-full">
          <ReadingProgress />
          {/* A real link, not a history pop: readers arrive here straight from
              search as often as from the hub, and for them "back" had nowhere
              to go. Carries back whichever filters the list was showing, which
              the card that opened this article handed over in route state. */}
          <Link
            to={{ pathname: '/blog', search: listSearch ? `?${listSearch}` : '' }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-violet-800 hover:text-violet-700 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs transition"
          >
            <ArrowLeft className="w-4 h-4 text-violet-800" />
            <span>Return to Financial Education Hub</span>
          </Link>

          <div className="article-layout mt-6">
            <article className="article-column space-y-6">
              {/* Cover image */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs aspect-[16/7]">
                <img
                  src={activePost.coverImage ?? categoryImage(activePost.category, 1200)}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Featured Header */}
              <div className="space-y-4 border-b border-slate-100 pb-6 pt-4">
                <span className="text-[10px] bg-violet-50 text-violet-800 border border-violet-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                  {activePost.category}
                </span>

                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 leading-tight">
                  {activePost.title}
                </h1>

                {/* Author row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    {/* Stacked avatars — one per author (photo if set, else a fallback icon) */}
                    <div className="flex -space-x-3">
                      {[activePost.author, ...(activePost.coAuthors ?? [])].map((a, i) =>
                        a.avatar ? (
                          <img
                            key={i}
                            src={a.avatar}
                            alt={a.name}
                            loading="lazy"
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs bg-slate-100"
                          />
                        ) : (
                          <UserCircle2 key={i} className="w-10 h-10 text-slate-400 bg-white rounded-full border-2 border-white" />
                        )
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 flex flex-wrap items-center gap-x-1">
                        {[activePost.author, ...(activePost.coAuthors ?? [])].map((a, i, arr) => {
                          const profile = getAuthorProfile(a.name);
                          return (
                            <span key={i} className="flex items-center gap-x-1">
                              {profile ? (
                                <Link
                                  to={`/authors/${profile.id}`}
                                  className="text-violet-800 hover:text-violet-700 hover:underline decoration-violet-800/40 transition cursor-pointer"
                                >
                                  {a.name}
                                </Link>
                              ) : (
                                <span>{a.name}</span>
                              )}
                              {i < arr.length - 1 && <span className="text-slate-400 font-normal">&amp;</span>}
                            </span>
                          );
                        })}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {[activePost.author, ...(activePost.coAuthors ?? [])].map((a) => a.role).join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {activePost.date}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-violet-800">
                      <Clock className="w-3.5 h-3.5 text-violet-800" />
                      {activePost.readTime}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-rose-600">
                      <Heart className={`w-3.5 h-3.5 ${likedIds.has(activePost.id) ? 'fill-rose-500 text-rose-500' : 'text-rose-500'}`} />
                      {likes[activePost.id] || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Body Narrative details */}
              <div className="article-prose space-y-5 prose prose-slate font-sans pb-8">
                <MarkdownContent content={activePost.content} components={headingComponents} />
              </div>



              {/* Related reading — internal links to keep readers (and crawlers) moving */}
              {relatedPosts.length > 0 && (
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-violet-800" />
                    Related reading
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedPosts.map((post) => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.id}`}
                        className="group glass-card rounded-xl p-4 transition flex flex-col gap-2"
                      >
                        <span className="text-[9px] bg-violet-50 text-violet-800 border border-violet-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono w-fit">
                          {post.category}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-violet-800 transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-auto">
                          <Clock className="w-3 h-3 text-violet-800" />
                          {post.readTime}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share / Social reactions footer */}
              <div className="border-t border-slate-100 pt-6 flex items-center justify-between text-xs text-slate-500 font-sans">
                <span className="font-medium text-slate-600">Did you find this educational segment helpful?</span>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => handleLike(activePost.id, e)}
                    className="flex items-center gap-1.5 py-2 px-3 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-slate-50 transition cursor-pointer shadow-xs font-bold"
                  >
                    <Heart className={`w-4 h-4 ${likedIds.has(activePost.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span className="font-mono">{likes[activePost.id] || 0} Likes</span>
                  </button>
                  <button
                    onClick={(e) => handleShare(activePost.id, activePost.title, e)}
                    className="flex items-center gap-1.5 py-2 px-3 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-violet-800 hover:bg-slate-50 transition cursor-pointer shadow-xs font-bold"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{shared[activePost.id] ? "Link Copied!" : "Share Link"}</span>
                  </button>
                </div>
              </div>
            </article>

            {headings.length >= 3 && (
              <aside className="article-aside">
                <ArticleToc headings={headings} />
              </aside>
            )}
          </div>
        </div>
      ) : (
        // ================= GENERAL ARTICLES SELECTION LIST =================
        <div className="space-y-6">
          {/* Controls Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-200 pb-6">
            <div className="md:col-span-5 space-y-1">
              <span className="text-xs font-extrabold text-violet-700 uppercase tracking-widest block">Research Library</span>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-violet-800 animate-pulse" />
                Financial Education Hub
              </h1>
              <p className="text-xs text-slate-500">
                Practical notes across both pillars, business finance and banking, plus data, SEO, and digital growth.
              </p>
            </div>

            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3 top-2.5 text-slate-400 w-4.5 h-4.5" />
              <label htmlFor="blog-search-query-input" className="sr-only">Search articles</label>
              <input
                id="blog-search-query-input"
                type="search"
                placeholder="Search bonds, stocks, coaching..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-800 py-2.5 pl-10 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:border-violet-800 focus:ring-1 focus:ring-violet-800 text-sm font-medium"
              />
              {/* Clearing a query by holding backspace is miserable on a phone. */}
              {searchQuery !== '' && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  title="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-violet-800 hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Category Swiper */}
            <div className="md:col-span-3 relative">
              <label htmlFor="blog-category-select-dropdown" className="sr-only">Filter articles by category</label>
              <select
                id="blog-category-select-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white text-slate-800 text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-violet-800 focus:ring-1 focus:ring-violet-800 font-semibold cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result count — always on, so readers know both how much of the
              library they are looking at and how much of it is on screen. */}
          {filteredPosts.length > 0 && (
            <div
              aria-live="polite"
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium -mt-2"
            >
              <span>
                Showing <strong className="text-slate-800">{Math.min(visibleCount, filteredPosts.length)}</strong>
                {' '}of <strong className="text-slate-800">{filteredPosts.length}</strong>
                {filteredPosts.length === blogPosts.length ? ' articles' : ` matching articles (${blogPosts.length} in the library)`}
                {selectedCategory !== 'All' && (
                  <> in <strong className="text-violet-800">{selectedCategory}</strong></>
                )}
                {searchQuery.trim() !== '' && (
                  <> matching "<strong className="text-slate-800">{searchQuery.trim()}</strong>"</>
                )}
              </span>
              {(searchQuery.trim() !== '' || selectedCategory !== 'All') && (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="text-violet-800 font-bold hover:text-violet-900 underline decoration-violet-800/40 cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Cards List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.slice(0, visibleCount).map((post) => (
              <div
                key={post.id}
                className="card-link-surface glass-card rounded-2xl overflow-hidden transition duration-300 flex flex-col justify-between group"
              >
                {/* Cover image */}
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage ?? categoryImage(post.category, 800)}
                    alt={post.category}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Likes total badge (read-only; the action button is in the card footer) */}
                <div className="pointer-events-none absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-slate-900/55 backdrop-blur px-2.5 py-1 text-[11px] font-bold text-white font-mono shadow-sm">
                  <Heart className={`w-3 h-3 ${likedIds.has(post.id) ? 'fill-rose-400 text-rose-400' : 'text-rose-300'}`} />
                  {likes[post.id] || 0}
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                <div className="space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-x-3 gap-y-1.5">
                    <span className="text-[10px] bg-violet-50 text-violet-800 border border-violet-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono whitespace-nowrap">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-3 font-semibold">
                      <span className="flex items-center gap-1 text-slate-400 whitespace-nowrap">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Clock className="w-3 h-3 text-violet-800" />
                        {post.readTime}
                      </span>
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* The one real link in the card; `stretched-link` makes its
                        hit area the whole card without nesting the footer
                        buttons inside an anchor. */}
                    <Link
                      to={`/blog/${post.id}`}
                      state={{ listSearch: searchParams.toString() }}
                      className="stretched-link block"
                    >
                      <h2 className="text-base font-bold text-slate-900 group-hover:text-violet-800 transition-colors duration-200 leading-snug">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sans">
                  <span className="font-bold text-slate-600">
                    By {[post.author, ...(post.coAuthors ?? [])].map((a) => a.name).join(' & ')}
                  </span>
                  <div className="card-link-actions flex gap-2">
                    <button
                      onClick={(e) => handleLike(post.id, e)}
                      aria-label={likedIds.has(post.id) ? 'Unlike this article' : 'Like this article'}
                      title={likedIds.has(post.id) ? 'Unlike' : 'Like'}
                      className="p-1 px-2 rounded hover:bg-slate-100 flex items-center gap-1 font-mono hover:text-rose-600 transition cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedIds.has(post.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400 group-hover:text-rose-500'}`} />
                      <span className="font-bold text-slate-700">{likes[post.id] || 0}</span>
                    </button>
                    <button
                      onClick={(e) => handleShare(post.id, post.title, e)}
                      aria-label="Share this article"
                      title={shared[post.id] ? 'Link copied!' : 'Share'}
                      className="p-1 px-2 rounded hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer flex items-center gap-1"
                    >
                      <Share2 className={`w-3.5 h-3.5 ${shared[post.id] ? 'text-emerald-600' : 'text-slate-400'}`} />
                      {shared[post.id] && <span className="text-[10px] font-bold text-emerald-700">Copied!</span>}
                    </button>
                  </div>
                </div>
                </div>

              </div>
            ))}
          </div>

          {visibleCount < filteredPosts.length && (
            <div className="flex flex-col items-center gap-2 pt-2">
              <button
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="sheen glass-strong text-violet-800 hover:text-violet-900 font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer"
              >
                Show {Math.min(PAGE_SIZE, filteredPosts.length - visibleCount)} more articles
              </button>
              <span className="text-[10px] text-slate-400 font-mono">
                {filteredPosts.length - visibleCount} still to come
              </span>
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-14 text-slate-500 space-y-3 glass rounded-2xl">
              <SearchX className="w-10 h-10 text-violet-700 mx-auto opacity-70" />
              <p className="text-sm font-semibold text-slate-800">No articles match your search.</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try a broader term like "bonds", "SACCO", or "SEO", or browse everything below.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="sheen bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition cursor-pointer shadow-md shadow-violet-900/20"
              >
                Show All Articles
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
