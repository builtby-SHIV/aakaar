"use client";

import {
  CheckCircle2,
  Clock,
  Cpu,
  HardDrive,
  Layers,
  Layers2,
  Sparkles,
  Video,
  XCircle,
  Zap,
  Radio,
  ArrowRight
} from "lucide-react";
import React from "react";

export const WorkflowComparisonSection: React.FC = () => {
  return (
    <section id="workflow" className="py-24 border-t border-[#2E3033] bg-[#131415] text-[#F2F1ED]">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#FA5089] bg-[#FA5089]/10 px-2 py-0.5 rounded border border-[#FA5089]/20">
              ARCHITECTURE COMPARISON
            </span>
            <span className="text-[10px] font-mono text-[#8B8D90]">PIPELINE ANALYSIS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#F2F1ED]">
            The traditional podcast stack is broken. <br />
            <span className="text-[#8B8D90] font-normal">
              Aakaar replaces it with a single pipeline.
            </span>
          </h2>
          <p className="text-sm text-[#8B8D90] leading-relaxed max-w-2xl">
            When creating remote episodes requires juggling cloud render queues, drifting sample clocks, 
            third-party subtitle generators, and heavy desktop video suites, momentum halts.
          </p>
        </div>

        {/* High-Contrast Technical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* 1. Fragmented Old Stack (Dark Deprecated View) */}
          <div className="p-7 rounded-xl border border-[#2E3033] bg-[#161718] flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#2E3033]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#EF4444]">
                  <XCircle className="w-4 h-4" />
                  <span>DEPRECATED: 7-TOOL DESKTOP WORKFLOW</span>
                </div>
                <span className="text-[10px] font-mono text-[#8B8D90] bg-[#131415] px-2 py-0.5 rounded border border-[#2E3033]">
                  ~2.5 HRS OVERHEAD
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    icon: Clock,
                    step: "01_DOWNLOAD_QUEUE",
                    title: "Remote Server Render & Transfer Lag",
                    desc: "Waiting 45 minutes for cloud servers to compile, encode, and transfer 25 GB of unstitched multi-GB zip archives.",
                  },
                  {
                    icon: Cpu,
                    step: "02_CLOCK_DESYNC",
                    title: "Audio Sample Rate Drift (44.1k vs 48k)",
                    desc: "Host 44.1kHz vs Guest 48kHz audio clocks diverge by frames over a 30-minute recording, requiring manual retiming cuts.",
                  },
                  {
                    icon: Layers2,
                    step: "03_DESKTOP_BLOAT",
                    title: "Heavy Desktop NLE Software Overhead",
                    desc: "Launching 4GB desktop editing apps just to perform two-speaker camera framing switches and silence removal.",
                  },
                  {
                    icon: HardDrive,
                    step: "04_EXPORT_BOTTLENECK",
                    title: "Third-Party Subtitle Handoff",
                    desc: "Exporting audio stems, uploading to separate AI transcribers, downloading SRT files, and re-importing into the timeline.",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-[#2E3033]/60 bg-[#131415] space-y-1 hover:border-[#EF4444]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-[#EF4444]" />
                          <h4 className="text-xs font-mono font-medium text-[#F2F1ED]">{item.title}</h4>
                        </div>
                        <span className="text-[10px] font-mono text-[#EF4444]">{item.step}</span>
                      </div>
                      <p className="text-[11px] text-[#8B8D90] leading-relaxed pl-5.5">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#2E3033] flex items-center justify-between text-xs font-mono text-[#EF4444]">
              <span>LATENCY TO FIRST CUT: ~150 MINS</span>
              <span className="text-[11px] text-[#8B8D90]">HIGH CONTEXT SWITCHING</span>
            </div>
          </div>

          {/* 2. The Aakaar Unified Continuous Stream */}
          <div className="p-7 rounded-xl border border-[#FA5089]/30 bg-[#1A1B1D] flex flex-col justify-between space-y-8 shadow-2xl relative overflow-hidden">
            {/* Subtle corner badge glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FA5089]/10 blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-[#2E3033]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FA5089]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>AAKAAR UNIFIED PIPELINE (1 BROWSER TAB)</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                  ZERO CLOUD LAG
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    icon: Zap,
                    step: "01_TOKEN_JOIN",
                    title: "Instant WebRTC Studio Entry",
                    desc: "Remote guests join via a direct cryptographic link. No user accounts, no native software downloads, no hardware friction.",
                  },
                  {
                    icon: Video,
                    step: "02_LOCAL_ISOLATION",
                    title: "Local MediaStream Master Capture",
                    desc: "Lossless 48kHz audio and 1080p ProRes streams are recorded straight into local OPFS buffer at hardware quality.",
                  },
                  {
                    icon: Layers,
                    step: "03_ZERO_WAIT_TIMELINE",
                    title: "Instant Timeline Assembly",
                    desc: "The moment you hit stop, your multitrack timeline is already arranged and sample-clock aligned without transcode delay.",
                  },
                  {
                    icon: Sparkles,
                    step: "04_WASM_COMPILATION",
                    title: "In-Browser Publication & Subtitles",
                    desc: "Switch camera framing, auto-sync editorial typography subtitles, and export 1080p/4K master containers in-tab via WASM.",
                  },
                ].map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-lg border border-[#2E3033] bg-[#161718] space-y-1 hover:border-[#FA5089]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-[#FA5089]" />
                          <h4 className="text-xs font-mono font-medium text-[#F2F1ED]">{card.title}</h4>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400">{card.step}</span>
                      </div>
                      <p className="text-[11px] text-[#8B8D90] leading-relaxed pl-5.5">{card.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#2E3033] flex items-center justify-between text-xs font-mono text-emerald-400 relative z-10">
              <span>LATENCY TO FIRST CUT: 0.0s (INSTANT)</span>
              <span className="text-[11px] text-[#FA5089]">ZERO CONTEXT SWITCHING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
