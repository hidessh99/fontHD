"use client";

import React from "react";
import { useDns } from "../hooks/useDns";
import { DnsRecordTable } from "../components/DnsRecordTable";
import { CreateDnsRecordModal } from "../components/CreateDnsRecordModal";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Cloud, Search, RefreshCw, Layers } from "lucide-react";

export function DnsManagerView() {
  const {
    domains,
    records,
    allRecords,
    selectedDomainId,
    setSelectedDomainId,
    searchQuery,
    setSearchQuery,
    loading,
    addRecord,
    removeRecord,
    refresh,
  } = useDns();

  const proxiedCount = allRecords.filter((r) => r.proxied).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-zinc-800 bg-zinc-950 p-4">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400">Domain Zona Terdaftar</span>
              <div className="font-mono text-2xl font-bold text-zinc-100 mt-1">
                {domains.length} Domain
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Globe className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950 p-4">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400">Total DNS Record</span>
              <div className="font-mono text-2xl font-bold text-indigo-400 mt-1">
                {allRecords.length} Record
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950 p-4">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400">Cloudflare Proxied (CDN)</span>
              <div className="font-mono text-2xl font-bold text-amber-400 mt-1">
                {proxiedCount} Record
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Cloud className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action and Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Cari subdomain, IP target, atau catatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-100 text-xs h-9"
            />
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => setSelectedDomainId("ALL")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                selectedDomainId === "ALL"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Semua Zona
            </button>
            {domains.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDomainId(d.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                  selectedDomainId === d.id
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {d.domain_name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refresh()}
            disabled={loading}
            className="border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 gap-2 h-9 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Segarkan
          </Button>

          <CreateDnsRecordModal
            domains={domains}
            onAddRecord={addRecord}
          />
        </div>
      </div>

      {/* DNS Record Table */}
      <DnsRecordTable
        records={records}
        onDeleteRecord={removeRecord}
      />
    </div>
  );
}
