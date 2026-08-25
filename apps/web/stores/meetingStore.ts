import { createStore } from "zustand";
import type { meetingState, meetingStore } from "../lib/types";

export const defaultInitState: meetingState = {
    token: "",
};

export const createMeetingStore = (initState = defaultInitState) => {
    return createStore<meetingStore>()((set) => ({
        ...initState,
        actions: {
        setToken: (token) => set({ token }),
        },
    }));
};