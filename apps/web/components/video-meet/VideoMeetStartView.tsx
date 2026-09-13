"use client";

import { ArrowLeft, Shield, Radio } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Logo } from "../Logo";

export function VideoMeetStartView() {
  return (
    <div className="min-h-screen bg-[#131415] text-[#F2F1ED] flex flex-col justify-between p-6">
      {/* Top Bar */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <Logo size="md" href="/" />
        <Link
          href="/dashboard"
          className="text-xs font-mono text-[#8B8D90] hover:text-[#F2F1ED] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </header>

      {/* Center Form Card */}
      <main className="max-w-md w-full mx-auto my-auto p-8 rounded-2xl border border-[#2E3033] bg-[#1A1B1D] shadow-2xl space-y-6 animate-fade">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#FA5089]" />
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#FA5089]">
              LIVEKIT WEBRTC STUDIO
            </span>
          </div>
          <h1 className="text-2xl font-sans font-bold text-[#F2F1ED] tracking-tight">
            Video Meetings
          </h1>
          <p className="text-xs text-[#8B8D90] leading-relaxed">
            Video calls can only be initiated by creating or opening a project from your workspace dashboard. Each project generates a dedicated, persistent studio session.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/dashboard"
            className="w-full py-3 bg-[#FA5089] hover:bg-[#E03F74] text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm shadow-[#FA5089]/20 font-mono"
          >
            <span>Go to Dashboard to Start Session</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-[#2E3033] flex items-center justify-between text-[11px] font-mono text-[#8B8D90]">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Project-Backed Sessions</span>
          </span>
          <span>Zero Installs</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto text-center text-xs text-[#8B8D90] font-mono">
        Aakaar Studio Engine · Low-Latency WebRTC & MediaStream Capture
      </footer>
    </div>
  );
}
