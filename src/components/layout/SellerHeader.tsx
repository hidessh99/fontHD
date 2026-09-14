"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Coins,
  ArrowUpRight,
  User,
  LogOut,
  Building2,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SellerSidebar } from "./SellerSidebar";
import { clearAllAuthStorage } from "@/lib/storage/cookies";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface SellerHeaderProps {
  commissionBalance?: number;
  userName?: string;
}

export function SellerHeader({
  commissionBalance = 487500,
  userName = "Partner Reseller",
}: SellerHeaderProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    clearAllAuthStorage();
    window.location.href = "/login";
  };

  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-amber-500/20 bg-background/80 px-4 backdrop-blur-md sm:px-6">
      {/* Left: Mobile Nav & Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Drawer Trigger */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="size-9 md:hidden border-amber-500/30"
              >
                <Menu className="size-4 text-amber-500" />
                <span className="sr-only">Buka Menu Partner</span>
              </Button>
            }
          />
          <SheetContent side="left" className="p-0 w-64 bg-sidebar border-amber-500/20">
            <SellerSidebar onCloseMobile={() => setIsMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Dynamic Breadcrumbs */}
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/seller/vpn" className="text-xs font-mono text-amber-500">
                Partner Portal
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.slice(1).map((seg, idx) => {
              const isLast = idx === pathSegments.length - 2;
              const href = "/" + pathSegments.slice(0, idx + 2).join("/");
              const formatted = seg.toUpperCase();

              return (
                <React.Fragment key={seg}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-xs font-mono font-semibold text-foreground">
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

      {/* Right: Commission Balance, Payout CTA, Theme, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Commission Balance Badge */}
        <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-3 py-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 text-amber-500">
            <Coins className="size-3.5" />
            <span className="text-[10px] font-mono uppercase tracking-wider hidden sm:inline font-bold">
              Komisi
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-foreground">
            Rp {commissionBalance.toLocaleString("id-ID")}
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-[11px] text-amber-500 hover:bg-amber-500/15 rounded-lg ml-0.5 font-bold"
            asChild
            title="Tarik Komisi"
          >
            <Link href="/seller/withdrawal">
              <span>Tarik</span>
              <ArrowUpRight className="size-3 ml-0.5" />
            </Link>
          </Button>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                className="flex items-center gap-2 border-amber-500/30 bg-surface px-2.5 h-8 rounded-xl"
              >
                <div className="flex size-5 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500">
                  <Building2 className="size-3" />
                </div>
                <span className="text-xs font-medium text-foreground max-w-[90px] truncate hidden md:inline">
                  {userName}
                </span>
                <Badge
                  variant="outline"
                  className="text-[9px] px-1 py-0 font-mono border-amber-500/40 text-amber-500 hidden lg:inline"
                >
                  SELLER
                </Badge>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-56 bg-card border-border">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground font-mono">
                  Portal Reseller
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/dashboard" className="flex items-center w-full cursor-pointer" />}>
              <ArrowLeft className="mr-2 size-4 text-muted-foreground" />
              <span>Console Member Biasa</span>
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/seller/withdrawal" className="flex items-center w-full cursor-pointer" />}>
              <Coins className="mr-2 size-4 text-muted-foreground" />
              <span>Riwayat Penarikan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-rose-400 focus:text-rose-400 cursor-pointer"
            >
              <LogOut className="mr-2 size-4" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
