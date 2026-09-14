"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Background Ornaments / Radial Ambient Auras */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] bg-cyan-500/5 dark:bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 px-4 py-1.5 text-xs font-bold text-primary mb-6 border border-primary/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono tracking-wide uppercase">
              JARINGAN AKTIF • ULTRA-LOW LATENCY BGP
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.12] tracking-tight text-foreground mb-6">
            Infrastruktur Cloud Tunneling <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Bebas Sensor & Berkecepatan Tinggi
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground font-normal">
            Layanan VPN & SSH tunneling generasi baru dengan enkripsi perbankan,
            dukungan multi-protokol (V2Ray, VLess Reality, Trojan, Shadowsocks,
            WireGuard), dan optimasi latensi gaming internasional.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <Button
              size="lg"
              className="h-13 sm:h-14 w-full sm:w-auto rounded-2xl bg-primary hover:bg-primary-hover px-8 text-base font-bold text-white shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all"
              asChild
            >
              <Link href="/register">
                Mulai Sekarang — Gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-13 sm:h-14 w-full sm:w-auto rounded-2xl border-border bg-card/50 hover:bg-accent px-8 text-base font-bold text-foreground hover:scale-[1.02] active:scale-95 transition-all"
              asChild
            >
              <Link href="#protocols">
                <Zap className="mr-2 h-4 w-4 text-primary" />
                Lihat Protokol & Server
              </Link>
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="h-13 sm:h-14 w-full sm:w-auto rounded-2xl text-muted-foreground hover:text-amber-500 px-6 text-sm font-semibold hover:bg-amber-500/10 transition-colors"
              asChild
            >
              <Link href="/seller">
                <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
                Portal Reseller
              </Link>
            </Button>
          </div>

          {/* Trust Micro-bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              100% No-Logs Policy
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-primary" />
              Instant Provisioning 5s
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
              99.99% Uptime SLA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
