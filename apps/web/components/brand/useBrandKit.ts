"use client";

import { useState } from "react";
import { BrandKitSettings } from "./types";

const DEFAULT_SETTINGS: BrandKitSettings = {
  podcastName: "Aakaar Conversations",
  tagline: "Spatial Design & In-Browser Media",
  primaryColor: "#141413",
  accentColor: "#E54D2E",
  defaultCaptionFont: "Modern Sans",
};

export function useBrandKit(initialSettings?: Partial<BrandKitSettings>) {
  const [settings, setSettings] = useState<BrandKitSettings>({
    ...DEFAULT_SETTINGS,
    ...initialSettings,
  });
  const [saved, setSaved] = useState(false);

  const updateField = <K extends keyof BrandKitSettings>(
    key: K,
    value: BrandKitSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return {
    settings,
    setSettings,
    saved,
    updateField,
    handleSave,
  };
}
