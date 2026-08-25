"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
    roomName: z.string().nonempty("room name is compulsary")
});

export type meetingForm = z.infer<typeof schema>;
type meetingFormProps = {
    onSubmit: (data: meetingForm) => void;
}

const MeetingForm = ({ onSubmit }: meetingFormProps) => {
    
    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<meetingForm>({ resolver: zodResolver(schema) });

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <input
                    {...register("roomName")}
                    placeholder="Enter room name"
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-orange-500"
                />
                {errors.roomName && (
                    <span className="text-sm text-red-400">
                        {errors.roomName.message}
                    </span>
                )}
                <button
                    type="submit"
                    className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white"
                >
                    Continue to lobby
                </button>
            </form>
        </div>
    )
}

export default MeetingForm
