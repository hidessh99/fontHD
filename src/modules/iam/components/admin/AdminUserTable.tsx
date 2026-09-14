// ==============================================================================
// GoVPN IAM Superadmin User Directory Table Component
// Part of Pola C: components/admin/AdminUserTable.tsx
// 100% Coinbase Institutional Design System (Search, Filter, Balance, Actions)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { UserProfile, UserRole } from "../../types/iam.types";
import {
  AdminAdjustBalanceDto,
  AdminAdjustIncomeDto,
} from "../../types/admin.types";
import { RoleBadge } from "../shared/RoleBadge";
import { AdminBalanceAdjustModal } from "./AdminBalanceAdjustModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, Trash2, Calendar, Mail } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(u.id).includes(searchQuery);

    const matchRole =
      roleFilter === "ALL" ||
      u.role?.toUpperCase() === roleFilter.toUpperCase();

    return matchSearch && matchRole;
  });

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

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari ID, username, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 font-mono text-xs rounded-xl min-h-10"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border border-input bg-background px-3 py-2 text-xs font-mono font-semibold"
          >
            <option value="ALL">Semua Peran</option>
            <option value="USER">USER</option>
            <option value="SELLER">SELLER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="SUPERADMIN">SUPERADMIN</option>
          </select>
        </div>

        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="rounded-full text-xs font-mono h-9 px-4 gap-1.5 self-start sm:self-center"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Segarkan Data
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
        <table className="w-full text-left text-sm text-muted-foreground font-mono">
          <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-4">User</th>
              <th className="px-5 py-4">Peran (Role)</th>
              <th className="px-5 py-4">Saldo Dompet</th>
              <th className="px-5 py-4">Komisi Reseller</th>
              <th className="px-5 py-4">Bergabung</th>
              <th className="px-5 py-4 text-right">Aksi Superadmin</th>
            </tr>
          </thead>
          <tbody className="divide-y border-border/40 text-xs">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-8 text-center text-muted-foreground font-sans"
                >
                  Tidak ada data user yang sesuai kriteria pencarian.
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-sans">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground font-mono">
                        {u.username}{" "}
                        <span className="text-muted-foreground font-normal text-[11px]">
                          (#{u.id})
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {u.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    {onChangeRole ? (
                      <select
                        value={u.role || "USER"}
                        onChange={(e) =>
                          handleRoleChange(u.id, e.target.value as UserRole)
                        }
                        className="rounded-lg border border-border/60 bg-surface px-2 py-1 text-[11px] font-mono font-bold"
                      >
                        <option value="USER">USER</option>
                        <option value="SELLER">SELLER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="SUPERADMIN">SUPERADMIN</option>
                      </select>
                    ) : (
                      <RoleBadge role={u.role} />
                    )}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-emerald-400">
                    {formatIDR(u.balance)}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-blue-400">
                    {formatIDR(u.income)}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString("id-ID")
                        : "-"}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
