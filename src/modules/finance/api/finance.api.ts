import { httpClient } from "@/lib/api/http-client";
import type {
  Invoice,
  BillingRecord,
  CreateTopupDto,
  VoucherValidationResult,
  WithdrawalRequest,
  CreateWithdrawalDto,
} from "../types/finance.types";

export const financeApi = {
  // Invoices
  getInvoices: async (params?: { page?: number; limit?: number; status?: string }) => {
    return httpClient.get<Invoice[]>("/api/invoice", { params });
  },

  getInvoiceById: async (id: string) => {
    return httpClient.get<Invoice>(`/api/invoice/${id}`);
  },

  createInvoice: async (data: CreateTopupDto) => {
    return httpClient.post<Invoice>("/api/invoice", data);
  },

  // Billing ledger
  getBillingHistory: async (params?: { page?: number; limit?: number }) => {
    return httpClient.get<BillingRecord[]>("/api/billing", { params });
  },

  createBilling: async (data: Partial<BillingRecord>) => {
    return httpClient.post<BillingRecord>("/api/billing", data);
  },

  // Vouchers
  validateVoucher: async (code: string) => {
    return httpClient.post<VoucherValidationResult>("/api/vouchers/validate", { code });
  },

  // Withdrawals (User & Seller)
  getWithdrawals: async () => {
    return httpClient.get<WithdrawalRequest[]>("/api/withdrawal");
  },

  createWithdrawal: async (data: CreateWithdrawalDto) => {
    return httpClient.post<WithdrawalRequest>("/api/withdrawal", data);
  },

  createSellerWithdrawal: async (data: CreateWithdrawalDto) => {
    return httpClient.post<WithdrawalRequest>("/api/seller/withdrawal", data);
  },

  // Reports
  getMonthlyReport: async () => {
    return httpClient.get<Record<string, unknown>>("/api/report/month");
  },

  getAlwaysReport: async () => {
    return httpClient.get<Record<string, unknown>>("/api/report/always");
  },

  getPayAsReport: async () => {
    return httpClient.get<Record<string, unknown>>("/api/report/payas");
  },
};
