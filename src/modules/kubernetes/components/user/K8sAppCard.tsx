// ==============================================================================
// GoVPN Kubernetes App Card Component
// Part of Pola C: components/user/K8sAppCard.tsx
// 100% Coinbase Institutional Design System (Pod Vitals & Quick Actions)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { K8sApp } from "../../types/k8s.types";
import { K8sAppStatusBadge } from "../shared/K8sAppStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import {
  RotateCcw,
  Terminal,
  Settings,
  Calendar,
  ExternalLink,
  Cpu,
  HardDrive,
  Globe,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface K8sAppCardProps {
  app: K8sApp;
  onRestart: (id: string | number) => Promise<unknown>;
  onOpenLogs: (app: K8sApp) => void;
  onOpenEnv: (app: K8sApp) => void;
  onRenew: (id: string | number) => void;
}

export function K8sAppCard({
  app,
  onRestart,
  onOpenLogs,
  onOpenEnv,
  onRenew,
}: K8sAppCardProps) {
  const [restarting, setRestarting] = useState(false);

  const handleRestart = async () => {
    setRestarting(true);
    try {
      await onRestart(app.id);
      toast.success(`Pod ${app.name} berhasil di-restart`);
    } catch {
      toast.error("Gagal melakukan restart pod");
    } finally {
      setRestarting(false);
    }
  };

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-5 rounded-2xl shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between group">
      <CardContent className="p-0 space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                {app.name}
              </h4>
              <K8sAppStatusBadge status={app.status} />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <span className="truncate max-w-[260px]">{app.docker_image}</span>
              <CopyButton text={app.docker_image} label="" className="h-4 w-4 p-0" />
            </div>
          </div>

          {app.external_url && (
            <a
              href={app.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-colors"
              title="Buka URL Aplikasi"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Specs and Metrics Grid */}
        <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-border/60 text-xs font-mono">
          <div className="rounded-xl bg-muted/30 p-2.5">
            <span className="text-muted-foreground font-sans flex items-center gap-1 text-[11px]">
              <Cpu className="h-3 w-3 text-primary" /> CPU
            </span>
            <span className="font-semibold text-foreground mt-0.5 block">
              {app.spec?.cpu_cores || 1} Cores
            </span>
          </div>

          <div className="rounded-xl bg-muted/30 p-2.5">
            <span className="text-muted-foreground font-sans flex items-center gap-1 text-[11px]">
              <HardDrive className="h-3 w-3 text-indigo-400" /> RAM
            </span>
            <span className="font-semibold text-foreground mt-0.5 block">
              {app.spec?.ram_mb || 1024} MB
            </span>
          </div>

          <div className="rounded-xl bg-muted/30 p-2.5">
            <span className="text-muted-foreground font-sans flex items-center gap-1 text-[11px]">
              <Globe className="h-3 w-3 text-emerald-400" /> Ports
            </span>
            <span className="font-semibold text-foreground mt-0.5 block truncate">
              {app.ports?.length > 0 ? app.ports.join(", ") : "80"}
            </span>
          </div>
        </div>

        {/* Expiry & Actions Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-mono">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Aktif hingga: {new Date(app.expires_at).toLocaleDateString("id-ID")}</span>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto flex-wrap">
            <Button
              variant="outline"
              size="sm"
              disabled={restarting}
              onClick={handleRestart}
              className="h-8 px-2.5 rounded-lg border-border text-xs gap-1"
              title="Restart Container Pod"
            >
              <RotateCcw className={`h-3 w-3 ${restarting ? "animate-spin text-primary" : ""}`} />
              Restart
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenLogs(app)}
              className="h-8 px-2.5 rounded-lg border-border text-xs gap-1"
              title="Lihat Logs Pod"
            >
              <Terminal className="h-3 w-3 text-primary" />
              Logs
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenEnv(app)}
              className="h-8 px-2.5 rounded-lg border-border text-xs gap-1"
              title="Konfigurasi Environment Variable"
            >
              <Settings className="h-3 w-3 text-muted-foreground" />
              Env
            </Button>

            <Button
              size="sm"
              onClick={() => onRenew(app.id)}
              className="h-8 px-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm"
            >
              Perpanjang
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
