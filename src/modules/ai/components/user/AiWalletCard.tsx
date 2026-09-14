// ==============================================================================
// GoVPN AI Wallet Card Component
// Part of Pola C: components/user/AiWalletCard.tsx
// 100% Coinbase Institutional Design System (Balance, Token Quotas & Instant Topup)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { AiWallet } from "../../types/ai.types";
import { Card, CardContent } from "@/components/ui/card";
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
import { Wallet, Plus, ArrowUpRight, Zap, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface AiWalletCardProps {
  wallet?: AiWallet | null;
  onTopup?: (amount: number) => Promise<unknown>;
}

export function AiWalletCard({ wallet, onTopup }: AiWalletCardProps) {
  const [openTopup, setOpenTopup] = useState(false);
  const [amount, setAmount] = useState(50000);
  const [submitting, setSubmitting] = useState(false);

  const balance = wallet?.balance ?? 0;
  const usedTokens = wallet?.used_tokens ?? 0;

  const handleTopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onTopup) return;
    if (amount < 10000) {
      toast.error("Minimal topup saldo AI adalah Rp 10.000");
      return;
    }

    setSubmitting(true);
    try {
      await onTopup(amount);
      setOpenTopup(false);
      toast.success(`Topup Saldo AI Rp ${amount.toLocaleString("id-ID")} berhasil`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-5 rounded-2xl shadow-sm flex flex-col justify-between">
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-medium">Saldo Dompet AI</span>
              <div className="font-mono text-2xl font-bold text-foreground mt-0.5">
                Rp {balance.toLocaleString("id-ID")}
              </div>
            </div>
          </div>

          <Dialog open={openTopup} onOpenChange={setOpenTopup}>
            <DialogTrigger render={
              <Button size="sm" className="h-9 px-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20">
                <Plus className="h-4 w-4" />
                Topup Saldo
              </Button>
            } />
            <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base font-bold">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Topup Saldo Kuota AI Gateway
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleTopupSubmit} className="space-y-4 pt-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Pilih Nominal Topup</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[25000, 50000, 100000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(preset)}
                        className={`rounded-xl border py-2.5 text-xs font-mono font-bold transition-all ${
                          amount === preset
                            ? "border-primary bg-primary/15 text-primary ring-1 ring-primary"
                            : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Rp {preset.toLocaleString("id-ID")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Nominal Kustom (IDR)</Label>
                  <Input
                    type="number"
                    min={10000}
                    step={5000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-2 shadow-lg shadow-primary/20"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Memproses Topup...
                    </>
                  ) : (
                    "Konfirmasi & Bayar"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Micro token counter */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            Token Terpakai
          </span>
          <span className="font-mono font-semibold text-foreground">
            {usedTokens.toLocaleString()} tokens
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
