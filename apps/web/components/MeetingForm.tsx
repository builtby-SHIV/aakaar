"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, Video } from "lucide-react";

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
        <label className="text-xs font-medium text-[#141413] flex items-center justify-between">
          <span>Room Name</span>
          <span className="text-[10px] font-mono text-muted">e.g. ep-15-conversations</span>
        </label>
        <input
          {...register("roomName")}
          placeholder="Enter room name"
          autoFocus
          className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-sm text-[#141413] placeholder:text-muted-light outline-none focus:border-[#141413] transition-colors"
        />
        {errors.roomName && (
          <p className="text-xs text-rec font-mono pt-0.5">
            {errors.roomName.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-[#141413] text-[#F7F6F2] font-medium text-xs rounded-lg hover:bg-[#2B2A27] transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        <Video className="w-3.5 h-3.5" />
        <span>Continue to Studio Lobby</span>
        <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
      </button>
    </form>
  );
};

export default MeetingForm;
