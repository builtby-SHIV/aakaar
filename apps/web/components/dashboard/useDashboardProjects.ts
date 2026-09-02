"use client";

import { useMemo, useState } from "react";
import { INITIAL_PROJECTS } from "./constants";
import { FilterStatus, Project } from "./types";

interface UseDashboardProjectsOptions {
  initialProjects?: Project[];
}

export function useDashboardProjects(options?: UseDashboardProjectsOptions) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [projects, setProjects] = useState<Project[]>(
    options?.initialProjects ?? INITIAL_PROJECTS,
  );
  const [isCreating, setIsCreating] = useState(false);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.participants.some((participant) =>
          participant.toLowerCase().includes(query),
        );

      const matchesFilter =
        filterStatus === "all" ||
        project.status.toLowerCase() === filterStatus.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [projects, searchQuery, filterStatus]);

  const handleCreateProject = (title: string) => {
    const newProject: Project = {
      id: `ep-${projects.length + 1}`,
      title,
      episodeNumber: projects.length + 1,
      status: "Draft",
      updatedAt: "Just now",
      duration: "00:00",
      participants: ["Alex Rivers"],
      hasCaptions: false,
    };

    setProjects((prev) => [newProject, ...prev]);
    setIsCreating(false);
  };

  return {
    projects,
    setProjects,
    filteredProjects,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    isCreating,
    setIsCreating,
    handleCreateProject,
  };
}
