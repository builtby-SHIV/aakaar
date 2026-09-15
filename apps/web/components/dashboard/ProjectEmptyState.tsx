import React from "react";

interface ProjectEmptyStateProps {
  message?: string;
}

export const ProjectEmptyState: React.FC<ProjectEmptyStateProps> = ({
  message = "No recordings found matching your query.",
}) => {
  return (
    <div className="p-12 text-center text-sm text-[#8B8D90]">{message}</div>
  );
};
