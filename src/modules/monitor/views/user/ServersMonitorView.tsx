// ==============================================================================
// GoVPN Servers Telemetry & Monitor View Component
// Part of Pola C: views/user/ServersMonitorView.tsx
// 100% Coinbase Institutional Design System (Vitals, Health Probes & Adaptive Polling)
// ==============================================================================

"use client";

import React from "react";
import { useServerTelemetry } from "../../hooks/useServerTelemetry";
import { useSystemHealth } from "../../hooks/useSystemHealth";
import { ServerHealthGrid } from "../../components/user/ServerHealthGrid";
import { LatencyChart } from "../../components/user/LatencyChart";
import { SystemHealthBanner } from "../../components/shared/SystemHealthBanner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Server,
  Users,
  Zap,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";

export function ServersMonitorView() {
  const {
    telemetry,
    allTelemetry,
    loading,
    stats,
    filterCountry,
    setFilterCountry,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    refresh,
  } = useServerTelemetry();

  const { health, loading: healthLoading } = useSystemHealth();

  const countries = Array.from(new Set(allTelemetry.map((n) => n.country)));

  return (
    <div className="space-y-6 pb-12">
      {/* System Health Banner */}
      <SystemHealthBanner health={health} loading={healthLoading} />

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Total Node Server
              </span>
              <div className="font-mono text-2xl font-bold text-foreground mt-1">
                {stats.totalNodes}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Server className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Status Sehat (Online)
              </span>
              <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">
                {stats.onlineNodes} / {stats.totalNodes}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Pengguna Terhubung
              </span>
              <div className="font-mono text-2xl font-bold text-indigo-400 mt-1">
                {stats.totalUsers.toLocaleString()}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Rata-rata Latensi
              </span>
              <div className="font-mono text-2xl font-bold text-amber-400 mt-1">
                {stats.avgPing} ms
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latency Comparison Chart */}
      <LatencyChart nodes={allTelemetry} />

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari server, IP, atau negara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/60 border-border text-foreground text-xs h-10 rounded-xl"
            />
          </div>

          {/* Country filter buttons */}
          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setFilterCountry("ALL")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                filterCountry === "ALL"
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted/40 border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Semua
            </button>
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCountry(c)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  filterCountry === c
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted/40 border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refresh()}
            disabled={loading}
            className="border-border bg-card/60 hover:bg-muted text-foreground gap-2 h-10 px-3.5 text-xs rounded-xl shadow-sm"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
            />
            Segarkan Telemetri
          </Button>
        </div>
      </div>

      {/* Real-time Health Grid */}
      <ServerHealthGrid nodes={telemetry} />
    </div>
  );
}
