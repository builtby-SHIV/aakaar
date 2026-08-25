import { createStore } from "zustand";
import type { meetingState, meetingStore } from "../lib/types";

export const defaultInitState: meetingState = {
    token: "",
    serverUrl: "",
    roomName: "",
    participantName: "",
    audioEnabled: true,
    videoEnabled: true,
};

export const createMeetingStore = (initState = defaultInitState) => {
    return createStore<meetingStore>()((set) => ({
        ...initState,
        actions: {
          setToken: (token) => set({ token }),
          setServerUrl: (serverUrl) => set({ serverUrl }),
          setRoomName: (roomName) => set({ roomName }),
          setParticipantName: (participantName) => set({ participantName }),
          setMediaPreferences: (audioEnabled, videoEnabled) =>
            set({ audioEnabled, videoEnabled }),
          reset: () => set(defaultInitState),
        },
    }));
};