// ==============================================================================
// GoVPN VPN Renew Account Dialog Component
// Part of Pola C: components/user/
// 100% Coinbase Design System (56px Pill CTA, JetBrains Mono, Sonner feedback)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { RefreshCw, Calendar, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useVpnUserStore } from "../../store/vpn-user.store";

interface RenewAccountDialogProps {
  accountId: number | string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RenewAccountDialog({
  accountId,
  isOpen,
  onClose,
}: RenewAccountDialogProps) {
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const optimisticRenewAccount = useVpnUserStore(
    (s) => s.optimisticRenewAccount,
  );

  const handleRenew = async () => {
    if (!accountId) return;

    setIsSubmitting(true);
    const result = await optimisticRenewAccount(accountId, selectedDuration);

    if (result.success) {
      toast.success(
        `Masa aktif akun berhasil diperpanjang ${selectedDuration} hari!`,
      );
      onClose();
    } else {
      toast.error(result.error || "Gagal memperpanjang masa aktif akun.");
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-border/80 bg-card rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1 text-primary">
            <RefreshCw className="size-4" />
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Perpanjang Layanan
            </span>
          </div>
          <DialogTitle className="text-lg font-bold">
            Perpanjang Masa Aktif Akun
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Pilih durasi perpanjangan masa aktif akun tunneling VPN Anda.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label className="text-xs font-medium">Pilih Durasi Hari</Label>
            <div className="grid grid-cols-3 gap-2.5">
              {[30, 60, 90].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setSelectedDuration(days)}
                  className={`p-3 rounded-2xl border text-center font-mono text-xs font-bold transition-all ${
                    selectedDuration === days
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  <Calendar className="size-4 mx-auto mb-1 text-muted-foreground" />
                  {days} Hari
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs rounded-full min-h-10 px-5"
            >
              Batal
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleRenew}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1.5 size-3.5 animate-spin" />{" "}
                  Memproses...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-1.5 size-3.5" /> Konfirmasi
                  Perpanjang
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
