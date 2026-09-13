"use client";

import React, { useState, useEffect } from "react";
import { X, Download, Share2, Check, Video, Smartphone, Music, Terminal, Copy } from "lucide-react";

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectTitle?: string;
    duration?: string;
}

export function ExportModal({
    isOpen,
    onClose,
    projectTitle = "Designing In-Browser Workspaces · Ep. 12",
    duration = "34:18",
}: ExportModalProps) {
    const [selectedPreset, setSelectedPreset] = useState<"youtube" | "short" | "podcast">("youtube");
    const [resolution, setResolution] = useState<"4k" | "1080p">("1080p");
    const [burnCaptions, setBurnCaptions] = useState(true);
    const [noiseReduction, setNoiseReduction] = useState(true);
    
    const [exportState, setExportState] = useState<"idle" | "rendering" | "completed">("idle");
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState("Compounding local video streams...");
    const [showCli, setShowCli] = useState(false);
    const [copiedCli, setCopiedCli] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (exportState === "rendering") {
        setProgress(0);
        interval = setInterval(() => {
            setProgress((prev) => {
            if (prev >= 100) {
                clearInterval(interval);
                setExportState("completed");
                return 100;
            }
            const next = prev + 4;
            if (next < 30) setCurrentStep("FFmpeg Wasm: compounding local camera tracks (1080p 60fps)...");
            else if (next < 65) setCurrentStep("Rasterizing editorial typography overlays & timing cues...");
            else if (next < 90) setCurrentStep("Normalizing 48 kHz 24-bit lossless PCM audio (-14 LUFS)...");
            else setCurrentStep("Packaging finalized MP4 stream container...");
            return next;
            });
        }, 110);
        }
        return () => clearInterval(interval);
    }, [exportState]);

    if (!isOpen) return null;

    const handleStartExport = () => {
        setExportState("rendering");
    };

    const handleReset = () => {
        setExportState("idle");
        setProgress(0);
        onClose();
    };

    const cliCommand = `curl -X POST https://api.aakaar.studio/v1/renders \\
    -H "Authorization: Bearer aka_live_99214" \\
    -d '{"preset":"${selectedPreset}","res":"${resolution}","audio":"48khz_pcm"}'`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade">
        <div className="bg-[#1A1B1D] border border-[#2E3033] rounded-xl max-w-lg w-full p-6 shadow-2xl relative text-[#F2F1ED]">
            <button
            onClick={handleReset}
            className="absolute top-5 right-5 text-[#8B8D90] hover:text-[#F2F1ED] p-1 rounded hover:bg-[#242628] transition-colors"
            >
            <X className="w-4 h-4" />
            </button>

            {exportState === "idle" && (
            <div className="space-y-6">
                <div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-[#FA5089] bg-[#FA5089]/10 px-2 py-0.5 rounded border border-[#FA5089]/20">
                    RENDER PIPELINE
                    </span>
                    <span className="text-[10px] font-mono text-[#8B8D90]">CLIENT-SIDE WASM</span>
                </div>
                <h3 className="text-lg font-medium text-[#F2F1ED] tracking-tight mt-1.5 font-sans">
                    {projectTitle}
                </h3>
                <p className="text-xs text-[#8B8D90] mt-0.5 font-mono">Duration: {duration} · 2 isolated streams</p>
                </div>

                {/* Presets */}
                <div className="space-y-2">
                <label className="text-xs font-mono text-[#8B8D90] uppercase tracking-wider">Target Preset</label>
                <div className="grid grid-cols-3 gap-2.5">
                    <button
                    type="button"
                    onClick={() => setSelectedPreset("youtube")}
                    className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between h-24 ${
                        selectedPreset === "youtube"
                        ? "border-[#FA5089] bg-[#242628] text-[#F2F1ED]"
                        : "border-[#2E3033] hover:border-[#38393C] bg-[#131415] text-[#8B8D90]"
                    }`}
                    >
                    <Video className="w-4 h-4 text-[#FA5089]" />
                    <div>
                        <div className="text-xs font-medium text-[#F2F1ED]">YouTube Master</div>
                        <div className="text-[10px] text-[#8B8D90] font-mono">16:9 Landscape</div>
                    </div>
                    </button>

                    <button
                    type="button"
                    onClick={() => setSelectedPreset("short")}
                    className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between h-24 ${
                        selectedPreset === "short"
                        ? "border-[#FA5089] bg-[#242628] text-[#F2F1ED]"
                        : "border-[#2E3033] hover:border-[#38393C] bg-[#131415] text-[#8B8D90]"
                    }`}
                    >
                    <Smartphone className="w-4 h-4 text-[#FA5089]" />
                    <div>
                        <div className="text-xs font-medium text-[#F2F1ED]">Vertical Clip</div>
                        <div className="text-[10px] text-[#8B8D90] font-mono">9:16 Social</div>
                    </div>
                    </button>

                    <button
                    type="button"
                    onClick={() => setSelectedPreset("podcast")}
                    className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between h-24 ${
                        selectedPreset === "podcast"
                        ? "border-[#FA5089] bg-[#242628] text-[#F2F1ED]"
                        : "border-[#2E3033] hover:border-[#38393C] bg-[#131415] text-[#8B8D90]"
                    }`}
                    >
                    <Music className="w-4 h-4 text-[#FA5089]" />
                    <div>
                        <div className="text-xs font-medium text-[#F2F1ED]">Audio Stems</div>
                        <div className="text-[10px] text-[#8B8D90] font-mono">48 kHz Lossless</div>
                    </div>
                    </button>
                </div>
                </div>

                {/* Technical Parameters */}
                <div className="space-y-3 pt-3 border-t border-[#2E3033]">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8B8D90] font-mono">RESOLUTION</span>
                    <div className="flex items-center gap-1.5 bg-[#131415] p-0.5 rounded border border-[#2E3033]">
                    <button
                        onClick={() => setResolution("1080p")}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                        resolution === "1080p" ? "bg-[#242628] text-[#F2F1ED] font-medium" : "text-[#8B8D90]"
                        }`}
                    >
                        1080p FHD
                    </button>
                    <button
                        onClick={() => setResolution("4k")}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                        resolution === "4k" ? "bg-[#242628] text-[#F2F1ED] font-medium" : "text-[#8B8D90]"
                        }`}
                    >
                        4K UHD
                    </button>
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8B8D90] font-mono">BURN_IN_SUBTITLES</span>
                    <input
                    type="checkbox"
                    checked={burnCaptions}
                    onChange={(e) => setBurnCaptions(e.target.checked)}
                    className="accent-[#FA5089] w-4 h-4 cursor-pointer"
                    />
                </div>

                <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8B8D90] font-mono">STUDIO_EQ_LEVELING (-14 LUFS)</span>
                    <input
                    type="checkbox"
                    checked={noiseReduction}
                    onChange={(e) => setNoiseReduction(e.target.checked)}
                    className="accent-[#FA5089] w-4 h-4 cursor-pointer"
                    />
                </div>

                {/* CLI Command Toggle */}
                <div className="pt-2">
                    <button
                    type="button"
                    onClick={() => setShowCli(!showCli)}
                    className="text-[11px] font-mono text-[#8B8D90] hover:text-[#F2F1ED] flex items-center gap-1.5 transition-colors"
                    >
                    <Terminal className="w-3 h-3 text-[#FA5089]" />
                    <span>{showCli ? "Hide cURL command" : "Show cURL API call"}</span>
                    </button>

                    {showCli && (
                    <div className="mt-2 p-2.5 rounded bg-[#131415] border border-[#2E3033] relative">
                        <pre className="text-[10px] font-mono text-emerald-400 overflow-x-auto select-all">
                        {cliCommand}
                        </pre>
                        <button
                        onClick={() => {
                            navigator.clipboard.writeText(cliCommand);
                            setCopiedCli(true);
                            setTimeout(() => setCopiedCli(false), 2000);
                        }}
                        className="absolute top-2 right-2 p-1 text-[#8B8D90] hover:text-white bg-[#1A1B1D] rounded border border-[#2E3033]"
                        >
                        {copiedCli ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                    </div>
                    )}
                </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#2E3033]">
                <button
                    onClick={onClose}
                    className="px-3.5 py-1.5 text-xs text-[#8B8D90] hover:text-[#F2F1ED] transition-colors font-mono"
                >
                    Cancel
                </button>
                <button
                    onClick={handleStartExport}
                    className="px-4 py-2 text-xs font-medium bg-[#FA5089] hover:bg-[#E03F74] text-white rounded-md transition-all flex items-center gap-1.5 shadow-sm shadow-[#FA5089]/20"
                >
                    <span>Compile & Export</span>
                </button>
                </div>
            </div>
            )}

            {exportState === "rendering" && (
            <div className="py-8 space-y-6 text-center">
                <div className="w-12 h-12 rounded-full border-2 border-[#FA5089] border-t-transparent animate-spin mx-auto" />
                
                <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FA5089]">WASM Pipeline Active</span>
                <h4 className="text-base font-medium text-[#F2F1ED]">Encoding Master Container...</h4>
                <p className="text-xs text-[#8B8D90] font-mono h-4 truncate">{currentStep}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 max-w-xs mx-auto">
                <div className="w-full h-1.5 bg-[#2E3033] rounded-full overflow-hidden">
                    <div
                    className="h-full bg-[#FA5089] transition-all duration-150"
                    style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[#8B8D90]">
                    <span>Progress</span>
                    <span className="text-[#F2F1ED]">{progress}%</span>
                </div>
                </div>
            </div>
            )}

            {exportState === "completed" && (
            <div className="py-6 space-y-6 text-center animate-fade">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Master Ready</span>
                <h4 className="text-lg font-medium text-[#F2F1ED]">Export Complete</h4>
                <p className="text-xs text-[#8B8D90] font-mono">
                    1080p ProRes / H.264 · 48 kHz PCM Stereo · 1.2 GB
                </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                    href="#download"
                    onClick={(e) => {
                    e.preventDefault();
                    alert("Downloading master: " + projectTitle.toLowerCase().replace(/\s+/g, "_") + ".mp4");
                    }}
                    className="w-full sm:w-auto px-5 py-2 text-xs font-medium bg-[#FA5089] hover:bg-[#E03F74] text-white rounded-md transition-all flex items-center justify-center gap-2"
                >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Master (.mp4)</span>
                </a>

                <button
                    onClick={() => alert("Permanent share URL copied: https://aakaar.studio/stream/ep12")}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-medium border border-[#2E3033] bg-[#242628] hover:bg-[#2C2E30] text-[#F2F1ED] rounded-md transition-all flex items-center justify-center gap-2 font-mono"
                >
                    <Share2 className="w-3.5 h-3.5 text-[#8B8D90]" />
                    <span>Copy Stream URL</span>
                </button>
                </div>
            </div>
            )}
        </div>
        </div>
    );
}
