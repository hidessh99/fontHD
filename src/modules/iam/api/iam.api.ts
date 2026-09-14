import { apiGet, apiPost } from "@/lib/api/http-client";
import {
  LoginRequest,
  RegisterRequest,
  AuthSession,
  UserProfile,
  ChangePasswordRequest,
} from "../types/iam.types";

export async function loginApi(input: LoginRequest): Promise<AuthSession> {
  const res = await apiPost<AuthSession>("/api/auth/login", input);
  if (!res.payload && res.data) {
    // Envelope fallback
    return res.data as AuthSession;
  }
  return res.payload as AuthSession;
}

export async function registerApi(input: RegisterRequest): Promise<AuthSession> {
  const res = await apiPost<AuthSession>("/api/auth/register", input);
  if (!res.payload && res.data) {
    return res.data as AuthSession;
  }
  return res.payload as AuthSession;
}

export async function logoutApi(): Promise<void> {
  await apiPost("/api/auth/logout", {}).catch(() => {});
}

export async function fetchProfileApi(): Promise<UserProfile> {
  const res = await apiGet<UserProfile>("/api/users/profile");
  if (!res.payload && res.data) {
    return res.data as UserProfile;
  }
  return res.payload as UserProfile;
}

export async function changePasswordApi(
  input: ChangePasswordRequest,
): Promise<void> {
  await apiPost("/api/users/change-password", input);
}
