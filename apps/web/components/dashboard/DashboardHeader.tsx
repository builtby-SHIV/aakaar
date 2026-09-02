import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DashboardHeaderProps {
    userName?: string;
    workspaceName?: string;
    projectCount: number;
    mediaHours?: number;
    onNewProject: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    userName = "",
    workspaceName = "Aakaar Studio Workspace",
    projectCount,
    mediaHours = 3.4,
    onNewProject,
}) => {
    return (
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-border">
            <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-muted">
                    {workspaceName}
                </span>
                <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#141413]">
                    Good morning, {userName}.
                </h1>
                <p className="text-sm text-muted">
                    {projectCount} recorded episode{projectCount === 1 ? "" : "s"} ·{" "}
                    {mediaHours} hrs master media stored
                </p>
            </div>

            {/* Main Action Buttons */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onNewProject}
                    className="px-4 py-2.5 bg-[#141413] text-[#F7F6F2] text-xs font-medium rounded-md hover:bg-[#2B2A27] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Project</span>
                </button>

                <Link
                    href="/video-meet"
                    className="px-4 py-2.5 border border-border bg-surface hover:bg-surface-hover text-[#141413] text-xs font-medium rounded-md transition-all flex items-center gap-2"
                >
                    <div className="w-2 h-2 rounded-full bg-rec animate-pulse" />
                    <span>Start Recording Studio</span>
                </Link>
            </div>
        </header>
    );
};
