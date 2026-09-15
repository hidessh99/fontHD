// ==============================================================================
// GoVPN Post Status Badge Component
// Part of Pola C: components/shared/PostStatusBadge.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Badge } from "@/components/ui/badge";
import { PostStatus } from "../../types/content.types";

interface PostStatusBadgeProps {
  status: PostStatus;
  className?: string;
}

export function PostStatusBadge({ status, className }: PostStatusBadgeProps) {
  switch (status) {
    case "PUBLISHED":
      return (
        <Badge
          variant="outline"
          className={`border-emerald-500/30 bg-emerald-500/10 text-emerald-500 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          PUBLISHED
        </Badge>
      );
    case "DRAFT":
      return (
        <Badge
          variant="outline"
          className={`border-amber-500/30 bg-amber-500/10 text-amber-500 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          DRAFT
        </Badge>
      );
    case "ARCHIVED":
      return (
        <Badge
          variant="outline"
          className={`border-zinc-500/30 bg-zinc-500/10 text-zinc-400 gap-1.5 font-semibold text-xs ${className || ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          ARCHIVED
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
