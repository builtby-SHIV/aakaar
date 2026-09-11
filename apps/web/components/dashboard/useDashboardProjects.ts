"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTRPC } from "../../trpc/client";
import { useMeetingStore } from "../../providers/meetingStoreProvider";
import { notifyTRPCError } from "../../lib/handle-error";
import { FilterStatus, Project } from "./types";

interface UseDashboardProjectsOptions {
  initialProjects?: Project[];
}

export function useDashboardProjects(options?: UseDashboardProjectsOptions) {
  const router = useRouter();
  const trpc = useTRPC();
  const { setRoomName, setProjectName } = useMeetingStore((state) => state.actions);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [isCreating, setIsCreating] = useState(false);

  // Fetch both owned projects and participated projects from backend
  const projectsQuery = useQuery(trpc.project.listAll.queryOptions());

  const projects: Project[] = useMemo(() => {
    if (projectsQuery.data && projectsQuery.data.length > 0) {
      return projectsQuery.data;
    }
    return options?.initialProjects ?? [];
  }, [projectsQuery.data, options?.initialProjects]);

  const createProjectMutation = useMutation(
    trpc.project.create.mutationOptions({
      onSuccess: (newProject) => {
        setIsCreating(false);
        projectsQuery.refetch();
        if (newProject) {
          setRoomName(String(newProject.id));
          setProjectName(newProject.name);
          // Redirect directly to studio lobby for this project
          router.push(`/video-meet/lobby?room=${newProject.id}`);
        }
      },
      onError: (err) => {
        notifyTRPCError(err, "Failed to create project");
      },
    })
  );

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

  const handleCreateProject = async (title: string) => {
    await createProjectMutation.mutateAsync({ name: title });
  };

  return {
    projects,
    filteredProjects,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    isCreating,
    setIsCreating,
    handleCreateProject,
    isLoading: projectsQuery.isLoading,
    isCreatingPending: createProjectMutation.isPending,
  };
}
