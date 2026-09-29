"use client";

import React, { useRef, useState, useEffect } from "react";
import { EditorOperation, ZoomOperation, BlurOperation } from "./types";

interface VideoOverlaysProps {
  currentTime: number;
  operations: EditorOperation[];
  selectedOperationId: string | null;
  onUpdateOperation: (id: string, updates: Partial<EditorOperation>) => void;
  onSelectOperation: (id: string | null) => void;
}

export const VideoOverlays: React.FC<VideoOverlaysProps> = ({
  currentTime,
  operations,
  selectedOperationId,
  onUpdateOperation,
  onSelectOperation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingTarget, setDraggingTarget] = useState<{
    id: string;
    type: "move" | "resize";
    handle?: string; // 'tl', 'tr', 'bl', 'br'
    startX: number;
    startY: number;
    initialOpX: number;
    initialOpY: number;
    initialOpWidth: number;
    initialOpHeight: number;
  } | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingTarget || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const dx = (e.clientX - draggingTarget.startX) / containerRect.width;
      const dy = (e.clientY - draggingTarget.startY) / containerRect.height;

      let newX = draggingTarget.initialOpX;
      let newY = draggingTarget.initialOpY;
      let newWidth = draggingTarget.initialOpWidth;
      let newHeight = draggingTarget.initialOpHeight;

      if (draggingTarget.type === "move") {
        newX = Math.max(0, Math.min(1 - newWidth, draggingTarget.initialOpX + dx));
        newY = Math.max(0, Math.min(1 - newHeight, draggingTarget.initialOpY + dy));
      } else if (draggingTarget.type === "resize" && draggingTarget.handle) {
        if (draggingTarget.handle.includes("l")) {
          newX = Math.min(draggingTarget.initialOpX + draggingTarget.initialOpWidth - 0.01, Math.max(0, draggingTarget.initialOpX + dx));
          newWidth = draggingTarget.initialOpWidth + (draggingTarget.initialOpX - newX);
        }
        if (draggingTarget.handle.includes("r")) {
          newWidth = Math.max(0.01, Math.min(1 - draggingTarget.initialOpX, draggingTarget.initialOpWidth + dx));
        }
        if (draggingTarget.handle.includes("t")) {
          newY = Math.min(draggingTarget.initialOpY + draggingTarget.initialOpHeight - 0.01, Math.max(0, draggingTarget.initialOpY + dy));
          newHeight = draggingTarget.initialOpHeight + (draggingTarget.initialOpY - newY);
        }
        if (draggingTarget.handle.includes("b")) {
          newHeight = Math.max(0.01, Math.min(1 - draggingTarget.initialOpY, draggingTarget.initialOpHeight + dy));
        }
      }

      onUpdateOperation(draggingTarget.id, {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    };

    const handlePointerUp = () => {
      setDraggingTarget(null);
    };

    if (draggingTarget) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggingTarget, onUpdateOperation]);

  const activeOperations = operations.filter(
    (op) =>
      (op.type === "zoom" || op.type === "blur") &&
      currentTime >= op.start &&
      currentTime <= op.end
  ) as (ZoomOperation | BlurOperation)[];

  const handlePointerDown = (
    e: React.PointerEvent,
    op: ZoomOperation | BlurOperation,
    type: "move" | "resize",
    handle?: string
  ) => {
    e.stopPropagation();
    onSelectOperation(op.id);
    setDraggingTarget({
      id: op.id,
      type,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialOpX: op.x,
      initialOpY: op.y,
      initialOpWidth: op.width,
      initialOpHeight: op.height,
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10"
    >
      {activeOperations.map((op) => {
        const isSelected = selectedOperationId === op.id;
        const color = op.type === "zoom" ? "#7C3AED" : "#D97706";
        const isZoom = op.type === "zoom";

        return (
          <div
            key={op.id}
            className="absolute pointer-events-auto group touch-none"
            style={{
              left: `${op.x * 100}%`,
              top: `${op.y * 100}%`,
              width: `${op.width * 100}%`,
              height: `${op.height * 100}%`,
              border: `2px dashed ${isSelected ? color : color + "99"}`,
              backgroundColor: color + "1A",
              cursor: "move",
            }}
            onPointerDown={(e) => handlePointerDown(e, op, "move")}
            onClick={(e) => {
              e.stopPropagation();
              onSelectOperation(op.id);
            }}
          >
            {/* Blur specific backdrop filter */}
            {!isZoom && (
              <div
                className="absolute inset-0 z-[-1]"
                style={{
                  backdropFilter: `blur(${(op as BlurOperation).blurAmount}px)`,
                }}
              />
            )}

            {/* Label */}
            <div
              className="absolute -top-6 left-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium whitespace-nowrap"
              style={{ color, backgroundColor: color + "22" }}
            >
              {isZoom ? `${(op as ZoomOperation).scale}x Zoom` : "Blur"}
            </div>

            {/* Resize Handles */}
            {(isSelected || draggingTarget?.id === op.id) && (
              <>
                <div
                  className="absolute -top-1 -left-1 w-2 h-2 cursor-nwse-resize z-10"
                  style={{ backgroundColor: color }}
                  onPointerDown={(e) => handlePointerDown(e, op, "resize", "tl")}
                />
                <div
                  className="absolute -top-1 -right-1 w-2 h-2 cursor-nesw-resize z-10"
                  style={{ backgroundColor: color }}
                  onPointerDown={(e) => handlePointerDown(e, op, "resize", "tr")}
                />
                <div
                  className="absolute -bottom-1 -left-1 w-2 h-2 cursor-nesw-resize z-10"
                  style={{ backgroundColor: color }}
                  onPointerDown={(e) => handlePointerDown(e, op, "resize", "bl")}
                />
                <div
                  className="absolute -bottom-1 -right-1 w-2 h-2 cursor-nwse-resize z-10"
                  style={{ backgroundColor: color }}
                  onPointerDown={(e) => handlePointerDown(e, op, "resize", "br")}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
