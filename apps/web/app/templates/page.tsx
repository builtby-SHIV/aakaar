import type { Metadata } from "next";
import { TemplatesView } from "../../components/templates";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export const metadata: Metadata = {
    title: "Layout Templates | Aakaar",
    description:
        "Pre-configured multitrack layouts, caption placements, and export formats designed for modern creators.",
};

export default async function TemplatesPage() {
    const session = await auth();
        if (!session?.user) redirect("/login");
    return <TemplatesView />;
}
