import type { Metadata } from "next";
import { LandingView } from "../components/landing";

export const metadata: Metadata = {
  title: "Aakaar — Record Together, Edit Without Leaving",
  description:
    "Remote podcast recording and lightweight video editing, in one browser. Isolated multitrack recordings, instant timeline assembly, and burnt-in editorial typography.",
};

export default function Page() {
  return <LandingView />;
}
