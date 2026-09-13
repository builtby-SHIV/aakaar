"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  href?: string;
  className?: string;
}

export function Logo({ size = "md", showTagline = false, href = "/", className = "" }: LogoProps) {
  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base font-semibold",
    lg: "text-lg font-bold",
  };

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Technical Mux-inspired Geometric Glyph */}
      <div className={`${iconSizes[size]} relative flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-transform duration-200 group-hover:scale-105"
        >
          <rect width="28" height="28" rx="6" fill="#1A1B1D" stroke="#2E3033" strokeWidth="1" />
          <path
            d="M7 14L11 8H17L21 14L17 20H11L7 14Z"
            stroke="#F2F1ED"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="14" r="2.5" fill="#FA5089" />
        </svg>
      </div>

      {/* Brand Wordmark & Technical Version Badge */}
      <div className="flex items-center gap-2">
        <span className={`tracking-[-0.03em] text-[#F2F1ED] font-sans ${textSizes[size]}`}>
          Aakaar
        </span>
        {showTagline && (
          <span className="text-[9px] uppercase tracking-widest font-mono text-[#8B8D90] px-1.5 py-0.5 rounded bg-[#242628] border border-[#2E3033]">
            STUDIO
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="inline-flex items-center">{content}</Link>;
  }

  return content;
}
