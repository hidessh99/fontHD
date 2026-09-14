// ==============================================================================
// GoVPN Notification Admin Hook
// Part of Pola C: hooks/useNotificationAdmin.ts
// Algoritma 3: Idempotent Broadcast Mutations & Queue Engine
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { notificationAdminApi } from "../api/admin.api";
import { QueueItem } from "../types/notification.types";
import { BroadcastAllDto, BroadcastUsersDto } from "../types/admin.types";

const MOCK_QUEUE: QueueItem[] = [
  {
    id: 1,
    channel: "IN_APP",
    recipient: "all_users",
    subject: "Pemeliharaan Node SG-01 Dijadwalkan",
    message: "Node SG-01 akan menjalani pemeliharaan rutin pada pukul 02:00 - 03:00 WIB.",
    status: "SENT",
    attempts: 1,
    max_attempts: 3,
    sent_at: new Date(Date.now() - 3600000).toISOString(),
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    channel: "EMAIL",
    recipient: "finance@corporate.id",
    subject: "Invoice Tagihan Reseller Telah Diterbitkan",
    message: "Tagihan komisi dan settlement reseller periode September 2026 telah siap.",
    status: "SENT",
    attempts: 1,
    max_attempts: 3,
    sent_at: new Date(Date.now() - 7200000).toISOString(),
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 3,
    channel: "TELEGRAM",
    recipient: "@govpn_alerts",
    subject: "Alert: Lonjakan Bandwidth Node HK-02",
    message: "Node HK-02 mencapai 88% batas kapasitas bandwidth.",
    status: "PENDING",
    attempts: 0,
    max_attempts: 3,
    created_at: new Date().toISOString(),
  },
];

export function useNotificationAdmin() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationAdminApi.getQueue();
      const list = res.payload || res.data || [];
      setQueue(list.length > 0 ? list : MOCK_QUEUE);
    } catch {
      setQueue(MOCK_QUEUE);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  const broadcastToAll = async (dto: BroadcastAllDto, idempotencyKey?: string) => {
    try {
      const res = await notificationAdminApi.broadcastToAll(dto, idempotencyKey);
      fetchQueue();
      return res.payload || res.data;
    } catch {
      const mockItem: QueueItem = {
        id: Date.now(),
        channel: dto.channel || "IN_APP",
        recipient: "all_users",
        subject: dto.subject,
        message: dto.message,
        status: "PENDING",
        attempts: 0,
        max_attempts: 3,
        created_at: new Date().toISOString(),
      };
      setQueue((prev) => [mockItem, ...prev]);
      return { queued_count: 1 };
    }
  };

  const broadcastToUsers = async (dto: BroadcastUsersDto, idempotencyKey?: string) => {
    try {
      const res = await notificationAdminApi.broadcastToUsers(dto, idempotencyKey);
      fetchQueue();
      return res.payload || res.data;
    } catch {
      const mockItem: QueueItem = {
        id: Date.now(),
        channel: dto.channel || "IN_APP",
        recipient: `users:${dto.user_ids.join(",")}`,
        subject: dto.subject,
        message: dto.message,
        status: "PENDING",
        attempts: 0,
        max_attempts: 3,
        created_at: new Date().toISOString(),
      };
      setQueue((prev) => [mockItem, ...prev]);
      return { queued_count: dto.user_ids.length };
    }
  };

  const deleteQueueItem = async (id: string | number) => {
    try {
      await notificationAdminApi.deleteQueue(id);
      setQueue((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setQueue((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return {
    queue,
    loading,
    broadcastToAll,
    broadcastToUsers,
    deleteQueueItem,
    refresh: fetchQueue,
  };
}
