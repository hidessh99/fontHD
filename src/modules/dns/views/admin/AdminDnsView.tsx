// ==============================================================================
// GoVPN DNS Superadmin Manager View Component
// Part of Pola C: views/admin/AdminDnsView.tsx
// 100% Coinbase Institutional Design System (Multi-CF Accounts, Root Zones & Audit)
// Fully Localized with useI18n (EN/ID)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useDnsAdmin } from "../../hooks/useDnsAdmin";
import { AdminDnsAccountTable } from "../../components/admin/AdminDnsAccountTable";
import { AdminDomainManager } from "../../components/admin/AdminDomainManager";
import { AdminGlobalRecordTable } from "../../components/admin/AdminGlobalRecordTable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, Globe, Layers, RefreshCw } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function AdminDnsView() {
  const { t } = useI18n();
  const {
    accounts,
    domains,
    records,
    loading,
    createAccount,
    deleteAccount,
    createDomain,
    deleteDomain,
    deleteRecord,
    cleanupExpiredRecords,
    refresh,
  } = useDnsAdmin();

  const [activeTab, setActiveTab] = useState<
    "accounts" | "domains" | "records"
  >("records");

  return (
    <div className="space-y-6 pb-12">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                {t("dns.cfAccountsCount")}
              </span>
              <div className="font-mono text-2xl font-bold text-foreground mt-1">
                {accounts.length}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Cloud className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                {t("dns.rootZonesCount")}
              </span>
              <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">
                {domains.length}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Globe className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium">
                {t("dns.totalGlobalRecords")}
              </span>
              <div className="font-mono text-2xl font-bold text-primary mt-1">
                {records.length}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Layers className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Refresh Bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Tabs
          value={activeTab}
          onValueChange={(val) =>
            setActiveTab(val as "records" | "domains" | "accounts")
          }
        >
          <TabsList variant="line" className="gap-2">
            <TabsTrigger value="records" className="py-2 text-xs font-semibold">
              {t("dns.auditGlobalTab")} ({records.length})
            </TabsTrigger>
            <TabsTrigger value="domains" className="py-2 text-xs font-semibold">
              {t("dns.domainZonesTab")} ({domains.length})
            </TabsTrigger>
            <TabsTrigger value="accounts" className="py-2 text-xs font-semibold">
              {t("dns.cfAccountsTab")} ({accounts.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refresh()}
          disabled={loading}
          className="border-border bg-card/60 hover:bg-muted text-foreground gap-2 h-9 px-3.5 text-xs rounded-xl shadow-sm"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
          {t("common.refresh")}
        </Button>
      </div>

      {/* Tab Panels */}
      {activeTab === "records" && (
        <AdminGlobalRecordTable
          records={records}
          onDeleteRecord={deleteRecord}
          onCleanupRecords={cleanupExpiredRecords}
          loading={loading}
        />
      )}

      {activeTab === "domains" && (
        <AdminDomainManager
          domains={domains}
          accounts={accounts}
          onCreateDomain={createDomain}
          onDeleteDomain={deleteDomain}
          loading={loading}
        />
      )}

      {activeTab === "accounts" && (
        <AdminDnsAccountTable
          accounts={accounts}
          onCreateAccount={createAccount}
          onDeleteAccount={deleteAccount}
          loading={loading}
        />
      )}
    </div>
  );
}
