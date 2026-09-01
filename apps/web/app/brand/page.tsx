"use client";

import { Check, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

export default function BrandKitPage() {
  const [podcastName, setPodcastName] = useState("Aakaar Conversations");
  const [tagline, setTagline] = useState("Spatial Design & In-Browser Media");
  const [primaryColor, setPrimaryColor] = useState("#141413");
  const [accentColor, setAccentColor] = useState("#E54D2E");
  const [defaultCaptionFont, setDefaultCaptionFont] = useState("Modern Sans");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#141413] flex flex-col justify-between">
      <div>
        <Navbar mode="app" />

        <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
          {/* Header */}
          <div className="space-y-2 pb-6 border-b border-[#E5E3DC]">
            <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
              Brand Identity System
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#141413]">
              Brand Kit
            </h1>
            <p className="text-sm text-[#7A7870] max-w-xl">
              Save your typography, watermark logo, and caption presets. These
              settings are automatically applied across every new studio and
              editor project.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            {/* 1. Identity & Watermark */}
            <div className="p-8 rounded-xl border border-[#E5E3DC] bg-[#FFFFFF] space-y-6">
              <h3 className="text-base font-medium text-[#141413] tracking-tight">
                Podcast Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-medium text-[#141413]">
                    Show Title
                  </label>
                  <input
                    type="text"
                    value={podcastName}
                    onChange={(e) => setPodcastName(e.target.value)}
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
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E3DC] rounded-md outline-none focus:border-[#141413] text-[#141413]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Colors & Typography */}
            <div className="p-8 rounded-xl border border-[#E5E3DC] bg-[#FFFFFF] space-y-6">
              <h3 className="text-base font-medium text-[#141413] tracking-tight">
                Visual Theme & Typography
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                {/* Primary Charcoal */}
                <div className="space-y-2">
                  <label className="font-medium text-[#141413]">
                    Primary Base Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-8 h-8 rounded border border-[#E5E3DC] cursor-pointer"
                    />
                    <span className="font-mono text-xs text-[#7A7870]">
                      {primaryColor}
                    </span>
                  </div>
                </div>

                {/* Restrained Accent */}
                <div className="space-y-2">
                  <label className="font-medium text-[#141413]">
                    Brand Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded border border-[#E5E3DC] cursor-pointer"
                    />
                    <span className="font-mono text-xs text-[#7A7870]">
                      {accentColor}
                    </span>
                  </div>
                </div>

                {/* Font Preset */}
                <div className="space-y-2">
                  <label className="font-medium text-[#141413]">
                    Default Caption Font
                  </label>
                  <select
                    value={defaultCaptionFont}
                    onChange={(e) => setDefaultCaptionFont(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E3DC] rounded-md text-[#141413]"
                  >
                    <option>Modern Sans</option>
                    <option>Editorial Serif</option>
                    <option>Monospace</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between pt-4">
              <span className="text-xs text-[#7A7870]">
                All settings sync locally to your browser storage.
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#141413] text-[#F7F6F2] text-xs font-medium rounded-md hover:bg-[#2B2A27] transition-all flex items-center gap-2 shadow-sm"
              >
                {saved ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>{saved ? "Saved to Brand Kit" : "Save Brand Kit"}</span>
              </button>
            </div>
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
}
