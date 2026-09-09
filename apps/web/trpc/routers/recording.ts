import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../lib/s3_config";
import { db } from "@repo/database";
import { projects } from "@repo/database/schema";
import { and, eq } from "drizzle-orm";

export const recordingRouter = createTRPCRouter({
    getUploadUrl: protectedProcedure
        .input(
            z.object({
                userId: z.string().nonoptional(),
                projectName: z.string().nonoptional(),
                chunkIndex: z.nonnegative(),
                mimeType: z.string().nonoptional()
            })
        )
        .mutation(async ({ input, ctx }) => {
            const userId = ctx.session.user.id;
            if (!userId) {
                //error logic
            }

            const project = await db
                .select({ id: projects.id })
                .from(projects)
                .where(and(
                    eq(projects.name, input.projectName),
                    eq(projects.userId, input.userId)
                ));

            if (project === undefined) {
                //error logic here
            }

            const putUrl = await getSignedUrl(
                s3,
                new PutObjectCommand({
                    Bucket: "aakaar",
                    Key: `users/${userId}/projects/${project[0]?.id}/chunks/${input.chunkIndex}.webm`,
                    ContentType: input.mimeType,
                }),
                { expiresIn: 3000 },
            );
        })
})