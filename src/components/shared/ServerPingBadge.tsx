import React from "react";
import { Badge } from "@/components/ui/badge";
import { getLatencyMeta } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ServerPingBadgeProps {
  latencyMs: number;
  showLabel?: boolean;
  className?: string;
}

export function ServerPingBadge({
  latencyMs,
  showLabel = true,
  className,
}: ServerPingBadgeProps) {
  const meta = getLatencyMeta(latencyMs);

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-xs border-border/80 bg-background/50",
        className,
      )}
    >
      <span
        className={cn("size-2 rounded-full animate-pulse", meta.dotClass)}
      />
      {showLabel && <span className={meta.colorClass}>{meta.label}</span>}
    </Badge>
  );
}
