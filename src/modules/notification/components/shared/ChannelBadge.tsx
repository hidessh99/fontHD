// ==============================================================================
// GoVPN Notification Channel Badge Component
// Part of Pola C: components/shared/ChannelBadge.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { Badge } from "@/components/ui/badge";
import { NotificationChannel } from "../../types/notification.types";
import { Mail, Send, MessageSquare, Bell, Smartphone } from "lucide-react";

interface ChannelBadgeProps {
  channel: NotificationChannel;
  className?: string;
}

export function ChannelBadge({ channel, className }: ChannelBadgeProps) {
  switch (channel) {
    case "EMAIL":
      return (
        <Badge
          variant="outline"
          className={`border-blue-500/30 bg-blue-500/10 text-blue-400 gap-1 text-[11px] font-semibold ${className || ""}`}
        >
          <Mail className="w-3 h-3" /> EMAIL
        </Badge>
      );
    case "TELEGRAM":
      return (
        <Badge
          variant="outline"
          className={`border-sky-500/30 bg-sky-500/10 text-sky-400 gap-1 text-[11px] font-semibold ${className || ""}`}
        >
          <Send className="w-3 h-3" /> TELEGRAM
        </Badge>
      );
    case "WHATSAPP":
      return (
        <Badge
          variant="outline"
          className={`border-emerald-500/30 bg-emerald-500/10 text-emerald-400 gap-1 text-[11px] font-semibold ${className || ""}`}
        >
          <MessageSquare className="w-3 h-3" /> WHATSAPP
        </Badge>
      );
    case "PUSH":
      return (
        <Badge
          variant="outline"
          className={`border-purple-500/30 bg-purple-500/10 text-purple-400 gap-1 text-[11px] font-semibold ${className || ""}`}
        >
          <Smartphone className="w-3 h-3" /> PUSH
        </Badge>
      );
    case "IN_APP":
      return (
        <Badge
          variant="outline"
          className={`border-zinc-500/30 bg-zinc-500/10 text-zinc-300 gap-1 text-[11px] font-semibold ${className || ""}`}
        >
          <Bell className="w-3 h-3" /> IN-APP
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className={`text-[11px] ${className || ""}`}>
          {channel}
        </Badge>
      );
  }
}
