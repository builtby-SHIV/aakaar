"use client";

import React from "react";
import { ExportModal } from "../ExportModal";
import { EditorHeader } from "./EditorHeader";
import { EditorPreviewCanvas } from "./EditorPreviewCanvas";
import { EditorSidebar } from "./EditorSidebar";
import { EditorTimeline } from "./EditorTimeline";
import { EditorToolDrawer } from "./EditorToolDrawer";
import { AspectRatio, CaptionItem, LayoutMode } from "./types";
import { useEditorPlayback } from "./useEditorPlayback";
import { useEditorState } from "./useEditorState";

interface EditorViewProps {
  projectId: string;
  initialCaptions?: CaptionItem[];
  initialAspectRatio?: AspectRatio;
  initialLayoutMode?: LayoutMode;
  duration?: number;
}

export function EditorView({
  projectId,
  initialCaptions,
  initialAspectRatio,
  initialLayoutMode,
  duration = 42.28,
}: EditorViewProps) {
  const editorState = useEditorState({
    initialCaptions,
    initialAspectRatio,
    initialLayoutMode,
  });
  const playback = useEditorPlayback(duration);

  const currentCaption = editorState.captions.find(
    (c) =>
      playback.currentTime >= c.start && playback.currentTime <= c.end,
  );

  const handleFormatReel = () => {
    editorState.setAspectRatio("9:16");
    editorState.setLayoutMode("guest");
    playback.setCurrentTime(6);
  };

  return (
    <div className="h-screen w-screen bg-[#F7F6F2] text-[#141413] flex flex-col justify-between overflow-hidden select-none">
      {/* 1. TOP EDITORIAL BAR */}
      <EditorHeader
        projectId={projectId}
        aspectRatio={editorState.aspectRatio}
        onAspectRatioChange={editorState.setAspectRatio}
        onExport={() => editorState.setIsExportOpen(true)}
      />

      {/* 2. MIDDLE WORKSPACE: LEFT RAIL + VIDEO CANVAS + RIGHT CONTEXTUAL PANEL */}
      <div className="flex-1 flex overflow-hidden">
        {/* A. LEFT TOOL RAIL */}
        <EditorSidebar
          activeTool={editorState.activeTool}
          onSelectTool={editorState.setActiveTool}
        />

        {/* B. CENTER VIDEO CANVAS */}
        <EditorPreviewCanvas
          aspectRatio={editorState.aspectRatio}
          layoutMode={editorState.layoutMode}
          showWatermark={editorState.showWatermark}
          isPlaying={playback.isPlaying}
          currentTime={playback.currentTime}
          totalDuration={playback.totalDuration}
          currentCaption={currentCaption}
          captionPosition={editorState.captionPosition}
          onTogglePlay={playback.togglePlay}
        />

        {/* C. RIGHT CONTEXTUAL PROPERTIES PANEL */}
        <EditorToolDrawer
          activeTool={editorState.activeTool}
          onClose={() => editorState.setActiveTool(null)}
          layoutMode={editorState.layoutMode}
          setLayoutMode={editorState.setLayoutMode}
          captionFont={editorState.captionFont}
          setCaptionFont={editorState.setCaptionFont}
          captionPosition={editorState.captionPosition}
          setCaptionPosition={editorState.setCaptionPosition}
          captions={editorState.captions}
          currentTime={playback.currentTime}
          onSelectCaptionTime={playback.setCurrentTime}
          noiseReduction={editorState.noiseReduction}
          setNoiseReduction={editorState.setNoiseReduction}
          autoDucking={editorState.autoDucking}
          setAutoDucking={editorState.setAutoDucking}
          studioLeveling={editorState.studioLeveling}
          setStudioLeveling={editorState.setStudioLeveling}
          hostVolume={editorState.hostVolume}
          setHostVolume={editorState.setHostVolume}
          guestVolume={editorState.guestVolume}
          setGuestVolume={editorState.setGuestVolume}
          showWatermark={editorState.showWatermark}
          setShowWatermark={editorState.setShowWatermark}
          onFormatReel={handleFormatReel}
          formatTime={playback.formatTime}
        />
      </div>

      {/* 3. BOTTOM TIMELINE ENGINE */}
      <EditorTimeline
        timelineRef={playback.timelineRef}
        isPlaying={playback.isPlaying}
        currentTime={playback.currentTime}
        totalDuration={playback.totalDuration}
        zoomLevel={playback.zoomLevel}
        captions={editorState.captions}
        onTogglePlay={playback.togglePlay}
        onResetTime={() => playback.setCurrentTime(0)}
        onZoomIn={() =>
          playback.setZoomLevel((z) => Math.min(2, z + 0.25))
        }
        onZoomOut={() =>
          playback.setZoomLevel((z) => Math.max(0.75, z - 0.25))
        }
        onPointerDown={playback.handlePointerDown}
        onPointerMove={playback.handlePointerMove}
        onPointerUp={playback.handlePointerUp}
        formatTime={playback.formatTime}
      />

      {/* Export Simulation Modal */}
      <ExportModal
        isOpen={editorState.isExportOpen}
        onClose={() => editorState.setIsExportOpen(false)}
      />
    </div>
  );
}
