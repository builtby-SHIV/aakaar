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
import { useLocalParticipant } from "@livekit/components-react";
import { Track } from "livekit-client";

export interface RecordButtonProps {
    onStart?: () => void;
    onStop?: () => void;
    projectId: number;
}

export function RecordButton({ onStart, onStop, projectId }: RecordButtonProps) {
    const trpc = useTRPC();
    const { data: session } = useSession();
    const [isRecording, setIsRecording] = useState(false);
    const chunkIndex = useRef<number>(0);
    const idb = useRef<IDBPDatabase | null>(null);
    const videoId = useRef<number | null>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const { localParticipant } = useLocalParticipant();

    const { projectName } = useMeetingStore(useShallow((state) => ({ 
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
    const addChunk = useMutation(
        trpc
            .videoChunk
            .createChunk
            .mutationOptions()
    );
    
    const getUploadUrl = useCallback(async (e: BlobEvent, chunkIndex: number) => {
        console.log({userId: session?.user?.id || "",
            projectName,
            chunkIndex,
            mimeType: e.data.type})
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
        if (mediaRecorder.current) {
            mediaRecorder.current.start(10000);
            mediaRecorder.current.ondataavailable = async (e: BlobEvent) => {
                if (e.data.size <= 0)
                    return;

                const currIndex = chunkIndex.current++;

                const data = await getUploadUrl(e, currIndex);
                console.log(data);
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
                        addChunk.mutate({
                            videoId: videoId.current!,
                            chunkIndex: currIndex,
                            r2Key: data.r2Key,
                            byteSize: e.data.size
                        })

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
    }, [mediaRecorder, getUploadUrl, addChunk, projectId, retryUpload]);

    const handleToggleRecording = async () => {
        if (!isRecording) {
            setIsRecording(true);
            onStart?.();
            
            try {
                console.log("configuring recording");
                await configureRecording();
                startRecordingAndUploading();
            } catch (error) {
                console.error("Failed to start recording:", error);
                setIsRecording(false);
            }
        } else {
            setIsRecording(false);
            onStop?.();

            if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
                // Request the final chunk and stop the recorder
                mediaRecorder.current.requestData();
                mediaRecorder.current.stop();
                mediaRecorder.current = null;
                chunkIndex.current = 0;
            }
        }
    };

    const configureRecording = useCallback(async () => {
        // Get the raw MediaStreamTracks from LiveKit's local participant.
        // These are the same hardware tracks LiveKit is already using,
        // so no new getUserMedia call is needed (avoids OverConstrained).
        const videoTrack = localParticipant
            .getTrackPublication(Track.Source.Camera)
            ?.track?.mediaStreamTrack;
        const audioTrack = localParticipant
            .getTrackPublication(Track.Source.Microphone)
            ?.track?.mediaStreamTrack;

        if (!videoTrack) {
            console.error("Camera track not available from LiveKit");
            return;
        }

        // Combine into a single MediaStream for the MediaRecorder
        const tracksToRecord: MediaStreamTrack[] = [videoTrack];
        if (audioTrack) tracksToRecord.push(audioTrack);
        const combinedStream = new MediaStream(tracksToRecord);

        // Pick the best supported codec
        const mimeTypes = [
            'video/webm;codecs=av1,opus',
            'video/mp4;codecs=hvc1,mp4a.40.2',
            'video/webm;codecs=vp9,opus',
            'video/webm;codecs=h264,opus',
            'video/mp4;codecs=avc1.4d401f,mp4a.40.2',
        ];

        let selectedMime = '';
        for (const mime of mimeTypes)
            if (MediaRecorder.isTypeSupported(mime)) {
                selectedMime = mime;
                break;
            }

        const recorderOptions: MediaRecorderOptions = {
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 5000000,
            ...(selectedMime ? { mimeType: selectedMime } : {}),
        };

        try {
            mediaRecorder.current = new MediaRecorder(combinedStream, recorderOptions);
        } catch (err) {
            console.error("Failed to initialize MediaRecorder:", err);
            return;
        }

        console.log(`Recording configured using: ${selectedMime || 'Browser Default'}`);

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

    }, [localParticipant, createVideo, projectId, projectName, session?.user?.name]);

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
