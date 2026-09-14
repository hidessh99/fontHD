import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type EntityStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "PENDING"
  | "SUSPENDED"
  | "MAINTENANCE"
  | "ONLINE"
  | "OFFLINE"
  | "PAID"
  | "UNPAID"
  | string;

interface StatusBadgeProps {
  status: EntityStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const norm = (status || "").toUpperCase();

  let color = "border-border text-muted-foreground bg-muted/40";
  let dot = "bg-muted-foreground";

  switch (norm) {
    case "ACTIVE":
    case "ONLINE":
    case "PAID":
      color = "border-emerald-500/40 text-emerald-400 bg-emerald-500/10";
      dot = "bg-emerald-400";
      break;
    case "PENDING":
    case "UNPAID":
      color = "border-amber-500/40 text-amber-400 bg-amber-500/10";
      dot = "bg-amber-400";
      break;
    case "EXPIRED":
    case "OFFLINE":
    case "FAILED":
      color = "border-rose-500/40 text-rose-400 bg-rose-500/10";
      dot = "bg-rose-400";
      break;
    case "MAINTENANCE":
    case "SUSPENDED":
      color = "border-cyan-500/40 text-cyan-400 bg-cyan-500/10";
      dot = "bg-cyan-400";
      break;
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-xs uppercase font-semibold",
        color,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dot)} />
      {norm}
    </Badge>
  );
}
