// ==============================================================================
// GoVPN User Notification Feed Component
// Part of Pola C: components/user/NotificationFeed.tsx
// 100% Coinbase Institutional Design System
// ==============================================================================

"use client";

import React from "react";
import { NotificationItem } from "../../types/notification.types";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Bell,
  CheckCheck,
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

interface NotificationFeedProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => Promise<unknown>;
  onMarkAsRead: (id: string | number) => Promise<unknown>;
}

export function NotificationFeed({
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
}: NotificationFeedProps) {
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (notifications.length === 0) {
    return (
      <EmptyState
        icon={Bell}
        title="Tidak Ada Notifikasi"
        description="Semua informasi pemeliharaan server, langganan, dan pengumuman akan muncul di sini."
      />
    );
  }

  const getIcon = (type?: string) => {
    switch (type) {
      case "SUCCESS":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "WARNING":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "CRITICAL":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "INFO":
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {unreadCount > 0 ? (
            <span className="font-semibold text-primary">
              {unreadCount} pemberitahuan belum dibaca
            </span>
          ) : (
            <span>Semua pemberitahuan telah dibaca</span>
          )}
        </div>

        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAllAsRead()}
            className="text-xs gap-1.5 text-muted-foreground hover:text-foreground h-8"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Tandai Semua Dibaca</span>
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => !item.is_read && onMarkAsRead(item.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              item.is_read
                ? "bg-card/40 border-border/40 opacity-75"
                : "bg-card border-primary/30 ring-1 ring-primary/20 shadow-sm"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-background/80 border border-border/50 shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.message}
                </p>

                {item.action_url && (
                  <div className="pt-1.5">
                    <Link
                      href={item.action_url}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Lihat Detail</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
