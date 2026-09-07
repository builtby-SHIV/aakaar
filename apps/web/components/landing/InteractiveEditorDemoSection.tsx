"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Code2, 
  Terminal, 
  Play, 
  Pause, 
  Layers, 
  Sparkles, 
  Volume2, 
  Cpu, 
  Check, 
  Copy, 
  ArrowRight,
  Video,
  Smartphone,
  Square
} from "lucide-react";
import { WaveformPreview } from "../WaveformPreview";

type TabMode = "workspace" | "code" | "telemetry";
type CodeLang = "react" | "ffmpeg" | "webrtc";

export const InteractiveEditorDemoSection: React.FC = () => {
  const [tabMode, setTabMode] = useState<TabMode>("workspace");
  const [codeLang, setCodeLang] = useState<CodeLang>("react");
  const [layoutMode, setLayoutMode] = useState<"split" | "host" | "guest" | "vertical">("split");
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);

  const codeSnippets: Record<CodeLang, string> = {
    react: `import { AakaarStudio, MultitrackTimeline } from "@aakaar/react";

export function EpisodeStudio() {
  return (
    <AakaarStudio
      sessionId="session_prod_89412"
      tracks={[
        { id: "host", stream: "1080p60", sampleRate: 48000, codec: "prores_422" },
        { id: "guest", stream: "1080p60", sampleRate: 48000, codec: "prores_422" }
      ]}
      layout="${layoutMode}"
      telemetry={{ clockSync: "hardware_drift_compensate" }}
      onRenderComplete={(master) => console.log("Master ready:", master.url)}
    />
  );
}`,
    ffmpeg: `# In-Browser WebAssembly FFmpeg compilation call
ffmpeg -i host_stream.raw -i guest_stream.raw \\
  -filter_complex "[0:v]scale=960:1080[v0]; [1:v]scale=960:1080[v1]; [v0][v1]hstack=inputs=2[v]" \\
  -filter_complex "[0:a][1:a]amerge=inputs=2,loudnorm=I=-14:TP=-1:LRA=11[a]" \\
  -map "[v]" -map "[a]" \\
  -c:v libx264 -preset fast -crf 18 \\
  -c:a aac -b:a 320k \\
  -movflags +faststart ep14_master_1080p.mp4`,
    webrtc: `// Live peer stream chunk telemetry
{
  "sessionId": "session_prod_89412",
  "localChunkBuffer": "OriginPrivateFileSystem",
  "tracks": [
    {
      "peerId": "peer_host_alex",
      "codec": "VP9_ProResFallback",
      "resolution": "1920x1080@60fps",
      "bitrate": "6.4 Mbps",
      "packetLoss": "0.00%",
      "sampleClock": "48000Hz (Lossless)",
      "driftOffset": "< 0.18 ms"
    },
    {
      "peerId": "peer_guest_elena",
      "codec": "VP9_ProResFallback",
      "resolution": "1920x1080@60fps",
      "bitrate": "6.1 Mbps",
      "packetLoss": "0.00%",
      "sampleClock": "48000Hz (Lossless)",
      "driftOffset": "< 0.14 ms"
    }
  ]
}`
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippets[codeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo" className="py-24 border-t border-[#2E3033] bg-[#131415] text-[#F2F1ED] relative">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2E3033]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#FA5089] bg-[#FA5089]/10 px-2 py-0.5 rounded border border-[#FA5089]/20">
                INTERACTIVE ENGINE
              </span>
              <span className="text-[10px] font-mono text-[#8B8D90]">REAL TIME PIPELINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#F2F1ED]">
              Show the product. <br className="hidden sm:inline" />
              <span className="text-[#8B8D90]">Show the code.</span>
            </h2>
            <p className="text-sm text-[#8B8D90] leading-relaxed">
              Toggle between the live interactive workspace and the raw underlying WebRTC & WASM media architecture.
            </p>
          </div>

          {/* Primary View Toggle: Workspace vs Code vs Telemetry */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg border border-[#2E3033] bg-[#1A1B1D]">
            <button
              type="button"
              onClick={() => setTabMode("workspace")}
              className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                tabMode === "workspace"
                  ? "bg-[#FA5089] text-white shadow-sm"
                  : "text-[#8B8D90] hover:text-[#F2F1ED]"
              }`}
            >
              Workspace View
            </button>
            <button
              type="button"
              onClick={() => setTabMode("code")}
              className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                tabMode === "code"
                  ? "bg-[#FA5089] text-white shadow-sm"
                  : "text-[#8B8D90] hover:text-[#F2F1ED]"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Show Code</span>
            </button>
            <button
              type="button"
              onClick={() => setTabMode("telemetry")}
              className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                tabMode === "telemetry"
                  ? "bg-[#FA5089] text-white shadow-sm"
                  : "text-[#8B8D90] hover:text-[#F2F1ED]"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Telemetry</span>
            </button>
          </div>
        </div>

        {/* Central Interactive Console */}
        <div className="border border-[#2E3033] rounded-xl bg-[#1A1B1D] shadow-2xl overflow-hidden">
          {/* Top Console Bar */}
          <div className="px-5 py-3 border-b border-[#2E3033] bg-[#161718] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-mono text-[#8B8D90] pl-2 border-l border-[#2E3033]">
                {tabMode === "workspace"
                  ? "aakaar-live-studio // inspector"
                  : tabMode === "code"
                  ? `runtime-sdk // ${codeLang}.ts`
                  : "webrtc-mesh // network-telemetry.json"}
              </span>
            </div>

            {/* Sub-controls based on tabMode */}
            {tabMode === "workspace" && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#8B8D90]">FRAMING:</span>
                <div className="flex items-center gap-1 bg-[#131415] p-0.5 rounded border border-[#2E3033]">
                  {[
                    { id: "split", label: "Split 16:9", icon: Video },
                    { id: "host", label: "Host Focus", icon: Square },
                    { id: "guest", label: "Guest Focus", icon: Square },
                    { id: "vertical", label: "9:16 Reel", icon: Smartphone },
                  ].map((preset) => {
                    const Icon = preset.icon;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setLayoutMode(preset.id as any)}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all ${
                          layoutMode === preset.id
                            ? "bg-[#242628] text-[#F2F1ED] font-medium"
                            : "text-[#8B8D90] hover:text-[#F2F1ED]"
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {tabMode === "code" && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#131415] p-0.5 rounded border border-[#2E3033]">
                  {(["react", "ffmpeg", "webrtc"] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setCodeLang(lang)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all uppercase ${
                        codeLang === lang
                          ? "bg-[#242628] text-[#FA5089] font-medium"
                          : "text-[#8B8D90] hover:text-[#F2F1ED]"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={copyCode}
                  className="p-1.5 text-[#8B8D90] hover:text-white bg-[#131415] rounded border border-[#2E3033] transition-colors"
                  title="Copy code snippet"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6">
            {tabMode === "workspace" && (
              <div className="space-y-6">
                {/* Visual Canvas */}
                <div className="bg-[#131415] border border-[#2E3033] rounded-lg p-6 relative overflow-hidden">
                  <div className="max-w-3xl mx-auto">
                    {layoutMode === "split" && (
                      <div className="grid grid-cols-2 gap-4 aspect-video bg-[#18191B] rounded-lg p-3.5 border border-[#2E3033] items-center">
                        <div className="h-full rounded-md bg-[#242628] border border-[#2E3033] flex flex-col justify-between p-3">
                          <span className="text-[10px] font-mono text-[#8B8D90]">Alex Rivers (Host)</span>
                          <div className="text-center font-mono text-sm text-[#F2F1ED]">1080p60 LOCAL</div>
                          <WaveformPreview bars={18} height={14} activeColor="#FA5089" inactiveColor="#2E3033" progress={0.6} animated={isPlaying} />
                        </div>
                        <div className="h-full rounded-md bg-[#242628] border border-[#2E3033] flex flex-col justify-between p-3">
                          <span className="text-[10px] font-mono text-[#8B8D90]">Elena Chen (Guest)</span>
                          <div className="text-center font-mono text-sm text-[#F2F1ED]">1080p60 LOCAL</div>
                          <WaveformPreview bars={18} height={14} activeColor="#10B981" inactiveColor="#2E3033" progress={0.4} animated={isPlaying} />
                        </div>
                      </div>
                    )}

                    {layoutMode === "host" && (
                      <div className="aspect-video bg-[#18191B] rounded-lg p-6 border border-[#2E3033] flex flex-col justify-between">
                        <span className="text-xs font-mono text-[#8B8D90]">Alex Rivers (Solo Active Speaker)</span>
                        <div className="text-center font-mono text-lg text-[#F2F1ED]">1080p60 FULL-FRAME MASTER</div>
                        <WaveformPreview bars={36} height={16} activeColor="#FA5089" inactiveColor="#2E3033" progress={0.7} animated={isPlaying} />
                      </div>
                    )}

                    {layoutMode === "guest" && (
                      <div className="aspect-video bg-[#18191B] rounded-lg p-6 border border-[#2E3033] flex flex-col justify-between">
                        <span className="text-xs font-mono text-[#8B8D90]">Elena Chen (Solo Active Speaker)</span>
                        <div className="text-center font-mono text-lg text-[#F2F1ED]">1080p60 FULL-FRAME MASTER</div>
                        <WaveformPreview bars={36} height={16} activeColor="#10B981" inactiveColor="#2E3033" progress={0.5} animated={isPlaying} />
                      </div>
                    )}

                    {layoutMode === "vertical" && (
                      <div className="w-56 mx-auto aspect-[9/16] bg-[#18191B] rounded-xl p-3 border border-[#2E3033] flex flex-col justify-between">
                        <div className="h-[48%] rounded bg-[#242628] border border-[#2E3033] p-2 flex flex-col justify-between">
                          <span className="text-[9px] font-mono text-[#8B8D90]">Host 9:16</span>
                          <span className="text-[10px] font-mono text-center">Reframe</span>
                        </div>
                        <div className="h-[48%] rounded bg-[#242628] border border-[#2E3033] p-2 flex flex-col justify-between">
                          <span className="text-[9px] font-mono text-[#8B8D90]">Guest 9:16</span>
                          <span className="text-[10px] font-mono text-center">Reframe</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Timeline Control Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#2E3033] text-xs font-mono text-[#8B8D90]">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-7 h-7 rounded bg-[#FA5089] hover:bg-[#E03F74] text-white flex items-center justify-center transition-colors"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                    <span className="text-[#F2F1ED]">00:14:02.1 / 00:38:40.0</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-[#131415] border border-[#2E3033] text-emerald-400">
                      AUDIO: -14.1 LUFS
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#131415] border border-[#2E3033] text-[#F2F1ED]">
                      AUTO_CAPTION: ACTIVE
                    </span>
                    <Link
                      href="/editor/demo"
                      className="inline-flex items-center gap-1 text-[#FA5089] hover:underline"
                    >
                      <span>Open Editor</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {(tabMode === "code" || tabMode === "telemetry") && (
              <div className="relative">
                <pre className="p-5 bg-[#131415] border border-[#2E3033] rounded-lg font-mono text-xs text-[#F2F1ED] overflow-x-auto leading-relaxed">
                  <code>{tabMode === "code" ? codeSnippets[codeLang] : codeSnippets["webrtc"]}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
