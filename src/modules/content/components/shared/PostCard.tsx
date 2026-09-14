// ==============================================================================
// GoVPN Post Card Component
// Part of Pola C: components/shared/PostCard.tsx
// 100% Coinbase Institutional Design System (Article / Knowledge Card)
// ==============================================================================

"use client";

import React from "react";
import { Post } from "../../types/content.types";
import { Clock, Eye, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

function getCleanExcerpt(
  content?: string,
  summary?: string,
  maxLength = 140,
): string {
  if (summary && summary.trim().length > 0) {
    return summary.trim();
  }
  if (!content) {
    return "";
  }
  let previous: string;
  let text = content;
  do {
    previous = text;
    text = text.replace(/<[^>]*>/g, "");
  } while (text !== previous);

  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > maxLength ? `${clean.slice(0, maxLength)}...` : clean;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-2xl border border-border/50 bg-card/60 hover:bg-card hover:border-primary/40 hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between">
      {/* Thumbnail or Fallback Header */}
      {post.featured_image ? (
        <div className="h-44 w-full overflow-hidden bg-muted relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-32 w-full bg-primary/10 flex items-center justify-center border-b border-border/40">
          <BookOpen className="w-10 h-10 text-primary/40 group-hover:scale-110 transition-transform duration-300" />
        </div>
      )}

      {/* Body */}
      <div className="p-5 flex-1 space-y-3">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
          {getCleanExcerpt(post.content, post.summary, 140)}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 py-3.5 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3" />
            {new Date(post.published_at || post.created_at).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            )}
          </span>
          {post.views_count !== undefined && (
            <span className="flex items-center gap-1 text-[11px]">
              <Eye className="w-3 h-3" />
              {post.views_count}
            </span>
          )}
        </div>

        <Link
          href={`/articles/${post.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-blue-700 dark:text-blue-400 group-hover:translate-x-0.5 transition-all text-xs"
        >
          <span>Baca</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
