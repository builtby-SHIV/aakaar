"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Circle, Square } from "lucide-react";
import { useMeetingStore } from "../../providers/meetingStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { useTRPC } from "../../trpc/client";
import { useMutation } from "@tanstack/react-query";
import { DatabaseError, ExternalServiceError } from "@repo/lib/errors";
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
    const videoId = useRef<number | null>(null);
    const idb = useRef<IDBPDatabase | null>(null);
    const pendingUploads = useRef(new Set<Promise<void>>());
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
    const updateChunkMetaData = useMutation(
        trpc
            .video
            .updateChunkMetaData
            .mutationOptions()
    );
    
    const getUploadUrl = useCallback(async (e: BlobEvent, chunkIndex: number) => {
        try {
            const url = await uploadUrl.mutateAsync({
                userId: session?.user?.id || "",
                projectId,
                videoId: videoId.current!,
                chunkIndex,
                mimeType: e.data.type
            });
            
            return url;
        }
        catch(e) {
            console.error("Upload URL generation failed" + e);
        }
    }, [projectId, session?.user?.id, uploadUrl]);
        
    const uploadChunk = useCallback(async (e: BlobEvent, currIndex: number, retriesLeft = 5) => {
        try {
            const data = await getUploadUrl(e, currIndex);
            if (!data)
                throw new ExternalServiceError("Cloudflare", {
                        clientMessage: "Recording cannot be done. Please try again later"
                    });

            const res = await fetch(data.uploadUrl, { 
                method: 'PUT', 
                body: e.data, 
                headers: { 
                    'Content-Length': e.data.size.toString() 
            }});

            if (res.ok)
            {
                try {
                    await addChunk.mutateAsync({
                        videoId: videoId.current!,
                        chunkIndex: currIndex,
                        r2Key: data.r2Key,
                        byteSize: e.data.size
                    });
                }
                catch (e) {
                    console.log("adding chunk to data to db failed" + e);
                    throw new DatabaseError();
                }
                
                console.log(currIndex);                   
            }
            else if (projectId === null)
                throw new ExternalServiceError("PgSQL", {
                    clientMessage: "Recording cannot be done. Please try again later"
                });
            else
                throw new Error("upload failure");
    }
        catch(err) {
            if (retriesLeft > 0)
                return uploadChunk(e, currIndex, retriesLeft - 1);
            if (idb.current)
                await idb.current.put("LeftOverChunks", { e, projectId }, currIndex);
        }

    }, [getUploadUrl, projectId, addChunk]);

    const handleToggleRecording = async () => {
        if (!isRecording) {
            setIsRecording(true);
            onStart?.();
            chunkIndex.current = 0;
            videoId.current = null;
            
            try {
                console.log("configuring recording");
                await configureRecording();
                if (mediaRecorder.current) {
                    mediaRecorder.current.start(10000);
                    mediaRecorder.current.ondataavailable = async (e: BlobEvent) => {
                        if (e.data.size <= 0)
                            return;
                        const currIndex = chunkIndex.current++;
                        const upload = uploadChunk(e, currIndex)
                            .catch((e) => console.error("Upload failed" + e))
                            .finally(() => pendingUploads.current.delete(upload));
                        pendingUploads.current.add(upload);
                    }           
                }
        
                window.addEventListener('beforeunload', () => {
                    mediaRecorder.current?.stop(); 
                });
            } 
            catch (error) {
                console.error("Failed to start recording:", error);
                setIsRecording(false);
            }
        } 
        else {
            // onStop?.();
            
            if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
                mediaRecorder.current.stop = async () => {
                    await Promise.all([...pendingUploads.current]);
                    updateChunkMetaData.mutate({
                        videoId: videoId.current!,
                        projectId,
                        expectedChunks: chunkIndex.current + 1,
                        status: "pending_stitch"
                    });
                    setIsRecording(false);
                    console.log(isRecording);
                    mediaRecorder.current = null;
                    chunkIndex.current = 0;
                }
            }
        }
    };

    const configureRecording = useCallback(async () => {
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

        const tracksToRecord: MediaStreamTrack[] = [videoTrack];
        if (audioTrack) 
            tracksToRecord.push(audioTrack);
        const combinedStream = new MediaStream(tracksToRecord);

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
        } 
        catch (err) {
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
            throw new DatabaseError();
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
