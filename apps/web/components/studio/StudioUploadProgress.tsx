"use client";

import React from "react";

interface StudioUploadProgressProps {
  hostUploadProgress: number;
  guestUploadProgress: number;
}

export const StudioUploadProgress: React.FC<StudioUploadProgressProps> = ({
  hostUploadProgress,
  guestUploadProgress,
}) => {
  return (
    <div className="max-w-md w-full bg-[#1A1917] border border-[#2A2926] rounded-2xl p-8 space-y-6 shadow-2xl text-center animate-kanso-fade">
      <div className="w-12 h-12 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto" />
      <div className="space-y-1">
        <h3 className="text-xl font-medium text-white">
          Syncing High-Bitrate Tracks
        </h3>
        <p className="text-xs text-[#7A7870]">
          Uploading isolated local recordings from host and guest machines.
        </p>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3 text-left">
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono text-stone-400">
            <span>Host (Alex Rivers) 1080p ProRes</span>
            <span>{hostUploadProgress}%</span>
          </div>
          <div className="w-full h-1 bg-[#2A2926] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${hostUploadProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono text-stone-400">
            <span>Guest (Elena Chen) 1080p ProRes</span>
            <span>{guestUploadProgress}%</span>
          </div>
          <div className="w-full h-1 bg-[#2A2926] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${guestUploadProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
