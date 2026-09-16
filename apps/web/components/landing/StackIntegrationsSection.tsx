"use client";

import React from "react";
import { Cpu, Globe, Server, Layers, ShieldCheck, Share2 } from "lucide-react";

export const StackIntegrationsSection: React.FC = () => {
  const technologies = [
    { name: "LiveKit WebRTC", spec: "Peer Mesh & SFU Fallback" },
    { name: "FFmpeg WASM", spec: "Client-Side Video Compositor" },
    { name: "WebAudio API", spec: "48kHz 24-bit PCM Clock" },
    { name: "Origin Private FS", spec: "Zero-Lag Disk Buffer" },
    { name: "ProRes 422 HQ", spec: "Master Quality Codec" },
    { name: "VP9 & AV1", spec: "Next-Gen Stream Encoding" },
  ];

  const exportDestinations = [
    "YouTube 4K UHD",
    "Spotify Video Podcasts",
    "Apple Podcasts Lossless",
    "TikTok & Shorts 9:16",
    "Substack Audio",
    "Direct MP4 Master",
  ];

  return (
    <section className="py-20 border-t border-[#2E3033] bg-[#161718] text-[#F2F1ED]">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2E3033]">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#FA5089]">
              CORE STACK & PIPELINE
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-[#F2F1ED]">
              Built natively on open web standards.
            </h3>
          </div>
          <p className="text-xs font-mono text-[#8B8D90] max-w-sm leading-relaxed">
            No proprietary electron wrappers or cloud lock-in. Direct hardware media access via modern browser APIs.
          </p>
        </div>

        {/* Tech Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="p-3.5 rounded-lg border border-[#2E3033] bg-[#1A1B1D] space-y-1 hover:border-[#FA5089]/40 transition-colors"
            >
              <div className="text-xs font-mono font-medium text-[#F2F1ED]">{tech.name}</div>
              <div className="text-[10px] font-mono text-[#8B8D90]">{tech.spec}</div>
            </div>
          ))}
        </div>

        {/* Quiet Export Destinations Strip */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#2E3033]/60 text-xs font-mono text-[#8B8D90]">
          <span className="text-[#FA5089] uppercase tracking-wider text-[10px]">
            ONE-CLICK EXPORT TARGETS:
          </span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {exportDestinations.map((dest) => (
              <span key={dest} className="flex items-center gap-1.5 text-[#F2F1ED]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{dest}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
