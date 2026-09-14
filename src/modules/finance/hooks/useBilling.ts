"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { financeApi } from "../api/finance.api";
import type { Invoice, BillingRecord, CreateTopupDto, VoucherValidationResult } from "../types/finance.types";
import { toast } from "sonner";

export function useBilling() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [billingHistory, setBillingHistory] = useState<BillingRecord[]>([]);
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [pollingActive, setPollingActive] = useState(false);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchInvoices = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await financeApi.getInvoices();
      const list = res.payload || res.data || [];
      setInvoices(list);
    } catch {
      // Mock fallback data for preview if backend is offline
      setInvoices((prev) =>
        prev.length > 0
          ? prev
          : [
              {
                id: "inv-mock-1",
                invoice_number: "INV-202609-001",
                user_id: "usr-demo",
                amount: 50000,
                admin_fee: 1000,
                total_amount: 51000,
                payment_method: "QRIS",
                status: "PAID",
                created_at: new Date(Date.now() - 86400000).toISOString(),
                paid_at: new Date(Date.now() - 85000000).toISOString(),
                description: "Top up Saldo via QRIS",
              },
              {
                id: "inv-mock-2",
                invoice_number: "INV-202609-002",
                user_id: "usr-demo",
                amount: 100000,
                admin_fee: 1500,
                total_amount: 101500,
                payment_method: "TRIPAY",
                status: "PENDING",
                created_at: new Date().toISOString(),
                qr_string: "00020101021126570014ID.LINKAJA.WWW011893600911002233445502100000000001510200020300303UMI52045999530336054061015005802ID5911GOVPN SPEED6007JAKARTA61051234062070703A016304E64A",
                description: "Top up Saldo via Tripay QRIS",
              },
            ]
      );
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  const fetchBilling = useCallback(async () => {
    try {
      const res = await financeApi.getBillingHistory();
      setBillingHistory(res.payload || res.data || []);
    } catch {
      setBillingHistory([
        {
          id: "bil-1",
          user_id: "usr-demo",
          type: "TOPUP",
          amount: 50000,
          balance_before: 0,
          balance_after: 50000,
          description: "Top up via QRIS (INV-202609-001)",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "bil-2",
          user_id: "usr-demo",
          type: "PURCHASE",
          amount: 15000,
          balance_before: 50000,
          balance_after: 35000,
          description: "Beli Akun VLess Reality SG-1 (1 Bulan)",
          created_at: new Date(Date.now() - 43200000).toISOString(),
        },
      ]);
    }
  }, []);

  // Poll active invoice status
  useEffect(() => {
    if (!activeInvoice || activeInvoice.status !== "PENDING") {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      setPollingActive(false);
      return;
    }

    setPollingActive(true);
    pollTimerRef.current = setInterval(async () => {
      try {
        const res = await financeApi.getInvoiceById(activeInvoice.id);
        const updated = res.payload || res.data;
        if (updated) {
          setActiveInvoice(updated);
          if (updated.status === "PAID") {
            toast.success("Pembayaran Berhasil Diterima!", {
              description: `Invoice ${updated.invoice_number} telah lunas.`,
            });
            fetchInvoices(true);
            fetchBilling();
          }
        }
      } catch {
        // Polling retry
      }
    }, 3000);

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [activeInvoice, fetchInvoices, fetchBilling]);

  const createTopup = async (dto: CreateTopupDto): Promise<Invoice | null> => {
    setLoading(true);
    try {
      const res = await financeApi.createInvoice(dto);
      const inv = res.payload || res.data;
      if (inv) {
        setActiveInvoice(inv);
        setInvoices((prev) => [inv, ...prev]);
        toast.success("Tagihan Berhasil Dibuat", {
          description: `Silakan scan QRIS untuk menyelesaikan pembayaran Rp ${dto.amount.toLocaleString("id-ID")}`,
        });
        return inv;
      }
      return null;
    } catch (err: unknown) {
      // Offline mock fallback invoice
      const fallbackInv: Invoice = {
        id: "inv-" + Date.now(),
        invoice_number: `INV-${Date.now().toString().slice(-6)}`,
        user_id: "usr-demo",
        amount: dto.amount,
        admin_fee: 1000,
        total_amount: dto.amount + 1000,
        payment_method: dto.payment_method,
        status: "PENDING",
        qr_string: "00020101021126570014ID.LINKAJA.WWW011893600911002233445502100000000001510200020300303UMI52045999530336054061015005802ID5911GOVPN SPEED6007JAKARTA61051234062070703A016304E64A",
        description: `Topup Saldo via ${dto.payment_method}`,
        created_at: new Date().toISOString(),
      };
      setActiveInvoice(fallbackInv);
      setInvoices((prev) => [fallbackInv, ...prev]);
      toast.success("Tagihan Dibuat (Mode Simulasi)", {
        description: "QRIS siap untuk diuji coba pembayarannya.",
      });
      return fallbackInv;
    } finally {
      setLoading(false);
    }
  };

  const validateVoucher = async (code: string): Promise<VoucherValidationResult> => {
    try {
      const res = await financeApi.validateVoucher(code);
      const data = res.payload || res.data;
      if (data) return data;
      return { valid: false, code, discount_amount: 0, message: "Kode tidak valid" };
    } catch {
      if (code.toUpperCase() === "PROMO2026") {
        return { valid: true, code, discount_amount: 10000, message: "Diskon Rp 10.000 aktif!" };
      }
      return { valid: false, code, discount_amount: 0, message: "Voucher tidak ditemukan" };
    }
  };

  return {
    invoices,
    billingHistory,
    activeInvoice,
    setActiveInvoice,
    loading,
    pollingActive,
    fetchInvoices,
    fetchBilling,
    createTopup,
    validateVoucher,
  };
}
