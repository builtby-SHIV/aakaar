"use client";

import { RoomContext, RoomAudioRenderer } from "@livekit/components-react";
import { Room } from "livekit-client";
import { useEffect, useState } from "react";

export default function Page () {
    const [room] = useState(() => new Room());

    useEffect(() => {
        const serverURl = process.env.LIVEKIT_URL;
        if (serverURl === undefined)
            return;
        room.connect(serverURl, token);
        return () => { room.disconnect(); };
    }, [room]);

    return (
        <RoomContext.Provider value={room}>
            <RoomAudioRenderer />
            <CallGrid />
            <CallControls />
        </RoomContext.Provider>
    );
}