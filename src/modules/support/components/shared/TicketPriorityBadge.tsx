// ==============================================================================
// GoVPN Support Ticket Priority Badge
// Part of Pola C: components/shared/TicketPriorityBadge.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { TicketPriority } from "../../types/support.types";

interface TicketPriorityBadgeProps {
  priority: TicketPriority;
}

export function TicketPriorityBadge({ priority }: TicketPriorityBadgeProps) {
  switch (priority) {
    case "URGENT":
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-red-500/15 text-red-500 border border-red-500/30">
          URGENT
        </span>
      );
    case "HIGH":
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-orange-500/15 text-orange-500 border border-orange-500/30">
          HIGH
        </span>
      );
    case "MEDIUM":
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
          MEDIUM
        </span>
      );
    case "LOW":
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium tracking-wider uppercase bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
          LOW
        </span>
      );
    default:
      return null;
  }
}
