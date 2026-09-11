import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { withDb } from "@repo/lib/safe-db";
import { db, videos } from "@repo/database";

export const videoRouter = createTRPCRouter({
    createVideo: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1),
                projectId: z.number(),
                status: z.enum([
                    "recording", 
                    "pending_stitch", 
                    "stitching", 
                    "done", 
                    "incomplete", 
                    "none"
                ]), 
                expectedChunks: z.number().default(0),
            })
        )
        .mutation(async ({ input }) => {
            await withDb(() =>
                db
                    .insert(videos)
                    .values({
                        name: input.name,
                        projectId: input.projectId,
                        status: input.status, 
                        expectedChunks: input.expectedChunks,
                    })
            );
        })
    })