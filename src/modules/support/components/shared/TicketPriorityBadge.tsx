// ==============================================================================
// GoVPN Support Ticket Priority Badge
// Part of Pola C: components/shared/TicketPriorityBadge.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Badge } from "@/components/ui/badge";
import { TicketPriority } from "../../types/support.types";

interface TicketPriorityBadgeProps {
  priority: TicketPriority;
  className?: string;
}

export function TicketPriorityBadge({ priority, className }: TicketPriorityBadgeProps) {
  switch (priority) {
    case "URGENT":
      return (
        <Badge
          variant="outline"
          className={`border-rose-500/30 bg-rose-500/15 text-rose-500 font-bold tracking-wider text-[10px] uppercase ${className || ""}`}
        >
          URGENT
        </Badge>
      );
    case "HIGH":
      return (
        <Badge
          variant="outline"
          className={`border-orange-500/30 bg-orange-500/15 text-orange-500 font-bold tracking-wider text-[10px] uppercase ${className || ""}`}
        >
          HIGH
        </Badge>
      );
    case "MEDIUM":
      return (
        <Badge
          variant="outline"
          className={`border-blue-500/30 bg-blue-500/10 text-blue-400 font-medium tracking-wider text-[10px] uppercase ${className || ""}`}
        >
          MEDIUM
        </Badge>
      );
    case "LOW":
      return (
        <Badge
          variant="outline"
          className={`border-zinc-500/30 bg-zinc-500/10 text-zinc-400 font-medium tracking-wider text-[10px] uppercase ${className || ""}`}
        >
          LOW
        </Badge>
      );
    default:
      return null;
  }
}
