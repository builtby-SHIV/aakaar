import type { Metadata } from "next";
import { Suspense } from "react";
import { VideoMeetLobbyView } from "../../../components/video-meet";

export const metadata: Metadata = {
    title: "Studio Lobby | Aakaar",
    description: "Check your camera and microphone levels before joining the live session.",
};

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F7F6F2]" />}>
            <VideoMeetLobbyView />
        </Suspense>
    );
}
