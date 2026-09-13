"use client";

import React, { useState } from "react";
import { CaptionStyle } from "./types";
import { Type, Sparkles, Terminal } from "lucide-react";

export const EditorialCaptionsSection: React.FC = () => {
  const [captionStyle, setCaptionStyle] = useState<CaptionStyle>("editorial");

  const styles: CaptionStyle[] = ["editorial", "subtle", "karaoke"];

  return (
    <section id="layouts" className="py-24 border-t border-[#2E3033] bg-[#161718] text-[#F2F1ED]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#FA5089] bg-[#FA5089]/10 px-2 py-0.5 rounded border border-[#FA5089]/20">
                SUBTITLE ENGINE
              </span>
              <span className="text-[10px] font-mono text-[#8B8D90]">CLIENT SIDE RENDER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-[#F2F1ED]">
              Captions with publication-grade typography.
            </h2>
            <p className="text-sm text-[#8B8D90] leading-relaxed">
              Subtitles shouldn&apos;t look like generic yellow bubble text.
              Aakaar automatically compiles timed editorial typography directly into 
              your output master stream.
            </p>

            {/* Caption selector */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono text-[#8B8D90]">
                STYLE_PRESET:
              </div>
              <div className="flex gap-2">
                {styles.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setCaptionStyle(style)}
                    className={`px-3 py-1.5 rounded text-xs font-mono capitalize border transition-all cursor-pointer ${
                      captionStyle === style
                        ? "border-[#FA5089] bg-[#242628] text-[#F2F1ED]"
                        : "border-[#2E3033] bg-[#131415] text-[#8B8D90] hover:text-[#F2F1ED]"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-video bg-[#131415] rounded-xl border border-[#2E3033] p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono text-[#8B8D90]">
                <span>CAPTION_PREVIEW.MP4</span>
                <span className="text-emerald-400">SYNC: 0.0ms</span>
              </div>

              {/* Simulated dynamic caption based on style */}
              <div className="text-center my-auto px-4">
                {captionStyle === "editorial" && (
                  <p className="text-xl sm:text-2xl font-sans font-medium text-[#F2F1ED] tracking-tight leading-snug">
                    &ldquo;Simplicity isn&apos;t the absence of clutter,
                    it&apos;s the presence of{" "}
                    <span className="text-[#FA5089] font-bold">
                      purpose
                    </span>
                    .&rdquo;
                  </p>
                )}

                {captionStyle === "subtle" && (
                  <p className="text-base sm:text-lg font-mono text-[#8B8D90] tracking-wide">
                    <span className="text-[#FA5089]">[alex]:</span> simplicity isn&apos;t the absence of clutter...
                  </p>
                )}

                {captionStyle === "karaoke" && (
                  <p className="text-xl sm:text-2xl font-bold tracking-tight text-[#8B8D90]">
                    <span className="text-white">Simplicity isn&apos;t</span>{" "}
                    <span className="text-[#FA5089]">the absence</span>{" "}
                    <span>of clutter</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#8B8D90]">
                <span>BURN_IN_ON_EXPORT: TRUE</span>
                <span className="text-emerald-400">100% Client-Side Rendered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
