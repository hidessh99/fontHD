// ==============================================================================
// GoVPN IAM Superadmin User Activity & Audit Trail Table Component
// Part of Pola C: components/admin/AdminUserActivityTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { UserActivityLog, UserAuditLog } from "../../types/iam.types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, ColumnDef } from "@/components/shared/data-table";
import { History, ShieldAlert, Calendar, Globe, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

interface AdminUserActivityTableProps {
  activities: UserActivityLog[];
  logs: UserAuditLog[];
  onDeleteActivity?: (id: string | number) => Promise<unknown>;
}

export function AdminUserActivityTable({
  activities,
  logs,
  onDeleteActivity,
}: AdminUserActivityTableProps) {
  const { t, locale } = useI18n();
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleDeleteActivity = async (id: string | number) => {
    if (!onDeleteActivity) return;
    setDeletingId(id);
    try {
      await onDeleteActivity(id);
      toast.success(t("iam.activityDeleted"));
    } catch {
      toast.error(t("iam.activityDeleteFailed"));
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString(
      locale === "id" ? "id-ID" : "en-US",
      {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );
  };

  const activityColumns: ColumnDef<UserActivityLog>[] = useMemo(
    () => [
      {
        id: "created_at",
        header: t("iam.colTime"),
        cell: (item) => (
          <div className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground font-mono">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{formatDate(item.created_at)}</span>
          </div>
        ),
      },
      {
        id: "user_id",
        header: t("iam.colUserId"),
        className: "font-bold text-foreground font-mono",
        cell: (item) => `#${item.user_id}`,
      },
      {
        id: "action",
        header: t("iam.colAction"),
        cell: (item) => (
          <span className="bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold font-mono">
            {item.action}
          </span>
        ),
      },
      {
        id: "ip_address",
        header: t("iam.colIpAndDevice"),
        cell: (item) => (
          <div className="flex items-center gap-1.5 text-muted-foreground font-mono">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span>{item.ip_address || "127.0.0.1"}</span>
          </div>
        ),
      },
      {
        id: "actions",
        header: t("common.actions", "Actions"),
        align: "right",
        cell: (item) =>
          onDeleteActivity ? (
            <Button
              variant="ghost"
              size="sm"
              disabled={deletingId === item.id}
              onClick={() => handleDeleteActivity(item.id)}
              className="h-7 w-7 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
              title={t("iam.activityDeleted")}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          ) : null,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deletingId, locale, onDeleteActivity, t],
  );

  const auditColumns: ColumnDef<UserAuditLog>[] = useMemo(
    () => [
      {
        id: "created_at",
        header: t("iam.colTime"),
        cell: (item) => (
          <div className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground font-mono">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{formatDate(item.created_at)}</span>
          </div>
        ),
      },
      {
        id: "admin_id",
        header: t("iam.colAdminId"),
        className: "font-bold text-foreground font-mono",
        cell: (item) => `Admin #${item.admin_id || "Root"}`,
      },
      {
        id: "target_user_id",
        header: t("iam.colTargetUser"),
        className: "text-foreground font-mono",
        cell: (item) => `#${item.target_user_id || "-"}`,
      },
      {
        id: "action",
        header: t("iam.colAdminOperation"),
        cell: (item) => (
          <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-bold font-mono">
            {item.action}
          </span>
        ),
      },
      {
        id: "metadata",
        header: t("iam.colMetadata"),
        cell: (item) => (
          <span className="text-muted-foreground font-sans text-xs max-w-62.5 truncate block">
            {item.metadata || "-"}
          </span>
        ),
      },
    ],
    [locale, t],
  );

  return (
    <div className="space-y-4">
      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="bg-muted/40 border border-border/80 p-1 rounded-xl">
          <TabsTrigger
            value="activities"
            className="gap-2 text-xs font-mono font-medium data-state-active:bg-background data-state-active:text-foreground"
          >
            <History className="h-3.5 w-3.5" />
            {t("iam.tabUserActivities", { count: activities.length })}
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="gap-2 text-xs font-mono font-medium data-state-active:bg-background data-state-active:text-foreground"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            {t("iam.tabAdminAudit", { count: logs.length })}
          </TabsTrigger>
        </TabsList>

        {/* User Activities Tab */}
        <TabsContent value="activities" className="mt-3">
          <DataTable<UserActivityLog>
            data={activities}
            columns={activityColumns}
            keyExtractor={(item) => item.id}
            searchable={true}
            searchPlaceholder={t("iam.searchActivityPlaceholder")}
            searchButtonText={t("common.search", "Search")}
            searchAccessor={(item) => [item.user_id, item.action, item.ip_address]}
            paginated={true}
            pageSize={10}
            entityName={t("iam.activityEntityName")}
            emptyIcon={History}
            emptyTitle={t("iam.noActivityTitle")}
            emptyDescription={t("iam.noActivityDesc")}
          />
        </TabsContent>

        {/* Audit Log Admin Tab */}
        <TabsContent value="audit" className="mt-3">
          <DataTable<UserAuditLog>
            data={logs}
            columns={auditColumns}
            keyExtractor={(item) => item.id}
            searchable={true}
            searchPlaceholder={t("iam.searchAuditPlaceholder")}
            searchButtonText={t("common.search", "Search")}
            searchAccessor={(item) => [
              item.admin_id,
              item.target_user_id,
              item.action,
              item.metadata,
            ]}
            paginated={true}
            pageSize={10}
            entityName={t("iam.auditEntityName")}
            emptyIcon={ShieldAlert}
            emptyTitle={t("iam.noAuditTitle")}
            emptyDescription={t("iam.noAuditDesc")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
