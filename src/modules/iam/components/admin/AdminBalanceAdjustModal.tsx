// ==============================================================================
// GoVPN IAM Superadmin Balance & Income Adjustment Modal Component
// Part of Pola C: components/admin/AdminBalanceAdjustModal.tsx
// Algoritma 3: Idempotent Mutations with X-Idempotency-Key
// ==============================================================================

"use client";

import React, { useState } from "react";
import { UserProfile } from "../../types/iam.types";
import {
  AdminAdjustBalanceDto,
  AdminAdjustIncomeDto,
} from "../../types/admin.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Loader2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

interface AdminBalanceAdjustModalProps {
  user: UserProfile;
  onAddBalance?: (dto: AdminAdjustBalanceDto, key?: string) => Promise<unknown>;
  onReduceBalance?: (
    dto: AdminAdjustBalanceDto,
    key?: string,
  ) => Promise<unknown>;
  onAddIncome?: (dto: AdminAdjustIncomeDto, key?: string) => Promise<unknown>;
  onReduceIncome?: (
    dto: AdminAdjustIncomeDto,
    key?: string,
  ) => Promise<unknown>;
  triggerButton?: React.ReactNode;
}

export function AdminBalanceAdjustModal({
  user,
  onAddBalance,
  onReduceBalance,
  onAddIncome,
  onReduceIncome,
  triggerButton,
}: AdminBalanceAdjustModalProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [targetWallet, setTargetWallet] = useState<"balance" | "income">(
    "balance",
  );
  const [actionType, setActionType] = useState<"add" | "reduce">("add");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numAmount = parseInt(amount, 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error(t("iam.adjustmentAmount"));
      return;
    }

    const idempotencyKey =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `adj_${Date.now()}_${Math.random()}`;

    setIsSubmitting(true);
    try {
      const payload = {
        user_id: user.id,
        amount: numAmount,
        reason: reason.trim() || undefined,
      };

      if (targetWallet === "balance") {
        if (actionType === "add" && onAddBalance) {
          await onAddBalance(payload, idempotencyKey);
        } else if (actionType === "reduce" && onReduceBalance) {
          await onReduceBalance(payload, idempotencyKey);
        }
      } else {
        if (actionType === "add" && onAddIncome) {
          await onAddIncome(payload, idempotencyKey);
        } else if (actionType === "reduce" && onReduceIncome) {
          await onReduceIncome(payload, idempotencyKey);
        }
      }

      toast.success(
        t("iam.balanceAdjustSuccess", {
          action: actionType === "add" ? t("iam.addition") : t("iam.reduction"),
          target: targetWallet === "balance" ? t("iam.walletBalanceOpt") : t("iam.resellerIncomeOpt"),
          amount: `Rp ${numAmount.toLocaleString("id-ID")}`,
        })
      );
      setOpen(false);
      setAmount("");
      setReason("");
    } catch {
      toast.error(t("iam.balanceAdjustFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatIDR = (val?: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          triggerButton ? (
            (triggerButton as React.ReactElement)
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="rounded-full text-xs font-mono h-8 px-3 gap-1"
            >
              <DollarSign className="h-3.5 w-3.5 text-primary" />
              {t("iam.adjustBalance")}
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <DollarSign className="h-5 w-5 text-primary" />
            {t("iam.balanceModalTitle")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Target User Info */}
          <div className="rounded-xl border border-border/60 bg-surface/50 p-3 text-xs font-mono space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("iam.colUser")}:</span>
              <span className="font-bold text-foreground">
                {user.username} (ID: {user.id})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("iam.currentWalletBalance")}
              </span>
              <span className="font-bold text-emerald-400">
                {formatIDR(user.balance)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("iam.currentResellerIncome")}
              </span>
              <span className="font-bold text-blue-400">
                {formatIDR(user.income)}
              </span>
            </div>
          </div>

          {/* Wallet Target Selector */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setTargetWallet("balance")}
              className={`rounded-xl border p-2.5 text-xs font-mono font-bold transition-all ${
                targetWallet === "balance"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border"
              }`}
            >
              {t("iam.walletBalanceOpt")}
            </button>
            <button
              type="button"
              onClick={() => setTargetWallet("income")}
              className={`rounded-xl border p-2.5 text-xs font-mono font-bold transition-all ${
                targetWallet === "income"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border"
              }`}
            >
              {t("iam.resellerIncomeOpt")}
            </button>
          </div>

          {/* Action Type (Add vs Reduce) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setActionType("add")}
              className={`flex items-center justify-center gap-1.5 rounded-xl border p-2 text-xs font-bold font-mono transition-all ${
                actionType === "add"
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border"
              }`}
            >
              <Plus className="h-3.5 w-3.5" /> {t("iam.addPlus")}
            </button>
            <button
              type="button"
              onClick={() => setActionType("reduce")}
              className={`flex items-center justify-center gap-1.5 rounded-xl border p-2 text-xs font-bold font-mono transition-all ${
                actionType === "reduce"
                  ? "border-rose-500 bg-rose-500/10 text-rose-400"
                  : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border"
              }`}
            >
              <Minus className="h-3.5 w-3.5" /> {t("iam.reduceMinus")}
            </button>
          </div>

          {/* Nominal Input */}
          <div>
            <Label
              htmlFor="adj-amt"
              className="text-xs font-medium text-muted-foreground"
            >
              {t("iam.adjustmentAmount")}
            </Label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-mono">
                Rp
              </span>
              <Input
                id="adj-amt"
                type="number"
                placeholder="50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="pl-9 font-mono text-xs rounded-xl min-h-10"
              />
            </div>
          </div>

          {/* Reason Input */}
          <div>
            <Label
              htmlFor="adj-reason"
              className="text-xs font-medium text-muted-foreground"
            >
              {t("iam.adjustmentReason")}
            </Label>
            <Input
              id="adj-reason"
              placeholder={t("iam.adjustmentReasonPlaceholder")}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1.5 text-xs rounded-xl min-h-10"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-xs rounded-full min-h-10 px-5"
            >
              {t("common.cancel", "Cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !amount}
              className={`text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md ${
                actionType === "add"
                  ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20"
                  : "bg-rose-600 hover:bg-rose-500 shadow-rose-600/20"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />{" "}
                  {t("iam.sending")}
                </>
              ) : (
                t("iam.applyAdjustment", {
                  action: actionType === "add" ? t("iam.addition") : t("iam.reduction"),
                })
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
