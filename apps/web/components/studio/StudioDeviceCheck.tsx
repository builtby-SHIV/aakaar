"use client";

import { ArrowRight, Mic, Settings } from "lucide-react";
import React from "react";
import { WaveformPreview } from "../WaveformPreview";

interface StudioDeviceCheckProps {
  onOpenSettings: () => void;
  onJoinStudio: () => void;
}

export const StudioDeviceCheck: React.FC<StudioDeviceCheckProps> = ({
  onOpenSettings,
  onJoinStudio,
}) => {
  return (
    <div className="max-w-xl w-full bg-[#1A1B1D] border border-[#2E3033] rounded-2xl p-8 space-y-6 shadow-2xl animate-fade">
      <div className="space-y-1">
        <span className="text-[11px] uppercase tracking-widest font-mono text-[#8B8D90]">
          Pre-flight Check
        </span>
        <h2 className="text-2xl font-normal text-white tracking-tight">
          Enter Recording Studio
        </h2>
        <p className="text-xs text-[#8B8D90]">
          Check your camera and microphone levels before going live.
        </p>
      </div>

      {/* Camera Preview */}
      <div className="relative aspect-video rounded-xl bg-[#1E1F21] border border-[#2E3033] flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#38393C] to-[#6B6D70] mx-auto flex items-center justify-center text-white text-lg font-light">
            AR
          </div>
          <div className="text-xs font-mono text-[#8B8D90]">
            Camera Feed (1080p 60fps)
          </div>
        </div>

        <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-[#131415]/80 backdrop-blur text-[10px] font-mono text-white/80">
          Alex Rivers · Host
        </div>
      </div>

      {/* Live Audio Meter */}
      <div className="p-3.5 rounded-lg bg-[#1E1F21] border border-[#2E3033] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-[#C0C1C3]">
          <Mic className="w-4 h-4 text-emerald-400" />
          <span>Microphone Signal Level</span>
        </div>
        <WaveformPreview
          bars={24}
          height={18}
          activeColor="#2B7A4B"
          inactiveColor="#2E3033"
          progress={0.7}
          animated
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onOpenSettings}
          className="text-xs text-[#8B8D90] hover:text-white flex items-center gap-1.5 cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Audio/Video Settings</span>
        </button>

        <button
          type="button"
          onClick={onJoinStudio}
          className="px-6 py-2.5 bg-[#FA5089] text-white font-medium text-xs rounded-md hover:bg-[#E8457B] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <span>Join Studio Room</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
