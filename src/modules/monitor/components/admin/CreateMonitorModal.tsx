// ==============================================================================
// GoVPN Admin Create Monitor Modal Component
// Part of Pola C: components/admin/CreateMonitorModal.tsx
// 100% Coinbase Institutional Design System (Telemetry Target Provisioning)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { AdminCreateMonitorDto } from "../../types/admin.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreateMonitorModalProps {
  onCreate: (dto: AdminCreateMonitorDto) => Promise<unknown>;
}

export function CreateMonitorModal({ onCreate }: CreateMonitorModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState<number | undefined>(undefined);
  const [protocol, setProtocol] = useState<"ICMP" | "TCP" | "HTTP" | "GRPC">(
    "ICMP",
  );
  const [interval, setInterval] = useState<number>(30);
  const [threshold, setThreshold] = useState<number>(150);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !host.trim()) {
      toast.error("Nama target dan alamat host wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await onCreate({
        name: name.trim(),
        host: host.trim(),
        port: port || undefined,
        protocol,
        interval_seconds: Number(interval) || 30,
        alert_threshold_ms: Number(threshold) || 150,
      });
      setOpen(false);
      setName("");
      setHost("");
      setPort(undefined);
      toast.success("Target monitor berhasil ditambahkan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/20 gap-2 transition-all">
            <Plus className="h-4 w-4" />
            Tambah Target Monitor
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5 text-base font-bold">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Activity className="h-5 w-5" />
            </div>
            Tambah Target Telemetri Baru
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label className="text-xs text-muted-foreground font-medium">
              Nama Server / Target
            </Label>
            <Input
              placeholder="misal: SG-Edge-01 (Equinix)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground font-medium">
                Host / IP Target
              </Label>
              <Input
                placeholder="103.147.12.88 / domain.id"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground font-medium">
                Port
              </Label>
              <Input
                type="number"
                placeholder="443"
                value={port || ""}
                onChange={(e) =>
                  setPort(e.target.value ? Number(e.target.value) : undefined)
                }
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-medium">
              Protokol Health Check
            </Label>
            <div className="grid grid-cols-4 gap-2 mt-1.5">
              {(["ICMP", "TCP", "HTTP", "GRPC"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProtocol(p)}
                  className={`rounded-xl border py-2 text-xs font-mono font-bold transition-all ${
                    protocol === p
                      ? "border-primary bg-primary/15 text-primary ring-1 ring-primary"
                      : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground font-medium">
                Interval Ping (Detik)
              </Label>
              <select
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
              >
                <option value={10}>10 Detik</option>
                <option value={30}>30 Detik</option>
                <option value={60}>1 Menit</option>
                <option value={300}>5 Menit</option>
              </select>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-medium">
                Ambang Peringatan (ms)
              </Label>
              <Input
                type="number"
                placeholder="150"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-2 shadow-lg shadow-primary/20"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Menyimpan Target...
              </>
            ) : (
              "Simpan Target Telemetri"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
