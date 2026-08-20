import Call from "../../../components/Call";

export default function Page () {
    
    const appID = process.env.AGORA_APP_ID;

    return (
        <>
            <main className="flex w-full flex-col">
            {/* <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">
                {channelName!}
            </p> */}
            { appID && <Call appId={appID} /> }
        </main>
        </>
    )
}