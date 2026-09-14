// ==============================================================================
// GoVPN Admin Content & CMS View
// Part of Pola C: views/admin/AdminContentView.tsx
// Algoritma 4: Dynamic Island Route Component (CMS & System Config)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useContentAdmin } from "../../hooks/useContentAdmin";
import { ContentSkeleton } from "../../components/shared/ContentSkeleton";
import { AdminPostTable } from "../../components/admin/AdminPostTable";
import { AdminPostEditorModal } from "../../components/admin/AdminPostEditorModal";
import { AdminSettingsTable } from "../../components/admin/AdminSettingsTable";
import { Post } from "../../types/content.types";
import { CreatePostDto } from "../../types/admin.types";
import { RefreshCw, FileText, Sliders, Plus, Newspaper } from "lucide-react";
import { toast } from "sonner";

export function AdminContentView() {
  const {
    posts,
    settings,
    loading,
    createPost,
    updatePost,
    deletePost,
    updatePostStatus,
    createSetting,
    updateSetting,
    deleteSetting,
    refresh,
  } = useContentAdmin();

  const [activeTab, setActiveTab] = useState<"posts" | "settings">("posts");
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  if (loading) {
    return <ContentSkeleton />;
  }

  const handleOpenCreatePost = () => {
    setPostToEdit(null);
    setIsEditorModalOpen(true);
  };

  const handleOpenEditPost = (post: Post) => {
    setPostToEdit(post);
    setIsEditorModalOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2">
            <Newspaper className="w-3.5 h-3.5" /> CMS & Master Settings Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Manajemen Konten & Konfigurasi Sistem
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Publikasikan panduan teknis, kelola metadata artikel, dan sesuaikan
            parameter operasional sistem.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              refresh();
              toast.info("Data diperbarui");
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-border/50 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Segarkan</span>
          </button>

          {activeTab === "posts" && (
            <button
              onClick={handleOpenCreatePost}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Artikel Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border/40">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "posts"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Artikel & Tutorial ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "settings"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Parameter Sistem ({settings.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "posts" ? (
        <section className="space-y-4">
          <AdminPostTable
            posts={posts}
            onEditPost={handleOpenEditPost}
            onDeletePost={async (id) => {
              await deletePost(id);
              toast.success("Artikel berhasil dihapus");
            }}
            onUpdateStatus={async (id, status) => {
              await updatePostStatus(id, status);
              toast.success(`Status artikel diubah ke ${status}`);
            }}
          />
        </section>
      ) : (
        <section className="space-y-4">
          <AdminSettingsTable
            settings={settings}
            onCreateSetting={createSetting}
            onUpdateSetting={updateSetting}
            onDeleteSetting={async (id) => {
              await deleteSetting(id);
              toast.success("Parameter sistem dihapus");
            }}
          />
        </section>
      )}

      {/* Post Editor Modal */}
      <AdminPostEditorModal
        open={isEditorModalOpen}
        onOpenChange={setIsEditorModalOpen}
        postToEdit={postToEdit}
        onSave={async (dto, id) => {
          if (id) {
            await updatePost(id, dto);
          } else {
            await createPost(dto as CreatePostDto);
          }
        }}
      />
    </div>
  );
}
