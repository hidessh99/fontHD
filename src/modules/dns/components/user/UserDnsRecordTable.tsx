// ==============================================================================
// GoVPN DNS User Record Table Component
// Part of Pola C: components/user/UserDnsRecordTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// Fully Localized with useI18n (EN/ID)
// ==============================================================================

"use client";

import React, { useMemo } from "react";
import { DnsRecord } from "../../types/dns.types";
import { DnsTypeBadge } from "../shared/DnsTypeBadge";
import { CloudflareProxyBadge } from "../shared/CloudflareProxyBadge";
import { CopyButton } from "@/components/shared/CopyButton";
import { Button } from "@/components/ui/button";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import { Trash2, Globe, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface UserDnsRecordTableProps {
  records: DnsRecord[];
  onDeleteRecord?: (id: string | number) => void;
  deletingId?: string | number | null;
}

export function UserDnsRecordTable({
  records,
  onDeleteRecord,
  deletingId,
}: UserDnsRecordTableProps) {
  const { t } = useI18n();

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
            <span className="text-foreground font-semibold bg-surface border border-border/60 px-2 py-0.5 rounded text-[11px]">
              {rec.content}
            </span>
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
        cell: (rec) => (
          <div className="flex items-center gap-1 text-muted-foreground font-mono">
            <Clock className="h-3 w-3 shrink-0" />
            <span>{formatTtl(rec.ttl)}</span>
          </div>
        ),
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
              onClick={() => onDeleteRecord(rec.id)}
              className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
              title={t("dns.deleteRecord")}
            >
              <Trash2 className="h-3.5 w-3.5" />
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
        ],
        filterFn: (rec, val) => rec.type?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [t],
  );

  return (
    <DataTable<DnsRecord>
      data={records}
      columns={columns}
      keyExtractor={(rec) => rec.id}
      searchable={true}
      searchPlaceholder={t("dns.searchPlaceholder")}
      searchButtonText={t("common.search")}
      searchAccessor={(rec) => [
        rec.name,
        rec.domain_name,
        rec.content,
        rec.comment,
      ]}
      filters={filters}
      paginated={true}
      pageSize={10}
      entityName="record DNS"
      emptyIcon={Globe}
      emptyTitle={t("dns.noRecords")}
      emptyDescription={t("dns.noRecordsDesc")}
    />
  );
}
