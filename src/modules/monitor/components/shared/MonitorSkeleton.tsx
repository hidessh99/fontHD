// ==============================================================================
// GoVPN Monitor Skeleton Component
// Algoritma 4: Dynamic Island Dimension-Matched Boundary (CLS = 0)
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function MonitorSkeleton() {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in-50 duration-300">
      {/* 4 Stats Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-border/80 bg-card/60 p-4 rounded-2xl">
            <CardContent className="p-0 flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24 rounded-md" />
                <Skeleton className="h-7 w-20 rounded-md" />
              </div>
              <Skeleton className="h-10 w-10 rounded-xl" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Latency Comparison Chart Skeleton */}
      <Card className="border-border/80 bg-card/60 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>
        <div className="space-y-3 pt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between">
                <Skeleton className="h-3.5 w-32 rounded-md" />
                <Skeleton className="h-3.5 w-12 rounded-md" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </Card>

      {/* Search & Filter Bar Skeleton */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Skeleton className="h-10 w-full md:w-72 rounded-xl" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      {/* 6 Node Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="border-border/80 bg-card/60 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border/80 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-36 rounded-md" />
                  <Skeleton className="h-3 w-24 rounded-md" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16 rounded-md" />
                  <Skeleton className="h-3 w-8 rounded-md" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20 rounded-md" />
                  <Skeleton className="h-3 w-8 rounded-md" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>

            <div className="px-4 py-2.5 bg-muted/20 border-t border-border/60 flex justify-between">
              <Skeleton className="h-3 w-20 rounded-md" />
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
