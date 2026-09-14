// ==============================================================================
// GoVPN Finance Superadmin API Client (32 Endpoints)
// Synchronized with backendv2 04-finance catalog
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import {
  BillingRecord,
  IncomePending,
  Invoice,
  Voucher,
  WithdrawalRecord,
} from "../types/finance.types";
import {
  AdminCreateBillingDto,
  AdminCreateInvoiceDto,
  AdminCreateVoucherDto,
  AdminUpdateInvoiceStatusDto,
  AdminUpdateWithdrawalStatusDto,
} from "../types/admin.types";

export const financeAdminApi = {
  // === ADMIN BILLING (7 Endpoints) ===
  // 1. GET /api/admin/billing
  getBillingList: (params?: { page?: number; limit?: number; user_id?: string }): Promise<ApiResponse<BillingRecord[]>> =>
    apiClient.get<BillingRecord[]>("/api/admin/billing", { params }),

  // 2. POST /api/admin/billing
  createBillingAdjustment: (data: AdminCreateBillingDto): Promise<ApiResponse<BillingRecord>> =>
    apiClient.post<BillingRecord>("/api/admin/billing", data),

  // 3. GET /api/admin/billing/:id
  getBillingById: (id: string | number): Promise<ApiResponse<BillingRecord>> =>
    apiClient.get<BillingRecord>(`/api/admin/billing/${id}`),

  // 4. PUT /api/admin/billing/:id
  updateBilling: (id: string | number, data: Partial<AdminCreateBillingDto>): Promise<ApiResponse<BillingRecord>> =>
    apiClient.put<BillingRecord>(`/api/admin/billing/${id}`, data),

  // 5. PATCH /api/admin/billing/:id
  patchBilling: (id: string | number, data: Partial<AdminCreateBillingDto>): Promise<ApiResponse<BillingRecord>> =>
    apiClient.patch<BillingRecord>(`/api/admin/billing/${id}`, data),

  // 6. DELETE /api/admin/billing/:id
  deleteBilling: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/billing/${id}`),

  // 7. POST /api/admin/billing/check-expired
  checkExpiredBilling: (): Promise<ApiResponse<{ expired_count: number }>> =>
    apiClient.post<{ expired_count: number }>("/api/admin/billing/check-expired"),

  // === ADMIN INCOME PENDING (8 Endpoints) ===
  // 8. GET /api/admin/income-pending
  getIncomePendingList: (params?: { status?: string }): Promise<ApiResponse<IncomePending[]>> =>
    apiClient.get<IncomePending[]>("/api/admin/income-pending", { params }),

  // 9. GET /api/admin/income-pending/:id
  getIncomePendingById: (id: string | number): Promise<ApiResponse<IncomePending>> =>
    apiClient.get<IncomePending>(`/api/admin/income-pending/${id}`),

  // 10. DELETE /api/admin/income-pending/:id
  deleteIncomePending: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/income-pending/${id}`),

  // 11. POST /api/admin/income-pending/always-pending
  triggerAlwaysPending: (): Promise<ApiResponse<{ processed: number }>> =>
    apiClient.post<{ processed: number }>("/api/admin/income-pending/always-pending"),

  // 12. DELETE /api/admin/income-pending/cleanup
  cleanupIncomePending: (): Promise<ApiResponse<{ cleaned_count: number }>> =>
    apiClient.delete<{ cleaned_count: number }>("/api/admin/income-pending/cleanup"),

  // 13. POST /api/admin/income-pending/monthly-pending
  triggerMonthlyPending: (): Promise<ApiResponse<{ processed: number }>> =>
    apiClient.post<{ processed: number }>("/api/admin/income-pending/monthly-pending"),

  // 14. POST /api/admin/income-pending/payas-pending
  triggerPayasPending: (): Promise<ApiResponse<{ processed: number }>> =>
    apiClient.post<{ processed: number }>("/api/admin/income-pending/payas-pending"),

  // 15. PATCH /api/admin/income-pending/status
  updateIncomePendingStatus: (data: { id: string | number; status: string }): Promise<ApiResponse<IncomePending>> =>
    apiClient.patch<IncomePending>("/api/admin/income-pending/status", data),

  // === ADMIN INVOICE (7 Endpoints) ===
  // 16. GET /api/admin/invoice
  getInvoices: (params?: { page?: number; status?: string }): Promise<ApiResponse<Invoice[]>> =>
    apiClient.get<Invoice[]>("/api/admin/invoice", { params }),

  // 17. POST /api/admin/invoice
  createInvoice: (data: AdminCreateInvoiceDto): Promise<ApiResponse<Invoice>> =>
    apiClient.post<Invoice>("/api/admin/invoice", data),

  // 18. GET /api/admin/invoice/:id
  getInvoiceById: (id: string | number): Promise<ApiResponse<Invoice>> =>
    apiClient.get<Invoice>(`/api/admin/invoice/${id}`),

  // 19. PUT /api/admin/invoice/:id
  updateInvoice: (id: string | number, data: Partial<AdminCreateInvoiceDto>): Promise<ApiResponse<Invoice>> =>
    apiClient.put<Invoice>(`/api/admin/invoice/${id}`, data),

  // 20. DELETE /api/admin/invoice/:id
  deleteInvoice: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/invoice/${id}`),

  // 21. DELETE /api/admin/invoice/cleanup
  cleanupInvoices: (): Promise<ApiResponse<{ cleaned_count: number }>> =>
    apiClient.delete<{ cleaned_count: number }>("/api/admin/invoice/cleanup"),

  // 22. PATCH /api/admin/invoice/status
  updateInvoiceStatus: (id: string | number, data: AdminUpdateInvoiceStatusDto): Promise<ApiResponse<Invoice>> =>
    apiClient.patch<Invoice>(`/api/admin/invoice/status`, { id, ...data }),

  // === ADMIN VOUCHERS (5 Endpoints) ===
  // 23. GET /api/admin/vouchers
  getVouchers: (): Promise<ApiResponse<Voucher[]>> =>
    apiClient.get<Voucher[]>("/api/admin/vouchers"),

  // 24. POST /api/admin/vouchers
  createVoucher: (data: AdminCreateVoucherDto): Promise<ApiResponse<Voucher>> =>
    apiClient.post<Voucher>("/api/admin/vouchers", data),

  // 25. GET /api/admin/vouchers/:id
  getVoucherById: (id: string | number): Promise<ApiResponse<Voucher>> =>
    apiClient.get<Voucher>(`/api/admin/vouchers/${id}`),

  // 26. PUT /api/admin/vouchers/:id
  updateVoucher: (id: string | number, data: Partial<AdminCreateVoucherDto>): Promise<ApiResponse<Voucher>> =>
    apiClient.put<Voucher>(`/api/admin/vouchers/${id}`, data),

  // 27. DELETE /api/admin/vouchers/:id
  deleteVoucher: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/vouchers/${id}`),

  // === ADMIN WITHDRAWAL (5 Endpoints) ===
  // 28. GET /api/admin/withdrawal
  getWithdrawals: (params?: { status?: string }): Promise<ApiResponse<WithdrawalRecord[]>> =>
    apiClient.get<WithdrawalRecord[]>("/api/admin/withdrawal", { params }),

  // 29. GET /api/admin/withdrawal/:id
  getWithdrawalById: (id: string | number): Promise<ApiResponse<WithdrawalRecord>> =>
    apiClient.get<WithdrawalRecord>(`/api/admin/withdrawal/${id}`),

  // 30. PUT /api/admin/withdrawal/:id
  updateWithdrawal: (id: string | number, data: Partial<WithdrawalRecord>): Promise<ApiResponse<WithdrawalRecord>> =>
    apiClient.put<WithdrawalRecord>(`/api/admin/withdrawal/${id}`, data),

  // 31. DELETE /api/admin/withdrawal/:id
  deleteWithdrawal: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/withdrawal/${id}`),

  // 32. PATCH /api/admin/withdrawal/status
  updateWithdrawalStatus: (id: string | number, data: AdminUpdateWithdrawalStatusDto): Promise<ApiResponse<WithdrawalRecord>> =>
    apiClient.patch<WithdrawalRecord>("/api/admin/withdrawal/status", { id, ...data }),
};
