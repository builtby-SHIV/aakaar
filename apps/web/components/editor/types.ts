export type AspectRatio = "16:9" | "9:16" | "1:1";

export type LayoutMode = "split" | "host" | "guest" | "pip";

export type ActiveTool = "layout" | "captions" | "audio" | "brand" | "clips" | null;

export interface CaptionItem {
  id: string;
  start: number;
  end: number;
  speaker: string;
  text: string;
}

export type CaptionFont = "Editorial Serif" | "Modern Sans" | "Monospace";

export type CaptionPosition = "bottom" | "middle" | "top";
