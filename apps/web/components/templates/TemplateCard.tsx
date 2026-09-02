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
    <div className="p-8 rounded-xl border border-[#E5E3DC] bg-[#FFFFFF] hover:border-[#141413] transition-all space-y-4 flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E5E3DC] flex items-center justify-center text-[#141413]">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF9F6] text-[#7A7870]">
            {template.resolution}
          </span>
        </div>

        <h3 className="text-lg font-medium text-[#141413] tracking-tight">
          {template.title}
        </h3>
        <div className="text-xs font-mono text-[#7A7870]">{template.ratio}</div>
        <p className="text-xs text-[#7A7870] leading-relaxed">
          {template.desc}
        </p>
      </div>

      <div className="pt-4 border-t border-[#E5E3DC] flex items-center justify-between">
        <span className="text-xs text-[#7A7870]">Default Preset</span>
        <Link
          href={`/editor/${template.id}`}
          className="text-xs font-medium text-[#141413] group-hover:text-[#E54D2E] flex items-center gap-1.5 transition-colors"
        >
          <span>Open in Editor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
