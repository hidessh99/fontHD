// ==============================================================================
// GoVPN Content Skeleton Component
// Part of Pola C: components/shared/ContentSkeleton.tsx
// Algoritma 4: Dimension-Matched CLS = 0 Skeleton
// ==============================================================================

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ContentSkeleton() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-8 w-64 rounded-md" />
          <Skeleton className="h-4 w-96 rounded-md" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl border border-border/40 bg-card/40 p-5 space-y-4">
            <Skeleton className="h-40 w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-3 w-3/4 rounded" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
