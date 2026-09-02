import { Sparkles, Video, Volume2 } from "lucide-react";
import React from "react";

export const LocalMultitrackSection: React.FC = () => {
  return (
    <section id="recording" className="py-24 border-t border-[#E5E3DC] bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
            Audio & Video Engine
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#141413]">
            Local isolation. No internet compression.
          </h2>
          <p className="text-base text-[#7A7870] leading-relaxed">
            Video calls compress and drop frames when networks fluctuate. Aakaar
            writes uncompressed video and studio-grade 48kHz audio directly to
            the browser storage of every participant simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-xl border border-[#E5E3DC] bg-[#FFFFFF] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E5E3DC] flex items-center justify-center text-[#141413]">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-[#141413] font-serif">
              1080p Local Video
            </h3>
            <p className="text-xs text-[#7A7870] leading-relaxed">
              Raw camera tracks captured prior to network transmission,
              preserving rich color, depth, and crisp 60fps frame rates.
            </p>
          </div>

          <div className="p-8 rounded-xl border border-[#E5E3DC] bg-[#FFFFFF] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E5E3DC] flex items-center justify-center text-[#141413]">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-[#141413] font-serif">
              48 kHz Lossless Audio
            </h3>
            <p className="text-xs text-[#7A7870] leading-relaxed">
              Broadcast-standard uncompressed WAV channels for every speaker
              with automatic mic level normalization.
            </p>
          </div>

          <div className="p-8 rounded-xl border border-[#E5E3DC] bg-[#FFFFFF] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E5E3DC] flex items-center justify-center text-[#141413]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-[#141413] font-serif">
              Zero Drift Alignment
            </h3>
            <p className="text-xs text-[#7A7870] leading-relaxed">
              Hardware-synced timestamps ensure host and guest audio-video
              waveforms lock together flawlessly upon recording end.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
