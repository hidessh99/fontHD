"use client";

import React from "react";
import { HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function LandingFaq() {
  const { t } = useI18n();

  const faqs = [
    {
      q: t("landing.faq.q1"),
      a: t("landing.faq.a1"),
    },
    {
      q: t("landing.faq.q2"),
      a: t("landing.faq.a2"),
    },
    {
      q: t("landing.faq.q3"),
      a: t("landing.faq.a3"),
    },
    {
      q: t("landing.faq.q4"),
      a: t("landing.faq.a4"),
    },
    {
      q: t("landing.faq.q5"),
      a: t("landing.faq.a5"),
    },
  ];

  return (
    <section
      id="faq"
      className="py-16 lg:py-24 bg-card/40 border-t border-border/50"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-400 mb-3.5 uppercase tracking-wider font-mono">
            <HelpCircle className="h-3.5 w-3.5" /> {t("landing.faq.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            {t("landing.faq.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 font-normal">
            {t("landing.faq.subtitle")}
          </p>
        </div>

        <Accordion defaultValue={["faq-0"]} className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="rounded-2xl border border-border/70 bg-card/60 px-5 sm:px-6 py-1 data-[state=open]:border-primary/50 data-[state=open]:bg-card data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-all not-last:border-b-border/70"
            >
              <AccordionTrigger className="text-base sm:text-lg font-black text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed font-normal pt-2 pb-4 border-t border-border/40">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
