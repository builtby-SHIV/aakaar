"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { LobbyPreview, type UserMediaChoices } from "../LobbyPreview";
import { useMeetingStore } from "../../providers/meetingStoreProvider";
import { useTRPC } from "../../trpc/client";
import { handleTRPCError } from "../../lib/handle-error";

export function VideoMeetLobbyView() {
    const router = useRouter();
    const { data: session, status } = useSession();
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
        setProjectName,
        setParticipantName,
        setMediaPreferences,
    } = useMeetingStore((state) => state.actions);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const effectiveRoom = (roomName || roomFromQuery).trim();
    const numericProjectId = Number(effectiveRoom);
    const isValidProjectId = !isNaN(numericProjectId) && numericProjectId > 0;

    // 1. Auth check: user must be logged in
    useEffect(() => {
        if (status === "unauthenticated") {
            const callbackUrl = encodeURIComponent(
                effectiveRoom ? `/video-meet/lobby?room=${effectiveRoom}` : "/dashboard"
            );
            router.replace(`/login?callbackUrl=${callbackUrl}`);
        }
    }, [status, effectiveRoom, router]);

    // 2. If user accesses /video-meet/lobby without a valid project id, reroute to /dashboard
    useEffect(() => {
        if (status !== "loading" && (!effectiveRoom || !isValidProjectId))
            router.replace("/dashboard");
    }, [effectiveRoom, isValidProjectId, router, status]);

    // 3. Keep store in sync with room query parameter
    useEffect(() => {
        if (!roomName && roomFromQuery) {
            setRoomName(roomFromQuery);
        }
    }, [roomName, roomFromQuery, setRoomName]);

    // 4. Fetch project details to verify and set project name
    const projectQuery = useQuery({
        ...trpc.project.getById.queryOptions({
            projectId: isValidProjectId ? numericProjectId : 0,
        }),
        enabled: isValidProjectId && status === "authenticated",
    });

    useEffect(() => {
        if (projectQuery.data?.name)
            setProjectName(projectQuery.data.name);
    }, [projectQuery.data?.name, setProjectName]);

    const joinMeetingMutation = useMutation(
        trpc.project.joinMeeting.mutationOptions()
    );

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

    const handleJoin = async (values: UserMediaChoices) => {
        if (!effectiveRoom || !isValidProjectId) {
            router.replace("/dashboard");
            return;
        }

        setErrorMessage(null);

        try {
            // Register user as participant in project_participants
            const joinedProject = await joinMeetingMutation.mutateAsync({
                projectId: numericProjectId,
            });

            if (joinedProject?.name)
                setProjectName(joinedProject.name);

            setMediaPreferences(values.audioEnabled, values.videoEnabled);
            (getToken.mutate as any)({
                roomName: effectiveRoom,
                participantName: values.username || session?.user?.name || "Participant",
            });
        } catch (error: any) {
            const parsed = handleTRPCError(error);
            console.error("Failed to join project meeting:", parsed);
            setErrorMessage(parsed.message);
        }
    };

    if (status === "loading" || !effectiveRoom || !isValidProjectId)
        return null;

    return (
        <div className="min-h-screen bg-[#131415] text-[#F2F1ED] py-12">
            {projectQuery.data?.name && (
                <div className="max-w-2xl mx-auto mb-4 text-center">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#FA5089]">
                        PROJECT SESSION
                    </span>
                    <h2 className="text-xl font-bold font-sans text-white mt-0.5">
                        {projectQuery.data.name}
                    </h2>
                </div>
            )}
            {errorMessage && (
                <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444] font-mono text-center">
                    {errorMessage}
                </div>
            )}
            <LobbyPreview
                onSubmit={handleJoin}
                isJoining={getToken.isPending || joinMeetingMutation.isPending}
                defaults={{
                    username: session?.user?.name ?? "",
                    videoEnabled: true,
                    audioEnabled: true,
                }}
            />
        </div>
    );
}
