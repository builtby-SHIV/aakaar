import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#E5E3DC] bg-[#F7F6F2] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#E5E3DC]">
          <div className="md:col-span-6 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-[#7A7870] max-w-sm leading-relaxed">
              The Kanso-inspired remote podcast studio and in-browser video editor. Record together. Edit without leaving.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">Product</h4>
            <ul className="space-y-2 text-sm text-[#141413]">
              <li><Link href="/video-meet" className="hover:text-[#E54D2E] transition-colors">Recording Studio</Link></li>
              <li><Link href="/editor/demo" className="hover:text-[#E54D2E] transition-colors">In-Browser Editor</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#E54D2E] transition-colors">Dashboard</Link></li>
              <li><Link href="/brand" className="hover:text-[#E54D2E] transition-colors">Brand Kit</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">Philosophy</h4>
            <ul className="space-y-2 text-sm text-[#141413]">
              <li><span className="text-[#7A7870]">Kanso (Simplicity)</span></li>
              <li><span className="text-[#7A7870]">Local 1080p multitrack</span></li>
              <li><span className="text-[#7A7870]">Lossless audio 48kHz</span></li>
              <li><span className="text-[#7A7870]">Zero desktop installs</span></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#7A7870]">Presets</h4>
            <ul className="space-y-2 text-sm text-[#141413]">
              <li><span className="text-[#7A7870]">YouTube 16:9 4K</span></li>
              <li><span className="text-[#7A7870]">Shorts & Reels 9:16</span></li>
              <li><span className="text-[#7A7870]">Podcast WAV/MP3</span></li>
              <li><span className="text-[#7A7870]">Square Clips 1:1</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7870]">
          <p>© {new Date().getFullYear()} Aakaar Studio. Built with restraint.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
