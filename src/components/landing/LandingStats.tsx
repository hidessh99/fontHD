"use client";

import React from "react";
import { Users, Server, Activity, ShieldCheck, Cpu } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function LandingStats() {
  const { t } = useI18n();

  const stats = [
    {
      label: t("landing.stats.usersLabel"),
      value: "150k+",
      desc: t("landing.stats.usersDesc"),
      icon: Users,
    },
    {
      label: t("landing.stats.serversLabel"),
      value: "250+",
      desc: t("landing.stats.serversDesc"),
      icon: Server,
    },
    {
      label: t("landing.stats.bandwidthLabel"),
      value: "10 Gbps",
      desc: t("landing.stats.bandwidthDesc"),
      icon: Activity,
    },
    {
      label: t("landing.stats.uptimeLabel"),
      value: "99.99%",
      desc: t("landing.stats.uptimeDesc"),
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="relative z-20 container mx-auto px-4 max-w-5xl -mt-6 lg:-mt-10 mb-16 lg:mb-20">
      <div className="w-full rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-2.5 shadow-2xl shadow-primary/5 relative">
        <div className="rounded-2xl bg-muted/40 dark:bg-card/40 p-5 lg:p-7 overflow-hidden border border-border/40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center p-4 lg:p-6 bg-card dark:bg-card/70 rounded-2xl border border-border/50 hover:border-primary/40 transition-all duration-300 group hover:-translate-y-0.5 shadow-sm"
                >
                  <div className="h-11 w-11 lg:h-12 lg:w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm mb-3.5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-foreground/80 uppercase tracking-wider mt-1 text-center font-mono">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground text-center mt-0.5 font-medium hidden sm:block">
                    {stat.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Live Telemetry Badge */}
        <div className="absolute -bottom-5 -right-3 sm:-right-5 hidden md:flex items-center gap-3.5 rounded-2xl bg-slate-900 dark:bg-zinc-900 border border-slate-700/60 dark:border-zinc-800 px-5 py-3.5 text-white shadow-2xl animate-in fade-in duration-500">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              {t("landing.stats.liveTelemetry")}
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black text-emerald-400 font-mono">
                {t("landing.stats.pingOptimal")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
