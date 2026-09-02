import type { Metadata } from "next";
import { TemplatesView } from "../../components/templates";

export const metadata: Metadata = {
  title: "Layout Templates | Aakaar",
  description:
    "Pre-configured multitrack layouts, caption placements, and export formats designed for modern creators.",
};

export default function TemplatesPage() {
  return <TemplatesView />;
}
