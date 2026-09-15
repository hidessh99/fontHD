// ==============================================================================
// GoVPN Broadcast Sender Modal Component
// Part of Pola C: components/admin/BroadcastSenderModal.tsx
// Algoritma 3: Idempotent Broadcast with X-Idempotency-Key
// 100% Coinbase Institutional Design System
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { NotificationChannel } from "../../types/notification.types";
import { BroadcastAllDto, BroadcastUsersDto } from "../../types/admin.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { Megaphone, Send, Loader2, Users, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface BroadcastSenderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBroadcastAll: (
    dto: BroadcastAllDto,
    idempotencyKey: string,
  ) => Promise<unknown>;
  onBroadcastUsers: (
    dto: BroadcastUsersDto,
    idempotencyKey: string,
  ) => Promise<unknown>;
}

export function BroadcastSenderModal({
  open,
  onOpenChange,
  onBroadcastAll,
  onBroadcastUsers,
}: BroadcastSenderModalProps) {
  const { t } = useI18n();
  const [targetType, setTargetType] = useState<"ALL" | "SPECIFIC">("ALL");
  const [channel, setChannel] = useState<NotificationChannel>("IN_APP");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [userIdsText, setUserIdsText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error(t("notification.messageRequired"));
      return;
    }

    setSubmitting(true);
    // Algoritma 3: Idempotency Key UUID v4
    const idempotencyKey = crypto.randomUUID();

    try {
      if (targetType === "ALL") {
        await onBroadcastAll(
          {
            subject: subject.trim() || undefined,
            message: message.trim(),
            channel,
          },
          idempotencyKey,
        );
        toast.success(t("notification.broadcastAllSuccess"));
      } else {
        const parsedIds = userIdsText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        if (parsedIds.length === 0) {
          toast.error(t("notification.userRequired"));
          setSubmitting(false);
          return;
        }

        await onBroadcastUsers(
          {
            user_ids: parsedIds,
            subject: subject.trim() || undefined,
            message: message.trim(),
            channel,
          },
          idempotencyKey,
        );
        toast.success(
          t("notification.broadcastUsersSuccess", { count: parsedIds.length }),
        );
      }

      onOpenChange(false);
      setSubject("");
      setMessage("");
      setUserIdsText("");
    } catch {
      toast.error(t("notification.broadcastFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140 bg-card border-border/60">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Megaphone className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t("notification.broadcastEngine")}
            </span>
          </div>
          <DialogTitle className="text-xl font-bold">
            {t("notification.modalTitle")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSend} className="space-y-4 pt-2">
          {/* Target Audience */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">
              {t("notification.targetAudience")}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setTargetType("ALL")}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                  targetType === "ALL"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 bg-background/50 hover:bg-accent text-muted-foreground"
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="text-xs font-bold">
                  {t("notification.allActiveUsers")}
                </span>
              </div>

              <div
                onClick={() => setTargetType("SPECIFIC")}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                  targetType === "SPECIFIC"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 bg-background/50 hover:bg-accent text-muted-foreground"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span className="text-xs font-bold">{t("notification.specificUsers")}</span>
              </div>
            </div>
          </div>

          {targetType === "SPECIFIC" && (
            <div className="space-y-1.5 animate-in fade-in duration-200">
              <label className="text-xs font-semibold text-muted-foreground">
                {t("notification.userIdsLabel")}
              </label>
              <Input
                type="text"
                placeholder="101, 102, 205"
                value={userIdsText}
                onChange={(e) => setUserIdsText(e.target.value)}
                className="font-mono"
              />
            </div>
          )}

          {/* Channel */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              {t("notification.channelLabel")}
            </label>
            <NativeSelect
              value={channel}
              onChange={(e) =>
                setChannel(e.target.value as NotificationChannel)
              }
              className="font-semibold"
            >
              <option value="IN_APP">
                {t("notification.channelInApp")}
              </option>
              <option value="EMAIL">{t("notification.channelEmail")}</option>
              <option value="TELEGRAM">{t("notification.channelTelegram")}</option>
              <option value="WHATSAPP">{t("notification.channelWhatsApp")}</option>
              <option value="PUSH">{t("notification.channelPush")}</option>
            </NativeSelect>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              {t("notification.subjectLabel")}
            </label>
            <Input
              type="text"
              placeholder={t("notification.subjectPlaceholder")}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Message Body */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              {t("notification.messageLabel")}
            </label>
            <Textarea
              required
              rows={4}
              placeholder={t("notification.messagePlaceholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t("notification.sendingBroadcast")}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t("notification.sendBroadcast")}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
