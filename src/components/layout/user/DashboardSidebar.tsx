"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/iam/store/auth.store";
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
  BookOpen,
  Building2,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getCookie } from "@/lib/storage/cookies";
import { useI18n } from "@/lib/i18n/context";

interface NavItem {
  id: string;
  titleKey: string;
  defaultTitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  subItems?: Array<{ titleKey: string; defaultTitle: string; href: string; badge?: string }>;
}

const navItems: NavItem[] = [
  {
    id: "overview",
    titleKey: "nav.user.overview",
    defaultTitle: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "vpn",
    titleKey: "nav.user.vpnProtocols",
    defaultTitle: "VPN Protocols",
    href: "/vpn",
    icon: Zap,
    subItems: [
      { titleKey: "protocols.ssh", defaultTitle: "SSH / Dropbear", href: "/vpn/ssh" },
      { titleKey: "protocols.vmess", defaultTitle: "VMess (V2Ray)", href: "/vpn/vmess" },
      { titleKey: "protocols.vless", defaultTitle: "VLess Reality", href: "/vpn/vless" },
      { titleKey: "protocols.trojan", defaultTitle: "Trojan", href: "/vpn/trojan" },
      { titleKey: "protocols.shadowsocks", defaultTitle: "Shadowsocks", href: "/vpn/shadowsocks" },
      { titleKey: "protocols.wireguard", defaultTitle: "WireGuard", href: "/vpn/wireguard" },
    ],
  },
  {
    id: "servers",
    titleKey: "nav.user.serverNodes",
    defaultTitle: "Server Nodes",
    href: "/servers",
    icon: Server,
    badge: "Live",
  },
  {
    id: "billing",
    titleKey: "nav.user.billing",
    defaultTitle: "Billing & Deposit",
    href: "/billing",
    icon: CreditCard,
    subItems: [
      { titleKey: "finance.invoicesTitle", defaultTitle: "Invoices", href: "/billing/invoices" },
      { titleKey: "finance.depositTitle", defaultTitle: "Deposit Balance", href: "/billing/deposit" },
    ],
  },
  {
    id: "dns",
    titleKey: "nav.user.dnsManager",
    defaultTitle: "DNS Manager",
    href: "/dns",
    icon: Globe,
  },
  {
    id: "ai",
    titleKey: "nav.user.aiGateway",
    defaultTitle: "AI Gateway",
    href: "/ai",
    icon: Bot,
    badge: "New",
  },
  {
    id: "k8s",
    titleKey: "nav.user.kubernetes",
    defaultTitle: "Kubernetes Fleet",
    href: "/kubernetes",
    icon: Box,
  },
  {
    id: "subscription",
    titleKey: "nav.user.subscriptionPlans",
    defaultTitle: "Subscription Plans",
    href: "/subscription",
    icon: Layers,
  },
  {
    id: "support",
    titleKey: "nav.user.supportTickets",
    defaultTitle: "Support Tickets",
    href: "/support",
    icon: HelpCircle,
  },
  {
    id: "kb",
    titleKey: "nav.user.knowledgeBase",
    defaultTitle: "Knowledge Base",
    href: "/articles",
    icon: BookOpen,
  },
  {
    id: "settings",
    titleKey: "nav.user.settings",
    defaultTitle: "Account Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface DashboardSidebarProps {
  className?: string;
  onCloseMobile?: () => void;
}

export function DashboardSidebar({
  className,
  onCloseMobile,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    vpn: true,
    billing: false,
  });
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const role = (getCookie("govpn_user_role") || "").toUpperCase();
    setUserRole(role);
  }, []);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const isSeller =
    userRole === "SELLER" ||
    userRole === "RESELLER" ||
    userRole === "ADMIN" ||
    userRole === "SUPERADMIN";
  const isAdmin = userRole === "ADMIN" || userRole === "SUPERADMIN";

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-border/80 bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5 shrink-0">
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
        <Badge
          variant="outline"
          className="border-primary/30 font-mono text-[10px] text-primary"
        >
          v2.0
        </Badge>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/kubernetes" && pathname === "/k8s") ||
            (item.subItems &&
              item.subItems.some((sub) => pathname === sub.href));
          const hasSub = !!item.subItems && item.subItems.length > 0;
          const isExpanded = openGroups[item.id] ?? false;
          const title = t(item.titleKey) || item.defaultTitle;

          return (
            <div key={item.id} className="space-y-0.5">
              {hasSub ? (
                <button
                  type="button"
                  onClick={() => toggleGroup(item.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon
                      className={cn(
                        "size-4",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <span>{title}</span>
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
                    <item.icon
                      className={cn(
                        "size-4",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground",
                      )}
                    />
                    <span>{title}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[9px] px-1.5 py-0 border-none font-mono",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary",
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
                        {t(sub.titleKey) || sub.defaultTitle}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer / Cross-Portal Switcher & Logout */}
      <div className="border-t border-sidebar-border p-3 space-y-1.5 shrink-0">
        {isSeller && (
          <Link
            href="/seller/vpn"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-amber-500 hover:bg-amber-500/10 transition-colors"
          >
            <Building2 className="size-4 text-amber-500" />
            <span>{t("nav.user.resellerPortal") || "Reseller Portal"}</span>
          </Link>
        )}

        {isAdmin && (
          <Link
            href="/admin/dashboard"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <ShieldAlert className="size-4 text-rose-400" />
            <span>{t("nav.user.adminConsole") || "Admin Console"}</span>
          </Link>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="size-4" />
          <span>{t("common.logout") || "Logout"}</span>
        </button>
      </div>
    </aside>
  );
}
