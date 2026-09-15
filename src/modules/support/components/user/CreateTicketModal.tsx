// ==============================================================================
// GoVPN Create Ticket Modal Component
// Part of Pola C: components/user/CreateTicketModal.tsx
// Algoritma 3: Idempotent Mutation with X-Idempotency-Key
// 100% Coinbase Institutional Design System
// Fully Localized with useI18n (EN/ID)
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { LifeBuoy, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";

interface CreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitTicket: (
    dto: CreateTicketDto,
    idempotencyKey: string,
  ) => Promise<unknown>;
}

export function CreateTicketModal({
  open,
  onOpenChange,
  onSubmitTicket,
}: CreateTicketModalProps) {
  const { t } = useI18n();
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("Konektivitas VPN");
  const [priority, setPriority] = useState<TicketPriority>("MEDIUM");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error(t("support.subjectAndDescRequired"));
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
        idempotencyKey,
      );
      toast.success(t("support.ticketCreated"));
      onOpenChange(false);
      setSubject("");
      setDescription("");
    } catch {
      toast.error(t("support.ticketCreateFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140 bg-card border-border/60">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <LifeBuoy className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t("support.helpdeskBadge")}
            </span>
          </div>
          <DialogTitle className="text-xl font-bold">
            {t("support.newTicketModalTitle")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              {t("support.ticketSubject")}
            </label>
            <Input
              type="text"
              required
              placeholder={t("support.subjectPlaceholder")}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                {t("support.departmentLabel")}
              </label>
              <NativeSelect
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Konektivitas VPN">{t("support.deptVpn")}</option>
                <option value="Billing & Langganan">{t("support.deptBilling")}</option>
                <option value="DNS & Routing">{t("support.deptDns")}</option>
                <option value="Akun & Kredensial">{t("support.deptAccount")}</option>
                <option value="Lainnya">{t("support.deptOther")}</option>
              </NativeSelect>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                {t("support.priorityLabel")}
              </label>
              <NativeSelect
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
              >
                <option value="LOW">{t("support.priorityLow")}</option>
                <option value="MEDIUM">{t("support.priorityMedium")}</option>
                <option value="HIGH">{t("support.priorityHigh")}</option>
                <option value="URGENT">{t("support.priorityUrgent")}</option>
              </NativeSelect>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              {t("support.descriptionLabel")}
            </label>
            <Textarea
              required
              rows={4}
              placeholder={t("support.descriptionPlaceholder")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
            />
          </div>

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
                  <span>{t("support.submitting")}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t("support.submitTicket")}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
