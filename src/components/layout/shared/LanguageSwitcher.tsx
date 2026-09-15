"use client";

import React, { useState, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { LOCALES, LOCALE_LABELS, Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
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
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2.5 rounded-xl border border-border/60 hover:bg-accent text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer"
            aria-label="Switch language"
          >
            <Globe className="size-3.5 text-muted-foreground" />
            <span>{currentInfo.code}</span>
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-44 p-1.5 rounded-2xl">
        <DropdownMenuLabel className="text-[10px] font-mono font-bold text-muted-foreground uppercase px-2.5 py-1">
          Select Language
        </DropdownMenuLabel>
        {LOCALES.map((loc) => {
          const isSelected = locale === loc;
          const info = LOCALE_LABELS[loc];
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => handleSelect(loc)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                isSelected
                  ? "bg-primary/10 text-primary"
                  : "text-foreground"
              }`}
            >
              <span>{info.label}</span>
              {isSelected && <Check className="size-3 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
