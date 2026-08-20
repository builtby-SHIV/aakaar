"use client";

import MeetingForm, { type meetingForm } from "@repo/ui/MeetingForm";
import { useRouter } from "next/navigation";

export default function Page () {
    const router = useRouter();
    const onSubmit = (data: meetingForm) => {
        router.push(`/video-meet/${encodeURIComponent(data.channelName)}`);
    };

    return (
        <>
            <MeetingForm onSubmit={onSubmit} />
        </>
    )
}