// ==============================================================================
// GoVPN Kubernetes Skeleton Component
// Algoritma 4: Dynamic Island Dimension-Matched Boundary (CLS = 0)
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function K8sSkeleton() {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in-50 duration-300">
      {/* 3 Overview Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border-border/80 bg-card/60 p-5 rounded-2xl">
            <CardContent className="p-0 flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24 rounded-md" />
                <Skeleton className="h-7 w-28 rounded-md" />
              </div>
              <Skeleton className="h-11 w-11 rounded-2xl" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter and Action Bar */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-72 rounded-xl" />
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* 4 App Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-border/80 bg-card/60 rounded-2xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-44 rounded-md" />
                <Skeleton className="h-3.5 w-64 rounded-md" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-border/60">
              <Skeleton className="h-10 rounded-xl" />
              <Skeleton className="h-10 rounded-xl" />
              <Skeleton className="h-10 rounded-xl" />
            </div>

            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-4 w-32 rounded-md" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
