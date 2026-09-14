// ==============================================================================
// GoVPN DNS Admin Cloudflare Accounts Table Component
// Part of Pola C: components/admin/AdminDnsAccountTable.tsx
// 100% Coinbase Institutional Design System (Masked API Keys, Zone Counts)
// ==============================================================================

"use client";

import React, { useState } from "react";
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
import { EmptyState } from "@/components/shared/EmptyState";
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

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Cloud className="h-4 w-4 text-primary" />
            Akun Cloudflare API
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Kelola multi-akun Cloudflare provider untuk manajemen DNS otomatis
          </p>
        </div>

        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger
            render={
              <Button
                size="sm"
                className="h-9 px-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-lg shadow-primary/20"
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
                <Label className="text-xs text-muted-foreground">
                  Nama Akun / Label
                </Label>
                <Input
                  placeholder="misal: Cloudflare Production SG"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Email Akun Cloudflare
                </Label>
                <Input
                  type="email"
                  placeholder="admin@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Global API Key / API Token
                </Label>
                <Input
                  type="password"
                  placeholder="Paste Cloudflare Global API Key atau API Token"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Account ID (Opsional)
                </Label>
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
                className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan Akun...
                  </>
                ) : (
                  "Simpan Akun Cloudflare"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Accounts List / Table */}
      {loading ? (
        <div className="w-full h-64 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/80 bg-card/40">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground font-medium">
            Memuat daftar akun Cloudflare...
          </p>
        </div>
      ) : accounts.length === 0 ? (
        <EmptyState
          icon={Cloud}
          title="Belum Ada Akun Cloudflare"
          description="Tambahkan akun Cloudflare pertama Anda untuk mengaktifkan sinkronisasi otomatis DNS."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">Nama Akun</th>
                <th className="px-5 py-4 font-sans">Email</th>
                <th className="px-5 py-4 font-sans">API Key (Masked)</th>
                <th className="px-5 py-4 font-sans text-center">Jumlah Zone</th>
                <th className="px-5 py-4 font-sans">Status</th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {accounts.map((acc) => (
                <tr
                  key={acc.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold font-mono text-xs border border-primary/20">
                        CF
                      </div>
                      <div className="flex flex-col font-sans">
                        <span className="font-bold text-foreground">
                          {acc.name}
                        </span>
                        {acc.account_id && (
                          <span className="text-[10px] text-muted-foreground font-mono">
                            ID: {acc.account_id}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 font-sans">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{acc.email}</span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 text-muted-foreground text-[11px]">
                      <Key className="h-3 w-3 text-amber-400" />
                      <span>{acc.api_key_masked || "••••••••••••••••"}</span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    <Badge
                      variant="outline"
                      className="border-border bg-surface text-foreground font-mono text-[11px] px-2.5"
                    >
                      {acc.zone_count ?? 0} Zones
                    </Badge>
                  </td>

                  <td className="px-5 py-3.5">
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
                  </td>

                  <td className="px-5 py-3.5 text-right font-sans">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === acc.id}
                      onClick={() => handleDelete(acc.id)}
                      className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                    >
                      {deletingId === acc.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
