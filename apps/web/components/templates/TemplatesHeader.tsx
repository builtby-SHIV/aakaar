import React from "react";

export const TemplatesHeader: React.FC = () => {
  return (
    <div className="space-y-2 pb-6 border-b border-[#E5E3DC]">
      <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
        Studio Presets
      </span>
      <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#141413]">
        Layout Templates
      </h1>
      <p className="text-sm text-[#7A7870] max-w-xl">
        Start with pre-configured multitrack layouts, caption placements, and
        export formats designed for modern creators.
      </p>
    </div>
  );
};
