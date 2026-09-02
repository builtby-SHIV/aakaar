"use client";

import { Layers, Smartphone, Sparkles, Type, Volume2 } from "lucide-react";
import React from "react";
import { ActiveTool } from "./types";

interface EditorSidebarProps {
  activeTool: ActiveTool;
  onSelectTool: (tool: ActiveTool) => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  activeTool,
  onSelectTool,
}) => {
  const tools = [
    { id: "layout", icon: Layers, label: "Layout" },
    { id: "captions", icon: Type, label: "Captions" },
    { id: "audio", icon: Volume2, label: "Audio" },
    { id: "brand", icon: Sparkles, label: "Brand" },
    { id: "clips", icon: Smartphone, label: "Clips" },
  ] as const;

  return (
    <aside className="w-16 border-r border-[#E5E3DC] bg-[#FFFFFF] flex flex-col items-center py-4 gap-4 z-20 shrink-0">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.id;
        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => onSelectTool(isActive ? null : tool.id)}
            className={`w-11 h-11 rounded-lg flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              isActive
                ? "bg-[#141413] text-[#F7F6F2] shadow-sm"
                : "text-[#7A7870] hover:bg-[#F2F0EB] hover:text-[#141413]"
            }`}
            title={tool.label}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[9px] font-mono leading-none">
              {tool.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
};
