"use client";

import { ArrowLeft, Shield, Radio } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Logo } from "../Logo";
import MeetingForm, { type meetingForm } from "../MeetingForm";
import { useMeetingStore } from "../../providers/meetingStoreProvider";

export function VideoMeetStartView() {
  const router = useRouter();
  const { setRoomName } = useMeetingStore((state) => state.actions);

  const onSubmit = (data: meetingForm) => {
    setRoomName(data.roomName);
    router.push(`/video-meet/lobby?room=${encodeURIComponent(data.roomName)}`);
  };

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
            Start or Join Studio
          </h1>
          <p className="text-xs text-[#8B8D90] leading-relaxed">
            Enter a room identifier to initialize your pre-flight hardware checks and WebRTC session.
          </p>
        </div>

        <MeetingForm onSubmit={onSubmit} />

        <div className="pt-4 border-t border-[#2E3033] flex items-center justify-between text-[11px] font-mono text-[#8B8D90]">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Local Multitrack Capture</span>
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
