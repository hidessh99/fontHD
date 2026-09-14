// ==============================================================================
// GoVPN AI Superadmin Hook
// Part of Pola C: hooks/useAiAdmin.ts
// Models, Providers, Wallets & Dashboard Analytics
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { aiAdminApi } from "../api/admin.api";
import type { AiModel, AiProvider, AiWallet } from "../types/ai.types";
import type {
  AdminCreateModelDto,
  AdminCreateProviderDto,
  AdminWalletAdjustDto,
  AdminAiStats,
} from "../types/admin.types";

const MOCK_ADMIN_MODELS: AiModel[] = [
  {
    id: 1,
    model_id: "gpt-4o",
    name: "OpenAI GPT-4o (Omni)",
    provider_id: 1,
    context_window: 128000,
    input_price_per_1k: 40,
    output_price_per_1k: 160,
    is_active: true,
  },
  {
    id: 2,
    model_id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider_id: 2,
    context_window: 200000,
    input_price_per_1k: 45,
    output_price_per_1k: 220,
    is_active: true,
  },
  {
    id: 3,
    model_id: "deepseek-chat",
    name: "DeepSeek V3",
    provider_id: 3,
    context_window: 64000,
    input_price_per_1k: 4,
    output_price_per_1k: 16,
    is_active: true,
  },
];

const MOCK_ADMIN_PROVIDERS: AiProvider[] = [
  {
    id: 1,
    name: "OpenAI Direct",
    base_url: "https://api.openai.com/v1",
    api_key_masked: "sk-proj-••••••••••••••••",
    is_active: true,
    model_count: 4,
  },
  {
    id: 2,
    name: "Anthropic Claude",
    base_url: "https://api.anthropic.com/v1",
    api_key_masked: "sk-ant-••••••••••••••••",
    is_active: true,
    model_count: 2,
  },
  {
    id: 3,
    name: "DeepSeek Official",
    base_url: "https://api.deepseek.com/v1",
    api_key_masked: "sk-ds-••••••••••••••••",
    is_active: true,
    model_count: 2,
  },
];

const MOCK_ADMIN_WALLETS: AiWallet[] = [
  {
    user_id: 101,
    balance: 150000,
    currency: "IDR",
    used_tokens: 482000,
    total_requests: 312,
  },
  {
    user_id: 102,
    balance: 85000,
    currency: "IDR",
    used_tokens: 120000,
    total_requests: 94,
  },
];

const MOCK_ADMIN_STATS: AdminAiStats = {
  total_requests: 4820,
  total_tokens: 18450000,
  total_cost: 482000,
  active_models: 6,
  active_providers: 3,
};

export function useAiAdmin() {
  const [models, setModels] = useState<AiModel[]>([]);
  const [providers, setProviders] = useState<AiProvider[]>([]);
  const [wallets, setWallets] = useState<AiWallet[]>([]);
  const [stats, setStats] = useState<AdminAiStats>(MOCK_ADMIN_STATS);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    try {
      const [modelsRes, provRes, walletsRes, statsRes] = await Promise.all([
        aiAdminApi.listModels(),
        aiAdminApi.listProviders(),
        aiAdminApi.listWallets(),
        aiAdminApi.getDashboardStats().catch(() => null),
      ]);

      const mList = modelsRes.payload || modelsRes.data || [];
      const pList = provRes.payload || provRes.data || [];
      const wList = walletsRes.payload || walletsRes.data || [];
      const sData = statsRes?.payload || statsRes?.data;

      setModels(mList.length > 0 ? mList : MOCK_ADMIN_MODELS);
      setProviders(pList.length > 0 ? pList : MOCK_ADMIN_PROVIDERS);
      setWallets(wList.length > 0 ? wList : MOCK_ADMIN_WALLETS);
      if (sData) setStats(sData);
    } catch {
      setModels(MOCK_ADMIN_MODELS);
      setProviders(MOCK_ADMIN_PROVIDERS);
      setWallets(MOCK_ADMIN_WALLETS);
      setStats(MOCK_ADMIN_STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const createModel = async (dto: AdminCreateModelDto) => {
    try {
      const res = await aiAdminApi.createModel(dto);
      const created = res.payload || res.data;
      if (created) {
        setModels((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mockM: AiModel = {
        id: Date.now(),
        model_id: dto.model_id,
        name: dto.name,
        provider_id: dto.provider_id,
        context_window: dto.context_window || 128000,
        input_price_per_1k: dto.input_price_per_1k || 15,
        output_price_per_1k: dto.output_price_per_1k || 60,
        is_active: dto.is_active ?? true,
      };
      setModels((prev) => [mockM, ...prev]);
      return mockM;
    }
  };

  const deleteModel = async (id: string | number) => {
    try {
      await aiAdminApi.deleteModel(id);
      setModels((prev) => prev.filter((m) => m.id !== id));
    } catch {
      setModels((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const createProvider = async (dto: AdminCreateProviderDto) => {
    try {
      const res = await aiAdminApi.createProvider(dto);
      const created = res.payload || res.data;
      if (created) {
        setProviders((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mockP: AiProvider = {
        id: Date.now(),
        name: dto.name,
        base_url: dto.base_url,
        api_key_masked: dto.api_key.substring(0, 6) + "••••••••••••••••",
        is_active: dto.is_active ?? true,
        model_count: 0,
      };
      setProviders((prev) => [mockP, ...prev]);
      return mockP;
    }
  };

  const deleteProvider = async (id: string | number) => {
    try {
      await aiAdminApi.deleteProvider(id);
      setProviders((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setProviders((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const adjustWallet = async (dto: AdminWalletAdjustDto) => {
    try {
      const res = await aiAdminApi.adjustWallet(dto);
      const updated = res.payload || res.data;
      if (updated) {
        setWallets((prev) =>
          prev.map((w) => (w.user_id === dto.user_id ? updated : w)),
        );
        return updated;
      }
    } catch {
      setWallets((prev) =>
        prev.map((w) =>
          String(w.user_id) === String(dto.user_id)
            ? { ...w, balance: Math.max(0, w.balance + dto.amount) }
            : w,
        ),
      );
    }
  };

  return {
    models,
    providers,
    wallets,
    stats,
    loading,
    createModel,
    deleteModel,
    createProvider,
    deleteProvider,
    adjustWallet,
    refresh: fetchAdminData,
  };
}
