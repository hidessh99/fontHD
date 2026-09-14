// ==============================================================================
// GoVPN Admin AI Model Table Component
// Part of Pola C: components/admin/AdminAiModelTable.tsx
// 100% Coinbase Institutional Design System (Model Inventory & Pricing)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { AiModel, AiProvider } from "../../types/ai.types";
import { AdminCreateModelDto } from "../../types/admin.types";
import { ModelBadge } from "../shared/ModelBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Cpu,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/EmptyState";

interface AdminAiModelTableProps {
  models: AiModel[];
  providers: AiProvider[];
  onCreateModel: (dto: AdminCreateModelDto) => Promise<unknown>;
  onDeleteModel: (id: string | number) => Promise<unknown>;
  loading?: boolean;
}

export function AdminAiModelTable({
  models,
  providers,
  onCreateModel,
  onDeleteModel,
  loading = false,
}: AdminAiModelTableProps) {
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [modelId, setModelId] = useState("");
  const [providerId, setProviderId] = useState<string | number>(
    providers[0]?.id || "",
  );
  const [contextWindow, setContextWindow] = useState(128000);
  const [inputPrice, setInputPrice] = useState(15);
  const [outputPrice, setOutputPrice] = useState(60);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  React.useEffect(() => {
    if (!providerId && providers.length > 0) {
      setProviderId(providers[0].id);
    }
  }, [providers, providerId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !modelId.trim() || !providerId) {
      toast.error("Nama, Model ID, dan Provider wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await onCreateModel({
        name: name.trim(),
        model_id: modelId.trim().toLowerCase(),
        provider_id: providerId,
        context_window: Number(contextWindow) || 128000,
        input_price_per_1k: Number(inputPrice) || 15,
        output_price_per_1k: Number(outputPrice) || 60,
        is_active: true,
      });
      setOpenCreate(false);
      setName("");
      setModelId("");
      toast.success("Model AI baru berhasil didaftarkan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Hapus model AI ini dari gateway?")) return;
    setDeletingId(id);
    try {
      await onDeleteModel(id);
      toast.success("Model AI berhasil dihapus");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            Manajemen Model AI Gateway
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar model LLM terintegrasi, kuota konteks, dan tarif biaya per 1K
            token
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
                Tambah Model
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-bold">
                <Cpu className="h-5 w-5 text-primary" />
                Daftarkan Model LLM Baru
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Pilih Provider Backend
                </Label>
                <select
                  value={providerId}
                  onChange={(e) => setProviderId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary"
                >
                  {providers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Nama Tampilan Model
                </Label>
                <Input
                  placeholder="misal: GPT-4o Omni"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Model Identifier (API)
                </Label>
                <Input
                  placeholder="misal: gpt-4o atau claude-3-5-sonnet"
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Context Window
                  </Label>
                  <Input
                    type="number"
                    value={contextWindow}
                    onChange={(e) => setContextWindow(Number(e.target.value))}
                    className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Tarif Input / 1K (IDR)
                  </Label>
                  <Input
                    type="number"
                    value={inputPrice}
                    onChange={(e) => setInputPrice(Number(e.target.value))}
                    className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan Model...
                  </>
                ) : (
                  "Simpan Model AI"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {models.length === 0 ? (
        <EmptyState
          icon={Cpu}
          title="Belum Ada Model Terdaftar"
          description="Tambahkan model pertama Anda untuk mengaktifkan AI Gateway."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">Nama Model</th>
                <th className="px-5 py-4 font-sans">Model ID</th>
                <th className="px-5 py-4 font-sans">Provider</th>
                <th className="px-5 py-4 font-sans">Context Window</th>
                <th className="px-5 py-4 font-sans">Tarif Input / Output</th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {models.map((m) => (
                <tr key={m.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-sans">
                    <span className="font-bold text-foreground">{m.name}</span>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="text-foreground font-semibold bg-surface border border-border/60 px-2 py-0.5 rounded text-[11px]">
                      {m.model_id}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <ModelBadge modelName={m.model_id} />
                  </td>

                  <td className="px-5 py-3.5 text-foreground">
                    {m.context_window
                      ? `${m.context_window.toLocaleString()} tokens`
                      : "128k"}
                  </td>

                  <td className="px-5 py-3.5 font-sans">
                    <span className="text-foreground font-mono text-[11px]">
                      Rp {m.input_price_per_1k || 15} / Rp{" "}
                      {m.output_price_per_1k || 60}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-right font-sans">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === m.id}
                      onClick={() => handleDelete(m.id)}
                      className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                    >
                      {deletingId === m.id ? (
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
