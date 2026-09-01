"use client";

import React, { useState, useEffect } from "react";
import { X, Download, Share2, Check, Sparkles, Film, Music, Smartphone, Video } from "lucide-react";

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
          if (next < 30) setCurrentStep("Compounding local video tracks (1080p 60fps)...");
          else if (next < 65) setCurrentStep("Rendering typography captions & layout transitions...");
          else if (next < 90) setCurrentStep("Mastering 48 kHz lossless stereo audio stream...");
          else setCurrentStep("Packaging finalized MP4 container...");
          return next;
        });
      }, 120);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/40 backdrop-blur-sm animate-kanso-fade">
      <div className="bg-[#F7F6F2] border border-[#E5E3DC] rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-[#7A7870] hover:text-[#141413] p-1 rounded-md hover:bg-[#EFECE6] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {exportState === "idle" && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-mono text-[#7A7870]">Export Project</span>
              <h3 className="text-xl font-medium text-[#141413] tracking-tight mt-1 font-serif">
                {projectTitle}
              </h3>
              <p className="text-xs text-[#7A7870] mt-0.5 font-mono">Duration: {duration} · Multitrack synced</p>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#7A7870]">Select Preset</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPreset("youtube")}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between h-24 ${
                    selectedPreset === "youtube"
                      ? "border-[#141413] bg-[#FFFFFF] shadow-sm"
                      : "border-[#E5E3DC] hover:border-[#D1CEC5] bg-transparent"
                  }`}
                >
                  <Video className="w-4 h-4 text-[#141413]" />
                  <div>
                    <div className="text-xs font-medium text-[#141413]">YouTube</div>
                    <div className="text-[10px] text-[#7A7870] font-mono">16:9 Landscape</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPreset("short")}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between h-24 ${
                    selectedPreset === "short"
                      ? "border-[#141413] bg-[#FFFFFF] shadow-sm"
                      : "border-[#E5E3DC] hover:border-[#D1CEC5] bg-transparent"
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#141413]" />
                  <div>
                    <div className="text-xs font-medium text-[#141413]">Short / Reel</div>
                    <div className="text-[10px] text-[#7A7870] font-mono">9:16 Vertical</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPreset("podcast")}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between h-24 ${
                    selectedPreset === "podcast"
                      ? "border-[#141413] bg-[#FFFFFF] shadow-sm"
                      : "border-[#E5E3DC] hover:border-[#D1CEC5] bg-transparent"
                  }`}
                >
                  <Music className="w-4 h-4 text-[#141413]" />
                  <div>
                    <div className="text-xs font-medium text-[#141413]">Audio Only</div>
                    <div className="text-[10px] text-[#7A7870] font-mono">48 kHz WAV</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Quality & Options */}
            <div className="space-y-3 pt-2 border-t border-[#E5E3DC]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#141413] font-medium">Resolution</span>
                <div className="flex items-center gap-1.5 bg-[#EFECE6] p-0.5 rounded-md">
                  <button
                    onClick={() => setResolution("1080p")}
                    className={`px-2.5 py-1 rounded text-xs transition-all ${
                      resolution === "1080p" ? "bg-[#FFFFFF] text-[#141413] font-medium shadow-2xs" : "text-[#7A7870]"
                    }`}
                  >
                    1080p FHD
                  </button>
                  <button
                    onClick={() => setResolution("4k")}
                    className={`px-2.5 py-1 rounded text-xs transition-all ${
                      resolution === "4k" ? "bg-[#FFFFFF] text-[#141413] font-medium shadow-2xs" : "text-[#7A7870]"
                    }`}
                  >
                    4K UHD
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#141413]">Burn-in editorial captions</span>
                <input
                  type="checkbox"
                  checked={burnCaptions}
                  onChange={(e) => setBurnCaptions(e.target.checked)}
                  className="accent-[#141413] w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#141413]">Studio noise leveling & EQ</span>
                <input
                  type="checkbox"
                  checked={noiseReduction}
                  onChange={(e) => setNoiseReduction(e.target.checked)}
                  className="accent-[#141413] w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5E3DC]">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#7A7870] hover:text-[#141413] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStartExport}
                className="px-5 py-2 text-xs font-medium bg-[#141413] text-[#F7F6F2] rounded-md hover:bg-[#2B2A27] transition-all flex items-center gap-1.5"
              >
                <span>Render & Export</span>
              </button>
            </div>
          </div>
        )}

        {exportState === "rendering" && (
          <div className="py-8 space-y-6 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#141413] border-t-transparent animate-spin mx-auto" />
            
            <div className="space-y-2">
              <h4 className="text-base font-medium text-[#141413] font-serif">Exporting Video...</h4>
              <p className="text-xs text-[#7A7870] font-mono h-4">{currentStep}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 max-w-xs mx-auto">
              <div className="w-full h-1.5 bg-[#E5E3DC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#141413] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-[#7A7870]">
                <span>Rendering</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        )}

        {exportState === "completed" && (
          <div className="py-6 space-y-6 text-center animate-kanso-fade">
            <div className="w-12 h-12 rounded-full bg-[#2B7A4B]/10 text-[#2B7A4B] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-medium text-[#141413] font-serif">Your video is ready</h4>
              <p className="text-xs text-[#7A7870]">
                1080p MP4 · 48 kHz Lossless Stereo · Burned Captions
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Download started: " + projectTitle.toLowerCase().replace(/\s+/g, "_") + ".mp4");
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium bg-[#141413] text-[#F7F6F2] rounded-md hover:bg-[#2B2A27] transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Video (1.2 GB)</span>
              </a>

              <button
                onClick={() => alert("Shareable link copied to clipboard: https://aakaar.studio/share/ep12")}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium border border-[#E5E3DC] bg-[#FFFFFF] hover:bg-[#EFECE6] text-[#141413] rounded-md transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Share Link</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
