"use client";

import {
  Mic,
  MicOff,
  Pause,
  Play,
  Settings,
  Square,
  Video,
  VideoOff,
} from "lucide-react";
import React from "react";
import { StudioState } from "./types";

interface StudioBottomControlsProps {
  roomId: string;
  studioState: StudioState;
  micMuted: boolean;
  camOff: boolean;
  onToggleMic: () => void;
  onToggleCam: () => void;
  onOpenSettings: () => void;
  onStartRecording: () => void;
  onTogglePause: () => void;
  onStopRecording: () => void;
}

export const StudioBottomControls: React.FC<StudioBottomControlsProps> = ({
  roomId,
  studioState,
  micMuted,
  camOff,
  onToggleMic,
  onToggleCam,
  onOpenSettings,
  onStartRecording,
  onTogglePause,
  onStopRecording,
}) => {
  if (
    studioState !== "waiting" &&
    studioState !== "recording" &&
    studioState !== "paused"
  ) {
    return null;
  }

  return (
    <footer className="h-20 px-6 border-t border-[#2E3033] bg-[#1A1B1D] flex items-center justify-between z-20">
      {/* Left: Device Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleMic}
          className={`p-3 rounded-full border transition-all cursor-pointer ${
            micMuted
              ? "bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]"
              : "bg-[#1E1F21] border-[#2E3033] text-white hover:border-[#8B8D90]"
          }`}
          title={micMuted ? "Unmute Mic" : "Mute Mic"}
        >
          {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={onToggleCam}
          className={`p-3 rounded-full border transition-all cursor-pointer ${
            camOff
              ? "bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]"
              : "bg-[#1E1F21] border-[#2E3033] text-white hover:border-[#8B8D90]"
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
          type="button"
          onClick={onOpenSettings}
          className="p-3 rounded-full bg-[#1E1F21] border border-[#2E3033] text-[#8B8D90] hover:text-white hover:border-[#8B8D90] transition-all cursor-pointer"
          title="Hardware Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Center: Recording Master Action */}
      <div className="flex items-center gap-3">
        {studioState === "waiting" && (
          <button
            type="button"
            onClick={onStartRecording}
            className="px-6 py-3 bg-[#EF4444] hover:bg-[#DC2626] text-white font-medium text-xs rounded-full flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span>Start Recording Session</span>
          </button>
        )}

        {(studioState === "recording" || studioState === "paused") && (
          <>
            <button
              type="button"
              onClick={onTogglePause}
              className="px-4 py-2.5 bg-[#1E1F21] border border-[#2E3033] hover:border-[#8B8D90] text-[#C0C1C3] text-xs font-medium rounded-full flex items-center gap-2 transition-all cursor-pointer"
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
              type="button"
              onClick={onStopRecording}
              className="px-5 py-2.5 bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-medium rounded-full flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop & Upload</span>
            </button>
          </>
        )}
      </div>

      {/* Right: Room Stats */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#8B8D90]">
        <span className="hidden sm:inline">Room: {roomId}</span>
        <span className="text-emerald-400">● 2 Participants</span>
      </div>
    </footer>
  );
};
