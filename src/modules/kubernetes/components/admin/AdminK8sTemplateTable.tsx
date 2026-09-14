// ==============================================================================
// GoVPN Admin Kubernetes App Template Table Component
// Part of Pola C: components/admin/AdminK8sTemplateTable.tsx
// 100% Coinbase Institutional Design System (1-Click Container Catalog)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { K8sTemplate } from "../../types/k8s.types";
import { AdminCreateTemplateDto } from "../../types/admin.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Rocket, Plus, Trash2, Loader2, Globe } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/EmptyState";

interface AdminK8sTemplateTableProps {
  templates: K8sTemplate[];
  onCreateTemplate: (dto: AdminCreateTemplateDto) => Promise<unknown>;
  onDeleteTemplate: (id: string | number) => Promise<unknown>;
  loading?: boolean;
}

export function AdminK8sTemplateTable({
  templates,
  onCreateTemplate,
  onDeleteTemplate,
  loading = false,
}: AdminK8sTemplateTableProps) {
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<"DATABASE" | "WEB" | "VPN" | "CMS" | "DEVOPS">("VPN");
  const [image, setImage] = useState("");
  const [port, setPort] = useState(8388);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !image.trim()) {
      toast.error("Nama template dan Docker Image wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await onCreateTemplate({
        name: name.trim(),
        slug: slug.trim().toLowerCase() || name.trim().toLowerCase().replace(/\s+/g, "-"),
        category,
        docker_image: image.trim(),
        default_port: Number(port) || 80,
        description: description.trim() || undefined,
      });
      setOpenCreate(false);
      setName("");
      setSlug("");
      setImage("");
      toast.success("Template container baru berhasil ditambahkan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Hapus template aplikasi ini?")) return;
    setDeletingId(id);
    try {
      await onDeleteTemplate(id);
      toast.success("Template berhasil dihapus");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Rocket className="h-4 w-4 text-primary" />
            Template Aplikasi 1-Click Deploy
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar blueprint aplikasi siap pakai (Shadowsocks, WireGuard, NGINX, WordPress)
          </p>
        </div>

        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger render={
            <Button size="sm" className="h-9 px-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20">
              <Plus className="h-4 w-4" />
              Tambah Template
            </Button>
          } />
          <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-bold">
                <Rocket className="h-5 w-5 text-primary" />
                Tambah Template Aplikasi Baru
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
              <div>
                <Label className="text-xs text-muted-foreground">Nama Aplikasi</Label>
                <Input
                  placeholder="misal: Shadowsocks Libev"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Kategori</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary"
                >
                  <option value="VPN">VPN & Tunneling</option>
                  <option value="WEB">Web Server</option>
                  <option value="DATABASE">Database</option>
                  <option value="CMS">CMS</option>
                  <option value="DEVOPS">DevOps Tools</option>
                </select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Docker Image</Label>
                <Input
                  placeholder="shadowsocks/shadowsocks-libev:latest"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Default Port</Label>
                <Input
                  type="number"
                  value={port}
                  onChange={(e) => setPort(Number(e.target.value))}
                  className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Deskripsi Singkat</Label>
                <Input
                  placeholder="Proxy tunneling aman berkecepatan tinggi"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan Template...
                  </>
                ) : (
                  "Simpan Template"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {templates.length === 0 ? (
        <EmptyState
          icon={Rocket}
          title="Belum Ada Template"
          description="Tambahkan template aplikasi 1-click deploy pertama Anda."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">Nama Template</th>
                <th className="px-5 py-4 font-sans">Kategori</th>
                <th className="px-5 py-4 font-sans">Docker Image</th>
                <th className="px-5 py-4 font-sans">Port</th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {templates.map((t) => (
                <tr key={t.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-sans">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">{t.name}</span>
                      {t.description && (
                        <span className="text-[11px] text-muted-foreground line-clamp-1">
                          {t.description}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className="border-border bg-card text-foreground font-mono text-[11px]">
                      {t.category}
                    </Badge>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="text-foreground font-semibold bg-surface border border-border/60 px-2.5 py-1 rounded-lg text-[11px]">
                      {t.docker_image}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-foreground">
                    :{t.default_port}
                  </td>

                  <td className="px-5 py-3.5 text-right font-sans">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === t.id}
                      onClick={() => handleDelete(t.id)}
                      className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                    >
                      {deletingId === t.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
