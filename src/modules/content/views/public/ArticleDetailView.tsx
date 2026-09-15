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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

interface ArticleDetailViewProps {
  slug: string;
}

export function ArticleDetailView({ slug }: ArticleDetailViewProps) {
  const { t, locale } = useI18n();
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
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t("content.linkCopied"));
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
          <span>{t("content.backToAllArticles")}</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 border-b border-border/40 pb-6">
        {selectedPost.tags && (
          <div className="flex flex-wrap gap-2">
            {selectedPost.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 bg-primary/10 text-primary border-primary/20"
              >
                #{tag}
              </Badge>
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
              {selectedPost.author_name || t("content.defaultAuthor")}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {new Date(
                selectedPost.published_at || selectedPost.created_at,
              ).toLocaleDateString(
                locale === "id" ? "id-ID" : "en-US",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </span>
            {selectedPost.views_count !== undefined && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Eye className="w-3.5 h-3.5" />
                  {selectedPost.views_count} {t("content.readers")}
                </span>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t("content.share")}</span>
          </Button>
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
