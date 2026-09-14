"use client";

import React from "react";
import { useServerTelemetry } from "../hooks/useServerTelemetry";
import { ServerHealthGrid } from "../components/ServerHealthGrid";
import { LatencyChart } from "../components/LatencyChart";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Server, Activity, Users, Zap, RefreshCw, Search, ShieldCheck } from "lucide-react";

export function ServersMonitorView() {
  const {
    telemetry,
    allTelemetry,
    loading,
    stats,
    filterCountry,
    setFilterCountry,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    refresh,
  } = useServerTelemetry();

  const countries = Array.from(new Set(allTelemetry.map((n) => n.country)));

  return (
    <div className="space-y-6 pb-12">
      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-zinc-800 bg-zinc-950 p-4">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400">Total Node Server</span>
              <div className="font-mono text-2xl font-bold text-zinc-100 mt-1">
                {stats.totalNodes}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Server className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950 p-4">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400">Status Sehat (Online)</span>
              <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">
                {stats.onlineNodes} / {stats.totalNodes}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950 p-4">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400">Pengguna Terhubung</span>
              <div className="font-mono text-2xl font-bold text-indigo-400 mt-1">
                {stats.totalUsers.toLocaleString()}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950 p-4">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400">Rata-rata Latensi</span>
              <div className="font-mono text-2xl font-bold text-amber-400 mt-1">
                {stats.avgPing} ms
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latency Comparison Chart */}
      <LatencyChart nodes={allTelemetry} />

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Cari server, IP, atau negara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-100 text-xs h-9"
            />
          </div>

          {/* Country filter buttons */}
          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setFilterCountry("ALL")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                filterCountry === "ALL"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Semua
            </button>
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCountry(c)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  filterCountry === c
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {c}
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
            className="border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 gap-2 h-9 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Segarkan Telemetri
          </Button>
        </div>
      </div>

      {/* Real-time Health Grid */}
      <ServerHealthGrid nodes={telemetry} />
    </div>
  );
}
