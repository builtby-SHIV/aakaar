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
    <header className="h-14 px-6 border-b border-[#E5E3DC] bg-[#FFFFFF] flex items-center justify-between z-30 shrink-0">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="p-1.5 rounded-md text-[#7A7870] hover:text-[#141413] hover:bg-[#F2F0EB] transition-colors"
          title="Back to Projects"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#141413]">
              {projectId.toUpperCase()} — Spatial Audio & Local First
              Architecture
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
              1080p Synced
            </span>
          </div>
        </div>
      </div>

      {/* Center: Aspect Ratio & Layout Preset */}
      <div className="flex items-center gap-1.5 bg-[#FAF9F6] border border-[#E5E3DC] p-1 rounded-lg">
        <button
          type="button"
          onClick={() => onAspectRatioChange("16:9")}
          className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            aspectRatio === "16:9"
              ? "bg-[#141413] text-[#F7F6F2] shadow-2xs"
              : "text-[#7A7870] hover:text-[#141413]"
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
              ? "bg-[#141413] text-[#F7F6F2] shadow-2xs"
              : "text-[#7A7870] hover:text-[#141413]"
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
              ? "bg-[#141413] text-[#F7F6F2] shadow-2xs"
              : "text-[#7A7870] hover:text-[#141413]"
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
          className="px-4 py-2 bg-[#141413] text-[#F7F6F2] rounded-md text-xs font-medium hover:bg-[#2B2A27] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Master</span>
        </button>
      </div>
    </header>
  );
};
