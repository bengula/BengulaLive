/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Users, ArrowLeft, ExternalLink, BookOpen, Clock, UserCircle2, ChevronRight } from 'lucide-react';
import { authorProfiles, getAuthorById, AuthorProfile } from '../data/authors';
import { blogPosts } from '../data/blogData';
import { BlogPost } from '../types';

/** Every post this author wrote or co-wrote (matched by name). */
function articlesFor(profile: AuthorProfile): BlogPost[] {
  return blogPosts.filter((p) =>
    [p.author, ...(p.coAuthors ?? [])].some((a) => a.name === profile.name),
  );
}

function Avatar({ a, size }: { a: AuthorProfile; size: string }) {
  return a.avatar ? (
    <img
      src={a.avatar}
      alt={a.name}
      loading="lazy"
      className={`${size} rounded-full object-cover border-2 border-white shadow-xs bg-slate-100`}
    />
  ) : (
    <UserCircle2 className={`${size} text-slate-400 bg-white rounded-full border-2 border-white`} />
  );
}

export default function AuthorsTab({
  activeAuthorId,
  setActiveAuthorId,
  onNavigateToBlog,
}: {
  activeAuthorId?: string | null;
  setActiveAuthorId?: (id: string | null) => void;
  onNavigateToBlog?: (postId: string) => void;
}) {
  const setActive = setActiveAuthorId ?? (() => {});
  const activeProfile = useMemo(
    () => (activeAuthorId ? getAuthorById(activeAuthorId) : undefined),
    [activeAuthorId],
  );

  // ================= AUTHOR DETAIL VIEW =================
  if (activeProfile) {
    const articles = articlesFor(activeProfile);
    return (
      <div id="author-detail" className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
        <button
          onClick={() => {
            setActive(null);
            window.location.hash = '';
          }}
          className="flex items-center gap-2 text-xs font-semibold text-blue-900 hover:text-blue-800 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs cursor-pointer transition"
        >
          <ArrowLeft className="w-4 h-4 text-blue-900" />
          <span>All Authors</span>
        </button>

        {/* Profile header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Avatar a={activeProfile} size="w-24 h-24" />
            <div className="space-y-3 flex-1">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-950 leading-tight">{activeProfile.name}</h2>
                <p className="text-sm font-semibold text-blue-900 mt-0.5">{activeProfile.role}</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">{activeProfile.bio}</p>
              {activeProfile.links && activeProfile.links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeProfile.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-blue-900 hover:text-white border border-slate-200 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
                    >
                      {l.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Their articles */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 px-1">
            <BookOpen className="w-4 h-4 text-blue-900" />
            {articles.length > 0
              ? `${articles.length} article${articles.length > 1 ? 's' : ''} by ${activeProfile.name}`
              : `No articles yet by ${activeProfile.name}`}
          </h3>
          <div className="space-y-3">
            {articles.map((post) => (
              <button
                key={post.id}
                onClick={() => onNavigateToBlog?.(post.id)}
                className="w-full text-left bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-900/40 hover:shadow-md transition group shadow-xs flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] bg-blue-50 text-blue-900 border border-blue-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                    {post.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-900" />
                    {post.readTime} · {post.date}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ================= AUTHORS LIST VIEW =================
  return (
    <div id="authors-tab-root" className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-200 pb-6 space-y-1">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-900" />
          Our Authors
        </h2>
        <p className="text-xs text-slate-500">
          The people — and tools — behind the Financial Education Hub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {authorProfiles.map((profile) => {
          const count = articlesFor(profile).length;
          return (
            <button
              key={profile.id}
              onClick={() => {
                setActive(profile.id);
                window.location.hash = `author/${profile.id}`;
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-900/40 hover:shadow-md transition duration-300 shadow-xs group cursor-pointer flex gap-4 items-start"
            >
              <Avatar a={profile} size="w-16 h-16" />
              <div className="space-y-1.5 min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {profile.name}
                </h3>
                <p className="text-[11px] font-semibold text-blue-900">{profile.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3">{profile.bio}</p>
                <p className="text-[10px] text-slate-400 font-mono font-bold pt-1 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {count} article{count === 1 ? '' : 's'}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
