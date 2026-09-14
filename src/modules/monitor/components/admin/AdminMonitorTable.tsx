// ==============================================================================
// GoVPN Admin Monitor Target Table Component
// Part of Pola C: components/admin/AdminMonitorTable.tsx
// 100% Coinbase Institutional Design System (Audit, Health Probes & Sync)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { MonitorTarget } from "../../types/monitor.types";
import { AdminCreateMonitorDto } from "../../types/admin.types";
import { NodeStatusBadge } from "../shared/NodeStatusBadge";
import { CreateMonitorModal } from "./CreateMonitorModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Activity, Trash2, RefreshCw, Sparkles, Loader2, Clock, Globe } from "lucide-react";
import { toast } from "sonner";

interface AdminMonitorTableProps {
  monitors: MonitorTarget[];
  onCreateMonitor: (dto: AdminCreateMonitorDto) => Promise<unknown>;
  onDeleteMonitor: (id: string | number) => Promise<unknown>;
  onSyncServers?: () => Promise<{ synced_count: number }>;
  onCheckUptime?: () => Promise<{ checked_count: number }>;
  loading?: boolean;
}

export function AdminMonitorTable({
  monitors,
  onCreateMonitor,
  onDeleteMonitor,
  onSyncServers,
  onCheckUptime,
  loading = false,
}: AdminMonitorTableProps) {
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleDelete = async (id: string | number) => {
    if (!confirm("Hapus target monitor ini? Riwayat telemetri akan dihapus.")) return;
    setDeletingId(id);
    try {
      await onDeleteMonitor(id);
      toast.success("Target monitor berhasil dihapus");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSync = async () => {
    if (!onSyncServers) return;
    setSyncing(true);
    try {
      const res = await onSyncServers();
      toast.success(`Sinkronisasi Sukses: ${res?.synced_count ?? 0} node VPN disinkronkan ke monitor`);
    } catch {
      toast.error("Gagal menjalankan sinkronisasi server");
    } finally {
      setSyncing(false);
    }
  };

  const handleCheck = async () => {
    if (!onCheckUptime) return;
    setChecking(true);
    try {
      const res = await onCheckUptime();
      toast.success(`Pengecekan Uptime Sukses: ${res?.checked_count ?? 0} node diperiksa`);
    } catch {
      toast.error("Gagal menjalankan pengecekan uptime");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Target Telemetri & Health Checks
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar target node VPN yang dipantau latensi dan status ketersediaannya secara real-time
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onSyncServers && (
            <Button
              size="sm"
              variant="outline"
              disabled={syncing}
              onClick={handleSync}
              className="h-10 px-3.5 rounded-xl border-border bg-card/60 hover:bg-muted text-foreground font-semibold text-xs gap-1.5 shadow-sm"
            >
              {syncing ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RefreshCw className="h-3.5 w-3.5 text-primary" />
              )}
              Sinkronkan Armada VPN
            </Button>
          )}

          {onCheckUptime && (
            <Button
              size="sm"
              variant="outline"
              disabled={checking}
              onClick={handleCheck}
              className="h-10 px-3.5 rounded-xl border-border bg-card/60 hover:bg-muted text-foreground font-semibold text-xs gap-1.5 shadow-sm"
            >
              {checking ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              )}
              Trigger Uptime Check
            </Button>
          )}

          <CreateMonitorModal onCreate={onCreateMonitor} />
        </div>
      </div>

      {/* Table */}
      {monitors.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="Belum Ada Target Monitor"
          description="Tambahkan target server pertama Anda atau klik 'Sinkronkan Armada VPN' untuk mengimpor dari data server VPN."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">Status</th>
                <th className="px-5 py-4 font-sans">Nama Target</th>
                <th className="px-5 py-4 font-sans">Host & Port</th>
                <th className="px-5 py-4 font-sans">Protokol</th>
                <th className="px-5 py-4 font-sans">Interval / Ambang</th>
                <th className="px-5 py-4 font-sans">Pemeriksaan Terakhir</th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {monitors.map((target) => (
                <tr key={target.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <NodeStatusBadge status={target.status} />
                  </td>

                  <td className="px-5 py-3.5 font-sans">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold font-mono text-xs border border-primary/20">
                        <Globe className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground">{target.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          ID: #{target.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="text-foreground font-semibold bg-surface border border-border/60 px-2 py-0.5 rounded text-[11px]">
                      {target.host}
                      {target.port ? `:${target.port}` : ""}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className="border-border bg-card text-foreground font-mono text-[11px]">
                      {target.protocol}
                    </Badge>
                  </td>

                  <td className="px-5 py-3.5 font-sans">
                    <div className="flex flex-col text-[11px]">
                      <span className="text-foreground font-mono">
                        Setiap {target.interval_seconds} detik
                      </span>
                      {target.alert_threshold_ms && (
                        <span className="text-amber-400 font-mono text-[10px]">
                          Ambang: {target.alert_threshold_ms}ms
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-muted-foreground font-sans">
                    {target.last_check_at ? (
                      <div className="flex items-center gap-1 font-mono text-[11px]">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(target.last_check_at).toLocaleTimeString("id-ID")}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">Belum diperiksa</span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 text-right font-sans">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === target.id}
                      onClick={() => handleDelete(target.id)}
                      className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                    >
                      {deletingId === target.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
