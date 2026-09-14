// ==============================================================================
// GoVPN Kubernetes App Status Badge Component
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Badge } from "@/components/ui/badge";
import { K8sAppStatus } from "../../types/k8s.types";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCcw,
  StopCircle,
} from "lucide-react";

interface K8sAppStatusBadgeProps {
  status: K8sAppStatus | string;
  className?: string;
}

export function K8sAppStatusBadge({
  status,
  className,
}: K8sAppStatusBadgeProps) {
  const norm = status?.toUpperCase();

  if (norm === "RUNNING") {
    return (
      <Badge
        variant="outline"
        className={`border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold gap-1 text-[11px] px-2 py-0.5 ${className}`}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        Running
      </Badge>
    );
  }

  if (norm === "PENDING") {
    return (
      <Badge
        variant="outline"
        className={`border-amber-500/30 bg-amber-500/10 text-amber-400 font-semibold gap-1 text-[11px] px-2 py-0.5 ${className}`}
      >
        <RotateCcw className="h-3 w-3 animate-spin" />
        Provisioning
      </Badge>
    );
  }

  if (norm === "CRASH_LOOP" || norm === "FAILED") {
    return (
      <Badge
        variant="outline"
        className={`border-rose-500/30 bg-rose-500/10 text-rose-400 font-semibold gap-1 text-[11px] px-2 py-0.5 ${className}`}
      >
        <XCircle className="h-3 w-3" />
        {norm === "CRASH_LOOP" ? "CrashLoopBackOff" : "Failed"}
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={`border-border bg-muted/40 text-muted-foreground font-semibold gap-1 text-[11px] px-2 py-0.5 ${className}`}
    >
      <StopCircle className="h-3 w-3" />
      Stopped
    </Badge>
  );
}
