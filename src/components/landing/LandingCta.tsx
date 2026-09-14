"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";

export function LandingCta() {
  const { t } = useI18n();

  return (
    <section className="container mx-auto px-4 sm:px-6 py-16 lg:py-24">
      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
        {/* Background glow orbs */}
        <div className="absolute top-0 right-0 h-96 w-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-96 w-96 bg-black/25 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold text-white mb-6 border border-white/20 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" /> {t("landing.cta.badge")}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-tight">
            {t("landing.cta.title")}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg mb-8 text-blue-100 max-w-2xl mx-auto font-normal leading-relaxed opacity-90">
            {t("landing.cta.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-13 sm:h-14 w-full sm:w-auto px-8 rounded-2xl bg-white text-blue-700 hover:bg-slate-100 font-bold text-base shadow-xl shadow-black/10 active:scale-95 transition-all"
              asChild
            >
              <Link href="/register">
                {t("landing.cta.primaryBtn")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-13 sm:h-14 w-full sm:w-auto px-8 rounded-2xl text-white border-white/30 hover:bg-white/10 font-bold text-base bg-transparent active:scale-95 transition-all"
              asChild
            >
              <Link href="/login">{t("landing.cta.secondaryBtn")}</Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-blue-100/80 font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            {t("landing.cta.note")}
          </div>
        </div>
      </div>
    </section>
  );
}
