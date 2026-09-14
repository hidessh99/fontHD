// ==============================================================================
// GoVPN Admin Support & Helpdesk Fleet View
// Part of Pola C: views/admin/AdminSupportView.tsx
// Algoritma 4: Dynamic Island Route Component
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useSupportAdmin } from "../../hooks/useSupportAdmin";
import { SupportSkeleton } from "../../components/shared/SupportSkeleton";
import { AdminTicketTable } from "../../components/admin/AdminTicketTable";
import { AdminTicketDetailModal } from "../../components/admin/AdminTicketDetailModal";
import { Ticket } from "../../types/support.types";
import { RefreshCw, ShieldAlert, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function AdminSupportView() {
  const {
    tickets,
    selectedTicket,
    replies,
    loading,
    loadingReplies,
    setSelectedTicket,
    setInProgress,
    resolveTicket,
    closeTicket,
    deleteTicket,
    updateStatus,
    sendReply,
    deleteReply,
    cleanupTickets,
    refresh,
  } = useSupportAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cleaning, setCleaning] = useState(false);

  if (loading) {
    return <SupportSkeleton />;
  }

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCleanup = async () => {
    setCleaning(true);
    try {
      await cleanupTickets();
      toast.success("Pembersihan tiket kedaluwarsa berhasil dieksekusi!");
    } catch {
      toast.error("Gagal menjalankan pembersihan tiket");
    } finally {
      setCleaning(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-medium text-red-500 mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Superadmin Helpdesk
            Operations
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Operasional Tiket & Helpdesk
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Respon keluhan pelanggan, catat nota investigasi internal, dan
            kelola eskalasi isu jaringan VPN.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              refresh();
              toast.info("Data tiket diperbarui");
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-border/50 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Segarkan</span>
          </button>
          <button
            onClick={handleCleanup}
            disabled={cleaning}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border/50"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground" />
            <span>{cleaning ? "Membersihkan..." : "Cleanup Tiket Usang"}</span>
          </button>
        </div>
      </div>

      {/* Main Ticket Table */}
      <section className="space-y-4">
        <AdminTicketTable
          tickets={tickets}
          onSelectTicket={handleSelectTicket}
          onSetInProgress={async (id) => {
            await setInProgress(id);
            toast.info(`Tiket #${id} sedang diproses`);
          }}
          onResolve={async (id) => {
            await resolveTicket(id);
            toast.success(`Tiket #${id} diselesaikan`);
          }}
          onClose={async (id) => {
            await closeTicket(id);
            toast.info(`Tiket #${id} ditutup`);
          }}
          onDelete={async (id) => {
            await deleteTicket(id);
            toast.success(`Tiket #${id} dihapus`);
          }}
        />
      </section>

      {/* Ticket Detail & Thread Modal */}
      <AdminTicketDetailModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedTicket(null);
        }}
        ticket={selectedTicket}
        replies={replies}
        loadingReplies={loadingReplies}
        onSendReply={async (dto) => {
          if (selectedTicket) {
            await sendReply(selectedTicket.id, dto);
          }
        }}
        onDeleteReply={async (replyId) => {
          await deleteReply(replyId);
          toast.success("Pesan balasan dihapus");
        }}
        onUpdateStatus={async (status) => {
          if (selectedTicket) {
            await updateStatus(selectedTicket.id, status);
            toast.success(`Status tiket diubah ke ${status}`);
          }
        }}
      />
    </div>
  );
}
