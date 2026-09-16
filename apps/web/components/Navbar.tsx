"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import LogOut from "./LogOut";

interface NavbarProps {
  mode?: "landing" | "app";
}

export function Navbar({ mode = "landing" }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-[#2E3033] bg-[#131415]/85 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand Logo & System Status Badge */}
        <div className="flex items-center gap-4">
          <Logo size="md" showTagline={mode === "landing"} href="/" />
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1A1B1D] border border-[#2E3033] text-[10px] font-mono text-[#8B8D90]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>WEBRTC 48KHZ · LIVE</span>
          </div>
        </div>

        {mode === "landing" ? (
          <>
            {/* Minimal Nav Links */}
            <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide text-[#8B8D90]">
              <Link
                href="#demo"
                className="hover:text-[#F2F1ED] transition-colors"
              >
                Interactive Demo
              </Link>
              <Link
                href="#workflow"
                className="hover:text-[#F2F1ED] transition-colors"
              >
                Architecture
              </Link>
              <Link
                href="#features"
                className="hover:text-[#F2F1ED] transition-colors"
              >
                Engine Specs
              </Link>
              <Link
                href="#performance"
                className="hover:text-[#F2F1ED] transition-colors"
              >
                Benchmarks
              </Link>
            </nav>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-xs font-medium text-[#8B8D90] hover:text-[#F2F1ED] px-3 py-1.5 transition-colors hidden sm:block font-mono"
              >
                Sign in
              </Link>
              <Link
                href="/video-meet"
                className="text-xs font-medium bg-[#FA5089] hover:bg-[#E03F74] text-white px-3.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 shadow-sm shadow-[#FA5089]/20"
              >
                <span>Start recording</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* App Nav Links */}
            <nav className="flex items-center gap-6 text-xs">
              <Link
                href="/dashboard"
                className={`font-medium transition-colors ${
                  pathname === "/dashboard"
                    ? "text-[#F2F1ED] border-b-2 border-[#FA5089] pb-0.5"
                    : "text-[#8B8D90] hover:text-[#F2F1ED]"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/brand"
                className={`font-medium transition-colors ${
                  pathname === "/brand"
                    ? "text-[#F2F1ED] border-b-2 border-[#FA5089] pb-0.5"
                    : "text-[#8B8D90] hover:text-[#F2F1ED]"
                }`}
              >
                Brand Kit
              </Link>
              <Link
                href="/templates"
                className={`font-medium transition-colors ${
                  pathname === "/templates"
                    ? "text-[#F2F1ED] border-b-2 border-[#FA5089] pb-0.5"
                    : "text-[#8B8D90] hover:text-[#F2F1ED]"
                }`}
              >
                Templates
              </Link>
            </nav>

            {/* Quick Action */}
            <div className="flex items-center gap-3">
              <LogOut variant="navbar" />
              <Link
                href="/dashboard"
                className="text-xs font-medium bg-[#1A1B1D] border border-[#2E3033] hover:border-[#FA5089] text-[#F2F1ED] px-3 py-1.5 rounded-md transition-all flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-rec-pulse" />
                <span className="font-mono text-[11px]">New Studio</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
