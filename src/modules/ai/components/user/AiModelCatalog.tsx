// ==============================================================================
// GoVPN AI Model Catalog Component
// Part of Pola C: components/user/AiModelCatalog.tsx
// 100% Coinbase Institutional Design System (Context Windows & Token Pricing)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { AiModel } from "../../types/ai.types";
import { ModelBadge } from "../shared/ModelBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Cpu, Coins, Layers } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

interface AiModelCatalogProps {
  models: AiModel[];
}

export function AiModelCatalog({ models }: AiModelCatalogProps) {
  const [search, setSearch] = useState("");

  const filtered = models.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.model_id.toLowerCase().includes(search.toLowerCase()) ||
    (m.provider_name && m.provider_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            Katalog Model AI Tersedia
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar model LLM yang dapat diakses melalui unified API Gateway
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card/60 border-border text-foreground text-xs h-10 rounded-xl"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Cpu}
          title="Model Tidak Ditemukan"
          description="Tidak ada model AI yang cocok dengan pencarian Anda."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((model) => (
            <Card
              key={model.id}
              className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl hover:border-primary/40 transition-all shadow-sm flex flex-col justify-between"
            >
              <CardContent className="p-0 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-foreground line-clamp-1">
                      {model.name}
                    </h4>
                    <span className="font-mono text-xs text-primary font-medium">
                      {model.model_id}
                    </span>
                  </div>
                  <ModelBadge modelName={model.model_id || model.name} />
                </div>

                {model.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {model.description}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60 text-[11px] font-mono">
                  <div className="rounded-lg bg-muted/30 p-2">
                    <span className="text-muted-foreground font-sans flex items-center gap-1">
                      <Layers className="h-3 w-3 text-primary" /> Context
                    </span>
                    <span className="font-semibold text-foreground mt-0.5 block">
                      {model.context_window ? `${model.context_window / 1000}k` : "128k"}
                    </span>
                  </div>

                  <div className="rounded-lg bg-muted/30 p-2">
                    <span className="text-muted-foreground font-sans flex items-center gap-1">
                      <Coins className="h-3 w-3 text-amber-400" /> Harga / 1K
                    </span>
                    <span className="font-semibold text-foreground mt-0.5 block">
                      Rp {model.input_price_per_1k || 15}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
