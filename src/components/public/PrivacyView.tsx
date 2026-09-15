"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { CopyButton } from "@/components/shared/CopyButton";
import {
  ShieldCheck,
  Lock,
  HardDrive,
  FileText,
  Mail,
  MapPin,
  Phone,
  Building2,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Clock,
  KeyRound,
} from "lucide-react";

export function PrivacyView() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>("section-1");

  const sections = [
    {
      id: "section-1",
      title: t("legal.privacySec1Nav"),
      num: 1,
    },
    {
      id: "section-2",
      title: t("legal.privacySec2Nav"),
      num: 2,
    },
    {
      id: "section-3",
      title: t("legal.privacySec3Nav"),
      num: 3,
    },
    {
      id: "section-4",
      title: t("legal.privacySec4Nav"),
      num: 4,
    },
    {
      id: "section-5",
      title: t("legal.privacySec5Nav"),
      num: 5,
    },
    {
      id: "section-6",
      title: t("legal.privacySec6Nav"),
      num: 6,
    },
    {
      id: "section-7",
      title: t("legal.privacySec7Nav"),
      num: 7,
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <ShieldCheck className="size-3.5" />
          <span>{t("legal.privacyBadge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          {t("legal.privacyTitle")}
        </h1>
        <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
          {t("legal.privacySubtitle")}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-emerald-400" />
            {t("legal.privacyLastUpdated")}
          </span>
          <span>•</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t("legal.zeroLogsGuarantee")}
          </span>
        </div>
      </div>

      {/* Official Identity Card */}
      <div className="my-8 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Building2 className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {t("legal.companyInfoTitle")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t("legal.companySub")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
            <ShieldCheck className="size-3.5" />
            <span>{t("legal.complianceBadge")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground">
          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <FileText className="size-3.5 text-emerald-400" />
              <span>{t("legal.operatorLabel")}</span>
            </div>
            <div className="font-mono text-foreground font-medium">
              {t("legal.companyName")}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {t("legal.operatorDesc")}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Mail className="size-3.5 text-emerald-400" />
              <span>{t("legal.emailLabel")}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="mailto:support@hidessh.com"
                className="text-emerald-400 font-mono hover:underline truncate"
              >
                support@hidessh.com
              </a>
              <CopyButton text="support@hidessh.com" size="sm" className="h-6 px-2 text-[10px]" />
            </div>
            <div className="text-[11px] text-muted-foreground">
              {t("legal.dpoDesk")}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Phone className="size-3.5 text-emerald-400" />
              <span>{t("legal.phoneLabel")}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-foreground">
              <span>0877-1113-01818</span>
              <CopyButton text="0877111301818" size="sm" className="h-6 px-2 text-[10px]" />
            </div>
            <div className="text-[11px] text-muted-foreground">
              {t("legal.phoneDesc")}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2">
            <MapPin className="size-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
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
              className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline font-medium"
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
              <FileText className="size-4 text-emerald-400" />
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
                      ? "bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20"
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
                {t("legal.privacyErasePrompt")}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
              >
                <span>{t("legal.privacyEraseCta")}</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Privacy Articles Content */}
        <div className="lg:col-span-8 space-y-8 text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed">
          {/* Section 1 */}
          <section
            id="section-1"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                01
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.privacySec1Title")}
              </h2>
            </div>
            <p>
              {t("legal.privacySec1Body")}
            </p>
          </section>

          {/* Section 2: Ephemeral RAM */}
          <section
            id="section-2"
            className="p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                02
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.privacySec2Title")}
              </h2>
            </div>
            <p>
              {t("legal.privacySec2Body")}
            </p>
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs space-y-3">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <HardDrive className="size-4 text-emerald-400 shrink-0" />
                <span>
                  {t("legal.privacySec2BoxTitle")}
                </span>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>
                  <strong>{t("legal.privacySec2Point1Title")}</strong>{" "}
                  {t("legal.privacySec2Point1Desc")}
                </li>
                <li>
                  <strong>{t("legal.privacySec2Point2Title")}</strong>{" "}
                  {t("legal.privacySec2Point2Desc")}
                </li>
                <li>
                  <strong>{t("legal.privacySec2Point3Title")}</strong>{" "}
                  {t("legal.privacySec2Point3Desc")}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Minimal Data Collected */}
          <section
            id="section-3"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                03
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.privacySec3Title")}
              </h2>
            </div>
            <p>
              {t("legal.privacySec3Body")}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>{t("legal.privacySec3Point1Title")}</strong>{" "}
                {t("legal.privacySec3Point1Desc")}
              </li>
              <li>
                <strong>{t("legal.privacySec3Point2Title")}</strong>{" "}
                {t("legal.privacySec3Point2Desc")}
              </li>
              <li>
                <strong>{t("legal.privacySec3Point3Title")}</strong>{" "}
                {t("legal.privacySec3Point3Desc")}
              </li>
            </ul>
          </section>

          {/* Section 4: Cryptography */}
          <section
            id="section-4"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                04
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.privacySec4Title")}
              </h2>
            </div>
            <p>
              {t("legal.privacySec4Body")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-border/60 bg-surface-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-bold text-xs">
                  <Lock className="size-4 text-emerald-400" />
                  <span>{t("legal.privacySec4Item1Title")}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("legal.privacySec4Item1Desc")}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/60 bg-surface-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-bold text-xs">
                  <KeyRound className="size-4 text-emerald-400" />
                  <span>{t("legal.privacySec4Item2Title")}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("legal.privacySec4Item2Desc")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Data Subject Rights */}
          <section
            id="section-5"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                05
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.privacySec5Title")}
              </h2>
            </div>
            <p>
              {t("legal.privacySec5Body")}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>{t("legal.privacySec5Point1Title")}</strong>{" "}
                {t("legal.privacySec5Point1Desc")}
              </li>
              <li>
                <strong>{t("legal.privacySec5Point2Title")}</strong>{" "}
                {t("legal.privacySec5Point2Desc")}
              </li>
              <li>
                <strong>{t("legal.privacySec5Point3Title")}</strong>{" "}
                {t("legal.privacySec5Point3Desc")}
              </li>
            </ul>
          </section>

          {/* Section 6: Cookies */}
          <section
            id="section-6"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                06
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.privacySec6Title")}
              </h2>
            </div>
            <p>
              {t("legal.privacySec6Body1")}
            </p>
            <p>
              {t("legal.privacySec6Body2")}
            </p>
          </section>

          {/* Section 7: DPO Desk */}
          <section
            id="section-7"
            className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono font-bold shrink-0">
                07
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground">
                {t("legal.privacySec7Title")}
              </h2>
            </div>
            <p>{t("legal.privacySec7Desc")}</p>
            <div className="p-5 rounded-xl bg-surface-subtle border border-border/60 text-xs space-y-2">
              <div>
                <strong>{t("legal.privacySec7DpoOfficer")}</strong> Hide Group / Hide Digital Security
              </div>
              <div>
                <strong>{t("legal.privacySec7Email")}</strong>{" "}
                <a href="mailto:support@hidessh.com" className="text-emerald-400 font-mono hover:underline">
                  support@hidessh.com
                </a>{" "}
                |{" "}
                <a href="mailto:dmaskurniawan56@gmail.com" className="text-emerald-400 font-mono hover:underline">
                  dmaskurniawan56@gmail.com
                </a>
              </div>
              <div>
                <strong>{t("legal.privacySec7Hotline")}</strong> 0877111301818
              </div>
              <div>
                <strong>{t("legal.privacySec7Address")}</strong> Jl. Kampung Baris No.391, Karangturi, Kec. Semarang Tim., Kota Semarang, Jawa Tengah 50124
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
