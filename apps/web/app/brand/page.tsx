import type { Metadata } from "next";
import { BrandKitView } from "../../components/brand";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export const metadata: Metadata = {
    title: "Brand Kit | Aakaar",
    description:
        "Save typography, watermark logo, and caption presets across your studio recordings.",
};

export default async function BrandKitPage() {
    const session = await auth();
    if (!session?.user) redirect("/login");
    return <BrandKitView />;
}
