// ==============================================================================
// GoVPN Create Ticket Modal Component
// Part of Pola C: components/user/CreateTicketModal.tsx
// Algoritma 3: Idempotent Mutation with X-Idempotency-Key
// 100% Coinbase Institutional Design System
// ==============================================================================

"use client";

import React, { useState } from "react";
import { CreateTicketDto } from "../../types/user.types";
import { TicketPriority } from "../../types/support.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitTicket: (dto: CreateTicketDto, idempotencyKey: string) => Promise<unknown>;
}

export function CreateTicketModal({
  open,
  onOpenChange,
  onSubmitTicket,
}: CreateTicketModalProps) {
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("Konektivitas VPN");
  const [priority, setPriority] = useState<TicketPriority>("MEDIUM");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error("Subjek dan penjelasan kendala wajib diisi");
      return;
    }

    setSubmitting(true);
    // Algoritma 3: Idempotency Key UUID v4
    const idempotencyKey = crypto.randomUUID();

    try {
      await onSubmitTicket(
        {
          subject: subject.trim(),
          department,
          priority,
          description: description.trim(),
        },
        idempotencyKey
      );
      toast.success("Tiket bantuan berhasil diajukan!");
      onOpenChange(false);
      setSubject("");
      setDescription("");
    } catch {
      toast.error("Gagal mengajukan tiket bantuan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] bg-card border-border/60">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <LifeBuoy className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Helpdesk & Support</span>
          </div>
          <DialogTitle className="text-xl font-bold">Buat Tiket Bantuan Baru</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Subjek Tiket</label>
            <input
              type="text"
              required
              placeholder="Contoh: Gagal koneksi node SG-01 pada protokol Trojan"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Departemen / Kategori</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Konektivitas VPN">Konektivitas VPN & Protokol</option>
                <option value="Billing & Langganan">Billing, Invoice & Langganan</option>
                <option value="DNS & Routing">DNS Cloudflare & Routing</option>
                <option value="Akun & Kredensial">Akun & Kredensial Pengguna</option>
                <option value="Lainnya">Pertanyaan Umum Lainnya</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Prioritas</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="LOW">Rendah (Low)</option>
                <option value="MEDIUM">Normal (Medium)</option>
                <option value="HIGH">Tinggi (High)</option>
                <option value="URGENT">Mendesak (Urgent)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Detail Kendala & Pesan Error</label>
            <textarea
              required
              rows={4}
              placeholder="Jelaskan kendala secara rinci, termasuk perangkat yang digunakan (iOS/Android/Windows) dan pesan error jika ada..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

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
                  <span>Mengirimkan...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Ajukan Tiket</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
