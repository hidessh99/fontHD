// ==============================================================================
// GoVPN Support Ticket Status Badge
// Part of Pola C: components/shared/TicketStatusBadge.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Badge } from "@/components/ui/badge";
import { TicketStatus } from "../../types/support.types";

interface TicketStatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

export function TicketStatusBadge({ status, className }: TicketStatusBadgeProps) {
  switch (status) {
    case "OPEN":
      return (
        <Badge
          variant="outline"
          className={`border-blue-500/30 bg-blue-500/10 text-blue-500 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          OPEN
        </Badge>
      );
    case "IN_PROGRESS":
      return (
        <Badge
          variant="outline"
          className={`border-amber-500/30 bg-amber-500/10 text-amber-500 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          IN PROGRESS
        </Badge>
      );
    case "RESOLVED":
      return (
        <Badge
          variant="outline"
          className={`border-emerald-500/30 bg-emerald-500/10 text-emerald-500 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          RESOLVED
        </Badge>
      );
    case "CLOSED":
      return (
        <Badge
          variant="outline"
          className={`border-zinc-500/30 bg-zinc-500/10 text-zinc-400 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          CLOSED
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
