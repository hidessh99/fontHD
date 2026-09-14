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
      toast.success(`Peran user berhasil diubah menjadi ${newRole}!`);
    } catch {
      toast.error("Gagal mengubah peran user.");
    }
  };

  const handleDelete = async (userId: string | number) => {
    if (!onDeleteUser) return;
    setDeletingId(userId);
    try {
      await onDeleteUser(userId);
      toast.success("Akun user berhasil dihapus.");
    } catch {
      toast.error("Gagal menghapus akun user.");
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<UserProfile>[] = useMemo(
    () => [
      {
        id: "user",
        header: "User",
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
        header: "Peran (Role)",
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
        header: "Saldo Dompet",
        className: "font-bold text-emerald-400 font-mono",
        cell: (u) => formatIDR(u.balance),
      },
      {
        id: "income",
        header: "Komisi Reseller",
        className: "font-bold text-blue-400 font-mono",
        cell: (u) => formatIDR(u.income),
      },
      {
        id: "createdAt",
        header: "Bergabung",
        cell: (u) => (
          <div className="flex items-center gap-1 text-muted-foreground whitespace-nowrap">
            <Calendar className="h-3 w-3 shrink-0" />
            {u.createdAt
              ? new Date(u.createdAt).toLocaleDateString("id-ID")
              : "-"}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Aksi Superadmin",
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
    [deletingId, onChangeRole, onDeleteUser],
  );

  const filters: DataTableFilterConfig<UserProfile>[] = useMemo(
    () => [
      {
        id: "role",
        label: "Peran",
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
    [],
  );

  return (
    <DataTable<UserProfile>
      data={users}
      columns={columns}
      keyExtractor={(u) => u.id}
      isLoading={isLoading}
      searchable={true}
      searchPlaceholder="Cari ID, username, email..."
      searchButtonText="Cari"
      searchAccessor={(u) => [u.username, u.email, u.id]}
      filters={filters}
      paginated={true}
      pageSize={10}
      entityName="pengguna"
      emptyIcon={Users}
      emptyTitle="Pengguna Tidak Ditemukan"
      emptyDescription="Tidak ada data user yang sesuai dengan kriteria pencarian atau filter peran."
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
            Segarkan Data
          </Button>
        )
      }
    />
  );
}
