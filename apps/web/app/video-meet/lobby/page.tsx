"use client";

import { PreJoin, LocalUserChoices } from "@livekit/components-react";
import { trpc } from "../../../lib/trpc";
import { useRouter } from "next/navigation";
import { useMeetingStore } from "../../../providers/meetingStoreProvider";

export default function Page({ roomName }: { roomName: string }) {
    const { mutate } = trpc.meeting.getToken.useMutation();
    const { setToken } = useMeetingStore((state) =>  state.actions);
    const router = useRouter();
    const handleSubmit = (values: LocalUserChoices) => {
    // values = { username, videoEnabled, audioEnabled, videoDeviceId, audioDeviceId }
    mutate(
        { 
            roomName: "roomName", 
            participantName: "shiv" 
        },
        { 
            onSuccess: (data) => {
                setToken(data.token);
                console.log("token" + data.token);
                router.replace(`/video-meet/roomName`)
            }
        }
    );
};

    return (
        <PreJoin
            defaults={{ }}
            onSubmit={handleSubmit}
            onError={(e) => console.error(e)}
        />
    );
}