"use client";

import MeetingForm, { type meetingForm } from "@repo/ui/MeetingForm";
import { useRouter } from "next/navigation";
import { useClientStore } from "../../providers/clientStoreProvider";

export default function Page () {
    const { setRoomName } = useClientStore((state) => state.actions);
    const router = useRouter();
    const onSubmit = (data: meetingForm) => {
        setRoomName(data.roomName);
        router.push(`/video-meet/${encodeURIComponent(data.roomName)}`);
    };

    return (
        <>
            <MeetingForm onSubmit={onSubmit} />
        </>
    )
}