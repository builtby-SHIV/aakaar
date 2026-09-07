"use client";

import React, { useState } from "react";

interface CreateProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (title: string) => void;
}

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onCreateProject(trimmedTitle);
    setTitle("");
  };

  const handleCancel = () => {
    setTitle("");
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-[#1A1B1D] border border-[#2E3033] rounded-xl shadow-2xl space-y-4 animate-fade text-[#F2F1ED]"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-[#FA5089]">
          INITIALIZE_PROJECT_SHELL
        </span>
        <button
          type="button"
          onClick={handleCancel}
          className="text-xs text-[#8B8D90] hover:text-[#F2F1ED] cursor-pointer"
          aria-label="Close create episode form"
        >
          ✕
        </button>
      </div>

      <input
        type="text"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Episode Title (e.g. Ep. 15 — The Evolution of Creative Software)"
        className="w-full text-base font-sans font-medium bg-transparent border-b border-[#2E3033] pb-2 text-[#F2F1ED] outline-none focus:border-[#FA5089] placeholder:text-[#8B8D90]/40 transition-colors"
      />

      <div className="flex justify-end gap-3 pt-2 font-mono">
        <button
          type="button"
          onClick={handleCancel}
          className="px-3 py-1.5 text-xs text-[#8B8D90] hover:text-[#F2F1ED] cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 text-xs bg-[#FA5089] hover:bg-[#E03F74] text-white font-medium rounded transition-all cursor-pointer shadow-sm shadow-[#FA5089]/20"
        >
          Create Project
        </button>
      </div>
    </form>
  );
};
