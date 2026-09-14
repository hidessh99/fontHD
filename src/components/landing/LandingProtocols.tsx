"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Zap,
  Shield,
  Lock,
  Globe,
  Cpu,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";

type CategoryFilter = "all" | "antidpi" | "gaming" | "cdn";

export function LandingProtocols() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const protocols = [
    {
      key: "vless",
      category: "antidpi",
      name: t("landing.protocols.vless.name"),
      tagline: t("landing.protocols.vless.tagline"),
      icon: Shield,
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      tier: "TOP PERFORMANCE",
      port: 443,
      cipher: "ChaCha20-Poly1305",
      metrics: { evasion: 99, speed: 98, ping: 95 },
      features: [
        t("landing.protocols.vless.f1"),
        t("landing.protocols.vless.f2"),
        t("landing.protocols.vless.f3"),
        t("landing.protocols.vless.f4"),
      ],
    },
    {
      key: "wireguard",
      category: "gaming",
      name: t("landing.protocols.wireguard.name"),
      tagline: t("landing.protocols.wireguard.tagline"),
      icon: Cpu,
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      tier: "KERNEL SPEED",
      port: 51820,
      cipher: "Curve25519 + ChaCha20",
      metrics: { evasion: 85, speed: 99, ping: 99 },
      features: [
        t("landing.protocols.wireguard.f1"),
        t("landing.protocols.wireguard.f2"),
        t("landing.protocols.wireguard.f3"),
        t("landing.protocols.wireguard.f4"),
      ],
    },
    {
      key: "trojan",
      category: "antidpi",
      name: t("landing.protocols.trojan.name"),
      tagline: t("landing.protocols.trojan.tagline"),
      icon: Lock,
      iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      tier: "ANTI-CENSOR",
      port: 443,
      cipher: "AES-256-GCM / SHA256",
      metrics: { evasion: 98, speed: 92, ping: 90 },
      features: [
        t("landing.protocols.trojan.f1"),
        t("landing.protocols.trojan.f2"),
        t("landing.protocols.trojan.f3"),
        t("landing.protocols.trojan.f4"),
      ],
    },
    {
      key: "vmess",
      category: "cdn",
      name: t("landing.protocols.vmess.name"),
      tagline: t("landing.protocols.vmess.tagline"),
      icon: Zap,
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      tier: "CDN MULTI-PATH",
      port: 80,
      cipher: "VMess AEAD Chacha20",
      metrics: { evasion: 94, speed: 90, ping: 88 },
      features: [
        t("landing.protocols.vmess.f1"),
        t("landing.protocols.vmess.f2"),
        t("landing.protocols.vmess.f3"),
        t("landing.protocols.vmess.f4"),
      ],
    },
    {
      key: "shadowsocks",
      category: "gaming",
      name: t("landing.protocols.shadowsocks.name"),
      tagline: t("landing.protocols.shadowsocks.tagline"),
      icon: Globe,
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      tier: "LOW JITTER",
      port: 8388,
      cipher: "2022-blake3-aes-128-gcm",
      metrics: { evasion: 88, speed: 96, ping: 98 },
      features: [
        t("landing.protocols.shadowsocks.f1"),
        t("landing.protocols.shadowsocks.f2"),
        t("landing.protocols.shadowsocks.f3"),
        t("landing.protocols.shadowsocks.f4"),
      ],
    },
    {
      key: "ssh",
      category: "cdn",
      name: t("landing.protocols.ssh.name"),
      tagline: t("landing.protocols.ssh.tagline"),
      icon: Terminal,
      iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      tier: "CLASSIC TUNNEL",
      port: 22,
      cipher: "AES-128-CTR + Dropbear",
      metrics: { evasion: 86, speed: 85, ping: 86 },
      features: [
        t("landing.protocols.ssh.f1"),
        t("landing.protocols.ssh.f2"),
        t("landing.protocols.ssh.f3"),
        t("landing.protocols.ssh.f4"),
      ],
    },
  ];

  const filteredProtocols =
    activeCategory === "all"
      ? protocols
      : protocols.filter((p) => p.category === activeCategory);

  return (
    <section
      id="protocols"
      className="py-16 lg:py-24 bg-surface/40 border-b border-border/50 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-bold text-primary mb-3.5 uppercase tracking-wider font-mono">
              <Zap className="h-3.5 w-3.5" /> {t("landing.protocols.badge")}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
              {t("landing.protocols.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-3 font-normal">
              {t("landing.protocols.subtitle")}
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-subtle border border-border/60 self-start lg:self-end overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({protocols.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("antidpi")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === "antidpi"
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Anti-DPI & Firewall
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("gaming")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === "gaming"
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Gaming & Low Ping
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("cdn")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === "cdn"
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              CDN & Multi-Path
            </button>
          </div>
        </div>

        {/* Protocol Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProtocols.map((proto) => {
            const Icon = proto.icon;
            return (
              <Card
                key={proto.key}
                className="rounded-2xl border border-border/80 bg-surface hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden group"
              >
                <CardContent className="p-6 lg:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Top Row: Icon + Tier Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div
                        className={`h-11 w-11 rounded-xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform duration-300 ${proto.iconBg}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="font-mono text-[10px] font-bold px-2 py-0.5"
                      >
                        {proto.tier}
                      </Badge>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                      {proto.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5 mb-4">
                      {proto.tagline}
                    </p>

                    {/* Technical Spec Strip */}
                    <div className="grid grid-cols-2 gap-2 mb-5 p-2.5 rounded-xl bg-surface-subtle/70 border border-border/40 font-mono text-[11px]">
                      <div>
                        <span className="text-[10px] text-muted-foreground block uppercase">
                          Port / Proto
                        </span>
                        <span className="text-foreground font-bold">
                          {proto.port}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground block uppercase">
                          Cipher
                        </span>
                        <span className="text-foreground font-medium truncate block">
                          {proto.cipher.split(" ")[0]}
                        </span>
                      </div>
                    </div>

                    {/* Capability Score Bars */}
                    <div className="space-y-1.5 mb-5 text-[11px] font-mono">
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>Anti-DPI Evasion</span>
                        <span className="text-emerald-400 font-bold">
                          {proto.metrics.evasion}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-surface-subtle overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${proto.metrics.evasion}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-muted-foreground pt-1">
                        <span>Gaming Latency</span>
                        <span className="text-cyan-400 font-bold">
                          {proto.metrics.ping}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-surface-subtle overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 rounded-full"
                          style={{ width: `${proto.metrics.ping}%` }}
                        />
                      </div>
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-2 mb-6">
                      {proto.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-foreground/80 font-medium"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action */}
                  <div className="pt-4 border-t border-border/50 mt-auto">
                    <Button
                      className="w-full rounded-xl bg-primary hover:bg-primary-hover text-white font-bold h-10 text-xs shadow-md shadow-primary/15 group-hover:shadow-primary/25 transition-all cursor-pointer"
                      asChild
                    >
                      <Link href="/register">
                        <span>Deploy {proto.name.split(" ")[0]} Node</span>
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
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
  );
}
