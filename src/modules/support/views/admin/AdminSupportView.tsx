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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

export function AdminSupportView() {
  const { t } = useI18n();
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
      toast.success(t("support.cleanupSuccess"));
    } catch {
      toast.error(t("support.cleanupFailed"));
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
            <ShieldAlert className="w-3.5 h-3.5" /> {t("support.adminBadge")}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t("support.adminTitle")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("support.adminSubtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refresh();
              toast.info(t("common.dataRefreshed", "Data refreshed"));
            }}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t("common.refresh")}</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCleanup}
            disabled={cleaning}
            className="gap-2 border border-border/50"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground" />
            <span>{cleaning ? t("support.cleaning") : t("support.cleanupStaleTickets")}</span>
          </Button>
        </div>
      </div>

      {/* Main Ticket Table */}
      <section className="space-y-4">
        <AdminTicketTable
          tickets={tickets}
          onSelectTicket={handleSelectTicket}
          onSetInProgress={async (id) => {
            await setInProgress(id);
            toast.info(t("support.ticketInProgress", { id: String(id) }));
          }}
          onResolve={async (id) => {
            await resolveTicket(id);
            toast.success(t("support.ticketResolved", { id: String(id) }));
          }}
          onClose={async (id) => {
            await closeTicket(id);
            toast.info(t("support.ticketClosedId", { id: String(id) }));
          }}
          onDelete={async (id) => {
            await deleteTicket(id);
            toast.success(t("support.ticketDeleted", { id: String(id) }));
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
          toast.success(t("support.replyDeleted"));
        }}
        onUpdateStatus={async (status) => {
          if (selectedTicket) {
            await updateStatus(selectedTicket.id, status);
            toast.success(t("support.statusUpdated", { status }));
          }
        }}
      />
    </div>
  );
}
