"use client";

import { ArrowRight, Music, Smartphone, Square, Video } from "lucide-react";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

export default function TemplatesPage() {
  const templates = [
    {
      id: "yt-16-9",
      title: "YouTube Interview Master",
      ratio: "16:9 Landscape",
      icon: Video,
      desc: "Side-by-side host/guest split with auto active speaker focus, lower-third watermark, and burned-in editorial subtitles.",
      resolution: "4K UHD / 1080p",
    },
    {
      id: "social-9-16",
      title: "Vertical Social Clip / Reel",
      ratio: "9:16 Vertical",
      icon: Smartphone,
      desc: "Stacked dual-speaker frame with centered karaoke-style animated captions and high-contrast waveforms for TikTok & Shorts.",
      resolution: "1080x1920 60fps",
    },
    {
      id: "podcast-audio",
      title: "Lossless Audio RSS Master",
      ratio: "Broadcast Audio",
      icon: Music,
      desc: "Isolated multichannel uncompressed WAV with -14 LUFS loudness mastering and automatic studio noise reduction.",
      resolution: "48 kHz 24-bit",
    },
    {
      id: "square-card",
      title: "Social Highlight Square",
      ratio: "1:1 Square",
      icon: Square,
      desc: "Square layout featuring dynamic waveform visualizer, episode badge, and large centered quote typography.",
      resolution: "1080x1080",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#141413] flex flex-col justify-between">
      <div>
        <Navbar mode="app" />

        <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
          {/* Header */}
          <div className="space-y-2 pb-6 border-b border-[#E5E3DC]">
            <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
              Studio Presets
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#141413]">
              Layout Templates
            </h1>
            <p className="text-sm text-[#7A7870] max-w-xl">
              Start with pre-configured multitrack layouts, caption placements,
              and export formats designed for modern creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((tpl) => {
              const Icon = tpl.icon;
              return (
                <div
                  key={tpl.id}
                  className="p-8 rounded-xl border border-[#E5E3DC] bg-[#FFFFFF] hover:border-[#141413] transition-all space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E5E3DC] flex items-center justify-center text-[#141413]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF9F6] text-[#7A7870]">
                        {tpl.resolution}
                      </span>
                    </div>

                    <h3 className="text-lg font-medium text-[#141413] tracking-tight">
                      {tpl.title}
                    </h3>
                    <div className="text-xs font-mono text-[#7A7870]">
                      {tpl.ratio}
                    </div>
                    <p className="text-xs text-[#7A7870] leading-relaxed">
                      {tpl.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E3DC] flex items-center justify-between">
                    <span className="text-xs text-[#7A7870]">
                      Default Preset
                    </span>
                    <Link
                      href={`/editor/${tpl.id}`}
                      className="text-xs font-medium text-[#141413] group-hover:text-[#E54D2E] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open in Editor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
