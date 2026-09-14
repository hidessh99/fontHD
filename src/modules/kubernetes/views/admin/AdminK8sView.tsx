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
import { Server, Layers, Rocket, RefreshCw } from "lucide-react";

export function AdminK8sView() {
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

  const [activeTab, setActiveTab] = useState<"servers" | "specs" | "templates">("servers");

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
            Admin Kubernetes Cluster Control Plane
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Kelola worker nodes bare-metal, paket kuota CPU/RAM, dan blueprint template aplikasi
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refresh()}
          disabled={loading}
          className="border-border bg-card/60 hover:bg-muted text-foreground gap-2 h-9 px-3.5 text-xs rounded-xl shadow-sm"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Segarkan
        </Button>
      </div>

      {/* Cluster Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">Worker Nodes Aktif</span>
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
              <span className="text-xs text-muted-foreground font-medium">Kapasitas CPU Klaster</span>
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
              <span className="text-xs text-muted-foreground font-medium">Kapasitas RAM Klaster</span>
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
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <button
          onClick={() => setActiveTab("servers")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === "servers"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Server className="h-3.5 w-3.5" />
          Worker Nodes ({servers.length})
        </button>

        <button
          onClick={() => setActiveTab("specs")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === "specs"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          Paket Resource Specs ({specs.length})
        </button>

        <button
          onClick={() => setActiveTab("templates")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === "templates"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Rocket className="h-3.5 w-3.5" />
          Template Blueprint ({templates.length})
        </button>
      </div>

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
