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
      toast.error("Judul, slug, dan isi konten wajib diisi");
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
        toast.success("Artikel berhasil diperbarui!");
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
        toast.success("Artikel baru berhasil diterbitkan!");
      }
      onOpenChange(false);
    } catch {
      toast.error("Gagal menyimpan artikel");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col bg-card border-border/60 p-0 overflow-hidden">
        <DialogHeader className="p-5 border-b border-border/40 bg-muted/20">
          <div className="flex items-center gap-2 text-primary mb-1">
            <FileText className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              CMS Content Editor
            </span>
          </div>
          <DialogTitle className="text-xl font-bold">
            {postToEdit
              ? "Edit Artikel / Panduan"
              : "Tulis Artikel / Panduan Baru"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-5 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Judul Artikel
              </label>
              <Input
                type="text"
                required
                placeholder="Cara Mengatasi DPI Filtering ISP Telkomsel..."
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Slug URL
              </label>
              <Input
                type="text"
                required
                placeholder="cara-mengatasi-dpi-telkomsel"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Status Publikasi
              </label>
              <NativeSelect
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="font-semibold"
              >
                <option value="PUBLISHED">
                  PUBLISHED (Diterbitkan Langsung)
                </option>
                <option value="DRAFT">DRAFT (Konsep Internal)</option>
                <option value="ARCHIVED">ARCHIVED (Diarsipkan)</option>
              </NativeSelect>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Tagar (Koma dipisah)
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
              Ringkasan / Sinopsis (Excerpt)
            </label>
            <Input
              type="text"
              placeholder="Ringkasan 1-2 kalimat untuk preview card di beranda pengetahuan..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              URL Gambar Sampul (Opsional)
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
              Konten Lengkap (Markdown didukung)
            </label>
            <Textarea
              required
              rows={8}
              placeholder="Tuliskan panduan langkah demi langkah atau pengumuman lengkap di sini..."
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
              Batal
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>
                    {postToEdit ? "Perbarui Artikel" : "Terbitkan Artikel"}
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
