"use client";

import { ChevronLeft, Download, Smartphone, Square, Video } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AspectRatio } from "./types";

interface EditorHeaderProps {
  projectId: string;
  aspectRatio: AspectRatio;
  onAspectRatioChange: (ratio: AspectRatio) => void;
  onExport: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  projectId,
  aspectRatio,
  onAspectRatioChange,
  onExport,
}) => {
  return (
    <header className="h-14 px-6 border-b border-[#2E3033] bg-[#1A1B1D] flex items-center justify-between z-30 shrink-0">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="p-1.5 rounded-md text-[#8B8D90] hover:text-[#F2F1ED] hover:bg-[#242628] transition-colors"
          title="Back to Projects"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#F2F1ED]">
              {projectId.toUpperCase()} — Spatial Audio & Local First
              Architecture
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-500/20">
              1080p Synced
            </span>
          </div>
        </div>
      </div>

      {/* Center: Aspect Ratio & Layout Preset */}
      <div className="flex items-center gap-1.5 bg-[#1A1B1D] border border-[#2E3033] p-1 rounded-lg">
        <button
          type="button"
          onClick={() => onAspectRatioChange("16:9")}
          className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            aspectRatio === "16:9"
              ? "bg-[#FA5089] text-white shadow-2xs"
              : "text-[#8B8D90] hover:text-[#F2F1ED]"
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>16:9 Master</span>
        </button>

        <button
          type="button"
          onClick={() => onAspectRatioChange("9:16")}
          className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            aspectRatio === "9:16"
              ? "bg-[#FA5089] text-white shadow-2xs"
              : "text-[#8B8D90] hover:text-[#F2F1ED]"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>9:16 Reel</span>
        </button>

        <button
          type="button"
          onClick={() => onAspectRatioChange("1:1")}
          className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            aspectRatio === "1:1"
              ? "bg-[#FA5089] text-white shadow-2xs"
              : "text-[#8B8D90] hover:text-[#F2F1ED]"
          }`}
        >
          <Square className="w-3.5 h-3.5" />
          <span>1:1 Square</span>
        </button>
      </div>

      {/* Right: Export Master */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onExport}
          className="px-4 py-2 bg-[#FA5089] text-white rounded-md text-xs font-medium hover:bg-[#E8457B] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Master</span>
        </button>
      </div>
    </header>
  );
};
