"use client";

import { Pause, Play } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { WaveformPreview } from "../WaveformPreview";

export const HeroStudioPreview: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="mt-16 border border-[#E5E3DC] rounded-2xl bg-[#FFFFFF] shadow-xl overflow-hidden">
      {/* Studio Chrome Header */}
      <div className="px-5 py-3.5 border-b border-[#E5E3DC] bg-[#FAF9F6] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5E3DC]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5E3DC]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5E3DC]" />
          </div>
          <span className="text-xs font-medium text-[#141413] pl-2 border-l border-[#E5E3DC]">
            Ep. 14 — Spatial Design in Web Media
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#FFF1F0] text-[#E53E3E] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E53E3E] animate-rec-pulse" />
            <span>REC 00:24:18</span>
          </div>
          <Link
            href="/editor/demo"
            className="text-xs font-medium px-3 py-1 bg-[#141413] text-[#F7F6F2] rounded hover:bg-[#2B2A27] transition-all"
          >
            Open in Editor
          </Link>
        </div>
      </div>

      {/* Interactive Dual-View Video Frame */}
      <div className="p-6 bg-[#141413] grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* Host Feed */}
        <div className="relative aspect-video rounded-lg bg-[#22211E] overflow-hidden border border-[#33322E] flex flex-col justify-between p-4">
          <div className="flex items-center justify-between z-10">
            <span className="px-2 py-0.5 rounded bg-[#141413]/70 backdrop-blur-md text-[11px] font-mono text-white/90">
              Alex Rivers (Host) · 1080p Local
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              48kHz Lossless
            </span>
          </div>

          {/* Simulated video frame */}
          <div className="absolute inset-0 flex items-center justify-center opacity-70">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-stone-700 to-stone-500 mx-auto flex items-center justify-center text-white text-lg font-light">
                AR
              </div>
            </div>
          </div>

          {/* Waveform footer */}
          <div className="z-10 flex items-center justify-between">
            <WaveformPreview
              bars={24}
              height={20}
              activeColor="#60A5FA"
              inactiveColor="#3B82F6/40"
              progress={0.7}
              animated
            />
            <span className="text-[10px] font-mono text-stone-400">
              -14.2 LUFS
            </span>
          </div>
        </div>

        {/* Guest Feed */}
        <div className="relative aspect-video rounded-lg bg-[#22211E] overflow-hidden border border-[#33322E] flex flex-col justify-between p-4">
          <div className="flex items-center justify-between z-10">
            <span className="px-2 py-0.5 rounded bg-[#141413]/70 backdrop-blur-md text-[11px] font-mono text-white/90">
              Elena Chen (Guest) · 1080p Local
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              48kHz Lossless
            </span>
          </div>

          {/* Simulated video frame */}
          <div className="absolute inset-0 flex items-center justify-center opacity-70">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-800 to-amber-600 mx-auto flex items-center justify-center text-white text-lg font-light">
                EC
              </div>
            </div>
          </div>

          {/* Waveform footer */}
          <div className="z-10 flex items-center justify-between">
            <WaveformPreview
              bars={24}
              height={20}
              activeColor="#34D399"
              inactiveColor="#10B981/40"
              progress={0.4}
              animated
            />
            <span className="text-[10px] font-mono text-stone-400">
              -14.0 LUFS
            </span>
          </div>
        </div>

        {/* Live Editorial Caption Preview Overlay */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 rounded-md bg-[#141413]/85 backdrop-blur-md border border-white/10 text-white text-center text-sm font-serif tracking-tight shadow-xl max-w-lg">
          &ldquo;The biggest breakthrough was realizing the editor
          shouldn&apos;t be a separate tool.&rdquo;
        </div>
      </div>

      {/* Integrated Timeline Strip */}
      <div className="p-4 bg-[#FAF9F6] border-t border-[#E5E3DC] flex items-center justify-between text-xs text-[#7A7870]">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-7 h-7 rounded-full bg-[#141413] text-[#F7F6F2] flex items-center justify-center hover:bg-[#2B2A27] cursor-pointer"
            aria-label={isPlaying ? "Pause preview" : "Play preview"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>
          <span className="font-mono text-[#141413]">
            00:24:18 / 00:42:17
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-[#EFECE6] text-[11px] font-mono text-[#141413]">
            Multitrack Synchronized
          </span>
          <span className="px-2 py-0.5 rounded bg-[#EFECE6] text-[11px] font-mono text-[#141413]">
            Auto-Captions 100%
          </span>
        </div>
      </div>
    </div>
  );
};
