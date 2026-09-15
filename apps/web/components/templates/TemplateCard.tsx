import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Template } from "./types";

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const Icon = template.icon;

  return (
    <div className="p-8 rounded-xl border border-[#2E3033] bg-[#1A1B1D] hover:border-[#FA5089] transition-all space-y-4 flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-[#131415] border border-[#2E3033] flex items-center justify-center text-[#FA5089]">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#131415] text-[#8B8D90]">
            {template.resolution}
          </span>
        </div>

        <h3 className="text-lg font-medium text-[#F2F1ED] tracking-tight">
          {template.title}
        </h3>
        <div className="text-xs font-mono text-[#8B8D90]">{template.ratio}</div>
        <p className="text-xs text-[#8B8D90] leading-relaxed">
          {template.desc}
        </p>
      </div>

      <div className="pt-4 border-t border-[#2E3033] flex items-center justify-between">
        <span className="text-xs text-[#8B8D90]">Default Preset</span>
        <Link
          href={`/editor/${template.id}`}
          className="text-xs font-medium text-[#F2F1ED] group-hover:text-[#FA5089] flex items-center gap-1.5 transition-colors"
        >
          <span>Open in Editor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
