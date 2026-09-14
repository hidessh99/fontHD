// ==============================================================================
// GoVPN Admin Ticket Table Component
// Part of Pola C: components/admin/AdminTicketTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useMemo } from "react";
import { Ticket } from "../../types/support.types";
import { TicketStatusBadge } from "../shared/TicketStatusBadge";
import { TicketPriorityBadge } from "../shared/TicketPriorityBadge";
import { Button } from "@/components/ui/button";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import {
  LifeBuoy,
  CheckCircle2,
  PlayCircle,
  XCircle,
  Trash2,
  User,
  ExternalLink,
} from "lucide-react";

interface AdminTicketTableProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
  onSetInProgress: (id: string | number) => Promise<unknown>;
  onResolve: (id: string | number) => Promise<unknown>;
  onClose: (id: string | number) => Promise<unknown>;
  onDelete: (id: string | number) => Promise<unknown>;
}

export function AdminTicketTable({
  tickets,
  onSelectTicket,
  onSetInProgress,
  onResolve,
  onClose,
  onDelete,
}: AdminTicketTableProps) {
  const columns: ColumnDef<Ticket>[] = useMemo(
    () => [
      {
        id: "ticket_number",
        header: "Tiket",
        cell: (ticket) => (
          <button
            type="button"
            onClick={() => onSelectTicket(ticket)}
            className="font-mono font-bold text-primary hover:underline text-left cursor-pointer"
          >
            #{ticket.ticket_number || ticket.id}
          </button>
        ),
      },
      {
        id: "user",
        header: "Pengguna / Dept",
        cell: (ticket) => (
          <div className="flex flex-col font-sans">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span>
                {ticket.user_name ||
                  ticket.user_email ||
                  `User #${ticket.user_id}`}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">
              {ticket.department || "General"}
            </span>
          </div>
        ),
      },
      {
        id: "subject",
        header: "Subjek",
        className: "font-sans font-medium text-foreground max-w-xs",
        cell: (ticket) => (
          <span className="line-clamp-1">{ticket.subject}</span>
        ),
      },
      {
        id: "priority",
        header: "Prioritas",
        cell: (ticket) => <TicketPriorityBadge priority={ticket.priority} />,
      },
      {
        id: "status",
        header: "Status",
        cell: (ticket) => <TicketStatusBadge status={ticket.status} />,
      },
      {
        id: "created_at",
        header: "Tanggal",
        className: "font-sans text-muted-foreground whitespace-nowrap",
        cell: (ticket) =>
          new Date(ticket.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
      },
      {
        id: "actions",
        header: "Aksi Operasional",
        align: "right",
        cell: (ticket) => (
          <div className="inline-flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-primary hover:text-primary hover:bg-primary/10 text-[11px] rounded-lg"
              onClick={() => onSelectTicket(ticket)}
              title="Buka Detail Tiket"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              <span>Detail</span>
            </Button>

            {ticket.status === "OPEN" && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-amber-500 hover:text-amber-600 hover:bg-amber-500/10 text-[11px] rounded-lg"
                onClick={() => onSetInProgress(ticket.id)}
                title="Tandai Sedang Dikerjakan"
              >
                <PlayCircle className="w-3.5 h-3.5 mr-1" />
                <span>Proses</span>
              </Button>
            )}

            {ticket.status !== "RESOLVED" && ticket.status !== "CLOSED" && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 text-[11px] rounded-lg"
                onClick={() => onResolve(ticket.id)}
                title="Selesaikan Tiket"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                <span>Selesai</span>
              </Button>
            )}

            {ticket.status !== "CLOSED" && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 text-[11px] rounded-lg"
                onClick={() => onClose(ticket.id)}
                title="Tutup Tiket"
              >
                <XCircle className="w-3.5 h-3.5 mr-1" />
                <span>Tutup</span>
              </Button>
            )}

            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
              onClick={() => onDelete(ticket.id)}
              title="Hapus Tiket"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ),
      },
    ],
    [onClose, onDelete, onResolve, onSelectTicket, onSetInProgress],
  );

  const filters: DataTableFilterConfig<Ticket>[] = useMemo(
    () => [
      {
        id: "status",
        label: "Status",
        defaultValue: "ALL",
        options: [
          { label: "Semua Status", value: "ALL" },
          { label: "OPEN", value: "OPEN" },
          { label: "IN PROGRESS", value: "IN_PROGRESS" },
          { label: "RESOLVED", value: "RESOLVED" },
          { label: "CLOSED", value: "CLOSED" },
        ],
        filterFn: (t, val) => t.status?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [],
  );

  return (
    <DataTable<Ticket>
      data={tickets}
      columns={columns}
      keyExtractor={(ticket) => ticket.id}
      searchable={true}
      searchPlaceholder="Cari nomor tiket, subjek, email..."
      searchButtonText="Cari"
      searchAccessor={(ticket) => [
        ticket.ticket_number,
        ticket.id,
        ticket.subject,
        ticket.user_name,
        ticket.user_email,
        ticket.department,
      ]}
      filters={filters}
      paginated={true}
      pageSize={10}
      entityName="tiket bantuan"
      emptyIcon={LifeBuoy}
      emptyTitle="Tidak Ada Tiket"
      emptyDescription="Tidak ditemukan tiket bantuan yang sesuai dengan filter pencarian."
    />
  );
}
