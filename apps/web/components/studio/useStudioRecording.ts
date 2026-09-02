"use client";

import { useEffect, useState } from "react";
import { StudioState } from "./types";

export function useStudioRecording() {
  const [studioState, setStudioState] = useState<StudioState>("device_check");
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [guestConnected] = useState(true);
  const [guestMicMuted] = useState(false);

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

  return {
    studioState,
    setStudioState,
    micMuted,
    setMicMuted,
    camOff,
    setCamOff,
    guestConnected,
    guestMicMuted,
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
  };
}
