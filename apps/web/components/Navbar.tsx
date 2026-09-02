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
    <header className="w-full border-b border-border bg-[#F7F6F2]/90 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" showTagline={mode === "landing"} href="/" />

        {mode === "landing" ? (
          <>
            {/* Minimal Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm text-muted font-normal">
              <Link
                href="#workflow"
                className="hover:text-[#141413] transition-colors"
              >
                Workflow
              </Link>
              <Link
                href="#recording"
                className="hover:text-[#141413] transition-colors"
              >
                Local Studio
              </Link>
              <Link
                href="#editor"
                className="hover:text-[#141413] transition-colors"
              >
                In-Browser Editor
              </Link>
              <Link
                href="#layouts"
                className="hover:text-[#141413] transition-colors"
              >
                Layouts & Captions
              </Link>
            </nav>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-muted hover:text-[#141413] px-3.5 py-1.5 transition-colors hidden sm:block"
              >
                Sign in
              </Link>
              <Link
                href="/video-meet"
                className="text-sm font-medium bg-[#141413] text-[#F7F6F2] px-4 py-2 rounded-md hover:bg-[#2B2A27] transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Start recording</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-light" />
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* App Nav Links */}
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/dashboard"
                className={`font-medium transition-colors ${
                  pathname === "/dashboard"
                    ? "text-[#141413]"
                    : "text-muted hover:text-[#141413]"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/brand"
                className={`font-medium transition-colors ${
                  pathname === "/brand"
                    ? "text-[#141413]"
                    : "text-muted hover:text-[#141413]"
                }`}
              >
                Brand Kit
              </Link>
              <Link
                href="/templates"
                className={`font-medium transition-colors ${
                  pathname === "/templates"
                    ? "text-[#141413]"
                    : "text-[#7A7870] hover:text-[#141413]"
                }`}
              >
                Templates
              </Link>
            </nav>

            {/* Quick Action */}
            <div className="flex items-center gap-3">
              <div className="">
                <LogOut variant="navbar" />
              </div>
              <Link
                href="/video-meet"
                className="text-sm font-medium bg-[#141413] text-[#F7F6F2] px-3.5 py-1.5 rounded-md hover:bg-[#2B2A27] transition-all flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#E53E3E] animate-pulse" />
                <span>New Studio</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
