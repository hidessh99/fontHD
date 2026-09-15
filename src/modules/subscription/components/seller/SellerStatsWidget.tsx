// ==============================================================================
// GoVPN Seller Subscription Stats Widget Component
// Part of Pola C: components/seller/SellerStatsWidget.tsx
// 100% Coinbase Institutional Design System (Reseller Metrics & Tier)
// ==============================================================================

"use client";

import React from "react";
import { SellerStats } from "../../types/subscription.types";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ShieldCheck, DollarSign, Award } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface SellerStatsWidgetProps {
  stats?: SellerStats | null;
}

export function SellerStatsWidget({ stats }: SellerStatsWidgetProps) {
  const { t } = useI18n();

  const fallbackStats: SellerStats = {
    seller_tier: "GOLD RESELLER",
    total_customers: 34,
    active_subscriptions: 48,
    total_revenue: 2450000,
    commission_rate: 20,
    pending_commission: 490000,
  };

  const data = stats || fallbackStats;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
        <CardContent className="p-0 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground font-medium">
              {t("subscription.partnerTier")}
            </span>
            <div className="font-mono text-xl font-bold text-amber-400 mt-1">
              {data.seller_tier}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
        <CardContent className="p-0 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground font-medium">
              {t("subscription.totalCustomers")}
            </span>
            <div className="font-mono text-2xl font-bold text-foreground mt-1">
              {data.total_customers} User
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Users className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
        <CardContent className="p-0 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground font-medium">
              {t("subscription.activeSubs")}
            </span>
            <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">
              {data.active_subscriptions} Akun
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
        <CardContent className="p-0 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground font-medium">
              {t("subscription.estimatedCommission", { rate: data.commission_rate })}
            </span>
            <div className="font-mono text-2xl font-bold text-primary mt-1">
              Rp {data.pending_commission.toLocaleString("id-ID")}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <DollarSign className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
