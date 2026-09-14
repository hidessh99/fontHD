// ==============================================================================
// GoVPN Public Articles & Knowledge Base View
// Part of Pola C: views/public/ArticlesView.tsx
// Algoritma 4: Dynamic Island Route Component
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useContentPublic } from "../../hooks/useContentPublic";
import { ContentSkeleton } from "../../components/shared/ContentSkeleton";
import { PostCard } from "../../components/shared/PostCard";
import { BookOpen, Search, Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function ArticlesView() {
  const { posts, loading, refresh } = useContentPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  if (loading) {
    return <ContentSkeleton />;
  }

  // Collect all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags || []))
  );

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.summary && p.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag =
      selectedTag === "ALL" || (p.tags && p.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2">
            <BookOpen className="w-3.5 h-3.5" /> Pusat Pengetahuan & Panduan
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Artikel, Tutorial & Update Jaringan
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Panduan teknis bypass DPI, optimalisasi koneksi gaming, dan arsitektur keamanan GoVPN.
          </p>
        </div>

        <button
          onClick={() => {
            refresh();
            toast.info("Memperbarui artikel...");
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-border/50 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Segarkan</span>
        </button>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari artikel atau tutorial..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <button
            onClick={() => setSelectedTag("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              selectedTag === "ALL"
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-background/50 border border-border/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            Semua Topik
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-background/50 border border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Articles */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
