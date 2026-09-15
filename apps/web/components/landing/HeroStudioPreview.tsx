"use client";

import { Pause, Play, Video, Mic, Radio, Maximize2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { WaveformPreview } from "../WaveformPreview";

export const HeroStudioPreview: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="mt-12 border border-[#2E3033] rounded-xl bg-[#1A1B1D] shadow-2xl overflow-hidden text-[#F2F1ED]">
      {/* Studio Chrome Header */}
      <div className="px-5 py-3 border-b border-[#2E3033] bg-[#161718] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2E3033]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#2E3033]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#2E3033]" />
          </div>
          <span className="text-xs font-mono text-[#F2F1ED] pl-3 border-l border-[#2E3033]">
            session_id: ep-14-spatial-media.raw
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-rec-pulse" />
            <span>RECORDING · 00:24:18.4</span>
          </div>
          <Link
            href="/editor/demo"
            className="text-[11px] font-mono px-3 py-1 bg-[#242628] hover:bg-[#2E3033] text-[#F2F1ED] rounded border border-[#2E3033] transition-all"
          >
            Launch Editor →
          </Link>
        </div>
      </div>

      {/* Interactive Dual-View Video Frame */}
      <div className="p-5 bg-[#131415] grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* Host Feed */}
        <div className="relative aspect-video rounded-lg bg-[#18191B] overflow-hidden border border-[#2E3033] flex flex-col justify-between p-3.5">
          <div className="flex items-center justify-between z-10">
            <span className="px-2 py-0.5 rounded bg-[#131415]/85 border border-[#2E3033] text-[10px] font-mono text-[#F2F1ED]">
              STREAM_01: Alex Rivers (Host)
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
              1080p60 · 48kHz WAV
            </span>
          </div>

          {/* Host Simulated Stream */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-stone-800 to-stone-600 mx-auto flex items-center justify-center text-white text-base font-semibold border border-white/10 shadow-lg">
                AR
              </div>
              <p className="text-[10px] font-mono text-[#8B8D90]">BITRATE: 6.4 MBPS · LOSS: 0.0%</p>
            </div>
          </div>

          {/* Waveform footer */}
          <div className="z-10 flex items-center justify-between bg-[#131415]/75 p-1.5 rounded border border-[#2E3033]/60">
            <WaveformPreview
              bars={24}
              height={16}
              activeColor="#FA5089"
              inactiveColor="#2E3033"
              progress={0.7}
              animated={isPlaying}
            />
            <span className="text-[10px] font-mono text-[#8B8D90]">
              -14.2 LUFS
            </span>
          </div>
        </div>

        {/* Guest Feed */}
        <div className="relative aspect-video rounded-lg bg-[#18191B] overflow-hidden border border-[#2E3033] flex flex-col justify-between p-3.5">
          <div className="flex items-center justify-between z-10">
            <span className="px-2 py-0.5 rounded bg-[#131415]/85 border border-[#2E3033] text-[10px] font-mono text-[#F2F1ED]">
              STREAM_02: Elena Chen (Guest)
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
              1080p60 · 48kHz WAV
            </span>
          </div>

          {/* Guest Simulated Stream */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-950 to-rose-800 mx-auto flex items-center justify-center text-white text-base font-semibold border border-[#FA5089]/30 shadow-lg">
                EC
              </div>
              <p className="text-[10px] font-mono text-[#8B8D90]">BITRATE: 6.2 MBPS · LOSS: 0.0%</p>
            </div>
          </div>

          {/* Waveform footer */}
          <div className="z-10 flex items-center justify-between bg-[#131415]/75 p-1.5 rounded border border-[#2E3033]/60">
            <WaveformPreview
              bars={24}
              height={16}
              activeColor="#10B981"
              inactiveColor="#2E3033"
              progress={0.4}
              animated={isPlaying}
            />
            <span className="text-[10px] font-mono text-[#8B8D90]">
              -14.0 LUFS
            </span>
          </div>
        </div>

        {/* Burned-in Subtitle Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2 rounded-md bg-[#131415]/90 backdrop-blur-md border border-[#2E3033] text-[#F2F1ED] text-center text-xs font-mono tracking-tight shadow-2xl max-w-md">
          <span className="text-[#FA5089] mr-1.5">[Elena Chen]:</span>
          &ldquo;The moment you stop treating the editor as a separate desktop download, turnaround becomes instant.&rdquo;
        </div>
      </div>

      {/* Integrated Timeline Strip */}
      <div className="p-3.5 bg-[#161718] border-t border-[#2E3033] flex items-center justify-between text-xs text-[#8B8D90]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-6 h-6 rounded bg-[#FA5089] hover:bg-[#E03F74] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause preview" : "Play preview"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </button>
          <span className="font-mono text-[#F2F1ED] text-[11px]">
            00:24:18.4 <span className="text-[#8B8D90]">/ 00:42:17.0</span>
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="px-2 py-0.5 rounded bg-[#1A1B1D] border border-[#2E3033] text-emerald-400">
            TIME_ALIGNED: 0.00ms
          </span>
          <span className="px-2 py-0.5 rounded bg-[#1A1B1D] border border-[#2E3033] text-[#F2F1ED]">
            AUTO_CAPTIONS: 100%
          </span>
        </div>
      </div>
    </div>
  );
};
