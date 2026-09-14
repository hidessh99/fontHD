// ==============================================================================
// GoVPN Support Ticket User Role Contracts (9 Endpoints)
// ==============================================================================

import { TicketPriority, TicketStatus } from "./support.types";

export interface CreateTicketDto {
  subject: string;
  description: string;
  priority?: TicketPriority;
  department?: string;
  attachment_ids?: (string | number)[];
}

export interface UpdateTicketDto {
  subject?: string;
  description?: string;
}

export interface CreateTicketReplyDto {
  message: string;
  attachment_ids?: (string | number)[];
}

export interface UserTicketFilterParams {
  status?: TicketStatus | "ALL";
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface PresignUploadResponse {
  upload_url: string;
  file_url: string;
  file_key: string;
}

export interface UploadImageResponse {
  attachment_id: string | number;
  file_url: string;
  file_name: string;
}
