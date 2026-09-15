// ==============================================================================
// GoVPN User Support Tickets View
// Part of Pola C: views/user/SupportTicketsView.tsx
// Algoritma 4: Dynamic Island Route Component (Helpdesk Chat & Ticket Console)
// Fully Localized with useI18n (EN/ID)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useSupportUser } from "../../hooks/useSupportUser";
import { SupportSkeleton } from "../../components/shared/SupportSkeleton";
import { UserTicketList } from "../../components/user/UserTicketList";
import { CreateTicketModal } from "../../components/user/CreateTicketModal";
import { TicketConversationView } from "../../components/user/TicketConversationView";
import { RefreshCw, Plus, LifeBuoy, MessageSquareQuote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";

export function SupportTicketsView() {
  const { t } = useI18n();
  const {
    tickets,
    selectedTicket,
    replies,
    loading,
    loadingReplies,
    setSelectedTicket,
    createTicket,
    sendReply,
    closeTicket,
    refresh,
  } = useSupportUser();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  if (loading) {
    return <SupportSkeleton />;
  }

  const handleSelectTicket = (ticket: (typeof tickets)[0]) => {
    setSelectedTicket(ticket);
    setMobileChatOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2">
            <LifeBuoy className="w-3.5 h-3.5" /> {t("support.helpdeskBadge")}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t("support.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("support.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refresh();
              toast.info(t("common.loading"));
            }}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t("common.refresh")}</span>
          </Button>
          <Button
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t("support.openNewTicket")}</span>
          </Button>
        </div>
      </div>

      {/* Main Split Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Ticket List */}
        <div
          className={`lg:col-span-5 space-y-4 ${
            mobileChatOpen ? "hidden lg:block" : "block"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("support.yourTicketsList")} ({tickets.length})
            </h2>
          </div>

          <UserTicketList
            tickets={tickets}
            selectedTicketId={selectedTicket?.id}
            onSelectTicket={handleSelectTicket}
          />
        </div>

        {/* Right Side: Conversation Thread */}
        <div
          className={`lg:col-span-7 ${
            mobileChatOpen ? "block" : "hidden lg:block"
          }`}
        >
          {selectedTicket ? (
            <TicketConversationView
              ticket={selectedTicket}
              replies={replies}
              loadingReplies={loadingReplies}
              onBack={() => setMobileChatOpen(false)}
              onSendReply={async (msg, key) => {
                await sendReply(msg, key);
              }}
              onCloseTicket={async () => {
                await closeTicket(selectedTicket.id);
              }}
            />
          ) : (
            <div className="h-96 rounded-2xl border border-dashed border-border/60 flex flex-col items-center justify-center p-6 text-center text-muted-foreground bg-card/20">
              <MessageSquareQuote className="w-12 h-12 stroke-[1.2] mb-3 text-muted-foreground/60" />
              <p className="text-sm font-medium text-foreground">
                {t("support.selectTicketPrompt")}
              </p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                {t("support.selectTicketPromptDesc")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmitTicket={async (dto, key) => {
          await createTicket(dto, key);
        }}
      />
    </div>
  );
}
