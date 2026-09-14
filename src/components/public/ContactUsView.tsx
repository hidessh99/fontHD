"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n/context";
import { CopyButton } from "@/components/shared/CopyButton";
import { toast } from "sonner";
import {
  MessageSquare,
  Phone,
  Send,
  Mail,
  MapPin,
  Clock,
  Building2,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Server,
  BookOpen,
  Sparkles,
  AlertCircle,
  Check,
  Loader2,
} from "lucide-react";

export function ContactUsView() {
  const { t, locale } = useI18n();
  const isId = locale === "id";

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    category: "technical",
    protocol: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const whatsappUrl =
    "https://wa.me/62877111301818?text=Halo%20Tim%20GoVPN,%20saya%20ingin%20konsultasi%20layanan%20cloud%20tunneling";
  const telegramUrl = "https://t.me/hidessh";
  const googleMapsUrl =
    "https://maps.google.com/?q=Jl.+Kampung+Baris+No.391,+Karangturi,+Kec.+Semarang+Tim.,+Kota+Semarang,+Jawa+Tengah+50124";

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formState.name.trim()) {
      errs.name = isId ? "Nama lengkap wajib diisi" : "Full name is required";
    }
    if (!formState.email.trim()) {
      errs.email = isId ? "Alamat email wajib diisi" : "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errs.email = isId ? "Format email tidak valid" : "Invalid email format";
    }
    if (!formState.message.trim()) {
      errs.message = isId ? "Pesan pertanyaan wajib diisi" : "Message cannot be empty";
    } else if (formState.message.trim().length < 10) {
      errs.message = isId ? "Pesan minimal 10 karakter" : "Message must be at least 10 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate high-reliability ticket dispatch
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success(t("contact.formSuccessTitle"));
  };

  const resetForm = () => {
    setFormState({
      name: "",
      email: "",
      category: "technical",
      protocol: "",
      message: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
      {/* 1. Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono bg-primary/10 border border-primary/20 text-primary">
          <MessageSquare className="size-3.5" />
          <span>{t("contact.badge")}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
          {t("contact.title")}
        </h1>
        <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
          {t("contact.subtitle")}
        </p>
      </div>

      {/* 2. Top 3 Direct Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp Card */}
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-5 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="size-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Phone className="size-5" />
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t("contact.badgeFastResponse")}
              </span>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground">
                {t("contact.cardDirectWhatsApp")}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("contact.cardDirectWhatsAppDesc")}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-base font-bold text-emerald-400">
                0877-1113-01818
              </span>
              <CopyButton text="0877111301818" size="sm" className="h-7 px-2 text-[10px]" />
            </div>
          </div>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block pt-2">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs gap-2">
              <Phone className="size-3.5" />
              <span>{t("contact.btnChatWhatsApp")}</span>
            </Button>
          </a>
        </div>

        {/* Telegram Card */}
        <div className="p-6 rounded-2xl border border-blue-500/30 bg-blue-500/5 space-y-5 shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="size-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <Send className="size-5" />
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Community & Desk
              </span>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground">
                {t("contact.cardTelegram")}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("contact.cardTelegramDesc")}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-base font-bold text-blue-400">
                @hidessh
              </span>
              <CopyButton text="@hidessh" size="sm" className="h-7 px-2 text-[10px]" />
            </div>
          </div>

          <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="block pt-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs gap-2">
              <Send className="size-3.5" />
              <span>{t("contact.btnChatTelegram")}</span>
            </Button>
          </a>
        </div>

        {/* Official Email Card */}
        <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-5 shadow-sm flex flex-col justify-between hover:border-border transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="size-11 rounded-xl bg-surface-subtle border border-border/60 text-primary flex items-center justify-center">
                <Mail className="size-5" />
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-surface-subtle text-muted-foreground border border-border/60">
                Official Desk
              </span>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground">
                {t("contact.cardEmail")}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("contact.cardEmailDesc")}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-sm font-bold text-foreground truncate max-w-42.5">
                support@hidessh.com
              </span>
              <CopyButton text="support@hidessh.com" size="sm" className="h-7 px-2 text-[10px]" />
            </div>
          </div>

          <a href="mailto:support@hidessh.com" className="block pt-2">
            <Button
              variant="outline"
              className="w-full border-border/80 hover:bg-surface-subtle font-bold rounded-xl text-xs gap-2"
            >
              <Mail className="size-3.5" />
              <span>{t("contact.btnSendEmail")}</span>
            </Button>
          </a>
        </div>
      </div>

      {/* 3. Operational HQ Card with Map Link */}
      <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Building2 className="size-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                {t("contact.cardOffice")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t("contact.cardOfficeHours")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-subtle border border-border/60 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <MapPin className="size-3.5 text-primary" />
              <span>{t("contact.btnOpenMaps")}</span>
              <ExternalLink className="size-3 opacity-60 ml-0.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted-foreground">
          <div className="space-y-1.5">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <MapPin className="size-3.5 text-primary" />
              <span>Alamat Kantor Pusat</span>
            </div>
            <div className="text-foreground text-sm leading-relaxed">
              Jl. Kampung Baris No.391, Karangturi, Kec. Semarang Tim., Kota Semarang, Jawa Tengah 50124
            </div>
            <div className="pt-1">
              <CopyButton
                text="Jl. Kampung Baris No.391, Karangturi, Kec. Semarang Tim., Kota Semarang, Jawa Tengah 50124"
                label={isId ? "Salin Alamat Lengkap" : "Copy Full Address"}
                size="sm"
                className="h-7 text-xs"
              />
            </div>
          </div>

          <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-border/50 sm:pl-6 pt-4 sm:pt-0">
            <div className="text-foreground font-semibold flex items-center gap-2">
              <Clock className="size-3.5 text-primary" />
              <span>Jadwal Operasional NOC & Dukungan Pelanggan</span>
            </div>
            <ul className="space-y-1 text-xs">
              <li>• Customer Support: Senin – Sabtu, 08:00 – 22:00 WIB</li>
              <li>• Automated Provisioning (Beli/Perpanjang): 24 Jam Non-stop</li>
              <li>• NOC Network Operations Center: 24/7/365 Pengawasan BGP & Edge</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Support Ticket Form & Fast-Track Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Support Inquiry Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              {t("contact.formTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {t("contact.formSubtitle")}
            </p>
          </div>

          {isSuccess ? (
            <div
              className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4 text-center animate-in fade-in zoom-in-95 duration-300"
              role="alert"
              aria-live="polite"
            >
              <div className="size-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="size-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">
                  {t("contact.formSuccessTitle")}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {t("contact.formSuccessDesc")}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={resetForm}
                className="text-xs font-bold rounded-xl border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-300"
              >
                {t("contact.formReset")}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-semibold text-foreground"
                  >
                    {t("contact.formName")} <span className="text-rose-400">*</span>
                  </label>
                  <Input
                    id="contact-name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g. Dimas Kurniawan"
                    className={`rounded-xl bg-surface-subtle border-border/80 text-xs ${
                      errors.name ? "border-rose-500 focus-visible:ring-rose-500" : ""
                    }`}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="size-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-semibold text-foreground"
                  >
                    {t("contact.formEmail")} <span className="text-rose-400">*</span>
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="e.g. yourname@example.com"
                    className={`rounded-xl bg-surface-subtle border-border/80 text-xs ${
                      errors.email ? "border-rose-500 focus-visible:ring-rose-500" : ""
                    }`}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="size-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Category & Protocol */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-category"
                    className="text-xs font-semibold text-foreground"
                  >
                    {t("contact.formCategory")}
                  </label>
                  <select
                    id="contact-category"
                    value={formState.category}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full h-9 rounded-xl bg-surface-subtle border border-border/80 px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="technical">{t("contact.formCategoryTechnical")}</option>
                    <option value="general">{t("contact.formCategoryGeneral")}</option>
                    <option value="reseller">{t("contact.formCategoryReseller")}</option>
                    <option value="enterprise">{t("contact.formCategoryEnterprise")}</option>
                    <option value="abuse">{t("contact.formCategoryAbuse")}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-protocol"
                    className="text-xs font-semibold text-foreground"
                  >
                    {t("contact.formProtocol")}
                  </label>
                  <select
                    id="contact-protocol"
                    value={formState.protocol}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, protocol: e.target.value }))
                    }
                    className="w-full h-9 rounded-xl bg-surface-subtle border border-border/80 px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="">{isId ? "Semua Protokol / Tidak Spesifik" : "All Protocols / General"}</option>
                    <option value="vless">VLess XTLS Reality</option>
                    <option value="vmess">VMess (V2Ray WS/gRPC)</option>
                    <option value="trojan">Trojan-GFW / Go</option>
                    <option value="wireguard">WireGuard Fast Kernel</option>
                    <option value="shadowsocks">Shadowsocks 2022</option>
                    <option value="ssh">SSH Dropbear / WS</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold text-foreground"
                >
                  {t("contact.formMessage")} <span className="text-rose-400">*</span>
                </label>
                <Textarea
                  id="contact-message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder={t("contact.formMessagePlaceholder")}
                  className={`rounded-xl bg-surface-subtle border-border/80 text-xs resize-none ${
                    errors.message ? "border-rose-500 focus-visible:ring-rose-500" : ""
                  }`}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-xs py-5 shadow-md shadow-primary/20 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    <span>{t("contact.formSending")}</span>
                  </>
                ) : (
                  <>
                    <Send className="mr-2 size-4" />
                    <span>{t("contact.formSubmit")}</span>
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Fast-Track Self-Service Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              {t("contact.fastTrackTitle")}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t("contact.fastTrackSubtitle")}
            </p>
          </div>

          <div className="space-y-4">
            {/* Guides */}
            <div className="p-5 rounded-2xl border border-border/70 bg-card space-y-3 hover:border-border transition-all">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <BookOpen className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    {t("contact.fastTrackDocsTitle")}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {t("contact.fastTrackDocsDesc")}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-semibold rounded-xl border-border/70 hover:bg-surface-subtle justify-between"
                asChild
              >
                <Link href="/articles">
                  <span>{t("contact.btnOpenDocs")}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>

            {/* Reseller */}
            <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-3 hover:border-amber-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Sparkles className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    {t("contact.fastTrackPartnerTitle")}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {t("contact.fastTrackPartnerDesc")}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-semibold rounded-xl border-amber-500/30 text-amber-400 hover:bg-amber-500/10 justify-between"
                asChild
              >
                <Link href="/seller">
                  <span>{t("contact.btnPartnerPortal")}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>

            {/* Status */}
            <div className="p-5 rounded-2xl border border-border/70 bg-card space-y-3 hover:border-border transition-all">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Server className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    {t("contact.fastTrackStatusTitle")}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {t("contact.fastTrackStatusDesc")}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-semibold rounded-xl border-border/70 hover:bg-surface-subtle justify-between"
                asChild
              >
                <Link href="/#protocols">
                  <span>{t("contact.btnViewStatus")}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SLA Badges Reassurance Banner */}
      <div className="p-6 rounded-2xl border border-border/60 bg-surface-subtle/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-emerald-400 flex items-center justify-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>{t("contact.slaResponse")}</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            WhatsApp & Telegram Desk
          </p>
        </div>
        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-border/50 pt-2 sm:pt-0">
          <div className="text-xs font-mono font-bold text-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" />
            <span>{t("contact.slaUptime")}</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            BGP Anycast Redundancy
          </p>
        </div>
        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-border/50 pt-2 sm:pt-0">
          <div className="text-xs font-mono font-bold text-foreground flex items-center justify-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-400" />
            <span>{t("contact.slaSecurity")}</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Non-Persistent Memory
          </p>
        </div>
      </div>
    </div>
  );
}
