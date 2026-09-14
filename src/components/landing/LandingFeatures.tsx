"use client";

import React from "react";
import {
  Globe,
  Cpu,
  Lock,
  ShieldCheck,
  Layers,
  Server,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";

export function LandingFeatures() {
  const { t } = useI18n();

  return (
    <section id="features" className="py-16 lg:py-24 bg-surface/30 border-b border-border/50 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-bold text-primary mb-3.5 uppercase tracking-wider font-mono">
            <Layers className="h-3.5 w-3.5" /> {t("landing.features.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            {t("landing.features.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 font-normal">
            {t("landing.features.subtitle")}
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: RAM-Only Ephemeral Architecture (Large Card - Col Span 2 on desktop) */}
          <div className="lg:col-span-2 rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Lock className="size-5" />
                </div>
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] text-emerald-400 border-emerald-500/30 bg-emerald-500/5 uppercase"
                >
                  Zero Persistent Storage
                </Badge>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                100% RAM-Only Ephemeral Infrastructure
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-normal max-w-xl mb-6">
                Unlike commercial VPNs that store access logs on SSD or NVMe arrays,
                GoVPN edge clusters boot directly into volatile memory (tmpfs). Every
                session payload, DNS query, and traffic packet vanishes permanently
                upon power cycle or kernel refresh.
              </p>
            </div>

            {/* Architecture Visual Diagram */}
            <div className="rounded-xl bg-black/40 border border-border/60 p-4 font-mono text-xs text-slate-300">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Server className="size-3 text-primary" />
                <span>Volatile Memory Pipeline</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-surface-subtle/80 border border-border/40 text-center">
                  <div className="text-[10px] text-muted-foreground">Inbound</div>
                  <div className="text-xs font-bold text-foreground mt-0.5">TLS 1.3 Handshake</div>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-subtle/80 border border-border/40 text-center">
                  <div className="text-[10px] text-muted-foreground">Processing</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">RAM-Only Buffer</div>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-subtle/80 border border-border/40 text-center">
                  <div className="text-[10px] text-muted-foreground">Storage</div>
                  <div className="text-xs font-bold text-rose-400 mt-0.5">0 Bytes Disk Write</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Anycast Global BGP Routing */}
          <div className="rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Globe className="size-5" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">Tier-1 Transit</span>
              </div>
              <h3 className="text-xl font-black text-foreground mb-2 group-hover:text-primary transition-colors">
                Anycast Global BGP Routing
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal mb-5">
                Direct peering with Cloudflare, Telia, and NTT. Your packet routes
                through the shortest fiber path with zero intermediate ISP hops.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs pt-3 border-t border-border/40">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">🇸🇬 Singapore SG-1</span>
                <span className="text-emerald-400 font-bold">12ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">🇯🇵 Tokyo JP-1</span>
                <span className="text-cyan-400 font-bold">34ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">🇩🇪 Frankfurt DE-1</span>
                <span className="text-amber-400 font-bold">142ms</span>
              </div>
            </div>
          </div>

          {/* Card 3: Kernel eBPF & Hardware Crypto */}
          <div className="rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex size-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Cpu className="size-5" />
                </div>
                <span className="font-mono text-[10px] text-purple-400">Zero-Copy UDP</span>
              </div>
              <h3 className="text-xl font-black text-foreground mb-2 group-hover:text-primary transition-colors">
                Kernel eBPF & Hardware Crypto
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal mb-5">
                Hardware-accelerated AES-NI and ChaCha20-Poly1305 instructions.
                Bypasses user-space context switches for competitive zero-jitter gaming.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-surface-subtle border border-border/40 font-mono text-[11px] text-muted-foreground">
              <span className="text-foreground font-bold">10 Gbps</span> Line-rate processing with &lt; 0.1% CPU context overhead.
            </div>
          </div>

          {/* Card 4: Heuristic Auto-Failover (Large Card - Col Span 2 on desktop) */}
          <div className="lg:col-span-2 rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex size-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Activity className="size-5" />
                </div>
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] text-cyan-400 border-cyan-500/30 bg-cyan-500/5"
                >
                  &lt; 300ms FAILOVER
                </Badge>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                Heuristic Auto-Failover & Undersea Cable Resilience
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-normal max-w-xl mb-6">
                Active telemetry probes monitor fiber link integrity every second.
                If packet drop or submarine cable congestion is detected, connections
                reroute instantaneously without breaking active TCP/UDP tunnel states.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5 text-foreground">
                <ShieldCheck className="size-4 text-emerald-400" />
                Active Session Persistence
              </span>
              <span>•</span>
              <span>Multi-Datacenter Hot Standby</span>
              <span>•</span>
              <span>Automated BGP Route Shift</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
