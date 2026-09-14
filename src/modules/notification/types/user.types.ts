// ==============================================================================
// GoVPN User In-App Notification Contracts
// ==============================================================================

export interface UserNotificationFilterParams {
  is_read?: boolean;
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface MarkAsReadDto {
  notification_ids?: (string | number)[];
  all?: boolean;
}
