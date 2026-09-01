"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Cpu,
  Download,
  HardDrive,
  Layers,
  Layers2,
  Pause,
  Play,
  Sparkles,
  Type,
  Video,
  Volume2,
  XCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { WaveformPreview } from "../components/WaveformPreview";

export default function LandingPage() {
  const [activeLayout, setActiveLayout] = useState<
    "split" | "host" | "guest" | "vertical"
  >("split");
  const [captionStyle, setCaptionStyle] = useState<
    "editorial" | "subtle" | "karaoke"
  >("editorial");
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#141413] selection:bg-[#141413] selection:text-[#F7F6F2]">
      <Navbar mode="landing" />

      {/* SECTION 1: HERO */}
      <section className="pt-20 pb-28 px-6 max-w-7xl mx-auto">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-[#FFFFFF] text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-[#E53E3E] animate-rec-pulse" />
            <span>Zero Desktop Installs</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.02] text-[#141413]">
            Record together. <br />
            <span className="italic font-normal text-[#7A7870]">
              Edit without leaving.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#7A7870] max-w-2xl font-normal leading-relaxed">
            Remote podcast recording and lightweight video editing, in one
            browser. Isolated multitrack recordings, instant timeline assembly,
            and burnt-in editorial typography.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/video-meet"
              className="px-6 py-3.5 bg-[#141413] text-[#F7F6F2] font-medium text-sm rounded-lg hover:bg-[#2B2A27] transition-all flex items-center gap-2 shadow-sm group"
            >
              <span>Start recording studio</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/video-meet"
              className="px-6 py-3.5 border border-[#E5E3DC] bg-[#FFFFFF] hover:bg-[#F2F0EB] text-[#141413] font-medium text-sm rounded-lg transition-all flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-[#2B7A4B]" />
              <span>Join Live Studio Room</span>
            </Link>
          </div>
        </div>

        {/* HERO PRODUCT CANVAS PREVIEW */}
        <div className="mt-16 border border-[#E5E3DC] rounded-2xl bg-[#FFFFFF] shadow-xl overflow-hidden">
          {/* Studio Chrome Header */}
          <div className="px-5 py-3.5 border-b border-[#E5E3DC] bg-[#FAF9F6] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E3DC]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E3DC]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E3DC]" />
              </div>
              <span className="text-xs font-medium text-[#141413] pl-2 border-l border-[#E5E3DC]">
                Ep. 14 — Spatial Design in Web Media
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#FFF1F0] text-[#E53E3E] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#E53E3E] animate-rec-pulse" />
                <span>REC 00:24:18</span>
              </div>
              <Link
                href="/editor/demo"
                className="text-xs font-medium px-3 py-1 bg-[#141413] text-[#F7F6F2] rounded hover:bg-[#2B2A27] transition-all"
              >
                Open in Editor
              </Link>
            </div>
          </div>

          {/* Interactive Dual-View Video Frame */}
          <div className="p-6 bg-[#141413] grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {/* Host Feed */}
            <div className="relative aspect-video rounded-lg bg-[#22211E] overflow-hidden border border-[#33322E] flex flex-col justify-between p-4">
              <div className="flex items-center justify-between z-10">
                <span className="px-2 py-0.5 rounded bg-[#141413]/70 backdrop-blur-md text-[11px] font-mono text-white/90">
                  Alex Rivers (Host) · 1080p Local
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  48kHz Lossless
                </span>
              </div>

              {/* Simulated video frame */}
              <div className="absolute inset-0 flex items-center justify-center opacity-70">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-stone-700 to-stone-500 mx-auto flex items-center justify-center text-white text-lg font-light">
                    AR
                  </div>
                </div>
              </div>

              {/* Waveform footer */}
              <div className="z-10 flex items-center justify-between">
                <WaveformPreview
                  bars={24}
                  height={20}
                  activeColor="#60A5FA"
                  inactiveColor="#3B82F6/40"
                  progress={0.7}
                  animated
                />
                <span className="text-[10px] font-mono text-stone-400">
                  -14.2 LUFS
                </span>
              </div>
            </div>

            {/* Guest Feed */}
            <div className="relative aspect-video rounded-lg bg-[#22211E] overflow-hidden border border-[#33322E] flex flex-col justify-between p-4">
              <div className="flex items-center justify-between z-10">
                <span className="px-2 py-0.5 rounded bg-[#141413]/70 backdrop-blur-md text-[11px] font-mono text-white/90">
                  Elena Chen (Guest) · 1080p Local
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  48kHz Lossless
                </span>
              </div>

              {/* Simulated video frame */}
              <div className="absolute inset-0 flex items-center justify-center opacity-70">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-800 to-amber-600 mx-auto flex items-center justify-center text-white text-lg font-light">
                    EC
                  </div>
                </div>
              </div>

              {/* Waveform footer */}
              <div className="z-10 flex items-center justify-between">
                <WaveformPreview
                  bars={24}
                  height={20}
                  activeColor="#34D399"
                  inactiveColor="#10B981/40"
                  progress={0.4}
                  animated
                />
                <span className="text-[10px] font-mono text-stone-400">
                  -14.0 LUFS
                </span>
              </div>
            </div>

            {/* Live Editorial Caption Preview Overlay */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 rounded-md bg-[#141413]/85 backdrop-blur-md border border-white/10 text-white text-center text-sm font-serif tracking-tight shadow-xl max-w-lg">
              &ldquo;The biggest breakthrough was realizing the editor
              shouldn&apos;t be a separate tool.&rdquo;
            </div>
          </div>

          {/* Integrated Timeline Strip */}
          <div className="p-4 bg-[#FAF9F6] border-t border-[#E5E3DC] flex items-center justify-between text-xs text-[#7A7870]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-full bg-[#141413] text-[#F7F6F2] flex items-center justify-center hover:bg-[#2B2A27]"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                )}
              </button>
              <span className="font-mono text-[#141413]">
                00:24:18 / 00:42:17
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-[#EFECE6] text-[11px] font-mono text-[#141413]">
                Multitrack Synchronized
              </span>
              <span className="px-2 py-0.5 rounded bg-[#EFECE6] text-[11px] font-mono text-[#141413]">
                Auto-Captions 100%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3: REDEFINED "THE PROBLEM VS AAKAAR WORKFLOW" */}
      <section
        id="workflow"
        className="py-32 border-t border-[#E5E3DC] bg-[#FFFFFF]"
      >
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
              drifting sample rates, third-party caption tools, and heavy
              desktop video editors, momentum dies.
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

      {/* SECTION 4: LOCAL MULTITRACK RECORDING */}
      <section
        id="recording"
        className="py-24 border-t border-[#E5E3DC] bg-[#F7F6F2]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
              Audio & Video Engine
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#141413]">
              Local isolation. No internet compression.
            </h2>
            <p className="text-base text-[#7A7870] leading-relaxed">
              Video calls compress and drop frames when networks fluctuate.
              Aakaar writes uncompressed video and studio-grade 48kHz audio
              directly to the browser storage of every participant
              simultaneously.
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

      {/* SECTION 6 & 8: LIGHTWEIGHT IN-BROWSER EDITOR & LAYOUT SWITCHER */}
      <section
        id="editor"
        className="py-24 border-t border-[#E5E3DC] bg-[#FFFFFF]"
      >
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
              {(
                [
                  { id: "split", label: "Side by Side" },
                  { id: "host", label: "Host Focus" },
                  { id: "guest", label: "Guest Focus" },
                  { id: "vertical", label: "9:16 Social" },
                ] as const
              ).map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => setActiveLayout(layout.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
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

      {/* SECTION 7: EDITORIAL CAPTIONS */}
      <section
        id="layouts"
        className="py-24 border-t border-[#E5E3DC] bg-[#FAF9F6]"
      >
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
                  {(["editorial", "subtle", "karaoke"] as const).map(
                    (style) => (
                      <button
                        key={style}
                        onClick={() => setCaptionStyle(style)}
                        className={`px-3 py-1.5 rounded text-xs font-medium capitalize border transition-all ${
                          captionStyle === style
                            ? "border-[#141413] bg-[#FFFFFF] text-[#141413] shadow-2xs"
                            : "border-[#E5E3DC] text-[#7A7870] hover:text-[#141413]"
                        }`}
                      >
                        {style}
                      </button>
                    ),
                  )}
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

      {/* SECTION 10: EXPORT PRESETS */}
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
            {[
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
            ].map((preset, i) => (
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

      {/* SECTION 11: FINAL EDITORIAL CTA */}
      <section className="py-32 border-t border-[#E5E3DC] bg-[#F7F6F2] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
            The Next Generation Studio
          </span>
          <h2 className="text-5xl sm:text-7xl font-serif font-normal tracking-tight text-[#141413] leading-[1.06]">
            Your next episode <br />
            <span className="italic text-[#7A7870]">starts here.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#7A7870] max-w-xl mx-auto leading-relaxed">
            Record together in pristine local quality. Edit and publish without
            leaving the tab.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/video-meet"
              className="w-full sm:w-auto px-8 py-4 bg-[#141413] text-[#F7F6F2] font-medium text-sm rounded-lg hover:bg-[#2B2A27] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Start recording studio now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/video-meet"
              className="w-full sm:w-auto px-6 py-4 border border-[#E5E3DC] bg-[#FFFFFF] hover:bg-[#F2F0EB] text-[#141413] font-medium text-sm rounded-lg transition-all"
            >
              Open Studio Lobby
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
