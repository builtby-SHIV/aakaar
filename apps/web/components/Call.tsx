"use client" 

import AgoraRTC, {
    AgoraRTCProvider,
    useRTCClient
} from "agora-rtc-react";
import Link from "next/link";
import Videos from "./Videos";
import { useShallow } from "zustand/shallow";
import { useClientStore } from "../providers/clientStoreProvider";

interface callProps {
    appId: string,
}

const Call = ({ appId }: callProps) => {
    const client = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }));
    const { channelName } = useClientStore(useShallow((state) => ({
        channelName: state.channelName,
    })));

    return (
        <AgoraRTCProvider client={client}>
            <Videos channelName={channelName} AppID={appId} />
            <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center pb-4">
                <Link className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40" href="/">End Call</Link>
            </div>
        </AgoraRTCProvider>
    );
}

export default Call;