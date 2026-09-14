"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  LayoutDashboard,
  Zap,
  Server,
  CreditCard,
  Globe,
  Bot,
  Box,
  Layers,
  HelpCircle,
  Settings,
  ChevronDown,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { clearAllAuthStorage } from "@/lib/storage/cookies";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  subItems?: Array<{ title: string; href: string; badge?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "VPN Protocols",
    href: "/vpn",
    icon: Zap,
    subItems: [
      { title: "SSH / Dropbear", href: "/vpn/ssh" },
      { title: "VMess (V2Ray)", href: "/vpn/vmess" },
      { title: "VLess Reality", href: "/vpn/vless" },
      { title: "Trojan", href: "/vpn/trojan" },
      { title: "Shadowsocks", href: "/vpn/shadowsocks" },
      { title: "WireGuard", href: "/vpn/wireguard" },
    ],
  },
  {
    title: "Server Nodes",
    href: "/servers",
    icon: Server,
    badge: "Live",
  },
  {
    title: "Billing & Saldo",
    href: "/billing",
    icon: CreditCard,
    subItems: [
      { title: "Faktur & Tagihan", href: "/billing/invoices" },
      { title: "Deposit Saldo", href: "/billing/deposit" },
    ],
  },
  {
    title: "DNS Cloudflare",
    href: "/dns",
    icon: Globe,
  },
  {
    title: "AI Gateway",
    href: "/ai",
    icon: Bot,
    badge: "New",
  },
  {
    title: "Kubernetes Apps",
    href: "/k8s",
    icon: Box,
  },
  {
    title: "Paket Langganan",
    href: "/subscription",
    icon: Layers,
  },
  {
    title: "Bantuan & CS",
    href: "/support",
    icon: HelpCircle,
  },
  {
    title: "Pengaturan & API",
    href: "/settings",
    icon: Settings,
  },
];

interface DashboardSidebarProps {
  className?: string;
  onCloseMobile?: () => void;
}

export function DashboardSidebar({ className, onCloseMobile }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "VPN Protocols": true,
    "Billing & Saldo": false,
  });

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLogout = () => {
    clearAllAuthStorage();
    window.location.href = "/login";
  };

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-border/80 bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary">
            <Shield className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-sidebar-foreground">
              Go<span className="text-primary">VPN</span>
            </span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Tunneling Console
            </span>
          </div>
        </Link>
        <Badge variant="outline" className="border-primary/30 font-mono text-[10px] text-primary">
          v2.0
        </Badge>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.subItems && item.subItems.some((sub) => pathname === sub.href));
          const hasSub = !!item.subItems && item.subItems.length > 0;
          const isExpanded = openGroups[item.title] ?? false;

          return (
            <div key={item.title} className="space-y-0.5">
              {hasSub ? (
                <button
                  type="button"
                  onClick={() => toggleGroup(item.title)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className={cn("size-4", isActive ? "text-primary" : "text-muted-foreground")} />
                    <span>{item.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <Badge className="bg-primary/20 text-primary border-none text-[9px] px-1.5 py-0">
                        {item.badge}
                      </Badge>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="size-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="size-3.5 text-muted-foreground" />
                    )}
                  </div>
                </button>
              ) : (
                <Link
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className={cn("size-4", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[9px] px-1.5 py-0 border-none font-mono",
                        isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary",
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )}

              {/* Sub items */}
              {hasSub && isExpanded && (
                <div className="ml-4 pl-3 border-l border-sidebar-border/60 space-y-0.5 py-1">
                  {item.subItems!.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={onCloseMobile}
                        className={cn(
                          "block rounded-lg px-2.5 py-1.5 text-xs transition-colors",
                          isSubActive
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                        )}
                      >
                        {sub.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer / User Session Action */}
      <div className="border-t border-sidebar-border p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="size-4" />
          <span>Keluar dari Akun</span>
        </button>
      </div>
    </aside>
  );
}
