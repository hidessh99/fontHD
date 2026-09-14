"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Zap,
  Layers,
  CreditCard,
  ArrowLeft,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SellerNavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const sellerNavItems: SellerNavItem[] = [
  {
    title: "Provisi VPN & Kuota",
    href: "/seller/vpn",
    icon: Zap,
    badge: "Minting",
  },
  {
    title: "Langganan Pelanggan",
    href: "/seller/subscription",
    icon: Layers,
  },
  {
    title: "Penarikan Komisi",
    href: "/seller/withdrawal",
    icon: CreditCard,
    badge: "Payout",
  },
];

interface SellerSidebarProps {
  className?: string;
  onCloseMobile?: () => void;
}

export function SellerSidebar({
  className,
  onCloseMobile,
}: SellerSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-amber-500/20 bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-amber-500/20 px-5">
        <Link href="/seller/vpn" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
            <Building2 className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-sidebar-foreground">
              Go<span className="text-amber-500">VPN</span>
            </span>
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider font-semibold">
              Partner Portal
            </span>
          </div>
        </Link>
        <Badge
          variant="outline"
          className="border-amber-500/30 font-mono text-[10px] text-amber-500 bg-amber-500/10"
        >
          GOLD
        </Badge>
      </div>

      {/* Quick Tier Status Banner */}
      <div className="p-3 m-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground flex items-center gap-1">
            <Sparkles className="size-3 text-amber-500" /> Reseller Tier
          </span>
          <span className="font-bold text-amber-500 text-[11px]">
            25% Komisi
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-tight">
          White-label tunneling & multi-tenant customer fleet.
        </p>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          Operasional Reseller
        </div>

        {sellerNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150",
                isActive
                  ? "bg-amber-500 text-black shadow-sm shadow-amber-500/25 font-bold"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <div className="flex items-center gap-2.5">
                <item.icon
                  className={cn(
                    "size-4",
                    isActive ? "text-black" : "text-amber-500",
                  )}
                />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[9px] px-1.5 py-0 border-none font-mono",
                    isActive
                      ? "bg-black/20 text-black"
                      : "bg-amber-500/10 text-amber-500",
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Switch to Member Console */}
      <div className="border-t border-amber-500/20 p-3">
        <Link
          href="/dashboard"
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Kembali ke Console Member</span>
        </Link>
      </div>
    </aside>
  );
}
