"use client";

import {
    LiveKitRoom,
    RoomAudioRenderer,
    VideoConference,
} from "@livekit/components-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useMeetingStore } from "../../../providers/meetingStoreProvider";

export default function Page() {
    const router = useRouter();
    const {
        token,
        serverUrl,
        audioEnabled,
        videoEnabled,
    } = useMeetingStore(
        useShallow((state) => ({
            token: state.token,
            serverUrl: state.serverUrl,
            audioEnabled: state.audioEnabled,
            videoEnabled: state.videoEnabled,
        })),
    );
    const { reset } = useMeetingStore((state) => state.actions);

    useEffect(() => {
        if (!token || !serverUrl)
            router.replace("/video-meet");
    }, [token, serverUrl, router]);

    const handleDisconnected = useCallback(() => {
        reset();
        router.push("/video-meet");
    }, [reset, router]);

    if (!token || !serverUrl)
        return null;

    return (
        <LiveKitRoom
            token={token}
            serverUrl={serverUrl}
            connect
            audio={audioEnabled}
            video={videoEnabled}
            onDisconnected={handleDisconnected}
            data-lk-theme="default"
            className="h-dvh"
        >
            <VideoConference />
            <RoomAudioRenderer />
        </LiveKitRoom>
    );
}
