import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../lib/s3_config";
import { db } from "@repo/database";

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

            const project = await db.query.projects.findFirst({
                where: (projects, { eq, and }) =>
                    and(
                        eq(projects.name, input.projectName),
                        eq(projects.userId, userId!)
                    ),
                columns: {
                    id: true
                }
            });

            if (project === undefined) {
                //error logic here
            }

            const putUrl = await getSignedUrl(
                s3,
                new PutObjectCommand({
                    Bucket: "aakaar",
                    Key: `users/${userId}/projects/${project?.id}/chunks/${input.chunkIndex}.webm`,
                    ContentType: input.mimeType,
                }),
                { expiresIn: 3000 },
            );
        })
})