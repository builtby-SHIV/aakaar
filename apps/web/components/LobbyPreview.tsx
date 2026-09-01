"use client";

import { usePreviewTracks } from "@livekit/components-react";
import type { LocalUserChoices } from "@livekit/components-react";
import {
  LocalAudioTrack,
  LocalVideoTrack,
  Track,
} from "livekit-client";
import { Mic, MicOff, Video, VideoOff, ArrowRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WaveformPreview } from "./WaveformPreview";

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
  const [audioLevel, setAudioLevel] = useState<number>(0);

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
    if (!audioTrack) return;

    if (audioEnabled) audioTrack.unmute();
    else audioTrack.mute();
  }, [audioTrack, audioEnabled]);

  useEffect(() => {
    const element = videoEl.current;
    if (!element || !videoTrack) return;

    videoTrack.attach(element);

    return () => {
      videoTrack.detach();
    };
  }, [videoTrack]);

  // Real-time Web Audio Analyser measuring live microphone volume
  useEffect(() => {
    if (!audioTrack || !audioEnabled || !audioTrack.mediaStreamTrack) {
      setAudioLevel(0);
      return;
    }

    let audioCtx: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let animId: number;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.3;

      const stream = new MediaStream([audioTrack.mediaStreamTrack]);
      source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateLevel = () => {
        if (!analyser) return;
        analyser.getByteFrequencyData(dataArray);
        
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i] ?? 0;
        }
        const average = sum / dataArray.length;
        const normalized = Math.min(1, Math.max(0, (average / 128) * 1.8));
        
        setAudioLevel(normalized);
        animId = requestAnimationFrame(updateLevel);
      };

      updateLevel();
    } catch (e) {
      console.warn("Real-time audio meter init error:", e);
    }

    return () => {
      cancelAnimationFrame(animId);
      source?.disconnect();
      analyser?.disconnect();
      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close().catch(() => {});
      }
    };
  }, [audioTrack, audioEnabled]);

  const handleJoin = () => {
    if (isJoining) return;
    const finalName = username.trim() || `Creator-${Math.floor(100 + Math.random() * 900)}`;

    onSubmit({
      username: finalName,
      videoEnabled,
      audioEnabled,
      videoDeviceId: defaults?.videoDeviceId ?? "",
      audioDeviceId: defaults?.audioDeviceId ?? "",
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6 animate-kanso-fade">
      {/* Video Preview Canvas */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#33322E] bg-[#1A1917] shadow-xl flex items-center justify-center">
        {videoEnabled && videoTrack ? (
          <video
            ref={videoEl}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover [transform:scaleX(-1)]"
          />
        ) : (
          <div className="text-center space-y-2 text-stone-400">
            <div className="w-16 h-16 rounded-full bg-[#22211E] border border-[#33322E] flex items-center justify-center text-stone-500 mx-auto">
              <VideoOff className="w-6 h-6" />
            </div>
            <p className="text-xs font-mono">Camera is turned off</p>
          </div>
        )}

        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-[#141413]/70 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono">
            {username.trim() || "Preview Participant"}
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded">
            1080p Local Ready
          </span>
        </div>

        {/* Live Reactive Audio Meter on Video */}
        <div className="absolute bottom-4 right-4 bg-[#141413]/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
          <div className="text-[10px] font-mono text-stone-400">MIC</div>
          <WaveformPreview
            bars={18}
            height={16}
            activeColor={audioEnabled ? "#2B7A4B" : "#A3A199"}
            inactiveColor="#44423C"
            progress={audioEnabled ? 1 : 0}
            audioLevel={audioEnabled ? audioLevel : 0}
          />
        </div>
      </div>

      {/* Hardware Toggles */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setAudioEnabled((enabled) => !enabled)}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium border transition-all ${
            audioEnabled
              ? "border-[#E5E3DC] bg-[#FFFFFF] text-[#141413] hover:bg-[#F2F0EB] shadow-2xs"
              : "border-[#E53E3E] bg-[#FFF1F0] text-[#E53E3E]"
          }`}
        >
          {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          <span>{audioEnabled ? "Mute Microphone" : "Unmute Microphone"}</span>
        </button>

        <button
          type="button"
          onClick={() => setVideoEnabled((enabled) => !enabled)}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium border transition-all ${
            videoEnabled
              ? "border-[#E5E3DC] bg-[#FFFFFF] text-[#141413] hover:bg-[#F2F0EB] shadow-2xs"
              : "border-[#E53E3E] bg-[#FFF1F0] text-[#E53E3E]"
          }`}
        >
          {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          <span>{videoEnabled ? "Turn Camera Off" : "Turn Camera On"}</span>
        </button>
      </div>

      {/* Display Name Input & Submit Card */}
      <div className="p-6 rounded-2xl border border-[#E5E3DC] bg-[#FFFFFF] space-y-4 shadow-sm">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#141413] flex items-center justify-between">
            <span>Your Display Name</span>
            <span className="text-[10px] font-mono text-[#7A7870]">Visible to all participants</span>
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. Alex Rivers"
            autoFocus
            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E5E3DC] rounded-lg text-sm text-[#141413] placeholder:text-[#A3A199] outline-none focus:border-[#141413] transition-colors"
          />
        </div>

        <button
          type="button"
          disabled={isJoining}
          onClick={handleJoin}
          className="w-full py-3.5 bg-[#141413] text-[#F7F6F2] font-medium text-xs rounded-lg hover:bg-[#2B2A27] transition-all flex items-center justify-center gap-2 shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isJoining ? (
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Connecting to Studio Room...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Enter Live Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
