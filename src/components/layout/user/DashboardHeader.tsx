"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/iam/store/auth.store";
import {
  Menu,
  Wallet,
  Bell,
  Search,
  User,
  LogOut,
  Shield,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle, LanguageSwitcher } from "../shared";
import { useI18n } from "@/lib/i18n/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "./DashboardSidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface DashboardHeaderProps {
  userBalance?: number;
  userName?: string;
  userRole?: string;
}

export function DashboardHeader({
  userBalance = 50000,
  userName = "Member",
  userRole = "USER",
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const { t } = useI18n();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/70 bg-background/80 px-4 backdrop-blur-md sm:px-6">
      {/* Left: Mobile Nav & Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Drawer Trigger */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="size-9 md:hidden border-border"
              >
                <Menu className="size-4 text-foreground" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            }
          />
          <SheetContent side="left" className="p-0 w-64 bg-sidebar">
            <DashboardSidebar onCloseMobile={() => setIsMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Dynamic Breadcrumbs */}
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="text-xs font-mono">
                Console
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.slice(0, 2).map((seg, idx) => {
              const isLast = idx === pathSegments.length - 1 || idx === 1;
              const href = "/" + pathSegments.slice(0, idx + 1).join("/");
              const formatted = seg.toUpperCase();

              return (
                <React.Fragment key={seg}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-xs font-mono font-semibold text-primary">
                        {formatted}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href} className="text-xs font-mono">
                        {formatted}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right: Wallet Balance, Search, Theme, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Wallet Balance Badge */}
        <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-surface/80 px-3 py-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 text-primary">
            <Wallet className="size-3.5" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hidden sm:inline">
              {t("common.balance") || "Balance"}
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-foreground">
            Rp {userBalance.toLocaleString("id-ID")}
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="size-6 text-primary hover:bg-primary/10 rounded-lg ml-0.5"
            render={
              <Link href="/billing/deposit" title={t("finance.topupNow") || "Top Up Balance"}>
                <PlusCircle className="size-3.5" />
              </Link>
            }
          />
        </div>

        {/* Quick Search Helper */}
        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex items-center gap-2 border-border/80 bg-background/50 text-xs font-mono text-muted-foreground px-2.5 h-8"
        >
          <Search className="size-3.5" />
          <span>{t("common.search") || "Search..."}</span>
          <kbd className="rounded border border-border px-1 text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </Button>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground"
          render={
            <Link href="/notifications" title={t("notification.title") || "Notifications"}>
              <Bell className="size-4" />
            </Link>
          }
        />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                className="flex items-center gap-2 border-border/80 bg-surface px-2.5 h-8 rounded-xl"
              >
                <div className="flex size-5 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <User className="size-3" />
                </div>
                <span className="text-xs font-medium text-foreground max-w-20 truncate hidden md:inline">
                  {userName}
                </span>
                <Badge
                  variant="outline"
                  className="text-[9px] px-1 py-0 font-mono border-primary/40 text-primary hidden lg:inline"
                >
                  {userRole}
                </Badge>
              </Button>
            }
          />
          <DropdownMenuContent
            align="end"
            className="w-56 bg-card border-border"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground font-mono">
                  Role: {userRole}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={
                <Link
                  href="/settings"
                  className="flex items-center w-full cursor-pointer"
                />
              }
            >
              <Shield className="mr-2 size-4 text-muted-foreground" />
              <span>{t("iam.profileTitle") || "Profile Settings"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              render={
                <Link
                  href="/billing/invoices"
                  className="flex items-center w-full cursor-pointer"
                />
              }
            >
              <Wallet className="mr-2 size-4 text-muted-foreground" />
              <span>{t("finance.invoicesTitle") || "Invoices"}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-rose-400 focus:text-rose-400 cursor-pointer"
            >
              <LogOut className="mr-2 size-4" />
              <span>{t("common.logout") || "Logout"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
