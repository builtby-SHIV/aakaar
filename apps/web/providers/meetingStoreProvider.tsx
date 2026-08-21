"use client";

import { type ReactNode, createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createMeetingStore } from "../stores/meetingStore";
import type { meetingStore } from "../lib/types";

export type MeetingStoreApi = ReturnType<typeof createMeetingStore>;

export const MeetingStoreContext = createContext<MeetingStoreApi | undefined>(
    undefined,
);

export interface meetingStoreProviderProps {
    children: ReactNode;
}

export const MeetingStoreProvider = ({ children }: meetingStoreProviderProps) => {
    const [store] = useState(() => createMeetingStore());
    return (
        <MeetingStoreContext.Provider value={store}>
        {children}
        </MeetingStoreContext.Provider>
    );
};

export const useMeetingStore = <T,>(selector: (store: meetingStore) => T): T => {
    const meetingStoreContext = useContext(MeetingStoreContext);
    if (!meetingStoreContext) {
        throw new Error(`useMeetingStore must be used within meetingStoreProvider`);
    }

    return useStore(meetingStoreContext, selector);
};
