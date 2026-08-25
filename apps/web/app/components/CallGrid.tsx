"use client";

import { useTracks, GridLayout, ParticipantTile, ParticipantName } from "@livekit/components-react";
import { Track } from "livekit-client";

export function CallGrid() {
    const tracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }]);
        return (
            <GridLayout tracks={tracks}>
                <ParticipantTile><ParticipantName /></ParticipantTile>
            </GridLayout>
    );
}