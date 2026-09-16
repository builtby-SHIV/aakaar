import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface StudioFinalizedCardProps {
  roomId: string;
  seconds: number;
  formatTimer: (seconds: number) => string;
}

export const StudioFinalizedCard: React.FC<StudioFinalizedCardProps> = ({
  roomId,
  seconds,
  formatTimer,
}) => {
  return (
    <div className="max-w-xl w-full bg-[#1A1B1D] text-[#F2F1ED] border border-[#2E3033] rounded-2xl p-8 space-y-8 shadow-2xl animate-fade">
      <div className="space-y-2">
        <span className="text-[11px] uppercase tracking-widest font-mono text-emerald-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Recording Finalized</span>
        </span>
        <h2 className="text-3xl font-normal tracking-tight text-[#F2F1ED]">
          Your recording is ready.
        </h2>
        <p className="text-sm text-[#8B8D90] leading-relaxed">
          All host and guest streams are aligned. Open the editor to refine
          layouts, burn captions, and export without leaving your browser.
        </p>
      </div>

      {/* Multitrack Diagnostics */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#131415] border border-[#2E3033] text-xs">
        <div className="space-y-1">
          <span className="text-[#8B8D90] font-mono">Host Stream</span>
          <div className="font-medium text-[#F2F1ED]">1080p 60fps</div>
          <div className="text-[11px] text-[#8B8D90] font-mono">
            {formatTimer(seconds)}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[#8B8D90] font-mono">Guest Stream</span>
          <div className="font-medium text-[#F2F1ED]">1080p 60fps</div>
          <div className="text-[11px] text-[#8B8D90] font-mono">
            {formatTimer(seconds)}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[#8B8D90] font-mono">Master Audio</span>
          <div className="font-medium text-[#F2F1ED]">48 kHz WAV</div>
          <div className="text-[11px] text-emerald-400 font-mono">Synced 0ms</div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href="/dashboard"
          className="text-xs font-medium text-[#8B8D90] hover:text-[#F2F1ED] transition-colors"
        >
          Back to Dashboard
        </Link>

        <Link
          href={`/editor/${roomId}`}
          className="px-6 py-3 bg-[#FA5089] text-white rounded-lg font-medium text-xs hover:bg-[#E8457B] transition-all flex items-center gap-2 shadow-sm"
        >
          <span>Open In-Browser Editor</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
