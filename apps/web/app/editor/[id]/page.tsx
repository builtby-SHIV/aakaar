import { redirect } from "next/navigation";
import { EditorView } from "../../../components/editor";
import { auth } from "../../auth";

export default async function EditorPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const projectId = resolvedParams?.id || "ep-14";
    const session = await auth();
    if (!session?.user) redirect("/login");
    return <EditorView projectId={projectId} />;
}
