// ==============================================================================
// GoVPN System Health Banner Component
// Part of Pola C: components/shared/SystemHealthBanner.tsx
// 100% Coinbase Institutional Design System (Service Readiness Probes)
// ==============================================================================

"use client";

import React from "react";
import { SystemHealthResponse } from "../../types/monitor.types";
import {
  AlertTriangle,
  Database,
  Server,
  Cpu,
  ShieldCheck,
} from "lucide-react";

interface SystemHealthBannerProps {
  health?: SystemHealthResponse | null;
  loading?: boolean;
}

export function SystemHealthBanner({
  health,
  loading,
}: SystemHealthBannerProps) {
  if (loading || !health) return null;

  const isAllHealthy =
    health.status === "ok" &&
    Object.values(health.services).every((val) => Boolean(val));

  return (
    <div
      className={`w-full rounded-2xl p-4 border transition-all shadow-sm ${
        isAllHealthy
          ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-300"
          : "border-amber-500/30 bg-amber-500/10 text-amber-300"
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {isAllHealthy ? (
            <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="h-4 w-4" />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <AlertTriangle className="h-4 w-4" />
            </div>
          )}
          <div>
            <h4 className="text-xs font-bold text-foreground">
              {isAllHealthy
                ? "Seluruh Layanan Inti Operasional & Sehat"
                : "Peringatan Degradasi Sebagian Layanan Inti"}
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Sistem backend v2 diverifikasi melalui Kubernetes readiness probe
            </p>
          </div>
        </div>

        {/* Micro-indicators */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-card/60 border border-border">
            <Database className="h-3 w-3 text-primary" />
            <span className="text-muted-foreground font-sans">Database:</span>
            <span
              className={
                health.services.database ? "text-emerald-400" : "text-rose-400"
              }
            >
              {health.services.database ? "OK" : "ERR"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-card/60 border border-border">
            <Server className="h-3 w-3 text-rose-400" />
            <span className="text-muted-foreground font-sans">Redis:</span>
            <span
              className={
                health.services.redis ? "text-emerald-400" : "text-rose-400"
              }
            >
              {health.services.redis ? "OK" : "ERR"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-card/60 border border-border">
            <Cpu className="h-3 w-3 text-blue-400" />
            <span className="text-muted-foreground font-sans">K8s:</span>
            <span
              className={
                health.services.kubernetes
                  ? "text-emerald-400"
                  : "text-rose-400"
              }
            >
              {health.services.kubernetes ? "OK" : "ERR"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-card/60 border border-border">
            <ShieldCheck className="h-3 w-3 text-amber-400" />
            <span className="text-muted-foreground font-sans">VPN Engine:</span>
            <span
              className={
                health.services.vpn_engine
                  ? "text-emerald-400"
                  : "text-rose-400"
              }
            >
              {health.services.vpn_engine ? "OK" : "ERR"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
