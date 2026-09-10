"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useClientStore } from "../providers/clientStoreProvider";

export function useInitializeClientStore() {
  const { data: session } = useSession();
  const setSessionId = useClientStore((store) => store.actions.setSessionId);

  useEffect(() => {
    if (session?.user?.id) {
      // User is logged in - set the session ID
      setSessionId(session.user.id);
    } else {
      // User is logged out - clear the session ID
      setSessionId("");
    }
  }, [session?.user?.id, setSessionId]);
}
