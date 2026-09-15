// ==============================================================================
// GoVPN Ticket Conversation View Component
// Part of Pola C: components/user/TicketConversationView.tsx
// 100% Coinbase Institutional Design System (Live Helpdesk Chat Thread)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Ticket, TicketReply } from "../../types/support.types";
import { TicketStatusBadge } from "../shared/TicketStatusBadge";
import { TicketPriorityBadge } from "../shared/TicketPriorityBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Loader2,
  CheckCircle2,
  User,
  ShieldCheck,
  ArrowLeft,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

interface TicketConversationViewProps {
  ticket: Ticket;
  replies: TicketReply[];
  onBack?: () => void;
  onSendReply: (message: string, idempotencyKey: string) => Promise<unknown>;
  onCloseTicket: () => Promise<unknown>;
  loadingReplies?: boolean;
}

export function TicketConversationView({
  ticket,
  replies,
  onBack,
  onSendReply,
  onCloseTicket,
  loadingReplies,
}: TicketConversationViewProps) {
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setSending(true);
    const idempotencyKey = crypto.randomUUID();

    try {
      await onSendReply(replyText.trim(), idempotencyKey);
      setReplyText("");
      toast.success("Balasan berhasil dikirim");
    } catch {
      toast.error("Gagal mengirim balasan");
    } finally {
      setSending(false);
    }
  };

  const handleClose = async () => {
    setClosing(true);
    try {
      await onCloseTicket();
      toast.success("Tiket telah ditutup");
    } catch {
      toast.error("Gagal menutup tiket");
    } finally {
      setClosing(false);
    }
  };

  const isClosed = ticket.status === "CLOSED" || ticket.status === "RESOLVED";

  return (
    <div className="flex flex-col h-full rounded-2xl border border-border/50 bg-card overflow-hidden">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-border/40 bg-card/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors mr-1 sm:hidden"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <span className="font-mono text-xs font-bold text-primary">
              #{ticket.ticket_number || ticket.id}
            </span>
            <TicketStatusBadge status={ticket.status} />
            <TicketPriorityBadge priority={ticket.priority} />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            {ticket.subject}
          </h2>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>Kategori: {ticket.department || "General"}</span>
            <span>•</span>
            <span>
              Dibuka:{" "}
              {new Date(ticket.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {!isClosed && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClose}
            disabled={closing}
            className="text-xs gap-1.5 border-border/50 hover:bg-destructive/10 hover:text-destructive self-start sm:self-auto"
          >
            {closing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <XCircle className="w-3.5 h-3.5" />
            )}
            <span>Tandai Selesai / Tutup</span>
          </Button>
        )}
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[500px]">
        {/* Original Issue Ticket Body */}
        <div className="p-4 rounded-xl bg-accent/30 border border-border/40 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-foreground">
                {ticket.user_name || "Anda"} (Pembuat Tiket)
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {new Date(ticket.created_at).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed pl-9">
            {ticket.description}
          </p>
        </div>

        {/* Replies */}
        {loadingReplies ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          replies.map((reply) => {
            const isAdmin =
              reply.user_role === "ADMIN" ||
              reply.user_role === "AGENT" ||
              reply.user_role === "SUPERADMIN";

            return (
              <div
                key={reply.id}
                className={`p-4 rounded-xl border space-y-2 ${
                  isAdmin
                    ? "bg-primary/5 border-primary/20 ml-4 sm:ml-8"
                    : "bg-accent/30 border-border/40 mr-4 sm:mr-8"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isAdmin
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {isAdmin ? (
                        <ShieldCheck className="w-3.5 h-3.5" />
                      ) : (
                        <User className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-foreground">
                      {reply.user_name ||
                        (isAdmin ? "GoVPN Technical Support" : "Anda")}
                    </span>
                    {isAdmin && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-primary/20 text-primary font-bold">
                        STAFF
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(reply.created_at).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed pl-9">
                  {reply.message}
                </p>
              </div>
            );
          })
        )}

        {isClosed && (
          <div className="p-3 rounded-lg bg-muted/40 border border-border/30 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>
              Tiket ini telah ditutup. Silakan buat tiket baru jika masih
              mengalami kendala.
            </span>
          </div>
        )}
      </div>

      {/* Reply Input Bar */}
      {!isClosed && (
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-border/40 bg-card/50 flex gap-3"
        >
          <Input
            type="text"
            placeholder="Ketik balasan atau update kendala Anda di sini..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm rounded-xl border-border/50 bg-background/50 h-auto"
          />
          <Button
            type="submit"
            disabled={sending || !replyText.trim()}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-5"
          >
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Kirim</span>
          </Button>
        </form>
      )}
    </div>
  );
}
