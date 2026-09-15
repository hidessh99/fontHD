// ==============================================================================
// GoVPN Kubernetes App Env Editor Modal Component
// Part of Pola C: components/user/K8sEnvEditorModal.tsx
// 100% Coinbase Institutional Design System (Key-Value Configmaps)
// ==============================================================================

"use client";

import React, { useState, useEffect } from "react";
import { K8sApp, K8sEnvVar } from "../../types/k8s.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

interface K8sEnvEditorModalProps {
  app: K8sApp | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveEnv: (appId: string | number, envs: K8sEnvVar[]) => Promise<unknown>;
}

export function K8sEnvEditorModal({
  app,
  open,
  onOpenChange,
  onSaveEnv,
}: K8sEnvEditorModalProps) {
  const { t } = useI18n();
  const [envs, setEnvs] = useState<K8sEnvVar[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (app) {
      setEnvs(app.env_vars ? [...app.env_vars] : []);
    }
  }, [app]);

  const handleAdd = () => {
    setEnvs((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleRemove = (index: number) => {
    setEnvs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: "key" | "value", val: string) => {
    setEnvs((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: val } : item)),
    );
  };

  const handleSave = async () => {
    if (!app) return;
    setSaving(true);
    try {
      const validEnvs = envs.filter((e) => e.key.trim() !== "");
      await onSaveEnv(app.id, validEnvs);
      onOpenChange(false);
      toast.success(t("kubernetes.envSaved"));
    } catch {
      toast.error(t("kubernetes.envSaveFailed"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border text-foreground shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5 text-base font-bold">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Settings className="h-5 w-5" />
            </div>
            {t("kubernetes.envModalTitle", { name: app?.name || "" })}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>{t("kubernetes.envSubtitle")}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAdd}
              className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10 gap-1 rounded-lg"
            >
              <Plus className="h-3.5 w-3.5" /> {t("kubernetes.addRow")}
            </Button>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
            {envs.length === 0 ? (
              <div className="text-center py-6 text-xs text-muted-foreground border border-dashed border-border rounded-xl">
                {t("kubernetes.noCustomEnvs")}
              </div>
            ) : (
              envs.map((env, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    placeholder="KEY_NAME"
                    value={env.key}
                    onChange={(e) => handleChange(idx, "key", e.target.value)}
                    className="bg-muted/30 border-border text-foreground font-mono text-xs h-9 uppercase"
                  />
                  <span className="text-muted-foreground font-mono">=</span>
                  <Input
                    placeholder="value_string"
                    value={env.value}
                    onChange={(e) => handleChange(idx, "value", e.target.value)}
                    className="bg-muted/30 border-border text-foreground font-mono text-xs h-9"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(idx)}
                    className="h-9 w-9 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg shrink-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))
            )}
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 mt-4"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("kubernetes.envSaving")}
              </>
            ) : (
              t("kubernetes.envSaveBtn")
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
