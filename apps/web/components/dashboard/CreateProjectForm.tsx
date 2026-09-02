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
      className="p-6 bg-[#FFFFFF] border border-[#141413] rounded-xl shadow-lg space-y-4 animate-kanso-fade"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-[#7A7870]">
          Create New Episode
        </span>
        <button
          type="button"
          onClick={handleCancel}
          className="text-xs text-[#7A7870] hover:text-[#141413] cursor-pointer"
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
        className="w-full text-base font-medium bg-transparent border-b border-[#E5E3DC] pb-2 outline-none focus:border-[#141413] transition-colors"
      />

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleCancel}
          className="px-3 py-1.5 text-xs text-[#7A7870] hover:text-[#141413] cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 text-xs bg-[#141413] text-[#F7F6F2] font-medium rounded hover:bg-[#2B2A27] cursor-pointer"
        >
          Create & Launch Studio
        </button>
      </div>
    </form>
  );
};
