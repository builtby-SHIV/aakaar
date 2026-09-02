"use client";

import { useState } from "react";
import { INITIAL_CAPTIONS } from "./constants";
import {
  ActiveTool,
  AspectRatio,
  CaptionFont,
  CaptionItem,
  CaptionPosition,
  LayoutMode,
} from "./types";

interface UseEditorStateOptions {
  initialCaptions?: CaptionItem[];
  initialAspectRatio?: AspectRatio;
  initialLayoutMode?: LayoutMode;
}

export function useEditorState(options?: UseEditorStateOptions) {
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(
    options?.initialAspectRatio ?? "16:9",
  );
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(
    options?.initialLayoutMode ?? "split",
  );
  const [activeTool, setActiveTool] = useState<ActiveTool>("layout");

  // Captions State
  const [captions, setCaptions] = useState<CaptionItem[]>(
    options?.initialCaptions ?? INITIAL_CAPTIONS,
  );
  const [captionFont, setCaptionFont] = useState<CaptionFont>("Modern Sans");
  const [captionPosition, setCaptionPosition] =
    useState<CaptionPosition>("bottom");
  const [captionHighlightColor, setCaptionHighlightColor] = useState("#F59E0B");

  // Audio State
  const [noiseReduction, setNoiseReduction] = useState(true);
  const [autoDucking, setAutoDucking] = useState(true);
  const [studioLeveling, setStudioLeveling] = useState(true);
  const [hostVolume, setHostVolume] = useState(85);
  const [guestVolume, setGuestVolume] = useState(90);

  // Brand Kit
  const [showWatermark, setShowWatermark] = useState(true);
  const [brandColor, setBrandColor] = useState("#141413");

  // Export Modal
  const [isExportOpen, setIsExportOpen] = useState(false);

  return {
    aspectRatio,
    setAspectRatio,
    layoutMode,
    setLayoutMode,
    activeTool,
    setActiveTool,
    captions,
    setCaptions,
    captionFont,
    setCaptionFont,
    captionPosition,
    setCaptionPosition,
    captionHighlightColor,
    setCaptionHighlightColor,
    noiseReduction,
    setNoiseReduction,
    autoDucking,
    setAutoDucking,
    studioLeveling,
    setStudioLeveling,
    hostVolume,
    setHostVolume,
    guestVolume,
    setGuestVolume,
    showWatermark,
    setShowWatermark,
    brandColor,
    setBrandColor,
    isExportOpen,
    setIsExportOpen,
  };
}
