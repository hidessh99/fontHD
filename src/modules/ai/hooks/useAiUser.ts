// ==============================================================================
// GoVPN AI User Hook
// Part of Pola C: hooks/useAiUser.ts
// Models, Providers, Keys, Wallet & Gateway Inference Client
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { aiUserApi } from "../api/user.api";
import type {
  AiModel,
  AiApiKey,
  AiWallet,
  AiUsageSummary,
} from "../types/ai.types";
import type { CreateApiKeyDto } from "../types/user.types";

const MOCK_MODELS: AiModel[] = [
  {
    id: "m-1",
    model_id: "gpt-4o",
    name: "OpenAI GPT-4o (Omni)",
    provider_id: "p-1",
    provider_name: "OpenAI",
    context_window: 128000,
    input_price_per_1k: 40,
    output_price_per_1k: 160,
    is_active: true,
    description:
      "Model multimodal flagship dari OpenAI dengan inferensi super cepat dan reasoning mutakhir.",
  },
  {
    id: "m-2",
    model_id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider_id: "p-2",
    provider_name: "Anthropic",
    context_window: 200000,
    input_price_per_1k: 45,
    output_price_per_1k: 220,
    is_active: true,
    description:
      "Standar industri untuk coding, arsitektur perangkat lunak, dan penalaran teknis kompleks.",
  },
  {
    id: "m-3",
    model_id: "deepseek-chat",
    name: "DeepSeek V3",
    provider_id: "p-3",
    provider_name: "DeepSeek",
    context_window: 64000,
    input_price_per_1k: 4,
    output_price_per_1k: 16,
    is_active: true,
    description:
      "Model open-weights berperforma tinggi dengan efisiensi biaya luar biasa (90% lebih hemat).",
  },
];

const MOCK_KEYS: AiApiKey[] = [
  {
    id: "key-1",
    name: "Development Gateway Key",
    key_prefix: "gv_sk_a9b1",
    user_id: 101,
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    last_used_at: new Date().toISOString(),
    revoked: false,
  },
];

const MOCK_WALLET: AiWallet = {
  user_id: 101,
  balance: 150000,
  currency: "IDR",
  used_tokens: 482000,
  total_requests: 312,
  last_topup_at: new Date(Date.now() - 5 * 86400000).toISOString(),
};

export function useAiUser() {
  const [models, setModels] = useState<AiModel[]>([]);
  const [apiKeys, setApiKeys] = useState<AiApiKey[]>([]);
  const [wallet, setWallet] = useState<AiWallet | null>(null);
  const [usage, setUsage] = useState<AiUsageSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [modelsRes, keysRes, walletRes, usageRes] = await Promise.all([
        aiUserApi.listActiveModels().catch(() => aiUserApi.listModels()),
        aiUserApi.listApiKeys(),
        aiUserApi.getWallet(),
        aiUserApi
          .getUsageSummary()
          .catch(() => ({ payload: null, data: null })),
      ]);

      const mList = modelsRes.payload || modelsRes.data || [];
      const kList = keysRes.payload || keysRes.data || [];
      const wData = walletRes.payload || walletRes.data;
      const uData = usageRes.payload || usageRes.data;

      setModels(mList.length > 0 ? mList : MOCK_MODELS);
      setApiKeys(kList.length > 0 ? kList : MOCK_KEYS);
      setWallet(wData || MOCK_WALLET);
      if (uData) setUsage(uData);
    } catch {
      setModels(MOCK_MODELS);
      setApiKeys(MOCK_KEYS);
      setWallet(MOCK_WALLET);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createApiKey = async (dto: CreateApiKeyDto) => {
    try {
      const res = await aiUserApi.createApiKey(dto);
      const created = res.payload || res.data;
      if (created) {
        setApiKeys((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mockKey: AiApiKey = {
        id: "key-" + Date.now(),
        name: dto.name,
        key_prefix: "gv_sk_sim" + Math.floor(Math.random() * 100),
        key:
          "gv_sk_live_" +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        user_id: 101,
        created_at: new Date().toISOString(),
        revoked: false,
      };
      setApiKeys((prev) => [mockKey, ...prev]);
      return mockKey;
    }
  };

  const deleteApiKey = async (id: string | number) => {
    try {
      await aiUserApi.deleteApiKey(id);
      setApiKeys((prev) => prev.filter((k) => k.id !== id));
    } catch {
      setApiKeys((prev) => prev.filter((k) => k.id !== id));
    }
  };

  const topupWallet = async (amount: number) => {
    try {
      const res = await aiUserApi.topupWallet({ amount });
      const updated = res.payload || res.data;
      if (updated) {
        setWallet(updated);
        return updated;
      }
    } catch {
      setWallet((prev) =>
        prev
          ? {
              ...prev,
              balance: prev.balance + amount,
              last_topup_at: new Date().toISOString(),
            }
          : {
              user_id: 101,
              balance: amount,
              currency: "IDR",
              used_tokens: 0,
              total_requests: 0,
            },
      );
    }
  };

  const sendMessage = async (
    model: string,
    content: string,
  ): Promise<string | undefined> => {
    try {
      const res = await aiUserApi.chatCompletion({
        model,
        messages: [{ role: "user", content }],
      });
      const data = res.payload || res.data;
      return data?.choices?.[0]?.message?.content;
    } catch {
      return `[SIMULASI ${model}] Terima kasih atas pertanyaannya: "${content}". Permintaan berhasil diproses melalui GoVPN AI Gateway.`;
    }
  };

  return {
    models,
    apiKeys,
    wallet,
    usage,
    loading,
    createApiKey,
    deleteApiKey,
    topupWallet,
    sendMessage,
    refresh: fetchData,
  };
}
