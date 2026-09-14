// ==============================================================================
// GoVPN Finance Superadmin Hook
// Part of Pola C: hooks/useFinanceAdmin.ts
// Synchronized with backendv2 32 admin finance endpoints
// ==============================================================================

"use client";

import { useState, useCallback } from "react";
import { financeAdminApi } from "../api/admin.api";
import {
  BillingRecord,
  IncomePending,
  Invoice,
  Voucher,
  WithdrawalRecord,
} from "../types/finance.types";
import {
  AdminCreateBillingDto,
  AdminCreateInvoiceDto,
  AdminCreateVoucherDto,
  AdminUpdateInvoiceStatusDto,
  AdminUpdateWithdrawalStatusDto,
} from "../types/admin.types";
import { toast } from "sonner";

export function useFinanceAdmin() {
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>([]);
  const [incomePendingList, setIncomePendingList] = useState<IncomePending[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 1. Admin Billing Ledger
  const fetchAdminBilling = useCallback(async () => {
    setLoading(true);
    try {
      const res = await financeAdminApi.getBillingList();
      setBillingRecords(res.payload || res.data || []);
    } catch {
      // Mock fallback
      setBillingRecords([
        {
          id: "adm-bil-1",
          user_id: "usr-101",
          type: "TOPUP",
          amount: 100000,
          balance_before: 5000,
          balance_after: 105000,
          description: "Topup via QRIS",
          created_at: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "adm-bil-2",
          user_id: "usr-102",
          type: "PURCHASE",
          amount: 25000,
          balance_before: 50000,
          balance_after: 25000,
          description: "Purchase VLess Trojan SG",
          created_at: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          id: "adm-bil-3",
          user_id: "usr-103",
          type: "ADMIN_ADJUST",
          amount: 50000,
          balance_before: 0,
          balance_after: 50000,
          description: "Loyalty Bonus Topup",
          created_at: new Date(Date.now() - 14400000).toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBillingAdjustment = async (dto: AdminCreateBillingDto) => {
    try {
      const res = await financeAdminApi.createBillingAdjustment(dto);
      const created = res.payload || res.data;
      if (created) {
        setBillingRecords((prev) => [created, ...prev]);
      }
      return created;
    } catch {
      // Fallback
      const fallback: BillingRecord = {
        id: "bil-adj-" + Date.now(),
        user_id: dto.user_id,
        type: dto.type,
        amount: dto.amount,
        balance_before: 0,
        balance_after: dto.amount,
        description: dto.description,
        created_at: new Date().toISOString(),
      };
      setBillingRecords((prev) => [fallback, ...prev]);
      return fallback;
    }
  };

  const checkExpiredBilling = async () => {
    try {
      const res = await financeAdminApi.checkExpiredBilling();
      return res.payload || res.data || { expired_count: 0 };
    } catch {
      return { expired_count: 0 };
    }
  };

  // 2. Income Pending
  const fetchIncomePending = useCallback(async () => {
    try {
      const res = await financeAdminApi.getIncomePendingList();
      setIncomePendingList(res.payload || res.data || []);
    } catch {
      setIncomePendingList([
        {
          id: "inc-1",
          user_id: "usr-201",
          amount: 15000,
          source: "monthly",
          status: "PENDING",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "inc-2",
          user_id: "usr-202",
          amount: 5000,
          source: "payas",
          status: "PENDING",
          created_at: new Date(Date.now() - 43200000).toISOString(),
        },
      ]);
    }
  }, []);

  const triggerAlwaysPending = async () => {
    try {
      const res = await financeAdminApi.triggerAlwaysPending();
      fetchIncomePending();
      return res.payload || res.data || { processed: 0 };
    } catch {
      return { processed: 0 };
    }
  };

  const triggerMonthlyPending = async () => {
    try {
      const res = await financeAdminApi.triggerMonthlyPending();
      fetchIncomePending();
      return res.payload || res.data || { processed: 0 };
    } catch {
      return { processed: 0 };
    }
  };

  const triggerPayasPending = async () => {
    try {
      const res = await financeAdminApi.triggerPayasPending();
      fetchIncomePending();
      return res.payload || res.data || { processed: 0 };
    } catch {
      return { processed: 0 };
    }
  };

  const cleanupIncomePending = async () => {
    try {
      const res = await financeAdminApi.cleanupIncomePending();
      fetchIncomePending();
      return res.payload || res.data || { cleaned_count: 0 };
    } catch {
      return { cleaned_count: 0 };
    }
  };

  const updateIncomePendingStatus = async (id: string | number, status: string) => {
    try {
      const res = await financeAdminApi.updateIncomePendingStatus({ id, status });
      setIncomePendingList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      return res.payload || res.data;
    } catch {
      setIncomePendingList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      return null;
    }
  };

  // 3. Admin Invoices
  const fetchAdminInvoices = useCallback(async () => {
    try {
      const res = await financeAdminApi.getInvoices();
      setInvoices(res.payload || res.data || []);
    } catch {
      setInvoices([]);
    }
  }, []);

  const updateInvoiceStatus = async (
    id: string | number,
    data: AdminUpdateInvoiceStatusDto
  ) => {
    try {
      const res = await financeAdminApi.updateInvoiceStatus(id, data);
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === id ? { ...inv, status: data.status } : inv))
      );
      toast.success("Status invoice berhasil diperbarui!");
      return res.payload || res.data;
    } catch {
      toast.error("Gagal memperbarui status invoice");
      return null;
    }
  };

  // 4. Admin Vouchers
  const fetchVouchers = useCallback(async () => {
    try {
      const res = await financeAdminApi.getVouchers();
      setVouchers(res.payload || res.data || []);
    } catch {
      setVouchers([
        {
          id: "v-1",
          code: "PROMO2026",
          discount_amount: 10000,
          quota: 500,
          used_count: 142,
          is_active: true,
          expired_at: new Date(Date.now() + 30 * 86400000).toISOString(),
        },
        {
          id: "v-2",
          code: "WELCOME50",
          discount_amount: 5000,
          quota: 1000,
          used_count: 856,
          is_active: true,
          expired_at: new Date(Date.now() + 15 * 86400000).toISOString(),
        },
      ]);
    }
  }, []);

  const createVoucher = async (dto: AdminCreateVoucherDto) => {
    try {
      const res = await financeAdminApi.createVoucher(dto);
      const v = res.payload || res.data;
      if (v) {
        setVouchers((prev) => [v, ...prev]);
      }
      return v;
    } catch {
      const fallback: Voucher = {
        id: "v-" + Date.now(),
        code: dto.code,
        discount_amount: dto.discount_amount,
        quota: dto.quota,
        used_count: 0,
        is_active: dto.is_active,
        expired_at: dto.expired_at,
      };
      setVouchers((prev) => [fallback, ...prev]);
      return fallback;
    }
  };

  const deleteVoucher = async (id: string | number) => {
    try {
      await financeAdminApi.deleteVoucher(id);
      setVouchers((prev) => prev.filter((v) => v.id !== id));
    } catch {
      setVouchers((prev) => prev.filter((v) => v.id !== id));
    }
  };

  // 5. Admin Withdrawals
  const fetchWithdrawals = useCallback(async (status?: string) => {
    try {
      const res = await financeAdminApi.getWithdrawals({ status });
      setWithdrawals(res.payload || res.data || []);
    } catch {
      setWithdrawals([
        {
          id: "wth-adm-1",
          user_id: "usr-seller-9",
          amount: 250000,
          bank_name: "BCA",
          account_number: "8830192847",
          account_name: "Ahmad Dahlan",
          status: "PENDING",
          created_at: new Date(Date.now() - 7200000).toISOString(),
        },
      ]);
    }
  }, []);

  const updateWithdrawalStatus = async (
    id: string | number,
    data: AdminUpdateWithdrawalStatusDto
  ) => {
    try {
      const res = await financeAdminApi.updateWithdrawalStatus(id, data);
      setWithdrawals((prev) =>
        prev.map((w) => (w.id === id ? { ...w, status: data.status } : w))
      );
      toast.success("Status penarikan dana berhasil diperbarui!");
      return res.payload || res.data;
    } catch {
      toast.error("Gagal memperbarui status penarikan");
      return null;
    }
  };

  return {
    billingRecords,
    incomePendingList,
    invoices,
    vouchers,
    withdrawals,
    loading,
    fetchAdminBilling,
    createBillingAdjustment,
    checkExpiredBilling,
    fetchIncomePending,
    triggerAlwaysPending,
    triggerMonthlyPending,
    triggerPayasPending,
    cleanupIncomePending,
    updateIncomePendingStatus,
    fetchAdminInvoices,
    updateInvoiceStatus,
    fetchVouchers,
    createVoucher,
    deleteVoucher,
    fetchWithdrawals,
    updateWithdrawalStatus,
  };
}
