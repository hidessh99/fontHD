// ==============================================================================
// GoVPN Subscribe & Upgrade Modal Component
// Part of Pola C: components/user/SubscribeModal.tsx
// Algoritma 3: Idempotent Mutation with X-Idempotency-Key
// 100% Coinbase Institutional Design System
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Plan } from "../../types/subscription.types";
import { CreateSubscriptionDto } from "../../types/user.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface SubscribeModalProps {
  plan: Plan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmSubscribe: (
    dto: CreateSubscriptionDto,
    idempotencyKey: string,
  ) => Promise<unknown>;
}

export function SubscribeModal({
  plan,
  open,
  onOpenChange,
  onConfirmSubscribe,
}: SubscribeModalProps) {
  const [autoRenew, setAutoRenew] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  if (!plan) return null;

  const handleSubscribe = async () => {
    setSubmitting(true);
    // Algoritma 3: Client-side Idempotency Key UUID v4
    const idempotencyKey = crypto.randomUUID();

    try {
      await onConfirmSubscribe(
        {
          plan_id: plan.id,
          auto_renew: autoRenew,
        },
        idempotencyKey,
      );
      onOpenChange(false);
      toast.success(`Berhasil berlangganan paket ${plan.name}`);
    } catch {
      toast.error(
        "Gagal memproses langganan. Silakan periksa saldo dompet Anda.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <Sparkles className="h-5 w-5 text-primary" />
            Konfirmasi Berlangganan Paket
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm text-foreground">
                  {plan.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  Siklus: {plan.billing_cycle}
                </p>
              </div>
              <span className="text-lg font-bold text-primary font-mono">
                Rp {plan.price.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="pt-2 border-t border-border/60 text-xs space-y-1.5 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Maks. {plan.max_devices} Perangkat</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>
                  Bandwidth:{" "}
                  {plan.bandwidth_gb > 0
                    ? `${plan.bandwidth_gb} GB`
                    : "Unlimited"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 text-xs">
            <Label htmlFor="auto-renew" className="cursor-pointer flex-1 pr-3">
              <span className="font-semibold text-foreground block text-xs">
                Perpanjangan Otomatis
              </span>
              <span className="text-muted-foreground text-[11px] font-normal">
                Perpanjang otomatis jika saldo dompet mencukupi
              </span>
            </Label>
            <Checkbox
              id="auto-renew"
              checked={autoRenew}
              onCheckedChange={(checked) => setAutoRenew(!!checked)}
            />
          </div>

          <Button
            onClick={handleSubscribe}
            disabled={submitting}
            className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-2 shadow-lg shadow-primary/20"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Memproses Pembayaran...
              </>
            ) : (
              `Bayar & Aktifkan (Rp ${plan.price.toLocaleString("id-ID")})`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
