"use client";

import React, { useState } from "react";
import { CaptionStyle } from "./types";

export const EditorialCaptionsSection: React.FC = () => {
  const [captionStyle, setCaptionStyle] = useState<CaptionStyle>("editorial");

  const styles: CaptionStyle[] = ["editorial", "subtle", "karaoke"];

  return (
    <section id="layouts" className="py-24 border-t border-[#E5E3DC] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
              Typography
            </span>
            <h2 className="text-4xl font-serif font-normal tracking-tight text-[#141413]">
              Captions that feel like publication design.
            </h2>
            <p className="text-sm text-[#7A7870] leading-relaxed">
              Subtitles shouldn&apos;t look like generic yellow bubble text.
              Aakaar automatically generates timed editorial typography that
              elevates your brand identity.
            </p>

            {/* Caption selector */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-medium text-[#7A7870]">
                Select Style Preset:
              </div>
              <div className="flex gap-2">
                {styles.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setCaptionStyle(style)}
                    className={`px-3 py-1.5 rounded text-xs font-medium capitalize border transition-all cursor-pointer ${
                      captionStyle === style
                        ? "border-[#141413] bg-[#FFFFFF] text-[#141413] shadow-2xs"
                        : "border-[#E5E3DC] text-[#7A7870] hover:text-[#141413]"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-video bg-[#141413] rounded-xl border border-[#33322E] p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-white/50">
                <span>CAPTION_PREVIEW.MP4</span>
                <span>TIME: 00:18:42</span>
              </div>

              {/* Simulated dynamic caption based on style */}
              <div className="text-center my-auto px-4">
                {captionStyle === "editorial" && (
                  <p className="text-2xl sm:text-3xl font-serif font-light text-white tracking-tight leading-snug">
                    &ldquo;Simplicity isn&apos;t the absence of clutter,
                    it&apos;s the presence of{" "}
                    <span className="font-medium text-amber-300 italic">
                      purpose
                    </span>
                    .&rdquo;
                  </p>
                )}

                {captionStyle === "subtle" && (
                  <p className="text-lg sm:text-xl font-mono text-stone-300 tracking-wide">
                    [alex]: simplicity isn&apos;t the absence of clutter...
                  </p>
                )}

                {captionStyle === "karaoke" && (
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white/40">
                    <span className="text-white">Simplicity isn&apos;t</span>{" "}
                    <span className="text-amber-400">the absence</span>{" "}
                    <span>of clutter</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>Burn-in on export: Enabled</span>
                <span>100% Client-Side Rendered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
