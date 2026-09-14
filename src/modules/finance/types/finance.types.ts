export type PaymentMethod = "QRIS" | "MIDTRANS" | "TRIPAY" | "DUITKU" | "MANUAL_TRANSFER";

export type InvoiceStatus = "PENDING" | "PAID" | "EXPIRED" | "CANCELLED" | "FAILED";

export type BillingType = "TOPUP" | "PURCHASE" | "RENEWAL" | "REFUND" | "CASHBACK" | "ADMIN_ADJUST";

export interface Invoice {
  id: string;
  invoice_number: string;
  user_id: string;
  amount: number;
  admin_fee?: number;
  total_amount: number;
  payment_method: PaymentMethod;
  status: InvoiceStatus;
  qr_string?: string;
  qr_url?: string;
  checkout_url?: string;
  description?: string;
  created_at: string;
  expired_at?: string;
  paid_at?: string;
}

export interface BillingRecord {
  id: string;
  user_id: string;
  type: BillingType;
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string;
  reference_id?: string;
  created_at: string;
}

export interface WalletBalance {
  user_id: string;
  balance: number;
  currency: string;
  pending_deposit: number;
  total_spent: number;
  last_topup_at?: string;
}

export interface CreateTopupDto {
  amount: number;
  payment_method: PaymentMethod;
  voucher_code?: string;
}

export interface VoucherValidationResult {
  valid: boolean;
  code: string;
  discount_amount: number;
  discount_percentage?: number;
  message?: string;
}

export interface WithdrawalRequest {
  id: string;
  user_id: string;
  amount: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "REJECTED";
  created_at: string;
  processed_at?: string;
}

export interface CreateWithdrawalDto {
  amount: number;
  bank_name: string;
  account_number: string;
  account_name: string;
}
