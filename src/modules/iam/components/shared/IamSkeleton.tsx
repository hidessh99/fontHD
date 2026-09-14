// ==============================================================================
// GoVPN IAM Skeleton (Algorithm 4: CLS = 0 Streaming Boundary)
// Enterprise 1:1 matching dimensions with Coinbase Design System Tokens
// ==============================================================================

import { Skeleton } from "@/components/ui/skeleton";

export function IamSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-pulse p-4">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between pb-4 border-b border-border/40">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded-xl bg-muted/40" />
          <Skeleton className="h-4 w-72 rounded bg-muted/20" />
        </div>
        <Skeleton className="h-10 w-28 rounded-full bg-muted/30" />
      </div>

      {/* Main Form or Card Skeleton */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full bg-muted/40" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-40 rounded bg-muted/30" />
            <Skeleton className="h-3 w-56 rounded bg-muted/20" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20 rounded bg-muted/30" />
            <Skeleton className="h-10 w-full rounded-xl bg-muted/20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-20 rounded bg-muted/30" />
            <Skeleton className="h-10 w-full rounded-xl bg-muted/20" />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Skeleton className="h-11 w-36 rounded-full bg-primary/20" />
        </div>
      </div>

      {/* Secondary Table or Sessions Skeleton */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-6 space-y-4">
        <Skeleton className="h-5 w-32 rounded bg-muted/30" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-border/20">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg bg-muted/30" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32 rounded bg-muted/30" />
                <Skeleton className="h-3 w-24 rounded bg-muted/20" />
              </div>
            </div>
            <Skeleton className="h-8 w-20 rounded-full bg-muted/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
