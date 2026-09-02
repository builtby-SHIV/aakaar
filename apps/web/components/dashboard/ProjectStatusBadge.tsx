import React from "react";
import { ProjectStatus } from "./types";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Published: "bg-emerald-50 text-emerald-700",
  Edited: "bg-blue-50 text-blue-700",
  Draft: "bg-[#EFECE6] text-[#7A7870]",
  Recording: "bg-rose-50 text-rose-700",
};

export const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({
  status,
}) => {
  const style = STATUS_STYLES[status] || "bg-[#EFECE6] text-[#7A7870]";

  return (
    <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${style}`}>
      {status}
    </span>
  );
};
