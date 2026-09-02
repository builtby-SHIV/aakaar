import React from "react";

export const BrandHeader: React.FC = () => {
  return (
    <div className="space-y-2 pb-6 border-b border-[#E5E3DC]">
      <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
        Brand Identity System
      </span>
      <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#141413]">
        Brand Kit
      </h1>
      <p className="text-sm text-[#7A7870] max-w-xl">
        Save your typography, watermark logo, and caption presets. These
        settings are automatically applied across every new studio and editor
        project.
      </p>
    </div>
  );
};
