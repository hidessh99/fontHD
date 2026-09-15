// ==============================================================================
// GoVPN IAM Superadmin User Directory Table Component
// Part of Pola C: components/admin/AdminUserTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { UserProfile, UserRole } from "../../types/iam.types";
import {
  AdminAdjustBalanceDto,
  AdminAdjustIncomeDto,
} from "../../types/admin.types";
import { RoleBadge } from "../shared/RoleBadge";
import { AdminBalanceAdjustModal } from "./AdminBalanceAdjustModal";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import { RefreshCw, Trash2, Calendar, Mail, Users } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

interface AdminUserTableProps {
  users: UserProfile[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onChangeRole?: (userId: string | number, role: UserRole) => Promise<unknown>;
  onDeleteUser?: (userId: string | number) => Promise<unknown>;
  onAddBalance?: (dto: AdminAdjustBalanceDto, key?: string) => Promise<unknown>;
  onReduceBalance?: (
    dto: AdminAdjustBalanceDto,
    key?: string,
  ) => Promise<unknown>;
  onAddIncome?: (dto: AdminAdjustIncomeDto, key?: string) => Promise<unknown>;
  onReduceIncome?: (
    dto: AdminAdjustIncomeDto,
    key?: string,
  ) => Promise<unknown>;
}

export function AdminUserTable({
  users,
  isLoading,
  onRefresh,
  onChangeRole,
  onDeleteUser,
  onAddBalance,
  onReduceBalance,
  onAddIncome,
  onReduceIncome,
}: AdminUserTableProps) {
  const { t, locale } = useI18n();
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const formatIDR = (val?: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const handleRoleChange = async (
    userId: string | number,
    newRole: UserRole,
  ) => {
    if (!onChangeRole) return;
    try {
      await onChangeRole(userId, newRole);
      toast.success(t("iam.userRoleUpdated", { role: newRole }));
    } catch {
      toast.error(t("iam.userRoleUpdateFailed"));
    }
  };

  const handleDelete = async (userId: string | number) => {
    if (!onDeleteUser) return;
    setDeletingId(userId);
    try {
      await onDeleteUser(userId);
      toast.success(t("iam.userAccountDeleted"));
    } catch {
      toast.error(t("iam.userAccountDeleteFailed"));
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<UserProfile>[] = useMemo(
    () => [
      {
        id: "user",
        header: t("iam.colUser"),
        cell: (u) => (
          <div className="flex flex-col font-sans">
            <span className="font-bold text-foreground font-mono">
              {u.username}{" "}
              <span className="text-muted-foreground font-normal text-[11px]">
                (#{u.id})
              </span>
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Mail className="h-3 w-3 shrink-0" /> {u.email}
            </span>
          </div>
        ),
      },
      {
        id: "role",
        header: t("iam.colRole"),
        cell: (u) =>
          onChangeRole ? (
            <NativeSelect
              variant="rounded"
              value={u.role || "USER"}
              onChange={(e) =>
                handleRoleChange(u.id, e.target.value as UserRole)
              }
              className="h-8 py-0.5 text-xs font-mono font-bold"
            >
              <option value="USER">USER</option>
              <option value="SELLER">SELLER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="SUPERADMIN">SUPERADMIN</option>
            </NativeSelect>
          ) : (
            <RoleBadge role={u.role} />
          ),
      },
      {
        id: "balance",
        header: t("iam.colWalletBalance"),
        className: "font-bold text-emerald-400 font-mono",
        cell: (u) => formatIDR(u.balance),
      },
      {
        id: "income",
        header: t("iam.colResellerIncome"),
        className: "font-bold text-blue-400 font-mono",
        cell: (u) => formatIDR(u.income),
      },
      {
        id: "createdAt",
        header: t("iam.colJoined"),
        cell: (u) => (
          <div className="flex items-center gap-1 text-muted-foreground whitespace-nowrap">
            <Calendar className="h-3 w-3 shrink-0" />
            {u.createdAt
              ? new Date(u.createdAt).toLocaleDateString(
                  locale === "id" ? "id-ID" : "en-US"
                )
              : "-"}
          </div>
        ),
      },
      {
        id: "actions",
        header: t("iam.colSuperadminActions"),
        align: "right",
        cell: (u) => (
          <div className="flex items-center justify-end gap-2">
            <AdminBalanceAdjustModal
              user={u}
              onAddBalance={onAddBalance}
              onReduceBalance={onReduceBalance}
              onAddIncome={onAddIncome}
              onReduceIncome={onReduceIncome}
            />

            {onDeleteUser && (
              <Button
                variant="ghost"
                size="sm"
                disabled={deletingId === u.id}
                onClick={() => handleDelete(u.id)}
                className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                title="Hapus Pengguna"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deletingId, locale, onChangeRole, onDeleteUser, t],
  );

  const filters: DataTableFilterConfig<UserProfile>[] = useMemo(
    () => [
      {
        id: "role",
        label: t("iam.colRole"),
        defaultValue: "ALL",
        options: [
          { label: "Semua Peran", value: "ALL" },
          { label: "USER", value: "USER" },
          { label: "SELLER", value: "SELLER" },
          { label: "ADMIN", value: "ADMIN" },
          { label: "SUPERADMIN", value: "SUPERADMIN" },
        ],
        filterFn: (u, val) => u.role?.toUpperCase() === val.toUpperCase(),
      },
    ],
    [t],
  );

  return (
    <DataTable<UserProfile>
      data={users}
      columns={columns}
      keyExtractor={(u) => u.id}
      isLoading={isLoading}
      searchable={true}
      searchPlaceholder={t("iam.searchUserPlaceholder")}
      searchButtonText={t("common.search", "Search")}
      searchAccessor={(u) => [u.username, u.email, u.id]}
      filters={filters}
      paginated={true}
      pageSize={10}
      entityName={t("iam.userEntityName")}
      emptyIcon={Users}
      emptyTitle={t("iam.noUsersTitle")}
      emptyDescription={t("iam.noUsersDesc")}
      actions={
        onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="rounded-full text-xs font-mono h-9 px-4 gap-1.5"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            {t("iam.refreshData")}
          </Button>
        )
      }
    />
  );
}
