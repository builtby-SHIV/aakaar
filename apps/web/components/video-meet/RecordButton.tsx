"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Circle, Square } from "lucide-react";
import { useMeetingStore } from "../../providers/meetingStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { useTRPC } from "../../trpc/client";
import { useMutation } from "@tanstack/react-query";
import { ExternalServiceError } from "@repo/lib/errors";
import { openDB, type IDBPDatabase } from "idb";
import { useSession } from "next-auth/react";
import { db, videoChunks, videos } from "@repo/database";
import { withDb } from "@repo/lib/safe-db";

export interface RecordButtonProps {
    onStart?: () => void;
    onStop?: () => void;
    projectId: number;
}

export function RecordButton({ onStart, onStop, projectId }: RecordButtonProps) {
    const trpc = useTRPC();
    const { data: session } = useSession();
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setmediaRecorder] = useState<MediaRecorder | null>(null);
    const chunkIndex = useRef<number>(0);
    const idb = useRef<IDBPDatabase | null>(null);
    const videoId = useRef<number | null>(null);

    const { audioDeviceId, videoDeviceId, projectName } = useMeetingStore(useShallow((state) => ({ 
        audioDeviceId: state.audioDeviceId, 
        videoDeviceId: state.videoDeviceId,
        projectName: state.projectName
    })));

    const uploadUrl = useMutation(
        trpc
            .recording
            .getUploadUrl
            .mutationOptions()
    );
    const createVideo = useMutation(
        trpc
            .video
            .createVideo
            .mutationOptions({
                onSuccess: (data: { id?: number | undefined }) => {
                    if (data.id)
                        videoId.current = data.id;
                }
            })
    );
    
    const getUploadUrl = useCallback(async (e: BlobEvent, chunkIndex: number) => {
        try {
            const url = await uploadUrl.mutateAsync({
                userId: session?.user?.id || "",
                projectName,
                chunkIndex,
                mimeType: e.data.type
            });
            return url;
        }
        catch(e) {
            console.error("Upload URL generation failed" + e);
        }
    }, [projectName, session?.user?.id, uploadUrl]);

    const retryUpload = useCallback(async (e: BlobEvent, chunkIndex: number, retriesLeft = 5) => {
        const data = await getUploadUrl(e, chunkIndex);
        if (!data)
            throw new ExternalServiceError("Cloudflare", {
                    clientMessage: "Recording cannot be done. Please try again later"
                });

        try {
            const res = await fetch(data.uploadUrl, { 
                method: 'PUT', 
                body: e.data, 
                headers: { 
                    'Content-Length': e.data.size.toString() 
                }});

            if (!res.ok)
                console.error("Failure during upload process of chunk", e.data, chunkIndex);
        }
        catch(err) {
            if (retriesLeft > 0)
                return retryUpload(e, chunkIndex, retriesLeft - 1);
            if (idb.current)
                await idb.current.put("LeftOverChunks", { e, projectId: projectId }, chunkIndex);
        }
    }, [getUploadUrl, projectId]);
        
    const startRecordingAndUploading = useCallback(() => {
        if (mediaRecorder) {
            mediaRecorder.start(120000);
            mediaRecorder.ondataavailable = async (e: BlobEvent) => {
                if (e.data.size <= 0)
                    return;

                const currIndex = chunkIndex.current++;

                const data = await getUploadUrl(e, currIndex);
                if (!data)
                    throw new ExternalServiceError("Cloudflare", {
                            clientMessage: "Recording cannot be done. Please try again later"
                        });

                try {
                    const res = await fetch(data.uploadUrl, { 
                        method: 'PUT', 
                        body: e.data, 
                        headers: { 
                            'Content-Length': e.data.size.toString() 
                    }});

                    if (res.ok)
                        await withDb(() =>
                            db
                            .insert(videoChunks)
                            .values({
                                videoId: projectId,
                                chunkIndex: currIndex,
                                r2Key: data.r2Key,
                                byteSize: e.data.size
                            })
                        )

                    else if (!res.ok || res.status === 400 || res.status === 403)
                    {
                        console.error("Failure during upload process of chunk. Retrying the process", e.data, currIndex);
                        await retryUpload(e, currIndex);
                    }

                    else if (projectId === null)
                        throw new ExternalServiceError("PgSQL", {
                            clientMessage: "Recording cannot be done. Please try again later"
                        });

                }
                catch(e) {
                    console.error(e)
                    throw new ExternalServiceError("Cloudflare", {
                        clientMessage: "Recording cannot be done. Please try again later"
                    });
                }
            }
        }
    }, [mediaRecorder, getUploadUrl, projectId, retryUpload]);

    const handleToggleRecording = async () => {
        if (!isRecording) {
            setIsRecording(true);
            onStart?.();

            try {
                startRecordingAndUploading();
            } catch (error) {
                console.error("Failed to start recording:", error);
                setIsRecording(false);
            }
        } else {
            setIsRecording(false);
            onStop?.();

            // Add stop recording logic here
        }
    };

    useEffect(() => {
        const initDB = async () => {
        const db = await openDB("ChunksStore", 1, {
            upgrade(db) {
            if (!db.objectStoreNames.contains("LeftOverChunks")) 
                db.createObjectStore("LeftOverChunks");
            },
        })
        idb.current = db;
    };

        initDB();
    }, []);

    useEffect(() => {
        async function configureRecording() {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 3840 }, height: { ideal: 2160 }, deviceId: { exact: videoDeviceId } },
                audio: { deviceId: { exact: audioDeviceId } }
            });

            const mimeTypes = [
                'video/webm;codecs=av1,opus',       // Next-gen (High Res / Highly Efficient)
                'video/mp4;codecs=hvc1,mp4a.40.2',  // HEVC / H.265 (Excellent 4K for Safari/Apple)
                'video/webm;codecs=vp9,opus',      // VP9 (Great 4K for Chrome/Firefox)
                'video/webm;codecs=h264,opus',     // H.264 WebM (High Compatibility)
                'video/mp4;codecs=avc1.4d401f,mp4a.40.2', // Universal H.264 MP4 (Fallback)
            ];

            let selectedMime = '';
            for ( const mime of mimeTypes ) {
                if (MediaRecorder.isTypeSupported(mime)) {
                    selectedMime = mime;
                    break;
                }
            }

            const options = selectedMime ? { 
                mimeType: selectedMime, 
                audioBitsPerSecond: 128000, 
                videoBitsPerSecond: 5000000, 
            } : 
            { 
                audioBitsPerSecond: 128000, 
                videoBitsPerSecond: 5000000, 
            };
            const mediaRecorder = new MediaRecorder(stream, options);
            setmediaRecorder(mediaRecorder);
            
            console.log(`Recording started using: ${selectedMime || 'Browser Default'}`);

            try {
                await createVideo.mutateAsync({
                    name: `${session?.user?.name}/${projectName}/${Date.now()}`,
                    projectId,
                    status: 'recording',
                    expectedChunks: 0
                });
            }
            catch(e) {
                console.error("Create video mutation failed" + e);
            }

        }
        configureRecording();

    }, [audioDeviceId, createVideo, projectId, projectName, session?.user?.name, videoDeviceId]);

    return (
        <button
            type="button"
            onClick={handleToggleRecording}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isRecording
                    ? "bg-red-950/60 text-red-200 hover:bg-red-900/60 border border-red-500/30"
                    : "bg-surface-hover text-foreground hover:bg-border border border-border-strong"
            }`}
        >
            {isRecording ? (
                <>
                    <Square className="w-2.5 h-2.5 fill-red-400 text-red-400" />
                    <span>Stop Recording</span>
                </>
            ) : (
                <>
                    <Circle className="w-2.5 h-2.5 fill-red-500 text-red-500" />
                    <span>Start Recording</span>
                </>
            )}
        </button>
    );
}
