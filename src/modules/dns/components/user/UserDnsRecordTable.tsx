// ==============================================================================
// GoVPN DNS User Record Table Component
// Part of Pola C: components/user/UserDnsRecordTable.tsx
// 100% Coinbase Institutional Design System (Host FQDN, Proxy Status, Copy Action)
// ==============================================================================

"use client";

import React from "react";
import { DnsRecord } from "../../types/dns.types";
import { DnsTypeBadge } from "../shared/DnsTypeBadge";
import { CloudflareProxyBadge } from "../shared/CloudflareProxyBadge";
import { CopyButton } from "@/components/shared/CopyButton";
import { Button } from "@/components/ui/button";
import { Trash2, Globe, Clock } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

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
  if (records.length === 0) {
    return (
      <EmptyState
        icon={Globe}
        title="Belum Ada Record DNS"
        description="Buat subdomain VPN kustom pertama Anda menggunakan tombol 'Tambah Record DNS' di atas."
      />
    );
  }

  const formatTtl = (ttl: number) => {
    if (ttl === 1) return "Auto";
    if (ttl < 60) return `${ttl}d`;
    if (ttl < 3600) return `${Math.round(ttl / 60)}m`;
    return `${Math.round(ttl / 3600)}j`;
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
      <table className="w-full text-left text-sm text-muted-foreground font-mono">
        <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-5 py-4">Tipe</th>
            <th className="px-5 py-4">Nama Host / Subdomain</th>
            <th className="px-5 py-4">Target IP / Value</th>
            <th className="px-5 py-4">Proxy Cloudflare</th>
            <th className="px-5 py-4">TTL</th>
            <th className="px-5 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y border-border/40 text-xs">
          {records.map((rec) => {
            const fqdn = rec.domain_name
              ? `${rec.name}.${rec.domain_name}`
              : rec.name;

            return (
              <tr key={rec.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3.5">
                  <DnsTypeBadge type={rec.type} />
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

                <td className="px-5 py-3.5 text-right">
                  {onDeleteRecord && (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === rec.id}
                      onClick={() => onDeleteRecord(rec.id)}
                      className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                      title="Hapus Record DNS"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
