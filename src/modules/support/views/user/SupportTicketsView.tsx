// ==============================================================================
// GoVPN User Support Tickets View
// Part of Pola C: views/user/SupportTicketsView.tsx
// Algoritma 4: Dynamic Island Route Component (Helpdesk Chat & Ticket Console)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { useSupportUser } from "../../hooks/useSupportUser";
import { SupportSkeleton } from "../../components/shared/SupportSkeleton";
import { UserTicketList } from "../../components/user/UserTicketList";
import { CreateTicketModal } from "../../components/user/CreateTicketModal";
import { TicketConversationView } from "../../components/user/TicketConversationView";
import { RefreshCw, Plus, LifeBuoy, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";

export function SupportTicketsView() {
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

  const handleSelectTicket = (ticket: typeof tickets[0]) => {
    setSelectedTicket(ticket);
    setMobileChatOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2">
            <LifeBuoy className="w-3.5 h-3.5" /> Pusat Bantuan & Helpdesk 24/7
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Bantuan Teknis & Tiket
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Dukungan teknis dedicated untuk pemecahan masalah protokol, rute tunneling, dan kendala akun.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              refresh();
              toast.info("Memperbarui tiket bantuan...");
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-border/50 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Segarkan</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Ajukan Tiket Baru</span>
          </button>
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
              Daftar Tiket Anda ({tickets.length})
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
                Pilih tiket untuk melihat riwayat percakapan
              </p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                Klik salah satu tiket di daftar sebelah kiri untuk membalas respon teknis dari tim GoVPN.
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
