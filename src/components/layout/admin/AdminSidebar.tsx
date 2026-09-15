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
  Globe,
  Bot,
  Layers,
  HelpCircle,
  Bell,
  Activity,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";

interface AdminNavGroup {
  groupKey: string;
  defaultTitle: string;
  items: Array<{
    titleKey: string;
    defaultTitle: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }>;
}

const adminNavGroups: AdminNavGroup[] = [
  {
    groupKey: "nav.admin.groupInfrastructure",
    defaultTitle: "Core Infrastructure",
    items: [
      {
        titleKey: "nav.admin.dashboard",
        defaultTitle: "Dashboard Overview",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        titleKey: "nav.admin.servers",
        defaultTitle: "Server Node Fleet",
        href: "/admin/servers",
        icon: Server,
        badge: "Fleet",
      },
      {
        titleKey: "nav.admin.kubernetes",
        defaultTitle: "Kubernetes Apps",
        href: "/admin/kubernetes",
        icon: Box,
      },
      {
        titleKey: "nav.admin.monitor",
        defaultTitle: "System Health",
        href: "/admin/monitor",
        icon: Activity,
      },
      {
        titleKey: "nav.admin.cron",
        defaultTitle: "Cronjob Scheduler",
        href: "/admin/cron",
        icon: Clock,
        badge: "40 Tasks",
      },
    ],
  },
  {
    groupKey: "nav.admin.groupSystem",
    defaultTitle: "Security & Network",
    items: [
      {
        titleKey: "nav.admin.users",
        defaultTitle: "Users & IAM",
        href: "/admin/users",
        icon: Users,
      },
      {
        titleKey: "nav.admin.dns",
        defaultTitle: "DNS Cloudflare",
        href: "/admin/dns",
        icon: Globe,
      },
      {
        titleKey: "nav.admin.ai",
        defaultTitle: "AI Gateway Engine",
        href: "/admin/ai",
        icon: Bot,
      },
    ],
  },
  {
    groupKey: "nav.admin.groupCommerce",
    defaultTitle: "Finance & Commercial",
    items: [
      {
        titleKey: "nav.admin.finance",
        defaultTitle: "Financial Ledger",
        href: "/admin/finance",
        icon: CreditCard,
      },
      {
        titleKey: "nav.admin.subscriptions",
        defaultTitle: "Plans & Subscriptions",
        href: "/admin/subscription",
        icon: Layers,
      },
      {
        titleKey: "nav.admin.support",
        defaultTitle: "Helpdesk & Tickets",
        href: "/admin/support",
        icon: HelpCircle,
      },
    ],
  },
  {
    groupKey: "nav.admin.groupServices",
    defaultTitle: "Communications & CMS",
    items: [
      {
        titleKey: "nav.admin.notifications",
        defaultTitle: "Broadcast Queue",
        href: "/admin/notifications",
        icon: Bell,
      },
      {
        titleKey: "nav.admin.content",
        defaultTitle: "CMS & System Settings",
        href: "/admin/content",
        icon: Settings,
      },
    ],
  },
];

interface AdminSidebarProps {
  className?: string;
  onCloseMobile?: () => void;
}

export function AdminSidebar({ className, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-rose-500/20 bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-rose-500/20 px-5 shrink-0">
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
      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-3">
        {adminNavGroups.map((group) => (
          <div key={group.groupKey} className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              {t(group.groupKey) || group.defaultTitle}
            </div>
            {group.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/admin/kubernetes" &&
                  pathname === "/admin/k8s") ||
                (item.href === "/admin/content" &&
                  pathname === "/admin/settings");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-150",
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
                    <span>{t(item.titleKey) || item.defaultTitle}</span>
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
          </div>
        ))}
      </nav>

      {/* Cross-Portal Switchers */}
      <div className="border-t border-rose-500/20 p-2.5 space-y-1 shrink-0">
        <Link
          href="/seller/vpn"
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-amber-400 hover:bg-amber-500/10 transition-colors"
        >
          <Building2 className="size-3.5" />
          <span>{t("nav.admin.backToSeller") || "Back to Reseller Portal"}</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>{t("nav.admin.backToUser") || "Back to Member Area"}</span>
        </Link>
      </div>
    </aside>
  );
}
