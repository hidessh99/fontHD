// ==============================================================================
// GoVPN Node Status Badge Component
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Badge } from "@/components/ui/badge";
import { NodeStatus } from "../../types/monitor.types";
import { CheckCircle2, AlertTriangle, XCircle, Wrench } from "lucide-react";

interface NodeStatusBadgeProps {
  status: NodeStatus | string;
  className?: string;
}

export function NodeStatusBadge({ status, className }: NodeStatusBadgeProps) {
  const norm = status?.toUpperCase();

  if (norm === "ONLINE") {
    return (
      <Badge
        variant="outline"
        className={`border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold gap-1 text-[11px] px-2 py-0.5 ${className}`}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        Online
      </Badge>
    );
  }

  if (norm === "DEGRADED") {
    return (
      <Badge
        variant="outline"
        className={`border-amber-500/30 bg-amber-500/10 text-amber-400 font-semibold gap-1 text-[11px] px-2 py-0.5 ${className}`}
      >
        <AlertTriangle className="h-3 w-3" />
        Degraded
      </Badge>
    );
  }

  if (norm === "MAINTENANCE") {
    return (
      <Badge
        variant="outline"
        className={`border-sky-500/30 bg-sky-500/10 text-sky-400 font-semibold gap-1 text-[11px] px-2 py-0.5 ${className}`}
      >
        <Wrench className="h-3 w-3" />
        Maintenance
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={`border-rose-500/30 bg-rose-500/10 text-rose-400 font-semibold gap-1 text-[11px] px-2 py-0.5 ${className}`}
    >
      <XCircle className="h-3 w-3" />
      Offline
    </Badge>
  );
}
