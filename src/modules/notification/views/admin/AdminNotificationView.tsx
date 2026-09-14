// ==============================================================================
// GoVPN Notification Admin View
// Part of Pola C: views/admin/AdminNotificationView.tsx
// Algoritma 4: Dynamic Island Route Component (Broadcast & Queue Monitor)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useNotificationAdmin } from "../../hooks/useNotificationAdmin";
import { NotificationSkeleton } from "../../components/shared/NotificationSkeleton";
import { AdminQueueTable } from "../../components/admin/AdminQueueTable";
import { BroadcastSenderModal } from "../../components/admin/BroadcastSenderModal";
import { RefreshCw, Megaphone, Send, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function AdminNotificationView() {
  const { queue, loading, broadcastToAll, broadcastToUsers, deleteQueueItem, refresh } =
    useNotificationAdmin();
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  if (loading) {
    return <NotificationSkeleton />;
  }

  const sentCount = queue.filter((i) => i.status === "SENT").length;
  const pendingCount = queue.filter((i) => i.status === "PENDING" || i.status === "PROCESSING").length;
  const failedCount = queue.filter((i) => i.status === "FAILED").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-500 mb-2">
            <Megaphone className="w-3.5 h-3.5" /> Notification & Broadcast Dispatcher
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Antrean Notifikasi & Siaran
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kirimkan broadcast multi-channel (In-App, Email, Telegram, WhatsApp) dan pantau antrean asinkron worker.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              refresh();
              toast.info("Antrean diperbarui");
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-border/50 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Segarkan</span>
          </button>
          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Siaran Baru</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border/50 bg-card/60 space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Total Antrean
          </div>
          <div className="text-2xl font-bold font-mono text-foreground">{queue.length}</div>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-card/60 space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Terkirim Sukses
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-500">{sentCount}</div>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-card/60 space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" /> Menunggu Eksekusi
          </div>
          <div className="text-2xl font-bold font-mono text-amber-500">{pendingCount}</div>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-card/60 space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Gagal Dikirim
          </div>
          <div className="text-2xl font-bold font-mono text-red-500">{failedCount}</div>
        </div>
      </div>

      {/* Queue Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Daftar Antrean Pesan Worker</h2>
          <span className="text-xs text-muted-foreground">Diproses otomatis via Cronjob Worker</span>
        </div>

        <AdminQueueTable
          queue={queue}
          onDeleteQueueItem={async (id) => {
            await deleteQueueItem(id);
            toast.success("Item dihapus dari antrean");
          }}
        />
      </section>

      {/* Broadcast Modal */}
      <BroadcastSenderModal
        open={isBroadcastModalOpen}
        onOpenChange={setIsBroadcastModalOpen}
        onBroadcastAll={broadcastToAll}
        onBroadcastUsers={broadcastToUsers}
      />
    </div>
  );
}
