import React from "react";
import { ProjectEmptyState } from "./ProjectEmptyState";
import { ProjectListItem } from "./ProjectListItem";
import { Project } from "./types";

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="border border-[#2E3033] rounded-xl bg-[#1A1B1D] divide-y divide-[#2E3033] overflow-hidden shadow-xl">
      {/* Table Header */}
      <div className="px-6 py-3 bg-[#161718] flex items-center justify-between text-[11px] font-mono text-[#8B8D90] uppercase tracking-wider">
        <span>SESSION / DOCUMENT</span>
        <div className="flex items-center gap-12">
          <span className="hidden md:inline">PEERS</span>
          <span className="hidden sm:inline">STATE</span>
          <span>ACTIONS</span>
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
