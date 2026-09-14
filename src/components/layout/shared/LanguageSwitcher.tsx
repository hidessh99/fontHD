"use client";

import React, { useState, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { LOCALES, LOCALE_LABELS, Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="size-8 rounded-xl p-0 text-xs font-bold font-mono"
        disabled
      >
        EN
      </Button>
    );
  }

  const currentInfo = LOCALE_LABELS[locale] || LOCALE_LABELS.en;

  const handleSelect = (loc: Locale) => {
    setLocale(loc);
    setOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        className="h-8 px-2.5 rounded-xl border border-border/60 hover:bg-accent text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer"
        aria-label="Switch language"
      >
        <Globe className="size-3.5 text-muted-foreground" />
        <span>{currentInfo.code}</span>
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 rounded-2xl border border-border bg-popover p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase px-2.5 py-1">
            Select Language
          </div>
          {LOCALES.map((loc) => {
            const isSelected = locale === loc;
            const info = LOCALE_LABELS[loc];
            return (
              <button
                key={loc}
                type="button"
                onClick={() => handleSelect(loc)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                <span>{info.label}</span>
                {isSelected && <Check className="size-3 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
