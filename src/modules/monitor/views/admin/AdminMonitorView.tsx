// ==============================================================================
// GoVPN Superadmin Monitor View Component
// Part of Pola C: views/admin/AdminMonitorView.tsx
// 100% Coinbase Institutional Design System (Telemetry Target Fleet Management)
// ==============================================================================

"use client";

import React from "react";
import { useMonitorAdmin } from "../../hooks/useMonitorAdmin";
import { useSystemHealth } from "../../hooks/useSystemHealth";
import { AdminMonitorTable } from "../../components/admin/AdminMonitorTable";
import { SystemHealthBanner } from "../../components/shared/SystemHealthBanner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, ShieldCheck, RefreshCw, Layers } from "lucide-react";

export function AdminMonitorView() {
  const {
    monitors,
    loading,
    createMonitor,
    deleteMonitor,
    syncServers,
    checkUptime,
    refresh,
  } = useMonitorAdmin();

  const { health, loading: healthLoading } = useSystemHealth();

  const onlineCount = monitors.filter((m) => m.status === "ONLINE").length;
  const activeProbesCount = monitors.filter((m) => m.is_active).length;

  return (
    <div className="space-y-6 pb-12">
      {/* System Health Banner */}
      <SystemHealthBanner health={health} loading={healthLoading} />

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Total Target Telemetri
              </span>
              <div className="font-mono text-2xl font-bold text-foreground mt-1">
                {monitors.length} Node
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Activity className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Node Sehat (Online)
              </span>
              <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">
                {onlineCount} / {monitors.length}
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
                Probe Aktif
              </span>
              <div className="font-mono text-2xl font-bold text-primary mt-1">
                {activeProbesCount} Probe
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Layers className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refresh Bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-base font-bold text-foreground">
            Armada Pemantau Server & Log Telemetri
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Konfigurasi target health probe periodik dan batas ambang notifikasi
            latensi
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refresh()}
          disabled={loading}
          className="border-border bg-card/60 hover:bg-muted text-foreground gap-2 h-9 px-3.5 text-xs rounded-xl shadow-sm"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Segarkan
        </Button>
      </div>

      {/* Targets Table */}
      <AdminMonitorTable
        monitors={monitors}
        onCreateMonitor={createMonitor}
        onDeleteMonitor={deleteMonitor}
        onSyncServers={syncServers}
        onCheckUptime={checkUptime}
        loading={loading}
      />
    </div>
  );
}
