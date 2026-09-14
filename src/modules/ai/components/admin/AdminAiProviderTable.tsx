// ==============================================================================
// GoVPN Admin AI Provider Table Component
// Part of Pola C: components/admin/AdminAiProviderTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { AiProvider } from "../../types/ai.types";
import { AdminCreateProviderDto } from "../../types/admin.types";
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
import { DataTable, ColumnDef } from "@/components/shared/data-table";
import { Server, Plus, Trash2, Key, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminAiProviderTableProps {
  providers: AiProvider[];
  onCreateProvider: (dto: AdminCreateProviderDto) => Promise<unknown>;
  onDeleteProvider: (id: string | number) => Promise<unknown>;
  loading?: boolean;
}

export function AdminAiProviderTable({
  providers,
  onCreateProvider,
  onDeleteProvider,
  loading = false,
}: AdminAiProviderTableProps) {
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !apiKey.trim()) {
      toast.error("Nama provider dan API Key wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await onCreateProvider({
        name: name.trim(),
        base_url: baseUrl.trim() || undefined,
        api_key: apiKey.trim(),
        is_active: true,
      });
      setOpenCreate(false);
      setName("");
      setBaseUrl("");
      setApiKey("");
      toast.success("Provider AI baru berhasil ditambahkan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (
      !confirm(
        "Hapus provider AI ini? Model yang terkait tidak akan dapat melayani permintaan.",
      )
    ) {
      return;
    }
    setDeletingId(id);
    try {
      await onDeleteProvider(id);
      toast.success("Provider AI berhasil dihapus");
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<AiProvider>[] = useMemo(
    () => [
      {
        id: "name",
        header: "Nama Provider",
        className: "font-sans font-bold text-foreground",
        cell: (p) => p.name,
      },
      {
        id: "base_url",
        header: "Base URL",
        cell: (p) => (
          <span className="text-muted-foreground text-[11px] font-mono">
            {p.base_url || "Default Upstream"}
          </span>
        ),
      },
      {
        id: "api_key",
        header: "API Key Masked",
        cell: (p) => (
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
            <Key className="h-3 w-3 text-amber-400 shrink-0" />
            <span>{p.api_key_masked || "sk-••••••••••••••••"}</span>
          </div>
        ),
      },
      {
        id: "model_count",
        header: "Model Terhubung",
        align: "center",
        cell: (p) => (
          <Badge
            variant="outline"
            className="border-border bg-surface text-foreground font-mono text-[11px]"
          >
            {p.model_count ?? 1} Models
          </Badge>
        ),
      },
      {
        id: "actions",
        header: "Aksi",
        align: "right",
        cell: (p) => (
          <Button
            variant="ghost"
            size="sm"
            disabled={deletingId === p.id}
            onClick={() => handleDelete(p.id)}
            className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
            title="Hapus Provider"
          >
            {deletingId === p.id ? (
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

  const actions = (
    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
      <DialogTrigger
        render={
          <Button
            size="sm"
            className="h-9 px-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
            Tambah Provider
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <Server className="h-5 w-5 text-primary" />
            Hubungkan Provider AI Baru
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
          <div>
            <Label className="text-xs text-muted-foreground">Nama Provider</Label>
            <Input
              placeholder="misal: DeepSeek Platform / OpenAI Direct"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Base URL (Opsional)</Label>
            <Input
              placeholder="https://api.deepseek.com/v1"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Secret API Key</Label>
            <Input
              type="password"
              placeholder="sk-••••••••••••••••"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-10 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs gap-2 mt-2 shadow-md shadow-primary/25"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Menghubungkan...
              </>
            ) : (
              "Simpan Provider AI"
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
          <Server className="h-4 w-4 text-primary" />
          Provider AI Gateway (Upstream)
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Koneksi upstream ke OpenAI, Anthropic, DeepSeek, Groq, dan OpenRouter
        </p>
      </div>

      <DataTable<AiProvider>
        data={providers}
        columns={columns}
        keyExtractor={(p) => p.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder="Cari nama provider, base URL..."
        searchButtonText="Cari"
        searchAccessor={(p) => [p.name, p.base_url]}
        paginated={true}
        pageSize={10}
        entityName="provider AI"
        actions={actions}
        emptyIcon={Server}
        emptyTitle="Belum Ada Provider"
        emptyDescription="Tambahkan provider AI pertama Anda untuk mulai mengarahkan inferensi model."
      />
    </div>
  );
}
