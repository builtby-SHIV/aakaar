import React from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { TEMPLATES } from "./constants";
import { TemplatesGrid } from "./TemplatesGrid";
import { TemplatesHeader } from "./TemplatesHeader";
import { Template } from "./types";

interface TemplatesViewProps {
  templates?: Template[];
}

export function TemplatesView({ templates = TEMPLATES }: TemplatesViewProps) {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#141413] flex flex-col justify-between">
      <div>
        <Navbar mode="app" />

        <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
          <TemplatesHeader />
          <TemplatesGrid templates={templates} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
