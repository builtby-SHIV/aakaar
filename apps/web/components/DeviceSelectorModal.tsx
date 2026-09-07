"use client";

import React, { useState } from "react";
import { X, Mic, Video, Volume2, Cpu } from "lucide-react";
import { WaveformPreview } from "./WaveformPreview";

interface DeviceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (devices: { mic: string; camera: string; speaker: string }) => void;
}

export function DeviceSelectorModal({ isOpen, onClose, onSave }: DeviceSelectorModalProps) {
  const [selectedMic, setSelectedMic] = useState("Default - Built-in Microphone (Studio Level)");
  const [selectedCamera, setSelectedCamera] = useState("FaceTime HD Camera / External 1080p");
  const [selectedSpeaker, setSelectedSpeaker] = useState("Headphones (High-Resolution Output)");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave?.({ mic: selectedMic, camera: selectedCamera, speaker: selectedSpeaker });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade">
      <div className="bg-[#1A1B1D] border border-[#2E3033] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-6 text-[#F2F1ED]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#FA5089]" />
            <h3 className="text-sm font-medium text-[#F2F1ED] tracking-tight font-mono uppercase">
              Hardware Inspector
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#8B8D90] hover:text-[#F2F1ED] hover:bg-[#242628]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Microphone */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between font-mono text-[#8B8D90]">
              <span className="flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-[#FA5089]" />
                <span>INPUT_DEVICE</span>
              </span>
              <span className="text-[10px] text-emerald-400">48,000 Hz</span>
            </label>
            <select
              value={selectedMic}
              onChange={(e) => setSelectedMic(e.target.value)}
              className="w-full p-2.5 bg-[#131415] border border-[#2E3033] rounded-md outline-none focus:border-[#FA5089] text-[#F2F1ED] font-mono text-xs"
            >
              <option>Default - Built-in Microphone (Studio Level)</option>
              <option>Shure SM7B (USB Audio Interface - 48kHz)</option>
              <option>Rode VideoMic Pro</option>
            </select>
            {/* Live Mic Level */}
            <div className="flex items-center justify-between pt-1 px-1 text-[11px] font-mono text-[#8B8D90]">
              <span>SAMPLE_SIGNAL:</span>
              <WaveformPreview bars={24} height={14} activeColor="#10B981" inactiveColor="#2E3033" progress={0.65} animated />
            </div>
          </div>

          {/* Camera */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between font-mono text-[#8B8D90]">
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#FA5089]" />
                <span>VIDEO_CAPTURE_STREAM</span>
              </span>
              <span className="text-[10px] text-[#8B8D90]">1080p 60FPS</span>
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full p-2.5 bg-[#131415] border border-[#2E3033] rounded-md outline-none focus:border-[#FA5089] text-[#F2F1ED] font-mono text-xs"
            >
              <option>FaceTime HD Camera / External 1080p</option>
              <option>Sony Alpha A7 IV (4K 60fps Cam Link)</option>
              <option>Logitech Brio 4K</option>
            </select>
          </div>

          {/* Speaker */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-mono text-[#8B8D90]">
              <Volume2 className="w-3.5 h-3.5 text-[#FA5089]" />
              <span>OUTPUT_MONITOR</span>
            </label>
            <select
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
              className="w-full p-2.5 bg-[#131415] border border-[#2E3033] rounded-md outline-none focus:border-[#FA5089] text-[#F2F1ED] font-mono text-xs"
            >
              <option>Headphones (High-Resolution Output)</option>
              <option>Default System Speakers</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2 border-t border-[#2E3033]">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs text-[#8B8D90] hover:text-[#F2F1ED] font-mono"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-[#FA5089] hover:bg-[#E03F74] text-white rounded text-xs font-medium transition-all"
          >
            Apply Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
