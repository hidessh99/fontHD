// ==============================================================================
// GoVPN IAM Superadmin User Directory & Audit View
// Part of Pola C: views/admin/AdminUsersView.tsx
// 100% Coinbase Institutional Design System (Users Table, Balance Adjust, Audit)
// ==============================================================================

"use client";

import React, { useEffect } from "react";
import { useIamAdmin } from "../../hooks/useIamAdmin";
import { AdminUserTable } from "../../components/admin/AdminUserTable";
import { AdminUserActivityTable } from "../../components/admin/AdminUserActivityTable";
import { Users, UserCheck, Store, ShieldAlert } from "lucide-react";

export function AdminUsersView() {
  const {
    users,
    activities,
    logs,
    stats,
    isLoading,
    fetchUsers,
    changeUserRole,
    deleteUser,
    addBalance,
    reduceBalance,
    addIncome,
    reduceIncome,
    fetchActivities,
    deleteActivity,
    fetchStats,
  } = useIamAdmin();

  useEffect(() => {
    fetchUsers();
    fetchActivities();
    fetchStats();
  }, [fetchUsers, fetchActivities, fetchStats]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <Users className="h-6 w-6 text-primary" />
          Manajemen Pengguna &amp; Audit Akses
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pusat kendali akun pengguna, mutasi saldo/komisi admin, penetapan peran hierarkis, dan audit trail.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono uppercase">Total Pengguna</span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="font-mono text-2xl font-bold text-foreground">
            {stats?.total_users || users.length}
          </div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono uppercase">Pengguna Aktif</span>
            <UserCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-emerald-400">
            {stats?.active_users || users.filter((u) => u.isActive !== false).length}
          </div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono uppercase">Mitra Reseller</span>
            <Store className="h-4 w-4 text-blue-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-blue-400">
            {stats?.total_sellers || users.filter((u) => u.role === "SELLER" || u.role === "RESELLER").length}
          </div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono uppercase">Administrator</span>
            <ShieldAlert className="h-4 w-4 text-purple-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-purple-400">
            {stats?.total_admins || users.filter((u) => u.role === "ADMIN" || u.role === "SUPERADMIN").length}
          </div>
        </div>
      </div>

      {/* Main User Directory Table */}
      <AdminUserTable
        users={users}
        isLoading={isLoading}
        onRefresh={fetchUsers}
        onChangeRole={changeUserRole}
        onDeleteUser={deleteUser}
        onAddBalance={addBalance}
        onReduceBalance={reduceBalance}
        onAddIncome={addIncome}
        onReduceIncome={reduceIncome}
      />

      {/* Activity & Audit Trail */}
      <AdminUserActivityTable
        activities={activities}
        logs={logs}
        onDeleteActivity={deleteActivity}
      />
    </div>
  );
}
