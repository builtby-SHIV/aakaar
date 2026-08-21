import { PreJoin, LocalUserChoices } from "@livekit/components-react";

export default function Page({ roomCode }: { roomCode: string }) {
    const handleSubmit = async (values: LocalUserChoices) => {
    // values = { username, videoEnabled, audioEnabled, videoDeviceId, audioDeviceId }
    const res = await fetch(`/api/token?room=${roomCode}&name=${values.username}`);
    const { token, serverUrl } = await res.json();
    // now navigate to the actual room, passing token + serverUrl + values along
};

    return (
        <PreJoin
            defaults={{ username: "" }}
            onSubmit={handleSubmit}
            onError={(e) => console.error(e)}
        />
    );
}