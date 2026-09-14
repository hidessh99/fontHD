// ==============================================================================
// GoVPN Finance Superadmin Role DTOs & Contracts (32 Endpoints)
// ==============================================================================

import { InvoiceStatus, PaymentMethod, WithdrawalStatus } from "./finance.types";

export interface AdminCreateBillingDto {
  user_id: string | number;
  amount: number;
  description: string;
  type: "ADMIN_ADJUST" | "TOPUP" | "REFUND";
}

export interface AdminCreateInvoiceDto {
  user_id: string | number;
  amount: number;
  payment_method: PaymentMethod;
  description?: string;
}

export interface AdminUpdateInvoiceStatusDto {
  status: InvoiceStatus;
  paid_at?: string;
}

export interface AdminCreateVoucherDto {
  code: string;
  discount_amount: number;
  discount_percentage?: number;
  min_purchase?: number;
  max_discount?: number;
  quota: number;
  expired_at: string;
  is_active: boolean;
}

export interface AdminUpdateWithdrawalStatusDto {
  status: WithdrawalStatus;
  notes?: string;
  proof_url?: string;
}
