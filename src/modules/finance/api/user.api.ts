// ==============================================================================
// GoVPN Finance User API Client (14 Endpoints)
// Synchronized with backendv2 04-finance catalog
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import {
  BillingRecord,
  FinancialReport,
  IncomePending,
  Invoice,
  WithdrawalRecord,
} from "../types/finance.types";
import {
  CreateTopupDto,
  FinancialReportFilter,
  UserWithdrawalRequestDto,
  VoucherValidationResult,
} from "../types/user.types";

export const financeUserApi = {
  // === BILLING / DEPOSITS (3 Endpoints) ===
  // 1. GET /api/billing
  getBillingHistory: (params?: { page?: number; limit?: number }): Promise<ApiResponse<BillingRecord[]>> =>
    apiClient.get<BillingRecord[]>("/api/billing", { params }),

  // 2. POST /api/billing
  createTopup: (data: CreateTopupDto, idempotencyKey?: string): Promise<ApiResponse<Invoice>> =>
    apiClient.post<Invoice>("/api/billing", data, { idempotencyKey }),

  // 3. GET /api/billing/:id
  getBillingById: (id: string | number): Promise<ApiResponse<BillingRecord>> =>
    apiClient.get<BillingRecord>(`/api/billing/${id}`),

  // === INCOME PENDING (2 Endpoints) ===
  // 4. GET /api/income-pending
  getIncomePendingList: (): Promise<ApiResponse<IncomePending[]>> =>
    apiClient.get<IncomePending[]>("/api/income-pending"),

  // 5. GET /api/income-pending/:id
  getIncomePendingById: (id: string | number): Promise<ApiResponse<IncomePending>> =>
    apiClient.get<IncomePending>(`/api/income-pending/${id}`),

  // === INVOICES (2 Endpoints) ===
  // 6. GET /api/invoice
  getInvoices: (params?: { status?: string; page?: number }): Promise<ApiResponse<Invoice[]>> =>
    apiClient.get<Invoice[]>("/api/invoice", { params }),

  // 7. GET /api/invoice/:id
  getInvoiceById: (id: string | number): Promise<ApiResponse<Invoice>> =>
    apiClient.get<Invoice>(`/api/invoice/${id}`),

  // === REPORTS (3 Endpoints) ===
  // 8. GET /api/report/always
  getAlwaysReport: (params?: FinancialReportFilter): Promise<ApiResponse<FinancialReport>> =>
    apiClient.get<FinancialReport>("/api/report/always", { params }),

  // 9. GET /api/report/month
  getMonthReport: (params?: FinancialReportFilter): Promise<ApiResponse<FinancialReport>> =>
    apiClient.get<FinancialReport>("/api/report/month", { params }),

  // 10. GET /api/report/payas
  getPayasReport: (params?: FinancialReportFilter): Promise<ApiResponse<FinancialReport>> =>
    apiClient.get<FinancialReport>("/api/report/payas", { params }),

  // === VOUCHERS (1 Endpoint) ===
  // 11. POST /api/vouchers/validate
  validateVoucher: (data: { code: string; amount?: number }, idempotencyKey?: string): Promise<ApiResponse<VoucherValidationResult>> =>
    apiClient.post<VoucherValidationResult>("/api/vouchers/validate", data, { idempotencyKey }),

  // === WITHDRAWALS (3 Endpoints) ===
  // 12. GET /api/withdrawal
  getWithdrawals: (): Promise<ApiResponse<WithdrawalRecord[]>> =>
    apiClient.get<WithdrawalRecord[]>("/api/withdrawal"),

  // 13. POST /api/withdrawal
  requestWithdrawal: (data: UserWithdrawalRequestDto, idempotencyKey?: string): Promise<ApiResponse<WithdrawalRecord>> =>
    apiClient.post<WithdrawalRecord>("/api/withdrawal", data, { idempotencyKey }),

  // 14. GET /api/withdrawal/:id
  getWithdrawalById: (id: string | number): Promise<ApiResponse<WithdrawalRecord>> =>
    apiClient.get<WithdrawalRecord>(`/api/withdrawal/${id}`),
};
