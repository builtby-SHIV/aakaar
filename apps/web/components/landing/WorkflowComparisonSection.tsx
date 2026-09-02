import {
  CheckCircle2,
  Clock,
  Cpu,
  HardDrive,
  Layers,
  Layers2,
  Sparkles,
  Video,
  XCircle,
  Zap,
} from "lucide-react";
import React from "react";

export const WorkflowComparisonSection: React.FC = () => {
  return (
    <section id="workflow" className="py-32 border-t border-[#E5E3DC] bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
            Paradigm Comparison
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#141413]">
            Why the traditional podcast stack <br />
            <span className="italic text-[#7A7870]">
              is fundamentally broken.
            </span>
          </h2>
          <p className="text-base text-[#7A7870] leading-relaxed">
            When creating content requires juggling cloud upload queues,
            drifting sample rates, third-party caption tools, and heavy desktop
            video editors, momentum dies.
          </p>
        </div>

        {/* High-Contrast Comparative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* The Old Way: Fragmented Cascade (Dark Theme) */}
          <div className="p-8 rounded-2xl border border-[#33322E] bg-[#141413] text-[#F7F6F2] flex flex-col justify-between space-y-8 shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E53E3E]">
                  <XCircle className="w-4 h-4" />
                  <span>The Fragmented Old Stack</span>
                </div>
                <span className="text-[10px] font-mono text-stone-400">
                  7 Separate Apps
                </span>
              </div>

              <div className="space-y-3.5">
                {[
                  {
                    icon: Clock,
                    step: "01",
                    title: "The Download Queue Lag",
                    desc: "Waiting 45 minutes for cloud servers to process and transfer 25 GB of unstitched raw media.",
                  },
                  {
                    icon: Cpu,
                    step: "02",
                    title: "Sample Rate Drift & Desync",
                    desc: "Host 44.1kHz vs Guest 48kHz drift out of sync after 20 minutes, requiring manual retiming.",
                  },
                  {
                    icon: Layers2,
                    step: "03",
                    title: "Desktop Editor Bloat",
                    desc: "Launching heavy desktop editing software just to switch camera angles and trim basic silence.",
                  },
                  {
                    icon: HardDrive,
                    step: "04",
                    title: "Manual Multi-App Exporting",
                    desc: "Exporting audio, importing into separate subtitle apps, and wrestling with re-encoding bottlenecks.",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-3.5 rounded-lg border border-white/10 bg-[#1E1D1A] min-h-[82px]"
                    >
                      <Icon className="w-4 h-4 text-[#E53E3E] shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#E53E3E] font-semibold">
                            {item.step}
                          </span>
                          <h4 className="text-xs font-medium text-white">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-stone-400 leading-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#E53E3E]">
              <span>Total Time to First Cut: ~2.5 hrs</span>
              <span>High Friction</span>
            </div>
          </div>

          {/* The Aakaar Way: The Unified Creative Flow (Light Warm Theme) */}
          <div className="p-8 rounded-2xl border border-[#E5E3DC] bg-[#FAF9F6] text-[#141413] flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E3DC]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Aakaar Continuous Stream</span>
                </div>
                <span className="text-[10px] font-mono text-[#7A7870]">
                  1 Browser Tab
                </span>
              </div>

              <div className="space-y-3.5">
                {[
                  {
                    icon: Zap,
                    step: "01",
                    title: "Instant Room Entry",
                    desc: "Guests click a link and join immediately. No installs, no accounts, no hardware confusion.",
                  },
                  {
                    icon: Video,
                    step: "02",
                    title: "Local Track Isolation",
                    desc: "1080p ProRes & 48kHz WAV are recorded straight into local browser storage at master fidelity.",
                  },
                  {
                    icon: Layers,
                    step: "03",
                    title: "Zero-Wait Timeline",
                    desc: "The moment you hit stop, your multitrack timeline is already arranged with auto-aligned audio.",
                  },
                  {
                    icon: Sparkles,
                    step: "04",
                    title: "In-Browser Publication",
                    desc: "Switch camera framing, burn editorial typography captions, and export 4K masters in seconds.",
                  },
                ].map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3.5 p-3.5 rounded-lg border border-[#E5E3DC]/80 bg-[#FFFFFF] shadow-2xs min-h-[82px] hover:border-[#141413] transition-colors"
                    >
                      <Icon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-emerald-600 font-semibold">
                            {card.step}
                          </span>
                          <h4 className="text-xs font-medium text-[#141413]">
                            {card.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-[#7A7870] leading-normal">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E3DC] flex items-center justify-between text-xs font-mono text-emerald-700">
              <span>Total Time to First Cut: Instant (0s)</span>
              <span>Zero Context Switching</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
