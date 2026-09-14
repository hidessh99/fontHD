// ==============================================================================
// GoVPN IAM Role Badge Component
// Part of Pola C: components/shared/RoleBadge.tsx
// 100% Coinbase Institutional Design System (Visual RBAC Badges)
// ==============================================================================

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ShieldCheck, User, Store, ShieldAlert } from "lucide-react";

interface RoleBadgeProps {
  role?: string;
  className?: string;
}

export function RoleBadge({ role = "USER", className }: RoleBadgeProps) {
  const norm = role.toUpperCase();

  let color = "border-border text-muted-foreground bg-muted/40";
  let icon = <User className="h-3 w-3" />;

  switch (norm) {
    case "SUPERADMIN":
      color = "border-purple-500/40 text-purple-400 bg-purple-500/10";
      icon = <ShieldAlert className="h-3 w-3" />;
      break;
    case "ADMIN":
      color = "border-blue-500/40 text-blue-400 bg-blue-500/10";
      icon = <ShieldCheck className="h-3 w-3" />;
      break;
    case "SELLER":
    case "RESELLER":
      color = "border-emerald-500/40 text-emerald-400 bg-emerald-500/10";
      icon = <Store className="h-3 w-3" />;
      break;
    case "USER":
    default:
      color = "border-border/80 text-foreground bg-surface";
      icon = <User className="h-3 w-3" />;
      break;
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 font-mono text-[11px] uppercase font-bold rounded-full",
        color,
        className
      )}
    >
      {icon}
      {norm}
    </Badge>
  );
}
