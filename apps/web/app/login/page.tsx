import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { Logo } from "../../components/Logo";
import { LogIn } from "../../components/LogIn";
import { ArrowLeft, CheckCircle2, Radio, Video, SlidersHorizontal } from "lucide-react";

export const metadata: Metadata = {
    title: "Sign In | Aakaar",
    description: "Sign in to access your Aakaar Studio workspace and recorded episodes.",
};

export default async function LoginPage() {
    const session = await auth();
    if (session?.user) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-[#F7F6F2] flex flex-col justify-between selection:bg-[#141413] selection:text-[#F7F6F2]">
            {/* Top Navigation */}
            <header className="px-6 py-5 max-w-6xl w-full mx-auto flex items-center justify-between">
                <Logo size="md" showTagline={true} href="/" />
                <Link
                    href="/"
                    className="text-xs font-mono uppercase tracking-widest text-[#7A7870] hover:text-[#141413] transition-colors flex items-center gap-1.5"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to home</span>
                </Link>
            </header>

            {/* Main Auth Container */}
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Left Column: Editorial & Feature Context */}
                    <div className="md:col-span-6 space-y-6 md:pr-4">
                        <div className="space-y-3">
                            <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
                                Studio Access
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#141413] tracking-tight leading-tight">
                                Your studio workspace, ready whenever you are.
                            </h1>
                            <p className="text-sm text-[#7A7870] leading-relaxed">
                                Join high-fidelity remote recording sessions, manage multi-track audio and video feeds, and export directly to your timeline.
                            </p>
                        </div>

                        {/* Feature Highlights */}
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 text-xs text-[#7A7870]">
                                <div className="w-5 h-5 rounded-full bg-[#FFFFFF] border border-[#E5E3DC] flex items-center justify-center text-[#141413]">
                                    <Radio className="w-3 h-3" />
                                </div>
                                <span>Isolated multitrack local recording</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-[#7A7870]">
                                <div className="w-5 h-5 rounded-full bg-[#FFFFFF] border border-[#E5E3DC] flex items-center justify-center text-[#141413]">
                                    <SlidersHorizontal className="w-3 h-3" />
                                </div>
                                <span>In-browser timeline & editorial presets</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-[#7A7870]">
                                <div className="w-5 h-5 rounded-full bg-[#FFFFFF] border border-[#E5E3DC] flex items-center justify-center text-[#141413]">
                                    <CheckCircle2 className="w-3 h-3" />
                                </div>
                                <span>Zero-friction cloud synchronization</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sign In Card */}
                    <div className="md:col-span-6 flex justify-center md:justify-end">
                        <div className="w-full max-w-md bg-[#FFFFFF] border border-[#E5E3DC] rounded-xl p-8 shadow-xs space-y-6">
                            <div className="space-y-2 text-center md:text-left">
                                <span className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">
                                    Sign In
                                </span>
                                <h2 className="text-2xl font-serif font-normal text-[#141413]">
                                    Continue to Aakaar
                                </h2>
                                <p className="text-xs text-[#7A7870] leading-relaxed">
                                    Authenticate securely with your Google account to access your projects and studio recordings.
                                </p>
                            </div>

                            {/* Sign In Component */}
                            <div className="pt-2">
                                <LogIn
                                    variant="button"
                                    className="w-full"
                                    label="Continue with Google"
                                    showIcon={true}
                                />
                            </div>

                            <div className="pt-4 border-t border-[#E5E3DC] text-center">
                                <p className="text-[11px] text-[#A3A199] leading-relaxed">
                                    By continuing, you agree to Aakaar's Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="px-6 py-6 text-center text-xs font-mono text-[#A3A199]">
                <span>Aakaar Studio &copy; {new Date().getFullYear()} · Crafting audio & video form</span>
            </footer>
        </div>
    );
}
