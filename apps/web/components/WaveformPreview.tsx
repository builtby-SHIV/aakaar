"use client";

import React from "react";

interface WaveformPreviewProps {
  bars?: number;
  height?: number;
  activeColor?: string;
  inactiveColor?: string;
  progress?: number; // 0 to 1
  audioLevel?: number; // Real-time volume level from 0 to 1
  animated?: boolean;
  className?: string;
}

export function WaveformPreview({
  bars = 40,
  height = 28,
  activeColor = "#141413",
  inactiveColor = "#D1CEC5",
  progress = 0.45,
  audioLevel,
  animated = false,
  className = "",
}: WaveformPreviewProps) {
  // Deterministic seed for realistic audio waveform heights
  const heights = React.useMemo(() => {
    const raw = [
      12, 18, 26, 40, 65, 80, 45, 30, 55, 75, 90, 100, 60, 40, 20, 35, 70, 85,
      95, 60, 30, 45, 65, 80, 50, 25, 40, 60, 85, 70, 45, 30, 50, 75, 90, 60,
      35, 20, 15, 25, 45, 65, 50, 30, 20, 40, 60, 80, 55, 30,
    ];
    return Array.from({ length: bars }, (_, i) => {
      const idx = i % raw.length;
      return raw[idx] ?? 30;
    });
  }, [bars]);

  return (
    <div
      className={`flex items-center gap-[2px] h-full ${className}`}
      style={{ height: `${height}px` }}
    >
      {heights.map((h, i) => {
        const isPast = i / bars <= progress;
        
        // Calculate reactive dynamic height if real-time audioLevel is provided
        let currentBarHeight: number;
        if (typeof audioLevel === "number") {
          const boost = Math.sin((i / bars) * Math.PI) * 0.5 + 0.5;
          const dynamicFactor = Math.max(0.12, audioLevel * (h / 100) * boost * 1.8);
          currentBarHeight = Math.max(3, dynamicFactor * height);
        } else {
          currentBarHeight = Math.max(3, (h / 100) * height);
        }

        return (
          <div
            key={i}
            className={`w-[2px] rounded-full transition-all duration-75 ${
              animated && typeof audioLevel !== "number" ? "animate-pulse" : ""
            }`}
            style={{
              height: `${currentBarHeight}px`,
              backgroundColor: isPast ? activeColor : inactiveColor,
              animationDelay: animated ? `${(i * 35) % 800}ms` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
