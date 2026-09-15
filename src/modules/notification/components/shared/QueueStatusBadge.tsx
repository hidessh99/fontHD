// ==============================================================================
// GoVPN Queue Status Badge Component
// Part of Pola C: components/shared/QueueStatusBadge.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Badge } from "@/components/ui/badge";
import { QueueStatus } from "../../types/notification.types";

interface QueueStatusBadgeProps {
  status: QueueStatus;
  className?: string;
}

export function QueueStatusBadge({ status, className }: QueueStatusBadgeProps) {
  switch (status) {
    case "SENT":
      return (
        <Badge
          variant="outline"
          className={`border-emerald-500/30 bg-emerald-500/10 text-emerald-500 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          TERKIRIM
        </Badge>
      );
    case "PROCESSING":
      return (
        <Badge
          variant="outline"
          className={`border-blue-500/30 bg-blue-500/10 text-blue-500 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
          MEMPROSES
        </Badge>
      );
    case "PENDING":
      return (
        <Badge
          variant="outline"
          className={`border-amber-500/30 bg-amber-500/10 text-amber-500 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          MENUNGGU
        </Badge>
      );
    case "FAILED":
      return (
        <Badge
          variant="outline"
          className={`border-red-500/30 bg-red-500/10 text-red-500 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          GAGAL
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge
          variant="outline"
          className={`border-zinc-500/30 bg-zinc-500/10 text-zinc-400 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          DIBATALKAN
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className={`text-xs font-medium ${className || ""}`}>
          {status}
        </Badge>
      );
  }
}
