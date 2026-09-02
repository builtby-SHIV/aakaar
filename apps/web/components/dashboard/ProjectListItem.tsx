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
    <div className="px-6 py-4 flex items-center justify-between hover:bg-[#FAF9F6] transition-colors group">
      {/* Left: Title & Meta */}
      <div className="space-y-1 max-w-md">
        <Link
          href={`/editor/${project.id}`}
          className="text-sm font-medium text-[#141413] group-hover:text-[#E54D2E] transition-colors flex items-center gap-2"
        >
          <span>{project.title}</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E54D2E]" />
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#7A7870] font-mono">
          <span>Ep. {project.episodeNumber}</span>
          <span>·</span>
          <span>{project.updatedAt}</span>
          <span>·</span>
          <span>{project.duration}</span>
          {project.hasCaptions && (
            <>
              <span>·</span>
              <span className="text-amber-700 bg-amber-50 px-1 rounded text-[10px]">
                Captions
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right: Controls & Details */}
      <div className="flex items-center gap-6">
        {/* Participants */}
        <div className="hidden md:flex items-center gap-1 text-xs text-[#7A7870]">
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
            className="px-3 py-1.5 text-xs font-medium bg-[#FAF9F6] border border-[#E5E3DC] hover:border-[#141413] rounded text-[#141413] transition-all"
          >
            Edit
          </Link>

          <Link
            href="/video-meet"
            title="Open Live Studio Room"
            className="p-1.5 rounded hover:bg-[#EFECE6] text-[#7A7870] hover:text-[#141413] transition-colors"
          >
            <Video className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
