// ==============================================================================
// GoVPN Support Ticket Status Badge
// Part of Pola C: components/shared/TicketStatusBadge.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { TicketStatus } from "../../types/support.types";

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  switch (status) {
    case "OPEN":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          OPEN
        </span>
      );
    case "IN_PROGRESS":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          IN PROGRESS
        </span>
      );
    case "RESOLVED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          RESOLVED
        </span>
      );
    case "CLOSED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          CLOSED
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
          {status}
        </span>
      );
  }
}
