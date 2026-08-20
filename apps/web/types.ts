import type { IAgoraRTCClient } from "agora-rtc-react";

export interface clientState {
    RTCClient: IAgoraRTCClient | undefined,
    channelName: string
};

export interface clientActions {
    setRTCClient: (RTCClient: IAgoraRTCClient | undefined) =>  void,
    setChannelName: (channelName: string) => void;
};

export type clientStore = clientState & { actions: clientActions };