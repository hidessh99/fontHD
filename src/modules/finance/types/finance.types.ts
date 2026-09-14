// ==============================================================================
// GoVPN Finance Domain Core Types & Entities
// Synchronized with backendv2 58 Finance Endpoints
// ==============================================================================

export type PaymentMethod =
  "QRIS" | "MIDTRANS" | "TRIPAY" | "DUITKU" | "MANUAL_TRANSFER";

export type InvoiceStatus =
  "PENDING" | "PAID" | "EXPIRED" | "CANCELLED" | "FAILED";

export type BillingType =
  "TOPUP" | "PURCHASE" | "RENEWAL" | "REFUND" | "CASHBACK" | "ADMIN_ADJUST";

export type WithdrawalStatus =
  "PENDING" | "APPROVED" | "REJECTED" | "PROCESSED";

export interface Invoice {
  id: string | number;
  invoice_number: string;
  user_id: string | number;
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
  id: string | number;
  user_id: string | number;
  type: BillingType;
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string;
  reference_id?: string;
  created_at: string;
}

export interface WalletBalance {
  user_id: string | number;
  balance: number;
  currency: string;
  pending_deposit: number;
  total_spent: number;
  last_topup_at?: string;
}

export interface IncomePending {
  id: string | number;
  user_id: string | number;
  account_id?: string | number;
  amount: number;
  source: "always" | "monthly" | "payas" | string;
  status: "PENDING" | "COMPLETED" | "CANCELLED" | string;
  created_at: string;
  updated_at?: string;
}

export interface Voucher {
  id: string | number;
  code: string;
  discount_amount: number;
  discount_percentage?: number;
  min_purchase?: number;
  max_discount?: number;
  quota: number;
  used_count: number;
  is_active: boolean;
  expired_at: string;
  created_at?: string;
}

export interface WithdrawalRecord {
  id: string | number;
  user_id: string | number;
  amount: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  status: WithdrawalStatus;
  notes?: string;
  proof_url?: string;
  created_at: string;
  processed_at?: string;
}

export interface FinancialReport {
  period: string;
  total_revenue: number;
  total_transactions: number;
  active_accounts: number;
  churn_rate?: number;
}
