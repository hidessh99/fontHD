// ==============================================================================
// GoVPN AI User Role DTOs & Contracts (21 Endpoints)
// ==============================================================================

export interface CreateApiKeyDto {
  name: string;
}

export interface TopupAiWalletDto {
  amount: number;
}

export interface AiUsageFilterParams {
  model?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}
