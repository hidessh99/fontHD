// ==============================================================================
// GoVPN Admin Settings Table Component
// Part of Pola C: components/admin/AdminSettingsTable.tsx
// 100% Coinbase Institutional Design System + Standardized Enterprise DataTable
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { SystemSetting } from "../../types/content.types";
import { CreateSettingDto, UpdateSettingDto } from "../../types/admin.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable, ColumnDef, DataTableFilterConfig } from "@/components/shared/data-table";
import {
  Sliders,
  Plus,
  Edit2,
  Trash2,
  Globe,
  Lock,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface AdminSettingsTableProps {
  settings: SystemSetting[];
  onCreateSetting: (dto: CreateSettingDto) => Promise<unknown>;
  onUpdateSetting: (
    id: string | number,
    dto: UpdateSettingDto,
  ) => Promise<unknown>;
  onDeleteSetting: (id: string | number) => Promise<unknown>;
}

export function AdminSettingsTable({
  settings,
  onCreateSetting,
  onUpdateSetting,
  onDeleteSetting,
}: AdminSettingsTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<SystemSetting | null>(
    null,
  );

  // Form State
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("GENERAL");
  const [isPublic, setIsPublic] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const columns: ColumnDef<SystemSetting>[] = useMemo(
    () => [
      {
        id: "group",
        header: "Grup",
        className: "whitespace-nowrap font-sans",
        cell: (s) => (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground">
            {s.group || "GENERAL"}
          </span>
        ),
      },
      {
        id: "key",
        header: "Config Key",
        className: "font-bold text-foreground whitespace-nowrap font-mono",
        cell: (s) => s.key,
      },
      {
        id: "value",
        header: "Nilai (Value)",
        className: "max-w-xs truncate text-primary font-semibold font-mono",
        cell: (s) => s.value,
      },
      {
        id: "visibility",
        header: "Visibilitas",
        className: "whitespace-nowrap font-sans",
        cell: (s) =>
          s.is_public ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
              <Globe className="w-3 h-3" /> Publik
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-400">
              <Lock className="w-3 h-3" /> Privat
            </span>
          ),
      },
      {
        id: "actions",
        header: "Aksi",
        align: "right",
        cell: (s) => (
          <div className="inline-flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
              onClick={() => handleOpenEdit(s)}
              title="Edit Konfigurasi"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
              onClick={() => onDeleteSetting(s.id)}
              title="Hapus Parameter"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ),
      },
    ],
    [onDeleteSetting],
  );

  const filters: DataTableFilterConfig<SystemSetting>[] = useMemo(
    () => [
      {
        id: "group",
        label: "Grup",
        defaultValue: "ALL",
        options: [
          { label: "Semua Grup", value: "ALL" },
          { label: "General", value: "GENERAL" },
          { label: "SEO", value: "SEO" },
          { label: "Payment", value: "PAYMENT" },
          { label: "Security", value: "SECURITY" },
          { label: "System", value: "SYSTEM" },
        ],
        filterFn: (s, val) =>
          (s.group || "GENERAL").toUpperCase() === val.toUpperCase(),
      },
    ],
    [],
  );

  const actions = (
    <Button
      onClick={handleOpenAdd}
      className="gap-2 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-9 px-4 shadow-sm"
    >
      <Plus className="w-3.5 h-3.5" />
      <span>Tambah Parameter Baru</span>
    </Button>
  );

  return (
    <div className="space-y-4">
      <DataTable<SystemSetting>
        data={settings}
        columns={columns}
        keyExtractor={(s) => s.id}
        searchable={true}
        searchPlaceholder="Cari konfigurasi parameter sistem..."
        searchButtonText="Cari"
        searchAccessor={(s) => [s.key, s.value, s.group, s.description]}
        filters={filters}
        paginated={true}
        pageSize={10}
        entityName="parameter sistem"
        actions={actions}
        emptyIcon={Sliders}
        emptyTitle="Tidak Ada Parameter"
        emptyDescription="Belum ada parameter konfigurasi sistem yang sesuai."
      />

      {/* Add / Edit Parameter Dialog */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border text-foreground rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold">
              <Sliders className="w-4 h-4 text-primary" />
              {editingSetting
                ? `Edit Parameter: ${editingSetting.key}`
                : "Tambah Parameter Baru"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
            <div>
              <Label className="text-xs text-muted-foreground">Config Key</Label>
              <Input
                placeholder="misal: APP_MAINTENANCE_MODE"
                value={key}
                disabled={Boolean(editingSetting)}
                onChange={(e) => setKey(e.target.value)}
                className="mt-1 font-mono text-xs h-9"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Nilai (Value)</Label>
              <Input
                placeholder="misal: true / https://api.govpn.com"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="mt-1 font-mono text-xs h-9"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Grup</Label>
                <NativeSelect
                  variant="rounded"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  className="mt-1 w-full text-xs font-mono"
                >
                  <option value="GENERAL">GENERAL</option>
                  <option value="SEO">SEO</option>
                  <option value="PAYMENT">PAYMENT</option>
                  <option value="SECURITY">SECURITY</option>
                  <option value="SYSTEM">SYSTEM</option>
                </NativeSelect>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Visibilitas</Label>
                <NativeSelect
                  variant="rounded"
                  value={isPublic ? "true" : "false"}
                  onChange={(e) => setIsPublic(e.target.value === "true")}
                  className="mt-1 w-full text-xs font-mono"
                >
                  <option value="false">Privat (Internal)</option>
                  <option value="true">Publik (Client-side)</option>
                </NativeSelect>
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">
                Deskripsi Kegunaan (Opsional)
              </Label>
              <Input
                placeholder="Penjelasan fungsi konfigurasi ini..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 text-xs h-9"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-full text-xs px-4"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="rounded-full text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-5"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Menyimpan...
                  </>
                ) : (
                  "Simpan Parameter"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
