// ==============================================================================
// GoVPN Admin Kubernetes Server / Node Table Component
// Part of Pola C: components/admin/AdminK8sServerTable.tsx
// 100% Coinbase Institutional Design System (Cluster Node Inventory)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { K8sServer } from "../../types/k8s.types";
import { AdminCreateServerDto } from "../../types/admin.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Server,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/EmptyState";

interface AdminK8sServerTableProps {
  servers: K8sServer[];
  onCreateServer: (dto: AdminCreateServerDto) => Promise<unknown>;
  onDeleteServer: (id: string | number) => Promise<unknown>;
  loading?: boolean;
}

export function AdminK8sServerTable({
  servers,
  onCreateServer,
  onDeleteServer,
  loading = false,
}: AdminK8sServerTableProps) {
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [nodeIp, setNodeIp] = useState("");
  const [region, setRegion] = useState("SG");
  const [clusterName, setClusterName] = useState("k8s-prod-cluster-01");
  const [cpu, setCpu] = useState(16);
  const [ram, setRam] = useState(64);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !nodeIp.trim()) {
      toast.error("Nama node dan IP wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await onCreateServer({
        name: name.trim(),
        node_ip: nodeIp.trim(),
        region: region.trim(),
        cluster_name: clusterName.trim(),
        total_cpu: Number(cpu) || 16,
        total_ram_gb: Number(ram) || 64,
      });
      setOpenCreate(false);
      setName("");
      setNodeIp("");
      toast.success("Node cluster baru berhasil ditambahkan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (
      !confirm(
        "Hapus node cluster Kubernetes ini? Pod yang berjalan di node ini akan dievakuasi.",
      )
    ) {
      return;
    }
    setDeletingId(id);
    try {
      await onDeleteServer(id);
      toast.success("Node cluster berhasil dihapus");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Server className="h-4 w-4 text-primary" />
            Node Worker Kubernetes Cluster
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar bare-metal / VPS worker node penampung pod container pengguna
          </p>
        </div>

        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger
            render={
              <Button
                size="sm"
                className="h-9 px-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20"
              >
                <Plus className="h-4 w-4" />
                Tambah Node Worker
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md bg-card border-border text-foreground shadow-2xl rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-bold">
                <Server className="h-5 w-5 text-primary" />
                Registrasi Worker Node Baru
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Nama Node
                </Label>
                <Input
                  placeholder="misal: k8s-worker-sg-01"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Node IP Address
                </Label>
                <Input
                  placeholder="103.147.12.90"
                  value={nodeIp}
                  onChange={(e) => setNodeIp(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Region
                  </Label>
                  <Input
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Cluster Name
                  </Label>
                  <Input
                    value={clusterName}
                    onChange={(e) => setClusterName(e.target.value)}
                    className="mt-1.5 bg-muted/30 border-border text-foreground text-xs h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Total Cores CPU
                  </Label>
                  <Input
                    type="number"
                    value={cpu}
                    onChange={(e) => setCpu(Number(e.target.value))}
                    className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Total RAM (GB)
                  </Label>
                  <Input
                    type="number"
                    value={ram}
                    onChange={(e) => setRam(Number(e.target.value))}
                    className="mt-1.5 bg-muted/30 border-border text-foreground font-mono text-xs h-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan Node...
                  </>
                ) : (
                  "Simpan Worker Node"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="w-full h-64 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/80 bg-card/40">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground font-medium">
            Memuat daftar server Kubernetes...
          </p>
        </div>
      ) : servers.length === 0 ? (
        <EmptyState
          icon={Server}
          title="Belum Ada Worker Node"
          description="Tambahkan worker node pertama Anda untuk mulai mendeploy pod container."
        />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-border/80 bg-card/60 shadow-xl">
          <table className="w-full text-left text-sm text-muted-foreground font-mono">
            <thead className="border-b border-border/80 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-sans">Nama Node</th>
                <th className="px-5 py-4 font-sans">IP Address</th>
                <th className="px-5 py-4 font-sans">Region & Cluster</th>
                <th className="px-5 py-4 font-sans">Kapasitas (CPU/RAM)</th>
                <th className="px-5 py-4 font-sans text-center">Pod Aktif</th>
                <th className="px-5 py-4 font-sans">Status</th>
                <th className="px-5 py-4 font-sans text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 text-xs">
              {servers.map((srv) => (
                <tr
                  key={srv.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-5 py-3.5 font-sans font-bold text-foreground">
                    {srv.name}
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="text-foreground font-semibold bg-surface border border-border/60 px-2 py-0.5 rounded text-[11px]">
                      {srv.node_ip}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 font-sans">
                    <span className="text-foreground text-xs">
                      {srv.region} • {srv.cluster_name}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-foreground">
                    {srv.total_cpu} vCPU / {srv.total_ram_gb} GB
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    <Badge
                      variant="outline"
                      className="border-border bg-card text-foreground font-mono text-[11px]"
                    >
                      {srv.pod_count ?? 0} Pods
                    </Badge>
                  </td>

                  <td className="px-5 py-3.5">
                    <Badge
                      variant="outline"
                      className={`gap-1 text-[11px] font-semibold ${
                        srv.status === "READY"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {srv.status === "READY" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <ShieldAlert className="h-3 w-3" />
                      )}
                      {srv.status || "READY"}
                    </Badge>
                  </td>

                  <td className="px-5 py-3.5 text-right font-sans">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === srv.id}
                      onClick={() => handleDelete(srv.id)}
                      className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                    >
                      {deletingId === srv.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
