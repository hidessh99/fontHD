// ==============================================================================
// GoVPN AI Skeleton Component
// Algoritma 4: Dynamic Island Dimension-Matched Boundary (CLS = 0)
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function AiSkeleton() {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in-50 duration-300">
      {/* 3 Overview Cards */}
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

      {/* Tabs / Filter bar */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-72 rounded-xl" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border/80 bg-card/60 p-5 rounded-2xl space-y-4">
            <Skeleton className="h-5 w-48 rounded-md" />
            <Skeleton className="h-4 w-72 rounded-md" />
            <div className="space-y-3 pt-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-border/80 bg-card/60 p-5 rounded-2xl space-y-4">
            <Skeleton className="h-5 w-36 rounded-md" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </Card>
        </div>
      </div>
    </div>
  );
}
