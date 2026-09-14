// ==============================================================================
// GoVPN Latency Comparison Chart Component
// Part of Pola C: components/user/LatencyChart.tsx
// 100% Coinbase Institutional Design System (Global RTT comparison)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { ServerTelemetry } from "../../types/monitor.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LatencyChartProps {
  nodes: ServerTelemetry[];
}

export function LatencyChart({ nodes }: LatencyChartProps) {
  const [ascending, setAscending] = useState(true);

  if (nodes.length === 0) return null;

  // Sort by ping
  const sortedNodes = [...nodes].sort((a, b) =>
    ascending ? a.ping_ms - b.ping_ms : b.ping_ms - a.ping_ms,
  );
  const maxPing = Math.max(...nodes.map((n) => n.ping_ms), 100);

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-5 rounded-2xl shadow-sm">
      <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-bold text-foreground flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Zap className="h-3.5 w-3.5" />
          </div>
          Komparasi Latensi Ping Node Global (Round-Trip Time)
        </CardTitle>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setAscending(!ascending)}
          className="h-8 px-2.5 text-[11px] font-mono text-muted-foreground hover:text-foreground gap-1.5 rounded-lg"
        >
          <ArrowUpDown className="h-3 w-3" />
          {ascending ? "Terendah -> Tertinggi" : "Tertinggi -> Terendah"}
        </Button>
      </CardHeader>

      <CardContent className="p-0 space-y-3">
        {sortedNodes.map((node) => {
          const percentage = Math.min(
            100,
            Math.round((node.ping_ms / maxPing) * 100),
          );
          const barColor =
            node.ping_ms < 50
              ? "bg-emerald-500 shadow-emerald-500/30"
              : node.ping_ms < 120
                ? "bg-amber-500 shadow-amber-500/30"
                : "bg-rose-500 shadow-rose-500/30";

          return (
            <div key={node.id} className="space-y-1 group">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <span className="text-base leading-none">
                    {node.flag || "🌐"}
                  </span>
                  <span className="truncate max-w-[240px] group-hover:text-primary transition-colors">
                    {node.server_name}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono hidden sm:inline">
                    ({node.ip_address})
                  </span>
                </span>
                <span className="font-mono font-bold text-foreground text-xs">
                  {node.ping_ms}{" "}
                  <span className="text-[10px] text-muted-foreground font-normal">
                    ms
                  </span>
                </span>
              </div>
              <div className="h-2 w-full bg-muted/40 rounded-full overflow-hidden border border-border/60">
                <div
                  className={`h-full ${barColor} rounded-full transition-all duration-700 shadow-sm`}
                  style={{ width: `${Math.max(4, percentage)}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
