"use client";

import React from "react";

export const TestimonialsSection: React.FC = () => {
  const quotes = [
    {
      quote:
        "The moment you don't have to wait 45 minutes for cloud files to stitch or re-sync drifting 44.1kHz audio tracks, the entire remote recording paradigm changes.",
      author: "David K.",
      role: "Lead Engineer & Host, Syntax Stack",
    },
    {
      quote:
        "We replaced three separate SaaS subscriptions—remote recording, auto-subtitling, and timeline trimming—with a single in-browser Aakaar session. It's shockingly fast.",
      author: "Sarah Lin",
      role: "Head of Media, Developer Relations",
    },
    {
      quote:
        "Our remote guests never have to install an app or create an account. They click the link, and we get isolated 1080p ProRes tracks straight to our browser timeline.",
      author: "Marcus Vance",
      role: "Founder, Architecture Weekly",
    },
  ];

  return (
    <section className="py-24 border-t border-[#2E3033] bg-[#131415] text-[#F2F1ED]">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-mono text-[#FA5089]">
            PROVEN BY BUILDERS
          </span>
          <h3 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-[#F2F1ED]">
            What creators and engineers are saying.
          </h3>
        </div>

        {/* Quiet Typographic Quote Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {quotes.map((item, i) => (
            <div key={i} className="space-y-4 flex flex-col justify-between">
              <p className="text-sm sm:text-base text-[#F2F1ED] font-sans leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-[#2E3033]/70 font-mono text-xs text-[#8B8D90] space-y-0.5">
                <div className="text-[#F2F1ED] font-medium">{item.author}</div>
                <div className="text-[11px] text-[#8B8D90]">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
