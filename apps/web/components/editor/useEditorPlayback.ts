"use client";

import { useEffect, useRef, useState } from "react";

export function useEditorPlayback(totalDuration: number = 42.28) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);
  const currentTimeRef = useRef(currentTime);
  currentTimeRef.current = currentTime;

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

  // High-Precision Playback Clock
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

  // Keyboard Spacebar Listener
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

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 10);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms}`;
  };

  return {
    isPlaying,
    currentTime,
    setCurrentTime,
    totalDuration,
    zoomLevel,
    setZoomLevel,
    isScrubbing,
    timelineRef,
    togglePlay,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    formatTime,
  };
}
