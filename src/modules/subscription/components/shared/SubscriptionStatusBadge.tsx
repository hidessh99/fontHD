// ==============================================================================
// GoVPN Subscription Status Badge Component
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Badge } from "@/components/ui/badge";
import { SubscriptionStatus } from "../../types/subscription.types";
import { CheckCircle2, Clock, AlertTriangle, XCircle } from "lucide-react";

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus | string;
  className?: string;
}

export function SubscriptionStatusBadge({ status, className }: SubscriptionStatusBadgeProps) {
  const norm = status?.toUpperCase();

  if (norm === "ACTIVE") {
    return (
      <Badge
        variant="outline"
        className={`border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold gap-1 text-[11px] px-2.5 py-0.5 ${className}`}
      >
        <CheckCircle2 className="h-3 w-3" />
        Aktif
      </Badge>
    );
  }

  if (norm === "PENDING" || norm === "TRIAL") {
    return (
      <Badge
        variant="outline"
        className={`border-amber-500/30 bg-amber-500/10 text-amber-400 font-semibold gap-1 text-[11px] px-2.5 py-0.5 ${className}`}
      >
        <Clock className="h-3 w-3" />
        {norm === "TRIAL" ? "Trial Aktif" : "Menunggu Pembayaran"}
      </Badge>
    );
  }

  if (norm === "EXPIRED") {
    return (
      <Badge
        variant="outline"
        className={`border-rose-500/30 bg-rose-500/10 text-rose-400 font-semibold gap-1 text-[11px] px-2.5 py-0.5 ${className}`}
      >
        <AlertTriangle className="h-3 w-3" />
        Kadaluarsa
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={`border-border bg-muted/40 text-muted-foreground font-semibold gap-1 text-[11px] px-2.5 py-0.5 ${className}`}
    >
      <XCircle className="h-3 w-3" />
      Dibatalkan
    </Badge>
  );
}
