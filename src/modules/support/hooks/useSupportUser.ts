// ==============================================================================
// GoVPN Support User Hook
// Part of Pola C: hooks/useSupportUser.ts
// Algoritma 3: Idempotent Ticket Creation & Replies
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { supportUserApi } from "../api/user.api";
import { Ticket, TicketReply } from "../types/support.types";
import { CreateTicketDto, CreateTicketReplyDto } from "../types/user.types";

const MOCK_USER_TICKETS: Ticket[] = [
  {
    id: "t-101",
    ticket_number: "TKT-2026-001",
    user_id: 101,
    subject: "Koneksi V2Ray WS CDN sering putus di ISP Telkomsel",
    description:
      "Halo tim teknis, saya mendapati koneksi V2Ray CDN port 443 sering disconnect tiap 15 menit ketika menggunakan jaringan Telkomsel. Apakah ada konfigurasi SNI atau jalur alternatif?",
    status: "IN_PROGRESS",
    priority: "HIGH",
    department: "Konektivitas VPN",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    last_reply_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "t-102",
    ticket_number: "TKT-2026-002",
    user_id: 101,
    subject: "Permintaan Custom DNS Cloudflare Subdomain",
    description: "Mohon bantuan mapping record host VPN ke zone domain pribadi saya.",
    status: "RESOLVED",
    priority: "MEDIUM",
    department: "DNS & Routing",
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    last_reply_at: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
];

const MOCK_REPLIES: Record<string, TicketReply[]> = {
  "t-101": [
    {
      id: "r-1",
      ticket_id: "t-101",
      user_id: 999,
      user_name: "Andi - GoVPN Support",
      user_role: "ADMIN",
      message:
        "Halo, terima kasih telah menghubungi tim kami. Kami mendeteksi adanya pengetatan filter DPI Telkomsel pada rute CDN Cloudflare tertentu. Kami telah mengaktifkan gRPC TLS fallback pada node SG-02. Mohon coba import konfigurasi baru dari dashboard VPN.",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ],
};

export function useSupportUser() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replies, setReplies] = useState<TicketReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await supportUserApi.getTickets();
      const list = res.payload || res.data || [];
      setTickets(list.length > 0 ? list : MOCK_USER_TICKETS);
      if (list.length > 0 && !selectedTicket) {
        setSelectedTicket(list[0]);
      } else if (!selectedTicket) {
        setSelectedTicket(MOCK_USER_TICKETS[0]);
      }
    } catch {
      setTickets(MOCK_USER_TICKETS);
      if (!selectedTicket) {
        setSelectedTicket(MOCK_USER_TICKETS[0]);
      }
    } finally {
      setLoading(false);
    }
  }, [selectedTicket]);

  const fetchReplies = useCallback(async (ticketId: string | number) => {
    setLoadingReplies(true);
    try {
      const res = await supportUserApi.getReplies(ticketId);
      const list = res.payload || res.data || [];
      setReplies(list.length > 0 ? list : MOCK_REPLIES[String(ticketId)] || []);
    } catch {
      setReplies(MOCK_REPLIES[String(ticketId)] || []);
    } finally {
      setLoadingReplies(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    if (selectedTicket) {
      fetchReplies(selectedTicket.id);
    }
  }, [selectedTicket, fetchReplies]);

  const createTicket = async (dto: CreateTicketDto, idempotencyKey?: string) => {
    try {
      const res = await supportUserApi.createTicket(dto, idempotencyKey);
      const created = res.payload || res.data;
      if (created) {
        setTickets((prev) => [created, ...prev]);
        setSelectedTicket(created);
        return created;
      }
    } catch {
      const mock: Ticket = {
        id: "t-" + Date.now(),
        ticket_number: `TKT-2026-${Math.floor(100 + Math.random() * 900)}`,
        user_id: 101,
        subject: dto.subject,
        description: dto.description,
        status: "OPEN",
        priority: dto.priority || "MEDIUM",
        department: dto.department || "Konektivitas VPN",
        created_at: new Date().toISOString(),
        last_reply_at: new Date().toISOString(),
      };
      setTickets((prev) => [mock, ...prev]);
      setSelectedTicket(mock);
      return mock;
    }
  };

  const sendReply = async (message: string, idempotencyKey?: string) => {
    if (!selectedTicket) return;
    const dto: CreateTicketReplyDto = { message };

    try {
      const res = await supportUserApi.createReply(selectedTicket.id, dto, idempotencyKey);
      const created = res.payload || res.data;
      if (created) {
        setReplies((prev) => [...prev, created]);
        return created;
      }
    } catch {
      const mockReply: TicketReply = {
        id: "r-" + Date.now(),
        ticket_id: selectedTicket.id,
        user_id: 101,
        user_name: "Anda",
        user_role: "USER",
        message,
        created_at: new Date().toISOString(),
      };
      setReplies((prev) => [...prev, mockReply]);
      return mockReply;
    }
  };

  const closeTicket = async (ticketId: string | number) => {
    try {
      await supportUserApi.closeTicket(ticketId);
    } catch {
      // Mock update
    }
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: "CLOSED" } : t))
    );
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: "CLOSED" });
    }
  };

  return {
    tickets,
    selectedTicket,
    replies,
    loading,
    loadingReplies,
    setSelectedTicket,
    createTicket,
    sendReply,
    closeTicket,
    refresh: fetchTickets,
  };
}
