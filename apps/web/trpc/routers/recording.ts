import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../lib/s3_config";
import { db, projects } from "@repo/database";
import { withDb } from "@repo/lib/safe-db";
import {
    AuthError,
    ForbiddenError,
    NotFoundError,
    ExternalServiceError,
} from "@repo/lib/errors";
import { and, eq } from "drizzle-orm";

export const recordingRouter = createTRPCRouter({
    getUploadUrl: protectedProcedure
        .input(
            z.object({
                userId: z.string().nonoptional(),
                projectName: z.string().nonoptional(),
                chunkIndex: z.nonnegative(),
                mimeType: z.string().nonoptional(),
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
                .where(and(
                    eq(projects.name, input.projectName),
                    eq(projects.userId, input.userId)
                ))
            );

            if (project.length <= 0)
                throw new NotFoundError(`Project "${input.projectName}"`);

            try {
                const putUrl = await getSignedUrl(
                    s3,
                    new PutObjectCommand({
                        Bucket: "aakaar",
                        Key: `users/${sessionUserId}/projects/${project[0]?.id}/chunks/${input.chunkIndex}.webm`,
                        ContentType: input.mimeType,
                    }),
                    { expiresIn: 3000 },
                );

                return { 
                    uploadUrl: putUrl,
                    r2Key: `users/${sessionUserId}/projects/${project[0]?.id}/chunks/${input.chunkIndex}.webm`
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