"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, ArrowRight, ChevronDown, Settings2 } from "lucide-react";
import { WaveformPreview } from "./WaveformPreview";
import { useMeetingStore } from "../providers/meetingStoreProvider";

export interface UserMediaChoices {
    username: string;
    videoEnabled: boolean;
    audioEnabled: boolean;
    videoDeviceId: string;
    audioDeviceId: string;
}

export interface LobbyPreviewProps {
    defaults?: Partial<UserMediaChoices>;
    onSubmit: (values: UserMediaChoices) => void;
    isJoining?: boolean;
}

export function LobbyPreview({
    defaults,
    onSubmit,
    isJoining = false,
}: LobbyPreviewProps) {
    const [username, setUsername] = useState(defaults?.username ?? "");
    const [video, setVideo] = useState(defaults?.videoEnabled ?? true);
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedVideoId, setSelectedVideoId] = useState<string>(defaults?.videoDeviceId ?? "");
    
    const [audio, setAudio] = useState(defaults?.audioEnabled ?? true);
    const [audioLevel, setAudioLevel] = useState<number>(0);
    const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedAudioId, setSelectedAudioId] = useState<string>(defaults?.audioDeviceId ?? "");
    const [audioStreamReady, setAudioStreamReady] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoStreamRef = useRef<MediaStream | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);

    const { setAudioDeviceId, setVideoDeviceId } = useMeetingStore((state) => state.actions);

    useEffect(() => {
        async function loadDevices() {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();

                const audioinput = devices.filter((d) => d.kind === 'audioinput');
                const videoinput = devices.filter((d) => d.kind === 'videoinput');

                const seen = new Set();

                const uniquemics = audioinput.filter((d) => {
                    if (seen.has(d.deviceId))
                        return false;
                    seen.add(d.deviceId);
                    return true;
                });
                const uniquevideos = videoinput.filter((d) => {
                    if (seen.has(d.deviceId))
                        return false;
                    seen.add(d.deviceId);
                    return true;
                });

                setAudioDevices(uniquemics);
                setVideoDevices(uniquevideos);
                setVideoDeviceId(uniquevideos[0]!.deviceId!)
                console.log(uniquevideos[0]!.deviceId!)
            }

            catch (e) {
                console.log("error on enumerating devices" + e);
            }
        }
        loadDevices();
        
        navigator.mediaDevices.addEventListener('devicechange', loadDevices);
        return () => {
            navigator.mediaDevices.removeEventListener('devicechange', loadDevices);
        }
    }, []);


    const stopActiveVideoStream = useCallback(() => {
        if (videoStreamRef.current) {
            videoStreamRef.current.getTracks().forEach((track) => track.stop());
            videoStreamRef.current = null;
        }
        if (videoRef.current) {
            const stream = videoRef.current.srcObject as MediaStream | null;
            stream?.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    }, []);

    useEffect(() => {
        let isCancelled = false;

        if (!video) {
            stopActiveVideoStream();
            return;
        }

        async function initVideo() {
            try {
                const constraints: MediaStreamConstraints = {
                    video: { ...(selectedVideoId && { deviceId: { exact: selectedVideoId } }), frameRate: { ideal: 120 }},
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);

                if (isCancelled) {
                    stream.getTracks().forEach((t) => t.stop());
                    return;
                }

                stopActiveVideoStream();
                videoStreamRef.current = stream;

                if (videoRef.current)
                    videoRef.current.srcObject = stream;
            } catch (err) {
                console.error("Error accessing video device:", err);
            }
        }

        initVideo();

        return () => {
            isCancelled = true;
            stopActiveVideoStream();
        };
    }, [video, selectedVideoId, stopActiveVideoStream]);

    useEffect(() => {
        let isCancelled = false;

        async function initAudio() {
            try {
                const constraints: MediaStreamConstraints = {
                    audio: selectedAudioId
                        ? { deviceId: { exact: selectedAudioId } }
                        : true,
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);

                if (isCancelled) {
                    stream.getTracks().forEach((t) => t.stop());
                    return;
                }

                audioStreamRef.current = stream;
                stream.getAudioTracks().forEach((track) => {
                    track.enabled = audio;
                });
                setAudioStreamReady(true);
            } catch (err) {
                console.error("Error accessing audio device:", err);
            }
        }

        initAudio();

        return () => {
            isCancelled = true;
            if (audioStreamRef.current) {
                audioStreamRef.current.getTracks().forEach((t) => t.stop());
                audioStreamRef.current = null;
            }
            setAudioStreamReady(false);
        };
    }, [selectedAudioId]);

    useEffect(() => {
        if (!audioStreamRef.current) 
            return;
        audioStreamRef.current.getAudioTracks().forEach((track) => track.enabled = audio);
        if (!audio)
            setAudioLevel(0);
    }, [audio]);

    useEffect(() => {
        if (!audio || !audioStreamReady || !audioStreamRef.current) {
            setAudioLevel(0);
            return;
        }

        let audioCtx: AudioContext | null = null;
        let analyser: AnalyserNode | null = null;
        let source: MediaStreamAudioSourceNode | null = null;
        let animId: number;

        try {
            const AudioContextClass = window.AudioContext;
            audioCtx = new AudioContextClass();
            analyser = audioCtx.createAnalyser();
            analyser.fftSize = 128;
            analyser.smoothingTimeConstant = 0.3;

            source = audioCtx.createMediaStreamSource(audioStreamRef.current);
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
    }, [audio, audioStreamReady]);

    const handleJoin = () => {
        if (isJoining) return;
        const finalName =
            username.trim() || `Creator-${Math.floor(100 + Math.random() * 900)}`;

        onSubmit({
            username: finalName,
            videoEnabled: video,
            audioEnabled: audio,
            videoDeviceId: selectedVideoId || defaults?.videoDeviceId || "",
            audioDeviceId: selectedAudioId || defaults?.audioDeviceId || "",
        });
    };

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6 animate-fade text-[#F2F1ED]">
            {/* Video Preview Canvas */}
            <div 
                className="relative 
                    aspect-video 
                    w-full overflow-hidden 
                    rounded-2xl border 
                    border-[#2E3033] 
                    bg-[#131415] 
                    shadow-2xl flex 
                    items-center 
                    justify-center">
                {video ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="h-full w-full object-cover transform-[scaleX(-1)]"
                    />
                ) : (
                    <div className="text-center space-y-2 text-[#8B8D90]">
                        <div 
                            className="w-16 h-16 
                                rounded-full 
                                bg-[#1A1B1D] 
                                border 
                                border-[#2E3033] 
                                flex items-center 
                                justify-center 
                                text-[#8B8D90] 
                                mx-auto"
                            >
                            <VideoOff className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-mono">CAMERA_STREAM_MUTED</p>
                    </div>
                )}

                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-background/80 backdrop-blur-md border border-border text-foreground text-[11px] font-mono">
                        {username.trim() || "Local Participant"}
                    </span>
                </div>

                {/* Live Reactive Audio Meter on Video */}
                <div 
                    className="absolute 
                        bottom-4 right-4 
                        bg-background/80 
                        backdrop-blur-md 
                        px-3 py-1.5 
                        rounded-lg 
                        border 
                        border-border 
                        flex items-center 
                        gap-2"
                    >
                    <div className="text-[10px] font-mono text-muted">MIC</div>
                    <WaveformPreview
                        bars={18}
                        height={16}
                        activeColor={audio ? "#10B981" : "#8B8D90"}
                        inactiveColor="#2E3033"
                        progress={audio ? 1 : 0}
                        audioLevel={audio ? audioLevel : 0}
                    />
                </div>
            </div>

            {/* Hardware Toggles */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => setAudio((enabled) => !enabled)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono border transition-all cursor-pointer ${
                        audio
                            ? "border-[#2E3033] bg-[#1A1B1D] text-[#F2F1ED] hover:bg-[#242628]"
                            : "border-[#EF4444]/40 bg-[#EF4444]/15 text-[#EF4444]"
                    }`}
                >
                    {audio ? <Mic className="h-4 w-4 text-emerald-400" /> : <MicOff className="h-4 w-4" />}
                    <span>{audio ? "MUTE MIC" : "UNMUTE MIC"}</span>
                </button>

                <button
                    type="button"
                    onClick={() => setVideo((enabled) => !enabled)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono border transition-all cursor-pointer ${
                        video
                            ? "border-[#2E3033] bg-[#1A1B1D] text-[#F2F1ED] hover:bg-[#242628]"
                            : "border-[#EF4444]/40 bg-[#EF4444]/15 text-[#EF4444]"
                    }`}
                >
                    {video ? <Video className="h-4 w-4 text-emerald-400" /> : <VideoOff className="h-4 w-4" />}
                    <span>{video ? "DISABLE CAM" : "ENABLE CAM"}</span>
                </button>
            </div>

            {/* Device Selectors Card */}
            <div className="p-5 rounded-2xl border border-[#2E3033] bg-[#1A1B1D] space-y-4 shadow-xl">
                <div className="flex items-center gap-2 pb-2 border-b border-[#2E3033]">
                    <Settings2 className="w-3.5 h-3.5 text-[#FA5089]" />
                    <span className="text-xs font-mono text-[#F2F1ED] uppercase tracking-wider">Audio & Video Routing</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Camera Dropdown */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-mono text-[#8B8D90] flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <Video className="w-3 h-3 text-[#FA5089]" />
                                Camera Source
                            </span>
                            {!video && <span className="text-[10px] text-[#EF4444] font-mono">OFF</span>}
                        </label>
                        <div className="relative">
                            <select
                                value={selectedVideoId}
                                onChange={(e) => {
                                    setSelectedVideoId(e.target.value);
                                    setVideoDeviceId(e.target.value);
                                    console.log(e.target.value)
                                }}
                                disabled={!video}
                                className="w-full 
                                    appearance-none 
                                    px-3 py-2 pr-8 
                                    bg-background 
                                    border 
                                    border-border 
                                    rounded-lg text-xs 
                                    text-foreground 
                                    font-mono
                                    outline-none 
                                    focus:border-[#FA5089] 
                                    transition-colors 
                                    cursor-pointer 
                                    disabled:opacity-40 
                                    disabled:cursor-not-allowed"
                            >
                                {videoDevices.length === 0 ? (
                                    <option value="">Default Camera</option>
                                ) : (
                                    videoDevices.map((d, i) => (
                                        <option key={d.deviceId || i} value={d.deviceId}>
                                            {d.label || `Camera ${i + 1}`}
                                        </option>
                                    ))
                                )}
                            </select>
                            <ChevronDown 
                                className="w-3.5 h-3.5 
                                    text-[#8B8D90] 
                                    absolute right-2.5 
                                    top-1/2 
                                    -translate-y-1/2 
                                    pointer-events-none" 
                                />
                        </div>
                    </div>

                    {/* Microphone Dropdown */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-mono text-[#8B8D90] flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <Mic className="w-3 h-3 text-[#FA5089]" />
                                Microphone (48kHz)
                            </span>
                            {!audio && <span className="text-[10px] text-[#EF4444] font-mono">MUTED</span>}
                        </label>
                        <div className="relative">
                            <select
                                value={selectedAudioId}
                                onChange={(e) => {
                                    setSelectedAudioId(e.target.value);
                                    setAudioDeviceId(e.target.value);
                                }}
                                disabled={!audio}
                                className="w-full 
                                    appearance-none 
                                    px-3 py-2 pr-8 
                                    bg-[#131415] 
                                    border 
                                    border-[#2E3033] 
                                    rounded-lg 
                                    text-xs 
                                    text-[#F2F1ED] 
                                    font-mono
                                    outline-none 
                                    focus:border-[#FA5089] 
                                    transition-colors 
                                    cursor-pointer 
                                    disabled:opacity-40 
                                    disabled:cursor-not-allowed"
                            >
                                {audioDevices.length === 0 ? (
                                    <option value="">Default Microphone</option>
                                ) : (
                                    audioDevices.map((d, i) => (
                                        <option key={d.deviceId || i} value={d.deviceId}>
                                            {d.label || `Microphone ${i + 1}`}
                                        </option>
                                    ))
                                )}
                            </select>
                            <ChevronDown 
                            className="w-3.5 h-3.5 
                                text-[#8B8D90] 
                                absolute 
                                right-2.5 top-1/2 
                                -translate-y-1/2 
                                pointer-events-none" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Name Input & Submit Card */}
            <div className="p-6 rounded-2xl border border-[#2E3033] bg-[#1A1B1D] space-y-4 shadow-xl">
                <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8B8D90] flex items-center justify-between">
                        <span>CREATOR_CALLSIGN</span>
                        <span className="text-[10px] text-[#8B8D90]">
                            Visible to all studio peers
                        </span>
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. Alex Rivers"
                        autoFocus
                        className="w-full px-3.5 py-2.5 bg-[#131415] border border-[#2E3033] rounded-lg text-sm text-[#F2F1ED] font-mono placeholder:text-[#8B8D90]/50 outline-none focus:border-[#FA5089] transition-colors"
                    />
                </div>

                <button
                    type="button"
                    disabled={isJoining}
                    onClick={handleJoin}
                    className="w-full py-3.5 bg-[#FA5089] hover:bg-[#E03F74] text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm shadow-[#FA5089]/20 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                    {isJoining ? (
                        <div className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span className="font-mono">INITIALIZING_PEER_CONNECTION...</span>
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
