"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Menu, X, ArrowRight, Zap, Server, FileText, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary">
            <Shield className="size-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-foreground">
            Go<span className="text-primary">VPN</span>
          </span>
          <Badge variant="outline" className="border-primary/30 text-primary font-mono text-xs hidden sm:inline">
            v2.0
          </Badge>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Paket Harga
          </Link>
          <Link href="/servers" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <Activity className="size-3.5 text-emerald-400" />
            <span>Server Nodes</span>
          </Link>
          <Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
            Network Tools
          </Link>
          <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
            Dokumentasi
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/login">Masuk</Link>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/20" asChild>
            <Link href="/register">
              Mulai <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>

          {/* Mobile hamburger button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden size-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card p-4 space-y-3">
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-foreground py-1"
          >
            Paket Harga
          </Link>
          <Link
            href="/servers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-foreground py-1"
          >
            Server Nodes
          </Link>
          <Link
            href="/tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-foreground py-1"
          >
            Network Tools
          </Link>
          <Link
            href="/docs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-foreground py-1"
          >
            Dokumentasi
          </Link>
          <div className="pt-2 border-t border-border flex items-center gap-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/login">Masuk</Link>
            </Button>
            <Button size="sm" className="w-full bg-primary text-white" asChild>
              <Link href="/register">Daftar</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
