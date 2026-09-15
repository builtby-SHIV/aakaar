import { Sparkles, Video, Volume2, Cpu, Radio, Shield } from "lucide-react";
import React from "react";

export const LocalMultitrackSection: React.FC = () => {
  return (
    <section id="recording" className="py-24 border-t border-[#2E3033] bg-[#161718] text-[#F2F1ED]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#FA5089] bg-[#FA5089]/10 px-2 py-0.5 rounded border border-[#FA5089]/20">
              STREAM ISOLATION
            </span>
            <span className="text-[10px] font-mono text-[#8B8D90]">LOCAL MEDIASTREAM API</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#F2F1ED]">
            Local capture. No cloud compression.
          </h2>
          <p className="text-sm text-[#8B8D90] leading-relaxed">
            Video calls compress and drop frames when networks fluctuate. Aakaar
            writes uncompressed video and studio-grade 48kHz audio directly to
            the browser storage of every participant simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-[#2E3033] bg-[#1A1B1D] space-y-4 hover:border-[#FA5089]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#131415] border border-[#2E3033] flex items-center justify-center text-[#FA5089]">
              <Video className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-sans font-semibold text-[#F2F1ED]">
                  1080p Local Video
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">PRORES 422</span>
              </div>
              <p className="text-xs text-[#8B8D90] leading-relaxed">
                Raw camera tracks captured prior to network transmission,
                preserving rich color, depth, and crisp 60fps frame rates.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-[#2E3033] bg-[#1A1B1D] space-y-4 hover:border-[#FA5089]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#131415] border border-[#2E3033] flex items-center justify-center text-[#FA5089]">
              <Volume2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-sans font-semibold text-[#F2F1ED]">
                  48 kHz Lossless Audio
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">PCM 24-BIT</span>
              </div>
              <p className="text-xs text-[#8B8D90] leading-relaxed">
                Broadcast-standard uncompressed WAV channels for every speaker
                with automatic mic level normalization (-14 LUFS).
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-[#2E3033] bg-[#1A1B1D] space-y-4 hover:border-[#FA5089]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#131415] border border-[#2E3033] flex items-center justify-center text-[#FA5089]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-sans font-semibold text-[#F2F1ED]">
                  Zero Drift Alignment
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">&lt; 0.2 MS</span>
              </div>
              <p className="text-xs text-[#8B8D90] leading-relaxed">
                Hardware-synced timestamps ensure host and guest audio-video
                waveforms lock together flawlessly upon recording end.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
