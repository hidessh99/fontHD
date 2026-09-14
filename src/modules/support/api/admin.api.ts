// ==============================================================================
// GoVPN Support Ticket Admin API Client (12 Endpoints)
// Synchronized with backendv2 admin ticket routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { Ticket, TicketReply } from "../types/support.types";
import {
  AdminUpdateTicketDto,
  AdminUpdateStatusDto,
  AdminTicketFilterParams,
  AdminCreateReplyDto,
  AdminCleanupTicketsResponse,
} from "../types/admin.types";

export const supportAdminApi = {
  // 1. GET /api/admin/ticket
  listTickets: (
    params?: AdminTicketFilterParams,
  ): Promise<ApiResponse<Ticket[]>> =>
    apiClient.get<Ticket[]>("/api/admin/ticket", { params }),

  // 2. GET /api/admin/ticket/:id
  getTicket: (id: string | number): Promise<ApiResponse<Ticket>> =>
    apiClient.get<Ticket>(`/api/admin/ticket/${id}`),

  // 3. PUT /api/admin/ticket/:id
  updateTicket: (
    id: string | number,
    data: AdminUpdateTicketDto,
  ): Promise<ApiResponse<Ticket>> =>
    apiClient.put<Ticket>(`/api/admin/ticket/${id}`, data),

  // 4. DELETE /api/admin/ticket/:id
  deleteTicket: (id: string | number): Promise<ApiResponse<void>> =>
    apiClient.delete<void>(`/api/admin/ticket/${id}`),

  // 5. PATCH /api/admin/ticket/:id/close
  closeTicket: (id: string | number): Promise<ApiResponse<Ticket>> =>
    apiClient.patch<Ticket>(`/api/admin/ticket/${id}/close`),

  // 6. PATCH /api/admin/ticket/:id/in-progress
  setInProgress: (id: string | number): Promise<ApiResponse<Ticket>> =>
    apiClient.patch<Ticket>(`/api/admin/ticket/${id}/in-progress`),

  // 7. PATCH /api/admin/ticket/:id/resolve
  resolveTicket: (id: string | number): Promise<ApiResponse<Ticket>> =>
    apiClient.patch<Ticket>(`/api/admin/ticket/${id}/resolve`),

  // 8. GET /api/admin/ticket/:id/reply
  getReplies: (
    ticketId: string | number,
  ): Promise<ApiResponse<TicketReply[]>> =>
    apiClient.get<TicketReply[]>(`/api/admin/ticket/${ticketId}/reply`),

  // 9. POST /api/admin/ticket/:id/reply
  createReply: (
    ticketId: string | number,
    data: AdminCreateReplyDto,
  ): Promise<ApiResponse<TicketReply>> =>
    apiClient.post<TicketReply>(`/api/admin/ticket/${ticketId}/reply`, data),

  // 10. DELETE /api/admin/ticket/reply/:reply_id
  deleteReply: (replyId: string | number): Promise<ApiResponse<void>> =>
    apiClient.delete<void>(`/api/admin/ticket/reply/${replyId}`),

  // 11. DELETE /api/admin/ticket/cleanup
  cleanupTickets: (): Promise<ApiResponse<AdminCleanupTicketsResponse>> =>
    apiClient.delete<AdminCleanupTicketsResponse>("/api/admin/ticket/cleanup"),

  // 12. PATCH /api/admin/ticket/status
  updateStatus: (data: AdminUpdateStatusDto): Promise<ApiResponse<Ticket>> =>
    apiClient.patch<Ticket>("/api/admin/ticket/status", data),
};
