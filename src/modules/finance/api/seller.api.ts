// ==============================================================================
// GoVPN Finance Seller / Reseller API Client (2 Endpoints)
// Synchronized with backendv2 04-finance catalog
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { WithdrawalRecord } from "../types/finance.types";
import { SellerWithdrawalRequestDto } from "../types/seller.types";

export const financeSellerApi = {
  // 1. POST /api/seller/withdrawal
  requestWithdrawal: (data: SellerWithdrawalRequestDto, idempotencyKey?: string): Promise<ApiResponse<WithdrawalRecord>> =>
    apiClient.post<WithdrawalRecord>("/api/seller/withdrawal", data, { idempotencyKey }),

  // 2. GET /api/seller/withdrawal/:id
  getWithdrawalById: (id: string | number): Promise<ApiResponse<WithdrawalRecord>> =>
    apiClient.get<WithdrawalRecord>(`/api/seller/withdrawal/${id}`),
};
