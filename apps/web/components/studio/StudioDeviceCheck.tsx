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
    <div className="max-w-xl w-full bg-[#1A1917] border border-[#2A2926] rounded-2xl p-8 space-y-6 shadow-2xl animate-kanso-fade">
      <div className="space-y-1">
        <span className="text-[11px] uppercase tracking-widest font-mono text-[#7A7870]">
          Pre-flight Check
        </span>
        <h2 className="text-2xl font-normal text-white tracking-tight">
          Enter Recording Studio
        </h2>
        <p className="text-xs text-[#7A7870]">
          Check your camera and microphone levels before going live.
        </p>
      </div>

      {/* Camera Preview */}
      <div className="relative aspect-video rounded-xl bg-[#22211E] border border-[#33322E] flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-stone-700 to-stone-500 mx-auto flex items-center justify-center text-white text-lg font-light">
            AR
          </div>
          <div className="text-xs font-mono text-stone-400">
            Camera Feed (1080p 60fps)
          </div>
        </div>

        <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-[#141413]/80 backdrop-blur text-[10px] font-mono text-white/80">
          Alex Rivers · Host
        </div>
      </div>

      {/* Live Audio Meter */}
      <div className="p-3.5 rounded-lg bg-[#22211E] border border-[#33322E] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-stone-300">
          <Mic className="w-4 h-4 text-emerald-400" />
          <span>Microphone Signal Level</span>
        </div>
        <WaveformPreview
          bars={24}
          height={18}
          activeColor="#2B7A4B"
          inactiveColor="#44423C"
          progress={0.7}
          animated
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onOpenSettings}
          className="text-xs text-[#7A7870] hover:text-white flex items-center gap-1.5 cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Audio/Video Settings</span>
        </button>

        <button
          type="button"
          onClick={onJoinStudio}
          className="px-6 py-2.5 bg-white text-[#141413] font-medium text-xs rounded-md hover:bg-stone-200 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <span>Join Studio Room</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
