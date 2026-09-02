import { StudioView } from "../../../components/studio";

export default async function StudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const roomId = resolvedParams?.id || "ep-14";

  return <StudioView roomId={roomId} />;
}
