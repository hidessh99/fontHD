"use client";

import React from "react";
import { ServerTelemetry } from "../types/monitor.types";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ServerPingBadge } from "@/components/shared/ServerPingBadge";
import { Cpu, HardDrive, Users, ArrowDown, ArrowUp, Activity, Clock } from "lucide-react";

interface ServerHealthGridProps {
  nodes: ServerTelemetry[];
}

export function ServerHealthGrid({ nodes }: ServerHealthGridProps) {
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}h ${hours}j`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {nodes.map((node) => {
        const cpuColor =
          node.cpu_percent > 80
            ? "bg-rose-500"
            : node.cpu_percent > 50
            ? "bg-amber-500"
            : "bg-blue-500";
        const ramColor =
          node.ram_percent > 80
            ? "bg-rose-500"
            : node.ram_percent > 50
            ? "bg-amber-500"
            : "bg-indigo-500";

        return (
          <Card
            key={node.id}
            className="border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 transition-all shadow-lg overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/30 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label={node.country}>
                    {node.flag || "🌐"}
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-zinc-100 line-clamp-1">
                      {node.server_name}
                    </h4>
                    <span className="font-mono text-xs text-zinc-400">
                      {node.ip_address}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <ServerPingBadge latencyMs={node.ping_ms} />
                  <StatusBadge status={node.status} />
                </div>
              </div>

              {/* Resource Utilization */}
              <div className="p-4 space-y-3.5">
                {/* CPU Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <Cpu className="h-3.5 w-3.5 text-zinc-500" /> Beban CPU
                    </span>
                    <span className="font-mono font-medium text-zinc-200">
                      {node.cpu_percent}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div
                      className={`h-full ${cpuColor} transition-all duration-500`}
                      style={{ width: `${node.cpu_percent}%` }}
                    />
                  </div>
                </div>

                {/* RAM Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <HardDrive className="h-3.5 w-3.5 text-zinc-500" /> Pemakaian RAM
                    </span>
                    <span className="font-mono font-medium text-zinc-200">
                      {node.ram_percent}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div
                      className={`h-full ${ramColor} transition-all duration-500`}
                      style={{ width: `${node.ram_percent}%` }}
                    />
                  </div>
                </div>

                {/* Bandwidth & Sessions */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-900">
                  <div className="rounded-lg bg-zinc-900/50 p-2.5 text-xs">
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                      <Activity className="h-3 w-3" /> Bandwidth I/O
                    </span>
                    <div className="flex items-center gap-2 mt-1 font-mono text-zinc-200 text-[11px]">
                      <span className="flex items-center text-emerald-400">
                        <ArrowDown className="h-3 w-3 mr-0.5" />
                        {node.bandwidth_in_mbps}M
                      </span>
                      <span className="flex items-center text-blue-400">
                        <ArrowUp className="h-3 w-3 mr-0.5" />
                        {node.bandwidth_out_mbps}M
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-zinc-900/50 p-2.5 text-xs">
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                      <Users className="h-3 w-3" /> Pengguna Aktif
                    </span>
                    <div className="mt-1 font-mono font-semibold text-zinc-100 text-xs">
                      {node.active_sessions} / {node.max_sessions}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer: Uptime */}
            <div className="px-4 py-2.5 bg-zinc-900/40 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Uptime: {formatUptime(node.uptime_seconds)}
              </span>
              <span className="text-zinc-400 font-mono">
                {new Date(node.last_heartbeat).toLocaleTimeString("id-ID")}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
