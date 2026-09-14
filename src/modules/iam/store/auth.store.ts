// ==============================================================================
// GoVPN IAM Global Auth Store (Zustand + Edge Cookies)
// Part of Pola C: store/auth.store.ts
// Handles Next.js 16 Edge Middleware Cookie Synchronization
// ==============================================================================

"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserProfile, AuthSession } from "../types/iam.types";
import { LoginRequest, RegisterRequest } from "../types/guest.types";
import { UpdateProfileDto } from "../types/user.types";
import { iamGuestApi } from "../api/guest.api";
import { iamUserApi } from "../api/user.api";
import { setCookie, clearAllAuthStorage } from "@/lib/storage/cookies";
import { toast } from "sonner";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (input: LoginRequest) => Promise<boolean>;
  register: (input: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  loadProfile: () => Promise<void>;
  updateUserLocal: (updated: Partial<UserProfile>) => void;
  updateProfile: (
    id: string | number,
    dto: UpdateProfileDto,
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (input: LoginRequest) => {
        set({ isLoading: true });
        try {
          const res = await iamGuestApi.login(input);
          const session: AuthSession = (res.payload || res.data) as AuthSession;

          if (!session || !session.token) {
            throw new Error(
              String(res.message || "Gagal masuk: Kredensial tidak valid."),
            );
          }

          const token = session.token;
          const user = session.user;

          // Set cookies for Edge Middleware proxy.ts & AdminRouteGuard
          setCookie("hide-jwt", token);
          setCookie("govpn_session_token", token);
          setCookie("govpn_user_role", user.role || "USER");

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success(`Selamat datang kembali, ${user.username}!`);
          return true;
        } catch (err: unknown) {
          set({ isLoading: false });
          const msg =
            err instanceof Error
              ? err.message
              : "Gagal masuk. Periksa kembali email/username dan kata sandi.";
          toast.error(msg);
          return false;
        }
      },

      register: async (input: RegisterRequest) => {
        set({ isLoading: true });
        try {
          const res = await iamGuestApi.register(input);
          const session: AuthSession = (res.payload || res.data) as AuthSession;

          if (!session || !session.token) {
            throw new Error(String(res.message || "Gagal membuat akun baru."));
          }

          const token = session.token;
          const user = session.user;

          setCookie("hide-jwt", token);
          setCookie("govpn_session_token", token);
          setCookie("govpn_user_role", user.role || "USER");

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success("Akun GoVPN berhasil dibuat!");
          return true;
        } catch (err: unknown) {
          set({ isLoading: false });
          const msg =
            err instanceof Error
              ? err.message
              : "Gagal mendaftar. Silakan coba lagi.";
          toast.error(msg);
          return false;
        }
      },

      logout: async () => {
        try {
          await iamUserApi.logout();
        } finally {
          clearAllAuthStorage();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      loadProfile: async () => {
        if (!get().token) return;
        try {
          const res = await iamUserApi.getProfile();
          const user = res.payload || res.data;
          if (user) {
            set({ user });
            setCookie("govpn_user_role", user.role || "USER");
          }
        } catch {
          // Token expired or invalid
        }
      },

      updateUserLocal: (updated: Partial<UserProfile>) => {
        const current = get().user;
        if (current) {
          set({ user: { ...current, ...updated } });
        }
      },

      updateProfile: async (id: string | number, dto: UpdateProfileDto) => {
        try {
          const res = await iamUserApi.updateProfile(id, dto);
          const updated = res.payload || res.data;
          if (updated) {
            set({ user: updated });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    {
      name: "govpn_auth_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
