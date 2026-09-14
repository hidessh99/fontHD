import { z } from "zod";

const envSchema = z
  .object({
    NEXT_PUBLIC_APP_NAME: z.string().optional().default("GoVPN Enterprise"),
    NEXT_PUBLIC_APP_URL: z
      .string()
      .optional()
      .transform((val) =>
        val && val.trim() !== "" ? val : "https://hidessh.com",
      ),
    NEXT_PUBLIC_DEFAULT_LOCALE: z.string().optional().default("en"),
    NEXT_PUBLIC_API_BASE_URL: z
      .string()
      .optional()
      .transform((val) =>
        val && val.trim() !== "" ? val : "http://localhost:8080",
      ),

    // Domain Microservices Endpoints
    NEXT_PUBLIC_VPN_API_URL: z.string().optional(),
    NEXT_PUBLIC_IAM_API_URL: z.string().optional(),
    NEXT_PUBLIC_FINANCE_API_URL: z.string().optional(),
    NEXT_PUBLIC_DNS_API_URL: z.string().optional(),
    NEXT_PUBLIC_AI_API_URL: z.string().optional(),
    NEXT_PUBLIC_K8S_API_URL: z.string().optional(),
    NEXT_PUBLIC_MONITOR_API_URL: z.string().optional(),
    NEXT_PUBLIC_NOTIFICATION_API_URL: z.string().optional(),
    NEXT_PUBLIC_SUBSCRIPTION_API_URL: z.string().optional(),
    NEXT_PUBLIC_SUPPORT_API_URL: z.string().optional(),
    NEXT_PUBLIC_CONTENT_API_URL: z.string().optional(),

    // Real-Time WebSocket Gateway
    NEXT_PUBLIC_WS_GATEWAY_URL: z.string().optional(),

    // Cloudflare Turnstile CAPTCHA Protection
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
      .string()
      .optional()
      .default("0x4AAAAAADOgaNLRGt1f6A6-"),
  })
  .transform((data) => {
    const baseApi = data.NEXT_PUBLIC_API_BASE_URL.replace(/\/+$/, "");
    return {
      ...data,
      NEXT_PUBLIC_VPN_API_URL: data.NEXT_PUBLIC_VPN_API_URL || baseApi,
      NEXT_PUBLIC_IAM_API_URL: data.NEXT_PUBLIC_IAM_API_URL || baseApi,
      NEXT_PUBLIC_FINANCE_API_URL: data.NEXT_PUBLIC_FINANCE_API_URL || baseApi,
      NEXT_PUBLIC_DNS_API_URL: data.NEXT_PUBLIC_DNS_API_URL || baseApi,
      NEXT_PUBLIC_AI_API_URL: data.NEXT_PUBLIC_AI_API_URL || baseApi,
      NEXT_PUBLIC_K8S_API_URL: data.NEXT_PUBLIC_K8S_API_URL || baseApi,
      NEXT_PUBLIC_MONITOR_API_URL: data.NEXT_PUBLIC_MONITOR_API_URL || baseApi,
      NEXT_PUBLIC_NOTIFICATION_API_URL:
        data.NEXT_PUBLIC_NOTIFICATION_API_URL || baseApi,
      NEXT_PUBLIC_SUBSCRIPTION_API_URL:
        data.NEXT_PUBLIC_SUBSCRIPTION_API_URL || baseApi,
      NEXT_PUBLIC_SUPPORT_API_URL: data.NEXT_PUBLIC_SUPPORT_API_URL || baseApi,
      NEXT_PUBLIC_CONTENT_API_URL: data.NEXT_PUBLIC_CONTENT_API_URL || baseApi,
      NEXT_PUBLIC_WS_GATEWAY_URL:
        data.NEXT_PUBLIC_WS_GATEWAY_URL ||
        baseApi.replace(/^http/i, "ws") + "/ws",
    };
  });

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_VPN_API_URL: process.env.NEXT_PUBLIC_VPN_API_URL,
  NEXT_PUBLIC_IAM_API_URL: process.env.NEXT_PUBLIC_IAM_API_URL,
  NEXT_PUBLIC_FINANCE_API_URL: process.env.NEXT_PUBLIC_FINANCE_API_URL,
  NEXT_PUBLIC_DNS_API_URL: process.env.NEXT_PUBLIC_DNS_API_URL,
  NEXT_PUBLIC_AI_API_URL: process.env.NEXT_PUBLIC_AI_API_URL,
  NEXT_PUBLIC_K8S_API_URL: process.env.NEXT_PUBLIC_K8S_API_URL,
  NEXT_PUBLIC_MONITOR_API_URL: process.env.NEXT_PUBLIC_MONITOR_API_URL,
  NEXT_PUBLIC_NOTIFICATION_API_URL:
    process.env.NEXT_PUBLIC_NOTIFICATION_API_URL,
  NEXT_PUBLIC_SUBSCRIPTION_API_URL:
    process.env.NEXT_PUBLIC_SUBSCRIPTION_API_URL,
  NEXT_PUBLIC_SUPPORT_API_URL: process.env.NEXT_PUBLIC_SUPPORT_API_URL,
  NEXT_PUBLIC_CONTENT_API_URL: process.env.NEXT_PUBLIC_CONTENT_API_URL,
  NEXT_PUBLIC_WS_GATEWAY_URL: process.env.NEXT_PUBLIC_WS_GATEWAY_URL,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
});
