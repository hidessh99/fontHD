"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { CopyButton } from "@/components/shared/CopyButton";
import {
  Building2,
  ShieldCheck,
  Server,
  Zap,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Activity,
  Globe2,
  Cpu,
  Layers,
  ExternalLink,
} from "lucide-react";

export function AboutView() {
  const { t, locale } = useI18n();
  const isId = locale === "id";

  const regions = [
    { city: "Singapore (SIN)", ping: "8ms", flag: "🇸🇬", tier: "Tier-1 Equinix SG1" },
    { city: "Tokyo (NRT)", ping: "58ms", flag: "🇯🇵", tier: "Tier-1 NTT / KDDI" },
    { city: "Frankfurt (FRA)", ping: "142ms", flag: "🇩🇪", tier: "Tier-1 Telia / DE-CIX" },
    { city: "London (LHR)", ping: "155ms", flag: "🇬🇧", tier: "Tier-1 LINX Backbone" },
    { city: "Los Angeles (LAX)", ping: "168ms", flag: "🇺🇸", tier: "Tier-1 HE / Anycast" },
    { city: "Jakarta (CGK)", ping: "12ms", flag: "🇮🇩", tier: "OpenIXP / IIX Direct" },
    { city: "Hong Kong (HKG)", ping: "38ms", flag: "🇭🇰", tier: "HKIX Direct Peering" },
    { city: "Sydney (SYD)", ping: "92ms", flag: "🇦🇺", tier: "Megaport Anycast" },
  ];

  return (
    <div className="space-y-16 max-w-5xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono bg-primary/10 border border-primary/20 text-primary">
          <Building2 className="size-3.5" />
          <span>{t("about.badge")}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
          {t("about.title")}
        </h1>
        <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
          {t("about.subtitle")}
        </p>
      </div>

      {/* Real Technical Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            label: t("about.statsUptime"),
            value: "99.99%",
            sub: isId ? "SLA Tingkat Inti" : "Core SLA Guarantee",
            icon: Activity,
            color: "text-emerald-400",
          },
          {
            label: t("about.statsLatency"),
            value: "< 12ms",
            sub: isId ? "Optimasi BGP SG" : "Optimized BGP Routing",
            icon: Zap,
            color: "text-primary",
          },
          {
            label: t("about.statsNodes"),
            value: "250+",
            sub: isId ? "42 Wilayah Global" : "Across 42 Global Regions",
            icon: Globe2,
            color: "text-blue-400",
          },
          {
            label: t("about.statsTunnels"),
            value: "150,000+",
            sub: isId ? "Zero-Logs Terjamin" : "Zero-Logs Enforced",
            icon: ShieldCheck,
            color: "text-amber-400",
          },
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm text-center space-y-2 shadow-sm hover:border-border transition-all"
            >
              <div className="size-10 rounded-xl bg-surface-subtle border border-border/60 flex items-center justify-center mx-auto mb-2">
                <Icon className={`size-5 ${s.color}`} />
              </div>
              <div className="text-2xl sm:text-4xl font-black text-foreground font-mono tracking-tight">
                {s.value}
              </div>
              <div className="text-xs font-semibold text-foreground">
                {s.label}
              </div>
              <div className="text-[11px] text-muted-foreground font-mono">
                {s.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/70 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider font-mono">
              <Sparkles className="size-4" />
              <span>{t("about.visionBadge")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              {t("about.visionTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("about.visionDesc")}
            </p>
          </div>
          <div className="pt-4 border-t border-border/50 text-xs font-mono text-muted-foreground">
            {isId ? "Prinsip: Keamanan, Transparansi, & Kecepatan Mutlak" : "Pillars: Security, Transparency, & Low Latency"}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/70 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
              <CheckCircle2 className="size-4" />
              <span>{t("about.missionBadge")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              {t("about.missionTitle")}
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>{t("about.mission1")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>{t("about.mission2")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>{t("about.mission3")}</span>
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-border/50 text-xs font-mono text-emerald-400">
            {isId ? "Kepatuhan Hukum: UU PDP No. 27/2022 & GDPR" : "Compliance: Indonesian UU PDP & GDPR Ready"}
          </div>
        </div>
      </div>

      {/* Engineering Pillars Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            {t("about.techArchitectureTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {t("about.techArchitectureSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-3 hover:border-primary/40 transition-all">
            <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Globe2 className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">
              {t("about.tech1Title")}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("about.tech1Desc")}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-3 hover:border-primary/40 transition-all">
            <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Layers className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">
              {t("about.tech2Title")}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("about.tech2Desc")}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-3 hover:border-primary/40 transition-all">
            <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Server className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">
              {t("about.tech3Title")}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("about.tech3Desc")}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-3 hover:border-primary/40 transition-all">
            <div className="size-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Cpu className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">
              {t("about.tech4Title")}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("about.tech4Desc")}
            </p>
          </div>
        </div>
      </div>

      {/* Global Regional Edge Nodes Preview */}
      <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {isId ? "Jaringan Edge & Peering Global" : "Global Edge Network & Direct Peering"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isId
                ? "Node terowongan aktif di pusat data Tier-3/4 dengan uplink minimum 10 Gbps redundan."
                : "Active tunneling nodes located in Tier-3/4 carrier facilities with redundant 10 Gbps uplinks."}
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>42 PoPs Online & Routing Healthy</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {regions.map((r, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-border/60 bg-surface-subtle space-y-1 hover:border-border transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-bold text-foreground">
                <span className="flex items-center gap-1.5">
                  <span>{r.flag}</span>
                  <span className="truncate">{r.city}</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {r.ping}
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono truncate">
                {r.tier}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Office Headquarters & Engineering Lab */}
      <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Building2 className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                {t("about.officeTitle")}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t("about.officeSubtitle")}
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-muted-foreground">
            Semarang Central NOC Desk
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground">
          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Building2 className="size-3.5 text-primary" />
              <span>Hide Group HQ</span>
            </div>
            <div className="font-mono text-foreground font-medium">
              PT. Hide Digital Security
            </div>
            <div className="text-[11px] text-muted-foreground">
              Autonomous System Management
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Mail className="size-3.5 text-primary" />
              <span>{t("about.officeEmailLabel")}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="mailto:support@hidessh.com"
                className="text-primary font-mono hover:underline"
              >
                support@hidessh.com
              </a>
              <CopyButton text="support@hidessh.com" size="sm" className="h-6 px-2 text-[10px]" />
            </div>
            <div className="text-[11px] text-muted-foreground">
              Alt: dmaskurniawan56@gmail.com
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Phone className="size-3.5 text-primary" />
              <span>{t("about.officePhoneLabel")}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-foreground">
              <span>0877-1113-01818</span>
              <CopyButton text="0877111301818" size="sm" className="h-6 px-2 text-[10px]" />
            </div>
            <div className="text-[11px] text-muted-foreground">
              24/7 WhatsApp Engineering Desk
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2">
            <MapPin className="size-4 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>
              Jl. Kampung Baris No.391, Karangturi, Kec. Semarang Tim., Kota Semarang, Jawa Tengah 50124
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <CopyButton
              text="Jl. Kampung Baris No.391, Karangturi, Kec. Semarang Tim., Kota Semarang, Jawa Tengah 50124"
              label={isId ? "Salin Alamat" : "Copy Address"}
              size="sm"
              className="h-7 text-xs"
            />
            <a
              href="https://maps.google.com/?q=Jl.+Kampung+Baris+No.391,+Karangturi,+Kec.+Semarang+Tim.,+Kota+Semarang,+Jawa+Tengah+50124"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
            >
              <span>Google Maps</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-8 sm:p-12 rounded-3xl border border-primary/30 bg-linear-to-br from-card via-card to-primary/10 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
            {t("about.ctaTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t("about.ctaSubtitle")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/25"
            asChild
          >
            <Link href="/subscription">
              <span>{t("about.ctaButton")}</span>
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-xl font-bold border-border/80 hover:bg-surface-subtle"
            asChild
          >
            <Link href="/contact">
              <span>{t("about.ctaContact")}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
