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
    lg: "w-8 h-8",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Bespoke Kanso Geometric Glyph for Aakaar (Form & Structure) */}
      <div className={`${iconSizes[size]} relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#141413] transition-transform duration-300 group-hover:scale-95"
        >
          {/* Architectural minimal frame representing raw recording + refined shape */}
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.2" />
          <rect x="10" y="10" width="12" height="12" rx="2" fill="currentColor" />
          <circle cx="16" cy="16" r="2.5" fill="#F7F6F2" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex items-baseline gap-1.5">
        <span className={`font-serif tracking-tight font-medium text-[#141413] ${textSizes[size]}`}>
          Aakaar
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-widest font-mono text-[#7A7870]">
            Studio
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
