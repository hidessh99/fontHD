import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon | React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  // Handle both component reference (LucideIcon) and instantiated ReactNode
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === "function") {
      const IconComponent = icon as LucideIcon;
      return <IconComponent className="size-6" />;
    }
    return icon;
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-8 md:p-12 text-center bg-card/30",
        className,
      )}
    >
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4">
          {renderIcon()}
        </div>
      )}
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
