// ==============================================================================
// GoVPN Admin Ticket Table Component
// Part of Pola C: components/admin/AdminTicketTable.tsx
// 100% Coinbase Institutional Design System (Global Ticket Fleet & Operations)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Ticket, TicketStatus } from "../../types/support.types";
import { TicketStatusBadge } from "../shared/TicketStatusBadge";
import { TicketPriorityBadge } from "../shared/TicketPriorityBadge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  LifeBuoy,
  Search,
  CheckCircle2,
  PlayCircle,
  XCircle,
  Trash2,
  MessageSquare,
  User,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(t.ticket_number || t.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.user_email && t.user_email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari nomor tiket, subjek, atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-background/50 border border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {st === "ALL" ? "Semua Status" : st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Table */}
      {filteredTickets.length === 0 ? (
        <EmptyState
          icon={LifeBuoy}
          title="Tidak Ada Tiket"
          description="Tidak ditemukan tiket bantuan yang sesuai dengan filter pencarian."
        />
      ) : (
        <div className="rounded-xl border border-border/50 overflow-hidden bg-card/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border/40">
                <tr>
                  <th className="p-3.5 font-semibold">Tiket</th>
                  <th className="p-3.5 font-semibold">Pengguna / Dept</th>
                  <th className="p-3.5 font-semibold">Subjek</th>
                  <th className="p-3.5 font-semibold">Prioritas</th>
                  <th className="p-3.5 font-semibold">Status</th>
                  <th className="p-3.5 font-semibold">Tanggal</th>
                  <th className="p-3.5 font-semibold text-right">Aksi Operasional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-accent/30 transition-colors group cursor-pointer"
                    onClick={() => onSelectTicket(ticket)}
                  >
                    <td className="p-3.5 font-mono font-bold text-primary whitespace-nowrap">
                      #{ticket.ticket_number || ticket.id}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{ticket.user_name || ticket.user_email || `User #${ticket.user_id}`}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {ticket.department || "General"}
                      </span>
                    </td>
                    <td className="p-3.5 max-w-xs truncate font-medium text-foreground">
                      {ticket.subject}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <TicketPriorityBadge priority={ticket.priority} />
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <TicketStatusBadge status={ticket.status} />
                    </td>
                    <td className="p-3.5 whitespace-nowrap text-muted-foreground">
                      {new Date(ticket.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td
                      className="p-3.5 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="inline-flex items-center gap-1">
                        {ticket.status === "OPEN" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-amber-500 hover:text-amber-600 hover:bg-amber-500/10 text-[11px]"
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
                            className="h-7 px-2 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 text-[11px]"
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
                            className="h-7 px-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-500/10 text-[11px]"
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
                          className="h-7 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10 text-[11px]"
                          onClick={() => onSelectTicket(ticket)}
                          title="Buka Diskusi"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-[11px]"
                          onClick={() => onDelete(ticket.id)}
                          title="Hapus Tiket"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
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
