"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldAlert,
  Server,
  Users,
  CreditCard,
  Clock,
  Box,
  Settings,
  ArrowLeft,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AdminNavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const adminNavItems: AdminNavItem[] = [
  {
    title: "Admin Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Server Node Manager",
    href: "/admin/servers",
    icon: Server,
    badge: "CRUD",
  },
  {
    title: "Pengguna & Saldo",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Ledger Finansial",
    href: "/admin/finance",
    icon: CreditCard,
  },
  {
    title: "Cronjob Scheduler",
    href: "/admin/cron",
    icon: Clock,
    badge: "40 Tasks",
  },
  {
    title: "Kubernetes Clusters",
    href: "/admin/k8s",
    icon: Box,
  },
  {
    title: "System Config",
    href: "/admin/settings",
    icon: Settings,
  },
];

interface AdminSidebarProps {
  className?: string;
  onCloseMobile?: () => void;
}

export function AdminSidebar({ className, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-rose-500/20 bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-rose-500/20 px-5">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <ShieldAlert className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-sidebar-foreground">
              Go<span className="text-rose-500">VPN</span>
            </span>
            <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider font-semibold">
              Superadmin Portal
            </span>
          </div>
        </Link>
        <Badge
          variant="outline"
          className="border-rose-500/30 font-mono text-[10px] text-rose-400 bg-rose-500/10"
        >
          ROOT
        </Badge>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          Core Administration
        </div>
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150",
                isActive
                  ? "bg-rose-500 text-white shadow-sm shadow-rose-500/25"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <div className="flex items-center gap-2.5">
                <item.icon
                  className={cn(
                    "size-4",
                    isActive ? "text-white" : "text-muted-foreground",
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
                      ? "bg-white/20 text-white"
                      : "bg-rose-500/10 text-rose-400",
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Switch to Member Dashboard */}
      <div className="border-t border-rose-500/20 p-3">
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
