// ==============================================================================
// GoVPN Admin Kubernetes App Template Table Component
// Part of Pola C: components/admin/AdminK8sTemplateTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { K8sTemplate } from "../../types/k8s.types";
import { AdminCreateTemplateDto } from "../../types/admin.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import { Rocket, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
  const [category, setCategory] = useState<
    "DATABASE" | "WEB" | "VPN" | "CMS" | "DEVOPS"
  >("VPN");
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
        slug:
          slug.trim().toLowerCase() ||
          name.trim().toLowerCase().replace(/\s+/g, "-"),
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

  const columns: ColumnDef<K8sTemplate>[] = useMemo(
    () => [
      {
        id: "name",
        header: "Nama Template",
        className: "font-sans",
        cell: (t) => (
          <div className="flex flex-col">
            <span className="font-bold text-foreground">{t.name}</span>
            {t.description && (
              <span className="text-[11px] text-muted-foreground line-clamp-1">
                {t.description}
              </span>
            )}
          </div>
        ),
      },
      {
        id: "category",
        header: "Kategori",
        cell: (t) => (
          <Badge
            variant="outline"
            className="border-border bg-card text-foreground font-mono text-[11px]"
          >
            {t.category}
          </Badge>
        ),
      },
      {
        id: "docker_image",
        header: "Docker Image",
        cell: (t) => (
          <span className="text-foreground font-semibold bg-surface border border-border/60 px-2.5 py-1 rounded-lg text-[11px] font-mono">
            {t.docker_image}
          </span>
        ),
      },
      {
        id: "port",
        header: "Port",
        className: "text-foreground font-mono",
        cell: (t) => `:${t.default_port}`,
      },
      {
        id: "actions",
        header: "Aksi",
        align: "right",
        cell: (t) => (
          <Button
            variant="ghost"
            size="sm"
            disabled={deletingId === t.id}
            onClick={() => handleDelete(t.id)}
            className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
            title="Hapus Template"
          >
            {deletingId === t.id ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </Button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deletingId],
  );

  const filters: DataTableFilterConfig<K8sTemplate>[] = useMemo(
    () => [
      {
        id: "category",
        label: "Kategori",
        defaultValue: "ALL",
        options: [
          { label: "Semua Kategori", value: "ALL" },
          { label: "VPN & Tunneling", value: "VPN" },
          { label: "Web Server", value: "WEB" },
          { label: "Database", value: "DATABASE" },
          { label: "CMS", value: "CMS" },
          { label: "DevOps Tools", value: "DEVOPS" },
        ],
        filterFn: (t, val) => t.category?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [],
  );

  const actions = (
    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
      <DialogTrigger
        render={
          <Button
            size="sm"
            className="h-9 px-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
            Tambah Template
          </Button>
        }
      />
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
            <NativeSelect
              variant="rounded"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value as "DATABASE" | "WEB" | "VPN" | "CMS" | "DEVOPS",
                )
              }
              className="mt-1.5 w-full text-xs font-mono"
            >
              <option value="VPN">VPN & Tunneling</option>
              <option value="WEB">Web Server</option>
              <option value="DATABASE">Database</option>
              <option value="CMS">CMS</option>
              <option value="DEVOPS">DevOps Tools</option>
            </NativeSelect>
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
            className="w-full h-10 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs gap-2 mt-2 shadow-md shadow-primary/25"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Menyimpan Template...
              </>
            ) : (
              "Simpan Template"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Rocket className="h-4 w-4 text-primary" />
          Template Aplikasi 1-Click Deploy
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Daftar blueprint aplikasi siap pakai (Shadowsocks, WireGuard, NGINX, WordPress)
        </p>
      </div>

      <DataTable<K8sTemplate>
        data={templates}
        columns={columns}
        keyExtractor={(t) => t.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder="Cari nama template, image, deskripsi..."
        searchButtonText="Cari"
        searchAccessor={(t) => [t.name, t.docker_image, t.description, t.category]}
        filters={filters}
        paginated={true}
        pageSize={10}
        entityName="template aplikasi"
        actions={actions}
        emptyIcon={Rocket}
        emptyTitle="Belum Ada Template"
        emptyDescription="Tambahkan template aplikasi 1-click deploy pertama Anda."
      />
    </div>
  );
}
