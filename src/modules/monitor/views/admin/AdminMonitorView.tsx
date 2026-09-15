// ==============================================================================
// GoVPN Superadmin Monitor View Component
// Part of Pola C: views/admin/AdminMonitorView.tsx
// 100% Coinbase Institutional Design System (Telemetry Target Fleet Management)
// ==============================================================================

"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { useMonitorAdmin } from "../../hooks/useMonitorAdmin";
import { useSystemHealth } from "../../hooks/useSystemHealth";
import { AdminMonitorTable } from "../../components/admin/AdminMonitorTable";
import { SystemHealthBanner } from "../../components/shared/SystemHealthBanner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, ShieldCheck, RefreshCw, Layers } from "lucide-react";

export function AdminMonitorView() {
  const { t } = useI18n();
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
                {t("monitor.totalTargets")}
              </span>
              <div className="font-mono text-2xl font-bold text-foreground mt-1">
                {monitors.length} {t("monitor.nodesUnit")}
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
                {t("monitor.healthyNodes")}
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
                {t("monitor.activeProbes")}
              </span>
              <div className="font-mono text-2xl font-bold text-primary mt-1">
                {activeProbesCount} {t("monitor.probesUnit")}
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
            {t("monitor.fleetTitle")}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("monitor.fleetSubtitle")}
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
          {t("monitor.refreshBtn")}
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
