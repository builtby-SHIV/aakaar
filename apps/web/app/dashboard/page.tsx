import type { Metadata } from "next";
import { DashboardView } from "../../components/dashboard";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Studio Workspace | Aakaar",
    description: "Manage your recorded podcast episodes and studio media.",
};

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) redirect("/login");
    return (
        <DashboardView
            userName={session?.user?.name ?? "Alex"}
        />)
}
