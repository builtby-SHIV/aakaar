"use client";

import { type ReactNode, createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createClientStore } from "../app/stores/clientStore";
import type { clientStore } from "../lib/types";

export type ClientStoreApi = ReturnType<typeof createClientStore>;

export const ClientStoreContext = createContext<ClientStoreApi | undefined>(
  undefined,
);

export interface clientStoreProviderProps {
  children: ReactNode;
}

export const ClientStoreProvider = ({ children }: clientStoreProviderProps) => {
  const [store] = useState(() => createClientStore());
  return (
    <ClientStoreContext.Provider value={store}>
      {children}
    </ClientStoreContext.Provider>
  );
};

export const useClientStore = <T,>(selector: (store: clientStore) => T): T => {
  const clientStoreContext = useContext(ClientStoreContext);
  if (!clientStoreContext) {
    throw new Error(`useClientStore must be used within clientStoreProvider`);
  }

  return useStore(clientStoreContext, selector);
};
