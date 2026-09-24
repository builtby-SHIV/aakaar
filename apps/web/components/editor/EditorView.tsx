"use client";

import React, { useEffect } from "react";
import { ExportModal } from "../ExportModal";
import { EditorHeader } from "./EditorHeader";
import { EditorPreviewCanvas } from "./EditorPreviewCanvas";
import { EditorSidebar } from "./EditorSidebar";
import { EditorTimeline } from "./EditorTimeline";
import { EditorToolDrawer } from "./EditorToolDrawer";
import { AspectRatio, CaptionItem, EditorOperation, LayoutMode } from "./types";
import { useEditorPlayback } from "./useEditorPlayback";
import { useEditorOperations } from "./useEditorOperations";
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

  // Zustand operations store
  const {
    operations,
    selectedOperationId,
    selectOperation,
    updateOperation,
    removeOperation,
    addZoom,
    addTrim,
    addBlur,
  } = useEditorOperations();

  const currentCaption = editorState.captions.find(
    (c) =>
      playback.currentTime >= c.start && playback.currentTime <= c.end,
  );

  const handleFormatReel = () => {
    editorState.setAspectRatio("9:16");
    editorState.setLayoutMode("guest");
    playback.setCurrentTime(6);
  };

  // Keyboard shortcuts for operations
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Delete / Backspace → delete selected operation
      if ((e.key === "Delete" || e.key === "Backspace") && selectedOperationId) {
        e.preventDefault();
        removeOperation(selectedOperationId);
      }

      // Arrow keys → move playhead
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        playback.setCurrentTime(Math.max(0, playback.currentTime - 1));
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        playback.setCurrentTime(Math.min(playback.totalDuration, playback.currentTime + 1));
      }

      // Escape → deselect
      if (e.key === "Escape") {
        selectOperation(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedOperationId, removeOperation, selectOperation, playback]);

  const handleUpdateOperation = (id: string, updates: Partial<EditorOperation>) => {
    updateOperation(id, updates);
  };

  return (
    <div className="h-screen w-screen bg-[#111] text-[#F2F1ED] flex flex-col justify-between overflow-hidden select-none">
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
          operations={operations}
          selectedOperationId={selectedOperationId}
          onUpdateOperation={handleUpdateOperation}
          onSelectOperation={selectOperation}
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
        operations={operations}
        selectedOperationId={selectedOperationId}
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
        onSelectOperation={selectOperation}
        onUpdateOperation={handleUpdateOperation}
        onDeleteOperation={removeOperation}
        onAddZoom={() => addZoom(playback.currentTime, playback.totalDuration)}
        onAddTrim={() => addTrim(playback.currentTime, playback.totalDuration)}
        onAddBlur={() => addBlur(playback.currentTime, playback.totalDuration)}
      />

      {/* Export Simulation Modal */}
      <ExportModal
        isOpen={editorState.isExportOpen}
        onClose={() => editorState.setIsExportOpen(false)}
      />
    </div>
  );
}
