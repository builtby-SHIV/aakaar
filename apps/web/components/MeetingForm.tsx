"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, Video, Radio } from "lucide-react";

const schema = z.object({
  roomName: z.string().min(1, "Room name is required").max(60, "Room name is too long"),
});

export type meetingForm = z.infer<typeof schema>;

type MeetingFormProps = {
  onSubmit: (data: meetingForm) => void;
};

const MeetingForm = ({ onSubmit }: MeetingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<meetingForm>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-[#8B8D90] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#FA5089]" />
            <span>SESSION_ROOM_ID</span>
          </span>
          <span className="text-[10px] text-[#8B8D90]">e.g. ep-15-conversations</span>
        </label>
        <input
          {...register("roomName")}
          placeholder="ep-15-conversations"
          autoFocus
          className="w-full px-3.5 py-2.5 bg-[#131415] border border-[#2E3033] rounded-lg text-sm text-[#F2F1ED] font-mono placeholder:text-[#8B8D90]/50 outline-none focus:border-[#FA5089] transition-colors"
        />
        {errors.roomName && (
          <p className="text-xs text-[#EF4444] font-mono pt-0.5">
            {errors.roomName.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-[#FA5089] hover:bg-[#E03F74] text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm shadow-[#FA5089]/20"
      >
        <Video className="w-3.5 h-3.5" />
        <span>Continue to Studio Lobby</span>
        <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
      </button>
    </form>
  );
};

export default MeetingForm;
