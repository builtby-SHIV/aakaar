import { Plus, Radio } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DashboardHeaderProps {
  userName?: string;
  workspaceName?: string;
  projectCount: number;
  mediaHours?: number;
  onNewProject: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName = "",
  workspaceName = "AAKAAR_WORKSPACE_PROD",
  projectCount,
  mediaHours = 3.4,
  onNewProject,
}) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#2E3033]">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#FA5089]">
            {workspaceName}
          </span>
          <span className="text-[10px] font-mono text-[#8B8D90]">OPFS BUFFER ACTIVE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-[#F2F1ED]">
          Episodes & Media Stems
        </h1>
        <p className="text-xs font-mono text-[#8B8D90]">
          {projectCount} isolated session{projectCount === 1 ? "" : "s"} ·{" "}
          {mediaHours} hrs lossless 48kHz audio stored locally
        </p>
      </div>

      {/* Main Actions: Quiet text action + New Recording */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onNewProject}
          className="text-xs font-mono text-[#8B8D90] hover:text-[#FA5089] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Create project shell</span>
        </button>

        <button
          type="button"
          onClick={onNewProject}
          className="px-4 py-2 border border-[#2E3033] bg-[#1A1B1D] hover:bg-[#242628] text-[#F2F1ED] text-xs font-mono rounded-md transition-all flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-rec-pulse" />
          <span>Start Recording Studio</span>
        </button>
      </div>
    </header>
  );
};
