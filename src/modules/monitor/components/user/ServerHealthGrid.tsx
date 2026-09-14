// ==============================================================================
// GoVPN Server Telemetry Health Grid Component
// Part of Pola C: components/user/ServerHealthGrid.tsx
// 100% Coinbase Institutional Design System (Node Resource Vitals)
// ==============================================================================

"use client";

import React from "react";
import { ServerTelemetry } from "../../types/monitor.types";
import { Card } from "@/components/ui/card";
import { NodeStatusBadge } from "../shared/NodeStatusBadge";
import { Cpu, HardDrive, Users, ArrowDown, ArrowUp, Activity, Clock, Server } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

interface ServerHealthGridProps {
  nodes: ServerTelemetry[];
}

export function ServerHealthGrid({ nodes }: ServerHealthGridProps) {
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}h ${hours}j`;
  };

  if (nodes.length === 0) {
    return (
      <EmptyState
        icon={Server}
        title="Tidak Ada Node Ditemukan"
        description="Tidak ada server yang cocok dengan kriteria filter negara atau pencarian saat ini."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {nodes.map((node) => {
        const cpuColor =
          node.cpu_percent > 80
            ? "bg-rose-500"
            : node.cpu_percent > 50
            ? "bg-amber-500"
            : "bg-primary";
        const ramColor =
          node.ram_percent > 80
            ? "bg-rose-500"
            : node.ram_percent > 50
            ? "bg-amber-500"
            : "bg-indigo-500";

        return (
          <Card
            key={node.id}
            className="border-border/80 bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-all shadow-md rounded-2xl overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Header */}
              <div className="p-4 border-b border-border/80 bg-muted/20 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none" role="img" aria-label={node.country}>
                    {node.flag || "🌐"}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {node.server_name}
                    </h4>
                    <span className="font-mono text-xs text-muted-foreground">
                      {node.ip_address}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-mono text-xs font-bold text-foreground bg-muted px-2 py-0.5 rounded-lg border border-border">
                    {node.ping_ms} ms
                  </span>
                  <NodeStatusBadge status={node.status} />
                </div>
              </div>

              {/* Resource Utilization */}
              <div className="p-4 space-y-3.5">
                {/* CPU Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Cpu className="h-3.5 w-3.5 text-primary" /> Beban CPU
                    </span>
                    <span className="font-mono font-bold text-foreground">
                      {node.cpu_percent}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden border border-border/60">
                    <div
                      className={`h-full ${cpuColor} transition-all duration-500 rounded-full`}
                      style={{ width: `${node.cpu_percent}%` }}
                    />
                  </div>
                </div>

                {/* RAM Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <HardDrive className="h-3.5 w-3.5 text-indigo-400" /> Pemakaian RAM
                    </span>
                    <span className="font-mono font-bold text-foreground">
                      {node.ram_percent}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden border border-border/60">
                    <div
                      className={`h-full ${ramColor} transition-all duration-500 rounded-full`}
                      style={{ width: `${node.ram_percent}%` }}
                    />
                  </div>
                </div>

                {/* Bandwidth & Sessions */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-border/60">
                  <div className="rounded-xl bg-muted/30 p-2.5 text-xs border border-border/40">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                      <Activity className="h-3 w-3 text-primary" /> Bandwidth I/O
                    </span>
                    <div className="flex items-center gap-2 mt-1.5 font-mono font-semibold text-foreground text-[11px]">
                      <span className="flex items-center text-emerald-400">
                        <ArrowDown className="h-3 w-3 mr-0.5" />
                        {node.bandwidth_in_mbps}M
                      </span>
                      <span className="flex items-center text-primary">
                        <ArrowUp className="h-3 w-3 mr-0.5" />
                        {node.bandwidth_out_mbps}M
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-muted/30 p-2.5 text-xs border border-border/40">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                      <Users className="h-3 w-3 text-indigo-400" /> Sesi Terhubung
                    </span>
                    <div className="mt-1.5 font-mono font-bold text-foreground text-xs">
                      {node.active_sessions}{" "}
                      <span className="text-[10px] text-muted-foreground font-normal">
                        / {node.max_sessions}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer: Uptime & Heartbeat */}
            <div className="px-4 py-2.5 bg-muted/20 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                Uptime: {formatUptime(node.uptime_seconds)}
              </span>
              <span className="text-muted-foreground">
                {new Date(node.last_heartbeat).toLocaleTimeString("id-ID")}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
