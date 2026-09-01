"use client";

import {
  ChevronLeft,
  Download,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Scissors,
  Smartphone,
  Sparkles,
  Square,
  Type,
  Video,
  Volume2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import { ExportModal } from "../../../components/ExportModal";
import { WaveformPreview } from "../../../components/WaveformPreview";

type AspectRatio = "16:9" | "9:16" | "1:1";
type LayoutMode = "split" | "host" | "guest" | "pip";
type ActiveTool = "layout" | "captions" | "audio" | "brand" | "clips" | null;

interface CaptionItem {
  id: string;
  start: number;
  end: number;
  speaker: string;
  text: string;
}

const INITIAL_CAPTIONS: CaptionItem[] = [
  {
    id: "cap-1",
    start: 0,
    end: 4.5,
    speaker: "Alex Rivers",
    text: "Welcome back to Aakaar. Today we are discussing why creator workflows are so fragmented.",
  },
  {
    id: "cap-2",
    start: 4.8,
    end: 9.2,
    speaker: "Elena Chen",
    text: "The moment you force creators to download twenty gigabytes of unstitched tracks, momentum dies.",
  },
  {
    id: "cap-3",
    start: 9.5,
    end: 15.0,
    speaker: "Alex Rivers",
    text: "Exactly. By recording raw tracks locally and assembling the timeline in-tab, the turnaround is instant.",
  },
  {
    id: "cap-4",
    start: 15.3,
    end: 22.0,
    speaker: "Elena Chen",
    text: "And having editorial typography auto-synced means I don't need third party subtitle tools anymore.",
  },
  {
    id: "cap-5",
    start: 22.5,
    end: 42.28,
    speaker: "Alex Rivers",
    text: "That is the Kanso philosophy: removing friction so only the storytelling remains.",
  },
];

export default function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id || "ep-14";

  // Timeline & Playback Clock
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // In seconds
  const totalDuration = 42.28; // In seconds
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState<string | null>("host");

  // Editing State
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("split");
  const [activeTool, setActiveTool] = useState<ActiveTool>("layout");

  // Captions State
  const [captions, setCaptions] = useState<CaptionItem[]>(INITIAL_CAPTIONS);
  const [captionFont, setCaptionFont] = useState<
    "Editorial Serif" | "Modern Sans" | "Monospace"
  >("Modern Sans");
  const [captionPosition, setCaptionPosition] = useState<
    "bottom" | "middle" | "top"
  >("bottom");
  const [captionHighlightColor, setCaptionHighlightColor] = useState("#F59E0B");

  // Audio State
  const [noiseReduction, setNoiseReduction] = useState(true);
  const [autoDucking, setAutoDucking] = useState(true);
  const [studioLeveling, setStudioLeveling] = useState(true);
  const [hostVolume, setHostVolume] = useState(85);
  const [guestVolume, setGuestVolume] = useState(90);

  // Brand Kit
  const [showWatermark, setShowWatermark] = useState(true);
  const [brandColor, setBrandColor] = useState("#141413");

  // Export Modal
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Smooth Scrubber Pointer Dragging Refs
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const currentTimeRef = useRef(currentTime);
  currentTimeRef.current = currentTime;

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const isScrubbingRef = useRef(isScrubbing);
  isScrubbingRef.current = isScrubbing;

  const togglePlay = () => {
    setIsPlaying((prev) => {
      if (!prev && currentTimeRef.current >= totalDuration) {
        currentTimeRef.current = 0;
        setCurrentTime(0);
      }
      return !prev;
    });
  };

  const seekFromPointer = (clientX: number) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = Number((percentage * totalDuration).toFixed(2));
    currentTimeRef.current = targetTime;
    setCurrentTime(targetTime);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsScrubbing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    seekFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isScrubbing) {
      seekFromPointer(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isScrubbing) {
      setIsScrubbing(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // High-Precision Absolute Playback Clock Loop
  useEffect(() => {
    if (!isPlaying || isScrubbing) return;

    let animId: number;
    const startPerf = performance.now();
    const startCurrentTime = currentTimeRef.current;

    const tick = (now: number) => {
      if (isScrubbingRef.current) return;

      const elapsed = (now - startPerf) / 1000;
      const nextTime = startCurrentTime + elapsed;

      if (nextTime >= totalDuration) {
        currentTimeRef.current = totalDuration;
        setCurrentTime(totalDuration);
        setIsPlaying(false);
        return;
      }

      currentTimeRef.current = nextTime;
      setCurrentTime(nextTime);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isScrubbing, totalDuration]);

  // Global Keyboard Spacebar Listener for Play/Pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        )
      ) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Current Active Caption
  const currentCaption = captions.find(
    (c) => currentTime >= c.start && currentTime <= c.end,
  );

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 10);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms}`;
  };

  return (
    <div className="h-screen w-screen bg-[#F7F6F2] text-[#141413] flex flex-col justify-between overflow-hidden select-none">
      {/* 1. TOP EDITORIAL BAR */}
      <header className="h-14 px-6 border-b border-[#E5E3DC] bg-[#FFFFFF] flex items-center justify-between z-30">
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
            onClick={() => setAspectRatio("16:9")}
            className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
              aspectRatio === "16:9"
                ? "bg-[#141413] text-[#F7F6F2] shadow-2xs"
                : "text-[#7A7870] hover:text-[#141413]"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>16:9 Master</span>
          </button>

          <button
            onClick={() => setAspectRatio("9:16")}
            className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
              aspectRatio === "9:16"
                ? "bg-[#141413] text-[#F7F6F2] shadow-2xs"
                : "text-[#7A7870] hover:text-[#141413]"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>9:16 Reel</span>
          </button>

          <button
            onClick={() => setAspectRatio("1:1")}
            className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
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
            onClick={() => setIsExportOpen(true)}
            className="px-4 py-2 bg-[#141413] text-[#F7F6F2] rounded-md text-xs font-medium hover:bg-[#2B2A27] transition-all flex items-center gap-2 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Master</span>
          </button>
        </div>
      </header>

      {/* 2. MIDDLE WORKSPACE: LEFT RAIL + VIDEO CANVAS + RIGHT CONTEXTUAL PANEL */}
      <div className="flex-1 flex overflow-hidden">
        {/* A. LEFT TOOL RAIL */}
        <aside className="w-16 border-r border-[#E5E3DC] bg-[#FFFFFF] flex flex-col items-center py-4 gap-4 z-20">
          {[
            { id: "layout", icon: Layers, label: "Layout" },
            { id: "captions", icon: Type, label: "Captions" },
            { id: "audio", icon: Volume2, label: "Audio" },
            { id: "brand", icon: Sparkles, label: "Brand" },
            { id: "clips", icon: Smartphone, label: "Clips" },
          ].map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() =>
                  setActiveTool(isActive ? null : (tool.id as ActiveTool))
                }
                className={`w-11 h-11 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                  isActive
                    ? "bg-[#141413] text-[#F7F6F2] shadow-sm"
                    : "text-[#7A7870] hover:bg-[#F2F0EB] hover:text-[#141413]"
                }`}
                title={tool.label}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-mono leading-none">
                  {tool.label}
                </span>
              </button>
            );
          })}
        </aside>

        {/* B. CENTER VIDEO CANVAS */}
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
              onClick={togglePlay}
              className={`absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-opacity ${
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

        {/* C. RIGHT CONTEXTUAL PROPERTIES PANEL */}
        {activeTool && (
          <aside className="w-72 border-l border-[#E5E3DC] bg-[#FFFFFF] p-6 space-y-6 overflow-y-auto z-20 animate-kanso-fade">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DC]">
              <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#141413]">
                {activeTool} Settings
              </span>
              <button
                onClick={() => setActiveTool(null)}
                className="text-xs text-[#7A7870] hover:text-[#141413]"
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
                        onClick={() => setLayoutMode(mode.id as LayoutMode)}
                        className={`p-2.5 rounded-md border text-left font-medium transition-all ${
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
                    onChange={(e) => setCaptionFont(e.target.value as any)}
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
                        onClick={() => setCaptionPosition(pos)}
                        className={`flex-1 py-1.5 rounded border capitalize ${
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
                        onClick={() => setCurrentTime(cap.start)}
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
                        <p className="text-xs text-[#141413] mt-0.5">
                          {cap.text}
                        </p>
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
                  Extract reframed 9:16 vertical clips from active speaker
                  segments.
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
                    onClick={() => {
                      setAspectRatio("9:16");
                      setLayoutMode("guest");
                      setCurrentTime(6);
                    }}
                    className="w-full py-1.5 bg-[#141413] text-[#F7F6F2] rounded text-xs font-medium hover:bg-[#2B2A27] transition-all"
                  >
                    Format as 9:16 Reel
                  </button>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* 3. BOTTOM TIMELINE ENGINE */}
      <footer className="h-64 border-t border-[#E5E3DC] bg-[#FFFFFF] flex flex-col justify-between z-30">
        {/* Timeline Header Toolbar */}
        <div className="h-10 px-6 border-b border-[#E5E3DC] bg-[#FAF9F6] flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-7 h-7 rounded-full bg-[#141413] text-[#F7F6F2] flex items-center justify-center hover:bg-[#2B2A27] transition-colors"
              title={isPlaying ? "Pause (Space)" : "Play (Space)"}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 ml-0.5" />
              )}
            </button>

            <button
              onClick={() => {
                currentTimeRef.current = 0;
                setCurrentTime(0);
              }}
              className="p-1 rounded text-[#7A7870] hover:text-[#141413]"
              title="Return to Start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <span className="font-mono text-xs text-[#141413] num-tabular font-medium">
              {formatTime(currentTime)}{" "}
              <span className="text-[#A3A199]">
                / {formatTime(totalDuration)}
              </span>
            </span>
          </div>

          {/* Timeline Zoom & Split */}
          <div className="flex items-center gap-4 text-[#7A7870]">
            <button
              onClick={() =>
                alert(
                  "Split clip created at playhead timestamp: " +
                    formatTime(currentTime),
                )
              }
              className="flex items-center gap-1 hover:text-[#141413] px-2 py-1 rounded hover:bg-[#EFECE6] text-xs"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Split (S)</span>
            </button>

            <div className="flex items-center gap-1 border-l border-[#E5E3DC] pl-3">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                className="p-1 hover:text-[#141413]"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[10px] w-8 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2, z + 0.25))}
                className="p-1 hover:text-[#141413]"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Multitrack Timeline Tracks Area */}
        <div
          ref={timelineRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex-1 p-4 overflow-x-auto relative flex flex-col justify-center space-y-2 cursor-ew-resize select-none touch-none group"
        >
          {/* Draggable Smooth Playhead Needle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#E53E3E] z-30 pointer-events-none will-change-transform"
            style={{
              left: `${Math.min(100, Math.max(0, (currentTime / totalDuration) * 100))}%`,
              transition: "none",
            }}
          >
            {/* Top Playhead Scrubber Handle */}
            <div className="absolute -top-1.5 -left-2 w-4 h-4 bg-[#E53E3E] text-white rounded-full flex items-center justify-center shadow-md ring-2 ring-white transition-transform group-hover:scale-110">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>

            {/* Timecode tooltip */}
            <div className="absolute -top-7 -left-7 px-1.5 py-0.5 rounded bg-[#141413] text-white text-[9px] font-mono whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              {formatTime(currentTime)}
            </div>
          </div>

          {/* Track 1: Host Video Stream */}
          <div className="h-8 rounded bg-[#EFF6FF] border border-[#BFDBFE] px-3 flex items-center justify-between text-xs font-mono text-[#1E40AF]">
            <span className="text-[10px] font-medium">
              Host Video (1080p ProRes)
            </span>
            <span className="text-[10px] text-blue-400">Alex Rivers</span>
          </div>

          {/* Track 2: Guest Video Stream */}
          <div className="h-8 rounded bg-[#ECFDF5] border border-[#A7F3D0] px-3 flex items-center justify-between text-xs font-mono text-[#065F46]">
            <span className="text-[10px] font-medium">
              Guest Video (1080p ProRes)
            </span>
            <span className="text-[10px] text-emerald-400">Elena Chen</span>
          </div>

          {/* Track 3: Master Lossless Audio Waveform */}
          <div className="h-10 rounded bg-[#FAF9F6] border border-[#E5E3DC] px-2 flex items-center overflow-hidden">
            <WaveformPreview
              bars={120}
              height={28}
              activeColor="#141413"
              inactiveColor="#D1CEC5"
              progress={currentTime / totalDuration}
              animated={isPlaying}
            />
          </div>

          {/* Track 4: Timed Captions Track */}
          <div className="h-6 rounded bg-[#FFFBEB] border border-[#FDE68A] px-2 flex items-center gap-2 overflow-hidden text-[10px] font-mono text-amber-800">
            {captions.map((cap) => (
              <span
                key={cap.id}
                className="px-2 py-0.5 rounded bg-amber-200/70 truncate max-w-[200px]"
              >
                {cap.text}
              </span>
            ))}
          </div>
        </div>
      </footer>

      {/* Export Simulation Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
