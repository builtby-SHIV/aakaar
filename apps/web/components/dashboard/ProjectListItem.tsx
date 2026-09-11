import { ArrowUpRight, Video } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ProjectParticipantAvatars } from "./ProjectParticipantAvatars";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { Project } from "./types";

interface ProjectListItemProps {
  project: Project;
}

export const ProjectListItem: React.FC<ProjectListItemProps> = ({ project }) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-[#242628] transition-colors group">
      {/* Left: Title & Meta */}
      <div className="space-y-1 max-w-md">
        <Link
          href={`/editor/${project.id}`}
          className="text-sm font-sans font-medium text-[#F2F1ED] group-hover:text-[#FA5089] transition-colors flex items-center gap-2"
        >
          <span>{project.title}</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FA5089]" />
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#8B8D90] font-mono">
          <span>EP.{project.episodeNumber}</span>
          <span>·</span>
          <span>{project.updatedAt}</span>
          <span>·</span>
          <span className="text-[#F2F1ED]">{project.duration}</span>
          {project.hasCaptions && (
            <>
              <span>·</span>
              <span className="text-amber-400 bg-amber-950/40 border border-amber-500/20 px-1 rounded text-[10px]">
                CAPTIONS_SYNCED
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right: Controls & Details */}
      <div className="flex items-center gap-6">
        {/* Participants */}
        <div className="hidden md:flex items-center gap-1 text-xs text-[#8B8D90]">
          <ProjectParticipantAvatars participants={project.participants} />
        </div>

        {/* Status Badge */}
        <div className="hidden sm:block">
          <ProjectStatusBadge status={project.status} />
        </div>

        {/* Direct Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/editor/${project.id}`}
            className="px-3 py-1.5 text-xs font-mono bg-[#1A1B1D] border border-[#2E3033] hover:border-[#FA5089] rounded text-[#F2F1ED] transition-all"
          >
            Edit
          </Link>

          <Link
            href={`/video-meet/lobby?room=${project.id}`}
            title="Open Live Studio Room"
            className="p-1.5 rounded hover:bg-[#2E3033] text-[#8B8D90] hover:text-[#F2F1ED] transition-colors"
          >
            <Video className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
