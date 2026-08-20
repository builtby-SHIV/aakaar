"use client";

import MeetingForm, { type meetingForm } from "@repo/ui/MeetingForm";
import { useRouter } from "next/navigation";
import { useClientStore } from "../../providers/clientStoreProvider";

export default function Page () {
    const { setChannelName } = useClientStore((state) => state.actions);
    const router = useRouter();
    const onSubmit = (data: meetingForm) => {
        setChannelName(data.channelName);
        router.push(`/video-meet/${encodeURIComponent(data.channelName)}`);
    };

    return (
        <>
            <MeetingForm onSubmit={onSubmit} />
        </>
    )
}