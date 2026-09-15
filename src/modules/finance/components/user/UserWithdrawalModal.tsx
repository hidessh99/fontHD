// ==============================================================================
// GoVPN Finance User Withdrawal Modal Component
// Part of Pola C: components/user/UserWithdrawalModal.tsx
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
import { UserWithdrawalRequestDto } from "../../types/user.types";
import { ArrowUpRight, CreditCard, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";

interface UserWithdrawalModalProps {
  availableBalance: number;
  onRequestWithdrawal: (dto: UserWithdrawalRequestDto) => Promise<unknown>;
  triggerButton?: React.ReactNode;
}

const POPULAR_BANKS = [
  "BCA",
  "MANDIRI",
  "BRI",
  "BNI",
  "BSI",
  "SEABANK",
  "DANA",
  "GOPAY",
  "OVO",
];

export function UserWithdrawalModal({
  availableBalance,
  onRequestWithdrawal,
  triggerButton,
}: UserWithdrawalModalProps) {
  const { t } = useI18n();
  const [open] = useState(false);
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
      toast.error("Harap lengkapi nomor dan nama rekening tujuan");
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
      setAmount("");
      setAccountNumber("");
      setAccountName("");
      setNotes("");
    } catch {
      // Handled in store or caller
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
    <Dialog open={open}>
      <DialogTrigger
        render={
          triggerButton ? (
            (triggerButton as React.ReactElement)
          ) : (
            <Button
              variant="outline"
              className="border-border/80 hover:bg-muted/30 text-foreground gap-2 font-semibold text-xs rounded-full min-h-11 px-5"
            >
              <ArrowUpRight className="h-4 w-4 text-primary" />
              {t("finance.requestWithdrawal")}
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <ArrowUpRight className="h-5 w-5 text-primary" />
            {t("finance.requestWithdrawal")}
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
              htmlFor="with-amount"
              className="text-xs font-medium text-muted-foreground"
            >
              {t("finance.amount")} (Min. Rp 50.000)
            </Label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-mono">
                Rp
              </span>
              <Input
                id="with-amount"
                type="number"
                placeholder="100000"
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
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {POPULAR_BANKS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBankName(b)}
                  className={`rounded-xl border py-2 text-xs font-mono font-semibold transition-all ${
                    bankName === b
                      ? "border-primary bg-primary/10 text-primary"
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
              htmlFor="with-acc-no"
              className="text-xs font-medium text-muted-foreground"
            >
              {t("finance.accountNumber")}
            </Label>
            <div className="relative mt-1.5">
              <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="with-acc-no"
                placeholder="1234567890"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="pl-9 font-mono text-xs rounded-xl min-h-10"
              />
            </div>
          </div>

          {/* Account Name */}
          <div>
            <Label
              htmlFor="with-acc-name"
              className="text-xs font-medium text-muted-foreground"
            >
              {t("finance.accountHolder")}
            </Label>
            <div className="relative mt-1.5">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="with-acc-name"
                placeholder="Nama pemilik rekening"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="pl-9 text-xs rounded-xl min-h-10"
              />
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <Label
              htmlFor="with-notes"
              className="text-xs font-medium text-muted-foreground"
            >
              {t("finance.notesOptional")}
            </Label>
            <Input
              id="with-notes"
              placeholder="Catatan transfer"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1.5 text-xs rounded-xl min-h-10"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                numAmount < 50000 ||
                numAmount > availableBalance
              }
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
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
