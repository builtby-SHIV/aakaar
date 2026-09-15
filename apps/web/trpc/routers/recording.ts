import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../lib/s3_config";
import { db, projectParticipants, projects } from "@repo/database";
import { withDb } from "@repo/lib/safe-db";
import {
    ForbiddenError,
    ExternalServiceError,
} from "@repo/lib/errors";
import { and, eq, or } from "drizzle-orm";

export const recordingRouter = createTRPCRouter({
    getUploadUrl: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                projectId: z.number(),
                chunkIndex: z.number(),
                mimeType: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const sessionUserId = ctx.session.user.id;

            if (sessionUserId !== input.userId)
                throw new ForbiddenError("You cannot upload recordings for another user");

            const project = await withDb(() =>
                db
                .select({ id: projects.id })
                .from(projects)
                .leftJoin(
                    projectParticipants,
                    eq(
                        projectParticipants.projectId,
                        projects.id
                    )
                )
                .where(and(
                    eq(projects.id, input.projectId),
                    or(
                        eq(projects.userId, input.userId),
                        eq(projects.userId, input.userId)
                    )
                ))
            );

            if (project.length <= 0)
                throw new ForbiddenError(`Project "${input.projectId}"`);

            const r2Key = `users/${sessionUserId}/projects/${project[0]?.id}/chunks/${input.chunkIndex}.webm`;

            try {
                const putUrl = await getSignedUrl(
                    s3,
                    new PutObjectCommand({
                        Bucket: "aakaar",
                        Key: r2Key,
                        ContentType: input.mimeType,
                    }),
                    { expiresIn: 300 },
                );

                return { 
                    uploadUrl: putUrl,
                    r2Key
                };
            } 
            catch (error) {
                throw new ExternalServiceError("Storage Service", {
                    cause: error,
                    clientMessage: "Recording cannot be done right now. Please try again later.",
                });
            }
        }),
});