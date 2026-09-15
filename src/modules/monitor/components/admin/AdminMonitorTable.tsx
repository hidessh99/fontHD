// ==============================================================================
// GoVPN Admin Monitor Target Table Component
// Part of Pola C: components/admin/AdminMonitorTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { MonitorTarget } from "../../types/monitor.types";
import { AdminCreateMonitorDto } from "../../types/admin.types";
import { NodeStatusBadge } from "../shared/NodeStatusBadge";
import { CreateMonitorModal } from "./CreateMonitorModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import {
  Activity,
  Trash2,
  RefreshCw,
  Sparkles,
  Loader2,
  Clock,
  Globe,
} from "lucide-react";
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
  const { t, locale } = useI18n();
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleDelete = async (id: string | number) => {
    if (!confirm(t("monitor.confirmDeleteTarget")))
      return;
    setDeletingId(id);
    try {
      await onDeleteMonitor(id);
      toast.success(t("monitor.targetDeleted"));
    } finally {
      setDeletingId(null);
    }
  };

  const handleSync = async () => {
    if (!onSyncServers) return;
    setSyncing(true);
    try {
      const res = await onSyncServers();
      toast.success(
        t("monitor.syncSuccess", { count: res?.synced_count ?? 0 }),
      );
    } catch {
      toast.error(t("monitor.syncFailed"));
    } finally {
      setSyncing(false);
    }
  };

  const handleCheck = async () => {
    if (!onCheckUptime) return;
    setChecking(true);
    try {
      const res = await onCheckUptime();
      toast.success(
        t("monitor.checkSuccess", { count: res?.checked_count ?? 0 }),
      );
    } catch {
      toast.error(t("monitor.checkFailed"));
    } finally {
      setChecking(false);
    }
  };

  const columns: ColumnDef<MonitorTarget>[] = useMemo(
    () => [
      {
        id: "status",
        header: t("monitor.colStatus"),
        cell: (target) => <NodeStatusBadge status={target.status} />,
      },
      {
        id: "name",
        header: t("monitor.colTargetName"),
        className: "font-sans",
        cell: (target) => (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold font-mono text-xs border border-primary/20 shrink-0">
              <Globe className="h-3.5 w-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground">{target.name}</span>
              <span className="text-[10px] text-muted-foreground font-mono">
                ID: #{target.id}
              </span>
            </div>
          </div>
        ),
      },
      {
        id: "host_port",
        header: t("monitor.colHostPort"),
        cell: (target) => (
          <span className="text-foreground font-semibold bg-surface border border-border/60 px-2 py-0.5 rounded text-[11px] font-mono">
            {target.host}
            {target.port ? `:${target.port}` : ""}
          </span>
        ),
      },
      {
        id: "protocol",
        header: t("monitor.colProtocol"),
        cell: (target) => (
          <Badge
            variant="outline"
            className="border-border bg-card text-foreground font-mono text-[11px]"
          >
            {target.protocol}
          </Badge>
        ),
      },
      {
        id: "interval",
        header: t("monitor.colIntervalThreshold"),
        cell: (target) => (
          <div className="flex flex-col text-[11px] font-sans">
            <span className="text-foreground font-mono">
              {t("monitor.everySeconds", { sec: target.interval_seconds })}
            </span>
            {target.alert_threshold_ms && (
              <span className="text-amber-400 font-mono text-[10px]">
                {t("monitor.thresholdLabel", { ms: target.alert_threshold_ms })}
              </span>
            )}
          </div>
        ),
      },
      {
        id: "last_check_at",
        header: t("monitor.colLastCheck"),
        cell: (target) =>
          target.last_check_at ? (
            <div className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3 shrink-0" />
              <span>
                {new Date(target.last_check_at).toLocaleTimeString(locale === "id" ? "id-ID" : "en-US")}
              </span>
            </div>
          ) : (
            <span className="text-[11px] text-muted-foreground">
              {t("monitor.neverChecked")}
            </span>
          ),
      },
      {
        id: "actions",
        header: t("common.actions"),
        align: "right",
        cell: (target) => (
          <Button
            variant="ghost"
            size="sm"
            disabled={deletingId === target.id}
            onClick={() => handleDelete(target.id)}
            className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
            title={t("common.delete")}
          >
            {deletingId === target.id ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </Button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deletingId, t, locale],
  );

  const filters: DataTableFilterConfig<MonitorTarget>[] = useMemo(
    () => [
      {
        id: "status",
        label: t("monitor.colStatus"),
        defaultValue: "ALL",
        options: [
          { label: t("monitor.allStatuses"), value: "ALL" },
          { label: "ONLINE / UP", value: "ONLINE" },
          { label: "OFFLINE / DOWN", value: "OFFLINE" },
          { label: "DEGRADED", value: "DEGRADED" },
        ],
        filterFn: (target, val) => target.status?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [t],
  );

  const actions = (
    <div className="flex items-center gap-2 flex-wrap">
      {onSyncServers && (
        <Button
          size="sm"
          variant="outline"
          disabled={syncing}
          onClick={handleSync}
          className="h-9 px-3.5 rounded-full border-border bg-card/60 hover:bg-muted text-foreground font-semibold text-xs gap-1.5 shadow-sm"
        >
          {syncing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5 text-primary" />
          )}
          {t("monitor.syncFleet")}
        </Button>
      )}

      {onCheckUptime && (
        <Button
          size="sm"
          variant="outline"
          disabled={checking}
          onClick={handleCheck}
          className="h-9 px-3.5 rounded-full border-border bg-card/60 hover:bg-muted text-foreground font-semibold text-xs gap-1.5 shadow-sm"
        >
          {checking ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          )}
          {t("monitor.checkUptimeBtn")}
        </Button>
      )}

      <CreateMonitorModal onCreate={onCreateMonitor} />
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          {t("monitor.targetsTitle")}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {t("monitor.targetsSubtitle")}
        </p>
      </div>

      <DataTable<MonitorTarget>
        data={monitors}
        columns={columns}
        keyExtractor={(target) => target.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder={t("monitor.searchTargetPlaceholder")}
        searchButtonText={t("common.search")}
        searchAccessor={(target) => [target.name, target.host, target.port, target.protocol]}
        filters={filters}
        paginated={true}
        pageSize={10}
        entityName={t("monitor.targetEntityName")}
        actions={actions}
        emptyIcon={Activity}
        emptyTitle={t("monitor.noTargetsTitle")}
        emptyDescription={t("monitor.noTargetsDesc")}
      />
    </div>
  );
}
