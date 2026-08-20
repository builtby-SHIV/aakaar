interface PageProps {
    params: Promise<{ channelName: string }>
}

export default async function Page ({ params }: PageProps) {
    const { channelName } = await params;

    return (
        <>
            <main className="flex w-full flex-col">
            <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">
                {channelName!}
            </p>
            <Call appId={process.env.AGORA_APP_ID} channelName={channelName} />
        </main>
        </>
    )
}