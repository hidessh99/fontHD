// ==============================================================================
// GoVPN Finance User Role DTOs & Contracts (14 Endpoints)
// ==============================================================================

import { PaymentMethod } from "./finance.types";

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

export interface UserWithdrawalRequestDto {
  amount: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  notes?: string;
}

export interface FinancialReportFilter {
  start_date?: string;
  end_date?: string;
  period?: "daily" | "monthly" | "yearly";
  [key: string]: string | number | boolean | undefined;
}
