"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import { useRouter, useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useMeetingStore } from "../../../providers/meetingStoreProvider";
import Link from "next/link";
import { ArrowLeft, Film } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const roomNameParam = params?.["room-name"] as string | undefined;

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
  const effectiveServerUrl = serverUrl || process.env.NEXT_PUBLIC_LIVEKIT_URL || "";

  useEffect(() => {
    if (!token || !effectiveServerUrl) {
      router.replace(`/video-meet/lobby?room=${encodeURIComponent(activeRoom)}`);
    }
  }, [token, effectiveServerUrl, activeRoom, router]);

  const handleDisconnected = useCallback(() => {
    reset();
    router.push("/video-meet");
  }, [reset, router]);

  if (!token || !effectiveServerUrl) return null;

  return (
    <div className="h-screen w-screen bg-[#141413] text-[#F7F6F2] flex flex-col justify-between overflow-hidden select-none">
      {/* Top Minimal Chrome Bar */}
      <header className="h-12 px-6 border-b border-[#2A2926] bg-[#1A1917] flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDisconnected()}
            className="text-xs text-[#7A7870] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Leave</span>
          </button>

          <div className="h-3 w-[1px] bg-[#33322E]" />

          <div className="flex items-center gap-2">
            <span className="font-medium text-xs text-white">
              {activeRoom}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-500/20">
              LiveKit Connected
            </span>
          </div>
        </div>

        {/* Right: Quick In-Browser Editor Action */}
        <div className="flex items-center gap-3">
          <Link
            href={`/editor/${encodeURIComponent(activeRoom)}`}
            className="text-xs font-medium px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors flex items-center gap-1.5"
          >
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>Open In-Browser Editor</span>
          </Link>
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
    </div>
  );
}
