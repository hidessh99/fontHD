"use client";

import React, { createContext, useContext, useCallback } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Locale, DEFAULT_LOCALE } from "./config";

import idCommon from "@/locales/id/common.json";
import idNav from "@/locales/id/nav.json";
import idDashboard from "@/locales/id/dashboard.json";
import idAuth from "@/locales/id/auth.json";
import idVpn from "@/locales/id/vpn.json";
import idSubscription from "@/locales/id/subscription.json";
import idDns from "@/locales/id/dns.json";
import idAi from "@/locales/id/ai.json";
import idKubernetes from "@/locales/id/kubernetes.json";
import idMonitor from "@/locales/id/monitor.json";
import idSupport from "@/locales/id/support.json";
import idContent from "@/locales/id/content.json";
import idFinance from "@/locales/id/finance.json";
import idIam from "@/locales/id/iam.json";
import idNotification from "@/locales/id/notification.json";
import idSeller from "@/locales/id/seller.json";
import idLanding from "@/locales/id/landing.json";
import idLegal from "@/locales/id/legal.json";
import idAbout from "@/locales/id/about.json";
import idContact from "@/locales/id/contact.json";
import idHome from "@/locales/id/home.json";

import enCommon from "@/locales/en/common.json";
import enNav from "@/locales/en/nav.json";
import enDashboard from "@/locales/en/dashboard.json";
import enAuth from "@/locales/en/auth.json";
import enVpn from "@/locales/en/vpn.json";
import enSubscription from "@/locales/en/subscription.json";
import enDns from "@/locales/en/dns.json";
import enAi from "@/locales/en/ai.json";
import enKubernetes from "@/locales/en/kubernetes.json";
import enMonitor from "@/locales/en/monitor.json";
import enSupport from "@/locales/en/support.json";
import enContent from "@/locales/en/content.json";
import enFinance from "@/locales/en/finance.json";
import enIam from "@/locales/en/iam.json";
import enNotification from "@/locales/en/notification.json";
import enSeller from "@/locales/en/seller.json";
import enLanding from "@/locales/en/landing.json";
import enLegal from "@/locales/en/legal.json";
import enAbout from "@/locales/en/about.json";
import enContact from "@/locales/en/contact.json";
import enHome from "@/locales/en/home.json";

const dictionaries: Record<Locale, Record<string, unknown>> = {
  id: {
    common: idCommon,
    nav: idNav,
    dashboard: idDashboard,
    auth: idAuth,
    vpn: idVpn,
    subscription: idSubscription,
    dns: idDns,
    ai: idAi,
    kubernetes: idKubernetes,
    monitor: idMonitor,
    support: idSupport,
    content: idContent,
    finance: idFinance,
    iam: idIam,
    notification: idNotification,
    seller: idSeller,
    landing: idLanding,
    legal: idLegal,
    about: idAbout,
    contact: idContact,
    home: idHome,
  },
  en: {
    common: enCommon,
    nav: enNav,
    dashboard: enDashboard,
    auth: enAuth,
    vpn: enVpn,
    subscription: enSubscription,
    dns: enDns,
    ai: enAi,
    kubernetes: enKubernetes,
    monitor: enMonitor,
    support: enSupport,
    content: enContent,
    finance: enFinance,
    iam: enIam,
    notification: enNotification,
    seller: enSeller,
    landing: enLanding,
    legal: enLegal,
    about: enAbout,
    contact: enContact,
    home: enHome,
  },
};

interface I18nStoreState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useI18nStore = create<I18nStoreState>()(
  persist(
    (set) => ({
      locale: DEFAULT_LOCALE,
      setLocale: (locale: Locale) => set({ locale }),
    }),
    {
      name: "govpn_locale",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function resolveKey(dict: Record<string, unknown>, parts: string[]): string | undefined {
  const [namespace, ...rest] = parts;
  const nsObj = dict[namespace] as Record<string, unknown> | undefined;
  if (!nsObj) return undefined;

  let value: unknown = nsObj;
  for (const p of rest) {
    if (value && typeof value === "object" && p in value) {
      value = (value as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }

  return typeof value === "string" ? value : undefined;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { locale, setLocale } = useI18nStore();

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const parts = key.split(".");
      if (parts.length < 2) return key;

      const activeDict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
      const defaultDict = dictionaries[DEFAULT_LOCALE];

      // 1. Try active dictionary
      let rawText = resolveKey(activeDict, parts);

      // 2. Fallback to default dictionary (en) if missing in active
      if (rawText === undefined && activeDict !== defaultDict) {
        rawText = resolveKey(defaultDict, parts);
      }

      // 3. Fallback to key itself
      if (rawText === undefined) {
        return key;
      }

      // 4. Interpolate parameters if provided
      if (params) {
        let interpolated = rawText;
        for (const [k, v] of Object.entries(params)) {
          interpolated = interpolated.replace(
            new RegExp(`\\{\\{?${k}\\}\\}?`, "g"),
            String(v),
          );
        }
        return interpolated;
      }

      return rawText;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (key: string, params?: Record<string, string | number>) => {
        const parts = key.split(".");
        if (parts.length < 2) return key;
        const defaultDict = dictionaries[DEFAULT_LOCALE];
        const rawText = resolveKey(defaultDict, parts);
        if (rawText === undefined) return key;
        if (params) {
          let interpolated = rawText;
          for (const [k, v] of Object.entries(params)) {
            interpolated = interpolated.replace(
              new RegExp(`\\{\\{?${k}\\}\\}?`, "g"),
              String(v),
            );
          }
          return interpolated;
        }
        return rawText;
      },
    };
  }
  return ctx;
}
