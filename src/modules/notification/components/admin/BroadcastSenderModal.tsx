// ==============================================================================
// GoVPN Broadcast Sender Modal Component
// Part of Pola C: components/admin/BroadcastSenderModal.tsx
// Algoritma 3: Idempotent Broadcast with X-Idempotency-Key
// 100% Coinbase Institutional Design System
// ==============================================================================

"use client";

import React, { useState } from "react";
import { NotificationChannel } from "../../types/notification.types";
import { BroadcastAllDto, BroadcastUsersDto } from "../../types/admin.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Megaphone, Send, Loader2, Users, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface BroadcastSenderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBroadcastAll: (dto: BroadcastAllDto, idempotencyKey: string) => Promise<unknown>;
  onBroadcastUsers: (dto: BroadcastUsersDto, idempotencyKey: string) => Promise<unknown>;
}

export function BroadcastSenderModal({
  open,
  onOpenChange,
  onBroadcastAll,
  onBroadcastUsers,
}: BroadcastSenderModalProps) {
  const [targetType, setTargetType] = useState<"ALL" | "SPECIFIC">("ALL");
  const [channel, setChannel] = useState<NotificationChannel>("IN_APP");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [userIdsText, setUserIdsText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Isi pesan pengumuman wajib diisi");
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
          idempotencyKey
        );
        toast.success("Siaran masal ke seluruh pengguna berhasil dimasukkan ke antrean!");
      } else {
        const parsedIds = userIdsText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        if (parsedIds.length === 0) {
          toast.error("Tentukan minimal satu User ID tujuan");
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
          idempotencyKey
        );
        toast.success(`Pesan berhasil dikirim ke ${parsedIds.length} pengguna terpilih!`);
      }

      onOpenChange(false);
      setSubject("");
      setMessage("");
      setUserIdsText("");
    } catch {
      toast.error("Gagal mengirimkan siaran. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] bg-card border-border/60">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Megaphone className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Broadcast Engine</span>
          </div>
          <DialogTitle className="text-xl font-bold">Kirim Notifikasi & Siaran Global</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSend} className="space-y-4 pt-2">
          {/* Target Audience */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">Target Penerima</label>
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
                <span className="text-xs font-bold">Seluruh Pengguna Aktif</span>
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
                <span className="text-xs font-bold">Pengguna Spesifik</span>
              </div>
            </div>
          </div>

          {targetType === "SPECIFIC" && (
            <div className="space-y-1.5 animate-in fade-in duration-200">
              <label className="text-xs font-semibold text-muted-foreground">User IDs (Dipisahkan koma)</label>
              <input
                type="text"
                placeholder="101, 102, 205"
                value={userIdsText}
                onChange={(e) => setUserIdsText(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
          )}

          {/* Channel */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Saluran Pengiriman (Channel)</label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as NotificationChannel)}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
            >
              <option value="IN_APP">In-App Notification (Dashboard Bell)</option>
              <option value="EMAIL">Email SMTP Delivery</option>
              <option value="TELEGRAM">Telegram Bot Channel</option>
              <option value="WHATSAPP">WhatsApp Business API</option>
              <option value="PUSH">Web Push Notification</option>
            </select>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Judul / Subjek Pesan</label>
            <input
              type="text"
              placeholder="Contoh: Pemeliharaan Server SG-01 Dijadwalkan Pukul 02:00 WIB"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Message Body */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Isi Pengumuman / Pesan</label>
            <textarea
              required
              rows={4}
              placeholder="Tuliskan isi pengumuman atau instruksi yang ingin disampaikan ke pengguna..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
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
              Batal
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memproses Siaran...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirimkan Siaran</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
