import React from "react";
import { ProjectEmptyState } from "./ProjectEmptyState";
import { ProjectListItem } from "./ProjectListItem";
import { Project } from "./types";

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="border border-[#E5E3DC] rounded-xl bg-[#FFFFFF] divide-y divide-[#E5E3DC] overflow-hidden shadow-2xs">
      {/* Table Header */}
      <div className="px-6 py-3 bg-[#FAF9F6] flex items-center justify-between text-[11px] font-mono text-[#7A7870] uppercase tracking-wider">
        <span>Episode / Document</span>
        <div className="flex items-center gap-12">
          <span className="hidden md:inline">Participants</span>
          <span className="hidden sm:inline">Status</span>
          <span>Actions</span>
        </div>
      </div>

      {/* Projects List or Empty State */}
      {projects.length === 0 ? (
        <ProjectEmptyState />
      ) : (
        projects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))
      )}
    </div>
  );
};
