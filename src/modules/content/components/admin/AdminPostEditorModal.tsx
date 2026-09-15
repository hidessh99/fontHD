// ==============================================================================
// GoVPN Admin Post Editor Modal Component
// Part of Pola C: components/admin/AdminPostEditorModal.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

"use client";

import React, { useState, useEffect } from "react";
import { Post, PostStatus } from "../../types/content.types";
import { CreatePostDto, UpdatePostDto } from "../../types/admin.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { FileText, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

interface AdminPostEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postToEdit?: Post | null;
  onSave: (
    dto: CreatePostDto | UpdatePostDto,
    id?: string | number,
  ) => Promise<unknown>;
}

export function AdminPostEditorModal({
  open,
  onOpenChange,
  postToEdit,
  onSave,
}: AdminPostEditorModalProps) {
  const { t } = useI18n();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<PostStatus>("PUBLISHED");
  const [tagsText, setTagsText] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setSlug(postToEdit.slug);
      setSummary(postToEdit.summary || "");
      setContent(postToEdit.content);
      setStatus(postToEdit.status);
      setTagsText((postToEdit.tags || []).join(", "));
      setFeaturedImage(postToEdit.featured_image || "");
    } else {
      setTitle("");
      setSlug("");
      setSummary("");
      setContent("");
      setStatus("PUBLISHED");
      setTagsText("VPN, Tunneling, Keamanan");
      setFeaturedImage("");
    }
  }, [postToEdit, open]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!postToEdit) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !content.trim()) {
      toast.error(t("content.requiredFields"));
      return;
    }

    setSaving(true);
    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (postToEdit) {
        await onSave(
          {
            title: title.trim(),
            slug: slug.trim(),
            summary: summary.trim() || undefined,
            content: content.trim(),
            status,
            tags,
            featured_image: featuredImage.trim() || undefined,
          },
          postToEdit.id,
        );
        toast.success(t("content.postUpdated"));
      } else {
        await onSave({
          title: title.trim(),
          slug: slug.trim(),
          summary: summary.trim() || undefined,
          content: content.trim(),
          status,
          tags,
          featured_image: featuredImage.trim() || undefined,
        });
        toast.success(t("content.postPublished"));
      }
      onOpenChange(false);
    } catch {
      toast.error(t("content.postSaveFailed"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-175 max-h-[90vh] flex flex-col bg-card border-border/60 p-0 overflow-hidden">
        <DialogHeader className="p-5 border-b border-border/40 bg-muted/20">
          <div className="flex items-center gap-2 text-primary mb-1">
            <FileText className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t("content.cmsEditorBadge")}
            </span>
          </div>
          <DialogTitle className="text-xl font-bold">
            {postToEdit
              ? t("content.editModalTitle")
              : t("content.createModalTitle")}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-5 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                {t("content.postTitleLabel")}
              </label>
              <Input
                type="text"
                required
                placeholder={t("content.postTitlePlaceholder")}
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                {t("content.slugLabel")}
              </label>
              <Input
                type="text"
                required
                placeholder={t("content.slugPlaceholder")}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                {t("content.pubStatusLabel")}
              </label>
              <NativeSelect
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="font-semibold"
              >
                <option value="PUBLISHED">
                  {t("content.statusPublishedOpt")}
                </option>
                <option value="DRAFT">{t("content.statusDraftOpt")}</option>
                <option value="ARCHIVED">{t("content.statusArchivedOpt")}</option>
              </NativeSelect>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                {t("content.tagsLabel")}
              </label>
              <Input
                type="text"
                placeholder="V2Ray, DPI, Tutorial"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              {t("content.summaryLabel")}
            </label>
            <Input
              type="text"
              placeholder={t("content.summaryPlaceholder")}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              {t("content.coverImageLabel")}
            </label>
            <Input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              {t("content.bodyLabel")}
            </label>
            <Textarea
              required
              rows={8}
              placeholder={t("content.bodyPlaceholder")}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="font-mono resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              {t("content.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t("content.saving")}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>
                    {postToEdit ? t("content.updatePost") : t("content.publishPost")}
                  </span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
