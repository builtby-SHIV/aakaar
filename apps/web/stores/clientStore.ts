import { createStore } from "zustand";
import type { clientState, clientStore } from "../types";

export const defaultInitState: clientState = {
    roomName: "",
};

export const createClientStore = (initState = defaultInitState) => {
    return createStore<clientStore>()((set) => ({
    ...initState,
    actions: {
        setRoomName: (roomName) => set({ roomName }),
    },
    }));
};
