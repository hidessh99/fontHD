import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-8 md:p-12 text-center bg-card/30",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4">
        <Icon className="size-6" />
      </div>
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-xs text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
