// ==============================================================================
// GoVPN Notification Admin View
// Part of Pola C: views/admin/AdminNotificationView.tsx
// Algoritma 4: Dynamic Island Route Component (Broadcast & Queue Monitor)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useNotificationAdmin } from "../../hooks/useNotificationAdmin";
import { NotificationSkeleton } from "../../components/shared/NotificationSkeleton";
import { AdminQueueTable } from "../../components/admin/AdminQueueTable";
import { BroadcastSenderModal } from "../../components/admin/BroadcastSenderModal";
import {
  RefreshCw,
  Megaphone,
  Send,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AdminNotificationView() {
  const { t } = useI18n();
  const {
    queue,
    loading,
    broadcastToAll,
    broadcastToUsers,
    deleteQueueItem,
    refresh,
  } = useNotificationAdmin();
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  if (loading) {
    return <NotificationSkeleton />;
  }

  const sentCount = queue.filter((i) => i.status === "SENT").length;
  const pendingCount = queue.filter(
    (i) => i.status === "PENDING" || i.status === "PROCESSING",
  ).length;
  const failedCount = queue.filter((i) => i.status === "FAILED").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-500 mb-2">
            <Megaphone className="w-3.5 h-3.5" /> {t("notification.dispatcherBadge")}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t("notification.adminTitle")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("notification.adminSubtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refresh();
              toast.info(t("notification.queueRefreshed"));
            }}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t("notification.refreshBtn")}</span>
          </Button>
          <Button
            size="sm"
            onClick={() => setIsBroadcastModalOpen(true)}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{t("notification.sendBroadcastBtn")}</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border/50 bg-card/60 space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {t("notification.totalQueue")}
          </div>
          <div className="text-2xl font-bold font-mono text-foreground">
            {queue.length}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-card/60 space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {t("notification.sentSuccess")}
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-500">
            {sentCount}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-card/60 space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" /> {t("notification.pendingExecution")}
          </div>
          <div className="text-2xl font-bold font-mono text-amber-500">
            {pendingCount}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-card/60 space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> {t("notification.failedSending")}
          </div>
          <div className="text-2xl font-bold font-mono text-red-500">
            {failedCount}
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            {t("notification.workerQueueList")}
          </h2>
          <span className="text-xs text-muted-foreground">
            {t("notification.cronjobDesc")}
          </span>
        </div>

        <AdminQueueTable
          queue={queue}
          onDeleteQueueItem={async (id) => {
            await deleteQueueItem(id);
            toast.success(t("notification.itemDeleted"));
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
