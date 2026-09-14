// ==============================================================================
// GoVPN DNS Admin Global Record Table Component
// Part of Pola C: components/admin/AdminGlobalRecordTable.tsx
// 100% Coinbase Institutional Design System (Global Audit & Cleanup Routine)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { DnsRecord } from "../../types/dns.types";
import { DnsTypeBadge } from "../shared/DnsTypeBadge";
import { CloudflareProxyBadge } from "../shared/CloudflareProxyBadge";
import { CopyButton } from "@/components/shared/CopyButton";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { Trash2, Globe, Clock, Sparkles, Loader2, User } from "lucide-react";
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Audit Global DNS Record
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Semua record DNS yang dibuat oleh seluruh pengguna di seluruh zona
            domain
          </p>
        </div>

        {onCleanupRecords && (
          <Button
            size="sm"
            variant="outline"
            disabled={cleaning}
            onClick={handleCleanup}
            className="h-9 px-3.5 rounded-xl border-border bg-card hover:bg-muted text-foreground font-semibold text-xs gap-2 shadow-sm"
          >
            {cleaning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            )}
            Bersihkan Record Kadaluarsa
          </Button>
        )}
      </div>

      {records.length === 0 ? (
        <EmptyState
          icon={Globe}
          title="Tidak Ada Record DNS"
          description="Belum ada record DNS yang terdaftar dalam sistem."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">Tipe</th>
                <th className="px-5 py-4 font-sans">User ID</th>
                <th className="px-5 py-4 font-sans">Nama Host / FQDN</th>
                <th className="px-5 py-4 font-sans">Target IP / Value</th>
                <th className="px-5 py-4 font-sans">Proxy CF</th>
                <th className="px-5 py-4 font-sans">TTL</th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {records.map((rec) => {
                const fqdn = rec.domain_name
                  ? `${rec.name}.${rec.domain_name}`
                  : rec.name;

                return (
                  <tr
                    key={rec.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <DnsTypeBadge type={rec.type} />
                    </td>

                    <td className="px-5 py-3.5 font-sans">
                      {rec.user_id ? (
                        <div className="flex items-center gap-1.5 text-foreground text-[11px] font-mono">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span>#{rec.user_id}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-[11px]">
                          System
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-foreground">
                            {rec.name}
                          </span>
                          {rec.domain_name && (
                            <span className="text-muted-foreground text-[11px]">
                              .{rec.domain_name}
                            </span>
                          )}
                          <CopyButton
                            text={fqdn}
                            label=""
                            className="h-5 w-5 p-0"
                          />
                        </div>
                        {rec.comment && (
                          <span className="text-[11px] text-muted-foreground font-sans truncate max-w-[200px]">
                            {rec.comment}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-foreground font-semibold bg-surface border border-border/60 px-2 py-0.5 rounded text-[11px]">
                          {rec.content}
                        </span>
                        <CopyButton
                          text={rec.content}
                          label=""
                          className="h-5 w-5 p-0"
                        />
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <CloudflareProxyBadge proxied={rec.proxied} />
                    </td>

                    <td className="px-5 py-3.5 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTtl(rec.ttl)}</span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-right font-sans">
                      {onDeleteRecord && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={deletingId === rec.id}
                          onClick={() => handleDelete(rec.id)}
                          className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                        >
                          {deletingId === rec.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
