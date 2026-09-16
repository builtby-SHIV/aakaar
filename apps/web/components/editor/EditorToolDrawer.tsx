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
    <aside className="w-72 border-l border-[#2E3033] bg-[#1A1B1D] p-6 space-y-6 overflow-y-auto z-20 animate-fade shrink-0">
      <div className="flex items-center justify-between pb-3 border-b border-[#2E3033]">
        <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#F2F1ED]">
          {activeTool} Settings
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-[#8B8D90] hover:text-[#F2F1ED] cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* 1. LAYOUT CONTROLS */}
      {activeTool === "layout" && (
        <div className="space-y-4 text-xs">
          <div className="space-y-2">
            <label className="font-medium text-[#F2F1ED]">
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
                      ? "border-[#FA5089] bg-[#FA5089]/10 text-[#FA5089]"
                      : "border-[#2E3033] text-[#8B8D90] hover:border-[#38393C]"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#2E3033]">
            <label className="font-medium text-[#F2F1ED]">
              Reframe Margin & Padding
            </label>
            <input
              type="range"
              min="0"
              max="32"
              defaultValue="12"
              className="w-full accent-[#FA5089]"
            />
          </div>
        </div>
      )}

      {/* 2. CAPTION CONTROLS */}
      {activeTool === "captions" && (
        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-medium text-[#F2F1ED]">
              Editorial Typography
            </label>
            <select
              value={captionFont}
              onChange={(e) => setCaptionFont(e.target.value as CaptionFont)}
              className="w-full p-2 bg-[#131415] border border-[#2E3033] rounded text-[#F2F1ED]"
            >
              <option>Modern Sans</option>
              <option>Editorial Serif</option>
              <option>Monospace</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-[#F2F1ED]">
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
                      ? "border-[#FA5089] bg-[#FA5089] text-white"
                      : "border-[#2E3033] text-[#8B8D90]"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#2E3033]">
            <span className="font-medium text-[#F2F1ED]">
              Caption Text Stream
            </span>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {captions.map((cap) => (
                <div
                  key={cap.id}
                  onClick={() => onSelectCaptionTime(cap.start)}
                  className={`p-2 rounded border cursor-pointer transition-all ${
                    currentTime >= cap.start && currentTime <= cap.end
                      ? "border-[#FA5089] bg-[#FA5089]/10"
                      : "border-[#2E3033] text-[#8B8D90]"
                  }`}
                >
                  <div className="flex justify-between font-mono text-[10px] text-[#8B8D90]">
                    <span>{cap.speaker}</span>
                    <span>{formatTime(cap.start)}</span>
                  </div>
                  <p className="text-xs text-[#F2F1ED] mt-0.5">{cap.text}</p>
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
              <span className="font-medium text-[#F2F1ED]">
                Studio Background Noise Removal
              </span>
              <input
                type="checkbox"
                checked={noiseReduction}
                onChange={(e) => setNoiseReduction(e.target.checked)}
                className="accent-[#FA5089] w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-[#F2F1ED]">
                Auto Ducking on Cross-talk
              </span>
              <input
                type="checkbox"
                checked={autoDucking}
                onChange={(e) => setAutoDucking(e.target.checked)}
                className="accent-[#FA5089] w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-[#F2F1ED]">
                Automatic -14 LUFS Leveling
              </span>
              <input
                type="checkbox"
                checked={studioLeveling}
                onChange={(e) => setStudioLeveling(e.target.checked)}
                className="accent-[#FA5089] w-4 h-4 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#2E3033]">
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px] text-[#F2F1ED]">
                <span>Host Channel Gain</span>
                <span>{hostVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={hostVolume}
                onChange={(e) => setHostVolume(Number(e.target.value))}
                className="w-full accent-[#FA5089]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px] text-[#F2F1ED]">
                <span>Guest Channel Gain</span>
                <span>{guestVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={guestVolume}
                onChange={(e) => setGuestVolume(Number(e.target.value))}
                className="w-full accent-[#FA5089]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. BRAND CONTROLS */}
      {activeTool === "brand" && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#F2F1ED]">
              Show Corner Watermark
            </span>
            <input
              type="checkbox"
              checked={showWatermark}
              onChange={(e) => setShowWatermark(e.target.checked)}
              className="accent-[#FA5089] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-[#F2F1ED]">
              Watermark Label
            </label>
            <input
              type="text"
              defaultValue="AAKAAR EP.14"
              className="w-full p-2 bg-[#131415] border border-[#2E3033] rounded text-[#F2F1ED] font-mono text-xs"
            />
          </div>
        </div>
      )}

      {/* 5. CLIPS & SOCIAL REFRAMING */}
      {activeTool === "clips" && (
        <div className="space-y-4 text-xs">
          <p className="text-[#8B8D90] leading-relaxed">
            Extract reframed 9:16 vertical clips from active speaker segments.
          </p>

          <div className="p-3 bg-[#131415] border border-[#2E3033] rounded-lg space-y-2">
            <div className="flex justify-between font-mono text-[11px] text-[#8B8D90]">
              <span>Suggested Highlight</span>
              <span>14s</span>
            </div>
            <p className="font-medium text-[#F2F1ED]">
              &ldquo;The moment you force creators to download twenty
              gigabytes...&rdquo;
            </p>
            <button
              type="button"
              onClick={onFormatReel}
              className="w-full py-1.5 bg-[#FA5089] text-white rounded text-xs font-medium hover:bg-[#E8457B] transition-all cursor-pointer"
            >
              Format as 9:16 Reel
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
