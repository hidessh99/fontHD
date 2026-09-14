// ==============================================================================
// GoVPN Admin AI Wallet Manager Component
// Part of Pola C: components/admin/AdminAiWalletManager.tsx
// 100% Coinbase Institutional Design System (User Wallet Auditing & Manual Adjust)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { AiWallet } from "../../types/ai.types";
import { AdminWalletAdjustDto } from "../../types/admin.types";
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
import { Wallet, Plus, Minus, Loader2, User, Zap } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/EmptyState";

interface AdminAiWalletManagerProps {
  wallets: AiWallet[];
  onAdjustWallet: (dto: AdminWalletAdjustDto) => Promise<unknown>;
  loading?: boolean;
}

export function AdminAiWalletManager({
  wallets,
  onAdjustWallet,
  loading = false,
}: AdminAiWalletManagerProps) {
  const [openAdjust, setOpenAdjust] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | number>("");
  const [amount, setAmount] = useState<number>(50000);
  const [type, setType] = useState<"ADD" | "DEDUCT">("ADD");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !reason.trim() || amount <= 0) {
      toast.error("User ID, nominal, dan alasan wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      const finalAmount = type === "ADD" ? amount : -amount;
      await onAdjustWallet({
        user_id: selectedUserId,
        amount: finalAmount,
        reason: reason.trim(),
      });
      setOpenAdjust(false);
      setReason("");
      toast.success("Penyesuaian saldo AI berhasil diterapkan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            Audit Dompet AI Pengguna
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar saldo dan konsumsi token AI per pengguna beserta opsi penyesuaian manual
          </p>
        </div>

        <Dialog open={openAdjust} onOpenChange={setOpenAdjust}>
          <DialogTrigger render={
            <Button size="sm" className="h-9 px-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20">
              <Plus className="h-4 w-4" />
              Sesuaikan Saldo
            </Button>
          } />
          <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-bold">
                <Wallet className="h-5 w-5 text-primary" />
                Penyesuaian Saldo Dompet AI
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdjust} className="space-y-3.5 pt-2">
              <div>
                <Label className="text-xs text-muted-foreground">Target User ID</Label>
                <Input
                  placeholder="ID Pengguna (misal: 101)"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Tipe Penyesuaian</Label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setType("ADD")}
                    className={`rounded-xl border py-2 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      type === "ADD"
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500"
                        : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" /> Tambah Saldo
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("DEDUCT")}
                    className={`rounded-xl border py-2 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      type === "DEDUCT"
                        ? "border-rose-500 bg-rose-500/15 text-rose-400 ring-1 ring-rose-500"
                        : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Minus className="h-3.5 w-3.5" /> Potong Saldo
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Nominal (IDR)</Label>
                <Input
                  type="number"
                  min={1000}
                  step={1000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Alasan Penyesuaian</Label>
                <Input
                  placeholder="misal: Kompensasi downtime gateway"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
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
                    Menerapkan Perubahan...
                  </>
                ) : (
                  "Terapkan Penyesuaian"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {wallets.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="Belum Ada Data Dompet AI"
          description="Pengguna yang menggunakan gateway AI akan otomatis terdaftar di sini."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">User ID</th>
                <th className="px-5 py-4 font-sans">Saldo AI (IDR)</th>
                <th className="px-5 py-4 font-sans">Total Token Digunakan</th>
                <th className="px-5 py-4 font-sans">Total Permintaan</th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {wallets.map((w) => (
                <tr key={w.user_id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-sans">
                    <div className="flex items-center gap-1.5 text-foreground font-mono">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-bold">#{w.user_id}</span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="font-bold text-emerald-400 font-mono">
                      Rp {w.balance.toLocaleString("id-ID")}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 font-sans">
                    <div className="flex items-center gap-1 text-foreground font-mono">
                      <Zap className="h-3 w-3 text-amber-400" />
                      <span>{w.used_tokens.toLocaleString()} tokens</span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-muted-foreground font-mono">
                    {w.total_requests.toLocaleString()} req
                  </td>

                  <td className="px-5 py-3.5 text-right font-sans">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedUserId(w.user_id);
                        setOpenAdjust(true);
                      }}
                      className="h-8 px-2.5 text-xs text-primary hover:text-primary hover:bg-primary/10 rounded-lg"
                    >
                      Sesuaikan
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
