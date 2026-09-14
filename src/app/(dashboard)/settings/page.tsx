"use client";

import React, { useState } from "react";
import { User, Lock, Shield, Key, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/modules/iam/hooks/useAuth";
import { changePasswordApi } from "@/modules/iam/api/iam.api";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [passData, setPassData] = useState({ old_password: "", new_password: "" });
  const [isChangingPass, setIsChangingPass] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passData.old_password || !passData.new_password) return;

    setIsChangingPass(true);
    try {
      await changePasswordApi(passData);
      toast.success("Kata sandi berhasil diperbarui");
      setPassData({ old_password: "", new_password: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengubah kata sandi";
      toast.error(msg);
    } finally {
      setIsChangingPass(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="border-b border-border/60 pb-5">
        <h1 className="text-xl font-bold tracking-tight">Pengaturan & Keamanan Akun</h1>
        <p className="text-xs text-muted-foreground">
          Kelola profil pengguna, kredensial akses, dan kunci API developer Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <Card className="border-border/80 bg-card/60">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <User className="size-4 text-primary" />
              <CardTitle className="text-base font-bold">Informasi Profil</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Detail identitas akun yang terdaftar di sistem.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">
                Username
              </span>
              <p className="text-sm font-mono font-semibold">{user?.username || "user"}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">
                Email
              </span>
              <p className="text-sm font-mono">{user?.email || "user@domain.com"}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">
                Role Izin Akses
              </span>
              <div>
                <Badge variant="outline" className="border-primary/40 text-primary font-mono text-xs">
                  {user?.role || "USER"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card className="border-border/80 bg-card/60">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Lock className="size-4 text-primary" />
              <CardTitle className="text-base font-bold">Ubah Kata Sandi</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Perbarui kata sandi Anda secara berkala untuk menjaga keamanan akun.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handlePasswordChange}>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Kata Sandi Lama</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={passData.old_password}
                  onChange={(e) =>
                    setPassData((prev) => ({ ...prev, old_password: e.target.value }))
                  }
                  className="text-xs font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Kata Sandi Baru</Label>
                <Input
                  type="password"
                  placeholder="Minimal 8 karakter"
                  value={passData.new_password}
                  onChange={(e) =>
                    setPassData((prev) => ({ ...prev, new_password: e.target.value }))
                  }
                  className="text-xs font-mono"
                  required
                />
              </div>

              <Button
                type="submit"
                size="sm"
                className="w-full bg-primary hover:bg-primary-hover text-white text-xs mt-2"
                disabled={isChangingPass}
              >
                {isChangingPass ? "Memperbarui..." : "Perbarui Kata Sandi"}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
