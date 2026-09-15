// ==============================================================================
// GoVPN Admin Ticket Detail & Reply Modal Component
// Part of Pola C: components/admin/AdminTicketDetailModal.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Ticket, TicketReply, TicketStatus } from "../../types/support.types";
import { AdminCreateReplyDto } from "../../types/admin.types";
import { TicketStatusBadge } from "../shared/TicketStatusBadge";
import { TicketPriorityBadge } from "../shared/TicketPriorityBadge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { Send, Loader2, Trash2, Lock, User, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface AdminTicketDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: Ticket | null;
  replies: TicketReply[];
  onSendReply: (dto: AdminCreateReplyDto) => Promise<unknown>;
  onDeleteReply: (replyId: string | number) => Promise<unknown>;
  onUpdateStatus: (status: TicketStatus) => Promise<unknown>;
  loadingReplies?: boolean;
}

export function AdminTicketDetailModal({
  open,
  onOpenChange,
  ticket,
  replies,
  onSendReply,
  onDeleteReply,
  onUpdateStatus,
  loadingReplies,
}: AdminTicketDetailModalProps) {
  const [replyMessage, setReplyMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!ticket) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    setSubmitting(true);
    try {
      await onSendReply({
        message: replyMessage.trim(),
        is_internal: isInternal,
      });
      setReplyMessage("");
      setIsInternal(false);
      toast.success(
        isInternal
          ? "Catatan internal disimpan"
          : "Balasan terkirim ke pengguna",
      );
    } catch {
      toast.error("Gagal mengirim balasan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-162.5 max-h-[85vh] flex flex-col bg-card border-border/60 p-0 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-border/40 bg-muted/20 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-primary">
                #{ticket.ticket_number || ticket.id}
              </span>
              <TicketStatusBadge status={ticket.status} />
              <TicketPriorityBadge priority={ticket.priority} />
            </div>

            {/* Quick Status Override Selector */}
            <NativeSelect
              value={ticket.status}
              onChange={(e) => onUpdateStatus(e.target.value as TicketStatus)}
              size="sm"
              wrapperClassName="w-auto"
              className="text-xs font-semibold h-7"
            >
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="CLOSED">CLOSED</option>
            </NativeSelect>
          </div>

          <DialogTitle className="text-base font-bold text-foreground">
            {ticket.subject}
          </DialogTitle>

          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span>
              Pelapor:{" "}
              {ticket.user_name ||
                ticket.user_email ||
                `User #${ticket.user_id}`}
            </span>
            <span>•</span>
            <span>Kategori: {ticket.department || "Umum"}</span>
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-95">
          {/* Main User Ticket Post */}
          <div className="p-3.5 rounded-xl bg-accent/30 border border-border/40 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                {ticket.user_name || "Pengguna"}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {new Date(ticket.created_at).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-xs text-foreground/90 whitespace-pre-wrap pl-5">
              {ticket.description}
            </p>
          </div>

          {/* Replies */}
          {loadingReplies ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            replies.map((r) => {
              const isAdmin =
                r.user_role === "ADMIN" || r.user_role === "SUPERADMIN";
              return (
                <div
                  key={r.id}
                  className={`p-3.5 rounded-xl border space-y-1.5 ${
                    r.is_internal
                      ? "bg-amber-500/10 border-amber-500/30"
                      : isAdmin
                        ? "bg-primary/5 border-primary/20 ml-6"
                        : "bg-accent/30 border-border/40 mr-6"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      {r.is_internal ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/20 px-1.5 py-0.5 rounded">
                          <Lock className="w-3 h-3" /> INTERNAL NOTE
                        </span>
                      ) : isAdmin ? (
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                      <span className="font-semibold text-foreground">
                        {r.user_name || (isAdmin ? "GoVPN Support" : "User")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(r.created_at).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <button
                        onClick={() => onDeleteReply(r.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        title="Hapus Pesan"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/90 whitespace-pre-wrap pl-5">
                    {r.message}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Action / Reply Bar */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-border/40 bg-card space-y-3"
        >
          <Textarea
            rows={2}
            required
            placeholder={
              isInternal
                ? "Tulis catatan internal (hanya terlihat oleh tim admin)..."
                : "Tulis balasan langsung ke tiket pengguna..."
            }
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="text-xs resize-none"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="flex items-center gap-1 font-medium">
                <Lock className="w-3 h-3 text-amber-500" />
                Catatan Internal (Internal Only)
              </span>
            </label>

            <Button
              type="submit"
              size="sm"
              disabled={submitting || !replyMessage.trim()}
              className="gap-1.5 text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {submitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>{isInternal ? "Simpan Catatan" : "Kirim Balasan"}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
