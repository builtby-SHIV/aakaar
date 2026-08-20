"use client";

import {
    LocalVideoTrack,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";

const Videos = (props: { channelName: string; AppID: string }) => {
    
    const remoteUsers = useRemoteUsers();
    console.log(remoteUsers);
    const { AppID, channelName } = props;
    console.log("Agora channel:", channelName);
console.log("length:", new TextEncoder().encode(channelName).length);
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();

    usePublish([localMicrophoneTrack, localCameraTrack]);
    useJoin({
        appid: AppID,
        channel: channelName,
        token: null,
    });

    audioTracks.map((track) => track.play());
    const deviceLoading = isLoadingMic || isLoadingCam;
    if (deviceLoading)
        return (
        <div className="flex flex-col items-center pt-40">Loading devices...</div>
        );
    const unit = "minmax(0, 1fr) ";

    return (
        <div className="flex flex-col justify-between w-full h-screen p-1">
            <div
                className={`grid  gap-1 flex-1`}
                style={{
                gridTemplateColumns:
                    remoteUsers.length > 9
                    ? unit.repeat(4)
                    : remoteUsers.length > 4
                    ? unit.repeat(3)
                    : remoteUsers.length > 1
                    ? unit.repeat(2)
                    : unit,
                }}
            >
                <LocalVideoTrack
                    track={localCameraTrack}
                    play={true}
                    className="w-50 h-50"
                />
                {remoteUsers.map((user) => (
                    <RemoteUser user={user} style={{ width: '50%', height: 300 }} />
                ))}
            </div>
        </div>
    );
}

export default Videos