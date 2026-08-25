"use client";

import { TrackToggle } from "@livekit/components-react";
import  { Track } from "livekit-client";

export function CallControls() {
    return (
        <div className="controls">
            <TrackToggle source={Track.Source.Microphone} />
            <TrackToggle source={Track.Source.Camera} />
        </div>
    );
}