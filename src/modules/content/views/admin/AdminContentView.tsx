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
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

export function AdminContentView() {
  const { t } = useI18n();
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
            <Newspaper className="w-3.5 h-3.5" /> {t("content.adminBadge")}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t("content.adminTitle")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("content.adminSubtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refresh();
              toast.info(t("common.dataRefreshed", "Data refreshed"));
            }}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t("common.refresh")}</span>
          </Button>

          {activeTab === "posts" && (
            <Button
              size="sm"
              onClick={handleOpenCreatePost}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{t("content.writeNewPost")}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as "posts" | "settings")}
      >
        <TabsList variant="line" className="w-full justify-start border-b border-border/40">
          <TabsTrigger value="posts" className="gap-2">
            <FileText className="w-4 h-4" />
            <span>{t("content.articlesAndTutorials", { count: posts.length })}</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Sliders className="w-4 h-4" />
            <span>{t("content.systemParameters", { count: settings.length })}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tab Panels */}
      {activeTab === "posts" ? (
        <section className="space-y-4">
          <AdminPostTable
            posts={posts}
            onEditPost={handleOpenEditPost}
            onDeletePost={async (id) => {
              await deletePost(id);
              toast.success(t("content.postDeleted"));
            }}
            onUpdateStatus={async (id, status) => {
              await updatePostStatus(id, status);
              toast.success(t("content.postStatusUpdated", { status }));
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
              toast.success(t("content.settingDeleted"));
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
