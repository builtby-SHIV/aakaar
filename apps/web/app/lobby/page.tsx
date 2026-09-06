"use client";

import { useRouter } from "next/navigation";
import { LobbyPreview, type UserMediaChoices } from "../../components/LobbyPreview";

export default function LobbyPage() {
    const router = useRouter();

    const handleJoin = (values: UserMediaChoices) => {
        router.push(`/video-meet?room=studio-live&name=${encodeURIComponent(values.username)}`);
    };

    return (
        <div className="min-h-screen bg-[#F7F6F2] py-12">
            <LobbyPreview onSubmit={handleJoin} />
        </div>
    );
}
