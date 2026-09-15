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
import { useI18n } from "@/lib/i18n";

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
  const { t, locale } = useI18n();

  const columns: ColumnDef<Ticket>[] = useMemo(
    () => [
      {
        id: "ticket_number",
        header: t("support.ticket"),
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
        header: t("support.userOrDept"),
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
              {ticket.department || t("support.general")}
            </span>
          </div>
        ),
      },
      {
        id: "subject",
        header: t("support.subject"),
        className: "font-sans font-medium text-foreground max-w-xs",
        cell: (ticket) => (
          <span className="line-clamp-1">{ticket.subject}</span>
        ),
      },
      {
        id: "priority",
        header: t("support.priority"),
        cell: (ticket) => <TicketPriorityBadge priority={ticket.priority} />,
      },
      {
        id: "status",
        header: t("support.status"),
        cell: (ticket) => <TicketStatusBadge status={ticket.status} />,
      },
      {
        id: "created_at",
        header: t("support.date"),
        className: "font-sans text-muted-foreground whitespace-nowrap",
        cell: (ticket) =>
          new Date(ticket.created_at).toLocaleDateString(
            locale === "id" ? "id-ID" : "en-US",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          ),
      },
      {
        id: "actions",
        header: t("support.operationalActions"),
        align: "right",
        cell: (ticket) => (
          <div className="inline-flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-primary hover:text-primary hover:bg-primary/10 text-[11px] rounded-lg"
              onClick={() => onSelectTicket(ticket)}
              title={t("support.detail")}
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              <span>{t("support.detail")}</span>
            </Button>

            {ticket.status === "OPEN" && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-amber-500 hover:text-amber-600 hover:bg-amber-500/10 text-[11px] rounded-lg"
                onClick={() => onSetInProgress(ticket.id)}
                title={t("support.process")}
              >
                <PlayCircle className="w-3.5 h-3.5 mr-1" />
                <span>{t("support.process")}</span>
              </Button>
            )}

            {ticket.status !== "RESOLVED" && ticket.status !== "CLOSED" && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 text-[11px] rounded-lg"
                onClick={() => onResolve(ticket.id)}
                title={t("support.resolve")}
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                <span>{t("support.resolve")}</span>
              </Button>
            )}

            {ticket.status !== "CLOSED" && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 text-[11px] rounded-lg"
                onClick={() => onClose(ticket.id)}
                title={t("support.close")}
              >
                <XCircle className="w-3.5 h-3.5 mr-1" />
                <span>{t("support.close")}</span>
              </Button>
            )}

            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
              onClick={() => onDelete(ticket.id)}
              title={t("support.deleteTicket")}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ),
      },
    ],
    [locale, onClose, onDelete, onResolve, onSelectTicket, onSetInProgress, t],
  );

  const filters: DataTableFilterConfig<Ticket>[] = useMemo(
    () => [
      {
        id: "status",
        label: t("support.status"),
        defaultValue: "ALL",
        options: [
          { label: t("support.allStatus"), value: "ALL" },
          { label: "OPEN", value: "OPEN" },
          { label: "IN PROGRESS", value: "IN_PROGRESS" },
          { label: "RESOLVED", value: "RESOLVED" },
          { label: "CLOSED", value: "CLOSED" },
        ],
        filterFn: (tItem, val) => tItem.status?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [t],
  );

  return (
    <DataTable<Ticket>
      data={tickets}
      columns={columns}
      keyExtractor={(ticket) => ticket.id}
      searchable={true}
      searchPlaceholder={t("support.searchPlaceholder")}
      searchButtonText={t("common.search", "Search")}
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
      entityName={t("support.entityName")}
      emptyIcon={LifeBuoy}
      emptyTitle={t("support.noAdminTickets")}
      emptyDescription={t("support.noAdminTicketsDesc")}
    />
  );
}
