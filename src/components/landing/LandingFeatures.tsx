"use client";

import React from "react";
import {
  Globe,
  Cpu,
  Lock,
  Zap,
  TrendingUp,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function LandingFeatures() {
  const { t } = useI18n();

  const features = [
    {
      title: t("landing.features.f1Title"),
      desc: t("landing.features.f1Desc"),
      icon: Globe,
      color: "text-blue-500",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      title: t("landing.features.f2Title"),
      desc: t("landing.features.f2Desc"),
      icon: Cpu,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: t("landing.features.f3Title"),
      desc: t("landing.features.f3Desc"),
      icon: Lock,
      color: "text-amber-500",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: t("landing.features.f4Title"),
      desc: t("landing.features.f4Desc"),
      icon: Zap,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: t("landing.features.f5Title"),
      desc: t("landing.features.f5Desc"),
      icon: TrendingUp,
      color: "text-rose-500",
      bg: "bg-rose-500/10 border-rose-500/20",
    },
    {
      title: t("landing.features.f6Title"),
      desc: t("landing.features.f6Desc"),
      icon: ShieldCheck,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-3.5 uppercase tracking-wider font-mono">
            <Layers className="h-3.5 w-3.5" /> {t("landing.features.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            {t("landing.features.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 font-normal">
            {t("landing.features.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-border/80 bg-card p-7 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`mb-5 flex h-13 w-13 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-110 ${feat.bg} ${feat.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
