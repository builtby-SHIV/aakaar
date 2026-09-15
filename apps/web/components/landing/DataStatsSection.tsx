"use client";

import React, { useState, useEffect } from "react";
import { Activity, Gauge, Zap, HardDrive, Clock } from "lucide-react";

export const DataStatsSection: React.FC = () => {
  const [durationMins, setDurationMins] = useState(45);
  const [guestCount, setGuestCount] = useState(2);
  const [hoursRecorded, setHoursRecorded] = useState(148290);

  // Live ticking counter effect for "make it feel alive"
  useEffect(() => {
    const interval = setInterval(() => {
      setHoursRecorded((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Calculated metrics
  const rawGigabytes = ((durationMins * 60 * 6.5 * (guestCount + 1)) / (8 * 1024)).toFixed(1);
  const traditionalWaitMins = Math.round((durationMins * 1.2 * (guestCount + 1)) / 2);

  return (
    <section id="performance" className="py-24 border-t border-[#2E3033] bg-[#131415] text-[#F2F1ED] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#FA5089] bg-[#FA5089]/10 px-2 py-0.5 rounded border border-[#FA5089]/20">
              REAL-TIME BENCHMARKS
            </span>
            <span className="text-[10px] font-mono text-[#8B8D90]">SYSTEM TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#F2F1ED]">
            Designed for zero latency. <br />
            <span className="text-[#8B8D90] font-normal">
              Measured in milliseconds, not gigabytes.
            </span>
          </h2>
          <p className="text-sm text-[#8B8D90] leading-relaxed max-w-2xl">
            Because Aakaar processes isolated media tracks locally inside modern WebAssembly and WebRTC threads, 
            it eliminates the bottlenecks of cloud rendering queues entirely.
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-xl border border-[#2E3033] bg-[#1A1B1D] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#8B8D90]">
              <span>SAMPLE_CLOCK_DRIFT</span>
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-[#F2F1ED]">
              &lt; 0.2<span className="text-lg text-[#8B8D90]">ms</span>
            </div>
            <p className="text-[11px] font-mono text-emerald-400">
              Hardware WebAudio lock
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#2E3033] bg-[#1A1B1D] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#8B8D90]">
              <span>TIMELINE_LATENCY</span>
              <Zap className="w-3.5 h-3.5 text-[#FA5089]" />
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-[#F2F1ED]">
              0.0<span className="text-lg text-[#8B8D90]">s</span>
            </div>
            <p className="text-[11px] font-mono text-[#8B8D90]">
              Instant in-tab timeline assembly
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#2E3033] bg-[#1A1B1D] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#8B8D90]">
              <span>AUDIO_FIDELITY</span>
              <Activity className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-[#F2F1ED]">
              48<span className="text-lg text-[#8B8D90]">kHz</span>
            </div>
            <p className="text-[11px] font-mono text-[#8B8D90]">
              24-bit PCM lossless stereo
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#2E3033] bg-[#1A1B1D] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#8B8D90]">
              <span>GLOBAL_HOURS_SYNCED</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-[#F2F1ED] tabular-nums">
              {hoursRecorded.toLocaleString()}
            </div>
            <p className="text-[11px] font-mono text-emerald-400">
              Live counter incrementing
            </p>
          </div>
        </div>

        {/* Mux-style Interactive Workflow Latency Estimator */}
        <div className="p-8 rounded-xl border border-[#2E3033] bg-[#161718] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2E3033]">
            <div>
              <h3 className="text-lg font-sans font-semibold text-[#F2F1ED]">
                Workflow Turnaround & Bandwidth Calculator
              </h3>
              <p className="text-xs text-[#8B8D90] font-mono mt-0.5">
                Simulate your episode configuration to benchmark time-to-first-cut against traditional cloud tools.
              </p>
            </div>
            <div className="px-3 py-1 rounded bg-[#1A1B1D] border border-[#2E3033] text-xs font-mono text-[#FA5089]">
              REAL-TIME ESTIMATOR
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Controls */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8B8D90]">EPISODE_DURATION:</span>
                  <span className="text-[#F2F1ED] font-bold">{durationMins} minutes</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={durationMins}
                  onChange={(e) => setDurationMins(Number(e.target.value))}
                  className="w-full accent-[#FA5089] cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8B8D90]">REMOTE_GUESTS:</span>
                  <span className="text-[#F2F1ED] font-bold">{guestCount} {guestCount === 1 ? "guest" : "guests"} (Total {guestCount + 1} tracks)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#FA5089] cursor-pointer"
                />
              </div>
            </div>

            {/* Readout Comparisons */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#131415] border border-[#2E3033] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#EF4444]">Traditional Cloud Stack</span>
                <div className="text-2xl font-mono font-bold text-[#EF4444]">
                  ~{traditionalWaitMins} min
                </div>
                <p className="text-[10px] text-[#8B8D90] font-mono">
                  Waiting for {rawGigabytes} GB download and remote cloud transcode.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#131415] border border-emerald-500/30 space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-400">Aakaar Browser Engine</span>
                <div className="text-2xl font-mono font-bold text-emerald-400">
                  0.0 sec
                </div>
                <p className="text-[10px] text-[#8B8D90] font-mono">
                  Zero cloud rendering. Timeline assembled instantly in-tab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
