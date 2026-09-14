// ==============================================================================
// GoVPN AI Model Provider Badge Component
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Bot, Cpu, Zap } from "lucide-react";

interface ModelBadgeProps {
  modelName: string;
  className?: string;
}

export function ModelBadge({ modelName, className }: ModelBadgeProps) {
  const norm = modelName.toLowerCase();

  if (norm.includes("gpt") || norm.includes("openai")) {
    return (
      <Badge
        variant="outline"
        className={`border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[11px] font-semibold gap-1 ${className}`}
      >
        <Sparkles className="h-3 w-3" />
        OpenAI
      </Badge>
    );
  }

  if (norm.includes("claude") || norm.includes("anthropic")) {
    return (
      <Badge
        variant="outline"
        className={`border-amber-500/30 bg-amber-500/10 text-amber-400 font-mono text-[11px] font-semibold gap-1 ${className}`}
      >
        <Bot className="h-3 w-3" />
        Claude
      </Badge>
    );
  }

  if (norm.includes("deepseek")) {
    return (
      <Badge
        variant="outline"
        className={`border-primary/30 bg-primary/10 text-primary font-mono text-[11px] font-semibold gap-1 ${className}`}
      >
        <Cpu className="h-3 w-3" />
        DeepSeek
      </Badge>
    );
  }

  if (norm.includes("llama") || norm.includes("meta")) {
    return (
      <Badge
        variant="outline"
        className={`border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-mono text-[11px] font-semibold gap-1 ${className}`}
      >
        <Zap className="h-3 w-3" />
        Meta
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={`border-border bg-muted/40 text-muted-foreground font-mono text-[11px] ${className}`}
    >
      LLM
    </Badge>
  );
}
