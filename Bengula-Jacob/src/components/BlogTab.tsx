/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { categoryImage } from '../data/media';
import { getAuthorProfile } from '../data/authors';
import { MarkdownContent } from '../utils/markdownText';
import Seo, { SITE_URL } from '../seo';
import { Search, BookOpen, Clock, Calendar, ArrowLeft, Heart, Share2, Sparkles, UserCircle2 } from 'lucide-react';

export default function BlogTab() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentActivePostId = id ?? null;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [shared, setShared] = useState<Record<string, boolean>>({});

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
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShared(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setShared(prev => ({ ...prev, [id]: false }));
    }, 2000);
    
    // Copy URL to clipboard
    navigator.clipboard.writeText(`${window.location.origin}/blog/${id}`).catch(() => {});
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
          title={`${activePost.title} | Bengula Inc`}
          description={activePost.summary}
          path={`/blog/${activePost.id}`}
          image={articleImage}
          type="article"
          jsonLd={articleJsonLd}
        />
      ) : (
        <Seo
          title="Blog & Education | Bengula Inc"
          description="Practical notes on Kenyan treasury bonds, MMFs, SACCOs, SME trade finance, real estate, and using data to grow — financial education for owners and professionals."
          path="/blog"
        />
      )}

      {currentActivePostId && activePost ? (
        // ================= EDITORIAL DETAIL ARTICLE VIEW =================
        <div id="blog-editorial-article-detail" className="max-w-3xl mx-auto space-y-6">
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
              loading="lazy"
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
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-800" />
                Related reading
              </h3>
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
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-violet-800 transition-colors leading-snug">
                      {post.title}
                    </h4>
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
                <Heart className={`w-4 h-4 ${likes[activePost.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span className="font-mono">{likes[activePost.id] || 0} Likes</span>
              </button>
              <button
                onClick={(e) => handleShare(activePost.id, e)}
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
                Practical notes across both pillars — business finance and banking, plus data, SEO, and digital growth.
              </p>
            </div>

            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3 top-2.5 text-slate-400 w-4.5 h-4.5" />
              <input
                id="blog-search-query-input"
                type="text"
                placeholder="Search bonds, stocks, coaching..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-800 text-xs py-2.5 pl-10 pr-3 rounded-xl border border-slate-200 focus:outline-none focus:border-violet-800 focus:ring-1 focus:ring-violet-800 text-sm font-medium"
              />
            </div>

            {/* Quick Category Swiper */}
            <div className="md:col-span-3 relative">
              <select
                id="blog-category-select-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white text-slate-800 text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-violet-800 focus:ring-1 focus:ring-violet-800 font-semibold cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'Filter by Category' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-800 transition-colors duration-200 leading-snug">
                        {post.title}
                      </h3>
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
                      className="p-1 px-2 rounded hover:bg-slate-100 flex items-center gap-1 font-mono hover:text-rose-600 transition"
                    >
                      <Heart className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500" />
                      <span className="font-bold text-slate-700">{likes[post.id] || 0}</span>
                    </button>
                    <button
                      onClick={(e) => handleShare(post.id, e)}
                      className="p-1 px-2 rounded hover:bg-slate-100 hover:text-slate-900 transition"
                    >
                      <Share2 className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>
                </div>

              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Sparkles className="w-10 h-10 text-amber-500 mx-auto opacity-70 animate-spin" style={{ animationDuration: '3s' }} />
              <p className="text-sm font-semibold text-slate-800">No insights matches found.</p>
              <p className="text-xs text-slate-500">Try searching for other parameters like bonds or stocks.</p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

