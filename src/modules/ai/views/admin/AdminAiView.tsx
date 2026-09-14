// ==============================================================================
// GoVPN Superadmin AI Management View Component
// Part of Pola C: views/admin/AdminAiView.tsx
// 100% Coinbase Institutional Design System (Models, Providers, Wallets & Analytics)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useAiAdmin } from "../../hooks/useAiAdmin";
import { AdminAiModelTable } from "../../components/admin/AdminAiModelTable";
import { AdminAiProviderTable } from "../../components/admin/AdminAiProviderTable";
import { AdminAiWalletManager } from "../../components/admin/AdminAiWalletManager";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  Server,
  Wallet,
  Activity,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export function AdminAiView() {
  const {
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
    refresh,
  } = useAiAdmin();

  const [activeTab, setActiveTab] = useState<
    "models" | "providers" | "wallets"
  >("models");

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            Admin AI Gateway Control Center
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manajemen model inferensi LLM, koneksi provider upstream, dan audit
            dompet pengguna
          </p>
        </div>

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
          Segarkan
        </Button>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Total Permintaan
              </span>
              <div className="font-mono text-2xl font-bold text-foreground mt-1">
                {stats.total_requests.toLocaleString()}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Activity className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Konsumsi Token
              </span>
              <div className="font-mono text-2xl font-bold text-primary mt-1">
                {(stats.total_tokens / 1000000).toFixed(2)}M
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Cpu className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Model Aktif
              </span>
              <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">
                {models.length} Model
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Provider Terhubung
              </span>
              <div className="font-mono text-2xl font-bold text-amber-400 mt-1">
                {providers.length} Provider
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Server className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <button
          onClick={() => setActiveTab("models")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === "models"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Cpu className="h-3.5 w-3.5" />
          Model LLM ({models.length})
        </button>

        <button
          onClick={() => setActiveTab("providers")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === "providers"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Server className="h-3.5 w-3.5" />
          Provider Upstream ({providers.length})
        </button>

        <button
          onClick={() => setActiveTab("wallets")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === "wallets"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Wallet className="h-3.5 w-3.5" />
          Dompet Pengguna ({wallets.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "models" && (
        <AdminAiModelTable
          models={models}
          providers={providers}
          onCreateModel={createModel}
          onDeleteModel={deleteModel}
          loading={loading}
        />
      )}

      {activeTab === "providers" && (
        <AdminAiProviderTable
          providers={providers}
          onCreateProvider={createProvider}
          onDeleteProvider={deleteProvider}
          loading={loading}
        />
      )}

      {activeTab === "wallets" && (
        <AdminAiWalletManager
          wallets={wallets}
          onAdjustWallet={adjustWallet}
          loading={loading}
        />
      )}
    </div>
  );
}
