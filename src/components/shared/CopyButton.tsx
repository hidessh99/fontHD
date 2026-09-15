"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";

interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
  text: string;
  label?: string;
  successMessage?: string;
  className?: string;
}

export function CopyButton({
  text,
  label,
  successMessage,
  className,
  variant = "outline",
  size = "sm",
  ...props
}: CopyButtonProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const effectiveSuccessMsg = successMessage || t("common.copied") || "Successfully copied to clipboard!";

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(effectiveSuccessMsg);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("common.error") || "Failed to copy to clipboard");
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn(
        "transition-all duration-200 active:scale-95 font-mono text-xs",
        copied && "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
        className,
      )}
      {...props}
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-400 animate-in zoom-in-50 duration-200" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {label && <span>{copied ? (t("common.copied") || "Copied") : label}</span>}
    </Button>
  );
}
