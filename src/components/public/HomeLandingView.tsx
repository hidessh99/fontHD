"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Lock,
  DollarSign,
  TrendingUp,
  Users,
  Server,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  CreditCard,
  Activity,
  Cpu,
  Terminal,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export function HomeLandingView() {
  const { t, locale } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const isId = locale === "id";

  const stats = [
    {
      label: t("home.stats.totalMembers"),
      value: "150k+",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: t("home.stats.totalAccounts"),
      value: "800k+",
      icon: Shield,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: t("home.stats.activeAccounts"),
      value: "12k+",
      icon: Activity,
      color: "text-amber-500",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      label: t("home.stats.globalServers"),
      value: "250+",
      icon: Server,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
  ];

  const featureIcons = [Cpu, Globe, Zap, Lock, DollarSign, TrendingUp];
  const featureStyles = [
    { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
    { color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
    { color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  ];

  const protocolItems = [
    {
      name: isId ? "SSH Dropbear / WS" : "SSH Tunneling",
      icon: Terminal,
      tagline: isId ? "Aman & Fleksibel" : "Flexible & Reliable",
      features: [
        "Websocket TLS & NTLS",
        "Custom Payload & SNI",
        "SlowDNS Anti-Block",
        "24/7 Keep-Alive Stability",
      ],
      price: "Free / VIP",
      badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      name: "V2Ray VMess",
      icon: Zap,
      tagline: isId ? "Akselerasi Cloud CDN" : "Cloud CDN Accelerated",
      features: [
        "Websocket & gRPC Port 443",
        "Dynamic Multi-Path Routing",
        "Cloudflare Anycast CDN",
        "Smooth 4K Video Streaming",
      ],
      price: "VIP Access",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      name: "V2Ray VLess Reality",
      icon: Shield,
      tagline: isId ? "Kecepatan Kernel Murni" : "Pure Kernel Speed",
      features: [
        "Latest Reality Protocol",
        "XTLS Vision 0-Hop TLS",
        "No Domain Setup Required",
        "Immune to Deep Inspection",
      ],
      price: "VIP Premium",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      name: "Trojan / Shadowsocks",
      icon: Lock,
      tagline: isId ? "Kamuflase Web & Gaming" : "Stealth & Low Latency",
      features: [
        "Standard HTTPS Web Disguise",
        "Ultra-Low Gaming Latency",
        "Zero UDP Buffer Jitter",
        "Shadowrocket & Sing-box Ready",
      ],
      price: "VIP Premium",
      badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  const trustItems = [
    t("home.trust.items.0"),
    t("home.trust.items.1"),
    t("home.trust.items.2"),
  ];

  const paymentBadges = [
    { label: "QRIS", desc: "Instant Scan" },
    { label: "BCA", desc: "Virtual Account" },
    { label: "Mandiri", desc: "VA & Livin" },
    { label: "GoPay", desc: "E-Wallet" },
    { label: "DANA", desc: "E-Wallet" },
    { label: "ShopeePay", desc: "SPay Later" },
    { label: "PayPal", desc: "International" },
    { label: "USDT", desc: "TRC20 & BEP20" },
  ];

  const faqs = [
    {
      q: t("home.faq.items.0.question"),
      a: t("home.faq.items.0.answer"),
    },
    {
      q: t("home.faq.items.1.question"),
      a: t("home.faq.items.1.answer"),
    },
    {
      q: t("home.faq.items.2.question"),
      a: t("home.faq.items.2.answer"),
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50 py-12 sm:py-16 lg:py-20">
        {/* Precision Ambient Lighting */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 dark:bg-blue-600/15 blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-indigo-600/10 dark:bg-cyan-600/10 blur-3xl pointer-events-none -z-10" />

        <div className="container relative mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Live Operational Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-xs font-bold font-mono text-primary mb-6 shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>{t("home.hero.badge")}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.12] tracking-tight text-foreground mb-5">
              {t("home.hero.titleLine1")}{" "}
              <span className="bg-linear-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {t("home.hero.titleLine2")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-8 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground font-normal">
              {t("home.hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <Button
                size="lg"
                className="h-12 sm:h-13 w-full sm:w-auto rounded-xl bg-primary hover:bg-primary-hover px-8 text-sm sm:text-base font-bold text-white shadow-lg shadow-primary/25 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                asChild
              >
                <Link href="/register">
                  {t("home.hero.ctaPrimary")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-13 w-full sm:w-auto rounded-xl border-border/80 bg-surface hover:bg-surface-subtle px-8 text-sm sm:text-base font-semibold text-foreground hover:border-primary/40 transition-all cursor-pointer"
                asChild
              >
                <Link href="#servers">{t("home.hero.ctaSecondary")}</Link>
              </Button>
            </div>

            {/* Micro value props */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs font-mono text-muted-foreground">
              <span>✨ No Credit Card</span>
              <span>•</span>
              <span>⚡ 5s Setup</span>
              <span>•</span>
              <span className="text-emerald-400">🔒 Zero-Logs</span>
            </div>

            {/* Embedded Stats Bar Card */}
            <div className="mt-10 w-full rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md p-2 shadow-xl shadow-blue-500/5 relative">
              <div className="rounded-xl bg-surface p-4 sm:p-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center p-3 sm:p-4 bg-surface-subtle/50 rounded-xl border border-border/50 hover:border-primary/40 transition-colors group"
                      >
                        <div
                          className={`size-9 sm:size-10 rounded-xl flex items-center justify-center border shadow-xs mb-2 group-hover:scale-110 transition-transform ${stat.bg} ${stat.color}`}
                        >
                          <Icon className="size-4 sm:size-5" />
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-foreground font-mono">
                          {stat.value}
                        </div>
                        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5 text-center leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Floating Status Badge */}
              <div className="absolute -bottom-3.5 right-4 hidden sm:flex items-center gap-2 rounded-xl bg-surface-subtle border border-border/80 px-3.5 py-1.5 text-foreground shadow-lg">
                <Activity className="size-3.5 text-emerald-400 animate-pulse" />
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="text-muted-foreground uppercase text-[10px]">
                    {t("home.floatingBadge.label")}:
                  </span>
                  <span className="font-bold text-emerald-400">
                    {t("home.floatingBadge.value")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section id="features" className="py-14 sm:py-20 bg-surface/30 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold font-mono text-primary mb-3 uppercase tracking-wider">
              <Sparkles className="size-3.5" />
              <span>Core Benefits</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground mb-3 leading-tight tracking-tight">
              {t("home.features.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("home.features.subtitle")}
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featureStyles.map((style, idx) => {
              const Icon = featureIcons[idx];
              const title = t(`home.features.items.${idx}.title`);
              const desc = t(`home.features.items.${idx}.description`);
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl border border-border/70 bg-card p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`mb-4 size-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:rotate-6 ${style.bg} ${style.color}`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-base font-bold mb-2 text-foreground">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Protocols / Services Section */}
      <section
        id="servers"
        className="py-14 sm:py-20 bg-background border-b border-border/50"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold font-mono text-primary mb-3 uppercase tracking-wider">
                <Server className="size-3.5" />
                <span>Multi-Protocol Suite</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground mb-2 leading-tight tracking-tight">
                {t("home.protocols.title")}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t("home.protocols.subtitle")}
              </p>
            </div>
            <Button
              variant="link"
              className="text-primary font-bold p-0 h-auto flex items-center gap-1 group w-fit text-xs sm:text-sm"
              asChild
            >
              <Link href="/subscription">
                <span>{t("home.protocols.exploreAll")}</span>
                <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {protocolItems.map((proto, idx) => {
              const Icon = proto.icon;
              return (
                <Card
                  key={idx}
                  className="rounded-2xl border border-border/70 bg-card hover:border-primary/40 shadow-xs hover:shadow-lg hover:shadow-blue-500/5 transition-all hover:scale-[1.01] group flex flex-col justify-between"
                >
                  <CardContent className="p-5 sm:p-6 flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-3">
                      <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground">
                          {proto.name}
                        </h3>
                        <p className="text-[11px] text-muted-foreground">
                          {proto.tagline}
                        </p>
                      </div>

                      <ul className="space-y-2 pt-1">
                        {proto.features.map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                        {proto.price}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2.5 text-[11px] font-bold text-foreground hover:text-primary"
                        asChild
                      >
                        <Link href="/subscription">
                          <span>Get</span>
                          <ArrowRight className="size-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Trust Badges / Payments Section */}
      <section className="py-14 sm:py-20 bg-surface/40 border-b border-border/50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold font-mono text-emerald-400 mb-3 uppercase tracking-wider">
                  <Shield className="size-3.5" />
                  <span>Security & Integrity</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-3 leading-tight tracking-tight">
                  {t("home.trust.title")}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t("home.trust.subtitle")}
                </p>
              </div>

              <div className="space-y-3.5">
                {trustItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="size-8 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-xs">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border/80 shadow-lg space-y-5">
              <div className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="size-4 text-primary" />
                <span>{t("home.trust.paymentsLabel")}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {paymentBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-surface-subtle/80 rounded-xl border border-border/50 flex flex-col items-center justify-center text-center hover:border-border transition-colors"
                  >
                    <span className="text-xs font-bold text-foreground font-mono">
                      {badge.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {badge.desc}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed pt-2 border-t border-border/50">
                {t("home.trust.paymentsDescription")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section id="faq" className="py-14 sm:py-20 bg-background border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold font-mono text-primary mb-3 uppercase tracking-wider">
              <HelpCircle className="size-3.5" />
              <span>FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-2 leading-tight tracking-tight">
              {t("home.faq.title")}
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm font-normal">
              {t("home.faq.subtitle")}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/70 bg-card p-5 hover:border-border transition-all group"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                      <HelpCircle className="size-4 text-primary shrink-0" />
                      <span>{faq.q}</span>
                    </h3>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pt-3 border-t border-border/50 pl-6">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-4xl">
        <div className="rounded-3xl bg-linear-to-br from-blue-600 via-indigo-600 to-blue-700 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-blue-500/15">
          <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-2xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-64 w-64 bg-black/25 rounded-full blur-2xl -ml-32 -mb-32 pointer-events-none" />

          <div className="relative z-10 space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {t("home.cta.title")}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-blue-100 font-normal leading-relaxed opacity-95">
              {t("home.cta.subtitle")}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Button
                size="lg"
                className="h-12 w-full sm:w-auto px-8 rounded-xl bg-white text-blue-700 hover:bg-slate-100 font-bold text-sm shadow-lg active:scale-95 transition-all cursor-pointer"
                asChild
              >
                <Link href="/register">{t("home.cta.primaryButton")}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full sm:w-auto px-8 rounded-xl text-white border-white/30 hover:bg-white/10 font-bold text-sm bg-transparent active:scale-95 transition-all cursor-pointer"
                asChild
              >
                <Link href="/login">{t("home.cta.secondaryButton")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
