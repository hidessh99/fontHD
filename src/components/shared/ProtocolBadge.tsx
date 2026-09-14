import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type SupportedProtocol =
  | "ssh"
  | "vmess"
  | "vless"
  | "trojan"
  | "shadowsocks"
  | "ss"
  | "wireguard"
  | "wg"
  | "openvpn"
  | "ovpn"
  | string;

interface ProtocolBadgeProps {
  protocol: SupportedProtocol;
  className?: string;
  size?: "sm" | "default";
}

const protocolStyles: Record<
  string,
  { label: string; borderClass: string; textClass: string; bgClass: string }
> = {
  ssh: {
    label: "SSH",
    borderClass: "border-blue-500/40",
    textClass: "text-blue-400",
    bgClass: "bg-blue-500/10",
  },
  vmess: {
    label: "VMESS",
    borderClass: "border-purple-500/40",
    textClass: "text-purple-400",
    bgClass: "bg-purple-500/10",
  },
  vless: {
    label: "VLESS",
    borderClass: "border-cyan-500/40",
    textClass: "text-cyan-400",
    bgClass: "bg-cyan-500/10",
  },
  trojan: {
    label: "TROJAN",
    borderClass: "border-rose-500/40",
    textClass: "text-rose-400",
    bgClass: "bg-rose-500/10",
  },
  shadowsocks: {
    label: "SHADOWSOCKS",
    borderClass: "border-amber-500/40",
    textClass: "text-amber-400",
    bgClass: "bg-amber-500/10",
  },
  ss: {
    label: "SS",
    borderClass: "border-amber-500/40",
    textClass: "text-amber-400",
    bgClass: "bg-amber-500/10",
  },
  wireguard: {
    label: "WIREGUARD",
    borderClass: "border-emerald-500/40",
    textClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
  },
  wg: {
    label: "WG",
    borderClass: "border-emerald-500/40",
    textClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
  },
  openvpn: {
    label: "OPENVPN",
    borderClass: "border-orange-500/40",
    textClass: "text-orange-400",
    bgClass: "bg-orange-500/10",
  },
};

export function ProtocolBadge({
  protocol,
  className,
  size = "default",
}: ProtocolBadgeProps) {
  const normProto = (protocol || "").toLowerCase();
  const style = protocolStyles[normProto] || {
    label: protocol.toUpperCase(),
    borderClass: "border-border",
    textClass: "text-foreground",
    bgClass: "bg-muted",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-mono font-bold tracking-wider uppercase inline-flex items-center",
        size === "sm" ? "text-[10px] px-1.5 py-0" : "text-xs px-2 py-0.5",
        style.borderClass,
        style.textClass,
        style.bgClass,
        className,
      )}
    >
      {style.label}
    </Badge>
  );
}
