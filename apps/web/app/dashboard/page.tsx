import type { Metadata } from "next";
import { DashboardView } from "../../components/dashboard";
import { auth } from "../auth";

export const metadata: Metadata = {
    title: "Studio Workspace | Aakaar",
    description: "Manage your recorded podcast episodes and studio media.",
};

export default async function DashboardPage() {
    const session = await auth();
    return (
        <DashboardView
            userName={session?.user?.name ?? "Alex"}
        />)
}
