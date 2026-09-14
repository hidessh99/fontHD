import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const idrFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const idrDateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const idrDateShortFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const idrNumberFormatter = new Intl.NumberFormat("id-ID");

/**
 * Format currency to IDR or USD
 */
export function formatCurrency(
  amount: number,
  currency: "IDR" | "USD" = "IDR",
): string {
  if (currency === "IDR") {
    return idrFormatter.format(amount);
  }
  return usdFormatter.format(amount);
}

export function formatRupiah(amount: number): string {
  return idrFormatter.format(amount);
}

export function formatNumber(value: number): string {
  return idrNumberFormatter.format(value);
}

/**
 * Format date & time
 */
export function formatDateTime(dateInput: string | Date | number): string {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "-";
  return idrDateTimeFormatter.format(date);
}

export function formatDateShort(dateInput: string | Date | number): string {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "-";
  return idrDateShortFormatter.format(date);
}

/**
 * Format Network Bandwidth (Bytes to KB, MB, GB, TB)
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Format Ping Latency (ms) with visual severity class
 */
export function getLatencyMeta(latencyMs: number): {
  label: string;
  colorClass: string;
  dotClass: string;
} {
  if (latencyMs <= 0) {
    return {
      label: "Offline",
      colorClass: "text-rose-500",
      dotClass: "bg-rose-500",
    };
  }
  if (latencyMs <= 100) {
    return {
      label: `${latencyMs} ms`,
      colorClass: "text-emerald-500",
      dotClass: "bg-emerald-500",
    };
  }
  if (latencyMs <= 250) {
    return {
      label: `${latencyMs} ms`,
      colorClass: "text-amber-500",
      dotClass: "bg-amber-500",
    };
  }
  return {
    label: `${latencyMs} ms`,
    colorClass: "text-rose-500",
    dotClass: "bg-rose-500",
  };
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
