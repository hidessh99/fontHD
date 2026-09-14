"use client";

import React, { useState } from "react";
import { Server, Search, RefreshCw, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { ServerNodeCard } from "../components/ServerNodeCard";
import { CreateVpnModal } from "../components/CreateVpnModal";
import { useVpnServers } from "../hooks/useVpnServers";
import { ServerNode } from "../types/vpn.types";

export function ServersView() {
  const {
    servers,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCountry,
    setSelectedCountry,
    availableCountries,
    refresh,
  } = useVpnServers();

  const [selectedServer, setSelectedServer] = useState<ServerNode | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const handleSelectServer = (server: ServerNode) => {
    setSelectedServer(server);
    setOrderModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Server className="size-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">Server Node Telemetri</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Status ketersediaan node server global, monitoring ping latensi real-time, dan kapasitas akun aktif.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refresh()}
          disabled={isLoading}
          className="text-xs font-mono h-9 self-start sm:self-auto"
        >
          <RefreshCw className={`mr-1.5 size-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Segarkan
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Cari server atau negara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        {/* Country Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full py-1">
          <Button
            variant={selectedCountry === "ALL" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCountry("ALL")}
            className="text-xs h-8 font-mono"
          >
            Semua ({servers.length})
          </Button>
          {availableCountries.map((cc) => (
            <Button
              key={cc}
              variant={selectedCountry === cc ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(cc)}
              className="text-xs h-8 font-mono"
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
              Memuat data server...
            </p>
          </div>
        </div>
      ) : servers.length === 0 ? (
        <EmptyState
          icon={Globe}
          title="Tidak Ada Server Ditemukan"
          description="Tidak ada server node yang sesuai dengan filter pencarian atau negara yang dipilih."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servers.map((s) => (
            <ServerNodeCard
              key={s.id}
              server={s}
              onSelect={handleSelectServer}
            />
          ))}
        </div>
      )}

      {/* Create Modal triggered from selected server */}
      {selectedServer && (
        <CreateVpnModal
          isOpen={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          protocol={selectedServer.supported_protocols[0] || "vmess"}
        />
      )}
    </div>
  );
}
