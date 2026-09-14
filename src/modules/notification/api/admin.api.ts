// ==============================================================================
// GoVPN Notification Admin API Client (7 Endpoints + Algoritma 3 Idempotency)
// Synchronized with backendv2 admin queue & broadcast routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { QueueItem } from "../types/notification.types";
import {
  BroadcastAllDto,
  BroadcastUsersDto,
  CreateQueueDto,
  UpdateQueueDto,
  AdminQueueFilterParams,
} from "../types/admin.types";

export const notificationAdminApi = {
  // 1. POST /api/admin/broadcast/all (Algoritma 3: Idempotent)
  broadcastToAll: (
    data: BroadcastAllDto,
    idempotencyKey?: string
  ): Promise<ApiResponse<{ queued_count: number }>> =>
    apiClient.post<{ queued_count: number }>("/api/admin/broadcast/all", data, {
      headers: idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : undefined,
    }),

  // 2. POST /api/admin/broadcast/users (Algoritma 3: Idempotent)
  broadcastToUsers: (
    data: BroadcastUsersDto,
    idempotencyKey?: string
  ): Promise<ApiResponse<{ queued_count: number }>> =>
    apiClient.post<{ queued_count: number }>("/api/admin/broadcast/users", data, {
      headers: idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : undefined,
    }),

  // 3. GET /api/admin/queue
  getQueue: (params?: AdminQueueFilterParams): Promise<ApiResponse<QueueItem[]>> =>
    apiClient.get<QueueItem[]>("/api/admin/queue", { params }),

  // 4. POST /api/admin/queue
  createQueue: (
    data: CreateQueueDto,
    idempotencyKey?: string
  ): Promise<ApiResponse<QueueItem>> =>
    apiClient.post<QueueItem>("/api/admin/queue", data, {
      headers: idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : undefined,
    }),

  // 5. GET /api/admin/queue/:id
  getQueueById: (id: string | number): Promise<ApiResponse<QueueItem>> =>
    apiClient.get<QueueItem>(`/api/admin/queue/${id}`),

  // 6. PUT /api/admin/queue/:id
  updateQueue: (id: string | number, data: UpdateQueueDto): Promise<ApiResponse<QueueItem>> =>
    apiClient.put<QueueItem>(`/api/admin/queue/${id}`, data),

  // 7. DELETE /api/admin/queue/:id
  deleteQueue: (id: string | number): Promise<ApiResponse<void>> =>
    apiClient.delete<void>(`/api/admin/queue/${id}`),
};
