// ==============================================================================
// GoVPN IAM Superadmin User Activity & Audit Trail Table Component
// Part of Pola C: components/admin/AdminUserActivityTable.tsx
// 100% Coinbase Institutional Design System (Security Audit Trail)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { UserActivityLog, UserAuditLog } from "../../types/iam.types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
            <table className="w-full text-left text-sm text-muted-foreground font-mono">
              <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Waktu</th>
                  <th className="px-5 py-4">User ID</th>
                  <th className="px-5 py-4">Aksi / Event</th>
                  <th className="px-5 py-4">Alamat IP &amp; Perangkat</th>
                  <th className="px-5 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border/40 text-xs">
                {activities.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-muted-foreground font-sans"
                    >
                      Belum ada catatan log aktivitas pengguna.
                    </td>
                  </tr>
                ) : (
                  activities.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(item.created_at)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-foreground">
                        #{item.user_id}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold">
                          {item.action}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Globe className="h-3.5 w-3.5" />
                          <span>{item.ip_address || "127.0.0.1"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {onDeleteActivity && (
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={deletingId === item.id}
                            onClick={() => handleDeleteActivity(item.id)}
                            className="h-7 w-7 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Audit Log Admin Tab */}
        <TabsContent value="audit" className="mt-3">
          <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
            <table className="w-full text-left text-sm text-muted-foreground font-mono">
              <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Waktu</th>
                  <th className="px-5 py-4">Admin ID</th>
                  <th className="px-5 py-4">Target User</th>
                  <th className="px-5 py-4">Operasi Admin</th>
                  <th className="px-5 py-4">Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border/40 text-xs">
                {logs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-muted-foreground font-sans"
                    >
                      Belum ada catatan log audit superadmin.
                    </td>
                  </tr>
                ) : (
                  logs.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(item.created_at)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-foreground">
                        Admin #{item.admin_id || "Root"}
                      </td>
                      <td className="px-5 py-3.5 text-foreground">
                        #{item.target_user_id || "-"}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-bold">
                          {item.action}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground font-sans text-xs max-w-[250px] truncate">
                        {item.metadata || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
