// ==============================================================================
// GoVPN Support & Helpdesk Ticket Core Types
// Synchronized with backendv2 Ticket & TicketReply Domain Entities
// ==============================================================================

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface TicketAttachment {
  id: string | number;
  file_name: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  created_at?: string;
}

export interface TicketReply {
  id: string | number;
  ticket_id: string | number;
  user_id: string | number;
  user_name?: string;
  user_role?: "USER" | "ADMIN" | "AGENT" | "SUPERADMIN";
  message: string;
  attachments?: TicketAttachment[];
  is_internal?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Ticket {
  id: string | number;
  ticket_number: string;
  user_id: string | number;
  user_email?: string;
  user_name?: string;
  department?: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assigned_to?: string | number;
  attachments?: TicketAttachment[];
  replies?: TicketReply[];
  last_reply_at?: string;
  created_at: string;
  updated_at?: string;
}
