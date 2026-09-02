import { Music, Smartphone, Square, Video } from "lucide-react";
import { Template } from "./types";

export const TEMPLATES: Template[] = [
  {
    id: "yt-16-9",
    title: "YouTube Interview Master",
    ratio: "16:9 Landscape",
    icon: Video,
    desc: "Side-by-side host/guest split with auto active speaker focus, lower-third watermark, and burned-in editorial subtitles.",
    resolution: "4K UHD / 1080p",
  },
  {
    id: "social-9-16",
    title: "Vertical Social Clip / Reel",
    ratio: "9:16 Vertical",
    icon: Smartphone,
    desc: "Stacked dual-speaker frame with centered karaoke-style animated captions and high-contrast waveforms for TikTok & Shorts.",
    resolution: "1080x1920 60fps",
  },
  {
    id: "podcast-audio",
    title: "Lossless Audio RSS Master",
    ratio: "Broadcast Audio",
    icon: Music,
    desc: "Isolated multichannel uncompressed WAV with -14 LUFS loudness mastering and automatic studio noise reduction.",
    resolution: "48 kHz 24-bit",
  },
  {
    id: "square-card",
    title: "Social Highlight Square",
    ratio: "1:1 Square",
    icon: Square,
    desc: "Square layout featuring dynamic waveform visualizer, episode badge, and large centered quote typography.",
    resolution: "1080x1080",
  },
];
