import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().optional().default("GoVPN"),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .optional()
    .transform((val) =>
      val && val.trim() !== "" ? val : "https://hidessh.com",
    ),
  NEXT_PUBLIC_API_BASE_URL: z
    .string()
    .optional()
    .transform((val) =>
      val && val.trim() !== "" ? val : "http://localhost:8080",
    ),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
    .string()
    .optional()
    .default("0x4AAAAAADOgaNLRGt1f6A6-"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
});
