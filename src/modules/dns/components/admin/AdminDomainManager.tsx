// ==============================================================================
// GoVPN DNS Admin Domain Manager Component
// Part of Pola C: components/admin/AdminDomainManager.tsx
// 100% Coinbase Institutional Design System (Root Zones & Account Binding)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { DnsDomain, DnsAccount } from "../../types/dns.types";
import { AdminCreateDnsDomainDto } from "../../types/admin.types";
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
  Globe,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

interface AdminDomainManagerProps {
  domains: DnsDomain[];
  accounts: DnsAccount[];
  onCreateDomain: (dto: AdminCreateDnsDomainDto) => Promise<unknown>;
  onDeleteDomain: (id: string | number) => Promise<unknown>;
  loading?: boolean;
}

export function AdminDomainManager({
  domains,
  accounts,
  onCreateDomain,
  onDeleteDomain,
  loading = false,
}: AdminDomainManagerProps) {
  const [openCreate, setOpenCreate] = useState(false);
  const [accountId, setAccountId] = useState<string | number>(
    accounts[0]?.id || "",
  );
  const [domainName, setDomainName] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  React.useEffect(() => {
    if (!accountId && accounts.length > 0) {
      setAccountId(accounts[0].id);
    }
  }, [accounts, accountId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName) {
      toast.error("Nama domain wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await onCreateDomain({
        account_id: accountId,
        domain_name: domainName.trim().toLowerCase(),
        zone_id: zoneId.trim() || undefined,
      });
      setOpenCreate(false);
      setDomainName("");
      setZoneId("");
      toast.success("Domain zona berhasil didaftarkan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (
      !confirm(
        "Hapus domain zona ini? Semua record di domain ini akan terhapus.",
      )
    ) {
      return;
    }
    setDeletingId(id);
    try {
      await onDeleteDomain(id);
      toast.success("Domain zona berhasil dihapus");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Zona Domain Terdaftar
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar domain aktif yang dapat digunakan pengguna untuk membuat
            subdomain VPN
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
                Tambah Domain
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2.5 text-base font-bold">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Globe className="h-5 w-5" />
                </div>
                Tambah Zona Domain Baru
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Pilih Akun Cloudflare
                </Label>
                <select
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-muted/40 px-3.5 py-2.5 text-xs font-mono text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                >
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({acc.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Nama Domain (Root FQDN)
                </Label>
                <Input
                  placeholder="misal: govpn-network.id"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Cloudflare Zone ID (Opsional)
                </Label>
                <Input
                  placeholder="32 Karakter Hex Zone ID dari Dashboard CF"
                  value={zoneId}
                  onChange={(e) => setZoneId(e.target.value)}
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
                    Menyimpan Domain...
                  </>
                ) : (
                  "Simpan Zona Domain"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="w-full h-64 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/80 bg-card/40">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground font-medium">
            Memuat daftar zona domain...
          </p>
        </div>
      ) : domains.length === 0 ? (
        <EmptyState
          icon={Globe}
          title="Belum Ada Zona Domain"
          description="Tambahkan domain root pertama Anda untuk mulai mendistribusikan subdomain VPN ke pengguna."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">Nama Domain</th>
                <th className="px-5 py-4 font-sans">Cloudflare Zone ID</th>
                <th className="px-5 py-4 font-sans">Status</th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {domains.map((dom) => (
                <tr
                  key={dom.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono text-xs border border-emerald-500/20">
                        <Globe className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-bold text-foreground">
                        {dom.domain_name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground text-[11px]">
                      {dom.zone_id || "Auto-detected"}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <Badge
                      variant="outline"
                      className={`gap-1 text-[11px] font-semibold ${
                        dom.status === "ACTIVE"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {dom.status === "ACTIVE" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <ShieldAlert className="h-3 w-3" />
                      )}
                      {dom.status || "ACTIVE"}
                    </Badge>
                  </td>

                  <td className="px-5 py-3.5 text-right font-sans">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === dom.id}
                      onClick={() => handleDelete(dom.id)}
                      className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                    >
                      {deletingId === dom.id ? (
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
