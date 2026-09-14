// ==============================================================================
// GoVPN DNS Create User Record Modal
// Part of Pola C: components/user/CreateUserRecordModal.tsx
// 100% Coinbase Institutional Design System (Host FQDN preview, Proxy toggle)
// ==============================================================================

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
import { DnsDomain, DnsRecordType } from "../../types/dns.types";
import { CreateUserDnsRecordDto } from "../../types/user.types";
import { Plus, Globe, Cloud, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreateUserRecordModalProps {
  domains: DnsDomain[];
  onAddRecord: (dto: CreateUserDnsRecordDto) => Promise<unknown>;
}

const RECORD_TYPES: DnsRecordType[] = ["A", "AAAA", "CNAME", "TXT"];

export function CreateUserRecordModal({
  domains,
  onAddRecord,
}: CreateUserRecordModalProps) {
  const [open, setOpen] = useState(false);
  const [domainId, setDomainId] = useState<string | number>(domains[0]?.id || "");
  const [type, setType] = useState<DnsRecordType>("A");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState(1);
  const [proxied, setProxied] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync domainId when domains list updates
  React.useEffect(() => {
    if (!domainId && domains.length > 0) {
      setDomainId(domains[0].id);
    }
  }, [domains, domainId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainId) {
      toast.error("Silakan pilih domain zona terlebih dahulu");
      return;
    }
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

  const selectedDomain = domains.find((d) => String(d.id) === String(domainId));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/20 gap-2 transition-all">
          <Plus className="h-4 w-4" />
          Tambah Record DNS
        </Button>
      } />

      <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5 text-base font-bold tracking-tight">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Globe className="h-5 w-5" />
            </div>
            Tambah DNS Record Baru
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Domain Selection */}
          <div>
            <Label className="text-xs text-muted-foreground font-medium">Pilih Zona Domain</Label>
            <select
              value={domainId}
              onChange={(e) => setDomainId(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-muted/40 px-3.5 py-2.5 text-xs font-mono text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            >
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.domain_name}
                </option>
              ))}
            </select>
          </div>

          {/* Record Type Selection */}
          <div>
            <Label className="text-xs text-muted-foreground font-medium">Tipe Record</Label>
            <div className="grid grid-cols-4 gap-2 mt-1.5">
              {RECORD_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`rounded-xl border py-2 text-xs font-mono font-bold transition-all ${
                    type === t
                      ? "border-primary bg-primary/15 text-primary ring-1 ring-primary"
                      : "border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Host / Subdomain */}
          <div>
            <Label htmlFor="rec-name" className="text-xs text-muted-foreground font-medium">
              Nama Subdomain
            </Label>
            <div className="flex items-center mt-1.5">
              <Input
                id="rec-name"
                placeholder="misal: sg1 atau vpn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-r-none bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
              <span className="rounded-r-xl border border-l-0 border-border bg-muted/70 px-3 py-2 text-xs font-mono text-muted-foreground whitespace-nowrap h-10 flex items-center">
                .{selectedDomain?.domain_name || "domain.id"}
              </span>
            </div>
            {name && (
              <p className="mt-1 text-[11px] text-muted-foreground font-mono">
                FQDN: <span className="text-primary font-bold">{name}.{selectedDomain?.domain_name || "domain.id"}</span>
              </p>
            )}
          </div>

          {/* Target / Content */}
          <div>
            <Label htmlFor="rec-content" className="text-xs text-muted-foreground font-medium">
              {type === "A" ? "Alamat IPv4 Server" : type === "AAAA" ? "Alamat IPv6 Server" : type === "CNAME" ? "Target Hostname" : "Nilai / Text"}
            </Label>
            <Input
              id="rec-content"
              placeholder={type === "A" ? "103.147.12.88" : type === "AAAA" ? "2001:db8::1" : "sg1.govpn-network.id"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
            />
          </div>

          {/* Proxy toggle & TTL */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-xl border border-border bg-muted/20 p-3 flex flex-col justify-between">
              <span className="text-xs text-muted-foreground font-medium">Cloudflare CDN</span>
              <button
                type="button"
                onClick={() => setProxied(!proxied)}
                className={`mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                  proxied
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Cloud className={`h-3.5 w-3.5 ${proxied ? "fill-amber-400 text-amber-400" : ""}`} />
                {proxied ? "Proxied (CDN)" : "DNS Only"}
              </button>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-3 flex flex-col justify-between">
              <span className="text-xs text-muted-foreground font-medium">TTL (Time to Live)</span>
              <select
                value={ttl}
                onChange={(e) => setTtl(Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-border bg-card px-2.5 py-2 text-xs text-foreground outline-none focus:border-primary"
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
            <Label htmlFor="rec-comment" className="text-xs text-muted-foreground font-medium">
              Keterangan / Catatan (Opsional)
            </Label>
            <Input
              id="rec-comment"
              placeholder="misal: Server Singapore 01"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-3 shadow-lg shadow-primary/20"
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
