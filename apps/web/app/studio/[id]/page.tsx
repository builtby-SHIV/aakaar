"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mic,
  MicOff,
  Pause,
  Play,
  Settings,
  Square,
  UserPlus,
  Video,
  VideoOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { DeviceSelectorModal } from "../../../components/DeviceSelectorModal";
import { ShareModal } from "../../../components/ShareModal";
import { WaveformPreview } from "../../../components/WaveformPreview";

type StudioState =
  "device_check" | "waiting" | "recording" | "paused" | "uploading" | "ready";

export default function StudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const roomId = resolvedParams.id || "ep-14";

  // State Management
  const [studioState, setStudioState] = useState<StudioState>("device_check");
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [guestConnected, setGuestConnected] = useState(true);
  const [guestMicMuted, setGuestMicMuted] = useState(false);

  // Timer
  const [seconds, setSeconds] = useState(0);

  // Upload simulation
  const [hostUploadProgress, setHostUploadProgress] = useState(0);
  const [guestUploadProgress, setGuestUploadProgress] = useState(0);

  // Modals
  const [showSettings, setShowSettings] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Recording Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (studioState === "recording") {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [studioState]);

  // Upload Simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (studioState === "uploading") {
      interval = setInterval(() => {
        setHostUploadProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 6;
        });
        setGuestUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStudioState("ready"), 600);
            return 100;
          }
          return prev + 4;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [studioState]);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    if (hrs > 0) return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    return `${pad(mins)}:${pad(secs)}`;
  };

  const handleStartRecording = () => {
    setStudioState("recording");
  };

  const handleTogglePause = () => {
    if (studioState === "recording") setStudioState("paused");
    else if (studioState === "paused") setStudioState("recording");
  };

  const handleStopRecording = () => {
    setStudioState("uploading");
  };

  return (
    <div className="h-screen w-screen bg-[#141413] text-[#F7F6F2] flex flex-col justify-between overflow-hidden select-none">
      {/* 1. STUDIO HEADER */}
      <header className="h-14 px-6 border-b border-[#2A2926] bg-[#1A1917] flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 rounded text-[#7A7870] hover:text-[#F7F6F2] hover:bg-[#2A2926] transition-colors"
            title="Exit Studio"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-medium text-xs tracking-tight text-white">
              Studio: {roomId}
            </span>
            <span className="text-xs text-[#7A7870] font-mono hidden sm:inline">
              · Local 1080p Multitrack Active
            </span>
          </div>
        </div>

        {/* Center: Live Timer & Status */}
        <div className="flex items-center gap-3">
          {studioState === "recording" && (
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#FFF1F0] text-[#E53E3E] text-xs font-mono font-medium animate-kanso-fade">
              <span className="w-2 h-2 rounded-full bg-[#E53E3E] animate-rec-pulse" />
              <span>REC {formatTimer(seconds)}</span>
            </div>
          )}

          {studioState === "paused" && (
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-mono font-medium">
              <Pause className="w-3 h-3" />
              <span>PAUSED {formatTimer(seconds)}</span>
            </div>
          )}

          {studioState === "device_check" && (
            <span className="text-xs font-mono text-[#7A7870]">
              Hardware Test & Lobby
            </span>
          )}

          {studioState === "waiting" && (
            <span className="text-xs font-mono text-amber-400">
              Waiting for guest...
            </span>
          )}
        </div>

        {/* Right: Guest Invite */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowShare(true)}
            className="text-xs font-medium px-3 py-1.5 rounded border border-[#3A3935] hover:bg-[#2A2926] transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#A3A199]" />
            <span>Invite Guest</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN STUDIO CANVAS / VIDEO VIEWPORT */}
      <main className="flex-1 p-6 relative flex items-center justify-center overflow-hidden">
        {/* STATE: DEVICE CHECK LOBBY */}
        {studioState === "device_check" && (
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
                onClick={() => setShowSettings(true)}
                className="text-xs text-[#7A7870] hover:text-white flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Audio/Video Settings</span>
              </button>

              <button
                onClick={() => setStudioState("waiting")}
                className="px-6 py-2.5 bg-white text-[#141413] font-medium text-xs rounded-md hover:bg-stone-200 transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Join Studio Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STATE: LIVE STUDIO (WAITING, RECORDING, PAUSED) */}
        {(studioState === "waiting" ||
          studioState === "recording" ||
          studioState === "paused") && (
          <div className="w-full h-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
            {/* Host Video Frame */}
            <div className="relative w-full aspect-video rounded-xl bg-[#1A1917] border border-[#2A2926] p-4 flex flex-col justify-between overflow-hidden shadow-lg">
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#141413]/80 backdrop-blur text-xs font-medium text-white">
                    Alex Rivers (Host)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                    1080p Local
                  </span>
                </div>
                {micMuted && (
                  <span className="p-1 rounded bg-[#E53E3E]/20 text-[#E53E3E] text-[10px] font-mono flex items-center gap-1">
                    <MicOff className="w-3 h-3" /> Muted
                  </span>
                )}
              </div>

              {/* Host Visual Avatar / Stream */}
              <div className="absolute inset-0 flex items-center justify-center">
                {camOff ? (
                  <div className="text-center text-xs font-mono text-[#7A7870]">
                    Camera Off
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-stone-700 to-stone-500 flex items-center justify-center text-white text-xl font-light">
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
                <span className="text-[10px] font-mono text-stone-500">
                  48 kHz · 24-bit
                </span>
              </div>
            </div>

            {/* Guest Video Frame */}
            <div className="relative w-full aspect-video rounded-xl bg-[#1A1917] border border-[#2A2926] p-4 flex flex-col justify-between overflow-hidden shadow-lg">
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#141413]/80 backdrop-blur text-xs font-medium text-white">
                    Elena Chen (Guest)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                    1080p Local
                  </span>
                </div>
              </div>

              {/* Guest Visual Avatar / Stream */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-800 to-amber-600 flex items-center justify-center text-white text-xl font-light">
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
                <span className="text-[10px] font-mono text-stone-500">
                  48 kHz · 24-bit
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STATE: UPLOADING LOCAL TRACKS */}
        {studioState === "uploading" && (
          <div className="max-w-md w-full bg-[#1A1917] border border-[#2A2926] rounded-2xl p-8 space-y-6 shadow-2xl text-center animate-kanso-fade">
            <div className="w-12 h-12 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="text-xl font-medium text-white">
                Syncing High-Bitrate Tracks
              </h3>
              <p className="text-xs text-[#7A7870]">
                Uploading isolated local recordings from host and guest
                machines.
              </p>
            </div>

            {/* Progress Bars */}
            <div className="space-y-3 text-left">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-stone-400">
                  <span>Host (Alex Rivers) 1080p ProRes</span>
                  <span>{hostUploadProgress}%</span>
                </div>
                <div className="w-full h-1 bg-[#2A2926] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${hostUploadProgress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-stone-400">
                  <span>Guest (Elena Chen) 1080p ProRes</span>
                  <span>{guestUploadProgress}%</span>
                </div>
                <div className="w-full h-1 bg-[#2A2926] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${guestUploadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATE: POST-RECORDING CALM TRANSITION */}
        {studioState === "ready" && (
          <div className="max-w-xl w-full bg-[#F7F6F2] text-[#141413] border border-[#E5E3DC] rounded-2xl p-8 space-y-8 shadow-2xl animate-kanso-fade">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest font-mono text-[#2B7A4B] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Recording Finalized</span>
              </span>
              <h2 className="text-3xl font-normal tracking-tight text-[#141413]">
                Your recording is ready.
              </h2>
              <p className="text-sm text-[#7A7870] leading-relaxed">
                All host and guest streams are aligned. Open the editor to
                refine layouts, burn captions, and export without leaving your
                browser.
              </p>
            </div>

            {/* Multitrack Diagnostics */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E3DC] text-xs">
              <div className="space-y-1">
                <span className="text-[#7A7870] font-mono">Host Stream</span>
                <div className="font-medium text-[#141413]">1080p 60fps</div>
                <div className="text-[11px] text-[#7A7870] font-mono">
                  {formatTimer(seconds)}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[#7A7870] font-mono">Guest Stream</span>
                <div className="font-medium text-[#141413]">1080p 60fps</div>
                <div className="text-[11px] text-[#7A7870] font-mono">
                  {formatTimer(seconds)}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[#7A7870] font-mono">Master Audio</span>
                <div className="font-medium text-[#141413]">48 kHz WAV</div>
                <div className="text-[11px] text-[#2B7A4B] font-mono">
                  Synced 0ms
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center justify-between pt-2">
              <Link
                href="/dashboard"
                className="text-xs font-medium text-[#7A7870] hover:text-[#141413] transition-colors"
              >
                Back to Dashboard
              </Link>

              <Link
                href={`/editor/${roomId}`}
                className="px-6 py-3 bg-[#141413] text-[#F7F6F2] rounded-lg font-medium text-xs hover:bg-[#2B2A27] transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Open In-Browser Editor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* 3. MINIMAL BOTTOM STUDIO CONTROLS */}
      {(studioState === "waiting" ||
        studioState === "recording" ||
        studioState === "paused") && (
        <footer className="h-20 px-6 border-t border-[#2A2926] bg-[#1A1917] flex items-center justify-between z-20">
          {/* Left: Device Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`p-3 rounded-full border transition-all ${
                micMuted
                  ? "bg-[#E53E3E]/10 border-[#E53E3E] text-[#E53E3E]"
                  : "bg-[#22211E] border-[#33322E] text-white hover:border-stone-500"
              }`}
              title={micMuted ? "Unmute Mic" : "Mute Mic"}
            >
              {micMuted ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setCamOff(!camOff)}
              className={`p-3 rounded-full border transition-all ${
                camOff
                  ? "bg-[#E53E3E]/10 border-[#E53E3E] text-[#E53E3E]"
                  : "bg-[#22211E] border-[#33322E] text-white hover:border-stone-500"
              }`}
              title={camOff ? "Turn Cam On" : "Turn Cam Off"}
            >
              {camOff ? (
                <VideoOff className="w-4 h-4" />
              ) : (
                <Video className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="p-3 rounded-full bg-[#22211E] border border-[#33322E] text-stone-400 hover:text-white hover:border-stone-500 transition-all"
              title="Hardware Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Center: Recording Master Action */}
          <div className="flex items-center gap-3">
            {studioState === "waiting" && (
              <button
                onClick={handleStartRecording}
                className="px-6 py-3 bg-[#E53E3E] hover:bg-[#C53030] text-white font-medium text-xs rounded-full flex items-center gap-2 shadow-lg transition-all"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span>Start Recording Session</span>
              </button>
            )}

            {(studioState === "recording" || studioState === "paused") && (
              <>
                <button
                  onClick={handleTogglePause}
                  className="px-4 py-2.5 bg-[#22211E] border border-[#33322E] hover:border-stone-500 text-stone-200 text-xs font-medium rounded-full flex items-center gap-2 transition-all"
                >
                  {studioState === "recording" ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {studioState === "recording" ? "Pause" : "Resume"}
                  </span>
                </button>

                <button
                  onClick={handleStopRecording}
                  className="px-5 py-2.5 bg-[#E53E3E] hover:bg-[#C53030] text-white text-xs font-medium rounded-full flex items-center gap-2 shadow-md transition-all"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop & Upload</span>
                </button>
              </>
            )}
          </div>

          {/* Right: Room Stats */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#7A7870]">
            <span className="hidden sm:inline">Room: {roomId}</span>
            <span className="text-emerald-400">● 2 Participants</span>
          </div>
        </footer>
      )}

      {/* Modals */}
      <DeviceSelectorModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        roomId={roomId}
      />
    </div>
  );
}
