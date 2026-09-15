"use client";

import React from "react";

interface PodcastInfoCardProps {
  podcastName: string;
  tagline: string;
  onPodcastNameChange: (value: string) => void;
  onTaglineChange: (value: string) => void;
}

export const PodcastInfoCard: React.FC<PodcastInfoCardProps> = ({
  podcastName,
  tagline,
  onPodcastNameChange,
  onTaglineChange,
}) => {
  return (
    <div className="p-8 rounded-xl border border-[#2E3033] bg-[#1A1B1D] space-y-6">
      <h3 className="text-base font-medium text-[#F2F1ED] tracking-tight">
        Podcast Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5">
          <label className="font-medium text-[#F2F1ED]">Show Title</label>
          <input
            type="text"
            value={podcastName}
            onChange={(e) => onPodcastNameChange(e.target.value)}
            className="w-full p-2.5 bg-[#131415] border border-[#2E3033] rounded-md outline-none focus:border-[#FA5089] text-[#F2F1ED]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-medium text-[#F2F1ED]">
            Default Watermark Subtitle
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => onTaglineChange(e.target.value)}
            className="w-full p-2.5 bg-[#131415] border border-[#2E3033] rounded-md outline-none focus:border-[#FA5089] text-[#F2F1ED]"
          />
        </div>
      </div>
    </div>
  );
};
