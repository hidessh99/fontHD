// ==============================================================================
// GoVPN AI Core Types & Contracts
// Synchronized with backendv2 AI Gateway & Provider Management
// ==============================================================================

export interface AiModel {
  id: string | number;
  model_id: string;
  name: string;
  provider_id: string | number;
  provider_name?: string;
  context_window?: number;
  input_price_per_1k?: number;
  output_price_per_1k?: number;
  is_active: boolean;
  capabilities?: string[];
  description?: string;
  created_at?: string;
}

export interface AiProvider {
  id: string | number;
  name: string;
  base_url?: string;
  api_key_masked?: string;
  is_active: boolean;
  model_count?: number;
  created_at?: string;
}

export interface AiApiKey {
  id: string | number;
  name: string;
  key_prefix: string;
  key?: string; // Only returned on creation
  user_id: string | number;
  last_used_at?: string;
  created_at: string;
  revoked: boolean;
}

export interface AiWallet {
  user_id: string | number;
  balance: number;
  currency: string;
  used_tokens: number;
  total_requests: number;
  last_topup_at?: string;
}

export interface AiUsageSummary {
  total_tokens: number;
  prompt_tokens: number;
  completion_tokens: number;
  total_cost: number;
  request_count: number;
}

export interface AiUsageLog {
  id: string | number;
  model: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cost: number;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
  tokens?: number;
}

export interface ChatCompletionDto {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatCompletionResponse {
  id: string;
  model: string;
  choices: Array<{
    message: {
      role: "assistant";
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
