import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#2E3033] bg-[#131415] py-16 text-[#F2F1ED]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#2E3033]">
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" />
            <p className="text-xs text-[#8B8D90] max-w-sm leading-relaxed font-sans">
              Developer-grade in-browser studio for remote video podcasting and lightweight assembly. 
              Local 1080p stream isolation, hardware-synced audio waveforms, and instant WebAssembly rendering.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#1A1B1D] border border-[#2E3033] text-[10px] font-mono text-[#8B8D90]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>API & ENGINE: 99.99% UPTIME</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase font-mono tracking-wider text-[#F2F1ED] font-semibold">Product</h4>
            <ul className="space-y-2 text-xs text-[#8B8D90]">
              <li><Link href="/video-meet" className="hover:text-[#FA5089] transition-colors">Recording Studio</Link></li>
              <li><Link href="/editor/demo" className="hover:text-[#FA5089] transition-colors">In-Browser Editor</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#FA5089] transition-colors">Workspace</Link></li>
              <li><Link href="/brand" className="hover:text-[#FA5089] transition-colors">Brand Kit</Link></li>
              <li><Link href="/templates" className="hover:text-[#FA5089] transition-colors">Templates</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase font-mono tracking-wider text-[#F2F1ED] font-semibold">Specs & Docs</h4>
            <ul className="space-y-2 text-xs text-[#8B8D90] font-mono text-[11px]">
              <li><span className="hover:text-[#F2F1ED] cursor-pointer">LiveKit WebRTC</span></li>
              <li><span className="hover:text-[#F2F1ED] cursor-pointer">WebAudio 48kHz</span></li>
              <li><span className="hover:text-[#F2F1ED] cursor-pointer">ProRes 422 HQ</span></li>
              <li><span className="hover:text-[#F2F1ED] cursor-pointer">WASM FFmpeg</span></li>
              <li><span className="hover:text-[#F2F1ED] cursor-pointer">REST & TRPC API</span></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase font-mono tracking-wider text-[#F2F1ED] font-semibold">Built for Builders</h4>
            <p className="text-xs text-[#8B8D90] leading-relaxed">
              No electron wrappers. No 45-minute file downloads. Real-time media pipeline operating directly inside modern browsers.
            </p>
            <div className="pt-1">
              <Link
                href="/video-meet"
                className="inline-flex items-center gap-1.5 text-xs text-[#FA5089] hover:underline font-mono"
              >
                <span>Launch live console</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8B8D90]">
          <p className="font-mono text-[11px]">© {new Date().getFullYear()} Aakaar Engine. Low-latency media architecture.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span className="hover:text-[#F2F1ED] cursor-pointer">Privacy</span>
            <span className="hover:text-[#F2F1ED] cursor-pointer">Security</span>
            <span className="hover:text-[#F2F1ED] cursor-pointer">System Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
