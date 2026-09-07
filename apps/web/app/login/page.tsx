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
        <div className="min-h-screen bg-[#131415] flex flex-col justify-between selection:bg-[#FA5089] selection:text-white">
            {/* Top Navigation */}
            <header className="px-6 py-5 max-w-6xl w-full mx-auto flex items-center justify-between">
                <Logo size="md" showTagline={true} href="/" />
                <Link
                    href="/"
                    className="text-xs font-mono uppercase tracking-widest text-[#8B8D90] hover:text-[#F2F1ED] transition-colors flex items-center gap-1.5"
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
                            <span className="text-xs uppercase font-mono tracking-widest text-[#8B8D90]">
                                Studio Access
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-bold text-[#F2F1ED] tracking-tight leading-tight">
                                Your studio workspace, ready whenever you are.
                            </h1>
                            <p className="text-sm text-[#8B8D90] leading-relaxed">
                                Join high-fidelity remote recording sessions, manage multi-track audio and video feeds, and export directly to your timeline.
                            </p>
                        </div>

                        {/* Feature Highlights */}
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 text-xs text-[#8B8D90]">
                                <div className="w-5 h-5 rounded-full bg-[#1A1B1D] border border-[#2E3033] flex items-center justify-center text-[#FA5089]">
                                    <Radio className="w-3 h-3" />
                                </div>
                                <span>Isolated multitrack local recording</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-[#8B8D90]">
                                <div className="w-5 h-5 rounded-full bg-[#1A1B1D] border border-[#2E3033] flex items-center justify-center text-[#FA5089]">
                                    <SlidersHorizontal className="w-3 h-3" />
                                </div>
                                <span>In-browser timeline & editorial presets</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-[#8B8D90]">
                                <div className="w-5 h-5 rounded-full bg-[#1A1B1D] border border-[#2E3033] flex items-center justify-center text-[#FA5089]">
                                    <CheckCircle2 className="w-3 h-3" />
                                </div>
                                <span>Zero-friction cloud synchronization</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sign In Card */}
                    <div className="md:col-span-6 flex justify-center md:justify-end">
                        <div className="w-full max-w-md bg-[#1A1B1D] border border-[#2E3033] rounded-xl p-8 shadow-xs space-y-6">
                            <div className="space-y-2 text-center md:text-left">
                                <span className="text-xs uppercase font-mono tracking-widest text-[#8B8D90]">
                                    Sign In
                                </span>
                                <h2 className="text-2xl font-bold text-[#F2F1ED]">
                                    Continue to Aakaar
                                </h2>
                                <p className="text-xs text-[#8B8D90] leading-relaxed">
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

                            <div className="pt-4 border-t border-[#2E3033] text-center">
                                <p className="text-[11px] text-[#6B6D70] leading-relaxed">
                                    By continuing, you agree to Aakaar's Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="px-6 py-6 text-center text-xs font-mono text-[#6B6D70]">
                <span>Aakaar Studio &copy; {new Date().getFullYear()} · Crafting audio & video form</span>
            </footer>
        </div>
    );
}
