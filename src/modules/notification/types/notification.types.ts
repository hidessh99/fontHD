// ==============================================================================
// GoVPN Notification & Queue Core Types
// Synchronized with backendv2 Queue & Broadcast Domain
// ==============================================================================

export type NotificationChannel = "EMAIL" | "TELEGRAM" | "WHATSAPP" | "PUSH" | "IN_APP";
export type QueueStatus = "PENDING" | "PROCESSING" | "SENT" | "FAILED" | "CANCELLED";

export interface QueueItem {
  id: string | number;
  channel: NotificationChannel;
  recipient: string;
  subject?: string;
  message: string;
  payload?: Record<string, unknown>;
  status: QueueStatus;
  attempts: number;
  max_attempts?: number;
  error_message?: string;
  scheduled_at?: string;
  sent_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface NotificationItem {
  id: string | number;
  user_id: string | number;
  title: string;
  message: string;
  channel: NotificationChannel;
  type?: "INFO" | "SUCCESS" | "WARNING" | "CRITICAL";
  is_read: boolean;
  action_url?: string;
  created_at: string;
}
