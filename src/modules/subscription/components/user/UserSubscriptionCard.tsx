// ==============================================================================
// GoVPN User Subscription Card Component
// Part of Pola C: components/user/UserSubscriptionCard.tsx
// 100% Coinbase Institutional Design System (Active Membership & Renewal Vitals)
// ==============================================================================

"use client";

import React from "react";
import { Subscription } from "../../types/subscription.types";
import { SubscriptionStatusBadge } from "../shared/SubscriptionStatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Calendar,
  Smartphone,
  Wifi,
  ArrowUpRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface UserSubscriptionCardProps {
  subscription?: Subscription | null;
  onUpgrade?: () => void;
}

export function UserSubscriptionCard({
  subscription,
  onUpgrade,
}: UserSubscriptionCardProps) {
  const { t } = useI18n();

  if (!subscription) {
    return (
      <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">
              {t("subscription.yourStatus")}
            </span>
            <h3 className="text-lg font-bold text-foreground">
              {t("subscription.freeTierTitle")}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t("subscription.freeTierDesc")}
            </p>
          </div>

          {onUpgrade && (
            <Button
              onClick={onUpgrade}
              className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-md shadow-primary/20 gap-1.5"
            >
              {t("subscription.choosePremium")}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-primary/30 bg-primary/5 backdrop-blur-sm p-6 rounded-2xl shadow-sm relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">
              {t("subscription.activeSubscription")}
            </span>
            <SubscriptionStatusBadge status={subscription.status} />
          </div>

          <h3 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            {subscription.plan?.name || "Premium VPN Membership"}
          </h3>

          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              {t("subscription.validUntil", { date: new Date(subscription.end_date).toLocaleDateString("id-ID") })}
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="h-3.5 w-3.5 text-indigo-400" />
              {t("subscription.maxDevices", { count: subscription.plan?.max_devices || 5 })}
            </span>
            <span className="flex items-center gap-1.5">
              <Wifi className="h-3.5 w-3.5 text-emerald-400" />
              Bandwidth:{" "}
              {subscription.plan?.bandwidth_gb
                ? `${subscription.plan.bandwidth_gb} GB`
                : t("subscription.unlimitedQuota")}
            </span>
          </div>
        </div>

        {onUpgrade && (
          <Button
            onClick={onUpgrade}
            className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-md shadow-primary/20 gap-1.5 self-end sm:self-auto"
          >
            {t("subscription.upgradeOrChange")}
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}
