"use client";

import React, { useState } from "react";
import { X, Copy, Check, Shield } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
}

export function ShareModal({ isOpen, onClose, roomId = "ep-14-live" }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/studio/${roomId}` : `https://aakaar.studio/studio/${roomId}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/40 backdrop-blur-sm animate-kanso-fade">
      <div className="bg-[#F7F6F2] border border-[#E5E3DC] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A7870]">Guest Invite</span>
            <h3 className="text-base font-medium text-[#141413] tracking-tight font-serif">Invite Guests to Studio</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#7A7870] hover:text-[#141413]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#7A7870] leading-relaxed">
          Guests do not need to install software or register an account. They open the link in any browser, test their mic, and join your multitrack recording session.
        </p>

        {/* Link input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-[#141413]">Studio Guest Link</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full text-xs font-mono p-2 bg-[#FFFFFF] border border-[#E5E3DC] rounded text-[#141413] select-all outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-[#141413] text-[#F7F6F2] rounded text-xs font-medium hover:bg-[#2B2A27] transition-all flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Info pills */}
        <div className="pt-2 border-t border-[#E5E3DC] flex items-center justify-between text-[11px] font-mono text-[#7A7870]">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#2B7A4B]" />
            <span>End-to-End Multitrack Isolation</span>
          </span>
          <span>Max 8 Guests</span>
        </div>
      </div>
    </div>
  );
}
