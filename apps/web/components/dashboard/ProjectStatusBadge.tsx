import React from "react";
import { ProjectStatus } from "./types";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Published: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
  Edited: "bg-blue-950/40 text-blue-400 border border-blue-500/20",
  Draft: "bg-[#242628] text-[#8B8D90] border border-[#2E3033]",
  Recording: "bg-red-950/40 text-[#EF4444] border border-red-500/20",
};

export const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({
  status,
}) => {
  const style = STATUS_STYLES[status] || "bg-[#242628] text-[#8B8D90] border border-[#2E3033]";

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase ${style}`}>
      {status}
    </span>
  );
};
