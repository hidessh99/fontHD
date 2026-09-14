"use client";

import React from "react";
import { Users, Server, Activity, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function LandingStats() {
  const { t } = useI18n();

  const metrics = [
    {
      label: t("landing.stats.usersLabel"),
      value: "150k+",
      subtext: "Concurrent Active Tunnels",
      icon: Users,
      badge: "ACTIVE",
      badgeColor: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: t("landing.stats.serversLabel"),
      value: "250+",
      subtext: "Tier-1 Datacenter Nodes",
      icon: Server,
      badge: "42 REGIONS",
      badgeColor: "text-blue-700 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      label: t("landing.stats.bandwidthLabel"),
      value: "10 Gbps",
      subtext: "Anycast Multi-Homed BGP",
      icon: Activity,
      badge: "UNLIMITED",
      badgeColor: "text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      label: t("landing.stats.uptimeLabel"),
      value: "99.99%",
      subtext: "Verified High-Availability SLA",
      icon: ShieldCheck,
      badge: "0 DISK LOGS",
      badgeColor: "text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="relative z-10 border-b border-border/50 bg-surface/60 backdrop-blur-md py-6 lg:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-border/40">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className={`flex flex-col justify-center ${
                  idx > 1 ? "pt-4 lg:pt-0" : ""
                } ${idx > 0 ? "lg:pl-8" : ""}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                    <Icon className="size-3.5 text-blue-700 dark:text-blue-400" />
                    <span>{m.label}</span>
                  </div>
                  <span
                    className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${m.badgeColor}`}
                  >
                    {m.badge}
                  </span>
                </div>

                <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                  {m.value}
                </div>

                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5 font-medium">
                  <span className="size-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>{m.subtext}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
