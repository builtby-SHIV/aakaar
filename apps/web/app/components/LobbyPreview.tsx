"use client";

import { usePreviewTracks } from "@livekit/components-react";
import type { LocalUserChoices } from "@livekit/components-react";
import {
    LocalAudioTrack,
    LocalVideoTrack,
    Track,
} from "livekit-client";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

interface LobbyPreviewProps {
    defaults?: Partial<LocalUserChoices>;
    onSubmit: (values: LocalUserChoices) => void;
    isJoining?: boolean;
}

export function LobbyPreview({
    defaults,
    onSubmit,
    isJoining = false,
}: LobbyPreviewProps) {
    const [username, setUsername] = useState(defaults?.username ?? "");
    const [audioEnabled, setAudioEnabled] = useState(
        defaults?.audioEnabled ?? true,
    );
    const [videoEnabled, setVideoEnabled] = useState(
        defaults?.videoEnabled ?? true,
    );

    const videoEl = useRef<HTMLVideoElement>(null);

    // Always request audio so mute/unmute never recreates the video track.
    const stableAudioOptions = useRef({});

    const trackOptions = useMemo(
        () => ({
            audio: stableAudioOptions.current,
            video: videoEnabled ? {} : false,
        }),
        [videoEnabled],
    );

    const onError = useCallback((error: Error) => {
        console.error("Failed to acquire preview media:", error);
    }, []);

    const tracks = usePreviewTracks(trackOptions, onError);

    const videoTrack = useMemo(
        () =>
            tracks?.find((track) => track.kind === Track.Kind.Video) as
                | LocalVideoTrack
                | undefined,
        [tracks],
    );

    const audioTrack = useMemo(
        () =>
            tracks?.find((track) => track.kind === Track.Kind.Audio) as
                | LocalAudioTrack
                | undefined,
        [tracks],
    );

    useEffect(() => {
        if (!audioTrack)
            return;

        if (audioEnabled)
            audioTrack.unmute();
        else
            audioTrack.mute();
    }, [audioTrack, audioEnabled]);

    useEffect(() => {
        const element = videoEl.current;
        if (!element || !videoTrack)
            return;

        videoTrack.attach(element);

        return () => {
            videoTrack.detach();
        };
    }, [videoTrack]);

    const handleJoin = () => {
        if (!username.trim() || isJoining)
            return;

        onSubmit({
            username: username.trim(),
            videoEnabled,
            audioEnabled,
            videoDeviceId: defaults?.videoDeviceId ?? "",
            audioDeviceId: defaults?.audioDeviceId ?? "",
        });
    };

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6">
            <div className="overflow-hidden rounded-xl bg-zinc-900">
                <div className="relative aspect-video w-full">
                    {videoEnabled && videoTrack ? (
                        <video
                            ref={videoEl}
                            autoPlay
                            playsInline
                            muted
                            className="h-full w-full object-cover [transform:scaleX(-1)]"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-zinc-400">
                            Camera is off
                        </div>
                    )}
                </div>
            </div>

            <label className="flex flex-col gap-2">
                <span className="text-sm text-zinc-400">Display name</span>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                    className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none focus:border-orange-500"
                />
            </label>

            <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => setAudioEnabled((enabled) => !enabled)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
                        audioEnabled
                            ? "bg-zinc-800 text-white"
                            : "bg-red-600 text-white"
                    }`}
                >
                    {audioEnabled ? (
                        <Mic className="h-4 w-4" />
                    ) : (
                        <MicOff className="h-4 w-4" />
                    )}
                    {audioEnabled ? "Mute" : "Unmute"}
                </button>

                <button
                    type="button"
                    onClick={() => setVideoEnabled((enabled) => !enabled)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
                        videoEnabled
                            ? "bg-zinc-800 text-white"
                            : "bg-red-600 text-white"
                    }`}
                >
                    {videoEnabled ? (
                        <Video className="h-4 w-4" />
                    ) : (
                        <VideoOff className="h-4 w-4" />
                    )}
                    {videoEnabled ? "Stop video" : "Start video"}
                </button>
            </div>

            <button
                type="button"
                disabled={!username.trim() || isJoining}
                onClick={handleJoin}
                className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isJoining ? "Joining..." : "Join meeting"}
            </button>
        </div>
    );
}
