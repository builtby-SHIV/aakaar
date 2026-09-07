import { redirect } from "next/navigation";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ room?: string }>;
}) {
    const params = await searchParams;
    const room = params?.room;
    redirect(room ? `/video-meet/lobby?room=${encodeURIComponent(room)}` : "/video-meet/lobby");
}
