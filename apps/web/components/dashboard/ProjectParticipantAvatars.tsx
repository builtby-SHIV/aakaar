import React from "react";

interface ProjectParticipantAvatarsProps {
  participants: string[];
}

export const ProjectParticipantAvatars: React.FC<ProjectParticipantAvatarsProps> = ({
  participants,
}) => {
  if (!participants || participants.length === 0) return null;

  return (
    <div className="flex -space-x-1.5">
      {participants.map((part, idx) => (
        <div
          key={`${part}-${idx}`}
          title={part}
          className="w-5 h-5 rounded-full bg-[#141413] text-[#F7F6F2] border border-[#FFFFFF] flex items-center justify-center text-[9px] font-mono"
        >
          {part.charAt(0)}
        </div>
      ))}
    </div>
  );
};
