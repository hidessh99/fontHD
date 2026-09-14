// ==============================================================================
// GoVPN DNS Admin Global Record Table Component
// Part of Pola C: components/admin/AdminGlobalRecordTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
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
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [cleaning, setCleaning] = useState(false);

  const handleDelete = async (id: string | number) => {
    if (!confirm("Hapus record DNS ini dari zona Cloudflare?")) return;
    setDeletingId(id);
    try {
      if (onDeleteRecord) {
        await onDeleteRecord(id);
        toast.success("Record DNS berhasil dihapus");
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
        `Pembersihan Selesai: ${res?.cleaned_count ?? 0} record kadaluarsa dihapus`,
      );
    } catch {
      toast.error("Gagal menjalankan pembersihan record");
    } finally {
      setCleaning(false);
    }
  };

  const formatTtl = (ttl: number) => {
    if (ttl === 1) return "Auto";
    if (ttl < 60) return `${ttl}s`;
    if (ttl < 3600) return `${Math.round(ttl / 60)}m`;
    return `${Math.round(ttl / 3600)}h`;
  };

  const columns: ColumnDef<DnsRecord>[] = useMemo(
    () => [
      {
        id: "type",
        header: "Tipe",
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
        header: "Nama Host / FQDN",
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
        header: "Target IP / Value",
        cell: (rec) => (
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-foreground">{rec.content}</span>
            <CopyButton text={rec.content} label="" className="h-5 w-5 p-0" />
          </div>
        ),
      },
      {
        id: "proxy",
        header: "Proxy CF",
        cell: (rec) => <CloudflareProxyBadge proxied={rec.proxied} />,
      },
      {
        id: "ttl",
        header: "TTL",
        className: "text-muted-foreground font-mono",
        cell: (rec) => formatTtl(rec.ttl),
      },
      {
        id: "actions",
        header: "Aksi",
        align: "right",
        cell: (rec) =>
          onDeleteRecord ? (
            <Button
              variant="ghost"
              size="sm"
              disabled={deletingId === rec.id}
              onClick={() => handleDelete(rec.id)}
              className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
              title="Hapus Record"
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
    [deletingId, onDeleteRecord],
  );

  const filters: DataTableFilterConfig<DnsRecord>[] = useMemo(
    () => [
      {
        id: "type",
        label: "Tipe Record",
        defaultValue: "ALL",
        options: [
          { label: "Semua Tipe", value: "ALL" },
          { label: "A", value: "A" },
          { label: "AAAA", value: "AAAA" },
          { label: "CNAME", value: "CNAME" },
          { label: "TXT", value: "TXT" },
          { label: "NS", value: "NS" },
        ],
        filterFn: (rec, val) => rec.type?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [],
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
      Bersihkan Record Kadaluarsa
    </Button>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          Audit Global DNS Record
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Semua record DNS yang dibuat oleh seluruh pengguna di seluruh zona domain
        </p>
      </div>

      <DataTable<DnsRecord>
        data={records}
        columns={columns}
        keyExtractor={(rec) => rec.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder="Cari host, domain, IP, user ID..."
        searchButtonText="Cari"
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
        emptyTitle="Tidak Ada Record DNS"
        emptyDescription="Belum ada record DNS yang terdaftar dalam sistem."
      />
    </div>
  );
}
