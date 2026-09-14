"use client";

import React, { createContext, useContext, useCallback } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Locale, DEFAULT_LOCALE } from "./config";

import idCommon from "@/locales/id/common.json";
import idAuth from "@/locales/id/auth.json";
import idVpn from "@/locales/id/vpn.json";
import idLanding from "@/locales/id/landing.json";
import idLegal from "@/locales/id/legal.json";
import idAbout from "@/locales/id/about.json";
import idContact from "@/locales/id/contact.json";

import enCommon from "@/locales/en/common.json";
import enAuth from "@/locales/en/auth.json";
import enVpn from "@/locales/en/vpn.json";
import enLanding from "@/locales/en/landing.json";
import enLegal from "@/locales/en/legal.json";
import enAbout from "@/locales/en/about.json";
import enContact from "@/locales/en/contact.json";

const dictionaries: Record<Locale, Record<string, unknown>> = {
  id: {
    common: idCommon,
    auth: idAuth,
    vpn: idVpn,
    landing: idLanding,
    legal: idLegal,
    about: idAbout,
    contact: idContact,
  },
  en: {
    common: enCommon,
    auth: enAuth,
    vpn: enVpn,
    landing: enLanding,
    legal: enLegal,
    about: enAbout,
    contact: enContact,
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

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { locale, setLocale } = useI18nStore();

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const parts = key.split(".");
      if (parts.length < 2) return key;

      const [namespace, ...rest] = parts;
      const dict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
      const nsObj = dict[namespace] as Record<string, unknown> | undefined;

      if (!nsObj) return key;

      let value: unknown = nsObj;
      for (const p of rest) {
        if (value && typeof value === "object" && p in value) {
          value = (value as Record<string, unknown>)[p];
        } else {
          return key;
        }
      }

      if (typeof value !== "string") return key;

      if (params) {
        let interpolated = value;
        for (const [k, v] of Object.entries(params)) {
          interpolated = interpolated.replace(
            new RegExp(`{${k}}`, "g"),
            String(v),
          );
        }
        return interpolated;
      }

      return value;
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
      t: (key: string) => key,
    };
  }
  return ctx;
}
