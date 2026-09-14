// ==============================================================================
// GoVPN DNS Record Type Badge Component
// Part of Pola C: components/shared/DnsTypeBadge.tsx
// 100% Coinbase Institutional Design System (Type Indicator Tags)
// ==============================================================================

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DnsRecordType } from "../../types/dns.types";

interface DnsTypeBadgeProps {
  type: DnsRecordType | string;
  className?: string;
}

export function DnsTypeBadge({ type, className }: DnsTypeBadgeProps) {
  const norm = type.toUpperCase();

  let color = "border-border text-muted-foreground bg-muted/40";

  switch (norm) {
    case "A":
      color = "border-cyan-500/40 text-cyan-400 bg-cyan-500/10";
      break;
    case "AAAA":
      color = "border-blue-500/40 text-blue-400 bg-blue-500/10";
      break;
    case "CNAME":
      color = "border-purple-500/40 text-purple-400 bg-purple-500/10";
      break;
    case "TXT":
      color = "border-amber-500/40 text-amber-400 bg-amber-500/10";
      break;
    case "NS":
      color = "border-emerald-500/40 text-emerald-400 bg-emerald-500/10";
      break;
    case "MX":
      color = "border-rose-500/40 text-rose-400 bg-rose-500/10";
      break;
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-mono text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider",
        color,
        className,
      )}
    >
      {norm}
    </Badge>
  );
}
