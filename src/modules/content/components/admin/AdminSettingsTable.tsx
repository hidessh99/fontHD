// ==============================================================================
// GoVPN Admin Settings Table Component
// Part of Pola C: components/admin/AdminSettingsTable.tsx
// 100% Coinbase Institutional Design System (Global Key-Value System Settings)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { SystemSetting } from "../../types/content.types";
import { CreateSettingDto, UpdateSettingDto } from "../../types/admin.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sliders, Plus, Edit2, Trash2, Globe, Lock, Search } from "lucide-react";
import { toast } from "sonner";

interface AdminSettingsTableProps {
  settings: SystemSetting[];
  onCreateSetting: (dto: CreateSettingDto) => Promise<unknown>;
  onUpdateSetting: (id: string | number, dto: UpdateSettingDto) => Promise<unknown>;
  onDeleteSetting: (id: string | number) => Promise<unknown>;
}

export function AdminSettingsTable({
  settings,
  onCreateSetting,
  onUpdateSetting,
  onDeleteSetting,
}: AdminSettingsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<SystemSetting | null>(null);

  // Form State
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("GENERAL");
  const [isPublic, setIsPublic] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filteredSettings = settings.filter(
    (s) =>
      s.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.group && s.group.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setEditingSetting(null);
    setKey("");
    setValue("");
    setDescription("");
    setGroup("GENERAL");
    setIsPublic(false);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (s: SystemSetting) => {
    setEditingSetting(s);
    setKey(s.key);
    setValue(s.value);
    setDescription(s.description || "");
    setGroup(s.group || "GENERAL");
    setIsPublic(s.is_public);
    setIsAddModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim() || !value.trim()) {
      toast.error("Key dan Value wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      if (editingSetting) {
        await onUpdateSetting(editingSetting.id, {
          key: key.trim(),
          value: value.trim(),
          description: description.trim() || undefined,
          group,
          is_public: isPublic,
        });
        toast.success(`Konfigurasi ${key} berhasil diperbarui!`);
      } else {
        await onCreateSetting({
          key: key.trim(),
          value: value.trim(),
          description: description.trim() || undefined,
          group,
          is_public: isPublic,
        });
        toast.success(`Konfigurasi ${key} berhasil ditambahkan!`);
      }
      setIsAddModalOpen(false);
    } catch {
      toast.error("Gagal menyimpan konfigurasi");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari konfigurasi parameter sistem..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <Button
          onClick={handleOpenAdd}
          className="gap-2 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Parameter Baru</span>
        </Button>
      </div>

      {/* Settings Table */}
      <div className="rounded-xl border border-border/50 overflow-hidden bg-card/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border/40">
              <tr>
                <th className="p-3.5 font-semibold">Grup</th>
                <th className="p-3.5 font-semibold">Config Key</th>
                <th className="p-3.5 font-semibold">Nilai (Value)</th>
                <th className="p-3.5 font-semibold">Visibilitas</th>
                <th className="p-3.5 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 font-mono">
              {filteredSettings.map((s) => (
                <tr key={s.id} className="hover:bg-accent/30 transition-colors">
                  <td className="p-3.5 whitespace-nowrap font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground">
                      {s.group || "GENERAL"}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-foreground whitespace-nowrap">
                    {s.key}
                  </td>
                  <td className="p-3.5 max-w-xs truncate text-primary font-semibold">
                    {s.value}
                  </td>
                  <td className="p-3.5 whitespace-nowrap font-sans">
                    {s.is_public ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                        <Globe className="w-3 h-3" /> Publik
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-400">
                        <Lock className="w-3 h-3" /> Privat / Internal
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap font-sans">
                    <div className="inline-flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={() => handleOpenEdit(s)}
                        title="Edit Parameter"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onDeleteSetting(s.id)}
                        title="Hapus Parameter"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[480px] bg-card border-border/60">
          <DialogHeader>
            <div className="flex items-center gap-2 text-primary mb-1">
              <Sliders className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">System Config</span>
            </div>
            <DialogTitle className="text-lg font-bold">
              {editingSetting ? "Perbarui Parameter Sistem" : "Tambah Parameter Sistem"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Config Key (Identifier)</label>
              <input
                type="text"
                required
                placeholder="APP_NAME, QRIS_TAX_RATE, dsb"
                value={key}
                onChange={(e) => setKey(e.target.value.toUpperCase().replace(/\s+/g, "_"))}
                disabled={!!editingSetting}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Kategori / Grup</label>
                <select
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="GENERAL">GENERAL</option>
                  <option value="PAYMENT">PAYMENT</option>
                  <option value="BRANDING">BRANDING</option>
                  <option value="SECURITY">SECURITY</option>
                  <option value="VPN_CORE">VPN_CORE</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Visibilitas</label>
                <select
                  value={isPublic ? "true" : "false"}
                  onChange={(e) => setIsPublic(e.target.value === "true")}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="false">Internal Only (Privat)</option>
                  <option value="true">Terekspos Publik (GET /api/settings)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Nilai Parameter (Value)</label>
              <textarea
                required
                rows={3}
                placeholder="Nilai konfigurasi..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary font-mono resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Deskripsi (Opsional)</label>
              <input
                type="text"
                placeholder="Penjelasan fungsi konfigurasi ini..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/40">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                disabled={submitting}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {submitting ? "Menyimpan..." : "Simpan Parameter"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
