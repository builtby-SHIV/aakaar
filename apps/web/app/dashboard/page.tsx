"use client";

import { ArrowUpRight, Plus, Search, Video } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

interface Project {
  id: string;
  title: string;
  episodeNumber: number;
  status: "Draft" | "Edited" | "Published" | "Recording";
  updatedAt: string;
  duration: string;
  participants: string[];
  hasCaptions: boolean;
}

const INITIAL_PROJECTS: Project[] = [
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

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.participants.some((part) =>
        part.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesFilter =
      filterStatus === "all" ||
      p.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newProject: Project = {
      id: `ep-${projects.length + 1}`,
      title: newTitle.trim(),
      episodeNumber: projects.length + 1,
      status: "Draft",
      updatedAt: "Just now",
      duration: "00:00",
      participants: ["Alex Rivers"],
      hasCaptions: false,
    };
    setProjects([newProject, ...projects]);
    setNewTitle("");
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#141413] flex flex-col justify-between">
      <div>
        <Navbar mode="app" />

        <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#E5E3DC]">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
                Aakaar Studio Workspace
              </span>
              <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#141413]">
                Good morning, Alex.
              </h1>
              <p className="text-sm text-[#7A7870]">
                {projects.length} recorded episodes · 3.4 hrs master media
                stored
              </p>
            </div>

            {/* Main Action */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCreating(true)}
                className="px-4 py-2.5 bg-[#141413] text-[#F7F6F2] text-xs font-medium rounded-md hover:bg-[#2B2A27] transition-all flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </button>

              <Link
                href="/video-meet"
                className="px-4 py-2.5 border border-[#E5E3DC] bg-[#FFFFFF] hover:bg-[#F2F0EB] text-[#141413] text-xs font-medium rounded-md transition-all flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#E53E3E] animate-pulse" />
                <span>Start Recording Studio</span>
              </Link>
            </div>
          </div>

          {/* Inline Create Input Modal/Panel */}
          {isCreating && (
            <form
              onSubmit={handleCreateProject}
              className="p-6 bg-[#FFFFFF] border border-[#141413] rounded-xl shadow-lg space-y-4 animate-kanso-fade"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#7A7870]">
                  Create New Episode
                </span>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-xs text-[#7A7870] hover:text-[#141413]"
                >
                  ✕
                </button>
              </div>

              <input
                type="text"
                autoFocus
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Episode Title (e.g. Ep. 15 — The Evolution of Creative Software)"
                className="w-full text-base font-medium bg-transparent border-b border-[#E5E3DC] pb-2 outline-none focus:border-[#141413] transition-colors"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1.5 text-xs text-[#7A7870] hover:text-[#141413]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-[#141413] text-[#F7F6F2] font-medium rounded hover:bg-[#2B2A27]"
                >
                  Create & Launch Studio
                </button>
              </div>
            </form>
          )}

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7870]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search episodes, guests, topics..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFFFFF] border border-[#E5E3DC] rounded-md outline-none focus:border-[#141413] transition-colors placeholder:text-[#A3A199]"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 self-start sm:self-auto border border-[#E5E3DC] bg-[#FFFFFF] p-1 rounded-md text-xs">
              {["all", "draft", "edited", "published"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded capitalize font-medium transition-all ${
                    filterStatus === st
                      ? "bg-[#141413] text-[#F7F6F2]"
                      : "text-[#7A7870] hover:text-[#141413]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Document-Style List */}
          <div className="border border-[#E5E3DC] rounded-xl bg-[#FFFFFF] divide-y divide-[#E5E3DC] overflow-hidden shadow-2xs">
            <div className="px-6 py-3 bg-[#FAF9F6] flex items-center justify-between text-[11px] font-mono text-[#7A7870] uppercase tracking-wider">
              <span>Episode / Document</span>
              <div className="flex items-center gap-12">
                <span className="hidden md:inline">Participants</span>
                <span className="hidden sm:inline">Status</span>
                <span>Actions</span>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="p-12 text-center text-sm text-[#7A7870]">
                No recordings found matching your query.
              </div>
            ) : (
              filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-[#FAF9F6] transition-colors group"
                >
                  {/* Left: Title & Meta */}
                  <div className="space-y-1 max-w-md">
                    <Link
                      href={`/editor/${p.id}`}
                      className="text-sm font-medium text-[#141413] group-hover:text-[#E54D2E] transition-colors flex items-center gap-2"
                    >
                      <span>{p.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E54D2E]" />
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-[#7A7870] font-mono">
                      <span>Ep. {p.episodeNumber}</span>
                      <span>·</span>
                      <span>{p.updatedAt}</span>
                      <span>·</span>
                      <span>{p.duration}</span>
                      {p.hasCaptions && (
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
                      <div className="flex -space-x-1.5">
                        {p.participants.map((part, idx) => (
                          <div
                            key={idx}
                            title={part}
                            className="w-5 h-5 rounded-full bg-[#141413] text-[#F7F6F2] border border-[#FFFFFF] flex items-center justify-center text-[9px] font-mono"
                          >
                            {part.charAt(0)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="hidden sm:block">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                          p.status === "Published"
                            ? "bg-emerald-50 text-emerald-700"
                            : p.status === "Edited"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-[#EFECE6] text-[#7A7870]"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>

                    {/* Direct Actions */}
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/editor/${p.id}`}
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
              ))
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
