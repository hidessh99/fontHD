// ==============================================================================
// GoVPN IAM User Profile Card Component
// Part of Pola C: components/user/ProfileCard.tsx
// 100% Coinbase Institutional Design System (High-Trust User Credentials)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { UserProfile } from "../../types/iam.types";
import { UpdateProfileDto } from "../../types/user.types";
import { RoleBadge } from "../shared/RoleBadge";
import { Card, CardContent } from "@/components/ui/card";
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
import { User, Mail, Phone, Calendar, Edit3, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProfileCardProps {
  user: UserProfile;
  onUpdateProfile?: (id: string | number, dto: UpdateProfileDto) => Promise<unknown>;
}

export function ProfileCard({ user, onUpdateProfile }: ProfileCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initials = (user.username || "U").slice(0, 2).toUpperCase();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateProfile) return;

    setIsSubmitting(true);
    try {
      await onUpdateProfile(user.id, {
        username: username.trim(),
        email: email.trim(),
        phone_number: phoneNumber.trim() || undefined,
      });
      toast.success("Profil berhasil diperbarui!");
      setIsEditOpen(false);
    } catch {
      toast.error("Gagal memperbarui profil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card className="border border-border/80 bg-card/60 p-6 rounded-3xl relative overflow-hidden shadow-xl">
      <div className="absolute -right-8 -bottom-8 h-36 w-36 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <CardContent className="p-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* User Identity Info */}
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-mono text-xl font-bold text-primary shadow-sm shrink-0">
            {initials}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-foreground font-mono">
                {user.username}
              </h2>
              <RoleBadge role={user.role} />
              {user.isEmailVerified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="h-3 w-3" /> Terverifikasi
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {user.email}
              </span>
              {user.phoneNumber && (
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {user.phoneNumber}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Bergabung: {formatDate(user.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Profile Action */}
        {onUpdateProfile && (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger render={
              <Button
                variant="outline"
                className="border-border/80 hover:bg-muted/30 text-foreground gap-2 font-semibold text-xs rounded-full min-h-10 px-5 shadow-sm self-start md:self-center"
              >
                <Edit3 className="h-4 w-4 text-primary" />
                Ubah Profil
              </Button>
            } />
            <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                  <User className="h-5 w-5 text-primary" />
                  Perbarui Informasi Profil
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleUpdate} className="space-y-4 pt-2">
                <div>
                  <Label htmlFor="edit-uname" className="text-xs font-medium text-muted-foreground">
                    Username
                  </Label>
                  <Input
                    id="edit-uname"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-email" className="text-xs font-medium text-muted-foreground">
                    Alamat Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-phone" className="text-xs font-medium text-muted-foreground">
                    Nomor WhatsApp / Ponsel (Opsional)
                  </Label>
                  <Input
                    id="edit-phone"
                    placeholder="0812xxxxxxxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-1.5 font-mono text-xs rounded-xl min-h-10"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditOpen(false)}
                    className="text-xs rounded-full min-h-10 px-5"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Menyimpan...
                      </>
                    ) : (
                      "Simpan Perubahan"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}
