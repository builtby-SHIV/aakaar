"use client";

import { Layers, Type, Volume2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { DemoLayout } from "./types";

export const InteractiveEditorDemoSection: React.FC = () => {
  const [activeLayout, setActiveLayout] = useState<DemoLayout>("split");

  const layouts: { id: DemoLayout; label: string }[] = [
    { id: "split", label: "Side by Side" },
    { id: "host", label: "Host Focus" },
    { id: "guest", label: "Guest Focus" },
    { id: "vertical", label: "9:16 Social" },
  ];

  return (
    <section id="editor" className="py-24 border-t border-[#E5E3DC] bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
              The Editor
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#141413]">
              Decisions instead of complexity.
            </h2>
            <p className="text-base text-[#7A7870] leading-relaxed">
              You don&apos;t need 200 toolbar buttons. You just need to switch
              speakers, add captions, trim silence, and export.
            </p>
          </div>

          {/* Interactive Layout Switcher Buttons */}
          <div className="flex items-center gap-2 p-1 rounded-lg border border-[#E5E3DC] bg-[#FAF9F6]">
            {layouts.map((layout) => (
              <button
                key={layout.id}
                type="button"
                onClick={() => setActiveLayout(layout.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  activeLayout === layout.id
                    ? "bg-[#141413] text-[#F7F6F2] shadow-2xs"
                    : "text-[#7A7870] hover:text-[#141413]"
                }`}
              >
                {layout.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Editor Canvas Preview */}
        <div className="border border-[#E5E3DC] rounded-xl bg-[#141413] p-8 shadow-2xl space-y-6">
          <div className="max-w-3xl mx-auto">
            {activeLayout === "split" && (
              <div className="grid grid-cols-2 gap-4 aspect-video bg-[#22211E] rounded-lg p-3 border border-[#33322E] items-center">
                <div className="h-full rounded bg-stone-800 flex items-center justify-center text-white/70 text-xs font-mono">
                  Host: Alex Rivers
                </div>
                <div className="h-full rounded bg-stone-800 flex items-center justify-center text-white/70 text-xs font-mono">
                  Guest: Elena Chen
                </div>
              </div>
            )}

            {activeLayout === "host" && (
              <div className="aspect-video bg-[#22211E] rounded-lg p-3 border border-[#33322E] flex items-center justify-center relative">
                <div className="w-full h-full rounded bg-stone-800 flex items-center justify-center text-white/70 text-xs font-mono">
                  Active Speaker: Alex Rivers (Full Frame)
                </div>
              </div>
            )}

            {activeLayout === "guest" && (
              <div className="aspect-video bg-[#22211E] rounded-lg p-3 border border-[#33322E] flex items-center justify-center relative">
                <div className="w-full h-full rounded bg-stone-800 flex items-center justify-center text-white/70 text-xs font-mono">
                  Active Speaker: Elena Chen (Full Frame)
                </div>
              </div>
            )}

            {activeLayout === "vertical" && (
              <div className="w-56 mx-auto aspect-[9/16] bg-[#22211E] rounded-xl p-3 border border-[#33322E] flex flex-col justify-between">
                <div className="h-[48%] rounded bg-stone-800 flex items-center justify-center text-white/70 text-[10px] font-mono">
                  Host Reframe
                </div>
                <div className="h-[48%] rounded bg-stone-800 flex items-center justify-center text-white/70 text-[10px] font-mono">
                  Guest Reframe
                </div>
              </div>
            )}
          </div>

          {/* Editor Control Tool Strip */}
          <div className="max-w-3xl mx-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-white">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Layout: {activeLayout.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-cyan-400" />
                <span>Editorial Captions Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-purple-400" />
                <span>Audio Leveling On</span>
              </div>
            </div>

            <Link
              href="/editor/demo"
              className="text-xs font-medium text-white px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded transition-colors"
            >
              Open Full Interactive Editor →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
