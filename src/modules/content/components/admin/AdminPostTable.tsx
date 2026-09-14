// ==============================================================================
// GoVPN Admin Post Table Component
// Part of Pola C: components/admin/AdminPostTable.tsx
// 100% Coinbase Institutional Design System (Articles & CMS Manager)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Post, PostStatus } from "../../types/content.types";
import { PostStatusBadge } from "../shared/PostStatusBadge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  FileText,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
  Clock,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface AdminPostTableProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string | number) => Promise<unknown>;
  onUpdateStatus: (id: string | number, status: PostStatus) => Promise<unknown>;
}

export function AdminPostTable({
  posts,
  onEditPost,
  onDeletePost,
  onUpdateStatus,
}: AdminPostTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari judul artikel atau slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === st
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-background/50 border border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {st === "ALL" ? "Semua Status" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filteredPosts.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Tidak Ada Artikel"
          description="Belum ada artikel atau konten yang sesuai dengan filter pencarian."
        />
      ) : (
        <div className="rounded-xl border border-border/50 overflow-hidden bg-card/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border/40">
                <tr>
                  <th className="p-3.5 font-semibold">Judul & Slug</th>
                  <th className="p-3.5 font-semibold">Status</th>
                  <th className="p-3.5 font-semibold">Penulis</th>
                  <th className="p-3.5 font-semibold">Views</th>
                  <th className="p-3.5 font-semibold">Tanggal Terbit</th>
                  <th className="p-3.5 font-semibold text-right">Aksi Operasional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-accent/30 transition-colors">
                    <td className="p-3.5 max-w-sm">
                      <div className="font-semibold text-foreground truncate">{post.title}</div>
                      <div className="text-muted-foreground font-mono text-[11px]">
                        /{post.slug}
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <PostStatusBadge status={post.status} />
                    </td>
                    <td className="p-3.5 whitespace-nowrap text-muted-foreground">
                      {post.author_name || "Admin Editorial"}
                    </td>
                    <td className="p-3.5 whitespace-nowrap font-mono text-muted-foreground">
                      {post.views_count || 0}
                    </td>
                    <td className="p-3.5 whitespace-nowrap text-muted-foreground">
                      {new Date(post.published_at || post.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <select
                          value={post.status}
                          onChange={(e) => onUpdateStatus(post.id, e.target.value as PostStatus)}
                          className="h-7 px-2 text-[11px] rounded border border-border/50 bg-background font-semibold focus:outline-none focus:ring-1 focus:ring-primary mr-1"
                        >
                          <option value="PUBLISHED">PUBLISHED</option>
                          <option value="DRAFT">DRAFT</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          onClick={() => onEditPost(post)}
                          title="Edit Artikel"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => onDeletePost(post.id)}
                          title="Hapus Artikel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
