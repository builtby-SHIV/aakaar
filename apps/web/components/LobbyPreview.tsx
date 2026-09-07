"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, ArrowRight, ChevronDown, Settings2 } from "lucide-react";
import { WaveformPreview } from "./WaveformPreview";

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
    const [audio, setAudio] = useState(defaults?.audioEnabled ?? true);
    const [audioLevel, setAudioLevel] = useState<number>(0);

    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedVideoId, setSelectedVideoId] = useState<string>(defaults?.videoDeviceId ?? "");
    const [selectedAudioId, setSelectedAudioId] = useState<string>(defaults?.audioDeviceId ?? "");

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

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoStreamRef = useRef<MediaStream | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const [audioStreamReady, setAudioStreamReady] = useState(false);

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
                    video: selectedVideoId ? { deviceId: { exact: selectedVideoId } } : true,
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
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6 animate-kanso-fade">
            {/* Video Preview Canvas */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#33322E] bg-[#1A1917] shadow-xl flex items-center justify-center">
                {video ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="h-full w-full object-cover transform-[scaleX(-1)]"
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
                </div>

                {/* Live Reactive Audio Meter on Video */}
                <div className="absolute bottom-4 right-4 bg-[#141413]/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                    <div className="text-[10px] font-mono text-stone-400">MIC</div>
                    <WaveformPreview
                        bars={18}
                        height={16}
                        activeColor={audio ? "#2B7A4B" : "#A3A199"}
                        inactiveColor="#44423C"
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
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium border transition-all cursor-pointer ${
                        audio
                            ? "border-border bg-surface text-[#141413] hover:bg-surface-hover shadow-2xs"
                            : "border-rec bg-rec-subtle text-rec"
                    }`}
                >
                    {audio ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    <span>{audio ? "Mute Microphone" : "Unmute Microphone"}</span>
                </button>

                <button
                    type="button"
                    onClick={() => setVideo((enabled) => !enabled)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium border transition-all cursor-pointer ${
                        video
                            ? "border-border bg-surface text-[#141413] hover:bg-surface-hover shadow-2xs"
                            : "border-rec bg-rec-subtle text-rec"
                    }`}
                >
                    {video ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    <span>{video ? "Turn Camera Off" : "Turn Camera On"}</span>
                </button>
            </div>

            {/* Device Selectors Card */}
            <div className="p-5 rounded-2xl border border-border bg-surface space-y-4 shadow-sm">
                <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                    <Settings2 className="w-3.5 h-3.5 text-stone-500" />
                    <span className="text-xs font-medium text-[#141413]">Audio & Video Devices</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Camera Dropdown */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-stone-600 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <Video className="w-3 h-3 text-stone-400" />
                                Camera
                            </span>
                            {!video && <span className="text-[10px] text-rec font-mono">Off</span>}
                        </label>
                        <div className="relative">
                            <select
                                value={selectedVideoId}
                                onChange={(e) => setSelectedVideoId(e.target.value)}
                                disabled={!video}
                                className="w-full appearance-none px-3 py-2 pr-8 bg-[#FAF9F6] border border-border rounded-lg text-xs text-[#141413] outline-none focus:border-[#141413] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
                            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Microphone Dropdown */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-stone-600 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <Mic className="w-3 h-3 text-stone-400" />
                                Microphone
                            </span>
                            {!audio && <span className="text-[10px] text-rec font-mono">Muted</span>}
                        </label>
                        <div className="relative">
                            <select
                                value={selectedAudioId}
                                onChange={(e) => setSelectedAudioId(e.target.value)}
                                disabled={!audio}
                                className="w-full appearance-none px-3 py-2 pr-8 bg-[#FAF9F6] border border-border rounded-lg text-xs text-[#141413] outline-none focus:border-[#141413] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
                            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Name Input & Submit Card */}
            <div className="p-6 rounded-2xl border border-border bg-surface space-y-4 shadow-sm">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#141413] flex items-center justify-between">
                        <span>Your Display Name</span>
                        <span className="text-[10px] font-mono text-muted">
                            Visible to all participants
                        </span>
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. Alex Rivers"
                        autoFocus
                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-border rounded-lg text-sm text-[#141413] placeholder:text-muted-light outline-none focus:border-[#141413] transition-colors"
                    />
                </div>

                <button
                    type="button"
                    disabled={isJoining}
                    onClick={handleJoin}
                    className="w-full py-3.5 bg-[#141413] text-[#F7F6F2] font-medium text-xs rounded-lg hover:bg-[#2B2A27] transition-all flex items-center justify-center gap-2 shadow-sm disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
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
