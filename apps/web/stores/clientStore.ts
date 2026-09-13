import { createStore } from "zustand";
import type { clientState, clientStore } from "../lib/types";

export const defaultInitState: clientState = {
    sessionId: "",
};

export const createClientStore = (initState = defaultInitState) => {
    return createStore<clientStore>()((set) => ({
        ...initState,
        actions: {
            setSessionId: (sessionId) => set({ sessionId }),
        },
    }));
};
