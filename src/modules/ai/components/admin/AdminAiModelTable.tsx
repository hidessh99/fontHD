// ==============================================================================
// GoVPN Admin AI Model Table Component
// Part of Pola C: components/admin/AdminAiModelTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// Fully Localized with useI18n (EN/ID)
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { AiModel, AiProvider } from "../../types/ai.types";
import { AdminCreateModelDto } from "../../types/admin.types";
import { ModelBadge } from "../shared/ModelBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable, ColumnDef } from "@/components/shared/data-table";
import { Cpu, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";

interface AdminAiModelTableProps {
  models: AiModel[];
  providers: AiProvider[];
  onCreateModel: (dto: AdminCreateModelDto) => Promise<unknown>;
  onDeleteModel: (id: string | number) => Promise<unknown>;
  loading?: boolean;
}

export function AdminAiModelTable({
  models,
  providers,
  onCreateModel,
  onDeleteModel,
  loading = false,
}: AdminAiModelTableProps) {
  const { t } = useI18n();
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [modelId, setModelId] = useState("");
  const [providerId, setProviderId] = useState<string | number>(
    providers[0]?.id || "",
  );
  const [contextWindow, setContextWindow] = useState(128000);
  const [inputPrice, setInputPrice] = useState(15);
  const [outputPrice] = useState(60);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  React.useEffect(() => {
    if (!providerId && providers.length > 0) {
      setProviderId(providers[0].id);
    }
  }, [providers, providerId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !modelId.trim() || !providerId) {
      toast.error(t("dns.nameAndContentRequired"));
      return;
    }

    setSubmitting(true);
    try {
      await onCreateModel({
        name: name.trim(),
        model_id: modelId.trim().toLowerCase(),
        provider_id: providerId,
        context_window: Number(contextWindow) || 128000,
        input_price_per_1k: Number(inputPrice) || 15,
        output_price_per_1k: Number(outputPrice) || 60,
        is_active: true,
      });
      setOpenCreate(false);
      setName("");
      setModelId("");
      toast.success(t("ai.modelRegistered"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm(t("ai.deleteModelConfirm"))) return;
    setDeletingId(id);
    try {
      await onDeleteModel(id);
      toast.success(t("ai.modelDeleted"));
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<AiModel>[] = useMemo(
    () => [
      {
        id: "name",
        header: t("ai.modelDisplayName"),
        className: "font-sans",
        cell: (m) => <span className="font-bold text-foreground">{m.name}</span>,
      },
      {
        id: "model_id",
        header: t("ai.modelIdentifier"),
        cell: (m) => (
          <span className="text-foreground font-semibold bg-surface border border-border/60 px-2 py-0.5 rounded text-[11px] font-mono">
            {m.model_id}
          </span>
        ),
      },
      {
        id: "provider",
        header: "Provider",
        cell: (m) => <ModelBadge modelName={m.model_id} />,
      },
      {
        id: "context_window",
        header: t("ai.contextWindow"),
        className: "text-foreground font-mono",
        cell: (m) =>
          m.context_window
            ? `${m.context_window.toLocaleString()} tokens`
            : "128k",
      },
      {
        id: "price",
        header: t("ai.inputPriceLabel"),
        className: "font-sans",
        cell: (m) => (
          <span className="text-foreground font-mono text-[11px]">
            Rp {m.input_price_per_1k || 15} / Rp {m.output_price_per_1k || 60}
          </span>
        ),
      },
      {
        id: "actions",
        header: t("common.actions"),
        align: "right",
        cell: (m) => (
          <Button
            variant="ghost"
            size="sm"
            disabled={deletingId === m.id}
            onClick={() => handleDelete(m.id)}
            className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
            title={t("ai.modelDeleted")}
          >
            {deletingId === m.id ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </Button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deletingId, t],
  );

  const actions = (
    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
      <DialogTrigger
        render={
          <Button
            size="sm"
            className="h-9 px-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
            {t("ai.addModel")}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <Cpu className="h-5 w-5 text-primary" />
            {t("ai.newModelModalTitle")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
          <div>
            <Label className="text-xs text-muted-foreground">
              {t("ai.selectBackendProvider")}
            </Label>
            <NativeSelect
              variant="rounded"
              value={String(providerId)}
              onChange={(e) => setProviderId(e.target.value)}
              className="mt-1.5 w-full text-xs font-mono"
            >
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </NativeSelect>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">
              {t("ai.modelDisplayName")}
            </Label>
            <Input
              placeholder="e.g. GPT-4o Omni"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">
              {t("ai.modelIdentifier")}
            </Label>
            <Input
              placeholder="e.g. gpt-4o or claude-3-5-sonnet"
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">
                {t("ai.contextWindow")}
              </Label>
              <Input
                type="number"
                value={contextWindow}
                onChange={(e) => setContextWindow(Number(e.target.value))}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">
                {t("ai.inputPriceLabel")}
              </Label>
              <Input
                type="number"
                value={inputPrice}
                onChange={(e) => setInputPrice(Number(e.target.value))}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-10 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs gap-2 mt-2 shadow-md shadow-primary/25"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> {t("ai.savingModel")}
              </>
            ) : (
              t("ai.saveModel")
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Cpu className="h-4 w-4 text-primary" />
          {t("ai.manageModelsTitle")}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {t("ai.manageModelsSubtitle")}
        </p>
      </div>

      <DataTable<AiModel>
        data={models}
        columns={columns}
        keyExtractor={(m) => m.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder={t("ai.searchModelsPlaceholder")}
        searchButtonText={t("common.search")}
        searchAccessor={(m) => [m.name, m.model_id]}
        paginated={true}
        pageSize={10}
        entityName="model AI"
        actions={actions}
        emptyIcon={Cpu}
        emptyTitle={t("ai.noAdminModels")}
        emptyDescription={t("ai.noAdminModelsDesc")}
      />
    </div>
  );
}
