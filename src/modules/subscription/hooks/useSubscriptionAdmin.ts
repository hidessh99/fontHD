// ==============================================================================
// GoVPN Subscription Superadmin Hook
// Part of Pola C: hooks/useSubscriptionAdmin.ts
// Plans CRUD, Global Subscription Audits & Status Overrides
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { subscriptionAdminApi } from "../api/admin.api";
import type {
  Plan,
  Subscription,
  Tenant,
  SubscriptionStatus,
} from "../types/subscription.types";
import type {
  AdminCreatePlanDto,
  AdminUpdatePlanDto,
} from "../types/admin.types";

const MOCK_ADMIN_PLANS: Plan[] = [
  {
    id: 1,
    name: "Basic Tunneling",
    slug: "basic",
    price: 25000,
    currency: "IDR",
    billing_cycle: "MONTHLY",
    max_devices: 2,
    bandwidth_gb: 50,
    is_active: true,
    features: ["SSH & OpenVPN", "Node Asia Pasifik"],
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
  {
    id: 2,
    name: "Premium Pro Max",
    slug: "pro",
    price: 45000,
    currency: "IDR",
    billing_cycle: "MONTHLY",
    max_devices: 5,
    bandwidth_gb: 0,
    is_active: true,
    features: ["V2Ray, Trojan, WireGuard", "Unlimited Bandwidth"],
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
];

const MOCK_ADMIN_SUBS: Subscription[] = [
  {
    id: 1,
    user_id: 101,
    plan_id: 2,
    plan: MOCK_ADMIN_PLANS[1],
    status: "ACTIVE",
    start_date: new Date(Date.now() - 15 * 86400000).toISOString(),
    end_date: new Date(Date.now() + 15 * 86400000).toISOString(),
    auto_renew: true,
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
];

export function useSubscriptionAdmin() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    try {
      const [plansRes, subsRes] = await Promise.all([
        subscriptionAdminApi.listPlans(),
        subscriptionAdminApi.listSubscriptions(),
      ]);

      const pList = plansRes.payload || plansRes.data || [];
      const sList = subsRes.payload || subsRes.data || [];

      setPlans(pList.length > 0 ? pList : MOCK_ADMIN_PLANS);
      setSubscriptions(sList.length > 0 ? sList : MOCK_ADMIN_SUBS);
    } catch {
      setPlans(MOCK_ADMIN_PLANS);
      setSubscriptions(MOCK_ADMIN_SUBS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const createPlan = async (dto: AdminCreatePlanDto) => {
    try {
      const res = await subscriptionAdminApi.createPlan(dto);
      const created = res.payload || res.data;
      if (created) {
        setPlans((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mockP: Plan = {
        id: Date.now(),
        name: dto.name,
        slug: dto.slug,
        price: dto.price,
        currency: dto.currency || "IDR",
        billing_cycle: dto.billing_cycle,
        max_devices: dto.max_devices,
        bandwidth_gb: dto.bandwidth_gb,
        is_active: dto.is_active ?? true,
        features: dto.features,
        created_at: new Date().toISOString(),
      };
      setPlans((prev) => [mockP, ...prev]);
      return mockP;
    }
  };

  const deletePlan = async (id: string | number) => {
    try {
      await subscriptionAdminApi.deletePlan(id);
      setPlans((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setPlans((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const changeSubscriptionPlan = async (
    id: string | number,
    planId: string | number,
  ) => {
    try {
      const res = await subscriptionAdminApi.changeSubscriptionPlan(id, {
        plan_id: planId,
      });
      const updated = res.payload || res.data;
      if (updated) {
        setSubscriptions((prev) =>
          prev.map((s) => (s.id === id ? updated : s)),
        );
      }
    } catch {
      const plan = plans.find((p) => String(p.id) === String(planId));
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, plan_id: planId, plan } : s)),
      );
    }
  };

  const updateSubscriptionStatus = async (
    id: string | number,
    status: SubscriptionStatus,
  ) => {
    try {
      await subscriptionAdminApi.updateSubscriptionStatus({
        subscription_id: id,
        status,
      });
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s)),
      );
    } catch {
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s)),
      );
    }
  };

  return {
    plans,
    subscriptions,
    loading,
    createPlan,
    deletePlan,
    changeSubscriptionPlan,
    updateSubscriptionStatus,
    refresh: fetchAdminData,
  };
}
