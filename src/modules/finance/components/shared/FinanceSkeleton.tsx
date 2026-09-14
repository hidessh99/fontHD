// ==============================================================================
// GoVPN Finance Skeleton (Algorithm 4: CLS = 0 Streaming Boundary)
// Enterprise 1:1 matching dimensions with Coinbase Design System Tokens
// ==============================================================================

import { Skeleton } from "@/components/ui/skeleton";

export function FinanceSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Balance Card Skeleton */}
      <div className="p-6 rounded-2xl border border-border/40 bg-card/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <Skeleton className="h-14 w-14 rounded-2xl bg-muted/40" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded bg-muted/30" />
            <Skeleton className="h-8 w-48 rounded-xl bg-muted/40" />
            <Skeleton className="h-3 w-40 rounded bg-muted/20" />
          </div>
        </div>
        <Skeleton className="h-12 w-40 rounded-full bg-primary/20" />
      </div>

      {/* Tabs / Filter Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-64 rounded-full bg-muted/30" />
        <Skeleton className="h-10 w-32 rounded-full bg-muted/30" />
      </div>

      {/* Table Skeleton */}
      <div className="p-6 rounded-2xl border border-border/40 bg-card/40 space-y-4">
        <div className="flex items-center justify-between border-b border-border/30 pb-3">
          <Skeleton className="h-4 w-28 rounded bg-muted/30" />
          <Skeleton className="h-4 w-24 rounded bg-muted/30" />
          <Skeleton className="h-4 w-20 rounded bg-muted/30" />
          <Skeleton className="h-4 w-16 rounded bg-muted/30" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2 border-b border-border/20"
          >
            <Skeleton className="h-4 w-32 rounded bg-muted/20" />
            <Skeleton className="h-4 w-24 rounded bg-muted/20" />
            <Skeleton className="h-6 w-20 rounded-full bg-muted/30" />
            <Skeleton className="h-8 w-24 rounded-full bg-muted/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
