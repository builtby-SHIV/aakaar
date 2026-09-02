"use client";

import React from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { BrandHeader } from "./BrandHeader";
import { BrandKitForm } from "./BrandKitForm";
import { BrandKitSettings } from "./types";
import { useBrandKit } from "./useBrandKit";

interface BrandKitViewProps {
  initialSettings?: Partial<BrandKitSettings>;
}

export function BrandKitView({ initialSettings }: BrandKitViewProps) {
  const { settings, saved, updateField, handleSave } = useBrandKit(initialSettings);

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#141413] flex flex-col justify-between">
      <div>
        <Navbar mode="app" />

        <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
          <BrandHeader />
          <BrandKitForm
            settings={settings}
            saved={saved}
            onUpdateField={updateField}
            onSubmit={handleSave}
          />
        </main>
      </div>

      <Footer />
    </div>
  );
}
