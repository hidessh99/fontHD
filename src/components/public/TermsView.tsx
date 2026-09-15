"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { CopyButton } from "@/components/shared/CopyButton";
import {
  Scale,
  AlertTriangle,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Server,
  Zap,
  CreditCard,
  Building2,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Clock,
} from "lucide-react";

export function TermsView() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>("pasal-1");

  const sections = [
    {
      id: "pasal-1",
      title: t("legal.termsSec1Nav"),
      num: 1,
    },
    {
      id: "pasal-2",
      title: t("legal.termsSec2Nav"),
      num: 2,
    },
    {
      id: "pasal-3",
      title: t("legal.termsSec3Nav"),
      num: 3,
    },
    {
      id: "pasal-4",
      title: t("legal.termsSec4Nav"),
      num: 4,
    },
    {
      id: "pasal-5",
      title: t("legal.termsSec5Nav"),
      num: 5,
    },
    {
      id: "pasal-6",
      title: t("legal.termsSec6Nav"),
      num: 6,
    },
    {
      id: "pasal-7",
      title: t("legal.termsSec7Nav"),
      num: 7,
    },
    {
      id: "pasal-8",
      title: t("legal.termsSec8Nav"),
      num: 8,
    },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
      {/* Header */}
      <div className="max-w-3xl space-y-4 border-b border-border/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono bg-primary/10 border border-primary/20 text-primary">
          <Scale className="size-3.5" />
          <span>{t("legal.termsBadge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          {t("legal.termsTitle")}
        </h1>
        <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
          {t("legal.termsSubtitle")}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" />
            {t("legal.termsLastUpdated")}
          </span>
          <span>•</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t("legal.termsVersion")}
          </span>
        </div>
      </div>

      {/* Official Identity Card */}
      <div className="my-8 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Building2 className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {t("legal.companyInfoTitle")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t("legal.termsCompanySub")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
            <ShieldCheck className="size-3.5" />
            <span>{t("legal.termsVerifiedBadge")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground">
          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <FileText className="size-3.5 text-primary" />
              <span>{t("legal.operatorLabel")}</span>
            </div>
            <div className="font-mono text-foreground font-medium">
              {t("legal.companyName")}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {t("legal.termsOperatorDesc")}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Mail className="size-3.5 text-primary" />
              <span>{t("legal.emailLabel")}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="mailto:support@hidessh.com"
                className="text-primary font-mono hover:underline truncate"
              >
                support@hidessh.com
              </a>
              <CopyButton text="support@hidessh.com" size="sm" className="h-6 px-2 text-[10px]" />
            </div>
            <div className="text-[11px] text-muted-foreground">
              {t("legal.termsEmailAlt")}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Phone className="size-3.5 text-primary" />
              <span>{t("legal.phoneLabel")}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-foreground">
              <span>0877-1113-01818</span>
              <CopyButton text="0877111301818" size="sm" className="h-6 px-2 text-[10px]" />
            </div>
            <div className="text-[11px] text-muted-foreground">
              {t("legal.termsPhoneDesc")}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2">
            <MapPin className="size-4 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>
              {t("legal.companyAddress")}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <CopyButton
              text="Jl. Kampung Baris No.391, Karangturi, Kec. Semarang Tim., Kota Semarang, Jawa Tengah 50124"
              label={t("legal.copyAddress")}
              size="sm"
              className="h-7 text-xs"
            />
            <a
              href="https://maps.google.com/?q=Jl.+Kampung+Baris+No.391,+Karangturi,+Kec.+Semarang+Tim.,+Kota+Semarang,+Jawa+Tengah+50124"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
            >
              <span>Google Maps</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sticky Sidebar on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Table of Contents Sticky Sidebar */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="p-5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              <span>{t("legal.quickNavTitle")}</span>
            </h3>
            <nav className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  type="button"
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    activeSection === s.id
                      ? "bg-primary/10 text-primary font-bold border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-subtle"
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[10px] size-5 rounded-md bg-muted/60 flex items-center justify-center shrink-0">
                      {s.num}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </span>
                  <ChevronRight className="size-3.5 shrink-0 opacity-60" />
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-5 border-t border-border/50 space-y-3">
              <div className="text-xs text-muted-foreground leading-relaxed">
                {t("legal.termsConsultationPrompt")}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <span>{t("legal.termsConsultationCta")}</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Legal Articles Content */}
        <div className="lg:col-span-8 space-y-8 text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed">
          {/* Article 1 */}
          <section
            id="pasal-1"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                01
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.termsSec1Title")}
              </h2>
            </div>
            <p>
              {t("legal.termsSec1Body1")}
            </p>
            <p>
              {t("legal.termsSec1Body2")}
            </p>
          </section>

          {/* Article 2: AUP */}
          <section
            id="pasal-2"
            className="p-6 sm:p-8 rounded-2xl border border-rose-500/30 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                02
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.termsSec2Title")}
              </h2>
            </div>
            <p>
              {t("legal.termsSec2Body")}
            </p>
            <div className="p-4 sm:p-5 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-rose-500 font-bold">
                <AlertTriangle className="size-4 shrink-0" />
                <span>
                  {t("legal.termsSec2BoxTitle")}
                </span>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li>
                  {t("legal.termsSec2Point1")}
                </li>
                <li>
                  {t("legal.termsSec2Point2")}
                </li>
                <li>
                  {t("legal.termsSec2Point3")}
                </li>
                <li>
                  {t("legal.termsSec2Point4")}
                </li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground/80">
              {t("legal.termsSec2Footer")}
            </p>
          </section>

          {/* Article 3: Protocols & License */}
          <section
            id="pasal-3"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                03
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.termsSec3Title")}
              </h2>
            </div>
            <p>
              {t("legal.termsSec3Body1")}
            </p>
            <p>
              {t("legal.termsSec3Body2")}
            </p>
          </section>

          {/* Article 4: SLA */}
          <section
            id="pasal-4"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                04
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.termsSec4Title")}
              </h2>
            </div>
            <p>
              {t("legal.termsSec4Body")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-border/60 bg-surface-subtle space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Server className="size-3.5 text-primary" />
                  <span>{t("legal.termsSec4MaintenanceTitle")}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("legal.termsSec4MaintenanceDesc")}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border/60 bg-surface-subtle space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Zap className="size-3.5 text-emerald-400" />
                  <span>{t("legal.termsSec4CompensationTitle")}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("legal.termsSec4CompensationDesc")}
                </p>
              </div>
            </div>
          </section>

          {/* Article 5: Accounts & Multi-device */}
          <section
            id="pasal-5"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                05
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.termsSec5Title")}
              </h2>
            </div>
            <p>
              {t("legal.termsSec5Body1")}
            </p>
            <p>
              {t("legal.termsSec5Body2")}
            </p>
          </section>

          {/* Article 6: Payments & Refund */}
          <section
            id="pasal-6"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                06
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.termsSec6Title")}
              </h2>
            </div>
            <p>
              {t("legal.termsSec6Body")}
            </p>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs space-y-2">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <CreditCard className="size-4 text-primary" />
                <span>{t("legal.termsSec6GuaranteeTitle")}</span>
              </div>
              <p className="text-muted-foreground">
                {t("legal.termsSec6GuaranteeDesc")}
              </p>
            </div>
          </section>

          {/* Article 7: Limitation of Liability */}
          <section
            id="pasal-7"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                07
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.termsSec7Title")}
              </h2>
            </div>
            <p>
              {t("legal.termsSec7Body")}
            </p>
          </section>

          {/* Article 8: Governing Law */}
          <section
            id="pasal-8"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                08
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.termsSec8Title")}
              </h2>
            </div>
            <p>
              {t("legal.termsSec8Body")}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
