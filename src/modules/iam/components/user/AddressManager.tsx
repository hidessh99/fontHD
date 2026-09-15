// ==============================================================================
// GoVPN IAM User Address Book Manager Component
// Part of Pola C: components/user/AddressManager.tsx
// 100% Coinbase Institutional Design System (Billing Address CRUD)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { UserAddress } from "../../types/iam.types";
import { UserAddressDto } from "../../types/user.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Plus,
  Trash2,
  Home,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

interface AddressManagerProps {
  addresses: UserAddress[];
  onCreateAddress: (dto: UserAddressDto) => Promise<unknown>;
  onDeleteAddress?: (id: string | number) => Promise<unknown>;
}

export function AddressManager({
  addresses,
  onCreateAddress,
  onDeleteAddress,
}: AddressManagerProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Rumah");
  const [recipientName, setRecipientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Indonesia");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !addressLine1.trim() || !city.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreateAddress({
        title,
        recipient_name: recipientName.trim(),
        phone_number: phoneNumber.trim(),
        address_line1: addressLine1.trim(),
        city: city.trim(),
        state_province: stateProvince.trim(),
        postal_code: postalCode.trim(),
        country,
        is_default: addresses.length === 0,
      });
      toast.success(t("iam.addressCreated"));
      setOpen(false);
      setRecipientName("");
      setPhoneNumber("");
      setAddressLine1("");
      setCity("");
      setStateProvince("");
      setPostalCode("");
    } catch {
      toast.error(t("iam.addressCreateFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!onDeleteAddress) return;
    setDeletingId(id);
    try {
      await onDeleteAddress(id);
      toast.success(t("iam.addressDeleted"));
    } catch {
      toast.error(t("iam.addressDeleteFailed"));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold font-mono text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            {t("iam.addressBookTitle", { count: addresses.length })}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t("iam.addressBookDesc")}
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button className="bg-primary hover:bg-primary-hover text-white gap-2 font-semibold text-xs rounded-full min-h-9 px-4 shadow-sm">
                <Plus className="h-4 w-4" />
                {t("iam.addAddress")}
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                <Home className="h-5 w-5 text-primary" />
                {t("iam.addNewAddressTitle")}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    {t("iam.addressLabel")}
                  </Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Rumah / Kantor"
                    required
                    className="mt-1 font-mono text-xs rounded-xl min-h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    {t("iam.recipientName")}
                  </Label>
                  <Input
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Nama Lengkap"
                    required
                    className="mt-1 text-xs rounded-xl min-h-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  {t("iam.phoneNumber")}
                </Label>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="08123456789"
                  required
                  className="mt-1 font-mono text-xs rounded-xl min-h-10"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  {t("iam.fullAddress")}
                </Label>
                <Input
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder={t("iam.fullAddressPlaceholder")}
                  required
                  className="mt-1 text-xs rounded-xl min-h-10"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    {t("iam.city")}
                  </Label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t("iam.city")}
                    required
                    className="mt-1 text-xs rounded-xl min-h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    {t("iam.province")}
                  </Label>
                  <Input
                    value={stateProvince}
                    onChange={(e) => setStateProvince(e.target.value)}
                    placeholder={t("iam.province")}
                    required
                    className="mt-1 text-xs rounded-xl min-h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    {t("iam.postalCode")}
                  </Label>
                  <Input
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="12345"
                    required
                    className="mt-1 font-mono text-xs rounded-xl min-h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    {t("iam.country")}
                  </Label>
                  <Input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Indonesia"
                    required
                    className="mt-1 text-xs rounded-xl min-h-10"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="text-xs rounded-full min-h-10 px-5"
                >
                  {t("common.cancel", "Cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full min-h-10 px-6 shadow-md shadow-primary/25"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />{" "}
                      {t("iam.savingChanges")}
                    </>
                  ) : (
                    t("iam.saveAddress")
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center text-xs text-muted-foreground">
          {t("iam.noAddressesYet")}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="rounded-2xl border border-border/80 bg-card/60 p-4 space-y-2 hover:bg-card/90 transition-colors shadow-sm relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono text-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                    {addr.title}
                  </span>
                  {addr.is_default && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" /> {t("iam.primary")}
                    </span>
                  )}
                </div>
                {onDeleteAddress && (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={deletingId === addr.id}
                    onClick={() => handleDelete(addr.id)}
                    className="h-7 w-7 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>

              <div className="text-xs text-foreground font-semibold">
                {addr.recipient_name}{" "}
                <span className="font-mono text-muted-foreground font-normal">
                  ({addr.phone_number})
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {addr.address_line1}, {addr.city}, {addr.state_province}{" "}
                {addr.postal_code}, {addr.country}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
