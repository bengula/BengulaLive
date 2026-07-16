/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { categoryImage } from '../data/media';
import { getAuthorProfile } from '../data/authors';
import { fetchCounts, getLikedIds, toggleLike } from '../data/likes';
import { MarkdownContent } from '../utils/markdownText';
import Seo, { SITE_URL } from '../seo';
import { Search, BookOpen, Clock, Calendar, ArrowLeft, Heart, Share2, SearchX, UserCircle2 } from 'lucide-react';

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

export default function BlogTab() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentActivePostId = id ?? null;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [shared, setShared] = useState<Record<string, boolean>>({});

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

  const activePost = useMemo(() => {
    return blogPosts.find(p => p.id === currentActivePostId);
  }, [currentActivePostId]);

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
  const articleIso =
    activePost && !isNaN(Date.parse(activePost.date))
      ? new Date(activePost.date).toISOString()
      : undefined;
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
        <div id="blog-editorial-article-detail" className="w-full space-y-6">
          <ReadingProgress />
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-xs font-semibold text-violet-800 hover:text-violet-700 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs cursor-pointer transition"
          >
            <ArrowLeft className="w-4 h-4 text-violet-800" />
            <span>Return to Financial Education Hub</span>
          </button>

          {/* Cover image */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs aspect-[16/7]">
            <img
              src={activePost.coverImage ?? categoryImage(activePost.category, 1200)}
              alt={activePost.category}
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
          <div className="space-y-5 prose prose-slate font-sans pb-12">
            <MarkdownContent content={activePost.content} />
          </div>

          {/* Related reading — internal links to keep readers (and crawlers) moving */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-800" />
                Related reading
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                type="text"
                placeholder="Search bonds, stocks, coaching..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-800 py-2.5 pl-10 pr-3 rounded-xl border border-slate-200 focus:outline-none focus:border-violet-800 focus:ring-1 focus:ring-violet-800 text-sm font-medium"
              />
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

          {/* Active-filter summary so readers always know what they are looking at */}
          {(searchQuery.trim() !== '' || selectedCategory !== 'All') && filteredPosts.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium -mt-2">
              <span>
                Showing <strong className="text-slate-800">{filteredPosts.length}</strong> of {blogPosts.length} articles
                {selectedCategory !== 'All' && (
                  <> in <strong className="text-violet-800">{selectedCategory}</strong></>
                )}
                {searchQuery.trim() !== '' && (
                  <> matching "<strong className="text-slate-800">{searchQuery.trim()}</strong>"</>
                )}
              </span>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="text-violet-800 font-bold hover:text-violet-900 underline decoration-violet-800/40 cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Cards List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="glass-card rounded-2xl overflow-hidden transition duration-300 flex flex-col justify-between cursor-pointer group relative"
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
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-slate-900/55 backdrop-blur px-2.5 py-1 text-[11px] font-bold text-white font-mono shadow-sm">
                  <Heart className={`w-3 h-3 ${likedIds.has(post.id) ? 'fill-rose-400 text-rose-400' : 'text-rose-300'}`} />
                  {likes[post.id] || 0}
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-violet-50 text-violet-800 border border-violet-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-violet-800" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Link to={`/blog/${post.id}`} onClick={(e) => e.stopPropagation()} className="block">
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
                  <div className="flex gap-2">
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
