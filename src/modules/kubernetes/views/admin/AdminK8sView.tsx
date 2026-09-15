// ==============================================================================
// GoVPN Superadmin Kubernetes View Component
// Part of Pola C: views/admin/AdminK8sView.tsx
// 100% Coinbase Institutional Design System (Nodes, Specs & Templates)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useK8sAdmin } from "../../hooks/useK8sAdmin";
import { AdminK8sServerTable } from "../../components/admin/AdminK8sServerTable";
import { AdminK8sSpecTable } from "../../components/admin/AdminK8sSpecTable";
import { AdminK8sTemplateTable } from "../../components/admin/AdminK8sTemplateTable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Layers, Rocket, RefreshCw } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function AdminK8sView() {
  const { t } = useI18n();
  const {
    servers,
    specs,
    templates,
    loading,
    createServer,
    deleteServer,
    createSpec,
    deleteSpec,
    createTemplate,
    deleteTemplate,
    refresh,
  } = useK8sAdmin();

  const [activeTab, setActiveTab] = useState<"servers" | "specs" | "templates">(
    "servers",
  );

  const totalCapacityCores = servers.reduce((sum, s) => sum + s.total_cpu, 0);
  const totalCapacityRam = servers.reduce((sum, s) => sum + s.total_ram_gb, 0);
  const totalPods = servers.reduce((sum, s) => sum + s.pod_count, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Server className="h-5 w-5" />
            </div>
            {t("kubernetes.adminK8sTitle")}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {t("kubernetes.adminK8sSubtitle")}
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
          {t("common.refresh", "Refresh")}
        </Button>
      </div>

      {/* Cluster Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                {t("kubernetes.workerNodesActive")}
              </span>
              <div className="font-mono text-2xl font-bold text-foreground mt-1">
                {servers.length} Node ({totalPods} Pods)
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
                {t("kubernetes.clusterCpuCapacity")}
              </span>
              <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">
                {totalCapacityCores} vCPU Cores
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Layers className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                {t("kubernetes.clusterRamCapacity")}
              </span>
              <div className="font-mono text-2xl font-bold text-primary mt-1">
                {totalCapacityRam} GB RAM
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Rocket className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) =>
          setActiveTab(val as "servers" | "specs" | "templates")
        }
        className="w-full"
      >
        <TabsList variant="line" className="border-b border-border w-full justify-start gap-2 h-auto pb-0">
          <TabsTrigger value="servers" className="gap-2 py-2.5">
            <Server className="h-3.5 w-3.5" />
            <span>{t("kubernetes.tabWorkerNodes", { count: servers.length })}</span>
          </TabsTrigger>
          <TabsTrigger value="specs" className="gap-2 py-2.5">
            <Layers className="h-3.5 w-3.5" />
            <span>{t("kubernetes.tabResourceSpecs", { count: specs.length })}</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2 py-2.5">
            <Rocket className="h-3.5 w-3.5" />
            <span>{t("kubernetes.tabTemplates", { count: templates.length })}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Panels */}
      {activeTab === "servers" && (
        <AdminK8sServerTable
          servers={servers}
          onCreateServer={createServer}
          onDeleteServer={deleteServer}
          loading={loading}
        />
      )}

      {activeTab === "specs" && (
        <AdminK8sSpecTable
          specs={specs}
          onCreateSpec={createSpec}
          onDeleteSpec={deleteSpec}
          loading={loading}
        />
      )}

      {activeTab === "templates" && (
        <AdminK8sTemplateTable
          templates={templates}
          onCreateTemplate={createTemplate}
          onDeleteTemplate={deleteTemplate}
          loading={loading}
        />
      )}
    </div>
  );
}
