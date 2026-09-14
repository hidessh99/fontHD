"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
  text: string;
  label?: string;
  successMessage?: string;
  className?: string;
}

export function CopyButton({
  text,
  label,
  successMessage = "Berhasil disalin ke clipboard!",
  className,
  variant = "outline",
  size = "sm",
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(successMessage);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin ke clipboard");
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
      {label && <span>{copied ? "Tersalin" : label}</span>}
    </Button>
  );
}
