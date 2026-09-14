// ==============================================================================
// GoVPN DNS Skeleton (Algorithm 4: CLS = 0 Streaming Boundary)
// Enterprise 1:1 matching dimensions with Coinbase Design System Tokens
// ==============================================================================

import { Skeleton } from "@/components/ui/skeleton";

export function DnsSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse p-2">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="space-y-2">
          <Skeleton className="h-7 w-56 rounded-xl bg-muted/40" />
          <Skeleton className="h-4 w-80 rounded bg-muted/20" />
        </div>
        <Skeleton className="h-11 w-36 rounded-full bg-primary/20" />
      </div>

      {/* Filter Toolbar Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Skeleton className="h-10 w-44 rounded-xl bg-muted/30" />
          <Skeleton className="h-10 flex-1 rounded-xl bg-muted/30" />
        </div>
        <Skeleton className="h-9 w-28 rounded-full bg-muted/30" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-border/30 pb-3">
          <Skeleton className="h-4 w-28 rounded bg-muted/30" />
          <Skeleton className="h-4 w-16 rounded bg-muted/30" />
          <Skeleton className="h-4 w-36 rounded bg-muted/30" />
          <Skeleton className="h-4 w-20 rounded bg-muted/30" />
          <Skeleton className="h-4 w-16 rounded bg-muted/30" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-border/20"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-14 rounded-full bg-muted/30" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32 rounded bg-muted/30" />
                <Skeleton className="h-3 w-48 rounded bg-muted/20" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full bg-muted/30" />
            <Skeleton className="h-8 w-8 rounded-full bg-muted/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
