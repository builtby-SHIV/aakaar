"use client";

import { Check, Sparkles } from "lucide-react";
import React from "react";
import { PodcastInfoCard } from "./PodcastInfoCard";
import { BrandKitSettings } from "./types";
import { VisualThemeCard } from "./VisualThemeCard";

interface BrandKitFormProps {
  settings: BrandKitSettings;
  saved: boolean;
  onUpdateField: <K extends keyof BrandKitSettings>(
    key: K,
    value: BrandKitSettings[K],
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const BrandKitForm: React.FC<BrandKitFormProps> = ({
  settings,
  saved,
  onUpdateField,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* 1. Identity & Watermark */}
      <PodcastInfoCard
        podcastName={settings.podcastName}
        tagline={settings.tagline}
        onPodcastNameChange={(val) => onUpdateField("podcastName", val)}
        onTaglineChange={(val) => onUpdateField("tagline", val)}
      />

      {/* 2. Colors & Typography */}
      <VisualThemeCard
        primaryColor={settings.primaryColor}
        accentColor={settings.accentColor}
        defaultCaptionFont={settings.defaultCaptionFont}
        onPrimaryColorChange={(val) => onUpdateField("primaryColor", val)}
        onAccentColorChange={(val) => onUpdateField("accentColor", val)}
        onDefaultCaptionFontChange={(val) =>
          onUpdateField("defaultCaptionFont", val)
        }
      />

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-xs text-[#7A7870]">
          All settings sync locally to your browser storage.
        </span>
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#141413] text-[#F7F6F2] text-xs font-medium rounded-md hover:bg-[#2B2A27] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
        >
          {saved ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>{saved ? "Saved to Brand Kit" : "Save Brand Kit"}</span>
        </button>
      </div>
    </form>
  );
};
