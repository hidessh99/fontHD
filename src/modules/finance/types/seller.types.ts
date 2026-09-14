// ==============================================================================
// GoVPN Finance Seller / Reseller Role DTOs & Contracts (2 Endpoints)
// ==============================================================================

export interface SellerWithdrawalRequestDto {
  amount: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  notes?: string;
}

export interface SellerCommissionStats {
  total_earned: number;
  available_balance: number;
  pending_withdrawal: number;
  total_withdrawn: number;
}
