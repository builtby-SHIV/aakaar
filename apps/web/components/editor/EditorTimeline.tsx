"use client";

import { Play, Pause, RotateCcw, Volume2, Scissors, ZoomIn, BoxSelect } from "lucide-react";
import React, { useState, useEffect } from "react";
import { WaveformPreview } from "../WaveformPreview";
import { CaptionItem, EditorOperation } from "./types";

interface EditorTimelineProps {
  timelineRef: React.RefObject<HTMLDivElement | null>;
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  zoomLevel: number;
  captions: CaptionItem[];
  operations: EditorOperation[];
  selectedOperationId: string | null;
  onTogglePlay: () => void;
  onResetTime: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  formatTime: (sec: number) => string;
  onSelectOperation: (id: string | null) => void;
  onUpdateOperation: (id: string, updates: Partial<EditorOperation>) => void;
  onDeleteOperation: (id: string) => void;
  onAddZoom: () => void;
  onAddTrim: () => void;
  onAddBlur: () => void;
}

const OperationBlock = ({
  op,
  totalDuration,
  isSelected,
  onSelect,
  onUpdate,
  timelineRef
}: {
  op: EditorOperation;
  totalDuration: number;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, updates: Partial<EditorOperation>) => void;
  timelineRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [dragState, setDragState] = useState<{
    type: 'move' | 'resize-left' | 'resize-right';
    startX: number;
    initialStart: number;
    initialEnd: number;
  } | null>(null);

  const [localStart, setLocalStart] = useState(op.start);
  const [localEnd, setLocalEnd] = useState(op.end);

  useEffect(() => {
    if (!dragState) {
      setLocalStart(op.start);
      setLocalEnd(op.end);
    }
  }, [op.start, op.end, dragState]);

  const getDeltaTime = (deltaX: number) => {
    if (!timelineRef.current) return 0;
    const width = timelineRef.current.getBoundingClientRect().width;
    return (deltaX / width) * totalDuration;
  };

  const handlePointerDown = (e: React.PointerEvent, type: 'move' | 'resize-left' | 'resize-right') => {
    e.stopPropagation();
    onSelect(op.id);
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragState({
      type,
      startX: e.clientX,
      initialStart: localStart,
      initialEnd: localEnd
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState) return;
    e.stopPropagation();
    const deltaX = e.clientX - dragState.startX;
    const deltaTime = getDeltaTime(deltaX);

    if (dragState.type === 'move') {
      const duration = dragState.initialEnd - dragState.initialStart;
      let newStart = dragState.initialStart + deltaTime;
      let newEnd = newStart + duration;

      if (newStart < 0) {
        newStart = 0;
        newEnd = duration;
      }
      if (newEnd > totalDuration) {
        newEnd = totalDuration;
        newStart = totalDuration - duration;
      }
      setLocalStart(newStart);
      setLocalEnd(newEnd);
    } else if (dragState.type === 'resize-left') {
      let newStart = dragState.initialStart + deltaTime;
      if (newStart < 0) newStart = 0;
      if (newStart >= localEnd - 0.1) newStart = localEnd - 0.1;
      setLocalStart(newStart);
    } else if (dragState.type === 'resize-right') {
      let newEnd = dragState.initialEnd + deltaTime;
      if (newEnd > totalDuration) newEnd = totalDuration;
      if (newEnd <= localStart + 0.1) newEnd = localStart + 0.1;
      setLocalEnd(newEnd);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragState) return;
    e.stopPropagation();
    e.currentTarget.releasePointerCapture(e.pointerId);
    onUpdate(op.id, { start: localStart, end: localEnd });
    setDragState(null);
  };

  let bgClass = "";
  let borderClass = "";
  let textClass = "";
  let label = "";

  if (op.type === "zoom") {
    bgClass = "bg-[#7C3AED]/20";
    borderClass = "border-[#7C3AED]";
    textClass = "text-[#A78BFA]";
    label = "🔍 Zoom";
  } else if (op.type === "trim") {
    bgClass = "bg-[#DC2626]/20";
    borderClass = "border-[#DC2626]";
    textClass = "text-[#F87171]";
    label = "✂️ Trim";
  } else if (op.type === "blur") {
    bgClass = "bg-[#D97706]/20";
    borderClass = "border-[#D97706]";
    textClass = "text-[#FBBF24]";
    label = "Blur";
  }

  const leftPercent = (localStart / totalDuration) * 100;
  const widthPercent = ((localEnd - localStart) / totalDuration) * 100;

  return (
    <div
      className={`absolute top-1 bottom-1 rounded-sm border flex items-center justify-center cursor-move overflow-hidden ${bgClass} ${textClass} ${isSelected ? `border-2 ${borderClass} opacity-100 z-20 shadow-md` : `border-opacity-50 border-dashed ${borderClass} opacity-80 z-10`}`}
      style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
      onPointerDown={(e) => handlePointerDown(e, 'move')}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <span className="text-[10px] font-medium pointer-events-none whitespace-nowrap truncate px-1">
        {label}
      </span>
      <div
        className="absolute left-0 top-0 bottom-0 w-2 hover:bg-white/20 cursor-col-resize touch-none"
        onPointerDown={(e) => handlePointerDown(e, 'resize-left')}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-2 hover:bg-white/20 cursor-col-resize touch-none"
        onPointerDown={(e) => handlePointerDown(e, 'resize-right')}
      />
    </div>
  );
};

export const EditorTimeline: React.FC<EditorTimelineProps> = ({
  timelineRef,
  isPlaying,
  currentTime,
  totalDuration,
  zoomLevel,
  captions,
  operations,
  selectedOperationId,
  onTogglePlay,
  onResetTime,
  onZoomIn,
  onZoomOut,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  formatTime,
  onSelectOperation,
  onUpdateOperation,
  onDeleteOperation,
  onAddZoom,
  onAddTrim,
  onAddBlur,
}) => {
  // Use 1 as a fallback for totalDuration to avoid Infinity or NaN during initialization
  const safeTotalDuration = totalDuration > 0 ? totalDuration : 1;
  const numMarkers = Math.floor(safeTotalDuration / 5) + 1;
  const markers = Array.from({ length: numMarkers }).map((_, i) => i * 5);

  const videoOps = operations?.filter(op => op.type === 'zoom' || op.type === 'trim') || [];
  const effectOps = operations?.filter(op => op.type === 'blur') || [];

  return (
    <footer className="h-72 border-t border-[#1F1F1F] bg-[#0D0D0D] flex flex-col z-30 shrink-0">
      {/* Controls Bar */}
      <div className="h-12 px-4 border-b border-[#1F1F1F] bg-[#111] flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onTogglePlay}
            className="w-8 h-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center hover:bg-[#6D28D9] transition-colors cursor-pointer"
            title={isPlaying ? "Pause (Space)" : "Play (Space)"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={onResetTime}
            className="p-1 rounded text-[#8B8D90] hover:text-[#F2F1ED] cursor-pointer"
            title="Return to Start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="font-mono text-[#F2F1ED] flex items-center gap-1.5 num-tabular font-medium">
            <span>{formatTime(currentTime)}</span>
            <span className="text-[#6B6D70]">/</span>
            <span className="text-[#6B6D70]">{formatTime(safeTotalDuration)}</span>
          </div>

          <Volume2 className="w-4 h-4 text-[#8B8D90] ml-2" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onAddTrim}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-[#DC2626]/30 text-[#F87171] hover:bg-[#DC2626]/10 transition-colors cursor-pointer"
          >
            <Scissors className="w-3.5 h-3.5" />
            Insert a trim
          </button>
          <button
            onClick={onAddZoom}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-[#7C3AED]/30 text-[#A78BFA] hover:bg-[#7C3AED]/10 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            Add Zoom
          </button>
          <button
            onClick={onAddBlur}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-[#D97706]/30 text-[#FBBF24] hover:bg-[#D97706]/10 transition-colors cursor-pointer"
          >
            <BoxSelect className="w-3.5 h-3.5" />
            Add Blur Box
          </button>
        </div>
      </div>

      {/* Multitrack Timeline Area */}
      <div className="flex flex-1 relative overflow-hidden bg-[#0D0D0D]">
        {/* Track Labels */}
        <div className="w-16 shrink-0 bg-[#141414] border-r border-[#1F1F1F] z-10 flex flex-col pointer-events-none">
          <div className="h-6 border-b border-[#1F1F1F]" />
          <div className="h-20 border-b border-[#1F1F1F] flex items-center justify-center text-[10px] text-[#8B8D90]">Video</div>
          <div className="h-16 border-b border-[#1F1F1F] flex items-center justify-center text-[10px] text-[#8B8D90]">Effects</div>
        </div>

        {/* Timeline Tracks */}
        <div
          ref={timelineRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="flex-1 relative cursor-default select-none touch-none overflow-x-hidden"
        >
          {/* Time Ruler */}
          <div className="h-6 relative border-b border-[#1F1F1F] text-[10px] text-[#8B8D90] font-mono pointer-events-none">
            {markers.map((time) => (
              <div
                key={time}
                className="absolute top-1"
                style={{
                  left: `${(time / safeTotalDuration) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="h-1 w-px bg-[#8B8D90] mx-auto mb-0.5" />
                {formatTime(time)}
              </div>
            ))}
          </div>

          {/* Video Track */}
          <div className="h-20 relative bg-[#141414] border-b border-[#1F1F1F] overflow-hidden">
            <div className="absolute inset-0 opacity-30 pointer-events-none flex items-center">
               <WaveformPreview
                 bars={150}
                 height={48}
                 activeColor="#4B5563"
                 inactiveColor="#374151"
                 progress={1}
                 animated={false}
               />
            </div>
            {videoOps.map(op => (
              <OperationBlock
                key={op.id}
                op={op}
                totalDuration={safeTotalDuration}
                isSelected={selectedOperationId === op.id}
                onSelect={onSelectOperation}
                onUpdate={onUpdateOperation}
                timelineRef={timelineRef}
              />
            ))}
          </div>

          {/* Effects Track */}
          <div className="h-16 relative bg-[#141414] border-b border-[#1F1F1F] overflow-hidden">
            {effectOps.map(op => (
              <OperationBlock
                key={op.id}
                op={op}
                totalDuration={safeTotalDuration}
                isSelected={selectedOperationId === op.id}
                onSelect={onSelectOperation}
                onUpdate={onUpdateOperation}
                timelineRef={timelineRef}
              />
            ))}
          </div>

          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#7C3AED] z-30 pointer-events-none"
            style={{
              left: `${Math.min(100, Math.max(0, (currentTime / safeTotalDuration) * 100))}%`,
            }}
          >
            <div className="absolute top-0 -left-1.5 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#7C3AED]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
