// ==============================================================================
// GoVPN Finance Seller Withdrawal Modal Component
// Part of Pola C: components/seller/SellerWithdrawalModal.tsx
// 100% Coinbase Institutional Design System (JetBrains Mono, Rounded-Full CTA)
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
import { SellerWithdrawalRequestDto } from "../../types/seller.types";
import {
  ArrowUpRight,
  CreditCard,
  Loader2,
  User,
  Landmark,
} from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";

interface SellerWithdrawalModalProps {
  availableBalance: number;
  onRequestWithdrawal: (dto: SellerWithdrawalRequestDto) => Promise<unknown>;
  triggerButton?: React.ReactNode;
}

const SELLER_BANKS = [
  "BCA",
  "MANDIRI",
  "BRI",
  "BNI",
  "BSI",
  "SEABANK",
  "DANA",
  "GOPAY",
];

export function SellerWithdrawalModal({
  availableBalance,
  onRequestWithdrawal,
  triggerButton,
}: SellerWithdrawalModalProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [bankName, setBankName] = useState<string>("BCA");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numAmount = parseInt(amount, 10) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount < 50000) {
      toast.error(t("finance.minWithdrawalError"));
      return;
    }
    if (numAmount > availableBalance) {
      toast.error(t("finance.exceedsBalanceError"));
      return;
    }
    if (!accountNumber.trim() || !accountName.trim()) {
      toast.error("Harap isi nomor dan nama rekening tujuan");
      return;
    }

    setIsSubmitting(true);
    try {
      await onRequestWithdrawal({
        amount: numAmount,
        bank_name: bankName,
        account_number: accountNumber.trim(),
        account_name: accountName.trim(),
        notes: notes.trim() || undefined,
      });
      toast.success(t("finance.withdrawalRequested"));
      setOpen(false);
      setAmount("");
      setAccountNumber("");
      setAccountName("");
      setNotes("");
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
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 font-semibold text-xs rounded-full min-h-11 px-6 shadow-md shadow-emerald-600/20">
              <ArrowUpRight className="h-4 w-4" />
              {t("finance.withdrawCommission")}
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Landmark className="h-5 w-5 text-emerald-400" />
            {t("finance.sellerWithdrawal")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Available balance indicator */}
          <div className="rounded-xl bg-surface border border-border/60 p-3 flex items-center justify-between font-mono text-xs">
            <span className="text-muted-foreground">{t("finance.availableCommission")}:</span>
            <span className="font-bold text-emerald-400">
              {formatIDR(availableBalance)}
            </span>
          </div>

          {/* Amount input */}
          <div>
            <Label
              htmlFor="seller-with-amount"
              className="text-xs font-medium text-muted-foreground"
            >
              {t("finance.amount")} (Min. Rp 50.000)
            </Label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-mono">
                Rp
              </span>
              <Input
                id="seller-with-amount"
                type="number"
                placeholder="150000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-9 font-mono text-xs rounded-xl min-h-10"
              />
            </div>
          </div>

          {/* Bank selector */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground">
              {t("finance.bankAccount")}
            </Label>
            <div className="grid grid-cols-4 gap-2 mt-1.5">
              {SELLER_BANKS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBankName(b)}
                  className={`rounded-xl border py-2 text-xs font-mono font-semibold transition-all ${
                    bankName === b
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Account Number */}
          <div>
            <Label
              htmlFor="seller-acc-no"
              className="text-xs font-medium text-muted-foreground"
            >
              {t("finance.accountNumber")}
            </Label>
            <div className="relative mt-1.5">
              <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="seller-acc-no"
                placeholder="10 digit nomor rekening"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="pl-9 font-mono text-xs rounded-xl min-h-10"
              />
            </div>
          </div>

          {/* Account Name */}
          <div>
            <Label
              htmlFor="seller-acc-name"
              className="text-xs font-medium text-muted-foreground"
            >
              {t("finance.accountHolder")}
            </Label>
            <div className="relative mt-1.5">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="seller-acc-name"
                placeholder="Nama sesuai buku tabungan"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="pl-9 text-xs rounded-xl min-h-10"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label
              htmlFor="seller-notes"
              className="text-xs font-medium text-muted-foreground"
            >
              {t("finance.notesOptional")}
            </Label>
            <Input
              id="seller-notes"
              placeholder="Catatan penarikan"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
              {t("finance.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                numAmount < 50000 ||
                numAmount > availableBalance
              }
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-emerald-600/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />{" "}
                  {t("common.loading")}
                </>
              ) : (
                t("finance.submitRequest")
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
