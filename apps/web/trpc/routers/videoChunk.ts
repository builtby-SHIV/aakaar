import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { withDb } from "@repo/lib/safe-db";
import { db, videoChunks } from "@repo/database";

export const videoChunkRouter = createTRPCRouter({
    createChunk: protectedProcedure
        .input(
            z.object({
                videoId: z.number().nonnegative(),
                chunkIndex: z.number().nonnegative(),
                r2Key: z.string().min(1),
                byteSize: z.number().nonnegative()
            })
        )
        .mutation(async ({ input }) => {
            await withDb(() =>
                db
                    .insert(videoChunks)
                    .values({
                        videoId: input.videoId,
                        chunkIndex: input.chunkIndex,
                        r2Key: input.r2Key,
                        byteSize: input.byteSize
                    })
            )
        })
})