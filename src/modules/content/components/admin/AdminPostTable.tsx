// ==============================================================================
// GoVPN Admin Post Table Component
// Part of Pola C: components/admin/AdminPostTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useMemo } from "react";
import { Post, PostStatus } from "../../types/content.types";
import { PostStatusBadge } from "../shared/PostStatusBadge";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import { FileText, Edit, Trash2 } from "lucide-react";

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
  const columns: ColumnDef<Post>[] = useMemo(
    () => [
      {
        id: "title_slug",
        header: "Judul & Slug",
        className: "max-w-sm",
        cell: (post) => (
          <div>
            <div className="font-semibold text-foreground truncate font-sans">
              {post.title}
            </div>
            <div className="text-muted-foreground font-mono text-[11px]">
              /{post.slug}
            </div>
          </div>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: (post) => <PostStatusBadge status={post.status} />,
      },
      {
        id: "author",
        header: "Penulis",
        className: "text-muted-foreground whitespace-nowrap font-sans",
        cell: (post) => post.author_name || "Admin Editorial",
      },
      {
        id: "views",
        header: "Views",
        className: "font-mono text-muted-foreground whitespace-nowrap",
        cell: (post) => post.views_count || 0,
      },
      {
        id: "date",
        header: "Tanggal Terbit",
        className: "text-muted-foreground whitespace-nowrap font-sans",
        cell: (post) =>
          new Date(post.published_at || post.created_at).toLocaleDateString(
            "id-ID",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            },
          ),
      },
      {
        id: "actions",
        header: "Aksi Operasional",
        align: "right",
        cell: (post) => (
          <div className="inline-flex items-center gap-1.5">
            <NativeSelect
              variant="rounded"
              value={post.status}
              onChange={(e) =>
                onUpdateStatus(post.id, e.target.value as PostStatus)
              }
              className="h-7 text-[11px] font-mono font-semibold"
            >
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="DRAFT">DRAFT</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </NativeSelect>

            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
              onClick={() => onEditPost(post)}
              title="Edit Artikel"
            >
              <Edit className="w-3.5 h-3.5" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
              onClick={() => onDeletePost(post.id)}
              title="Hapus Artikel"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ),
      },
    ],
    [onDeletePost, onEditPost, onUpdateStatus],
  );

  const filters: DataTableFilterConfig<Post>[] = useMemo(
    () => [
      {
        id: "status",
        label: "Status",
        defaultValue: "ALL",
        options: [
          { label: "Semua Status", value: "ALL" },
          { label: "PUBLISHED", value: "PUBLISHED" },
          { label: "DRAFT", value: "DRAFT" },
          { label: "ARCHIVED", value: "ARCHIVED" },
        ],
        filterFn: (post, val) => post.status?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [],
  );

  return (
    <DataTable<Post>
      data={posts}
      columns={columns}
      keyExtractor={(post) => post.id}
      searchable={true}
      searchPlaceholder="Cari judul artikel atau slug..."
      searchButtonText="Cari"
      searchAccessor={(post) => [post.title, post.slug, post.author_name]}
      filters={filters}
      paginated={true}
      pageSize={10}
      entityName="artikel"
      emptyIcon={FileText}
      emptyTitle="Tidak Ada Artikel"
      emptyDescription="Belum ada artikel atau konten yang sesuai dengan filter pencarian."
    />
  );
}
