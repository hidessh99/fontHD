// ==============================================================================
// GoVPN Notification Admin Role Contracts (7 Endpoints)
// ==============================================================================

import { NotificationChannel, QueueStatus } from "./notification.types";

export interface BroadcastAllDto {
  subject?: string;
  message: string;
  channel?: NotificationChannel;
}

export interface BroadcastUsersDto {
  user_ids: (string | number)[];
  subject?: string;
  message: string;
  channel?: NotificationChannel;
}

export interface CreateQueueDto {
  channel: NotificationChannel;
  recipient: string;
  subject?: string;
  message: string;
  payload?: Record<string, unknown>;
  scheduled_at?: string;
}

export interface UpdateQueueDto {
  channel?: NotificationChannel;
  recipient?: string;
  subject?: string;
  message?: string;
  status?: QueueStatus;
}

export interface AdminQueueFilterParams {
  channel?: NotificationChannel | "ALL";
  status?: QueueStatus | "ALL";
  search?: string;
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}
