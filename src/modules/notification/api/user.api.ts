// ==============================================================================
// GoVPN User In-App Notification API Client
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { NotificationItem } from "../types/notification.types";
import {
  UserNotificationFilterParams,
  MarkAsReadDto,
} from "../types/user.types";

export const notificationUserApi = {
  // GET /api/notifications
  getNotifications: (
    params?: UserNotificationFilterParams,
  ): Promise<ApiResponse<NotificationItem[]>> =>
    apiClient.get<NotificationItem[]>("/api/notifications", { params }),

  // POST /api/notifications/read
  markAsRead: (data: MarkAsReadDto): Promise<ApiResponse<void>> =>
    apiClient.post<void>("/api/notifications/read", data),
};
