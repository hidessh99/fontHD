"use client";

import React from "react";
import { DnsRecord } from "../types/dns.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { EmptyState } from "@/components/shared/EmptyState";
import { Globe, Trash2, Cloud, Shield } from "lucide-react";

interface DnsRecordTableProps {
  records: DnsRecord[];
  onDeleteRecord: (id: string) => void;
}

export function DnsRecordTable({ records, onDeleteRecord }: DnsRecordTableProps) {
  if (records.length === 0) {
    return (
      <EmptyState
        icon={Globe}
        title="Belum Ada DNS Record"
        description="Tambahkan record DNS A, CNAME, atau TXT untuk memetakan subdomain ke server VPN Anda."
      />
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "A":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "AAAA":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "CNAME":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "TXT":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/70 shadow-xl">
      <table className="w-full text-left text-sm text-zinc-300">
        <thead className="border-b border-zinc-800 bg-zinc-900/80 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <tr>
            <th className="px-5 py-3.5">Tipe</th>
            <th className="px-5 py-3.5">Nama Host (Subdomain)</th>
            <th className="px-5 py-3.5">Target / Nilai</th>
            <th className="px-5 py-3.5">Status Cloudflare</th>
            <th className="px-5 py-3.5">TTL</th>
            <th className="px-5 py-3.5 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60 font-mono text-xs">
          {records.map((rec) => (
            <tr key={rec.id} className="hover:bg-zinc-900/40 transition-colors">
              <td className="px-5 py-3.5">
                <Badge
                  variant="outline"
                  className={`font-mono font-bold text-[11px] ${getTypeColor(rec.type)}`}
                >
                  {rec.type}
                </Badge>
              </td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-1.5 font-bold text-zinc-100">
                  <span>{rec.name}</span>
                  {rec.domain_name && (
                    <span className="text-zinc-500 font-normal">
                      .{rec.domain_name}
                    </span>
                  )}
                </div>
                {rec.comment && (
                  <span className="font-sans text-[11px] text-zinc-500 line-clamp-1">
                    {rec.comment}
                  </span>
                )}
              </td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-1.5 text-zinc-200">
                  <span className="truncate max-w-[240px]">{rec.content}</span>
                  <CopyButton text={rec.content} label="Target" />
                </div>
              </td>
              <td className="px-5 py-3.5 font-sans">
                {rec.proxied ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-medium text-amber-400">
                    <Cloud className="h-3 w-3 fill-amber-400" />
                    Proxied (CDN)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
                    <Shield className="h-3 w-3" />
                    DNS Only
                  </span>
                )}
              </td>
              <td className="px-5 py-3.5 font-sans text-zinc-400">
                {rec.ttl === 1 ? "Auto" : `${rec.ttl}s`}
              </td>
              <td className="px-5 py-3.5 text-right font-sans">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteRecord(rec.id)}
                  className="h-7 w-7 p-0 text-zinc-500 hover:text-rose-400 hover:bg-rose-950/20"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
