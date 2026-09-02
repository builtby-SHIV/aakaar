import type { Metadata } from "next";
import { BrandKitView } from "../../components/brand";

export const metadata: Metadata = {
  title: "Brand Kit | Aakaar",
  description:
    "Save typography, watermark logo, and caption presets across your studio recordings.",
};

export default function BrandKitPage() {
  return <BrandKitView />;
}
