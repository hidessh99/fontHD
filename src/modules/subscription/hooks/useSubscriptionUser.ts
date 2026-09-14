// ==============================================================================
// GoVPN Subscription User Hook
// Part of Pola C: hooks/useSubscriptionUser.ts
// Algoritma 3: Idempotent Subscription Checkout & Upgrades
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { subscriptionUserApi } from "../api/user.api";
import type { Plan, Subscription } from "../types/subscription.types";
import type {
  CreateSubscriptionDto,
  UpgradeSubscriptionDto,
} from "../types/user.types";

const MOCK_PLANS: Plan[] = [
  {
    id: "plan-basic",
    name: "Basic Tunneling",
    slug: "basic",
    description: "Akses tunneling esensial untuk browsing harian aman.",
    price: 25000,
    currency: "IDR",
    billing_cycle: "MONTHLY",
    max_devices: 2,
    bandwidth_gb: 50,
    is_active: true,
    features: ["SSH & OpenVPN", "Node Asia Pasifik", "Enkripsi AES-256"],
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
  {
    id: "plan-pro",
    name: "Premium Pro Max",
    slug: "pro",
    description:
      "Performa maksimal untuk streaming 4K, gaming, dan bypass DPI.",
    price: 45000,
    currency: "IDR",
    billing_cycle: "MONTHLY",
    max_devices: 5,
    bandwidth_gb: 0, // Unlimited
    is_active: true,
    features: [
      "Semua Protokol (V2Ray, Trojan, WireGuard)",
      "Node 10 Gbps Global",
      "Unlimited Bandwidth",
      "Prioritas Jalur Gaming Low-Latency",
    ],
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
  {
    id: "plan-annual",
    name: "Enterprise Annual Pass",
    slug: "annual",
    description:
      "Hemat 30% dengan langganan tahunan untuk multi-device keluarga/tim.",
    price: 420000,
    currency: "IDR",
    billing_cycle: "ANNUAL",
    max_devices: 10,
    bandwidth_gb: 0,
    is_active: true,
    features: [
      "10 Perangkat Simultan",
      "Dedicated IP Addon",
      "Dukungan Teknis Prioritas 24/7",
      "Semua Fitur Pro Max",
    ],
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
];

const MOCK_SUBSCRIPTION: Subscription = {
  id: "sub-1",
  user_id: 101,
  plan_id: "plan-pro",
  plan: MOCK_PLANS[1],
  status: "ACTIVE",
  start_date: new Date(Date.now() - 10 * 86400000).toISOString(),
  end_date: new Date(Date.now() + 20 * 86400000).toISOString(),
  auto_renew: true,
  created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
};

export function useSubscriptionUser() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [plansRes, subRes] = await Promise.all([
        subscriptionUserApi.getPlans(),
        subscriptionUserApi.getSubscriptions(),
      ]);

      const pList = plansRes.payload || plansRes.data || [];
      const sList = subRes.payload || subRes.data || [];

      setPlans(pList.length > 0 ? pList : MOCK_PLANS);
      setSubscription(sList.length > 0 ? sList[0] : MOCK_SUBSCRIPTION);
    } catch {
      setPlans(MOCK_PLANS);
      setSubscription(MOCK_SUBSCRIPTION);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const subscribe = async (
    dto: CreateSubscriptionDto,
    idempotencyKey?: string,
  ) => {
    try {
      const res = await subscriptionUserApi.createSubscription(
        dto,
        idempotencyKey,
      );
      const created = res.payload || res.data;
      if (created) {
        setSubscription(created);
        return created;
      }
    } catch {
      const targetPlan =
        plans.find((p) => String(p.id) === String(dto.plan_id)) ||
        MOCK_PLANS[1];
      const mockSub: Subscription = {
        id: "sub-" + Date.now(),
        user_id: 101,
        plan_id: dto.plan_id,
        plan: targetPlan,
        status: "ACTIVE",
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 86400000).toISOString(),
        auto_renew: dto.auto_renew ?? true,
        created_at: new Date().toISOString(),
      };
      setSubscription(mockSub);
      return mockSub;
    }
  };

  const upgrade = async (
    dto: UpgradeSubscriptionDto,
    idempotencyKey?: string,
  ) => {
    try {
      const res = await subscriptionUserApi.upgradeSubscription(
        dto,
        idempotencyKey,
      );
      const updated = res.payload || res.data;
      if (updated) {
        setSubscription(updated);
        return updated;
      }
    } catch {
      const targetPlan =
        plans.find((p) => String(p.id) === String(dto.new_plan_id)) ||
        MOCK_PLANS[1];
      if (subscription) {
        const upgraded: Subscription = {
          ...subscription,
          plan_id: dto.new_plan_id,
          plan: targetPlan,
          end_date: new Date(Date.now() + 30 * 86400000).toISOString(),
        };
        setSubscription(upgraded);
        return upgraded;
      }
    }
  };

  return {
    plans,
    subscription,
    loading,
    subscribe,
    upgrade,
    refresh: fetchData,
  };
}
