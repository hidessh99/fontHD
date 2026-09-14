// ==============================================================================
// GoVPN DNS Admin Cloudflare Accounts Table Component
// Part of Pola C: components/admin/AdminDnsAccountTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { DnsAccount } from "../../types/dns.types";
import { AdminCreateDnsAccountDto } from "../../types/admin.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import {
  Cloud,
  Plus,
  Trash2,
  Key,
  Loader2,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

interface AdminDnsAccountTableProps {
  accounts: DnsAccount[];
  onCreateAccount: (dto: AdminCreateDnsAccountDto) => Promise<unknown>;
  onDeleteAccount: (id: string | number) => Promise<unknown>;
  loading?: boolean;
}

export function AdminDnsAccountTable({
  accounts,
  onCreateAccount,
  onDeleteAccount,
  loading = false,
}: AdminDnsAccountTableProps) {
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [accountId, setAccountId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !apiKey) {
      toast.error("Nama, email, dan API key wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await onCreateAccount({
        name: name.trim(),
        email: email.trim(),
        api_key: apiKey.trim(),
        account_id: accountId.trim() || undefined,
      });
      setOpenCreate(false);
      setName("");
      setEmail("");
      setApiKey("");
      setAccountId("");
      toast.success("Akun Cloudflare berhasil ditambahkan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (
      !confirm(
        "Hapus akun Cloudflare ini? Semua domain yang terhubung akan terpengaruh.",
      )
    ) {
      return;
    }
    setDeletingId(id);
    try {
      await onDeleteAccount(id);
      toast.success("Akun Cloudflare berhasil dihapus");
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<DnsAccount>[] = useMemo(
    () => [
      {
        id: "name",
        header: "Nama Akun",
        cell: (acc) => (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold font-mono text-xs border border-primary/20 shrink-0">
              CF
            </div>
            <div className="flex flex-col font-sans">
              <span className="font-bold text-foreground">{acc.name}</span>
              {acc.account_id && (
                <span className="text-[10px] text-muted-foreground font-mono">
                  ID: {acc.account_id}
                </span>
              )}
            </div>
          </div>
        ),
      },
      {
        id: "email",
        header: "Email",
        className: "font-sans",
        cell: (acc) => (
          <div className="flex items-center gap-1.5 text-foreground">
            <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span>{acc.email}</span>
          </div>
        ),
      },
      {
        id: "api_key",
        header: "API Key (Masked)",
        cell: (acc) => (
          <div className="flex items-center gap-1 text-muted-foreground text-[11px] font-mono">
            <Key className="h-3 w-3 text-amber-400 shrink-0" />
            <span>{acc.api_key_masked || "••••••••••••••••"}</span>
          </div>
        ),
      },
      {
        id: "zone_count",
        header: "Jumlah Zone",
        align: "center",
        cell: (acc) => (
          <Badge
            variant="outline"
            className="border-border bg-surface text-foreground font-mono text-[11px] px-2.5"
          >
            {acc.zone_count ?? 0} Zones
          </Badge>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: (acc) => (
          <Badge
            variant="outline"
            className={`gap-1 text-[11px] font-semibold ${
              acc.status === "ACTIVE"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-rose-500/30 bg-rose-500/10 text-rose-400"
            }`}
          >
            <ShieldCheck className="h-3 w-3" />
            {acc.status || "ACTIVE"}
          </Badge>
        ),
      },
      {
        id: "actions",
        header: "Aksi",
        align: "right",
        cell: (acc) => (
          <Button
            variant="ghost"
            size="sm"
            disabled={deletingId === acc.id}
            onClick={() => handleDelete(acc.id)}
            className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
            title="Hapus Akun"
          >
            {deletingId === acc.id ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </Button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deletingId],
  );

  const filters: DataTableFilterConfig<DnsAccount>[] = useMemo(
    () => [
      {
        id: "status",
        label: "Status",
        defaultValue: "ALL",
        options: [
          { label: "Semua Status", value: "ALL" },
          { label: "ACTIVE", value: "ACTIVE" },
          { label: "REVOKED", value: "REVOKED" },
        ],
        filterFn: (acc, val) => (acc.status || "ACTIVE").toUpperCase() === val.toUpperCase(),
      },
    ],
    [],
  );

  const actions = (
    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
      <DialogTrigger
        render={
          <Button
            size="sm"
            className="h-9 px-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
            Tambah Akun CF
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5 text-base font-bold">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Cloud className="h-5 w-5" />
            </div>
            Tambah Akun Cloudflare
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
          <div>
            <Label className="text-xs text-muted-foreground">Nama Akun / Label</Label>
            <Input
              placeholder="misal: Cloudflare Production SG"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Email Akun Cloudflare</Label>
            <Input
              type="email"
              placeholder="admin@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Global API Key / API Token</Label>
            <Input
              type="password"
              placeholder="Paste Cloudflare Global API Key atau API Token"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Account ID (Opsional)</Label>
            <Input
              placeholder="Cloudflare Account Tag / ID"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-10 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs gap-2 mt-2 shadow-md shadow-primary/25"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Menyimpan Akun...
              </>
            ) : (
              "Simpan Akun Cloudflare"
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
          <Cloud className="h-4 w-4 text-primary" />
          Akun Cloudflare API
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Kelola multi-akun Cloudflare provider untuk manajemen DNS otomatis
        </p>
      </div>

      <DataTable<DnsAccount>
        data={accounts}
        columns={columns}
        keyExtractor={(acc) => acc.id}
        isLoading={loading}
        searchable={true}
        searchPlaceholder="Cari nama akun, email, account ID..."
        searchButtonText="Cari"
        searchAccessor={(acc) => [acc.name, acc.email, acc.account_id]}
        filters={filters}
        paginated={true}
        pageSize={10}
        entityName="akun Cloudflare"
        actions={actions}
        emptyIcon={Cloud}
        emptyTitle="Belum Ada Akun Cloudflare"
        emptyDescription="Tambahkan akun Cloudflare pertama Anda untuk mengaktifkan sinkronisasi otomatis DNS."
      />
    </div>
  );
}
