import { Download, Video, Smartphone, Music, Square } from "lucide-react";
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
      title: "Podcast Stems",
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
    <section className="py-24 border-t border-[#2E3033] bg-[#131415] text-[#F2F1ED]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#FA5089] bg-[#FA5089]/10 px-2 py-0.5 rounded border border-[#FA5089]/20">
              DISTRIBUTION
            </span>
            <span className="text-[10px] font-mono text-[#8B8D90]">ZERO RENDERING WAIT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#F2F1ED]">
            Every container format. One single click.
          </h2>
          <p className="text-sm text-[#8B8D90] leading-relaxed">
            Export high-bitrate YouTube masters, audio-only podcast stems,
            and reframed 9:16 vertical clips without rendering bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {presets.map((preset, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-[#2E3033] bg-[#1A1B1D] hover:border-[#FA5089]/50 transition-all space-y-3 flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FA5089] bg-[#FA5089]/10 px-2 py-0.5 rounded border border-[#FA5089]/20">
                    {preset.badge}
                  </span>
                  <Download className="w-3.5 h-3.5 text-[#8B8D90] group-hover:text-[#FA5089] transition-colors" />
                </div>
                <h3 className="text-sm font-sans font-semibold text-[#F2F1ED]">
                  {preset.title}
                </h3>
                <div className="text-[11px] font-mono text-[#8B8D90]">
                  {preset.ratio}
                </div>
                <p className="text-xs text-[#8B8D90] leading-relaxed pt-1">
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
