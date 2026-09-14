// ==============================================================================
// GoVPN Support Admin Hook
// Part of Pola C: hooks/useSupportAdmin.ts
// Support Superadmin Fleet: Operations, Status Updates & Internal Notes
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { supportAdminApi } from "../api/admin.api";
import { Ticket, TicketReply, TicketStatus } from "../types/support.types";
import { AdminCreateReplyDto } from "../types/admin.types";

const MOCK_ADMIN_TICKETS: Ticket[] = [
  {
    id: 1,
    ticket_number: "TKT-2026-001",
    user_id: 101,
    user_name: "Budi Santoso",
    user_email: "budi@example.com",
    subject: "Koneksi V2Ray WS CDN sering putus di ISP Telkomsel",
    description:
      "Koneksi V2Ray CDN port 443 sering disconnect tiap 15 menit ketika menggunakan jaringan Telkomsel.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    department: "Konektivitas VPN",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    last_reply_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    ticket_number: "TKT-2026-002",
    user_id: 102,
    user_name: "Siti Rahma",
    user_email: "siti@partner.net",
    subject: "Permintaan Custom DNS Cloudflare Subdomain",
    description:
      "Mohon bantuan mapping record host VPN ke zone domain pribadi saya.",
    status: "OPEN",
    priority: "MEDIUM",
    department: "DNS & Routing",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    last_reply_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    ticket_number: "TKT-2026-003",
    user_id: 103,
    user_name: "Dedi Setiawan",
    user_email: "dedi@corporate.id",
    subject: "Kendala Konfirmasi Pembayaran QRIS Deposit",
    description:
      "Pembayaran QRIS sudah sukses di mobile banking namun saldo deposit belum ter-update.",
    status: "RESOLVED",
    priority: "URGENT",
    department: "Billing & Langganan",
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    last_reply_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

export function useSupportAdmin() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replies, setReplies] = useState<TicketReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const fetchAdminTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await supportAdminApi.listTickets();
      const list = res.payload || res.data || [];
      setTickets(list.length > 0 ? list : MOCK_ADMIN_TICKETS);
    } catch {
      setTickets(MOCK_ADMIN_TICKETS);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReplies = useCallback(async (ticketId: string | number) => {
    setLoadingReplies(true);
    try {
      const res = await supportAdminApi.getReplies(ticketId);
      const list = res.payload || res.data || [];
      setReplies(list);
    } catch {
      setReplies([]);
    } finally {
      setLoadingReplies(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminTickets();
  }, [fetchAdminTickets]);

  useEffect(() => {
    if (selectedTicket) {
      fetchReplies(selectedTicket.id);
    }
  }, [selectedTicket, fetchReplies]);

  const setInProgress = async (id: string | number) => {
    try {
      await supportAdminApi.setInProgress(id);
    } catch {
      // Mock update
    }
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "IN_PROGRESS" } : t)),
    );
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket({ ...selectedTicket, status: "IN_PROGRESS" });
    }
  };

  const resolveTicket = async (id: string | number) => {
    try {
      await supportAdminApi.resolveTicket(id);
    } catch {
      // Mock update
    }
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "RESOLVED" } : t)),
    );
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket({ ...selectedTicket, status: "RESOLVED" });
    }
  };

  const closeTicket = async (id: string | number) => {
    try {
      await supportAdminApi.closeTicket(id);
    } catch {
      // Mock update
    }
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "CLOSED" } : t)),
    );
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket({ ...selectedTicket, status: "CLOSED" });
    }
  };

  const deleteTicket = async (id: string | number) => {
    try {
      await supportAdminApi.deleteTicket(id);
    } catch {
      // Mock delete
    }
    setTickets((prev) => prev.filter((t) => t.id !== id));
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket(null);
    }
  };

  const updateStatus = async (id: string | number, status: TicketStatus) => {
    try {
      await supportAdminApi.updateStatus({ ticket_id: id, status });
    } catch {
      // Mock update
    }
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket({ ...selectedTicket, status });
    }
  };

  const sendReply = async (
    ticketId: string | number,
    dto: AdminCreateReplyDto,
  ) => {
    try {
      const res = await supportAdminApi.createReply(ticketId, dto);
      const created = res.payload || res.data;
      if (created) {
        setReplies((prev) => [...prev, created]);
        return created;
      }
    } catch {
      const mock: TicketReply = {
        id: "r-" + Date.now(),
        ticket_id: ticketId,
        user_id: 999,
        user_name: "Superadmin Support",
        user_role: "SUPERADMIN",
        message: dto.message,
        is_internal: dto.is_internal,
        created_at: new Date().toISOString(),
      };
      setReplies((prev) => [...prev, mock]);
      return mock;
    }
  };

  const deleteReply = async (replyId: string | number) => {
    try {
      await supportAdminApi.deleteReply(replyId);
    } catch {
      // Mock delete
    }
    setReplies((prev) => prev.filter((r) => r.id !== replyId));
  };

  const cleanupTickets = async () => {
    try {
      const res = await supportAdminApi.cleanupTickets();
      fetchAdminTickets();
      return res.payload || res.data;
    } catch {
      fetchAdminTickets();
    }
  };

  return {
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
    refresh: fetchAdminTickets,
  };
}
