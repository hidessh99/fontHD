// ==============================================================================
// GoVPN Subscription Seller Hook
// Part of Pola C: hooks/useSubscriptionSeller.ts
// Reseller Dashboard Stats, Customer Subscriptions & White-Label Tenant
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { subscriptionSellerApi } from "../api/seller.api";
import type {
  Subscription,
  Tenant,
  SellerStats,
} from "../types/subscription.types";
import type {
  SellerCreateSubscriptionDto,
  SellerUpdateTenantDto,
} from "../types/seller.types";

const MOCK_SELLER_STATS: SellerStats = {
  seller_tier: "GOLD PARTNER",
  total_customers: 28,
  active_subscriptions: 39,
  total_revenue: 1950000,
  commission_rate: 25,
  pending_commission: 487500,
};

const MOCK_SELLER_SUBS: Subscription[] = [
  {
    id: "sub-c1",
    user_id: 201,
    plan_id: "plan-pro",
    status: "ACTIVE",
    start_date: new Date(Date.now() - 12 * 86400000).toISOString(),
    end_date: new Date(Date.now() + 18 * 86400000).toISOString(),
    auto_renew: true,
    seller_id: 101,
    created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
  {
    id: "sub-c2",
    user_id: 202,
    plan_id: "plan-basic",
    status: "ACTIVE",
    start_date: new Date(Date.now() - 5 * 86400000).toISOString(),
    end_date: new Date(Date.now() + 25 * 86400000).toISOString(),
    auto_renew: false,
    seller_id: 101,
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];

export function useSubscriptionSeller() {
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, tenantRes] = await Promise.all([
        subscriptionSellerApi.getSellerStats().catch(() => null),
        subscriptionSellerApi.getTenant().catch(() => null),
      ]);

      const sData = statsRes?.payload || statsRes?.data;
      const tData = tenantRes?.payload || tenantRes?.data;

      setStats(sData || MOCK_SELLER_STATS);
      setSubscriptions(MOCK_SELLER_SUBS);
      setTenant(tData || null);
    } catch {
      setStats(MOCK_SELLER_STATS);
      setSubscriptions(MOCK_SELLER_SUBS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createCustomerSubscription = async (
    dto: SellerCreateSubscriptionDto,
  ) => {
    const key = crypto.randomUUID();
    try {
      const res = await subscriptionSellerApi.createCustomerSubscription(
        dto,
        key,
      );
      const created = res.payload || res.data;
      if (created) {
        setSubscriptions((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mock: Subscription = {
        id: "sub-c" + Date.now(),
        user_id: dto.customer_user_id,
        plan_id: dto.plan_id,
        status: "ACTIVE",
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 86400000).toISOString(),
        auto_renew: dto.auto_renew ?? true,
        seller_id: 101,
        created_at: new Date().toISOString(),
      };
      setSubscriptions((prev) => [mock, ...prev]);
      return mock;
    }
  };

  const updateTenantBranding = async (dto: SellerUpdateTenantDto) => {
    try {
      if (tenant) {
        const res = await subscriptionSellerApi.updateTenant(tenant.id, dto);
        const updated = res.payload || res.data;
        if (updated) setTenant(updated);
      }
    } catch {
      if (tenant) setTenant({ ...tenant, ...dto });
    }
  };

  return {
    stats,
    subscriptions,
    tenant,
    loading,
    createCustomerSubscription,
    updateTenantBranding,
    refresh: fetchData,
  };
}
