"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserProfile, LoginRequest, RegisterRequest } from "../types/iam.types";
import { loginApi, registerApi, logoutApi, fetchProfileApi } from "../api/iam.api";
import { setCookie, clearAllAuthStorage } from "@/lib/storage/cookies";
import { toast } from "sonner";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (input: LoginRequest) => Promise<boolean>;
  register: (input: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  loadProfile: () => Promise<void>;
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
          const session = await loginApi(input);
          const token = session.token;
          const user = session.user;

          // Set cookies for Edge Middleware proxy.ts
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
          const msg = err instanceof Error ? err.message : "Gagal masuk. Periksa kembali kredensial Anda.";
          toast.error(msg);
          return false;
        }
      },

      register: async (input: RegisterRequest) => {
        set({ isLoading: true });
        try {
          const session = await registerApi(input);
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

          toast.success("Akun berhasil dibuat!");
          return true;
        } catch (err: unknown) {
          set({ isLoading: false });
          const msg = err instanceof Error ? err.message : "Gagal mendaftar. Silakan coba lagi.";
          toast.error(msg);
          return false;
        }
      },

      logout: async () => {
        try {
          await logoutApi();
        } finally {
          clearAllAuthStorage();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          window.location.href = "/login";
        }
      },

      loadProfile: async () => {
        if (!get().token) return;
        try {
          const user = await fetchProfileApi();
          set({ user });
          setCookie("govpn_user_role", user.role || "USER");
        } catch {
          // Token expired or invalid
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
