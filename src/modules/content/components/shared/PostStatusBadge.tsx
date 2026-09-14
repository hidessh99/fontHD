// ==============================================================================
// GoVPN Post Status Badge Component
// Part of Pola C: components/shared/PostStatusBadge.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { PostStatus } from "../../types/content.types";

interface PostStatusBadgeProps {
  status: PostStatus;
}

export function PostStatusBadge({ status }: PostStatusBadgeProps) {
  switch (status) {
    case "PUBLISHED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          PUBLISHED
        </span>
      );
    case "DRAFT":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          DRAFT
        </span>
      );
    case "ARCHIVED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          ARCHIVED
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
