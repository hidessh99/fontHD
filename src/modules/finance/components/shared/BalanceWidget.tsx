// ==============================================================================
// GoVPN Finance Balance Widget Component
// Part of Pola C: components/shared/BalanceWidget.tsx
// 100% Coinbase Design System (JetBrains Mono IDR, Pill CTA, High-Trust Tokens)
// Fully Localized with useI18n (EN/ID)
// ==============================================================================

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, TrendingDown } from "lucide-react";
import { TopupModal } from "../user/TopupModal";
import { CreateTopupDto } from "../../types/user.types";
import { useI18n } from "@/lib/i18n/context";

interface BalanceWidgetProps {
  balance: number;
  totalSpent?: number;
  onTopup: (dto: CreateTopupDto) => Promise<unknown>;
  onValidateVoucher?: (
    code: string,
  ) => Promise<{ valid: boolean; discount_amount: number; message?: string }>;
}

export function BalanceWidget({
  balance,
  totalSpent = 0,
  onTopup,
  onValidateVoucher,
}: BalanceWidgetProps) {
  const { t } = useI18n();

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <Card className="border border-border/80 bg-card/60 p-6 rounded-2xl relative overflow-hidden">
      <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

      <CardContent className="p-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-primary/10 border border-primary/20 p-3.5 text-primary">
            <Wallet className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              {t("finance.activeWalletBalance")}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-3xl font-bold tracking-tight text-foreground">
                {formatIDR(balance)}
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-mono">
                IDR
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground font-mono">
              <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{t("finance.totalSpent")}</span>
              <span className="font-mono text-foreground font-semibold">
                {formatIDR(totalSpent)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TopupModal onTopup={onTopup} onValidateVoucher={onValidateVoucher} />
        </div>
      </CardContent>
    </Card>
  );
}
