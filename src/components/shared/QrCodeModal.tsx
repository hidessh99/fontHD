"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode as QrIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyButton } from "./CopyButton";
import { toast } from "sonner";

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  dataString: string;
  protocolName?: string;
}

export function QrCodeModal({
  isOpen,
  onClose,
  title = "Pindai QR Code Konfigurasi",
  description = "Pindai kode QR ini menggunakan aplikasi v2rayNG, Clash, Shadowrocket, atau WireGuard.",
  dataString,
  protocolName = "VPN",
}: QrCodeModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !dataString) {
      setQrDataUrl(null);
      return;
    }

    QRCode.toDataURL(dataString, {
      width: 320,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => {
        toast.error("Gagal membuat QR Code");
      });
  }, [isOpen, dataString]);

  const handleDownloadImage = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `${protocolName.toLowerCase()}-qrcode.png`;
    link.click();
    toast.success("Gambar QR Code berhasil diunduh");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-border/80 bg-card">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <QrIcon className="size-5" />
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              {protocolName} Quick Scan
            </span>
          </div>
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center p-4">
          <div className="rounded-2xl border border-white/20 bg-white p-3 shadow-2xl shadow-primary/10">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt="QR Code"
                className="size-56 object-contain"
              />
            ) : (
              <div className="flex size-56 items-center justify-center text-xs text-zinc-500 font-mono">
                Membuat QR Code...
              </div>
            )}
          </div>

          <p className="mt-3 text-center text-xs font-mono text-muted-foreground break-all max-w-xs line-clamp-2">
            {dataString}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadImage}
            disabled={!qrDataUrl}
            className="text-xs font-mono"
          >
            <Download className="mr-1.5 size-3.5" /> Unduh PNG
          </Button>
          <CopyButton
            text={dataString}
            label="Salin URI"
            successMessage="URI konfigurasi disalin!"
            variant="default"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
