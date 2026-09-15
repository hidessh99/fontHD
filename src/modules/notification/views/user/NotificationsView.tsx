// ==============================================================================
// GoVPN User Notifications View
// Part of Pola C: views/user/NotificationsView.tsx
// Algoritma 4: Dynamic Island Route Component
// ==============================================================================

"use client";

import React from "react";
import { useNotificationUser } from "../../hooks/useNotificationUser";
import { NotificationSkeleton } from "../../components/shared/NotificationSkeleton";
import { NotificationFeed } from "../../components/user/NotificationFeed";
import { Button } from "@/components/ui/button";
import { RefreshCw, Bell } from "lucide-react";
import { toast } from "sonner";

export function NotificationsView() {
  const { notifications, loading, markAsRead, markAllAsRead, refresh } =
    useNotificationUser();

  if (loading) {
    return <NotificationSkeleton />;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2">
            <Bell className="w-3.5 h-3.5" /> Pusat Pemberitahuan
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Notifikasi & Pengumuman
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Riwayat pembaruan status server, notifikasi billing paket, dan
            respon tiket helpdesk.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            refresh();
            toast.info("Notifikasi diperbarui");
          }}
          className="gap-2 self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Segarkan</span>
        </Button>
      </div>

      {/* Feed */}
      <NotificationFeed
        notifications={notifications}
        onMarkAsRead={async (id) => {
          await markAsRead(id);
          toast.success("Ditandai sudah dibaca");
        }}
        onMarkAllAsRead={async () => {
          await markAllAsRead();
          toast.success("Semua notifikasi ditandai sudah dibaca");
        }}
      />
    </div>
  );
}
