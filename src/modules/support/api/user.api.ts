// ==============================================================================
// GoVPN Support Ticket User API Client (9 Endpoints + Algoritma 3 Idempotency)
// Synchronized with backendv2 user ticket & reply routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { Ticket, TicketReply } from "../types/support.types";
import {
  CreateTicketDto,
  UpdateTicketDto,
  CreateTicketReplyDto,
  UserTicketFilterParams,
  PresignUploadResponse,
  UploadImageResponse,
} from "../types/user.types";

export const supportUserApi = {
  // 1. GET /api/ticket
  getTickets: (params?: UserTicketFilterParams): Promise<ApiResponse<Ticket[]>> =>
    apiClient.get<Ticket[]>("/api/ticket", { params }),

  // 2. POST /api/ticket (Algoritma 3: Idempotent)
  createTicket: (data: CreateTicketDto, idempotencyKey?: string): Promise<ApiResponse<Ticket>> =>
    apiClient.post<Ticket>("/api/ticket", data, {
      headers: idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : undefined,
    }),

  // 3. GET /api/ticket/:id
  getTicket: (id: string | number): Promise<ApiResponse<Ticket>> =>
    apiClient.get<Ticket>(`/api/ticket/${id}`),

  // 4. PUT /api/ticket/:id
  updateTicket: (id: string | number, data: UpdateTicketDto): Promise<ApiResponse<Ticket>> =>
    apiClient.put<Ticket>(`/api/ticket/${id}`, data),

  // 5. PATCH /api/ticket/:id/close
  closeTicket: (id: string | number): Promise<ApiResponse<Ticket>> =>
    apiClient.patch<Ticket>(`/api/ticket/${id}/close`),

  // 6. GET /api/ticket/:id/reply
  getReplies: (ticketId: string | number): Promise<ApiResponse<TicketReply[]>> =>
    apiClient.get<TicketReply[]>(`/api/ticket/${ticketId}/reply`),

  // 7. POST /api/ticket/:id/reply
  createReply: (
    ticketId: string | number,
    data: CreateTicketReplyDto,
    idempotencyKey?: string
  ): Promise<ApiResponse<TicketReply>> =>
    apiClient.post<TicketReply>(`/api/ticket/${ticketId}/reply`, data, {
      headers: idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : undefined,
    }),

  // 8. POST /api/ticket/upload
  uploadImage: (formData: FormData): Promise<ApiResponse<UploadImageResponse>> =>
    apiClient.post<UploadImageResponse>("/api/ticket/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // 9. GET /api/ticket/upload/presign
  presignUpload: (fileName: string, mimeType: string): Promise<ApiResponse<PresignUploadResponse>> =>
    apiClient.get<PresignUploadResponse>("/api/ticket/upload/presign", {
      params: { file_name: fileName, mime_type: mimeType },
    }),
};
