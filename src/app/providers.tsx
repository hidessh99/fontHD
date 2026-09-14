"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { I18nProvider } from "@/lib/i18n/context";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <I18nProvider>
        <TooltipProvider delay={200}>
          {children}
          <Toaster richColors closeButton position="top-right" />
        </TooltipProvider>
      </I18nProvider>
    </NextThemesProvider>
  );
}
