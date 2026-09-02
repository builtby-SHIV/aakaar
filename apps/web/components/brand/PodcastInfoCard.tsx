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
    <div className="p-8 rounded-xl border border-[#E5E3DC] bg-[#FFFFFF] space-y-6">
      <h3 className="text-base font-medium text-[#141413] tracking-tight">
        Podcast Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5">
          <label className="font-medium text-[#141413]">Show Title</label>
          <input
            type="text"
            value={podcastName}
            onChange={(e) => onPodcastNameChange(e.target.value)}
            className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E3DC] rounded-md outline-none focus:border-[#141413] text-[#141413]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-medium text-[#141413]">
            Default Watermark Subtitle
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => onTaglineChange(e.target.value)}
            className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E3DC] rounded-md outline-none focus:border-[#141413] text-[#141413]"
          />
        </div>
      </div>
    </div>
  );
};
