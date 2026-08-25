"use client";

import MeetingForm, { type meetingForm } from "../components/MeetingForm";
import { useRouter } from "next/navigation";
import { useMeetingStore } from "../../providers/meetingStoreProvider";

export default function Page() {
    const router = useRouter();
    const { setRoomName } = useMeetingStore((state) => state.actions);

    const onSubmit = (data: meetingForm) => {
        setRoomName(data.roomName);
        router.push("/video-meet/lobby");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
            <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h1 className="mb-2 text-xl font-semibold">Start or join a meeting</h1>
                <p className="mb-6 text-sm text-zinc-400">
                    Enter a room name to continue to the lobby.
                </p>
                <MeetingForm onSubmit={onSubmit} />
            </div>
        </div>
    );
}
