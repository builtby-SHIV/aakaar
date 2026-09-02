"use client";

import React from "react";
import {
  ActiveTool,
  AspectRatio,
  CaptionFont,
  CaptionItem,
  CaptionPosition,
  LayoutMode,
} from "./types";

interface EditorToolDrawerProps {
  activeTool: ActiveTool;
  onClose: () => void;
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  captionFont: CaptionFont;
  setCaptionFont: (font: CaptionFont) => void;
  captionPosition: CaptionPosition;
  setCaptionPosition: (pos: CaptionPosition) => void;
  captions: CaptionItem[];
  currentTime: number;
  onSelectCaptionTime: (time: number) => void;
  noiseReduction: boolean;
  setNoiseReduction: (val: boolean) => void;
  autoDucking: boolean;
  setAutoDucking: (val: boolean) => void;
  studioLeveling: boolean;
  setStudioLeveling: (val: boolean) => void;
  hostVolume: number;
  setHostVolume: (val: number) => void;
  guestVolume: number;
  setGuestVolume: (val: number) => void;
  showWatermark: boolean;
  setShowWatermark: (val: boolean) => void;
  onFormatReel: () => void;
  formatTime: (sec: number) => string;
}

export const EditorToolDrawer: React.FC<EditorToolDrawerProps> = ({
  activeTool,
  onClose,
  layoutMode,
  setLayoutMode,
  captionFont,
  setCaptionFont,
  captionPosition,
  setCaptionPosition,
  captions,
  currentTime,
  onSelectCaptionTime,
  noiseReduction,
  setNoiseReduction,
  autoDucking,
  setAutoDucking,
  studioLeveling,
  setStudioLeveling,
  hostVolume,
  setHostVolume,
  guestVolume,
  setGuestVolume,
  showWatermark,
  setShowWatermark,
  onFormatReel,
  formatTime,
}) => {
  if (!activeTool) return null;

  return (
    <aside className="w-72 border-l border-[#E5E3DC] bg-[#FFFFFF] p-6 space-y-6 overflow-y-auto z-20 animate-kanso-fade shrink-0">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DC]">
        <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#141413]">
          {activeTool} Settings
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-[#7A7870] hover:text-[#141413] cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* 1. LAYOUT CONTROLS */}
      {activeTool === "layout" && (
        <div className="space-y-4 text-xs">
          <div className="space-y-2">
            <label className="font-medium text-[#141413]">
              Camera Framing Preset
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "split", label: "Side by Side" },
                { id: "host", label: "Host Focus" },
                { id: "guest", label: "Guest Focus" },
                { id: "pip", label: "Picture in Picture" },
              ].map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setLayoutMode(mode.id as LayoutMode)}
                  className={`p-2.5 rounded-md border text-left font-medium transition-all cursor-pointer ${
                    layoutMode === mode.id
                      ? "border-[#141413] bg-[#FAF9F6] text-[#141413]"
                      : "border-[#E5E3DC] text-[#7A7870] hover:border-[#D1CEC5]"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E5E3DC]">
            <label className="font-medium text-[#141413]">
              Reframe Margin & Padding
            </label>
            <input
              type="range"
              min="0"
              max="32"
              defaultValue="12"
              className="w-full accent-[#141413]"
            />
          </div>
        </div>
      )}

      {/* 2. CAPTION CONTROLS */}
      {activeTool === "captions" && (
        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-medium text-[#141413]">
              Editorial Typography
            </label>
            <select
              value={captionFont}
              onChange={(e) => setCaptionFont(e.target.value as CaptionFont)}
              className="w-full p-2 bg-[#FAF9F6] border border-[#E5E3DC] rounded text-[#141413]"
            >
              <option>Modern Sans</option>
              <option>Editorial Serif</option>
              <option>Monospace</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-[#141413]">
              Vertical Position
            </label>
            <div className="flex gap-2">
              {(["top", "middle", "bottom"] as const).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setCaptionPosition(pos)}
                  className={`flex-1 py-1.5 rounded border capitalize cursor-pointer ${
                    captionPosition === pos
                      ? "border-[#141413] bg-[#141413] text-[#F7F6F2]"
                      : "border-[#E5E3DC] text-[#7A7870]"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E5E3DC]">
            <span className="font-medium text-[#141413]">
              Caption Text Stream
            </span>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {captions.map((cap) => (
                <div
                  key={cap.id}
                  onClick={() => onSelectCaptionTime(cap.start)}
                  className={`p-2 rounded border cursor-pointer transition-all ${
                    currentTime >= cap.start && currentTime <= cap.end
                      ? "border-[#141413] bg-[#FAF9F6]"
                      : "border-[#E5E3DC] text-[#7A7870]"
                  }`}
                >
                  <div className="flex justify-between font-mono text-[10px] text-stone-400">
                    <span>{cap.speaker}</span>
                    <span>{formatTime(cap.start)}</span>
                  </div>
                  <p className="text-xs text-[#141413] mt-0.5">{cap.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. AUDIO CONTROLS */}
      {activeTool === "audio" && (
        <div className="space-y-4 text-xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#141413]">
                Studio Background Noise Removal
              </span>
              <input
                type="checkbox"
                checked={noiseReduction}
                onChange={(e) => setNoiseReduction(e.target.checked)}
                className="accent-[#141413] w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-[#141413]">
                Auto Ducking on Cross-talk
              </span>
              <input
                type="checkbox"
                checked={autoDucking}
                onChange={(e) => setAutoDucking(e.target.checked)}
                className="accent-[#141413] w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-[#141413]">
                Automatic -14 LUFS Leveling
              </span>
              <input
                type="checkbox"
                checked={studioLeveling}
                onChange={(e) => setStudioLeveling(e.target.checked)}
                className="accent-[#141413] w-4 h-4 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#E5E3DC]">
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span>Host Channel Gain</span>
                <span>{hostVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={hostVolume}
                onChange={(e) => setHostVolume(Number(e.target.value))}
                className="w-full accent-[#141413]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span>Guest Channel Gain</span>
                <span>{guestVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={guestVolume}
                onChange={(e) => setGuestVolume(Number(e.target.value))}
                className="w-full accent-[#141413]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. BRAND CONTROLS */}
      {activeTool === "brand" && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#141413]">
              Show Corner Watermark
            </span>
            <input
              type="checkbox"
              checked={showWatermark}
              onChange={(e) => setShowWatermark(e.target.checked)}
              className="accent-[#141413] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-[#141413]">
              Watermark Label
            </label>
            <input
              type="text"
              defaultValue="AAKAAR EP.14"
              className="w-full p-2 bg-[#FAF9F6] border border-[#E5E3DC] rounded text-[#141413] font-mono text-xs"
            />
          </div>
        </div>
      )}

      {/* 5. CLIPS & SOCIAL REFRAMING */}
      {activeTool === "clips" && (
        <div className="space-y-4 text-xs">
          <p className="text-[#7A7870] leading-relaxed">
            Extract reframed 9:16 vertical clips from active speaker segments.
          </p>

          <div className="p-3 bg-[#FAF9F6] border border-[#E5E3DC] rounded-lg space-y-2">
            <div className="flex justify-between font-mono text-[11px] text-[#7A7870]">
              <span>Suggested Highlight</span>
              <span>14s</span>
            </div>
            <p className="font-medium text-[#141413]">
              &ldquo;The moment you force creators to download twenty
              gigabytes...&rdquo;
            </p>
            <button
              type="button"
              onClick={onFormatReel}
              className="w-full py-1.5 bg-[#141413] text-[#F7F6F2] rounded text-xs font-medium hover:bg-[#2B2A27] transition-all cursor-pointer"
            >
              Format as 9:16 Reel
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
