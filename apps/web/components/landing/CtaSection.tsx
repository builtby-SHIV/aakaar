"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-36 border-t border-[#2E3033] bg-[#131415] text-[#F2F1ED] text-center relative overflow-hidden">
      {/* Subtle background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#FA5089]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2E3033] bg-[#1A1B1D] text-xs font-mono text-[#8B8D90]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>ZERO_INSTALL_IN_BROWSER</span>
        </div>

        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-extrabold tracking-[-0.04em] text-[#F2F1ED] leading-[0.98]">
          Your next episode <br />
          <span className="text-[#8B8D90] font-normal">starts here.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#8B8D90] max-w-lg mx-auto font-normal leading-relaxed">
          Record together in pristine local quality. Edit, reframe, and publish without leaving the browser tab.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/video-meet"
            className="w-full sm:w-auto px-8 py-4 bg-[#FA5089] hover:bg-[#E03F74] text-white font-medium text-xs font-mono rounded-md transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FA5089]/25 group"
          >
            <span>START RECORDING</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-4 border border-[#2E3033] bg-[#1A1B1D] hover:bg-[#242628] text-[#F2F1ED] font-medium text-xs font-mono rounded-md transition-all"
          >
            OPEN WORKSPACE
          </Link>
        </div>
      </div>
    </section>
  );
};
