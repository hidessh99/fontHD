"use client";

import React from "react";
import { ServerTelemetry } from "../types/monitor.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface LatencyChartProps {
  nodes: ServerTelemetry[];
}

export function LatencyChart({ nodes }: LatencyChartProps) {
  // Sort by lowest latency
  const sortedNodes = [...nodes].sort((a, b) => a.ping_ms - b.ping_ms);
  const maxPing = Math.max(...nodes.map((n) => n.ping_ms), 100);

  return (
    <Card className="border-zinc-800 bg-zinc-950 p-5 shadow-xl">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-400" />
          Komparasi Latensi Ping Node Global (Rount-Trip Time)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-3">
        {sortedNodes.map((node) => {
          const percentage = Math.min(100, Math.round((node.ping_ms / maxPing) * 100));
          const barColor =
            node.ping_ms < 50
              ? "bg-emerald-500"
              : node.ping_ms < 120
              ? "bg-amber-500"
              : "bg-rose-500";

          return (
            <div key={node.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                  <span>{node.flag || "🌐"}</span>
                  <span className="truncate max-w-[220px]">{node.server_name}</span>
                </span>
                <span className="font-mono font-bold text-zinc-100">
                  {node.ping_ms} ms
                </span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/80">
                <div
                  className={`h-full ${barColor} rounded-full transition-all duration-700`}
                  style={{ width: `${Math.max(5, percentage)}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
