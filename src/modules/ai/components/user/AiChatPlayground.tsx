// ==============================================================================
// GoVPN AI Chat Playground Component
// Part of Pola C: components/user/AiChatPlayground.tsx
// 100% Coinbase Institutional Design System (Multi-Turn Chat, Model Selector)
// ==============================================================================

"use client";

import React, { useState } from "react";
import { AiModel, ChatMessage } from "../../types/ai.types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles, Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface AiChatPlaygroundProps {
  models: AiModel[];
  onSendMessage: (
    model: string,
    content: string,
  ) => Promise<string | undefined>;
}

export function AiChatPlayground({
  models,
  onSendMessage,
}: AiChatPlaygroundProps) {
  const [selectedModel, setSelectedModel] = useState<string>(
    models[0]?.model_id || "gpt-4o-mini",
  );
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content:
        "Halo! Saya adalah GoVPN AI Assistant yang terhubung langsung ke unified AI Gateway. Anda dapat menguji inferensi model, menanyakan konfigurasi VPN, atau menguji respons API di sini.",
      created_at: new Date().toISOString(),
    },
  ]);
  const [sending, setSending] = useState(false);

  React.useEffect(() => {
    if (
      models.length > 0 &&
      !models.some((m) => m.model_id === selectedModel)
    ) {
      setSelectedModel(models[0].model_id);
    }
  }, [models, selectedModel]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userMessage: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: input.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      const response = await onSendMessage(selectedModel, userMessage.content);
      const assistantMessage: ChatMessage = {
        id: "msg-" + (Date.now() + 1),
        role: "assistant",
        content:
          response ||
          "Respons diterima dari model gateway. Anda dapat menggunakan endpoint `/api/ai/v1/chat/completions` dengan API key Anda.",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      toast.error("Gagal mengirim pesan ke model AI");
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "msg-welcome",
        role: "assistant",
        content: "Percakapan telah direset. Silakan ajukan pertanyaan baru.",
        created_at: new Date().toISOString(),
      },
    ]);
  };

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden flex flex-col h-[560px]">
      {/* Header with Model Selector */}
      <div className="p-4 border-b border-border/80 bg-muted/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-foreground">
              Playground Inferensi AI
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Uji coba interaktif langsung ke model
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-mono text-foreground outline-none focus:border-primary"
          >
            {models.map((m) => (
              <option key={m.id} value={m.model_id}>
                {m.name} ({m.model_id})
              </option>
            ))}
          </select>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground rounded-lg"
            title="Reset percakapan"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`h-7 w-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {msg.role === "user" ? (
                <User className="h-3.5 w-3.5" />
              ) : (
                <Bot className="h-3.5 w-3.5" />
              )}
            </div>

            <div
              className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed max-w-[80%] ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground font-medium rounded-tr-none shadow-md shadow-primary/20"
                  : "bg-muted/40 border border-border text-foreground rounded-tl-none font-sans"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <span className="text-[10px] opacity-60 mt-1 block font-mono">
                {new Date(msg.created_at).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex items-start gap-3">
            <div className="h-7 w-7 rounded-xl bg-muted text-muted-foreground border border-border flex items-center justify-center shrink-0">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-muted/40 border border-border px-4 py-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
              <span>Menghubungi AI Gateway...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Footer */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-border/80 bg-muted/20 flex gap-2"
      >
        <Input
          placeholder={`Tulis prompt untuk ${selectedModel}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
          className="bg-card/80 border-border text-foreground text-xs h-10 rounded-xl"
        />
        <Button
          type="submit"
          disabled={sending || !input.trim()}
          className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs gap-1.5 shadow-md shadow-primary/20"
        >
          <Send className="h-3.5 w-3.5" />
          Kirim
        </Button>
      </form>
    </Card>
  );
}
