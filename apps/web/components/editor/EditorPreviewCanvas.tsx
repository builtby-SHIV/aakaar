"use client";

import { Pause, Play } from "lucide-react";
import React from "react";
import { WaveformPreview } from "../WaveformPreview";
import { AspectRatio, CaptionItem, CaptionPosition, LayoutMode } from "./types";

interface EditorPreviewCanvasProps {
  aspectRatio: AspectRatio;
  layoutMode: LayoutMode;
  showWatermark: boolean;
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  currentCaption?: CaptionItem;
  captionPosition: CaptionPosition;
  onTogglePlay: () => void;
}

export const EditorPreviewCanvas: React.FC<EditorPreviewCanvasProps> = ({
  aspectRatio,
  layoutMode,
  showWatermark,
  isPlaying,
  currentTime,
  totalDuration,
  currentCaption,
  captionPosition,
  onTogglePlay,
}) => {
  return (
    <main className="flex-1 bg-[#141413] flex items-center justify-center p-6 relative overflow-hidden">
      <div
        className={`transition-all duration-300 relative rounded-xl overflow-hidden border border-[#33322E] bg-[#1A1917] shadow-2xl flex flex-col justify-between group ${
          aspectRatio === "16:9"
            ? "w-full max-w-4xl aspect-video"
            : aspectRatio === "9:16"
              ? "h-full max-h-[82vh] aspect-[9/16]"
              : "w-full max-w-lg aspect-square"
        }`}
      >
        {/* Top Watermark / Brand Badge */}
        {showWatermark && (
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-2.5 py-1 rounded bg-[#141413]/70 backdrop-blur-md border border-white/10 text-white text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>AAKAAR EP.14</span>
          </div>
        )}

        {/* Video Canvas Central Play Button Overlay */}
        <button
          type="button"
          onClick={onTogglePlay}
          className={`absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-opacity cursor-pointer ${
            isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
          }`}
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          <div className="w-16 h-16 rounded-full bg-[#141413]/90 border border-white/25 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
            {isPlaying ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7 ml-1" />
            )}
          </div>
        </button>

        {/* Video Streams based on layoutMode */}
        <div className="w-full h-full p-3 flex gap-3 items-center justify-center relative">
          {layoutMode === "split" && (
            <div className="w-full h-full grid grid-cols-2 gap-3">
              {/* Host Screen */}
              <div className="h-full rounded-lg bg-[#22211E] border border-[#33322E] flex flex-col justify-between p-3 relative overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-mono text-stone-300">
                    Alex Rivers (Host)
                  </span>
                  <span className="text-[10px] font-mono text-blue-400">
                    1080p Local
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-stone-700 to-stone-500 flex items-center justify-center text-white text-lg font-light shadow-md">
                    AR
                  </div>
                </div>
                <div className="z-10 flex items-center justify-between">
                  <WaveformPreview
                    bars={18}
                    height={14}
                    activeColor="#60A5FA"
                    inactiveColor="#3B82F6/30"
                    progress={currentTime / totalDuration}
                    animated={isPlaying}
                  />
                  <span className="text-[10px] font-mono text-stone-400">
                    -14 LUFS
                  </span>
                </div>
              </div>

              {/* Guest Screen */}
              <div className="h-full rounded-lg bg-[#22211E] border border-[#33322E] flex flex-col justify-between p-3 relative overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-mono text-stone-300">
                    Elena Chen (Guest)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    1080p Local
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-800 to-amber-600 flex items-center justify-center text-white text-lg font-light shadow-md">
                    EC
                  </div>
                </div>
                <div className="z-10 flex items-center justify-between">
                  <WaveformPreview
                    bars={18}
                    height={14}
                    activeColor="#34D399"
                    inactiveColor="#10B981/30"
                    progress={currentTime / totalDuration}
                    animated={isPlaying}
                  />
                  <span className="text-[10px] font-mono text-stone-400">
                    -14 LUFS
                  </span>
                </div>
              </div>
            </div>
          )}

          {layoutMode === "host" && (
            <div className="w-full h-full rounded-lg bg-[#22211E] border border-[#33322E] flex flex-col justify-between p-4 relative overflow-hidden">
              <span className="text-xs font-mono text-stone-300 z-10">
                Alex Rivers (Speaker Focus)
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-stone-700 to-stone-500 flex items-center justify-center text-white text-2xl font-light">
                  AR
                </div>
              </div>
              <div className="z-10 flex items-center justify-between">
                <WaveformPreview
                  bars={24}
                  height={14}
                  activeColor="#60A5FA"
                  inactiveColor="#3B82F6/30"
                  progress={currentTime / totalDuration}
                  animated={isPlaying}
                />
              </div>
            </div>
          )}

          {layoutMode === "guest" && (
            <div className="w-full h-full rounded-lg bg-[#22211E] border border-[#33322E] flex flex-col justify-between p-4 relative overflow-hidden">
              <span className="text-xs font-mono text-stone-300 z-10">
                Elena Chen (Speaker Focus)
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-800 to-amber-600 flex items-center justify-center text-white text-2xl font-light">
                  EC
                </div>
              </div>
              <div className="z-10 flex items-center justify-between">
                <WaveformPreview
                  bars={24}
                  height={14}
                  activeColor="#34D399"
                  inactiveColor="#10B981/30"
                  progress={currentTime / totalDuration}
                  animated={isPlaying}
                />
              </div>
            </div>
          )}

          {layoutMode === "pip" && (
            <div className="w-full h-full rounded-lg bg-[#22211E] border border-[#33322E] p-4 relative overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-stone-700 to-stone-500 flex items-center justify-center text-white text-xl">
                  AR
                </div>
              </div>

              {/* PiP Overlay */}
              <div className="absolute bottom-4 right-4 w-36 aspect-video rounded-md bg-stone-900 border border-stone-600 flex items-center justify-center shadow-xl">
                <span className="text-[10px] font-mono text-stone-300">
                  Elena Chen (Guest)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Live Burned-in Caption Overlay */}
        {currentCaption && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-lg bg-[#141413]/85 backdrop-blur-md border border-white/10 text-white text-center shadow-2xl max-w-[85%] z-20 transition-all ${
              captionPosition === "bottom"
                ? "bottom-8"
                : captionPosition === "middle"
                  ? "top-1/2 -translate-y-1/2"
                  : "top-8"
            }`}
          >
            <p className="text-sm sm:text-base font-normal tracking-tight leading-snug">
              <span className="text-amber-400 font-medium mr-1.5 font-mono text-xs">
                [{currentCaption.speaker}]:
              </span>
              &ldquo;{currentCaption.text}&rdquo;
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
