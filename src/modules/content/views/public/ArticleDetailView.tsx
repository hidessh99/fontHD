// ==============================================================================
// GoVPN Article Detail Public View
// Part of Pola C: views/public/ArticleDetailView.tsx
// Algoritma 4: Dynamic Island Route Component
// ==============================================================================

"use client";

import React, { useEffect } from "react";
import { useContentPublic } from "../../hooks/useContentPublic";
import { ContentSkeleton } from "../../components/shared/ContentSkeleton";
import { ArrowLeft, Clock, Eye, User, Share2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface ArticleDetailViewProps {
  slug: string;
}

export function ArticleDetailView({ slug }: ArticleDetailViewProps) {
  const { selectedPost, loading, fetchPostBySlug } = useContentPublic(slug);

  useEffect(() => {
    if (slug) {
      fetchPostBySlug(slug);
    }
  }, [slug, fetchPostBySlug]);

  if (loading || !selectedPost) {
    return <ContentSkeleton />;
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Tautan artikel disalin ke clipboard!");
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Back Link */}
      <div>
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Semua Artikel</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 border-b border-border/40 pb-6">
        {selectedPost.tags && (
          <div className="flex flex-wrap gap-2">
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
          {selectedPost.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <User className="w-3.5 h-3.5 text-primary" />
              {selectedPost.author_name || "Tim Riset Jaringan GoVPN"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {new Date(
                selectedPost.published_at || selectedPost.created_at,
              ).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {selectedPost.views_count !== undefined && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Eye className="w-3.5 h-3.5" />
                  {selectedPost.views_count} Pembaca
                </span>
              </>
            )}
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 bg-background/50 hover:bg-accent transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan</span>
          </button>
        </div>
      </div>

      {/* Featured Image */}
      {selectedPost.featured_image && (
        <div className="rounded-2xl overflow-hidden border border-border/50 shadow-md max-h-96">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedPost.featured_image}
            alt={selectedPost.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Body */}
      <div className="prose prose-invert max-w-none text-foreground/90 space-y-4 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
        {selectedPost.content}
      </div>
    </article>
  );
}
