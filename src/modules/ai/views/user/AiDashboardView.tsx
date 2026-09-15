// ==============================================================================
// GoVPN User AI Gateway Dashboard View Component
// Part of Pola C: views/user/AiDashboardView.tsx
// 100% Coinbase Institutional Design System (Keys, Wallet, Catalog & Playground)
// Fully Localized with useI18n (EN/ID)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useAiUser } from "../../hooks/useAiUser";
import { AiWalletCard } from "../../components/user/AiWalletCard";
import { AiApiKeyManager } from "../../components/user/AiApiKeyManager";
import { AiModelCatalog } from "../../components/user/AiModelCatalog";
import { AiChatPlayground } from "../../components/user/AiChatPlayground";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Cpu, Sparkles, RefreshCw } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function AiDashboardView() {
  const { t } = useI18n();
  const {
    models,
    apiKeys,
    wallet,
    loading,
    createApiKey,
    deleteApiKey,
    topupWallet,
    sendMessage,
    refresh,
  } = useAiUser();

  const [activeTab, setActiveTab] = useState<"keys" | "catalog" | "playground">(
    "keys",
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            {t("ai.title")}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {t("ai.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refresh()}
            disabled={loading}
            className="border-border bg-card/60 hover:bg-muted text-foreground gap-2 h-9 px-3.5 text-xs rounded-xl shadow-sm"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
            />
            {t("common.refresh")}
          </Button>
        </div>
      </div>

      {/* Tabs navigation */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "keys" | "catalog" | "playground")}
      >
        <TabsList variant="line" className="w-full justify-start border-b border-border/40">
          <TabsTrigger value="keys" className="gap-2">
            <Key className="h-3.5 w-3.5" />
            <span>{t("ai.apiKeysAndWallet")}</span>
          </TabsTrigger>
          <TabsTrigger value="catalog" className="gap-2">
            <Cpu className="h-3.5 w-3.5" />
            <span>{t("ai.modelCatalog")} ({models.length})</span>
          </TabsTrigger>
          <TabsTrigger value="playground" className="gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("ai.inferencePlayground")}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tab Panels */}
      {activeTab === "keys" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AiApiKeyManager
              apiKeys={apiKeys}
              onCreateKey={createApiKey}
              onDeleteKey={deleteApiKey}
              loading={loading}
            />
          </div>
          <div>
            <AiWalletCard wallet={wallet} onTopup={topupWallet} />
          </div>
        </div>
      )}

      {activeTab === "catalog" && <AiModelCatalog models={models} />}

      {activeTab === "playground" && (
        <AiChatPlayground models={models} onSendMessage={sendMessage} />
      )}
    </div>
  );
}
