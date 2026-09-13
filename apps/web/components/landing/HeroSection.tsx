"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Terminal, Radio } from "lucide-react";
import { HeroStudioPreview } from "./HeroStudioPreview";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient Looping Grid Glow in Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] pointer-events-none opacity-30">
        <div className="w-full h-full tech-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute top-10 left-1/3 w-80 h-80 rounded-full bg-[#FA5089]/15 blur-[120px] animate-grid-glow" />
      </div>

      <div className="relative z-10 max-w-4xl space-y-6">
        {/* Technical Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2E3033] bg-[#1A1B1D] text-xs font-mono text-[#8B8D90]">
          <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-rec-pulse" />
          <span className="text-[#F2F1ED] font-medium">WEBRTC MEDIA PIPELINE</span>
          <span className="text-[#2E3033]">|</span>
          <span className="text-emerald-400">0.2ms SYNC DRIFT</span>
        </div>

        {/* Oversized Confident Grotesk Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-extrabold tracking-[-0.04em] leading-[0.98] text-[#F2F1ED]">
          Record together. <br />
          <span className="text-[#8B8D90] font-normal">
            Edit without leaving.
          </span>
        </h1>

        {/* Plain, Confident One-Line Copy */}
        <p className="text-base sm:text-lg text-[#8B8D90] max-w-2xl font-normal leading-relaxed">
          Browser-based local multitrack studio and video engine. Zero desktop installs, 
          48kHz lossless audio isolation, and instant timeline assembly.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/video-meet"
            className="px-6 py-3 bg-[#FA5089] hover:bg-[#E03F74] text-white font-medium text-xs rounded-md transition-all flex items-center gap-2 shadow-sm shadow-[#FA5089]/25 group"
          >
            <span>Start recording</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <a
            href="#demo"
            className="px-5 py-3 border border-[#2E3033] bg-[#1A1B1D] hover:bg-[#242628] text-[#F2F1ED] font-mono text-xs rounded-md transition-all flex items-center gap-2"
          >
            <Terminal className="w-3.5 h-3.5 text-[#FA5089]" />
            <span>Interactive Demo</span>
          </a>
        </div>
      </div>

      {/* Hero Studio Live Preview Component */}
      <HeroStudioPreview />

      {/* Mux-style "Trusted By" Logo Marquee Row */}
      <div className="mt-20 pt-10 border-t border-[#2E3033]/80">
        <p className="text-[11px] font-mono text-[#8B8D90] uppercase tracking-widest text-center mb-8">
          Trusted by modern engineering teams and technical creators
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-65 grayscale hover:grayscale-0 transition-opacity">
          {["Vercel", "Supabase", "Linear", "Raycast", "Loom", "Resend"].map((brand) => (
            <div
              key={brand}
              className="font-mono text-sm tracking-widest text-[#F2F1ED] font-semibold flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-xs bg-[#2E3033]" />
              <span>{brand.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
