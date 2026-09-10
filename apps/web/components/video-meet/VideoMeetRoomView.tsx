"use client";

import {
    LiveKitRoom,
    RoomAudioRenderer,
    VideoConference,
} from "@livekit/components-react";
import { ArrowLeft, Info, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useMeetingStore } from "../../providers/meetingStoreProvider";
import { RecordButton } from "./RecordButton";

export function VideoMeetRoomView() {
    const router = useRouter();
    const params = useParams();
    const roomNameParam = params?.["room-name"] as string | undefined;

    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

    const {
        token,
        serverUrl,
        audioEnabled,
        videoEnabled,
        roomName,
    } = useMeetingStore(
        useShallow((state) => ({
            token: state.token,
            serverUrl: state.serverUrl,
            audioEnabled: state.audioEnabled,
            videoEnabled: state.videoEnabled,
            roomName: state.roomName,
        })),
    );
    const { reset } = useMeetingStore((state) => state.actions);

    const activeRoom = roomName || roomNameParam || "studio-live";
    const effectiveServerUrl =
        serverUrl || process.env.NEXT_PUBLIC_LIVEKIT_URL || "";

    useEffect(() => {
        if (!token || !effectiveServerUrl) {
        router.replace(
            `/video-meet/lobby?room=${encodeURIComponent(activeRoom)}`,
        );
        }
    }, [token, effectiveServerUrl, activeRoom, router]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape")
                setIsInfoDialogOpen(false);
        };
        if (isInfoDialogOpen) {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [isInfoDialogOpen]);

    const handleDisconnected = useCallback(() => {
        reset();
        router.push("/video-meet");
    }, [reset, router]);

    if (!token || !effectiveServerUrl) return null;

    return (
        <div className="h-screen w-screen bg-[#131415] text-[#F2F1ED] flex flex-col justify-between overflow-hidden select-none">
        {/* Top Minimal Chrome Bar */}
        <header className="h-12 px-6 border-b border-[#2E3033] bg-[#1A1B1D] flex items-center justify-between z-30 shrink-0">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => handleDisconnected()}
                    className="text-xs text-muted hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Leave</span>
                </button>

                <div className="h-3 w-px bg-border" />

                <div className="flex items-center gap-2">
                    <span className="font-medium text-xs text-white">
                        {activeRoom}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        LiveKit Connected
                    </span>
                </div>
            </div>

            {/* Right: Recording Controls & Info */}
            <div className="flex items-center gap-2">
                <RecordButton 
                    onStart={() => setIsInfoDialogOpen(true)}
                    
                />

                <button
                    type="button"
                    onClick={() => setIsInfoDialogOpen(true)}
                    className="p-1.5 rounded-lg text-muted hover:text-white hover:bg-[#242628] transition-colors cursor-pointer"
                    title="Recording Information"
                    aria-label="Recording Information"
                >
                    <Info className="w-4 h-4" />
                </button>
            </div>
        </header>

        {/* Main LiveKit Video Room */}
        <div className="flex-1 w-full overflow-hidden relative">
            <LiveKitRoom
                token={token}
                serverUrl={effectiveServerUrl}
                connect
                audio={audioEnabled}
                video={videoEnabled}
                onDisconnected={handleDisconnected}
                data-lk-theme="default"
                className="h-full w-full"
            >
                <VideoConference />
                <RoomAudioRenderer />
            </LiveKitRoom>
        </div>

        {/* Recording Information Dialog Modal */}
        {isInfoDialogOpen && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
                onClick={() => setIsInfoDialogOpen(false)}
            >
                <div
                    className="relative w-full max-w-md bg-[#1A1B1D] border border-[#2E3033] rounded-xl shadow-2xl p-6 text-[#F2F1ED] space-y-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#2E3033]">
                        <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-emerald-400" />
                            <h2 className="text-sm font-semibold tracking-wide">
                                Important Recording Information
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsInfoDialogOpen(false)}
                            className="p-1 rounded-md text-muted hover:text-white hover:bg-surface-hover transition-colors cursor-pointer"
                            aria-label="Close dialog"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Points Content */}
                    <div className="space-y-2">
                        <ul className="space-y-2.5 text-xs text-muted list-disc list-inside leading-relaxed">
                            <li>Keep this browser tab open and active throughout the entire recording session.</li>
                            <li>Local audio and video tracks are being captured directly from your connected devices.</li>
                            <li>Do not refresh or navigate away from the page until you click &quot;Stop Recording&quot;.</li>
                            <li>End the meeting after clicking &apos;Stop Recording&apos;.</li>
                            <li>All participant tracks will be isolated and synced for export and editing.</li>
                        </ul>
                    </div>

                    {/* Footer / Dismiss Action */}
                    <div className="pt-2 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setIsInfoDialogOpen(false)}
                            className="px-4 py-2 bg-surface-hover hover:bg-border text-xs font-medium rounded-lg text-white transition-colors cursor-pointer"
                        >
                            Understood
                        </button>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}
