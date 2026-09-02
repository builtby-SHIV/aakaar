"use client";

import { Search } from "lucide-react";
import React from "react";
import { FILTER_OPTIONS } from "./constants";
import { FilterStatus } from "./types";

interface DashboardFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7870]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search episodes, guests, topics..."
          className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFFFFF] border border-[#E5E3DC] rounded-md outline-none focus:border-[#141413] transition-colors placeholder:text-[#A3A199]"
        />
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1 self-start sm:self-auto border border-[#E5E3DC] bg-[#FFFFFF] p-1 rounded-md text-xs">
        {FILTER_OPTIONS.map(({ label, value }) => {
          const isActive = filterStatus === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onFilterChange(value)}
              className={`px-3 py-1 rounded capitalize font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-[#141413] text-[#F7F6F2]"
                  : "text-[#7A7870] hover:text-[#141413]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
