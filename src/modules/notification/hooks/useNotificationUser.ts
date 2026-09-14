// ==============================================================================
// GoVPN Notification User Hook
// Part of Pola C: hooks/useNotificationUser.ts
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { notificationUserApi } from "../api/user.api";
import { NotificationItem } from "../types/notification.types";

const MOCK_USER_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    user_id: 101,
    title: "Pemeliharaan Node SG-01 Berhasil",
    message:
      "Pemeliharaan server tunneling SG-01 telah tuntas. Seluruh sesi koneksi kembali normal dengan latency optimal.",
    channel: "IN_APP",
    type: "SUCCESS",
    is_read: false,
    action_url: "/vpn",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    user_id: 101,
    title: "Masa Aktif Langganan Tersisa 5 Hari",
    message:
      "Paket Premium Pro Max Anda akan berakhir dalam 5 hari. Perpanjang sekarang untuk menghindari pemutusan akses rute prioritas.",
    channel: "IN_APP",
    type: "WARNING",
    is_read: false,
    action_url: "/subscription",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    user_id: 101,
    title: "Tiket Bantuan #TKT-2026-001 Dijawab",
    message:
      "Staff support teknis telah menanggapi tiket bantuan terkait rute V2Ray CDN Telkomsel.",
    channel: "IN_APP",
    type: "INFO",
    is_read: true,
    action_url: "/support",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

export function useNotificationUser() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationUserApi.getNotifications();
      const list = res.payload || res.data || [];
      setNotifications(list.length > 0 ? list : MOCK_USER_NOTIFICATIONS);
    } catch {
      setNotifications(MOCK_USER_NOTIFICATIONS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id: string | number) => {
    try {
      await notificationUserApi.markAsRead({ notification_ids: [id] });
    } catch {
      // Mock update
    }
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );
  };

  const markAllAsRead = async () => {
    try {
      await notificationUserApi.markAsRead({ all: true });
    } catch {
      // Mock update
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    refresh: fetchNotifications,
  };
}
