"use client";

import React from "react";
import {
  Check,
  X,
  Zap,
  Smartphone,
  CreditCard,
  Headphones,
  Laptop,
  CheckCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function LandingWhyUs() {
  const { t } = useI18n();

  const comparisonRows = [
    {
      feature: "Logging & Privacy Guarantee",
      legacy: "Claims 'no-logs', but writes connection traces to persistent SSD/NVMe disks",
      govpn: "100% RAM-Only Diskless OS — All volatile buffers wiped instantly on power cycle",
      isGovpnWin: true,
    },
    {
      feature: "Tunneling Protocol Suite",
      legacy: "20-year-old OpenVPN & IKEv2 (easily fingerprinted and throttled by ISP DPI)",
      govpn: "VLess XTLS Reality, WireGuard Kernel, Trojan-Go, VMess AEAD, Shadowsocks 2022",
      isGovpnWin: true,
    },
    {
      feature: "Firewall & Anti-Censorship",
      legacy: "Frequent connection drops, blocked server IPs, constant reCAPTCHA triggers",
      govpn: "Real TLS 1.3 Camouflage & SNI Masking — Invisible to state-level DPI filters",
      isGovpnWin: true,
    },
    {
      feature: "Bandwidth & Port Uplink",
      legacy: "Shared 1 Gbps pipes with hidden Fair Usage Policies (FUP) during peak hours",
      govpn: "Dedicated 10 Gbps Anycast Uplinks with unthrottled line-rate throughput",
      isGovpnWin: true,
    },
    {
      feature: "Gaming Latency & Jitter",
      legacy: "60ms - 150ms ping with packet jitter caused by user-space context switches",
      govpn: "Sub-15ms Singapore Anycast routing powered by zero-copy Linux eBPF",
      isGovpnWin: true,
    },
    {
      feature: "Reseller & Automation API",
      legacy: "Consumer-only closed apps with no programmable API access",
      govpn: "Full REST API, webhooks, sub-tenant management, and automated account minting",
      isGovpnWin: true,
    },
  ];

  return (
    <section
      id="why-us"
      className="py-16 lg:py-24 bg-surface/50 border-b border-border/50 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-400 mb-3.5 uppercase tracking-wider font-mono">
            <CheckCircle className="h-3.5 w-3.5" /> {t("landing.whyUs.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            {t("landing.whyUs.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 font-normal leading-relaxed">
            {t("landing.whyUs.subtitle")}
          </p>
        </div>

        {/* Enterprise Comparison Matrix */}
        <div className="rounded-2xl border border-border/80 bg-surface shadow-xl overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-160">
              <thead>
                <tr className="border-b border-border/60 bg-surface-subtle/80 text-xs font-mono font-bold uppercase tracking-wider">
                  <th className="p-4 sm:p-5 text-muted-foreground w-1/4">
                    Architectural Dimension
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground w-3/8">
                    Traditional Commercial VPN
                  </th>
                  <th className="p-4 sm:p-5 text-blue-700 dark:text-blue-400 w-3/8 bg-blue-500/5 border-l border-border/40">
                    <div className="flex items-center gap-2">
                      <Zap className="size-4 text-blue-700 dark:text-blue-400" />
                      <span>GoVPN Cloud Infrastructure</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-surface-subtle/40 transition-colors"
                  >
                    <td className="p-4 sm:p-5 font-bold text-foreground">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <X className="size-4 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
                        <span>{row.legacy}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-foreground bg-primary/2 border-l border-border/40 font-medium">
                      <div className="flex items-start gap-2">
                        <Check className="size-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.govpn}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Ecosystem Support Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface border border-border/60 flex items-center gap-3">
            <Smartphone className="size-5 text-blue-700 dark:text-blue-400" />
            <div>
              <div className="text-xs font-bold text-foreground">Android & iOS</div>
              <div className="text-[11px] text-muted-foreground">v2rayNG, Sing-box, Shadowrocket</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border/60 flex items-center gap-3">
            <Laptop className="size-5 text-blue-700 dark:text-blue-400" />
            <div>
              <div className="text-xs font-bold text-foreground">Windows & macOS</div>
              <div className="text-[11px] text-muted-foreground">v2rayN, Nekoray, WireGuard CLI</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border/60 flex items-center gap-3">
            <CreditCard className="size-5 text-blue-700 dark:text-blue-400" />
            <div>
              <div className="text-xs font-bold text-foreground">Instant Settlement</div>
              <div className="text-[11px] text-muted-foreground">QRIS, Virtual Accounts, USDT</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border/60 flex items-center gap-3">
            <Headphones className="size-5 text-blue-700 dark:text-blue-400" />
            <div>
              <div className="text-xs font-bold text-foreground">24/7 Priority SLA</div>
              <div className="text-[11px] text-muted-foreground">Dedicated Telegram & Helpdesk</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
