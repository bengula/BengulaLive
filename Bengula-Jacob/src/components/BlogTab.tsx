/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { blogPosts } from '../data/blogData';
import { BlogPost } from '../types';
import { categoryImage } from '../data/media';
import { getAuthorProfile } from '../data/authors';
import { renderInlineMarkdown } from '../utils/markdownText';
import { Search, Filter, BookOpen, Clock, Calendar, ArrowLeft, Heart, Share2, Sparkles, UserCircle2 } from 'lucide-react';

export default function BlogTab({ activePostId, setActivePostId, onNavigateToAuthor }: { activePostId?: string | null; setActivePostId?: (id: string | null) => void; onNavigateToAuthor?: (authorId: string) => void }) {
  const [localActivePostId, setLocalActivePostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [shared, setShared] = useState<Record<string, boolean>>({});

  const currentActivePostId = activePostId !== undefined ? activePostId : localActivePostId;
  const currentSetActivePostId = setActivePostId || setLocalActivePostId;

  const categories = ['All', 'Bonds & Bills', 'Unit Trusts', 'SME Trade Finance', 'Real Estate', 'Agri-Logistics', 'Wealth Optimization'];

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
    navigator.clipboard.writeText(`${window.location.origin}/#blog/${id}`).catch(() => {});
  };

  // Helper to parse Markdown-like syntax for safe, high-polish local rendering
  const renderMarkdown = (text: string) => {
    const blocks: React.ReactNode[] = [];
    const lines = text.split('\n');
    let paragraphLines: string[] = [];
    let listItems: string[] = [];
    let orderedItems: string[] = [];
    let tableLines: string[] = [];

    const parseImage = (value: string) => {
      const match = value.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)$/);
      if (!match) return null;

      return {
        alt: match[1],
        src: match[2],
        caption: match[3],
      };
    };

    const flushParagraph = () => {
      if (paragraphLines.length === 0) return;
      const content = paragraphLines.join(' ').trim();
      if (content) {
        blocks.push(
          <p key={`p-${blocks.length}`} className="text-slate-600 text-sm leading-relaxed font-normal">
            {renderInlineMarkdown(content)}
          </p>
        );
      }
      paragraphLines = [];
    };

    const flushList = () => {
      if (listItems.length === 0) return;
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="list-disc list-outside space-y-1.5 pl-5 text-slate-650 text-sm py-2">
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    };

    const flushOrderedList = () => {
      if (orderedItems.length === 0) return;
      blocks.push(
        <ol key={`ol-${blocks.length}`} className="list-decimal list-outside space-y-1.5 pl-5 text-slate-650 text-sm py-2">
          {orderedItems.map((item, idx) => (
            <li key={idx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ol>
      );
      orderedItems = [];
    };

    const flushTable = () => {
      if (tableLines.length === 0) return;
      const rows = tableLines
        .filter((row) => !/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(row))
        .map((row) => row.replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()));

      if (rows.length > 0) {
        const [head, ...body] = rows;
        blocks.push(
          <div key={`table-${blocks.length}`} className="overflow-x-auto my-4 border border-slate-200 rounded-xl bg-slate-50 p-1 shadow-xs">
            <table className="w-full text-xs text-left text-slate-700">
              <thead className="text-[10px] text-slate-700 uppercase bg-slate-100">
                <tr>
                  {head.map((cell, idx) => (
                    <th key={idx} className="p-3 font-extrabold">
                      {renderInlineMarkdown(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 leading-relaxed font-normal">
                {body.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="p-3">
                        {renderInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      tableLines = [];
    };

    const flushAll = () => {
      flushParagraph();
      flushList();
      flushOrderedList();
      flushTable();
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushAll();
        return;
      }

      if (trimmed.startsWith('####')) {
        flushAll();
        blocks.push(
          <h4 key={`h4-${blocks.length}`} className="text-lg font-bold text-slate-800 pt-4 pb-1">
            {renderInlineMarkdown(trimmed.replace('####', '').trim())}
          </h4>
        );
        return;
      }

      if (trimmed.startsWith('###')) {
        flushAll();
        blocks.push(
          <h3 key={`h3-${blocks.length}`} className="text-xl font-bold text-slate-900 pt-6 pb-2 border-b border-slate-205">
            {renderInlineMarkdown(trimmed.replace('###', '').trim())}
          </h3>
        );
        return;
      }

      if (trimmed === '---' || trimmed.startsWith('===')) {
        flushAll();
        blocks.push(<div key={`hr-${blocks.length}`} className="w-full border-t border-slate-200 my-4"></div>);
        return;
      }

      if (trimmed.startsWith('|')) {
        flushParagraph();
        flushList();
        flushOrderedList();
        tableLines.push(trimmed);
        return;
      }

      const image = parseImage(trimmed);
      if (image) {
        flushAll();
        blocks.push(
          <figure key={`image-${blocks.length}`} className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full max-h-[520px] object-contain bg-slate-100"
            />
            {image.caption && (
              <figcaption className="border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] leading-relaxed text-slate-500">
                {renderInlineMarkdown(image.caption)}
              </figcaption>
            )}
          </figure>
        );
        return;
      }

      if (trimmed.startsWith('- ')) {
        flushParagraph();
        flushOrderedList();
        flushTable();
        listItems.push(trimmed.replace(/^-+\s*/, ''));
        return;
      }

      if (/^\d+\.\s/.test(trimmed)) {
        flushParagraph();
        flushList();
        flushTable();
        orderedItems.push(trimmed.replace(/^\d+\.\s/, ''));
        return;
      }

      if (trimmed.startsWith('$$') || trimmed.includes('$$')) {
        flushAll();
        blocks.push(
          <div key={`math-${blocks.length}`} className="bg-blue-50 border border-blue-100 rounded-xl p-4 my-3 text-center text-sm font-mono text-blue-950 font-bold shadow-xs">
            {trimmed.replace(/\$\$/g, '').trim()}
          </div>
        );
        return;
      }

      flushList();
      flushOrderedList();
      flushTable();
      paragraphLines.push(trimmed);
    });

    flushAll();
    return blocks;
  };

  return (
    <div id="blog-tab-root" className="space-y-8 animate-fadeIn">
      
      {currentActivePostId && activePost ? (
        // ================= EDITORIAL DETAIL ARTICLE VIEW =================
        <div id="blog-editorial-article-detail" className="max-w-3xl mx-auto space-y-6">
          <button
            onClick={() => currentSetActivePostId(null)}
            className="flex items-center gap-2 text-xs font-semibold text-blue-900 hover:text-blue-850 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs cursor-pointer transition"
          >
            <ArrowLeft className="w-4 h-4 text-blue-900" />
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
          <div className="space-y-4 border-b border-slate-150 pb-6 pt-4">
            <span className="text-[10px] bg-blue-50 text-blue-900 border border-blue-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
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
                          {profile && onNavigateToAuthor ? (
                            <button
                              onClick={() => onNavigateToAuthor(profile.id)}
                              className="text-blue-900 hover:text-blue-700 hover:underline decoration-blue-900/40 transition cursor-pointer"
                            >
                              {a.name}
                            </button>
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
                <span className="flex items-center gap-1 font-semibold text-blue-905">
                  <Clock className="w-3.5 h-3.5 text-blue-900" />
                  {activePost.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Body Narrative details */}
          <div className="space-y-5 prose prose-slate font-sans pb-12">
            {renderMarkdown(activePost.content)}
          </div>

          {/* Share / Social reactions footer */}
          <div className="border-t border-slate-150 pt-6 flex items-center justify-between text-xs text-slate-500 font-sans">
            <span className="font-medium text-slate-600">Did you find this educational segment helpful?</span>
            <div className="flex gap-3">
              <button
                onClick={(e) => handleLike(activePost.id, e)}
                className="flex items-center gap-1.5 py-2 px-3 bg-white border border-slate-200 rounded-lg text-slate-605 hover:text-rose-600 hover:bg-slate-50 transition cursor-pointer shadow-xs font-bold"
              >
                <Heart className={`w-4 h-4 ${likes[activePost.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span className="font-mono">{likes[activePost.id] || 8} Likes</span>
              </button>
              <button
                onClick={(e) => handleShare(activePost.id, e)}
                className="flex items-center gap-1.5 py-2 px-3 bg-white border border-slate-200 rounded-lg text-slate-605 hover:text-blue-900 hover:bg-slate-50 transition cursor-pointer shadow-xs font-bold"
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-205 pb-6">
            <div className="md:col-span-5 space-y-1">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-900 animate-pulse" />
                Financial Education Hub
              </h2>
              <p className="text-xs text-slate-500">
                Explore real and actionable guidelines addressing the Kenyan market ecosystem.
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
                className="w-full bg-white text-slate-800 text-xs py-2.5 pl-10 pr-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 text-sm font-medium"
              />
            </div>

            {/* Quick Category Swiper */}
            <div className="md:col-span-3 relative">
              <select
                id="blog-category-select-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white text-slate-800 text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 font-semibold cursor-pointer"
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
                onClick={() => currentSetActivePostId(post.id)}
                className="bg-white border border-slate-205 rounded-2xl overflow-hidden hover:border-blue-900/40 hover:shadow-md transition duration-300 flex flex-col justify-between cursor-pointer group shadow-xs relative"
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
                    <span className="text-[10px] bg-blue-50 text-blue-900 border border-blue-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-blue-900" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors duration-200 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sans">
                  <span className="font-bold text-slate-650">
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
