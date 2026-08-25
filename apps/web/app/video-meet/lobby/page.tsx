"use client";

import type { LocalUserChoices } from "@livekit/components-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { LobbyPreview } from "../../components/LobbyPreview";
import { useTRPC } from "../../../lib/trpc";
import { useMeetingStore } from "../../../providers/meetingStoreProvider";

export default function Page() {
    const router = useRouter();
    const trpc = useTRPC();
    const { roomName } = useMeetingStore(
        useShallow((state) => ({ roomName: state.roomName })),
    );
    const {
        setToken,
        setServerUrl,
        setParticipantName,
        setMediaPreferences,
    } = useMeetingStore((state) => state.actions);

    useEffect(() => {
        if (!roomName) {
            router.replace("/video-meet");
        }
    }, [roomName, router]);

    const getToken = useMutation(
        trpc.meeting.getToken.mutationOptions({
            onSuccess: (data, variables) => {
                setToken(data.token);
                setServerUrl(data.serverUrl);
                setParticipantName(variables.participantName);
                router.push(`/video-meet/${encodeURIComponent(roomName)}`);
            },
        }),
    );

    const handleSubmit = (values: LocalUserChoices) => {
        setMediaPreferences(values.audioEnabled, values.videoEnabled);
        getToken.mutate({
            roomName,
            participantName: values.username,
        });
    };

    if (!roomName)
        return null;

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="border-b border-zinc-800 px-6 py-4">
                <h1 className="text-lg font-semibold">Join {roomName}</h1>
                <p className="text-sm text-zinc-400">
                    Check your camera and microphone before joining.
                </p>
            </div>
            <LobbyPreview
                onSubmit={handleSubmit}
                isJoining={getToken.isPending}
                defaults={{
                    username: "",
                    videoEnabled: true,
                    audioEnabled: true,
                }}
            />
        </div>
    );
}
