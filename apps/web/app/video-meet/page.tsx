"use client";

import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "../../components/Logo";
import MeetingForm, { type meetingForm } from "../../components/MeetingForm";
import { useMeetingStore } from "../../providers/meetingStoreProvider";

export default function Page() {
  const router = useRouter();
  const { setRoomName } = useMeetingStore((state) => state.actions);

  const onSubmit = (data: meetingForm) => {
    setRoomName(data.roomName);
    router.push(`/video-meet/lobby?room=${encodeURIComponent(data.roomName)}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#141413] flex flex-col justify-between p-6">
      {/* Top Bar */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <Logo size="md" href="/" />
        <Link
          href="/dashboard"
          className="text-xs text-[#7A7870] hover:text-[#141413] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </header>

      {/* Center Form Card */}
      <main className="max-w-md w-full mx-auto my-auto p-8 rounded-2xl border border-[#E5E3DC] bg-[#FFFFFF] shadow-xl space-y-6 animate-kanso-fade">
        <div className="space-y-1.5">
          <span className="text-[11px] uppercase tracking-widest font-mono text-[#7A7870]">
            LiveKit Studio Connect
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal text-[#141413] tracking-tight">
            Start or Join a Studio
          </h1>
          <p className="text-xs text-[#7A7870] leading-relaxed">
            Enter a room name to proceed to the pre-flight device lobby.
          </p>
        </div>

        <MeetingForm onSubmit={onSubmit} />

        <div className="pt-4 border-t border-[#E5E3DC] flex items-center justify-between text-[11px] font-mono text-[#7A7870]">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#2B7A4B]" />
            <span>Local Multitrack Enabled</span>
          </span>
          <span>Zero Installs</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto text-center text-xs text-[#7A7870] font-mono">
        Aakaar Kanso Studio · High-Fidelity In-Browser Media
      </footer>
    </div>
  );
}
