// ==============================================================================
// GoVPN Support Ticket Admin Role Contracts (12 Endpoints)
// ==============================================================================

import { TicketPriority, TicketStatus } from "./support.types";

export interface AdminUpdateTicketDto {
  subject?: string;
  description?: string;
  priority?: TicketPriority;
  department?: string;
  assigned_to?: string | number;
}

export interface AdminUpdateStatusDto {
  ticket_id?: string | number;
  status: TicketStatus;
  reason?: string;
}

export interface AdminCreateReplyDto {
  message: string;
  is_internal?: boolean;
  attachment_ids?: (string | number)[];
}

export interface AdminTicketFilterParams {
  status?: TicketStatus | "ALL";
  priority?: TicketPriority | "ALL";
  user_id?: string | number;
  assigned_to?: string | number;
  search?: string;
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface AdminCleanupTicketsResponse {
  deleted_count: number;
}
