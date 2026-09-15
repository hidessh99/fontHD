// ==============================================================================
// GoVPN Admin Kubernetes App Template Table Component
// Part of Pola C: components/admin/AdminK8sTemplateTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { useI18n } from "@/locales/client";
import { K8sTemplate } from "../../types/k8s.types";
import { AdminCreateTemplateDto } from "../../types/admin.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import { Rocket, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminK8sTemplateTableProps {
  templates: K8sTemplate[];
  onCreateTemplate: (dto: AdminCreateTemplateDto) => Promise<unknown>;
  onDeleteTemplate: (id: string | number) => Promise<unknown>;
  loading?: boolean;
}

export function AdminK8sTemplateTable({
  templates,
  onCreateTemplate,
  onDeleteTemplate,
  loading = false,
}: AdminK8sTemplateTableProps) {
  const { t } = useI18n();
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<
    "DATABASE" | "WEB" | "VPN" | "CMS" | "DEVOPS"
  >("VPN");
  const [image, setImage] = useState("");
  const [port, setPort] = useState(8388);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !image.trim()) {
      toast.error(t("kubernetes.templateValidation"));
      return;
    }

    setSubmitting(true);
    try {
      await onCreateTemplate({
        name: name.trim(),
        slug:
          slug.trim().toLowerCase() ||
          name.trim().toLowerCase().replace(/\s+/g, "-"),
        category,
        docker_image: image.trim(),
        default_port: Number(port) || 80,
        description: description.trim() || undefined,
      });
      setOpenCreate(false);
      setName("");
      setSlug("");
      setImage("");
      toast.success(t("kubernetes.templateAdded"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm(t("kubernetes.confirmDeleteTemplate"))) return;
    setDeletingId(id);
    try {
      await onDeleteTemplate(id);
      toast.success(t("kubernetes.templateDeleted"));
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<K8sTemplate>[] = useMemo(
    () => [
      {
        id: "name",
        header: t("kubernetes.colTemplateName"),
        className: "font-sans",
        cell: (tRow) => (
          <div className="flex flex-col">
            <span className="font-bold text-foreground">{tRow.name}</span>
            {tRow.description && (
              <span className="text-[11px] text-muted-foreground line-clamp-1">
                {tRow.description}
              </span>
            )}
          </div>
        ),
      },
      {
        id: "category",
        header: t("kubernetes.colCategory"),
        cell: (tRow) => (
          <Badge
            variant="outline"
            className="border-border bg-card text-foreground font-mono text-[11px]"
          >
            {tRow.category}
          </Badge>
        ),
      },
      {
        id: "docker_image",
        header: t("kubernetes.dockerImageLabel"),
        cell: (tRow) => (
          <span className="text-foreground font-semibold bg-surface border border-border/60 px-2.5 py-1 rounded-lg text-[11px] font-mono">
            {tRow.docker_image}
          </span>
        ),
      },
      {
        id: "port",
        header: t("kubernetes.portLabel"),
        className: "text-foreground font-mono",
        cell: (tRow) => `:${tRow.default_port}`,
      },
      {
        id: "actions",
        header: t("common.actions"),
        align: "right",
        cell: (tRow) => (
          <Button
            variant="ghost"
            size="sm"
            disabled={deletingId === tRow.id}
            onClick={() => handleDelete(tRow.id)}
            className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
            title={t("common.delete")}
          >
            {deletingId === tRow.id ? (
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

  const filters: DataTableFilterConfig<K8sTemplate>[] = useMemo(
    () => [
      {
        id: "category",
        label: t("kubernetes.category"),
        defaultValue: "ALL",
        options: [
          { label: t("kubernetes.catAll"), value: "ALL" },
          { label: t("kubernetes.catVpn"), value: "VPN" },
          { label: t("kubernetes.catWeb"), value: "WEB" },
          { label: t("kubernetes.catDatabase"), value: "DATABASE" },
          { label: t("kubernetes.catCms"), value: "CMS" },
          { label: t("kubernetes.catDevops"), value: "DEVOPS" },
        ],
        filterFn: (item, val) => item.category?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [t],
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
            {t("kubernetes.addTemplate")}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <Rocket className="h-5 w-5 text-primary" />
            {t("kubernetes.addTemplateTitle")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
          <div>
            <Label className="text-xs text-muted-foreground">{t("kubernetes.appName")}</Label>
            <Input
              placeholder="misal: Shadowsocks Libev"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">{t("kubernetes.category")}</Label>
            <NativeSelect
              variant="rounded"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value as "DATABASE" | "WEB" | "VPN" | "CMS" | "DEVOPS",
                )
              }
              className="mt-1.5 w-full text-xs font-mono"
            >
              <option value="VPN">{t("kubernetes.catVpn")}</option>
              <option value="WEB">{t("kubernetes.catWeb")}</option>
              <option value="DATABASE">{t("kubernetes.catDatabase")}</option>
              <option value="CMS">{t("kubernetes.catCms")}</option>
              <option value="DEVOPS">{t("kubernetes.catDevops")}</option>
            </NativeSelect>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">{t("kubernetes.dockerImageLabel")}</Label>
            <Input
              placeholder="shadowsocks/shadowsocks-libev:latest"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">{t("kubernetes.defaultPort")}</Label>
            <Input
              type="number"
              value={port}
              onChange={(e) => setPort(Number(e.target.value))}
              className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">{t("kubernetes.shortDescription")}</Label>
            <Input
              placeholder="Proxy tunneling aman berkecepatan tinggi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-10 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs gap-2 mt-2 shadow-md shadow-primary/25"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> {t("kubernetes.savingTemplate")}
              </>
            ) : (
              t("kubernetes.saveTemplate")
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
          <Rocket className="h-4 w-4 text-primary" />
          {t("kubernetes.templatesTitle")}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {t("kubernetes.templatesDesc")}
        </p>
      </div>

      <DataTable<K8sTemplate>
        data={templates}
        columns={columns}
        keyExtractor={(tRow) => tRow.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder={t("kubernetes.searchTemplatePlaceholder")}
        searchButtonText={t("common.search")}
        searchAccessor={(tRow) => [tRow.name, tRow.docker_image, tRow.description, tRow.category]}
        filters={filters}
        paginated={true}
        pageSize={10}
        entityName={t("kubernetes.templateEntityName")}
        actions={actions}
        emptyIcon={Rocket}
        emptyTitle={t("kubernetes.noTemplatesTitle")}
        emptyDescription={t("kubernetes.noTemplatesDesc")}
      />
    </div>
  );
}
