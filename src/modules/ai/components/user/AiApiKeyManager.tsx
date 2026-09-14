// ==============================================================================
// GoVPN AI API Key Manager Component
// Part of Pola C: components/user/AiApiKeyManager.tsx
// 100% Coinbase Institutional Design System (Masked Keys, Copy & Creation Modal)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { AiApiKey } from "../../types/ai.types";
import { CreateApiKeyDto } from "../../types/user.types";
import { CopyButton } from "@/components/shared/CopyButton";
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
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Key,
  Plus,
  Trash2,
  Loader2,
  ShieldCheck,
  Check,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

interface AiApiKeyManagerProps {
  apiKeys: AiApiKey[];
  onCreateKey: (dto: CreateApiKeyDto) => Promise<AiApiKey | undefined>;
  onDeleteKey: (id: string | number) => Promise<unknown>;
  loading?: boolean;
}

export function AiApiKeyManager({
  apiKeys,
  onCreateKey,
  onDeleteKey,
  loading = false,
}: AiApiKeyManagerProps) {
  const [openCreate, setOpenCreate] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName.trim()) {
      toast.error("Nama API Key wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      const created = await onCreateKey({ name: keyName.trim() });
      if (created?.key) {
        setNewlyCreatedKey(created.key);
      } else {
        setOpenCreate(false);
      }
      setKeyName("");
      toast.success("API Key baru berhasil dibuat");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (
      !confirm(
        "Cabut API Key ini? Permintaan dari aplikasi Anda akan segera ditolak.",
      )
    ) {
      return;
    }
    setDeletingId(id);
    try {
      await onDeleteKey(id);
      toast.success("API Key berhasil dicabut");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Key className="h-4 w-4 text-primary" />
            API Key Gateway
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gunakan API Key ini untuk mengakses endpoint OpenAI-compatible
            `/api/ai/v1`
          </p>
        </div>

        <Dialog
          open={openCreate}
          onOpenChange={(open) => {
            setOpenCreate(open);
            if (!open) setNewlyCreatedKey(null);
          }}
        >
          <DialogTrigger
            render={
              <Button
                size="sm"
                className="h-9 px-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20"
              >
                <Plus className="h-4 w-4" />
                Buat API Key Baru
              </Button>
            }
          />

          <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-bold">
                <Key className="h-5 w-5 text-primary" />
                {newlyCreatedKey ? "Simpan API Key Anda" : "Buat API Key Baru"}
              </DialogTitle>
            </DialogHeader>

            {newlyCreatedKey ? (
              <div className="space-y-4 pt-2">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-300">
                  ⚠️ <strong>Penting:</strong> Salin API Key ini sekarang. Demi
                  keamanan, kunci rahasia ini tidak akan pernah ditampilkan
                  lagi.
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground font-medium">
                    Secret Key
                  </Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Input
                      readOnly
                      value={newlyCreatedKey}
                      className="bg-muted/40 border-border text-foreground font-mono text-xs h-10"
                    />
                    <CopyButton
                      text={newlyCreatedKey}
                      label="Salin"
                      className="h-10 px-3"
                    />
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setOpenCreate(false);
                    setNewlyCreatedKey(null);
                  }}
                  className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs mt-2"
                >
                  Selesai
                </Button>
              </div>
            ) : (
              <form onSubmit={handleCreate} className="space-y-4 pt-2">
                <div>
                  <Label className="text-xs text-muted-foreground font-medium">
                    Nama / Label Kunci
                  </Label>
                  <Input
                    placeholder="misal: Python App / LangChain Prod"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
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
                      Membuat Kunci...
                    </>
                  ) : (
                    "Buat API Key"
                  )}
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {apiKeys.length === 0 ? (
        <EmptyState
          icon={Key}
          title="Belum Ada API Key"
          description="Buat API Key pertama Anda untuk mulai menghubungkan aplikasi dengan AI Gateway."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">Label Kunci</th>
                <th className="px-5 py-4 font-sans">Prefix Key</th>
                <th className="px-5 py-4 font-sans">Dibuat</th>
                <th className="px-5 py-4 font-sans">Terakhir Dipakai</th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {apiKeys.map((k) => (
                <tr key={k.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-sans font-bold text-foreground">
                    {k.name}
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="text-foreground font-semibold bg-surface border border-border/60 px-2.5 py-1 rounded-lg text-[11px]">
                      {k.key_prefix}••••••••
                    </span>
                  </td>

                  <td className="px-5 py-3.5 font-sans text-muted-foreground">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>
                        {new Date(k.created_at).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 font-sans text-muted-foreground">
                    {k.last_used_at ? (
                      <span className="text-[11px] text-emerald-400 font-medium">
                        {new Date(k.last_used_at).toLocaleDateString("id-ID")}
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">
                        Belum pernah
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 text-right font-sans">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === k.id}
                      onClick={() => handleDelete(k.id)}
                      className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                      title="Cabut Kunci"
                    >
                      {deletingId === k.id ? (
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
