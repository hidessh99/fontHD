// ==============================================================================
// GoVPN Cloudflare Proxy Status Badge Component
// Part of Pola C: components/shared/CloudflareProxyBadge.tsx
// 100% Coinbase Institutional Design System (Proxied Orange vs DNS Only Grey)
// ==============================================================================

import React from "react";
import { Cloud, CloudOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface CloudflareProxyBadgeProps {
  proxied: boolean;
  className?: string;
}

export function CloudflareProxyBadge({
  proxied,
  className,
}: CloudflareProxyBadgeProps) {
  if (proxied) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-amber-400 shadow-sm",
          className,
        )}
        title="Trafik dilindungi oleh Cloudflare CDN & WAF (Orange Cloud)"
      >
        <Cloud className="h-3 w-3 fill-amber-400/40 text-amber-400" />
        PROXIED
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-muted/40 border border-border px-2.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground",
        className,
      )}
      title="Resolusi langsung ke IP origin server (Grey Cloud / DNS Only)"
    >
      <CloudOff className="h-3 w-3 text-muted-foreground" />
      DNS ONLY
    </span>
  );
}
