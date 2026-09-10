import { useCallback, useEffect, useState } from "react";
import { Circle, Square } from "lucide-react";
import { useMeetingStore } from "../../providers/meetingStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { useTRPC } from "../../trpc/client";
import { useMutation } from "@tanstack/react-query";
import { AuthError } from "@repo/lib/errors";
import { useSession } from "next-auth/react";

export interface RecordButtonProps {
    onStart?: () => void;
    onStop?: () => void;
    className?: string;
}

export function RecordButton({ onStart, onStop, className = "" }: RecordButtonProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setmediaRecorder] = useState<MediaRecorder | null>(null);

    const { audioDeviceId, videoDeviceId, projectName } = useMeetingStore(useShallow((state) => ({ 
        audioDeviceId: state.audioDeviceId, 
        videoDeviceId: state.videoDeviceId,
        projectName: state.projectName
    })));

    const trpc = useTRPC();
    const { data: session } = useSession();

    const uploadUrl = useMutation(
        trpc
        .recording
        .getUploadUrl
        .mutationOptions({
            onSuccess: () => {
            }
        }));
        
        const startRecording = useCallback(() => {
            let chunkIndex = 0;
            
            if (mediaRecorder) {
                mediaRecorder.start(120000);
                mediaRecorder.ondataavailable = async (e: BlobEvent) => {
                    if (e.data.size <= 0)
                        return;

                    chunkIndex++;
                    const url = await uploadUrl.mutateAsync({
                        userId: session?.user?.id || "",
                        projectName,
                        chunkIndex,
                        mimeType: e.data.type
                    });
                await fetch(url.uploadUrl, { method: 'PUT', body: e.data });
            }
        }
    }, [mediaRecorder, session?.user?.id, projectName, uploadUrl]);

    const handleToggleRecording = async () => {
        if (!isRecording) {
            setIsRecording(true);
            onStart?.();

            // Custom recording logic
            try {
                await startRecording();
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
        }
        configureRecording();
    }, [audioDeviceId, videoDeviceId]);

    return (
        <button
            type="button"
            onClick={handleToggleRecording}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isRecording
                    ? "bg-red-950/60 text-red-200 hover:bg-red-900/60 border border-red-500/30"
                    : "bg-surface-hover text-foreground hover:bg-border border border-border-strong"
            } ${className}`}
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
