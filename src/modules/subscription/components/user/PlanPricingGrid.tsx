// ==============================================================================
// GoVPN Plan Pricing Grid Component
// Part of Pola C: components/user/PlanPricingGrid.tsx
// 100% Coinbase Institutional Design System (Tiered Pricing Cards)
// ==============================================================================

"use client";

import React from "react";
import { Plan } from "../../types/subscription.types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface PlanPricingGridProps {
  plans: Plan[];
  onSelectPlan: (plan: Plan) => void;
  activePlanId?: string | number;
}

export function PlanPricingGrid({
  plans,
  onSelectPlan,
  activePlanId,
}: PlanPricingGridProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {t("subscription.bestPlansTitle")}
        </h2>
        <p className="text-xs text-muted-foreground">
          {t("subscription.bestPlansSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => {
          const isCurrent = String(activePlanId) === String(plan.id);
          const isFeatured = idx === 1;

          return (
            <Card
              key={plan.id}
              className={`p-6 rounded-2xl transition-all relative flex flex-col justify-between ${
                isFeatured
                  ? "border-primary bg-primary/5 shadow-xl shadow-primary/10 ring-1 ring-primary"
                  : "border-border/80 bg-card/60 backdrop-blur-sm hover:border-primary/40 shadow-sm"
              }`}
            >
              {isFeatured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-semibold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> {t("subscription.popular")}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    {plan.name}
                  </h3>
                  {plan.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {plan.description}
                    </p>
                  )}
                </div>

                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-3xl font-extrabold text-foreground">
                    Rp {plan.price.toLocaleString("id-ID")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    /{plan.billing_cycle === "MONTHLY" ? "bln" : "thn"}
                  </span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-border/60 text-xs">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{t("subscription.upToDevices", { count: plan.max_devices })}</span>
                  </div>

                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>
                      {plan.bandwidth_gb > 0
                        ? `Bandwidth ${plan.bandwidth_gb} GB`
                        : t("subscription.unlimitedQuota")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>
                      {t("subscription.allProtocolsAccess")}
                    </span>
                  </div>

                  {plan.features?.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={() => onSelectPlan(plan)}
                  disabled={isCurrent}
                  className={`w-full h-11 rounded-xl font-bold text-xs gap-2 transition-all ${
                    isCurrent
                      ? "bg-muted text-muted-foreground"
                      : isFeatured
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-card border border-border hover:bg-muted text-foreground"
                  }`}
                >
                  {isCurrent ? t("subscription.activePlanBtn") : t("subscription.selectPlanBtn")}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
