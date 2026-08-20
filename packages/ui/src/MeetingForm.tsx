"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
    channelName: z.string().nonempty("channel name is compulsary")
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
            >
                <input
                    {...register("channelName")}
                    placeholder="Enter ChannelName"
                />
                {errors.channelName && <span className="text-red-400">{errors.channelName.message}</span>}
                <button
                    type="submit"
                    className="text-white"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default MeetingForm
