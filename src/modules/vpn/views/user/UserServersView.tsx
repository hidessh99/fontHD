// ==============================================================================
// GoVPN VPN User Servers View (Composite Page View for User App Router)
// Part of Pola C: views/user/UserServersView.tsx
// 100% Coinbase Design System (56px Pill Buttons, Near-Black Canvas, Dark Cards)
// ==============================================================================

"use client";

import React, { useState, useMemo } from "react";
import { Server, Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { ServerNodeCard } from "../../components/user/ServerNodeCard";
import { CreateVpnModal } from "../../components/user/CreateVpnModal";
import { useVpnUser } from "../../hooks/useVpnUser";
import { ServerNode, VpnProtocol } from "../../types/vpn.types";

export function UserServersView() {
  const { servers, isLoading, refresh } = useVpnUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [selectedServer, setSelectedServer] = useState<ServerNode | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const availableCountries = useMemo(() => {
    const set = new Set<string>();
    servers.forEach((s) => {
      if (s.country_code) set.add(s.country_code);
    });
    return Array.from(set);
  }, [servers]);

  const filteredServers = useMemo(() => {
    return servers.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.ip.includes(searchQuery);
      const matchCountry =
        selectedCountry === "ALL" || s.country_code === selectedCountry;
      return matchSearch && matchCountry;
    });
  }, [servers, searchQuery, selectedCountry]);

  const handleSelectServer = (server: ServerNode) => {
    setSelectedServer(server);
    setOrderModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1 text-primary">
            <Server className="size-5" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Armada Server Node VPN
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Status ketersediaan node server global, monitoring ping latensi
            real-time, dan kapasitas akun aktif.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refresh()}
          disabled={isLoading}
          className="text-xs font-mono h-10 px-5 rounded-full self-start sm:self-auto"
        >
          <RefreshCw
            className={`mr-1.5 size-3.5 ${isLoading ? "animate-spin" : ""}`}
          />
          Segarkan
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Cari server, negara, atau IP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs font-mono rounded-xl min-h-10"
          />
        </div>

        {/* Country Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full py-1">
          <Button
            variant={selectedCountry === "ALL" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCountry("ALL")}
            className="text-xs h-9 px-4 font-mono rounded-full"
          >
            Semua ({servers.length})
          </Button>
          {availableCountries.map((cc) => (
            <Button
              key={cc}
              variant={selectedCountry === cc ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(cc)}
              className="text-xs h-9 px-4 font-mono rounded-full"
            >
              {cc}
            </Button>
          ))}
        </div>
      </div>

      {/* Server Grid */}
      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-center">
            <Spinner className="size-6 text-primary animate-spin" />
            <p className="text-xs font-mono text-muted-foreground">
              Memeriksa armada server...
            </p>
          </div>
        </div>
      ) : filteredServers.length === 0 ? (
        <EmptyState
          icon={Server}
          title="Tidak Ada Server Ditemukan"
          description="Tidak ada server node yang cocok dengan kriteria pencarian Anda. Coba reset filter negara atau kata kunci pencarian."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServers.map((server) => (
            <ServerNodeCard
              key={server.id}
              server={server}
              selected={selectedServer?.id === server.id}
              onSelect={handleSelectServer}
            />
          ))}
        </div>
      )}

      {/* Create Modal triggered from Server Selection */}
      {selectedServer && (
        <CreateVpnModal
          isOpen={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          protocol={
            (selectedServer.supported_protocols[0] || "vmess") as VpnProtocol
          }
          onSuccess={() => refresh()}
        />
      )}
    </div>
  );
}
