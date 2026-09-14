// ==============================================================================
// GoVPN VPN Seller Bulk Mint Modal Component
// Part of Pola C: components/seller/
// Reseller batch account generation with CSV/TXT export capability
// ==============================================================================

"use client";

import React, { useState } from "react";
import { Layers, Loader2, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { VpnProtocol } from "../../types/vpn.types";

interface BulkAccountMintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BulkAccountMintModal({
  isOpen,
  onClose,
}: BulkAccountMintModalProps) {
  const [protocol, setProtocol] = useState<VpnProtocol>("vmess");
  const [quantity, setQuantity] = useState<number>(10);
  const [prefix, setPrefix] = useState<string>("vip-");
  const [isMinting, setIsMinting] = useState<boolean>(false);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMinting(true);

    // Simulate batch creation
    setTimeout(() => {
      setIsMinting(false);
      toast.success(`Berhasil mencetak ${quantity} akun ${protocol.toUpperCase()}! File TXT siap diunduh.`);
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-border/80 bg-card rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1 text-primary">
            <Layers className="size-4" />
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Reseller Batch Minting
            </span>
          </div>
          <DialogTitle className="text-lg font-bold">
            Cetak Massal Akun VPN
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Cetak hingga 100 akun VPN secara instan untuk didistribusikan kepada sub-klien Anda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleMint} className="space-y-4 pt-2 font-mono">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Pilih Protokol</Label>
            <div className="grid grid-cols-4 gap-2 text-xs font-bold">
              {(["vmess", "vless", "trojan", "ssh"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProtocol(p)}
                  className={`p-2 rounded-xl border uppercase transition-all ${
                    protocol === p
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="mint-quantity" className="text-xs font-medium">
                Jumlah Akun
              </Label>
              <Input
                id="mint-quantity"
                type="number"
                min={1}
                max={100}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="rounded-xl min-h-10 text-xs font-mono"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="mint-prefix" className="text-xs font-medium">
                Prefix Username
              </Label>
              <Input
                id="mint-prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="vip-"
                className="rounded-xl min-h-10 text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs rounded-full min-h-10 px-5 font-sans"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isMinting}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 font-sans shadow-md shadow-primary/25"
            >
              {isMinting ? (
                <>
                  <Loader2 className="mr-1.5 size-3.5 animate-spin" /> Mencetak...
                </>
              ) : (
                <>
                  <Download className="mr-1.5 size-3.5" /> Cetak & Download Akun
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
