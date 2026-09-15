"use client";

import { MicOff } from "lucide-react";
import React from "react";
import { WaveformPreview } from "../WaveformPreview";
import { StudioState } from "./types";

interface StudioLiveStageProps {
  studioState: StudioState;
  micMuted: boolean;
  camOff: boolean;
}

export const StudioLiveStage: React.FC<StudioLiveStageProps> = ({
  studioState,
  micMuted,
  camOff,
}) => {
  return (
    <div className="w-full h-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
      {/* Host Video Frame */}
      <div className="relative w-full aspect-video rounded-xl bg-[#1A1B1D] border border-[#2E3033] p-4 flex flex-col justify-between overflow-hidden shadow-lg">
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#131415]/80 backdrop-blur text-xs font-medium text-white">
              Alex Rivers (Host)
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
              1080p Local
            </span>
          </div>
          {micMuted && (
            <span className="p-1 rounded bg-[#EF4444]/20 text-[#EF4444] text-[10px] font-mono flex items-center gap-1">
              <MicOff className="w-3 h-3" /> Muted
            </span>
          )}
        </div>

        {/* Host Visual Avatar / Stream */}
        <div className="absolute inset-0 flex items-center justify-center">
          {camOff ? (
            <div className="text-center text-xs font-mono text-[#8B8D90]">
              Camera Off
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#38393C] to-[#6B6D70] flex items-center justify-center text-white text-xl font-light">
              AR
            </div>
          )}
        </div>

        {/* Host Live Waveform */}
        <div className="z-10 flex items-center justify-between pt-2">
          <WaveformPreview
            bars={28}
            height={18}
            activeColor="#60A5FA"
            inactiveColor="#3B82F6/30"
            progress={micMuted ? 0 : 0.65}
            animated={!micMuted && studioState === "recording"}
          />
          <span className="text-[10px] font-mono text-[#6B6D70]">
            48 kHz · 24-bit
          </span>
        </div>
      </div>

      {/* Guest Video Frame */}
      <div className="relative w-full aspect-video rounded-xl bg-[#1A1B1D] border border-[#2E3033] p-4 flex flex-col justify-between overflow-hidden shadow-lg">
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#131415]/80 backdrop-blur text-xs font-medium text-white">
              Elena Chen (Guest)
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
              1080p Local
            </span>
          </div>
        </div>

        {/* Guest Visual Avatar / Stream */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] flex items-center justify-center text-white text-xl font-light">
            EC
          </div>
        </div>

        {/* Guest Live Waveform */}
        <div className="z-10 flex items-center justify-between pt-2">
          <WaveformPreview
            bars={28}
            height={18}
            activeColor="#34D399"
            inactiveColor="#10B981/30"
            progress={0.5}
            animated={studioState === "recording"}
          />
          <span className="text-[10px] font-mono text-[#6B6D70]">
            48 kHz · 24-bit
          </span>
        </div>
      </div>
    </div>
  );
};
