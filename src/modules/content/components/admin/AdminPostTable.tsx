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
import { useI18n } from "@/lib/i18n";

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
  const { t, locale } = useI18n();

  const columns: ColumnDef<Post>[] = useMemo(
    () => [
      {
        id: "title_slug",
        header: t("content.colTitleSlug"),
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
        header: t("content.colStatus"),
        cell: (post) => <PostStatusBadge status={post.status} />,
      },
      {
        id: "author",
        header: t("content.colAuthor"),
        className: "text-muted-foreground whitespace-nowrap font-sans",
        cell: (post) => post.author_name || t("content.defaultAuthorAdmin"),
      },
      {
        id: "views",
        header: t("content.colViews"),
        className: "font-mono text-muted-foreground whitespace-nowrap",
        cell: (post) => post.views_count || 0,
      },
      {
        id: "date",
        header: t("content.colDate"),
        className: "text-muted-foreground whitespace-nowrap font-sans",
        cell: (post) =>
          new Date(post.published_at || post.created_at).toLocaleDateString(
            locale === "id" ? "id-ID" : "en-US",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            },
          ),
      },
      {
        id: "actions",
        header: t("content.colActions"),
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
              title={t("content.editPost")}
            >
              <Edit className="w-3.5 h-3.5" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
              onClick={() => onDeletePost(post.id)}
              title={t("content.deletePost")}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ),
      },
    ],
    [locale, onDeletePost, onEditPost, onUpdateStatus, t],
  );

  const filters: DataTableFilterConfig<Post>[] = useMemo(
    () => [
      {
        id: "status",
        label: t("content.colStatus"),
        defaultValue: "ALL",
        options: [
          { label: t("content.allStatuses"), value: "ALL" },
          { label: "PUBLISHED", value: "PUBLISHED" },
          { label: "DRAFT", value: "DRAFT" },
          { label: "ARCHIVED", value: "ARCHIVED" },
        ],
        filterFn: (post, val) => post.status?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [t],
  );

  return (
    <DataTable<Post>
      data={posts}
      columns={columns}
      keyExtractor={(post) => post.id}
      searchable={true}
      searchPlaceholder={t("content.searchPostPlaceholder")}
      searchButtonText={t("common.search", "Search")}
      searchAccessor={(post) => [post.title, post.slug, post.author_name]}
      filters={filters}
      paginated={true}
      pageSize={10}
      entityName={t("content.entityName")}
      emptyIcon={FileText}
      emptyTitle={t("content.noPostsTitle")}
      emptyDescription={t("content.noPostsDesc")}
    />
  );
}
