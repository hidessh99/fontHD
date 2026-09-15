// ==============================================================================
// GoVPN VPN Seller Quota Progress Component
// Part of Pola C: components/seller/
// Displays remaining reseller bulk quota with visual warnings
// ==============================================================================

"use client";

import React from "react";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n/context";

interface SellerQuotaProgressProps {
  usedQuota: number;
  totalQuota: number;
  remainingQuota: number;
}

export function SellerQuotaProgress({
  usedQuota,
  totalQuota,
  remainingQuota,
}: SellerQuotaProgressProps) {
  const { t } = useI18n();
  const percentage =
    totalQuota > 0 ? Math.round((usedQuota / totalQuota) * 100) : 0;
  const isLow = remainingQuota <= 5;

  return (
    <div className="p-5 rounded-2xl bg-card border border-border/70 space-y-3 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-primary" />
          <span className="text-xs font-bold text-foreground">
            {t("vpn.resellerQuotaTitle")}
          </span>
        </div>
        <span className="text-xs font-bold text-primary">
          {t("vpn.resellerQuotaUsed", { percent: percentage })}
        </span>
      </div>

      <Progress value={percentage} className="h-2 rounded-full" />

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
        <span>
          {t("vpn.resellerRemaining", { count: remainingQuota })}
        </span>
        <span>
          {t("vpn.resellerTotal", { count: totalQuota })}
        </span>
      </div>

      {isLow && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
          <AlertCircle className="size-4 shrink-0" />
          <span>
            {t("vpn.resellerQuotaLow")}
          </span>
        </div>
      )}
    </div>
  );
}
