// ==============================================================================
// GoVPN Finance Admin Voucher Manager Component
// Part of Pola C: components/admin/AdminVoucherManager.tsx
// 100% Coinbase Institutional Design System (Voucher Inventory & Creation)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Voucher } from "../../types/finance.types";
import { AdminCreateVoucherDto } from "../../types/admin.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Tag, Trash2, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminVoucherManagerProps {
  vouchers: Voucher[];
  onCreateVoucher: (dto: AdminCreateVoucherDto) => Promise<unknown>;
  onDeleteVoucher?: (id: string | number) => Promise<unknown>;
}

export function AdminVoucherManager({
  vouchers,
  onCreateVoucher,
  onDeleteVoucher,
}: AdminVoucherManagerProps) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [quota, setQuota] = useState("100");
  const [expiredAt, setExpiredAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const discount = parseInt(discountAmount, 10);
    const q = parseInt(quota, 10);

    if (!code.trim() || isNaN(discount) || isNaN(q) || !expiredAt) {
      toast.error(
        "Harap isi kode voucher, nominal diskon, kuota, dan masa berlaku.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreateVoucher({
        code: code.trim().toUpperCase(),
        discount_amount: discount,
        quota: q,
        expired_at: new Date(expiredAt).toISOString(),
        is_active: true,
      });
      toast.success("Voucher promo berhasil dibuat!");
      setOpen(false);
      setCode("");
      setDiscountAmount("");
      setQuota("100");
      setExpiredAt("");
    } catch {
      // Handled in caller
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!onDeleteVoucher) return;
    setDeletingId(id);
    try {
      await onDeleteVoucher(id);
      toast.success("Voucher berhasil dihapus!");
    } catch {
      toast.error("Gagal menghapus voucher");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold font-mono text-foreground flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            Manajemen Kupon &amp; Voucher Diskon
          </h3>
          <p className="text-xs text-muted-foreground">
            Atur kuota dan potongan harga transaksi saldo maupun pembelian paket
            VPN.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button className="bg-primary hover:bg-primary-hover text-white gap-2 font-semibold text-xs rounded-full min-h-9 px-5 shadow-sm">
                <PlusCircle className="h-4 w-4" />
                Buat Voucher
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                <Tag className="h-5 w-5 text-primary" />
                Buat Kupon Promo Baru
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div>
                <Label
                  htmlFor="v-code"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Kode Kupon (Uppercase)
                </Label>
                <Input
                  id="v-code"
                  placeholder="MISAL: DISKON50"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="mt-1.5 font-mono text-xs uppercase rounded-xl min-h-10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label
                    htmlFor="v-disc"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Potongan Harga (IDR)
                  </Label>
                  <Input
                    id="v-disc"
                    type="number"
                    placeholder="10000"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="v-quota"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Batas Kuota Pemakaian
                  </Label>
                  <Input
                    id="v-quota"
                    type="number"
                    placeholder="100"
                    value={quota}
                    onChange={(e) => setQuota(e.target.value)}
                    className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="v-exp"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Tanggal Kedaluwarsa
                </Label>
                <Input
                  id="v-exp"
                  type="datetime-local"
                  value={expiredAt}
                  onChange={(e) => setExpiredAt(e.target.value)}
                  className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="text-xs rounded-full min-h-10 px-5"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />{" "}
                      Menyimpan...
                    </>
                  ) : (
                    "Buat Kupon"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Voucher Table */}
      <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
        <table className="w-full text-left text-sm text-muted-foreground">
          <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
            <tr>
              <th className="px-5 py-4">Kode Kupon</th>
              <th className="px-5 py-4">Nilai Diskon</th>
              <th className="px-5 py-4">Penggunaan / Kuota</th>
              <th className="px-5 py-4">Kedaluwarsa</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y border-border/40 font-mono text-xs">
            {vouchers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-8 text-center text-muted-foreground font-sans"
                >
                  Belum ada voucher yang dibuat.
                </td>
              </tr>
            ) : (
              vouchers.map((v) => (
                <tr key={v.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-foreground">
                    <span className="bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-md">
                      {v.code}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-emerald-400">
                    {formatIDR(v.discount_amount)}
                  </td>
                  <td className="px-5 py-3.5 text-foreground">
                    {v.used_count} / {v.quota}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {new Date(v.expired_at).toLocaleDateString("id-ID")}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        v.is_active
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-muted/40 text-muted-foreground border border-border"
                      }`}
                    >
                      {v.is_active ? "AKTIF" : "NONAKTIF"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {onDeleteVoucher && (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={deletingId === v.id}
                        onClick={() => handleDelete(v.id)}
                        className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
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
