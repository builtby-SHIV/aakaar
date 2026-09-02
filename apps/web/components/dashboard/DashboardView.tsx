"use client";

import React from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { CreateProjectForm } from "./CreateProjectForm";
import { DashboardFilters } from "./DashboardFilters";
import { DashboardHeader } from "./DashboardHeader";
import { ProjectList } from "./ProjectList";
import { Project } from "./types";
import { useDashboardProjects } from "./useDashboardProjects";

interface DashboardViewProps {
  initialProjects?: Project[];
  userName?: string;
  workspaceName?: string;
  mediaHours?: number;
}

export function DashboardView({
  initialProjects,
  userName,
  workspaceName,
  mediaHours,
}: DashboardViewProps) {
  const {
    projects,
    filteredProjects,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    isCreating,
    setIsCreating,
    handleCreateProject,
  } = useDashboardProjects({ initialProjects });

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#141413] flex flex-col justify-between">
      <div>
        <Navbar mode="app" />

        <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
          {/* Header Section */}
          <DashboardHeader
            userName={userName}
            workspaceName={workspaceName}
            mediaHours={mediaHours}
            projectCount={projects.length}
            onNewProject={() => setIsCreating(true)}
          />

          {/* Inline Create Input Modal/Panel */}
          <CreateProjectForm
            isOpen={isCreating}
            onClose={() => setIsCreating(false)}
            onCreateProject={handleCreateProject}
          />

          {/* Filter & Search Bar */}
          <DashboardFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
          />

          {/* Projects Document-Style List */}
          <ProjectList projects={filteredProjects} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
