"use client";

import type { LocalUserChoices } from "@livekit/components-react";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { LobbyPreview } from "../LobbyPreview";
import { Logo } from "../Logo";
import { useMeetingStore } from "../../providers/meetingStoreProvider";
import { useTRPC } from "../../trpc/trpc";

export function VideoMeetLobbyView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomFromQuery = searchParams.get("room") || "";

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

  const effectiveRoom = roomName || roomFromQuery;

  useEffect(() => {
    if (!roomName && roomFromQuery) {
      setRoomName(roomFromQuery);
    }
  }, [roomName, roomFromQuery, setRoomName]);

  useEffect(() => {
    if (!effectiveRoom) {
      router.replace("/video-meet");
    }
  }, [effectiveRoom, router]);

  const getToken = useMutation(
    trpc.meeting.getToken.mutationOptions({
      onSuccess: (data: any, variables: any) => {
        const effectiveServerUrl =
          data.serverUrl || process.env.NEXT_PUBLIC_LIVEKIT_URL || "";
        setToken(data.token);
        setServerUrl(effectiveServerUrl);
        setParticipantName(variables.participantName);
        const targetRoom = effectiveRoom || "studio-live";
        router.push(`/video-meet/${encodeURIComponent(targetRoom)}`);
      },
      onError: (error: any) => {
        console.error("Token acquisition failed:", error);
        setErrorMessage(
          error.message ||
            "Unable to acquire LiveKit token. Make sure the http-server is running on port 3001.",
        );
      },
    }),
  );

  const handleSubmit = (values: LocalUserChoices) => {
    setErrorMessage(null);
    setMediaPreferences(values.audioEnabled, values.videoEnabled);
    const targetRoom = effectiveRoom || "studio-live";
    (getToken.mutate as any)({
      roomName: targetRoom,
      participantName: values.username,
    });
  };

  if (!effectiveRoom) return null;

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#141413] flex flex-col justify-between p-6">
      {/* Top Header */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between pb-4 border-b border-[#E5E3DC]">
        <Logo size="md" href="/" />

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-[#7A7870] hidden sm:inline">
            Room:{" "}
            <span className="text-[#141413] font-medium">{effectiveRoom}</span>
          </span>
          <Link
            href="/video-meet"
            className="text-xs text-muted hover:text-[#141413] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Room</span>
          </Link>
        </div>
      </header>

      {/* Main Lobby Viewport */}
      <main className="max-w-2xl w-full mx-auto my-auto space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] uppercase tracking-widest font-mono text-[#7A7870]">
            Pre-flight Studio Check
          </span>
          <h1 className="text-3xl font-serif font-normal tracking-tight text-[#141413]">
            Join &ldquo;{effectiveRoom}&rdquo;
          </h1>
          <p className="text-xs text-[#7A7870]">
            Check your camera and microphone levels before joining the live
            session.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-[#FFF1F0] border border-[#E53E3E] text-xs text-[#E53E3E] font-mono text-center">
            {errorMessage}
          </div>
        )}

        <LobbyPreview
          onSubmit={handleSubmit}
          isJoining={getToken.isPending}
          defaults={{
            username: "",
            videoEnabled: true,
            audioEnabled: true,
          }}
        />
      </main>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto text-center text-xs text-[#7A7870] font-mono">
        Aakaar Kanso Studio · End-to-End Multitrack Isolation
      </footer>
    </div>
  );
}
