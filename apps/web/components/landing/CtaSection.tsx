import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-32 border-t border-[#E5E3DC] bg-[#F7F6F2] text-center">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
          The Next Generation Studio
        </span>
        <h2 className="text-5xl sm:text-7xl font-serif font-normal tracking-tight text-[#141413] leading-[1.06]">
          Your next episode <br />
          <span className="italic text-[#7A7870]">starts here.</span>
        </h2>
        <p className="text-base sm:text-lg text-[#7A7870] max-w-xl mx-auto leading-relaxed">
          Record together in pristine local quality. Edit and publish without
          leaving the tab.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/video-meet"
            className="w-full sm:w-auto px-8 py-4 bg-[#141413] text-[#F7F6F2] font-medium text-sm rounded-lg hover:bg-[#2B2A27] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Start recording studio now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/video-meet"
            className="w-full sm:w-auto px-6 py-4 border border-[#E5E3DC] bg-[#FFFFFF] hover:bg-[#F2F0EB] text-[#141413] font-medium text-sm rounded-lg transition-all"
          >
            Open Studio Lobby
          </Link>
        </div>
      </div>
    </section>
  );
};
