"use client";

import { Pause, Play, RotateCcw, Scissors, ZoomIn, ZoomOut } from "lucide-react";
import React from "react";
import { WaveformPreview } from "../WaveformPreview";
import { CaptionItem } from "./types";

interface EditorTimelineProps {
  timelineRef: React.RefObject<HTMLDivElement | null>;
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  zoomLevel: number;
  captions: CaptionItem[];
  onTogglePlay: () => void;
  onResetTime: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  formatTime: (sec: number) => string;
}

export const EditorTimeline: React.FC<EditorTimelineProps> = ({
  timelineRef,
  isPlaying,
  currentTime,
  totalDuration,
  zoomLevel,
  captions,
  onTogglePlay,
  onResetTime,
  onZoomIn,
  onZoomOut,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  formatTime,
}) => {
  return (
    <footer className="h-64 border-t border-[#2E3033] bg-[#1A1B1D] flex flex-col justify-between z-30 shrink-0">
      {/* Timeline Header Toolbar */}
      <div className="h-10 px-6 border-b border-[#2E3033] bg-[#131415] flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onTogglePlay}
            className="w-7 h-7 rounded-full bg-[#FA5089] text-white flex items-center justify-center hover:bg-[#E8457B] transition-colors cursor-pointer"
            title={isPlaying ? "Pause (Space)" : "Play (Space)"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={onResetTime}
            className="p-1 rounded text-[#8B8D90] hover:text-[#F2F1ED] cursor-pointer"
            title="Return to Start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-xs text-[#F2F1ED] num-tabular font-medium">
            {formatTime(currentTime)}{" "}
            <span className="text-[#6B6D70]">
              / {formatTime(totalDuration)}
            </span>
          </span>
        </div>

        {/* Timeline Zoom & Split */}
        <div className="flex items-center gap-4 text-[#8B8D90]">
          <button
            type="button"
            onClick={() =>
              alert(
                "Split clip created at playhead timestamp: " +
                  formatTime(currentTime),
              )
            }
            className="flex items-center gap-1 hover:text-[#F2F1ED] px-2 py-1 rounded hover:bg-[#242628] text-xs cursor-pointer"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Split (S)</span>
          </button>

          <div className="flex items-center gap-1 border-l border-[#2E3033] pl-3">
            <button
              type="button"
              onClick={onZoomOut}
              className="p-1 hover:text-[#F2F1ED] cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[10px] w-8 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={onZoomIn}
              className="p-1 hover:text-[#F2F1ED] cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Multitrack Timeline Tracks Area */}
      <div
        ref={timelineRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex-1 p-4 overflow-x-auto relative flex flex-col justify-center space-y-2 cursor-ew-resize select-none touch-none group"
      >
        {/* Draggable Smooth Playhead Needle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#EF4444] z-30 pointer-events-none will-change-transform"
          style={{
            left: `${Math.min(100, Math.max(0, (currentTime / totalDuration) * 100))}%`,
            transition: "none",
          }}
        >
          {/* Top Playhead Scrubber Handle */}
          <div className="absolute -top-1.5 -left-2 w-4 h-4 bg-[#EF4444] text-white rounded-full flex items-center justify-center shadow-md ring-2 ring-[#131415] transition-transform group-hover:scale-110">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>

          {/* Timecode tooltip */}
          <div className="absolute -top-7 -left-7 px-1.5 py-0.5 rounded bg-[#242628] text-white text-[9px] font-mono whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Track 1: Host Video Stream */}
        <div className="h-8 rounded bg-[#1E3A5F]/20 border border-[#3B82F6]/30 px-3 flex items-center justify-between text-xs font-mono text-[#60A5FA]">
          <span className="text-[10px] font-medium">
            Host Video (1080p ProRes)
          </span>
          <span className="text-[10px] text-[#60A5FA]">Alex Rivers</span>
        </div>

        {/* Track 2: Guest Video Stream */}
        <div className="h-8 rounded bg-[#164E3B]/20 border border-[#10B981]/30 px-3 flex items-center justify-between text-xs font-mono text-[#34D399]">
          <span className="text-[10px] font-medium">
            Guest Video (1080p ProRes)
          </span>
          <span className="text-[10px] text-[#34D399]">Elena Chen</span>
        </div>

        {/* Track 3: Master Lossless Audio Waveform */}
        <div className="h-10 rounded bg-[#1A1B1D] border border-[#2E3033] px-2 flex items-center overflow-hidden">
          <WaveformPreview
            bars={120}
            height={28}
            activeColor="#FA5089"
            inactiveColor="#2E3033"
            progress={currentTime / totalDuration}
            animated={isPlaying}
          />
        </div>

        {/* Track 4: Timed Captions Track */}
        <div className="h-6 rounded bg-[#78350F]/15 border border-[#D97706]/25 px-2 flex items-center gap-2 overflow-hidden text-[10px] font-mono text-[#FBBF24]">
          {captions.map((cap) => (
            <span
              key={cap.id}
              className="px-2 py-0.5 rounded bg-[#78350F]/30 truncate max-w-[200px]"
            >
              {cap.text}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};
