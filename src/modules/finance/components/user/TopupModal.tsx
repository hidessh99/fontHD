// ==============================================================================
// GoVPN Finance User Topup Deposit Modal Component
// Part of Pola C: components/user/TopupModal.tsx
// 100% Coinbase Design System (56px Pill CTA, JetBrains Mono, QRIS/VA Options)
// Fully Localized with useI18n (EN/ID)
// ==============================================================================

"use client";

import React, { useState } from "react";
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
import { PaymentMethod, CreateTopupDto } from "../../types";
import { Wallet, QrCode, Tag, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";

interface TopupModalProps {
  onTopup: (dto: CreateTopupDto) => Promise<unknown>;
  onValidateVoucher?: (
    code: string,
  ) => Promise<{ valid: boolean; discount_amount: number; message?: string }>;
  triggerButton?: React.ReactNode;
}

const PRESET_AMOUNTS = [10000, 25000, 50000, 100000, 250000, 500000];

export function TopupModal({
  onTopup,
  onValidateVoucher,
  triggerButton,
}: TopupModalProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [method, setMethod] = useState<PaymentMethod>("QRIS");
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
  const [isCheckingVoucher, setIsCheckingVoucher] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAmount = customAmount
    ? parseInt(customAmount, 10) || 0
    : amount;
  const finalAmount = Math.max(0, selectedAmount - voucherDiscount);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim() || !onValidateVoucher) return;
    setIsCheckingVoucher(true);
    try {
      const res = await onValidateVoucher(voucherCode.trim());
      if (res.valid) {
        setVoucherDiscount(res.discount_amount);
        toast.success(res.message || t("finance.voucherApplied"));
      } else {
        setVoucherDiscount(0);
        toast.error(res.message || t("finance.voucherInvalid"));
      }
    } finally {
      setIsCheckingVoucher(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAmount < 10000) {
      toast.error(t("finance.minDepositError"));
      return;
    }

    setIsSubmitting(true);
    try {
      await onTopup({
        amount: selectedAmount,
        payment_method: method,
        voucher_code: voucherCode.trim() || undefined,
      });
      setOpen(false);
    } catch {
      // Handled in store/hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          triggerButton ? (
            (triggerButton as React.ReactElement)
          ) : (
            <Button className="bg-primary hover:bg-primary-hover text-white gap-2 font-semibold text-xs rounded-full min-h-11 px-6 shadow-md shadow-primary/25">
              <Wallet className="h-4 w-4" />
              {t("finance.topupNow")}
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Wallet className="h-5 w-5 text-primary" />
            {t("finance.depositTitle")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Preset Amounts */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground">
              {t("finance.selectAmount")}
            </Label>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setAmount(amt);
                    setCustomAmount("");
                  }}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-mono font-medium transition-all ${
                    !customAmount && amount === amt
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {formatIDR(amt)}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <Label
              htmlFor="custom-amount"
              className="text-xs font-medium text-muted-foreground"
            >
              {t("finance.customAmountMin")}
            </Label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-mono">
                Rp
              </span>
              <Input
                id="custom-amount"
                type="number"
                placeholder="75000"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="pl-9 font-mono text-xs rounded-xl min-h-10"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground">
              {t("finance.paymentMethod")}
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              <button
                type="button"
                onClick={() => setMethod("QRIS")}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                  method === "QRIS"
                    ? "border-primary bg-primary/10 text-foreground shadow-sm"
                    : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border"
                }`}
              >
                <QrCode className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs font-bold font-mono">
                    {t("finance.qrisRealtime")}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {t("finance.qrisSupported")}
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMethod("MIDTRANS")}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                  method === "MIDTRANS"
                    ? "border-primary bg-primary/10 text-foreground shadow-sm"
                    : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border"
                }`}
              >
                <Wallet className="h-5 w-5 text-indigo-400" />
                <div>
                  <div className="text-xs font-bold font-mono">
                    {t("finance.virtualAccount")}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {t("finance.vaSupported")}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Voucher Code */}
          {onValidateVoucher && (
            <div>
              <Label
                htmlFor="voucher"
                className="text-xs font-medium text-muted-foreground"
              >
                {t("finance.promoCouponOptional")}
              </Label>
              <div className="flex gap-2 mt-1.5">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="voucher"
                    placeholder="PROMOCODE"
                    value={voucherCode}
                    onChange={(e) =>
                      setVoucherCode(e.target.value.toUpperCase())
                    }
                    className="pl-9 font-mono text-xs uppercase rounded-xl min-h-10"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleApplyVoucher}
                  disabled={isCheckingVoucher || !voucherCode.trim()}
                  className="rounded-xl min-h-10 text-xs px-4"
                >
                  {isCheckingVoucher ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Summary Box */}
          <div className="rounded-xl bg-surface border border-border/60 p-3.5 space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>{t("finance.depositAmount")}:</span>
              <span>{formatIDR(selectedAmount)}</span>
            </div>
            {voucherDiscount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>{t("finance.voucherDiscount")}</span>
                <span>-{formatIDR(voucherDiscount)}</span>
              </div>
            )}
            <div className="border-t border-border/50 pt-2 flex justify-between font-bold text-foreground text-sm">
              <span>{t("finance.totalPayment")}</span>
              <span className="text-primary">{formatIDR(finalAmount)}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-xs rounded-full min-h-10 px-5"
            >
              {t("finance.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || selectedAmount < 10000}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />{" "}
                  {t("common.loading")}
                </>
              ) : (
                t("finance.confirmAndIssueQris")
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
