"use client";

import React from "react";
import {
  Camera,
  Crop,
  LayoutGrid,
  Search,
  Sparkles,
  Square,
  Type,
  Video,
} from "lucide-react";

interface EditorToolRailProps {
  activeTool: string | null;
  onSelectTool: (tool: string) => void;
}

export const EditorToolRail: React.FC<EditorToolRailProps> = ({
  activeTool,
  onSelectTool,
}) => {
  const tools = [
    { id: "screenshot", icon: Camera, label: "Screenshot" },
    { id: "camera", icon: Video, label: "Camera" },
    { id: "crop", icon: Crop, label: "Crop" },
    { id: "layout", icon: LayoutGrid, label: "Layout" },
    { id: "effects", icon: Sparkles, label: "Effects" },
    { id: "blur", icon: Square, label: "Blur" },
    { id: "zoom", icon: Search, label: "Zoom" },
    { id: "text", icon: Type, label: "Text" },
  ];

  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-1.5 bg-[#1A1B1D]/90 backdrop-blur-sm border border-[#2E3033] rounded-lg z-30 shadow-xl">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.id;
        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => onSelectTool(isActive ? "" : tool.id)}
            title={tool.label}
            className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${
              isActive
                ? "bg-[#7C3AED] text-white"
                : "text-[#8B8D90] hover:text-[#F2F1ED] hover:bg-[#2E3033]"
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
};
