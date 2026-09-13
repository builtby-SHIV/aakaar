"use client";

import { ArrowLeft, Pause, UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { StudioState } from "./types";

interface StudioHeaderProps {
  roomId: string;
  studioState: StudioState;
  seconds: number;
  formatTimer: (seconds: number) => string;
  onInviteGuest: () => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  roomId,
  studioState,
  seconds,
  formatTimer,
  onInviteGuest,
}) => {
  return (
    <header className="h-14 px-6 border-b border-[#2E3033] bg-[#1A1B1D] flex items-center justify-between z-20">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="p-1.5 rounded text-[#8B8D90] hover:text-[#F2F1ED] hover:bg-[#242628] transition-colors"
          title="Exit Studio"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-medium text-xs tracking-tight text-white">
            Studio: {roomId}
          </span>
          <span className="text-xs text-[#8B8D90] font-mono hidden sm:inline">
            · Local 1080p Multitrack Active
          </span>
        </div>
      </div>

      {/* Center: Live Timer & Status */}
      <div className="flex items-center gap-3">
        {studioState === "recording" && (
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#EF4444]/10 text-[#EF4444] text-xs font-mono font-medium animate-fade">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-rec-pulse" />
            <span>REC {formatTimer(seconds)}</span>
          </div>
        )}

        {studioState === "paused" && (
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-mono font-medium">
            <Pause className="w-3 h-3" />
            <span>PAUSED {formatTimer(seconds)}</span>
          </div>
        )}

        {studioState === "device_check" && (
          <span className="text-xs font-mono text-[#8B8D90]">
            Hardware Test & Lobby
          </span>
        )}

        {studioState === "waiting" && (
          <span className="text-xs font-mono text-amber-400">
            Waiting for guest...
          </span>
        )}
      </div>

      {/* Right: Guest Invite */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onInviteGuest}
          className="text-xs font-medium px-3 py-1.5 rounded border border-[#38393C] hover:bg-[#242628] transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5 text-[#6B6D70]" />
          <span>Invite Guest</span>
        </button>
      </div>
    </header>
  );
};
