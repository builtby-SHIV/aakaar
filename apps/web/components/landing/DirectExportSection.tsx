import { Download } from "lucide-react";
import React from "react";

export const DirectExportSection: React.FC = () => {
  const presets = [
    {
      title: "YouTube 4K / 1080p",
      ratio: "16:9 Landscape",
      badge: "Video Master",
      desc: "Full episode master with burned captions and multitrack leveled audio.",
    },
    {
      title: "Social Shorts & Reels",
      ratio: "9:16 Vertical",
      badge: "Reframed Clip",
      desc: "Auto-centered speaker tracking optimized for TikTok, Reels, and Shorts.",
    },
    {
      title: "Podcast Master",
      ratio: "Lossless Audio",
      badge: "48 kHz WAV / MP3",
      desc: "Isolated channel export with -14 LUFS loudness mastering.",
    },
    {
      title: "Feed Highlights",
      ratio: "1:1 Square",
      badge: "Social Card",
      desc: "Square format with prominent waveform visualizer and headline.",
    },
  ];

  return (
    <section className="py-24 border-t border-[#E5E3DC] bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
            Direct Export
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#141413]">
            Every format. One single click.
          </h2>
          <p className="text-base text-[#7A7870] leading-relaxed">
            Export high-bitrate YouTube masters, audio-only RSS podcast files,
            and reframed 9:16 vertical clips without rendering bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {presets.map((preset, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-[#E5E3DC] bg-[#FAF9F6] hover:border-[#141413] transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A7870] bg-[#EFECE6] px-2 py-0.5 rounded">
                    {preset.badge}
                  </span>
                  <Download className="w-3.5 h-3.5 text-[#7A7870]" />
                </div>
                <h3 className="text-base font-medium text-[#141413] font-serif">
                  {preset.title}
                </h3>
                <div className="text-xs font-mono text-[#7A7870]">
                  {preset.ratio}
                </div>
                <p className="text-xs text-[#7A7870] leading-relaxed pt-1">
                  {preset.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
