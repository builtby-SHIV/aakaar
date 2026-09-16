"use client";

import React from "react";

interface VisualThemeCardProps {
  primaryColor: string;
  accentColor: string;
  defaultCaptionFont: string;
  onPrimaryColorChange: (value: string) => void;
  onAccentColorChange: (value: string) => void;
  onDefaultCaptionFontChange: (value: string) => void;
}

export const VisualThemeCard: React.FC<VisualThemeCardProps> = ({
  primaryColor,
  accentColor,
  defaultCaptionFont,
  onPrimaryColorChange,
  onAccentColorChange,
  onDefaultCaptionFontChange,
}) => {
  return (
    <div className="p-8 rounded-xl border border-[#2E3033] bg-[#1A1B1D] space-y-6">
      <h3 className="text-base font-medium text-[#F2F1ED] tracking-tight">
        Visual Theme & Typography
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        {/* Primary Charcoal */}
        <div className="space-y-2">
          <label className="font-medium text-[#F2F1ED]">
            Primary Base Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="w-8 h-8 rounded border border-[#2E3033] cursor-pointer"
            />
            <span className="font-mono text-xs text-[#8B8D90]">
              {primaryColor}
            </span>
          </div>
        </div>

        {/* Restrained Accent */}
        <div className="space-y-2">
          <label className="font-medium text-[#F2F1ED]">
            Brand Accent Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => onAccentColorChange(e.target.value)}
              className="w-8 h-8 rounded border border-[#2E3033] cursor-pointer"
            />
            <span className="font-mono text-xs text-[#8B8D90]">
              {accentColor}
            </span>
          </div>
        </div>

        {/* Font Preset */}
        <div className="space-y-2">
          <label className="font-medium text-[#F2F1ED]">
            Default Caption Font
          </label>
          <select
            value={defaultCaptionFont}
            onChange={(e) => onDefaultCaptionFontChange(e.target.value)}
            className="w-full p-2.5 bg-[#131415] border border-[#2E3033] rounded-md text-[#F2F1ED]"
          >
            <option>Modern Sans</option>
            <option>Editorial Serif</option>
            <option>Monospace</option>
          </select>
        </div>
      </div>
    </div>
  );
};
