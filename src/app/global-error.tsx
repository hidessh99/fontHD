"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans antialiased">
        <div className="max-w-md w-full p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl text-center space-y-6 shadow-2xl">
          <div className="size-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
            <AlertTriangle className="size-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Critical System Error
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The application encountered a critical runtime exception at the
              root layout boundary.
            </p>
            {error.digest && (
              <p className="text-[10px] font-mono text-zinc-500">
                Digest: {error.digest}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 transition-colors cursor-pointer w-full"
          >
            <RefreshCw className="size-3.5" />
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
