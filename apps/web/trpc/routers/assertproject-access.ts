// apps/web/trpc/routers/project-access.ts
import { and, eq, or } from "drizzle-orm";
import { withDb } from "@repo/lib/safe-db";
import { db, projects, projectParticipants } from "@repo/database";
import { ForbiddenError } from "@repo/lib/errors";

export async function assertProjectAccess(projectId: number, userId: string) {
    const result = await withDb(() =>
        db
            .select({ id: projects.id })
            .from(projects)
            .leftJoin(
                projectParticipants,
                and(
                    eq(projectParticipants.projectId, projects.id),
                    eq(projectParticipants.userId, userId),
                ),
            )
            .where(
                and(
                    eq(projects.id, projectId),
                    or(
                        eq(projects.userId, userId),
                        eq(projectParticipants.userId, userId),
                    ),
                ),
            )
            .limit(1),
    );

    if (result.length === 0)
        throw new ForbiddenError("project");
}