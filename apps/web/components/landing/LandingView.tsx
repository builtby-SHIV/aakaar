"use client";

import React from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { CtaSection } from "./CtaSection";
import { DirectExportSection } from "./DirectExportSection";
import { EditorialCaptionsSection } from "./EditorialCaptionsSection";
import { HeroSection } from "./HeroSection";
import { InteractiveEditorDemoSection } from "./InteractiveEditorDemoSection";
import { LocalMultitrackSection } from "./LocalMultitrackSection";
import { WorkflowComparisonSection } from "./WorkflowComparisonSection";

export function LandingView() {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#141413] selection:bg-[#141413] selection:text-[#F7F6F2]">
      <Navbar mode="landing" />
      <HeroSection />
      <WorkflowComparisonSection />
      <LocalMultitrackSection />
      <InteractiveEditorDemoSection />
      <EditorialCaptionsSection />
      <DirectExportSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
