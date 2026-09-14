// ==============================================================================
// GoVPN Admin Queue Table Component
// Part of Pola C: components/admin/AdminQueueTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useMemo } from "react";
import { QueueItem } from "../../types/notification.types";
import { QueueStatusBadge } from "../shared/QueueStatusBadge";
import { ChannelBadge } from "../shared/ChannelBadge";
import { Button } from "@/components/ui/button";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import { Trash2, Layers } from "lucide-react";

interface AdminQueueTableProps {
  queue: QueueItem[];
  onDeleteQueueItem: (id: string | number) => Promise<unknown>;
}

export function AdminQueueTable({
  queue,
  onDeleteQueueItem,
}: AdminQueueTableProps) {
  const columns: ColumnDef<QueueItem>[] = useMemo(
    () => [
      {
        id: "channel",
        header: "Saluran",
        cell: (item) => <ChannelBadge channel={item.channel} />,
      },
      {
        id: "recipient",
        header: "Penerima",
        className: "font-mono font-medium text-foreground",
        cell: (item) => item.recipient,
      },
      {
        id: "message",
        header: "Pesan / Subjek",
        className: "max-w-sm",
        cell: (item) => (
          <div>
            {item.subject && (
              <div className="font-semibold text-foreground truncate">
                {item.subject}
              </div>
            )}
            <div className="text-muted-foreground line-clamp-1 text-[11px]">
              {item.message}
            </div>
            {item.error_message && (
              <div className="text-red-400 font-mono text-[10px] mt-0.5">
                Error: {item.error_message}
              </div>
            )}
          </div>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: (item) => <QueueStatusBadge status={item.status} />,
      },
      {
        id: "attempts",
        header: "Percobaan",
        className: "font-mono",
        cell: (item) => `${item.attempts} / ${item.max_attempts || 3}`,
      },
      {
        id: "created_at",
        header: "Dibuat",
        className: "text-muted-foreground whitespace-nowrap",
        cell: (item) =>
          new Date(item.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
      {
        id: "actions",
        header: "Aksi",
        align: "right",
        cell: (item) => (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
            onClick={() => onDeleteQueueItem(item.id)}
            title="Hapus dari antrean"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        ),
      },
    ],
    [onDeleteQueueItem],
  );

  const filters: DataTableFilterConfig<QueueItem>[] = useMemo(
    () => [
      {
        id: "channel",
        label: "Saluran",
        defaultValue: "ALL",
        options: [
          { label: "Semua Saluran", value: "ALL" },
          { label: "Email", value: "EMAIL" },
          { label: "Telegram", value: "TELEGRAM" },
          { label: "WhatsApp", value: "WHATSAPP" },
          { label: "Push", value: "PUSH" },
          { label: "In-App", value: "IN_APP" },
        ],
        filterFn: (item, val) => item.channel?.toUpperCase() === val.toUpperCase(),
      },
      {
        id: "status",
        label: "Status",
        defaultValue: "ALL",
        options: [
          { label: "Semua Status", value: "ALL" },
          { label: "Menunggu", value: "PENDING" },
          { label: "Memproses", value: "PROCESSING" },
          { label: "Terkirim", value: "SENT" },
          { label: "Gagal", value: "FAILED" },
          { label: "Dibatalkan", value: "CANCELLED" },
        ],
        filterFn: (item, val) => item.status?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [],
  );

  return (
    <DataTable<QueueItem>
      data={queue}
      columns={columns}
      keyExtractor={(item) => item.id}
      searchable={true}
      searchPlaceholder="Cari penerima, subjek, pesan..."
      searchButtonText="Cari"
      searchAccessor={(item) => [item.recipient, item.subject, item.message]}
      filters={filters}
      paginated={true}
      pageSize={10}
      entityName="antrean pesan"
      emptyIcon={Layers}
      emptyTitle="Antrean Kosong"
      emptyDescription="Tidak ada item dalam antrean pesan pengiriman saat ini."
    />
  );
}
