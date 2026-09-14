// ==============================================================================
// GoVPN Subscription Skeleton Component
// Algoritma 4: Dynamic Island Dimension-Matched Boundary (CLS = 0)
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function SubscriptionSkeleton() {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in-50 duration-300">
      {/* Current Subscription Card Skeleton */}
      <Card className="border-border/80 bg-card/60 p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-7 w-48 rounded-md" />
            <Skeleton className="h-3.5 w-64 rounded-md" />
          </div>
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </Card>

      {/* Pricing Header Skeleton */}
      <div className="text-center max-w-xl mx-auto space-y-2 py-4">
        <Skeleton className="h-6 w-64 mx-auto rounded-md" />
        <Skeleton className="h-4 w-96 mx-auto rounded-md" />
      </div>

      {/* 3 Pricing Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card
            key={i}
            className="border-border/80 bg-card/60 p-6 rounded-2xl space-y-5"
          >
            <div className="space-y-2">
              <Skeleton className="h-5 w-28 rounded-md" />
              <Skeleton className="h-8 w-36 rounded-md" />
              <Skeleton className="h-3.5 w-44 rounded-md" />
            </div>

            <div className="space-y-2.5 pt-3 border-t border-border/60">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-3.5 w-40 rounded-md" />
                </div>
              ))}
            </div>

            <Skeleton className="h-11 w-full rounded-xl mt-4" />
          </Card>
        ))}
      </div>
    </div>
  );
}
