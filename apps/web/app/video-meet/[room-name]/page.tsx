"use client";

import { RoomAudioRenderer, RoomContext } from "@livekit/components-react";
import { Room } from "livekit-client";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useMeetingStore } from "../../../providers/meetingStoreProvider";
import { CallControls } from "../../components/CallControls";
import { CallGrid } from "../../components/CallGrid";

export default function Page () {
    const [room] = useState(() => new Room());
    const { token } = useMeetingStore(useShallow((state) => ({ token: state.token })));
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