"use client";

import React from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { HeroSection } from "./HeroSection";
import { InteractiveEditorDemoSection } from "./InteractiveEditorDemoSection";
import { WorkflowComparisonSection } from "./WorkflowComparisonSection";
import { LocalMultitrackSection } from "./LocalMultitrackSection";
import { EditorialCaptionsSection } from "./EditorialCaptionsSection";
import { DirectExportSection } from "./DirectExportSection";
import { DataStatsSection } from "./DataStatsSection";
import { StackIntegrationsSection } from "./StackIntegrationsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { CtaSection } from "./CtaSection";

export function LandingView() {
  return (
    <div className="min-h-screen bg-[#131415] text-[#F2F1ED] selection:bg-[#FA5089] selection:text-white">
      <Navbar mode="landing" />
      {/* 1. Hero with Ambient Animation & Logo Marquee */}
      <HeroSection />

      {/* 2. Interactive Product & Live Code Demo Section */}
      <InteractiveEditorDemoSection />

      {/* 3. Workflow Story (Old Cascade vs Aakaar Continuous Stream) */}
      <WorkflowComparisonSection />

      {/* 4. Local Multitrack Architecture */}
      <LocalMultitrackSection />

      {/* 5. Subtitle & Typography Engine */}
      <EditorialCaptionsSection />

      {/* 6. Direct Export Presets */}
      <DirectExportSection />

      {/* 7. Live Animated Stats & Turnaround Estimator */}
      <DataStatsSection />

      {/* 8. Stack & Open Standards Integrations */}
      <StackIntegrationsSection />

      {/* 9. Typographic Testimonials Grid */}
      <TestimonialsSection />

      {/* 10. Final High-Impact CTA */}
      <CtaSection />

      <Footer />
    </div>
  );
}
