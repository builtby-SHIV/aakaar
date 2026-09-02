"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { HeroStudioPreview } from "./HeroStudioPreview";

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-20 pb-28 px-6 max-w-7xl mx-auto">
      <div className="max-w-4xl space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-[#FFFFFF] text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-[#E53E3E] animate-rec-pulse" />
          <span>Zero Desktop Installs</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.02] text-[#141413]">
          Record together. <br />
          <span className="italic font-normal text-[#7A7870]">
            Edit without leaving.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[#7A7870] max-w-2xl font-normal leading-relaxed">
          Remote podcast recording and lightweight video editing, in one browser.
          Isolated multitrack recordings, instant timeline assembly, and
          burnt-in editorial typography.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/video-meet"
            className="px-6 py-3.5 bg-[#141413] text-[#F7F6F2] font-medium text-sm rounded-lg hover:bg-[#2B2A27] transition-all flex items-center gap-2 shadow-sm group"
          >
            <span>Start recording studio</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/video-meet"
            className="px-6 py-3.5 border border-[#E5E3DC] bg-[#FFFFFF] hover:bg-[#F2F0EB] text-[#141413] font-medium text-sm rounded-lg transition-all flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#2B7A4B]" />
            <span>Join Live Studio Room</span>
          </Link>
        </div>
      </div>

      <HeroStudioPreview />
    </section>
  );
};
