import { EditorView } from "../../../components/editor";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const projectId = resolvedParams?.id || "ep-14";

  return <EditorView projectId={projectId} />;
}
