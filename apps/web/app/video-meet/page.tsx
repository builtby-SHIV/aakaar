import type { Metadata } from "next";
import { VideoMeetStartView } from "../../components/video-meet";

export const metadata: Metadata = {
  title: "LiveKit Studio Connect | Aakaar",
  description: "Start or join a pre-flight studio recording session.",
};

export default function Page() {
  return <VideoMeetStartView />;
}
