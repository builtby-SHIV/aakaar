import React from "react";

export const TemplatesHeader: React.FC = () => {
  return (
    <div className="space-y-2 pb-6 border-b border-[#2E3033]">
      <span className="text-xs uppercase font-mono tracking-widest text-[#8B8D90]">
        Studio Presets
      </span>
      <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F2F1ED]">
        Layout Templates
      </h1>
      <p className="text-sm text-[#8B8D90] max-w-xl">
        Start with pre-configured multitrack layouts, caption placements, and
        export formats designed for modern creators.
      </p>
    </div>
  );
};
