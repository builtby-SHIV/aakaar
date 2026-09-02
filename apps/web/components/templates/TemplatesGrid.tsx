import React from "react";
import { TemplateCard } from "./TemplateCard";
import { Template } from "./types";

interface TemplatesGridProps {
  templates: Template[];
}

export const TemplatesGrid: React.FC<TemplatesGridProps> = ({ templates }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
};
