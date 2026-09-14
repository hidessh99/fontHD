// ==============================================================================
// GoVPN Admin Queue Table Component
// Part of Pola C: components/admin/AdminQueueTable.tsx
// 100% Coinbase Institutional Design System (Message Queue Monitor & Control)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { QueueItem, NotificationChannel, QueueStatus } from "../../types/notification.types";
import { QueueStatusBadge } from "../shared/QueueStatusBadge";
import { ChannelBadge } from "../shared/ChannelBadge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { Bell, Trash2, Search, RefreshCw, Layers } from "lucide-react";

interface AdminQueueTableProps {
  queue: QueueItem[];
  onDeleteQueueItem: (id: string | number) => Promise<unknown>;
}

export function AdminQueueTable({
  queue,
  onDeleteQueueItem,
}: AdminQueueTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [channelFilter, setChannelFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredQueue = queue.filter((item) => {
    const matchesSearch =
      item.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subject && item.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = channelFilter === "ALL" || item.channel === channelFilter;
    const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
    return matchesSearch && matchesChannel && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari penerima, subjek, atau pesan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto pb-1 sm:pb-0">
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-border/50 bg-background/50 text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="ALL">Semua Saluran</option>
            <option value="EMAIL">Email</option>
            <option value="TELEGRAM">Telegram</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="PUSH">Push</option>
            <option value="IN_APP">In-App</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-border/50 bg-background/50 text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="ALL">Semua Status</option>
            <option value="PENDING">Menunggu (Pending)</option>
            <option value="PROCESSING">Memproses (Processing)</option>
            <option value="SENT">Terkirim (Sent)</option>
            <option value="FAILED">Gagal (Failed)</option>
            <option value="CANCELLED">Dibatalkan (Cancelled)</option>
          </select>
        </div>
      </div>

      {/* Queue Table */}
      {filteredQueue.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="Antrean Kosong"
          description="Tidak ada item dalam antrean pesan pengiriman saat ini."
        />
      ) : (
        <div className="rounded-xl border border-border/50 overflow-hidden bg-card/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border/40">
                <tr>
                  <th className="p-3.5 font-semibold">Saluran</th>
                  <th className="p-3.5 font-semibold">Penerima</th>
                  <th className="p-3.5 font-semibold">Pesan / Subjek</th>
                  <th className="p-3.5 font-semibold">Status</th>
                  <th className="p-3.5 font-semibold">Percobaan</th>
                  <th className="p-3.5 font-semibold">Dibuat</th>
                  <th className="p-3.5 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredQueue.map((item) => (
                  <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                    <td className="p-3.5 whitespace-nowrap">
                      <ChannelBadge channel={item.channel} />
                    </td>
                    <td className="p-3.5 whitespace-nowrap font-mono font-medium text-foreground">
                      {item.recipient}
                    </td>
                    <td className="p-3.5 max-w-sm">
                      {item.subject && (
                        <div className="font-semibold text-foreground truncate">{item.subject}</div>
                      )}
                      <div className="text-muted-foreground line-clamp-1 text-[11px]">
                        {item.message}
                      </div>
                      {item.error_message && (
                        <div className="text-red-400 font-mono text-[10px] mt-0.5">
                          Error: {item.error_message}
                        </div>
                      )}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <QueueStatusBadge status={item.status} />
                    </td>
                    <td className="p-3.5 whitespace-nowrap font-mono">
                      {item.attempts} / {item.max_attempts || 3}
                    </td>
                    <td className="p-3.5 whitespace-nowrap text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onDeleteQueueItem(item.id)}
                        title="Hapus dari antrean"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
