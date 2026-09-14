// ==============================================================================
// GoVPN IAM Superadmin Roles & Permissions View
// Part of Pola C: views/admin/AdminRolesView.tsx
// 100% Coinbase Institutional Design System (RBAC Hierarchy)
// ==============================================================================

"use client";

import React, { useEffect } from "react";
import { useIamAdmin } from "../../hooks/useIamAdmin";
import { AdminRoleManager } from "../../components/admin/AdminRoleManager";
import { ShieldCheck } from "lucide-react";

export function AdminRolesView() {
  const { roles, fetchRoles, createRole, deleteRole } = useIamAdmin();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Manajemen Peran &amp; Hak Akses (RBAC)
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Konfigurasi hierarki peran akun, definisi perizinan modul, dan
          pembatasan wewenang pengguna sistem.
        </p>
      </div>

      <AdminRoleManager
        roles={roles}
        onCreateRole={createRole}
        onDeleteRole={deleteRole}
      />
    </div>
  );
}
