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
    <div className="max-w-xl w-full bg-[#F7F6F2] text-[#141413] border border-[#E5E3DC] rounded-2xl p-8 space-y-8 shadow-2xl animate-kanso-fade">
      <div className="space-y-2">
        <span className="text-[11px] uppercase tracking-widest font-mono text-[#2B7A4B] flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Recording Finalized</span>
        </span>
        <h2 className="text-3xl font-normal tracking-tight text-[#141413]">
          Your recording is ready.
        </h2>
        <p className="text-sm text-[#7A7870] leading-relaxed">
          All host and guest streams are aligned. Open the editor to refine
          layouts, burn captions, and export without leaving your browser.
        </p>
      </div>

      {/* Multitrack Diagnostics */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E3DC] text-xs">
        <div className="space-y-1">
          <span className="text-[#7A7870] font-mono">Host Stream</span>
          <div className="font-medium text-[#141413]">1080p 60fps</div>
          <div className="text-[11px] text-[#7A7870] font-mono">
            {formatTimer(seconds)}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[#7A7870] font-mono">Guest Stream</span>
          <div className="font-medium text-[#141413]">1080p 60fps</div>
          <div className="text-[11px] text-[#7A7870] font-mono">
            {formatTimer(seconds)}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[#7A7870] font-mono">Master Audio</span>
          <div className="font-medium text-[#141413]">48 kHz WAV</div>
          <div className="text-[11px] text-[#2B7A4B] font-mono">Synced 0ms</div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href="/dashboard"
          className="text-xs font-medium text-[#7A7870] hover:text-[#141413] transition-colors"
        >
          Back to Dashboard
        </Link>

        <Link
          href={`/editor/${roomId}`}
          className="px-6 py-3 bg-[#141413] text-[#F7F6F2] rounded-lg font-medium text-xs hover:bg-[#2B2A27] transition-all flex items-center gap-2 shadow-sm"
        >
          <span>Open In-Browser Editor</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
