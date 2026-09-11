import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db, projects, projectParticipants, users } from "@repo/database";
import { withDb } from "@repo/lib/safe-db";
import { NotFoundError } from "@repo/lib/errors";
import { eq, inArray } from "drizzle-orm";

export const projectRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1, "Project name cannot be empty").trim(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const userId = ctx.session.user.id as string;

            const newProjects = await withDb(() =>
                db
                    .insert(projects)
                    .values({
                        name: input.name,
                        userId,
                    })
                    .returning({
                        id: projects.id,
                        name: projects.name,
                    })
            );

            return newProjects[0];
        }),

    joinMeeting: protectedProcedure
        .input(
            z.object({
                projectId: z.number().int().positive(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const userId = ctx.session.user.id as string;

            // 1. Ensure project exists
            const existingProject = await withDb(() =>
                db
                    .select({
                        id: projects.id,
                        name: projects.name,
                        userId: projects.userId,
                    })
                    .from(projects)
                    .where(eq(projects.id, input.projectId))
            );

            if (existingProject.length === 0) {
                throw new NotFoundError(`Project with id ${input.projectId}`);
            }

            // 2. Insert into project_participants (idempotent via onConflictDoNothing)
            await withDb(() =>
                db
                    .insert(projectParticipants)
                    .values({
                        projectId: input.projectId,
                        userId,
                    })
                    .onConflictDoNothing()
            );

            return existingProject[0];
        }),

    getById: protectedProcedure
        .input(
            z.object({
                projectId: z.number().int().positive(),
            })
        )
        .query(async ({ input }) => {
            const result = await withDb(() =>
                db
                    .select({
                        id: projects.id,
                        name: projects.name,
                        userId: projects.userId,
                    })
                    .from(projects)
                    .where(eq(projects.id, input.projectId))
            );

            if (result.length === 0) {
                throw new NotFoundError(`Project with id ${input.projectId}`);
            }

            return result[0];
        }),

    listAll: protectedProcedure.query(async ({ ctx }) => {
        const currentUserId = ctx.session.user.id as string;

        // 1. Query all projects owned by the user (as host)
        const ownedProjects = await withDb(() =>
            db
                .select({
                    id: projects.id,
                    name: projects.name,
                    userId: projects.userId,
                })
                .from(projects)
                .where(eq(projects.userId, currentUserId))
        );

        // 2. Query all projectIds where the user is present in projectParticipants (as guest)
        const participatedRecords = await withDb(() =>
            db
                .select({
                    projectId: projectParticipants.projectId,
                })
                .from(projectParticipants)
                .where(eq(projectParticipants.userId, currentUserId))
        );

        const participatedProjectIds = participatedRecords.map((r) => r.projectId);

        // 3. Query projects matching those projectIds that are not already in ownedProjects
        const ownedProjectIds = new Set(ownedProjects.map((p) => p.id));
        const guestProjectIdsToFetch = participatedProjectIds.filter(
            (id) => !ownedProjectIds.has(id)
        );

        let guestProjects: { id: number; name: string; userId: string }[] = [];
        if (guestProjectIdsToFetch.length > 0) {
            guestProjects = await withDb(() =>
                db
                    .select({
                        id: projects.id,
                        name: projects.name,
                        userId: projects.userId,
                    })
                    .from(projects)
                    .where(inArray(projects.id, guestProjectIdsToFetch))
            );
        }

        // 4. Merge all unique projects
        const allProjects = [...ownedProjects, ...guestProjects];

        if (allProjects.length === 0) {
            return [];
        }

        const allProjectIds = allProjects.map((p) => p.id);

        // 5. Fetch participants for all these projects along with their user info
        const participantsWithUsers = await withDb(() =>
            db
                .select({
                    projectId: projectParticipants.projectId,
                    userName: users.name,
                    userEmail: users.email,
                })
                .from(projectParticipants)
                .innerJoin(users, eq(projectParticipants.userId, users.id))
                .where(inArray(projectParticipants.projectId, allProjectIds))
        );

        // Map participants by project id
        const participantsMap = new Map<number, string[]>();
        for (const item of participantsWithUsers) {
            const list = participantsMap.get(item.projectId) || [];
            const displayName = item.userName || item.userEmail || "Participant";
            if (!list.includes(displayName))
                list.push(displayName);
            participantsMap.set(item.projectId, list);
        }

        return allProjects.map((proj) => ({
            id: String(proj.id),
            title: proj.name,
            episodeNumber: proj.id,
            status: "Draft" as const,
            updatedAt: "Active",
            duration: "--:--",
            participants: participantsMap.get(proj.id) ?? [],
            hasCaptions: false,
            isOwner: proj.userId === currentUserId,
        }));
    }),
});
