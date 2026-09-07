"use client";

import React, { useState } from "react";
import { X, Copy, Check, Shield, Radio } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
}

export function ShareModal({ isOpen, onClose, roomId = "ep-14-live" }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/video-meet/lobby?room=${roomId}` : `https://aakaar.studio/video-meet/lobby?room=${roomId}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade">
      <div className="bg-[#1A1B1D] border border-[#2E3033] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-6 text-[#F2F1ED]">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FA5089]">WEBRTC SESSION INVITE</span>
            <h3 className="text-base font-medium text-[#F2F1ED] tracking-tight">Invite Guests to Studio</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#8B8D90] hover:text-[#F2F1ED] hover:bg-[#242628]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#8B8D90] leading-relaxed">
          Zero software installation. Guests click the tokenized link, perform their hardware check, and establish a peer-isolated WebRTC connection with 48kHz audio capture.
        </p>

        {/* Link input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-[#8B8D90] uppercase">Studio Endpoint URL</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full text-xs font-mono p-2 bg-[#131415] border border-[#2E3033] rounded text-[#F2F1ED] select-all outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-[#FA5089] hover:bg-[#E03F74] text-white rounded text-xs font-medium transition-all flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Info pills */}
        <div className="pt-2 border-t border-[#2E3033] flex items-center justify-between text-[11px] font-mono text-[#8B8D90]">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Local Chunk Isolation</span>
          </span>
          <span>Max 8 Peers</span>
        </div>
      </div>
    </div>
  );
}
