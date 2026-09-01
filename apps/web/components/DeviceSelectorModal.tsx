"use client";

import React, { useState } from "react";
import { X, Mic, Video, Volume2 } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/40 backdrop-blur-sm animate-kanso-fade">
      <div className="bg-[#F7F6F2] border border-[#E5E3DC] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-[#141413] tracking-tight font-serif">Audio & Video Hardware</h3>
          <button onClick={onClose} className="p-1 rounded text-[#7A7870] hover:text-[#141413]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Microphone */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-medium text-[#141413]">
              <Mic className="w-3.5 h-3.5 text-[#7A7870]" />
              <span>Microphone</span>
            </label>
            <select
              value={selectedMic}
              onChange={(e) => setSelectedMic(e.target.value)}
              className="w-full p-2.5 bg-[#FFFFFF] border border-[#E5E3DC] rounded-md outline-none focus:border-[#141413] text-[#141413]"
            >
              <option>Default - Built-in Microphone (Studio Level)</option>
              <option>Shure SM7B (USB Audio Interface - 48kHz)</option>
              <option>Rode VideoMic Pro</option>
            </select>
            {/* Live Mic Level */}
            <div className="flex items-center justify-between pt-1 px-1 text-[11px] text-[#7A7870]">
              <span>Input Signal:</span>
              <WaveformPreview bars={20} height={14} activeColor="#2B7A4B" inactiveColor="#D1CEC5" progress={0.65} animated />
            </div>
          </div>

          {/* Camera */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-medium text-[#141413]">
              <Video className="w-3.5 h-3.5 text-[#7A7870]" />
              <span>Camera Stream</span>
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full p-2.5 bg-[#FFFFFF] border border-[#E5E3DC] rounded-md outline-none focus:border-[#141413] text-[#141413]"
            >
              <option>FaceTime HD Camera / External 1080p</option>
              <option>Sony Alpha A7 IV (4K 60fps Cam Link)</option>
              <option>Logitech Brio 4K</option>
            </select>
          </div>

          {/* Speaker */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-medium text-[#141413]">
              <Volume2 className="w-3.5 h-3.5 text-[#7A7870]" />
              <span>Output Monitor</span>
            </label>
            <select
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
              className="w-full p-2.5 bg-[#FFFFFF] border border-[#E5E3DC] rounded-md outline-none focus:border-[#141413] text-[#141413]"
            >
              <option>Headphones (High-Resolution Output)</option>
              <option>Default System Speakers</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2 border-t border-[#E5E3DC]">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs text-[#7A7870] hover:text-[#141413]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-[#141413] text-[#F7F6F2] rounded text-xs font-medium hover:bg-[#2B2A27]"
          >
            Save Hardware Settings
          </button>
        </div>
      </div>
    </div>
  );
}
