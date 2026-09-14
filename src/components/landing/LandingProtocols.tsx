"use client";

import React from "react";
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
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";

export function LandingProtocols() {
  const { t } = useI18n();

  const protocols = [
    {
      key: "ssh",
      name: t("landing.protocols.ssh.name"),
      tagline: t("landing.protocols.ssh.tagline"),
      icon: Terminal,
      iconBg: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      features: [
        t("landing.protocols.ssh.f1"),
        t("landing.protocols.ssh.f2"),
        t("landing.protocols.ssh.f3"),
        t("landing.protocols.ssh.f4"),
      ],
      tier: t("landing.protocols.ssh.tier"),
    },
    {
      key: "vmess",
      name: t("landing.protocols.vmess.name"),
      tagline: t("landing.protocols.vmess.tagline"),
      icon: Zap,
      iconBg: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      features: [
        t("landing.protocols.vmess.f1"),
        t("landing.protocols.vmess.f2"),
        t("landing.protocols.vmess.f3"),
        t("landing.protocols.vmess.f4"),
      ],
      tier: t("landing.protocols.vmess.tier"),
    },
    {
      key: "vless",
      name: t("landing.protocols.vless.name"),
      tagline: t("landing.protocols.vless.tagline"),
      icon: Shield,
      iconBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      features: [
        t("landing.protocols.vless.f1"),
        t("landing.protocols.vless.f2"),
        t("landing.protocols.vless.f3"),
        t("landing.protocols.vless.f4"),
      ],
      tier: t("landing.protocols.vless.tier"),
    },
    {
      key: "trojan",
      name: t("landing.protocols.trojan.name"),
      tagline: t("landing.protocols.trojan.tagline"),
      icon: Lock,
      iconBg: "bg-rose-500/10 text-rose-500 border-rose-500/20",
      features: [
        t("landing.protocols.trojan.f1"),
        t("landing.protocols.trojan.f2"),
        t("landing.protocols.trojan.f3"),
        t("landing.protocols.trojan.f4"),
      ],
      tier: t("landing.protocols.trojan.tier"),
    },
    {
      key: "shadowsocks",
      name: t("landing.protocols.shadowsocks.name"),
      tagline: t("landing.protocols.shadowsocks.tagline"),
      icon: Globe,
      iconBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      features: [
        t("landing.protocols.shadowsocks.f1"),
        t("landing.protocols.shadowsocks.f2"),
        t("landing.protocols.shadowsocks.f3"),
        t("landing.protocols.shadowsocks.f4"),
      ],
      tier: t("landing.protocols.shadowsocks.tier"),
    },
    {
      key: "wireguard",
      name: t("landing.protocols.wireguard.name"),
      tagline: t("landing.protocols.wireguard.tagline"),
      icon: Cpu,
      iconBg: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      features: [
        t("landing.protocols.wireguard.f1"),
        t("landing.protocols.wireguard.f2"),
        t("landing.protocols.wireguard.f3"),
        t("landing.protocols.wireguard.f4"),
      ],
      tier: t("landing.protocols.wireguard.tier"),
    },
  ];

  return (
    <section
      id="protocols"
      className="py-16 lg:py-24 bg-card/40 border-y border-border/50 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-3 uppercase tracking-wider font-mono">
              <Zap className="h-3.5 w-3.5" /> {t("landing.protocols.badge")}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
              {t("landing.protocols.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-3 font-normal">
              {t("landing.protocols.subtitle")}
            </p>
          </div>

          <Button
            variant="outline"
            className="rounded-xl border-border bg-card hover:bg-accent text-sm font-bold flex items-center gap-2 w-fit"
            asChild
          >
            <Link href="/register">
              {t("landing.protocols.exploreAll")}
              <ChevronRight className="h-4 w-4 text-primary" />
            </Link>
          </Button>
        </div>

        {/* Protocol Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {protocols.map((proto) => {
            const Icon = proto.icon;
            return (
              <Card
                key={proto.key}
                className="rounded-3xl border border-border/80 bg-card hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden group relative"
              >
                <CardContent className="p-6 lg:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Top Row: Icon + Tier Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div
                        className={`h-12 w-12 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform duration-300 ${proto.iconBg}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="font-mono text-[11px] font-bold px-2.5 py-0.5"
                      >
                        {proto.tier}
                      </Badge>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                      {proto.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5 mb-5">
                      {proto.tagline}
                    </p>

                    {/* Feature List */}
                    <ul className="space-y-2.5 mb-6">
                      {proto.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-foreground/80 font-medium"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action */}
                  <div className="pt-4 border-t border-border/50 mt-auto">
                    <Button
                      className="w-full rounded-xl bg-primary hover:bg-primary-hover text-white font-bold h-11 text-xs shadow-md shadow-primary/15 group-hover:shadow-primary/25 transition-all"
                      asChild
                    >
                      <Link href="/register">
                        {t("landing.protocols.createAccount", {
                          name: proto.name.split(" ")[0],
                        })}
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
