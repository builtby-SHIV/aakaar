import { FilterStatus, Project } from "./types";

export const INITIAL_PROJECTS: Project[] = [
    {
        id: "ep-14",
        title: "Spatial Audio & Local First Media Architecture",
        episodeNumber: 14,
        status: "Edited",
        updatedAt: "Today at 2:15 PM",
        duration: "42:17",
        participants: ["Alex Rivers", "Elena Chen"],
        hasCaptions: true,
    },
    {
        id: "ep-13",
        title: "Designing In-Browser Workspaces without Bloat",
        episodeNumber: 13,
        status: "Published",
        updatedAt: "Aug 24 · 38:02",
        duration: "38:02",
        participants: ["Alex Rivers", "Marcus Vance"],
        hasCaptions: true,
    },
    {
        id: "ep-12",
        title: "The Kanso Principle in Modern Web Software",
        episodeNumber: 12,
        status: "Draft",
        updatedAt: "Aug 19 · 51:21",
        duration: "51:21",
        participants: ["Alex Rivers", "Sarah Lin", "Kenji Sato"],
        hasCaptions: false,
    },
    {
        id: "ep-11",
        title: "Why Desktop Video Editors Slow Down Creators",
        episodeNumber: 11,
        status: "Published",
        updatedAt: "Aug 12 · 45:10",
        duration: "45:10",
        participants: ["Alex Rivers", "Devin Cole"],
        hasCaptions: true,
    },
    {
        id: "ep-10",
        title: "WebRTC vs Local Recording Stream Sync",
        episodeNumber: 10,
        status: "Published",
        updatedAt: "Aug 02 · 32:44",
        duration: "32:44",
        participants: ["Alex Rivers", "Priya Sharma"],
        hasCaptions: true,
    },
];

export const FILTER_OPTIONS: { label: string; value: FilterStatus }[] = [
    { label: "All", value: "all" },
    { label: "Draft", value: "draft" },
    { label: "Edited", value: "edited" },
    { label: "Published", value: "published" },
];
