"use client";

import React from "react";
import { DeviceSelectorModal } from "../DeviceSelectorModal";
import { ShareModal } from "../ShareModal";
import { StudioBottomControls } from "./StudioBottomControls";
import { StudioDeviceCheck } from "./StudioDeviceCheck";
import { StudioFinalizedCard } from "./StudioFinalizedCard";
import { StudioHeader } from "./StudioHeader";
import { StudioLiveStage } from "./StudioLiveStage";
import { StudioUploadProgress } from "./StudioUploadProgress";
import { useStudioRecording } from "./useStudioRecording";

interface StudioViewProps {
  roomId: string;
}

export function StudioView({ roomId }: StudioViewProps) {
  const {
    studioState,
    setStudioState,
    micMuted,
    setMicMuted,
    camOff,
    setCamOff,
    seconds,
    hostUploadProgress,
    guestUploadProgress,
    showSettings,
    setShowSettings,
    showShare,
    setShowShare,
    formatTimer,
    handleStartRecording,
    handleTogglePause,
    handleStopRecording,
  } = useStudioRecording();

  return (
    <div className="h-screen w-screen bg-[#141413] text-[#F7F6F2] flex flex-col justify-between overflow-hidden select-none">
      {/* 1. STUDIO HEADER */}
      <StudioHeader
        roomId={roomId}
        studioState={studioState}
        seconds={seconds}
        formatTimer={formatTimer}
        onInviteGuest={() => setShowShare(true)}
      />

      {/* 2. MAIN STUDIO CANVAS / VIDEO VIEWPORT */}
      <main className="flex-1 p-6 relative flex items-center justify-center overflow-hidden">
        {studioState === "device_check" && (
          <StudioDeviceCheck
            onOpenSettings={() => setShowSettings(true)}
            onJoinStudio={() => setStudioState("waiting")}
          />
        )}

        {(studioState === "waiting" ||
          studioState === "recording" ||
          studioState === "paused") && (
          <StudioLiveStage
            studioState={studioState}
            micMuted={micMuted}
            camOff={camOff}
          />
        )}

        {studioState === "uploading" && (
          <StudioUploadProgress
            hostUploadProgress={hostUploadProgress}
            guestUploadProgress={guestUploadProgress}
          />
        )}

        {studioState === "ready" && (
          <StudioFinalizedCard
            roomId={roomId}
            seconds={seconds}
            formatTimer={formatTimer}
          />
        )}
      </main>

      {/* 3. MINIMAL BOTTOM STUDIO CONTROLS */}
      <StudioBottomControls
        roomId={roomId}
        studioState={studioState}
        micMuted={micMuted}
        camOff={camOff}
        onToggleMic={() => setMicMuted(!micMuted)}
        onToggleCam={() => setCamOff(!camOff)}
        onOpenSettings={() => setShowSettings(true)}
        onStartRecording={handleStartRecording}
        onTogglePause={handleTogglePause}
        onStopRecording={handleStopRecording}
      />

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
