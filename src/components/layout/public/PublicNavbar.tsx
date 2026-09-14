"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle, LanguageSwitcher } from "../shared";
import { useAuthStore } from "@/modules/iam/store/auth.store";
import { useI18n } from "@/lib/i18n/context";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [protocolDropdownOpen, setProtocolDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { isAuthenticated, token } = useAuthStore();
  const { t } = useI18n();

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasAuth = mounted && (isAuthenticated || Boolean(token));

  const protocols = [
    {
      name: "SSH Dropbear / WS",
      desc: "Port 22, 442 & CDN",
      href: "/#protocols",
    },
    {
      name: "VMess (V2Ray)",
      desc: "Multi-path CDN Routing",
      href: "/#protocols",
    },
    {
      name: "VLess XTLS Reality",
      desc: "0-Hop Masking Direct",
      href: "/#protocols",
    },
    {
      name: "Trojan-GFW / Go",
      desc: "HTTPS Port 443 Masking",
      href: "/#protocols",
    },
    {
      name: "Shadowsocks AEAD",
      desc: "Low-latency Gaming",
      href: "/#protocols",
    },
    { name: "WireGuard Fast", desc: "Kernel Space UDP", href: "/#protocols" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-400">
            <Shield className="size-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-foreground">
            Go<span className="text-blue-700 dark:text-blue-400">VPN</span>
          </span>
          <Badge
            variant="outline"
            className="border-blue-500/30 text-blue-700 dark:text-blue-400 font-mono text-[10px] hidden sm:inline"
          >
            v2.0
          </Badge>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {/* Protocol Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProtocolDropdownOpen(true)}
            onMouseLeave={() => setProtocolDropdownOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors py-2 focus:outline-none cursor-pointer"
            >
              <span>{t("landing.nav.protocols")}</span>
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 ${
                  protocolDropdownOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {protocolDropdownOpen && (
              <div className="absolute top-full left-0 w-64 rounded-2xl border border-border bg-popover p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                {protocols.map((p) => (
                  <Link
                    key={p.name}
                    href={p.href}
                    onClick={() => setProtocolDropdownOpen(false)}
                    className="flex flex-col p-2.5 rounded-xl hover:bg-accent transition-colors"
                  >
                    <span className="text-xs font-bold text-foreground">
                      {p.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {p.desc}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("landing.nav.features")}
          </Link>

          <Link
            href="/subscription"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("landing.nav.pricing")}
          </Link>

          <Link
            href="/articles"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="size-3.5" />
            <span>{t("landing.nav.guides")}</span>
          </Link>

          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("landing.nav.about")}
          </Link>

          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("landing.nav.contact")}
          </Link>

          <Link
            href="/seller"
            className="text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="size-3.5" />
            <span>{t("landing.nav.reseller")}</span>
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {hasAuth ? (
            <Button
              size="sm"
              className="bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/20 text-xs font-bold rounded-xl"
              asChild
            >
              <Link href="/dashboard">
                <LayoutDashboard className="mr-1.5 size-3.5" />
                {t("landing.nav.dashboard")}
              </Link>
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:inline-flex text-xs font-semibold"
              >
                <Link href="/login">{t("landing.nav.login")}</Link>
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/20 text-xs font-bold rounded-xl"
                asChild
              >
                <Link href="/register">
                  {t("landing.nav.register")}{" "}
                  <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </>
          )}

          {/* Mobile hamburger button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden size-9 rounded-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-card p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-muted-foreground uppercase px-2">
              Menu Navigasi
            </div>
            <Link
              href="/#protocols"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-foreground px-2 py-1.5 rounded-lg hover:bg-accent"
            >
              {t("landing.nav.protocols")}
            </Link>
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-foreground px-2 py-1.5 rounded-lg hover:bg-accent"
            >
              {t("landing.nav.features")}
            </Link>
            <Link
              href="/subscription"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-foreground px-2 py-1.5 rounded-lg hover:bg-accent"
            >
              {t("landing.nav.pricing")}
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-foreground px-2 py-1.5 rounded-lg hover:bg-accent"
            >
              {t("landing.nav.guides")}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-foreground px-2 py-1.5 rounded-lg hover:bg-accent"
            >
              {t("landing.nav.about")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-foreground px-2 py-1.5 rounded-lg hover:bg-accent"
            >
              {t("landing.nav.contact")}
            </Link>
            <Link
              href="/seller"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-amber-700 dark:text-amber-400 px-2 py-1.5 rounded-lg hover:bg-amber-500/10"
            >
              {t("landing.nav.reseller")}
            </Link>
          </div>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            {hasAuth ? (
              <Button
                size="sm"
                className="w-full bg-primary text-white"
                asChild
              >
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="mr-2 size-4" />
                  {t("landing.nav.dashboard")}
                </Link>
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/login">{t("landing.nav.login")}</Link>
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-primary text-white"
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/register">{t("landing.nav.register")}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
