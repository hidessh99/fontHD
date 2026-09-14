// ==============================================================================
// GoVPN Admin AI Provider Table Component
// Part of Pola C: components/admin/AdminAiProviderTable.tsx
// 100% Coinbase Institutional Design System (Multi-Provider API Keys & Endpoints)
// ==============================================================================

"use client";

import React, { useState } from "react";
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
import { Server, Plus, Trash2, Key, Loader2, Globe } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/EmptyState";

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Server className="h-4 w-4 text-primary" />
            Provider AI Gateway (Upstream)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Koneksi upstream ke OpenAI, Anthropic, DeepSeek, Groq, dan
            OpenRouter
          </p>
        </div>

        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger
            render={
              <Button
                size="sm"
                className="h-9 px-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20"
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
                <Label className="text-xs text-muted-foreground">
                  Nama Provider
                </Label>
                <Input
                  placeholder="misal: DeepSeek Platform / OpenAI Direct"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Base URL (Opsional)
                </Label>
                <Input
                  placeholder="https://api.deepseek.com/v1"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Secret API Key
                </Label>
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
                className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menghubungkan...
                  </>
                ) : (
                  "Simpan Provider AI"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {providers.length === 0 ? (
        <EmptyState
          icon={Server}
          title="Belum Ada Provider"
          description="Tambahkan provider AI pertama Anda untuk mulai mengarahkan inferensi model."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">Nama Provider</th>
                <th className="px-5 py-4 font-sans">Base URL</th>
                <th className="px-5 py-4 font-sans">API Key Masked</th>
                <th className="px-5 py-4 font-sans text-center">
                  Model Terhubung
                </th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {providers.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-sans font-bold text-foreground">
                    {p.name}
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground text-[11px]">
                      {p.base_url || "Default Upstream"}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Key className="h-3 w-3 text-amber-400" />
                      <span>{p.api_key_masked || "sk-••••••••••••••••"}</span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    <Badge
                      variant="outline"
                      className="border-border bg-surface text-foreground font-mono text-[11px]"
                    >
                      {p.model_count ?? 1} Models
                    </Badge>
                  </td>

                  <td className="px-5 py-3.5 text-right font-sans">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === p.id}
                      onClick={() => handleDelete(p.id)}
                      className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                    >
                      {deletingId === p.id ? (
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
