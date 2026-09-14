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
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleDeleteActivity = async (id: string | number) => {
    if (!onDeleteActivity) return;
    setDeletingId(id);
    try {
      await onDeleteActivity(id);
      toast.success("Catatan aktivitas berhasil dihapus.");
    } catch {
      toast.error("Gagal menghapus catatan aktivitas.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const activityColumns: ColumnDef<UserActivityLog>[] = useMemo(
    () => [
      {
        id: "created_at",
        header: "Waktu",
        cell: (item) => (
          <div className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground font-mono">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{formatDate(item.created_at)}</span>
          </div>
        ),
      },
      {
        id: "user_id",
        header: "User ID",
        className: "font-bold text-foreground font-mono",
        cell: (item) => `#${item.user_id}`,
      },
      {
        id: "action",
        header: "Aksi / Event",
        cell: (item) => (
          <span className="bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold font-mono">
            {item.action}
          </span>
        ),
      },
      {
        id: "ip_address",
        header: "Alamat IP & Perangkat",
        cell: (item) => (
          <div className="flex items-center gap-1.5 text-muted-foreground font-mono">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span>{item.ip_address || "127.0.0.1"}</span>
          </div>
        ),
      },
      {
        id: "actions",
        header: "Aksi",
        align: "right",
        cell: (item) =>
          onDeleteActivity ? (
            <Button
              variant="ghost"
              size="sm"
              disabled={deletingId === item.id}
              onClick={() => handleDeleteActivity(item.id)}
              className="h-7 w-7 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
              title="Hapus Aktivitas"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          ) : null,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deletingId, onDeleteActivity],
  );

  const auditColumns: ColumnDef<UserAuditLog>[] = useMemo(
    () => [
      {
        id: "created_at",
        header: "Waktu",
        cell: (item) => (
          <div className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground font-mono">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{formatDate(item.created_at)}</span>
          </div>
        ),
      },
      {
        id: "admin_id",
        header: "Admin ID",
        className: "font-bold text-foreground font-mono",
        cell: (item) => `Admin #${item.admin_id || "Root"}`,
      },
      {
        id: "target_user_id",
        header: "Target User",
        className: "text-foreground font-mono",
        cell: (item) => `#${item.target_user_id || "-"}`,
      },
      {
        id: "action",
        header: "Operasi Admin",
        cell: (item) => (
          <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-bold font-mono">
            {item.action}
          </span>
        ),
      },
      {
        id: "metadata",
        header: "Metadata",
        cell: (item) => (
          <span className="text-muted-foreground font-sans text-xs max-w-[250px] truncate block">
            {item.metadata || "-"}
          </span>
        ),
      },
    ],
    [],
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
            Aktivitas Pengguna ({activities.length})
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="gap-2 text-xs font-mono font-medium data-state-active:bg-background data-state-active:text-foreground"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            Audit Log Admin ({logs.length})
          </TabsTrigger>
        </TabsList>

        {/* User Activities Tab */}
        <TabsContent value="activities" className="mt-3">
          <DataTable<UserActivityLog>
            data={activities}
            columns={activityColumns}
            keyExtractor={(item) => item.id}
            searchable={true}
            searchPlaceholder="Cari User ID, aksi, alamat IP..."
            searchButtonText="Cari"
            searchAccessor={(item) => [item.user_id, item.action, item.ip_address]}
            paginated={true}
            pageSize={10}
            entityName="aktivitas"
            emptyIcon={History}
            emptyTitle="Belum Ada Log Aktivitas"
            emptyDescription="Belum ada catatan log aktivitas pengguna yang terekam."
          />
        </TabsContent>

        {/* Audit Log Admin Tab */}
        <TabsContent value="audit" className="mt-3">
          <DataTable<UserAuditLog>
            data={logs}
            columns={auditColumns}
            keyExtractor={(item) => item.id}
            searchable={true}
            searchPlaceholder="Cari Admin ID, target user, operasi..."
            searchButtonText="Cari"
            searchAccessor={(item) => [
              item.admin_id,
              item.target_user_id,
              item.action,
              item.metadata,
            ]}
            paginated={true}
            pageSize={10}
            entityName="audit log"
            emptyIcon={ShieldAlert}
            emptyTitle="Belum Ada Log Audit"
            emptyDescription="Belum ada catatan log audit superadmin yang terekam."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
