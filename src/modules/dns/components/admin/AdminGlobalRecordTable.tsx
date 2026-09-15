// ==============================================================================
// GoVPN DNS Admin Global Record Table Component
// Part of Pola C: components/admin/AdminGlobalRecordTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// Fully Localized with useI18n (EN/ID)
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { DnsRecord } from "../../types/dns.types";
import { DnsTypeBadge } from "../shared/DnsTypeBadge";
import { CloudflareProxyBadge } from "../shared/CloudflareProxyBadge";
import { CopyButton } from "@/components/shared/CopyButton";
import { Button } from "@/components/ui/button";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import { Trash2, Globe, Sparkles, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";

interface AdminGlobalRecordTableProps {
  records: DnsRecord[];
  onDeleteRecord?: (id: string | number) => Promise<unknown>;
  onCleanupRecords?: () => Promise<{ cleaned_count: number }>;
  loading?: boolean;
}

export function AdminGlobalRecordTable({
  records,
  onDeleteRecord,
  onCleanupRecords,
  loading = false,
}: AdminGlobalRecordTableProps) {
  const { t } = useI18n();
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [cleaning, setCleaning] = useState(false);

  const handleDelete = async (id: string | number) => {
    if (!confirm(t("dns.deleteConfirm"))) return;
    setDeletingId(id);
    try {
      if (onDeleteRecord) {
        await onDeleteRecord(id);
        toast.success(t("dns.deleteSuccess"));
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleCleanup = async () => {
    if (!onCleanupRecords) return;
    setCleaning(true);
    try {
      const res = await onCleanupRecords();
      toast.success(
        t("dns.cleanupSuccess", { count: res?.cleaned_count ?? 0 }),
      );
    } catch {
      toast.error(t("dns.cleanupFailed"));
    } finally {
      setCleaning(false);
    }
  };

  const formatTtl = (ttl: number) => {
    if (ttl === 1) return t("dns.autoTtl");
    if (ttl < 60) return `${ttl}s`;
    if (ttl < 3600) return `${Math.round(ttl / 60)}m`;
    return `${Math.round(ttl / 3600)}h`;
  };

  const columns: ColumnDef<DnsRecord>[] = useMemo(
    () => [
      {
        id: "type",
        header: t("dns.recordType"),
        cell: (rec) => <DnsTypeBadge type={rec.type} />,
      },
      {
        id: "user_id",
        header: "User ID",
        className: "font-sans",
        cell: (rec) =>
          rec.user_id ? (
            <div className="flex items-center gap-1.5 text-foreground text-[11px] font-mono">
              <User className="h-3 w-3 text-muted-foreground shrink-0" />
              <span>#{rec.user_id}</span>
            </div>
          ) : (
            <span className="text-muted-foreground text-[11px]">System</span>
          ),
      },
      {
        id: "host",
        header: t("dns.recordName"),
        cell: (rec) => {
          const fqdn = rec.domain_name
            ? `${rec.name}.${rec.domain_name}`
            : rec.name;

          return (
            <div className="flex flex-col font-mono">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground">{rec.name}</span>
                {rec.domain_name && (
                  <span className="text-muted-foreground text-[11px]">
                    .{rec.domain_name}
                  </span>
                )}
                <CopyButton text={fqdn} label="" className="h-5 w-5 p-0" />
              </div>
              {rec.comment && (
                <span className="text-[11px] text-muted-foreground font-sans truncate max-w-[200px]">
                  {rec.comment}
                </span>
              )}
            </div>
          );
        },
      },
      {
        id: "content",
        header: t("dns.recordContent"),
        cell: (rec) => (
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-foreground">{rec.content}</span>
            <CopyButton text={rec.content} label="" className="h-5 w-5 p-0" />
          </div>
        ),
      },
      {
        id: "proxy",
        header: t("dns.proxyStatus"),
        cell: (rec) => <CloudflareProxyBadge proxied={rec.proxied} />,
      },
      {
        id: "ttl",
        header: t("dns.ttl"),
        className: "text-muted-foreground font-mono",
        cell: (rec) => formatTtl(rec.ttl),
      },
      {
        id: "actions",
        header: t("common.actions"),
        align: "right",
        cell: (rec) =>
          onDeleteRecord ? (
            <Button
              variant="ghost"
              size="sm"
              disabled={deletingId === rec.id}
              onClick={() => handleDelete(rec.id)}
              className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
              title={t("dns.deleteRecord")}
            >
              {deletingId === rec.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </Button>
          ) : null,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deletingId, onDeleteRecord, t],
  );

  const filters: DataTableFilterConfig<DnsRecord>[] = useMemo(
    () => [
      {
        id: "type",
        label: t("dns.recordType"),
        defaultValue: "ALL",
        options: [
          { label: t("common.all"), value: "ALL" },
          { label: "A", value: "A" },
          { label: "AAAA", value: "AAAA" },
          { label: "CNAME", value: "CNAME" },
          { label: "TXT", value: "TXT" },
          { label: "NS", value: "NS" },
        ],
        filterFn: (rec, val) => rec.type?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [t],
  );

  const actions = onCleanupRecords && (
    <Button
      size="sm"
      variant="outline"
      disabled={cleaning}
      onClick={handleCleanup}
      className="h-9 px-3.5 rounded-full border-border bg-card hover:bg-muted text-foreground font-semibold text-xs gap-2 shadow-sm"
    >
      {cleaning ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
      )}
      {t("dns.cleanupExpired")}
    </Button>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          {t("dns.auditTitle")}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {t("dns.auditSubtitle")}
        </p>
      </div>

      <DataTable<DnsRecord>
        data={records}
        columns={columns}
        keyExtractor={(rec) => rec.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder={t("dns.searchPlaceholder")}
        searchButtonText={t("common.search")}
        searchAccessor={(rec) => [
          rec.name,
          rec.domain_name,
          rec.content,
          rec.user_id,
          rec.comment,
        ]}
        filters={filters}
        paginated={true}
        pageSize={10}
        entityName="record DNS"
        actions={actions}
        emptyIcon={Globe}
        emptyTitle={t("dns.noGlobalRecords")}
        emptyDescription={t("dns.noGlobalRecords")}
      />
    </div>
  );
}
