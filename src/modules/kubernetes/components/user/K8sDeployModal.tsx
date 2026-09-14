// ==============================================================================
// GoVPN Kubernetes Deploy Modal Component
// Part of Pola C: components/user/K8sDeployModal.tsx
// 100% Coinbase Institutional Design System (1-Click Templates & Custom Image)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { K8sSpec, K8sTemplate } from "../../types/k8s.types";
import { DeployK8sAppDto } from "../../types/user.types";
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
import { Plus, Rocket, Layers, Cpu, HardDrive, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface K8sDeployModalProps {
  templates: K8sTemplate[];
  specs: K8sSpec[];
  onDeploy: (dto: DeployK8sAppDto) => Promise<unknown>;
}

export function K8sDeployModal({
  templates,
  specs,
  onDeploy,
}: K8sDeployModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | number>("");
  const [customImage, setCustomImage] = useState("");
  const [selectedSpecId, setSelectedSpecId] = useState<string | number>(specs[0]?.id || "");
  const [port, setPort] = useState<number>(80);
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (!selectedSpecId && specs.length > 0) {
      setSelectedSpecId(specs[0].id);
    }
  }, [specs, selectedSpecId]);

  const handleTemplateSelect = (tmpl: K8sTemplate) => {
    setSelectedTemplateId(tmpl.id);
    setCustomImage(tmpl.docker_image);
    setPort(tmpl.default_port || 80);
    if (!name) {
      setName(`${tmpl.slug}-${Math.floor(Math.random() * 1000)}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !customImage.trim() || !selectedSpecId) {
      toast.error("Nama aplikasi, Docker image, dan Resource Tier wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await onDeploy({
        name: name.trim().toLowerCase(),
        docker_image: customImage.trim(),
        template_id: selectedTemplateId || undefined,
        spec_id: selectedSpecId,
        ports: [port],
      });
      setOpen(false);
      setName("");
      setCustomImage("");
      toast.success(`Aplikasi ${name} berhasil dideploy ke Kubernetes cluster`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/20 gap-2 transition-all">
          <Plus className="h-4 w-4" />
          Deploy Container Baru
        </Button>
      } />

      <DialogContent className="sm:max-w-xl bg-card border-border text-foreground shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5 text-base font-bold">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Rocket className="h-5 w-5" />
            </div>
            Deploy Container Pod ke Kubernetes
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* 1-Click Templates Grid */}
          {templates.length > 0 && (
            <div>
              <Label className="text-xs text-muted-foreground font-medium">
                Pilih Template Cepat (Opsional)
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {templates.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleTemplateSelect(tmpl)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedTemplateId === tmpl.id
                        ? "border-primary bg-primary/15 ring-1 ring-primary"
                        : "border-border bg-muted/30 hover:bg-muted/60"
                    }`}
                  >
                    <span className="font-bold text-xs text-foreground block truncate">
                      {tmpl.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono truncate block">
                      {tmpl.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* App Name */}
          <div>
            <Label className="text-xs text-muted-foreground font-medium">Nama Aplikasi</Label>
            <Input
              placeholder="misal: my-vpn-gateway / my-wordpress"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
            />
          </div>

          {/* Docker Image & Port */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground font-medium">Docker Image</Label>
              <Input
                placeholder="misal: nginx:alpine / shadowsocks/shadowsocks-libev"
                value={customImage}
                onChange={(e) => setCustomImage(e.target.value)}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground font-medium">Port</Label>
              <Input
                type="number"
                value={port}
                onChange={(e) => setPort(Number(e.target.value))}
                className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
              />
            </div>
          </div>

          {/* Resource Specs Selector */}
          <div>
            <Label className="text-xs text-muted-foreground font-medium">Pilih Paket Resource (Spec)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
              {specs.map((spec) => (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setSelectedSpecId(spec.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedSpecId === spec.id
                      ? "border-primary bg-primary/15 ring-1 ring-primary"
                      : "border-border bg-muted/30 hover:bg-muted/60"
                  }`}
                >
                  <span className="font-bold text-xs text-foreground block">
                    {spec.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground font-mono">
                    <span>{spec.cpu_cores} vCPU</span>
                    <span>•</span>
                    <span>{spec.ram_mb} MB</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary mt-1.5 block">
                    Rp {spec.price_monthly.toLocaleString("id-ID")}/bln
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting || !name || !customImage}
            className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-3 shadow-lg shadow-primary/20"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Mendeploy Pod ke Cluster...
              </>
            ) : (
              "Deploy Aplikasi Sekarang"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
