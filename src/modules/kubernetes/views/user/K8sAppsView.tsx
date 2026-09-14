// ==============================================================================
// GoVPN Kubernetes User Apps View Component
// Part of Pola C: views/user/K8sAppsView.tsx
// 100% Coinbase Institutional Design System (Pods, Specs & Streaming Logs)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useK8sUser } from "../../hooks/useK8sUser";
import { K8sApp } from "../../types/k8s.types";
import { K8sAppCard } from "../../components/user/K8sAppCard";
import { K8sDeployModal } from "../../components/user/K8sDeployModal";
import { K8sPodLogsModal } from "../../components/user/K8sPodLogsModal";
import { K8sEnvEditorModal } from "../../components/user/K8sEnvEditorModal";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Server,
  Cpu,
  HardDrive,
  Search,
  RefreshCw,
} from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

export function K8sAppsView() {
  const {
    apps,
    allApps,
    templates,
    specs,
    loading,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    deployApp,
    restartApp,
    updateEnv,
    renewApp,
    getLogs,
    refresh,
  } = useK8sUser();

  const [activeLogsApp, setActiveLogsApp] = useState<K8sApp | null>(null);
  const [logsOpen, setLogsOpen] = useState(false);
  const [activeEnvApp, setActiveEnvApp] = useState<K8sApp | null>(null);
  const [envOpen, setEnvOpen] = useState(false);

  const runningCount = allApps.filter((a) => a.status === "RUNNING").length;
  const totalCores = allApps.reduce(
    (sum, a) => sum + (a.spec?.cpu_cores || 1),
    0,
  );
  const totalRamGb = (
    allApps.reduce((sum, a) => sum + (a.spec?.ram_mb || 1024), 0) / 1024
  ).toFixed(1);

  return (
    <div className="space-y-6 pb-12">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Aplikasi Aktif (Pods)
              </span>
              <div className="font-mono text-2xl font-bold text-foreground mt-1">
                {runningCount} / {allApps.length} Pods
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Rocket className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Total Alokasi vCPU
              </span>
              <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">
                {totalCores} Cores
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Cpu className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Total Alokasi Memori
              </span>
              <div className="font-mono text-2xl font-bold text-primary mt-1">
                {totalRamGb} GB
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <HardDrive className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action and Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari aplikasi atau container image..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/60 border-border text-foreground text-xs h-10 rounded-xl"
            />
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            {["ALL", "RUNNING", "PENDING", "STOPPED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  filterStatus === st
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted/40 border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {st === "ALL" ? "Semua Status" : st}
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
            Segarkan
          </Button>

          <K8sDeployModal
            templates={templates}
            specs={specs}
            onDeploy={deployApp}
          />
        </div>
      </div>

      {/* Apps Grid */}
      {apps.length === 0 ? (
        <EmptyState
          icon={Rocket}
          title="Belum Ada Aplikasi Kontainer"
          description="Deploy aplikasi container pertama Anda (Shadowsocks, WireGuard, NGINX, dll) menggunakan tombol di atas."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {apps.map((app) => (
            <K8sAppCard
              key={app.id}
              app={app}
              onRestart={restartApp}
              onOpenLogs={(a) => {
                setActiveLogsApp(a);
                setLogsOpen(true);
              }}
              onOpenEnv={(a) => {
                setActiveEnvApp(a);
                setEnvOpen(true);
              }}
              onRenew={renewApp}
            />
          ))}
        </div>
      )}

      {/* Pod Logs Modal */}
      <K8sPodLogsModal
        app={activeLogsApp}
        open={logsOpen}
        onOpenChange={setLogsOpen}
        onFetchLogs={getLogs}
      />

      {/* Env Editor Modal */}
      <K8sEnvEditorModal
        app={activeEnvApp}
        open={envOpen}
        onOpenChange={setEnvOpen}
        onSaveEnv={updateEnv}
      />
    </div>
  );
}
