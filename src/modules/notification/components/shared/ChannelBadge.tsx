// ==============================================================================
// GoVPN Notification Channel Badge Component
// Part of Pola C: components/shared/ChannelBadge.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

import React from "react";
import { NotificationChannel } from "../../types/notification.types";
import { Mail, Send, MessageSquare, Bell, Smartphone } from "lucide-react";

interface ChannelBadgeProps {
  channel: NotificationChannel;
}

export function ChannelBadge({ channel }: ChannelBadgeProps) {
  switch (channel) {
    case "EMAIL":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Mail className="w-3 h-3" /> EMAIL
        </span>
      );
    case "TELEGRAM":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <Send className="w-3 h-3" /> TELEGRAM
        </span>
      );
    case "WHATSAPP":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <MessageSquare className="w-3 h-3" /> WHATSAPP
        </span>
      );
    case "PUSH":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Smartphone className="w-3 h-3" /> PUSH
        </span>
      );
    case "IN_APP":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-500/10 text-zinc-300 border border-zinc-500/20">
          <Bell className="w-3 h-3" /> IN-APP
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-secondary text-secondary-foreground">
          {channel}
        </span>
      );
  }
}
