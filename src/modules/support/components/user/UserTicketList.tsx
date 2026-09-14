// ==============================================================================
// GoVPN User Ticket List Component
// Part of Pola C: components/user/UserTicketList.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

"use client";

import React from "react";
import { Ticket } from "../../types/support.types";
import { TicketStatusBadge } from "../shared/TicketStatusBadge";
import { TicketPriorityBadge } from "../shared/TicketPriorityBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { MessageSquare, ChevronRight, Clock, LifeBuoy } from "lucide-react";

interface UserTicketListProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
  selectedTicketId?: string | number;
}

export function UserTicketList({
  tickets,
  onSelectTicket,
  selectedTicketId,
}: UserTicketListProps) {
  if (tickets.length === 0) {
    return (
      <EmptyState
        icon={LifeBuoy}
        title="Belum Ada Tiket Bantuan"
        description="Jika Anda mengalami kendala konektivitas atau pertanyaan teknis, ajukan tiket baru."
      />
    );
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => {
        const isSelected = String(ticket.id) === String(selectedTicketId);
        return (
          <div
            key={ticket.id}
            onClick={() => onSelectTicket(ticket)}
            className={`group p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
              isSelected
                ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                : "border-border/50 bg-card/60 hover:bg-accent/40 hover:border-border"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-primary">
                    #{ticket.ticket_number || ticket.id}
                  </span>
                  <TicketStatusBadge status={ticket.status} />
                  <TicketPriorityBadge priority={ticket.priority} />
                  {ticket.department && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                      {ticket.department}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {ticket.subject}
                </h3>

                <p className="text-xs text-muted-foreground line-clamp-1">
                  {ticket.description}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-muted-foreground shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {new Date(
                      ticket.last_reply_at || ticket.created_at,
                    ).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
