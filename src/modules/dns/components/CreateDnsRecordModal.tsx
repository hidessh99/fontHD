"use client";

import React, { useState } from "react";
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
import { DnsDomain, DnsRecordType, CreateDnsRecordDto } from "../types/dns.types";
import { Plus, Globe, Cloud, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreateDnsRecordModalProps {
  domains: DnsDomain[];
  onAddRecord: (dto: CreateDnsRecordDto) => Promise<unknown>;
}

const RECORD_TYPES: DnsRecordType[] = ["A", "CNAME", "TXT", "AAAA"];

export function CreateDnsRecordModal({
  domains,
  onAddRecord,
}: CreateDnsRecordModalProps) {
  const [open, setOpen] = useState(false);
  const [domainId, setDomainId] = useState<string>(domains[0]?.id || "");
  const [type, setType] = useState<DnsRecordType>("A");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState(1);
  const [proxied, setProxied] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync domainId when domains load
  React.useEffect(() => {
    if (!domainId && domains.length > 0) {
      setDomainId(domains[0].id);
    }
  }, [domains, domainId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      toast.error("Nama host dan target IP/domain wajib diisi");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddRecord({
        domain_id: domainId,
        type,
        name: name.trim().toLowerCase(),
        content: content.trim(),
        ttl,
        proxied,
        comment: comment.trim() || undefined,
      });
      setOpen(false);
      setName("");
      setContent("");
      setComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDomain = domains.find((d) => d.id === domainId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2 font-medium text-xs h-9">
          <Plus className="h-4 w-4" />
          Tambah Record DNS
        </Button>
      } />

      <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <Globe className="h-5 w-5 text-blue-400" />
            Tambah DNS Record Baru
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Domain Selection */}
          <div>
            <Label className="text-xs text-zinc-400">Pilih Zona Domain</Label>
            <select
              value={domainId}
              onChange={(e) => setDomainId(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-200 outline-none focus:border-blue-500"
            >
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.domain_name}
                </option>
              ))}
            </select>
          </div>

          {/* Record Type */}
          <div>
            <Label className="text-xs text-zinc-400">Tipe Record</Label>
            <div className="grid grid-cols-4 gap-2 mt-1.5">
              {RECORD_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`rounded-lg border py-2 text-xs font-mono font-bold transition-all ${
                    type === t
                      ? "border-blue-500 bg-blue-600/20 text-blue-400 ring-1 ring-blue-500"
                      : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Host / Subdomain */}
          <div>
            <Label htmlFor="rec-name" className="text-xs text-zinc-400">
              Nama Subdomain
            </Label>
            <div className="flex items-center mt-1.5">
              <Input
                id="rec-name"
                placeholder="misal: sg1 atau vpn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-r-none bg-zinc-900 border-zinc-800 text-zinc-100 font-mono text-xs"
              />
              <span className="rounded-r-md border border-l-0 border-zinc-800 bg-zinc-800/80 px-3 py-2 text-xs font-mono text-zinc-400 whitespace-nowrap">
                .{selectedDomain?.domain_name || "domain.id"}
              </span>
            </div>
          </div>

          {/* Target / Content */}
          <div>
            <Label htmlFor="rec-content" className="text-xs text-zinc-400">
              {type === "A" ? "Alamat IPv4 Server" : type === "CNAME" ? "Target Hostname" : "Nilai / Text"}
            </Label>
            <Input
              id="rec-content"
              placeholder={type === "A" ? "103.147.12.88" : "sg1.govpn-network.id"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1.5 bg-zinc-900 border-zinc-800 text-zinc-100 font-mono text-xs"
            />
          </div>

          {/* Proxy toggle & TTL */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 flex flex-col justify-between">
              <span className="text-xs text-zinc-400">Cloudflare CDN</span>
              <button
                type="button"
                onClick={() => setProxied(!proxied)}
                className={`mt-2 inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${
                  proxied
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                <Cloud className={`h-3.5 w-3.5 ${proxied ? "fill-amber-400" : ""}`} />
                {proxied ? "Proxied (CDN)" : "DNS Only"}
              </button>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 flex flex-col justify-between">
              <span className="text-xs text-zinc-400">TTL (Time to Live)</span>
              <select
                value={ttl}
                onChange={(e) => setTtl(Number(e.target.value))}
                className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-200 outline-none"
              >
                <option value={1}>Auto</option>
                <option value={60}>1 Menit</option>
                <option value={300}>5 Menit</option>
                <option value={3600}>1 Jam</option>
              </select>
            </div>
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="rec-comment" className="text-xs text-zinc-400">
              Keterangan / Catatan (Opsional)
            </Label>
            <Input
              id="rec-comment"
              placeholder="Catatan server VPN..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1.5 bg-zinc-900 border-zinc-800 text-zinc-100 text-xs"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white gap-2 font-medium mt-2"
            disabled={isSubmitting || !name || !content}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Menyimpan Record...
              </>
            ) : (
              "Simpan Record DNS"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
