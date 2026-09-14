// ==============================================================================
// GoVPN VPN Protocol Skeleton (Algorithm 4: CLS = 0 Streaming Boundary)
// Enterprise 1:1 matching dimensions with Coinbase Design System Tokens
// ==============================================================================

import { Skeleton } from "@/components/ui/skeleton";

export function VpnProtocolSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg bg-muted/40" />
            <Skeleton className="h-8 w-48 rounded-xl bg-muted/40" />
            <Skeleton className="h-6 w-20 rounded-full bg-muted/30" />
          </div>
          <Skeleton className="h-4 w-72 rounded-md bg-muted/20" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-36 rounded-full bg-muted/30" />
          <Skeleton className="h-12 w-44 rounded-full bg-primary/20" />
        </div>
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-border/40 bg-card/40 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 rounded bg-muted/30" />
              <Skeleton className="h-5 w-5 rounded-md bg-muted/30" />
            </div>
            <Skeleton className="h-8 w-32 rounded-lg bg-muted/40" />
            <Skeleton className="h-3 w-40 rounded bg-muted/20" />
          </div>
        ))}
      </div>

      {/* Account Cards Grid Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-36 rounded-lg bg-muted/40" />
          <Skeleton className="h-4 w-24 rounded bg-muted/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-border/40 bg-card/40 space-y-5"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 rounded-md bg-muted/40" />
                  <Skeleton className="h-4 w-24 rounded bg-muted/20" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full bg-muted/30" />
              </div>

              <div className="p-4 rounded-xl bg-background/50 space-y-2">
                <Skeleton className="h-4 w-full rounded bg-muted/20" />
                <Skeleton className="h-4 w-3/4 rounded bg-muted/20" />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <Skeleton className="h-10 w-28 rounded-full bg-muted/30" />
                <Skeleton className="h-10 w-28 rounded-full bg-muted/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
