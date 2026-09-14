"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  Home,
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher, ThemeToggle } from "@/components/layout/shared";
import { useI18n } from "@/lib/i18n/context";

export default function NotFoundPage() {
  const { t } = useI18n();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-border bg-card/20 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-mono text-lg font-bold tracking-tight text-foreground">
            GoVPN<span className="text-primary">.net</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg text-center">
          {/* Status Code with Floating Glow */}
          <div className="relative inline-block mb-6">
            <span className="absolute -inset-2 rounded-full bg-blue-500/30 blur-2xl opacity-40 dark:opacity-50" />
            <h1 className="relative text-8xl sm:text-9xl font-black tracking-tight bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent select-none">
              404
            </h1>
          </div>

          {/* Error Card */}
          <div className="backdrop-blur-xl bg-card/80 border border-border/80 rounded-3xl p-8 shadow-2xl shadow-blue-500/5">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 border border-blue-500/20">
                <AlertTriangle className="w-8 h-8" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3 uppercase tracking-tight">
              {t("errorPage.title404")}
            </h2>
            <p className="text-muted-foreground font-medium leading-relaxed mb-8 text-sm sm:text-base">
              {t("errorPage.description404")}
            </p>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Button
                asChild
                size="lg"
                className="w-full shadow-lg shadow-primary/25 rounded-2xl h-12 font-bold"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2 shrink-0" />
                  {t("errorPage.backHome")}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-2xl h-12 font-bold border-border/80"
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="w-4 h-4 mr-2 shrink-0" />
                  {t("errorPage.backDashboard")}
                </Link>
              </Button>
            </div>

            {/* Technical Details Collapsible */}
            <div className="mt-6 border-t border-border pt-4">
              <button
                type="button"
                className="w-full flex items-center justify-between text-xs font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={() => setShowDetails(!showDetails)}
              >
                <span>{t("errorPage.technicalDetails")}</span>
                {showDetails ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {showDetails && (
                <div className="mt-3 p-4 bg-muted/40 rounded-xl text-left border border-border/80 text-xs font-mono text-muted-foreground space-y-1">
                  <p className="font-bold text-rose-400">
                    HTTP 404 - Resource Not Found
                  </p>
                  <p className="text-[11px] opacity-75">
                    The requested URL path does not map to any active Next.js
                    route segment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 py-4 text-center text-xs text-muted-foreground border-t border-border bg-card/20 backdrop-blur-md">
        <p>
          &copy; {new Date().getFullYear()} GoVPN Enterprise (HideSSH). All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}
