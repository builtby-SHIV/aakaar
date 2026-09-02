export type ProjectStatus = "Draft" | "Edited" | "Published" | "Recording";

export type FilterStatus = "all" | "draft" | "edited" | "published";

export interface Project {
  id: string;
  title: string;
  episodeNumber: number;
  status: ProjectStatus;
  updatedAt: string;
  duration: string;
  participants: string[];
  hasCaptions: boolean;
}
