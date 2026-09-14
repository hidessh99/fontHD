// ==============================================================================
// GoVPN IAM User Profile & Security Settings View
// Part of Pola C: views/user/UserProfileSettingsView.tsx
// 100% Coinbase Institutional Design System (Tabs: Profile, 2FA, Sessions, Addresses)
// ==============================================================================

"use client";

import React from "react";
import { useIamUser } from "../../hooks/useIamUser";
import { ProfileCard } from "../../components/user/ProfileCard";
import { ChangePasswordModal } from "../../components/user/ChangePasswordModal";
import { TwoFactorSetupModal } from "../../components/user/TwoFactorSetupModal";
import { UserSessionManager } from "../../components/user/UserSessionManager";
import { AddressManager } from "../../components/user/AddressManager";
import { VerifyEmailBanner } from "../../components/guest/VerifyEmailBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { User, ShieldCheck, Laptop, MapPin, KeyRound } from "lucide-react";

export function UserProfileSettingsView() {
  const {
    user,
    sessions,
    addresses,
    twoFactorEnabled,
    updateProfile,
    changePassword,
    revokeSession,
    logoutAllOtherSessions,
    createAddress,
    deleteAddress,
    enable2Fa,
    disable2Fa,
    resendEmailVerification,
  } = useIamUser();

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Email Verification Alert */}
      <VerifyEmailBanner
        email={user.email}
        isVerified={user.isEmailVerified}
        onResendVerification={resendEmailVerification}
      />

      {/* Main Profile Header Card */}
      <ProfileCard
        user={user}
        onUpdateProfile={updateProfile}
      />

      {/* Settings Navigation Tabs */}
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="bg-muted/40 border border-border/80 p-1 rounded-xl">
          <TabsTrigger
            value="security"
            className="gap-2 text-xs font-mono font-medium data-state-active:bg-background data-state-active:text-foreground"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Keamanan &amp; 2FA
          </TabsTrigger>
          <TabsTrigger
            value="sessions"
            className="gap-2 text-xs font-mono font-medium data-state-active:bg-background data-state-active:text-foreground"
          >
            <Laptop className="h-3.5 w-3.5" />
            Sesi Perangkat ({sessions.length})
          </TabsTrigger>
          <TabsTrigger
            value="addresses"
            className="gap-2 text-xs font-mono font-medium data-state-active:bg-background data-state-active:text-foreground"
          >
            <MapPin className="h-3.5 w-3.5" />
            Alamat Penagihan ({addresses.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Security & 2FA */}
        <TabsContent value="security" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Password Card */}
            <Card className="border-border/80 bg-card/60 p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 border border-primary/20 p-2.5 text-primary">
                    <KeyRound className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Kata Sandi Akun</h4>
                    <p className="text-xs text-muted-foreground">
                      Ubah kata sandi secara berkala untuk menjaga keamanan akun.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-border/40">
                <ChangePasswordModal onChangePassword={changePassword} />
              </div>
            </Card>

            {/* 2FA Card */}
            <Card className="border-border/80 bg-card/60 p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      Autentikasi Dua Faktor (2FA)
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Wajibkan kode 6-digit dari Google Authenticator saat login.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  Status: <strong className={twoFactorEnabled ? "text-emerald-400" : "text-amber-400"}>
                    {twoFactorEnabled ? "AKTIF" : "TIDAK AKTIF"}
                  </strong>
                </span>
                <TwoFactorSetupModal
                  isEnabled={twoFactorEnabled}
                  onEnable2Fa={enable2Fa}
                  onDisable2Fa={disable2Fa}
                />
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: Sessions */}
        <TabsContent value="sessions" className="mt-4">
          <UserSessionManager
            sessions={sessions}
            onRevokeSession={revokeSession}
            onLogoutAllOther={logoutAllOtherSessions}
          />
        </TabsContent>

        {/* Tab 3: Addresses */}
        <TabsContent value="addresses" className="mt-4">
          <AddressManager
            addresses={addresses}
            onCreateAddress={createAddress}
            onDeleteAddress={deleteAddress}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
