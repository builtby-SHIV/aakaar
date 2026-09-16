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
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8D90]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by session ID, title, or guest..."
          className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-[#1A1B1D] border border-[#2E3033] rounded-md outline-none focus:border-[#FA5089] text-[#F2F1ED] transition-colors placeholder:text-[#8B8D90]/50"
        />
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1 self-start sm:self-auto border border-[#2E3033] bg-[#1A1B1D] p-1 rounded-md text-xs font-mono">
        {FILTER_OPTIONS.map(({ label, value }) => {
          const isActive = filterStatus === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onFilterChange(value)}
              className={`px-3 py-1 rounded capitalize transition-all cursor-pointer ${
                isActive
                  ? "bg-[#242628] text-[#FA5089] font-medium border border-[#2E3033]"
                  : "text-[#8B8D90] hover:text-[#F2F1ED]"
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
