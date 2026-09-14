export interface AiModel {
  id: string;
  name: string;
  provider_id: string;
  provider_name?: string;
  context_window?: number;
  input_price_per_1k?: number;
  output_price_per_1k?: number;
  is_active: boolean;
  description?: string;
}

export interface AiProvider {
  id: string;
  name: string;
  base_url?: string;
  is_active: boolean;
}

export interface AiApiKey {
  id: string;
  name: string;
  key_prefix: string;
  key?: string;
  user_id: string;
  last_used_at?: string;
  created_at: string;
  revoked: boolean;
}

export interface AiWallet {
  user_id: string;
  balance: number;
  currency: string;
  used_tokens: number;
  last_topup_at?: string;
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
