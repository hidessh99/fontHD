// ==============================================================================
// GoVPN AI Admin Role DTOs & Contracts (14 Endpoints)
// ==============================================================================

export interface AdminCreateModelDto {
  model_id: string;
  name: string;
  provider_id: string | number;
  context_window?: number;
  input_price_per_1k?: number;
  output_price_per_1k?: number;
  is_active?: boolean;
  description?: string;
}

export interface AdminUpdateModelDto {
  model_id?: string;
  name?: string;
  provider_id?: string | number;
  context_window?: number;
  input_price_per_1k?: number;
  output_price_per_1k?: number;
  is_active?: boolean;
  description?: string;
}

export interface AdminCreateProviderDto {
  name: string;
  base_url?: string;
  api_key: string;
  is_active?: boolean;
}

export interface AdminUpdateProviderDto {
  name?: string;
  base_url?: string;
  api_key?: string;
  is_active?: boolean;
}

export interface AdminWalletAdjustDto {
  user_id: string | number;
  amount: number; // positive to add, negative to deduct
  reason: string;
}

export interface AdminAiStats {
  total_requests: number;
  total_tokens: number;
  total_cost: number;
  active_models: number;
  active_providers: number;
}
