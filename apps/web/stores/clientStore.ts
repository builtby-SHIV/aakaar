import type { IAgoraRTCClient } from "agora-rtc-react";
import { createStore } from "zustand";
import type { clientState, clientStore } from "../types";

export const defaultInitState: clientState = {
    RTCClient: undefined,
    channelName: "",
}

export const createClientStore = (initState = defaultInitState) => {
    return createStore<clientStore>()((set, get) => ({
        ...initState,
        actions: {
            setRTCClient: (RTCClient) => set({RTCClient}),
            setChannelName: (channelName) => set({channelName}),
    }}))
}