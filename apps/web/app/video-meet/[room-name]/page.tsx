import type { Metadata } from "next";
import { VideoMeetRoomView } from "../../../components/video-meet";

export const metadata: Metadata = {
  title: "Live Studio Session | Aakaar",
  description: "Live multitrack studio recording room.",
};

export default function Page() {
  return <VideoMeetRoomView />;
}
