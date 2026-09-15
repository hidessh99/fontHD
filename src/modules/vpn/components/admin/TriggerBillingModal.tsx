// ==============================================================================
// GoVPN VPN Superadmin Trigger Billing Modal
// Part of Pola C: components/admin/
// Manually triggers backend hourly billing deduction on active PayAsYouGo accounts
// ==============================================================================

"use client";

import React, { useState } from "react";
import { CreditCard, Loader2, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { vpnAdminApi } from "../../api/admin.api";
import { TriggerPayasBillingResponse } from "../../types/admin.types";
import { useI18n } from "@/lib/i18n/context";

interface TriggerBillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (res: TriggerPayasBillingResponse) => void;
}

export function TriggerBillingModal({
  isOpen,
  onClose,
  onSuccess,
}: TriggerBillingModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useI18n();

  const handleTrigger = async () => {
    setIsProcessing(true);
    try {
      const txId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `tx_${Date.now()}`;
      const res = await vpnAdminApi.triggerPayasBilling(txId);

      if (res.payload) {
        toast.success(
          t("vpn.triggerBillingSuccess", { total: res.payload.total_billed_amount.toLocaleString() }),
        );
        onSuccess?.(res.payload);
        onClose();
      } else {
        toast.error(res.message || t("common.error"));
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : t("common.error");
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-border/80 bg-card rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1 text-primary">
            <CreditCard className="size-4" />
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Manual Cron Trigger
            </span>
          </div>
          <DialogTitle className="text-lg font-bold">
            {t("vpn.triggerBillingTitle")}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {t("vpn.triggerBillingDesc")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
            <AlertTriangle className="size-4 shrink-0 mt-0.5" />
            <span>
              {t("vpn.triggerBillingWarning")}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs rounded-full min-h-10 px-5"
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleTrigger}
              disabled={isProcessing}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-1.5 size-3.5 animate-spin" /> {t("vpn.triggerBillingRunning")}
                </>
              ) : (
                <>
                  <CreditCard className="mr-1.5 size-3.5" /> {t("vpn.triggerBillingRun")}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
