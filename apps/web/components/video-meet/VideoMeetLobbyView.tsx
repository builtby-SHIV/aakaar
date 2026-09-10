"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { LobbyPreview, type UserMediaChoices } from "../LobbyPreview";
import { useMeetingStore } from "../../providers/meetingStoreProvider";
import { useTRPC } from "../../trpc/client";
import { handleTRPCError } from "../../lib/handle-error";

export function VideoMeetLobbyView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const roomFromQuery = searchParams.get("room")?.trim() || "";

    const trpc = useTRPC();
    const { roomName } = useMeetingStore(
        useShallow((state) => ({ roomName: state.roomName })),
    );
    const {
        setToken,
        setServerUrl,
        setRoomName,
        setParticipantName,
        setMediaPreferences,
    } = useMeetingStore((state) => state.actions);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const effectiveRoom = (roomName || roomFromQuery).trim();

    // If user accesses /video-meet/lobby without a room name, reroute to /video-meet
    useEffect(() => {
        if (!effectiveRoom) {
            router.replace("/video-meet");
        }
    }, [effectiveRoom, router]);

    // Keep store in sync with room query parameter
    useEffect(() => {
        if (!roomName && roomFromQuery) {
            setRoomName(roomFromQuery);
        }
    }, [roomName, roomFromQuery, setRoomName]);

    const getToken = useMutation(
        trpc.meeting.getToken.mutationOptions({
            onSuccess: (data: any, variables: any) => {
                const effectiveServerUrl =
                    data.serverUrl || process.env.NEXT_PUBLIC_LIVEKIT_URL || "";
                setToken(data.token);
                setServerUrl(effectiveServerUrl);
                setParticipantName(variables.participantName);
                setRoomName(effectiveRoom);
                router.push(`/video-meet/${encodeURIComponent(effectiveRoom)}`);
            },
            onError: (error: any) => {
                const parsed = handleTRPCError(error);
                console.error("Token acquisition failed:", parsed);
                setErrorMessage(parsed.message);
            },
        }),
    );

    const handleJoin = (values: UserMediaChoices) => {
        if (!effectiveRoom) {
            router.replace("/video-meet");
            return;
        }

        setErrorMessage(null);
        setMediaPreferences(values.audioEnabled, values.videoEnabled);
        (getToken.mutate as any)({
            roomName: effectiveRoom,
            participantName: values.username,
        });
    };

    if (!effectiveRoom) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#131415] text-[#F2F1ED] py-12">
            {errorMessage && (
                <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444] font-mono text-center">
                    {errorMessage}
                </div>
            )}
            <LobbyPreview
                onSubmit={handleJoin}
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
