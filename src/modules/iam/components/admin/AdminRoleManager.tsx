// ==============================================================================
// GoVPN IAM Superadmin Role Manager Component
// Part of Pola C: components/admin/AdminRoleManager.tsx
// 100% Coinbase Institutional Design System (RBAC Role Definitions & CRUD)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { RoleEntity } from "../../types/iam.types";
import { AdminRoleCreateDto } from "../../types/admin.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShieldCheck, Plus, Trash2, Loader2, Users } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

interface AdminRoleManagerProps {
  roles: RoleEntity[];
  onCreateRole: (dto: AdminRoleCreateDto) => Promise<unknown>;
  onDeleteRole?: (id: string | number) => Promise<unknown>;
}

export function AdminRoleManager({
  roles,
  onCreateRole,
  onDeleteRole,
}: AdminRoleManagerProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreateRole({
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description: description.trim() || undefined,
      });
      toast.success(t("iam.roleCreated"));
      setOpen(false);
      setName("");
      setSlug("");
      setDescription("");
    } catch {
      toast.error(t("iam.roleCreateFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!onDeleteRole) return;
    setDeletingId(id);
    try {
      await onDeleteRole(id);
      toast.success(t("iam.roleDeleted"));
    } catch {
      toast.error(t("iam.roleDeleteFailed"));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold font-mono text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            {t("iam.rbacManagerTitle", { count: roles.length })}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t("iam.rbacManagerDesc")}
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button className="bg-primary hover:bg-primary-hover text-white gap-2 font-semibold text-xs rounded-full min-h-9 px-5 shadow-sm">
                <Plus className="h-4 w-4" />
                {t("iam.addRole")}
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                <ShieldCheck className="h-5 w-5 text-primary" />
                {t("iam.addNewRoleTitle")}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div>
                <Label
                  htmlFor="role-name"
                  className="text-xs font-medium text-muted-foreground"
                >
                  {t("iam.roleNameLabel")}
                </Label>
                <Input
                  id="role-name"
                  placeholder={t("iam.roleNamePlaceholder")}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!slug) {
                      setSlug(
                        e.target.value.toLowerCase().replace(/\s+/g, "_"),
                      );
                    }
                  }}
                  required
                  className="mt-1 text-xs rounded-xl min-h-10"
                />
              </div>

              <div>
                <Label
                  htmlFor="role-slug"
                  className="text-xs font-medium text-muted-foreground"
                >
                  {t("iam.roleSlugLabel")}
                </Label>
                <Input
                  id="role-slug"
                  placeholder="SUPPORT_AGENT"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toUpperCase())}
                  required
                  className="mt-1 font-mono text-xs uppercase rounded-xl min-h-10"
                />
              </div>

              <div>
                <Label
                  htmlFor="role-desc"
                  className="text-xs font-medium text-muted-foreground"
                >
                  {t("iam.roleDescLabel")}
                </Label>
                <Input
                  id="role-desc"
                  placeholder={t("iam.roleDescPlaceholder")}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 text-xs rounded-xl min-h-10"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="text-xs rounded-full min-h-10 px-5"
                >
                  {t("common.cancel", "Cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !slug.trim()}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />{" "}
                      {t("iam.sending")}
                    </>
                  ) : (
                    t("iam.createRoleButton")
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-3 shadow-md hover:bg-card/90 transition-all flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                  {r.slug}
                </span>
                {r.is_system ? (
                  <span className="text-[10px] font-mono font-bold text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
                    {t("iam.systemRole")}
                  </span>
                ) : (
                  onDeleteRole && (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === r.id}
                      onClick={() => handleDelete(r.id)}
                      className="h-7 w-7 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )
                )}
              </div>

              <h4 className="text-sm font-bold text-foreground">{r.name}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {r.description || t("iam.noRoleDesc")}
              </p>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {t("iam.roleUserCount", { count: r.user_count || 0 })}
              </span>
              <span>ID: {r.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
