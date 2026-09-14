// ==============================================================================
// GoVPN DNS User Manager View Component
// Part of Pola C: views/user/DnsManagerView.tsx
// 100% Coinbase Institutional Design System (Stats, Filter Pills, Action Bar)
// ==============================================================================

"use client";

import React from "react";
import { useDnsUser } from "../../hooks/useDnsUser";
import { UserDnsRecordTable } from "../../components/user/UserDnsRecordTable";
import { CreateUserRecordModal } from "../../components/user/CreateUserRecordModal";
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
    deletingId,
    addRecord,
    removeRecord,
    refresh,
  } = useDnsUser();

  const proxiedCount = allRecords.filter((r) => r.proxied).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Domain Zona Terdaftar
              </span>
              <div className="font-mono text-2xl font-bold text-foreground mt-1">
                {domains.length} Domain
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Globe className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Total DNS Record
              </span>
              <div className="font-mono text-2xl font-bold text-primary mt-1">
                {allRecords.length} Record
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Layers className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                Cloudflare Proxied (CDN)
              </span>
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
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari subdomain, IP target, atau catatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/60 border-border text-foreground text-xs h-10 rounded-xl"
            />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setSelectedDomainId("ALL")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedDomainId === "ALL"
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted/40 border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Semua Zona
            </button>
            {domains.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDomainId(String(d.id))}
                className={`rounded-xl px-3 py-1.5 text-xs font-mono transition-all ${
                  String(selectedDomainId) === String(d.id)
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted/40 border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
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
            className="border-border bg-card/60 hover:bg-muted text-foreground gap-2 h-10 px-3.5 text-xs rounded-xl shadow-sm"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
            />
            Segarkan
          </Button>

          <CreateUserRecordModal domains={domains} onAddRecord={addRecord} />
        </div>
      </div>

      {/* DNS Record Table */}
      <UserDnsRecordTable
        records={records}
        onDeleteRecord={removeRecord}
        deletingId={deletingId}
      />
    </div>
  );
}
