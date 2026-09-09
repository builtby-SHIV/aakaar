import z from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../lib/s3_config";

export const recordingRouter = createTRPCRouter({
    getUploadUrl: baseProcedure
        .input(
            z.object({
                userId: z.string().nonoptional(),
                chunkIndex: z.nonnegative(),
                mimeType: z.string().nonoptional()
            })
        )
        .mutation(async ({ input }) => {
            const putUrl = await getSignedUrl(
                s3,
                new PutObjectCommand({
                    Bucket: "aakaar",
                    Key: ,
                    ContentType: "image/png",
                }),
                { expiresIn: 3600 },
);
        })
})