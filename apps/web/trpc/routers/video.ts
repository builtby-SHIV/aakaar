import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { withDb } from "@repo/lib/safe-db";
import { db, videos } from "@repo/database";
import { and, eq, type SQL } from "drizzle-orm";

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
            const video = await withDb(() =>
                db
                    .insert(videos)
                    .values({
                        name: input.name,
                        projectId: input.projectId,
                        status: input.status, 
                        expectedChunks: input.expectedChunks,
                    })
                    .returning({ id: videos.id })
            );
            return { id: video[0]?.id }
        }),

        changeVideoField: protectedProcedure
            .input(
                z
                    .object({
                        name: z.string().min(1).optional(),
                        projectId: z.number(),
                        videoId: z.number().optional(),
                        status: z.enum([
                            "recording", 
                            "pending_stitch", 
                            "stitching", 
                            "done", 
                            "incomplete", 
                            "none"
                        ]).optional(), 
                        expectedChunks: z.number().optional(),
                        finalKey: z.string().optional()
                    })
                    .refine((data) => {
                        return ( 
                            data.videoId !== undefined || 
                            data.name !== undefined
                        )
                    }, 
                    {
                        message: "Either 'video name' 'videoId' should be present.",
                        path: ["name"]
                    })
                    .refine((data) => {
                        return ( 
                            data.status !== undefined || 
                            data.expectedChunks !== undefined || 
                            data.finalKey !== undefined
                        )
                    }, 
                    {
                        message: "At least one field to update 'status', 'expectedChunks', or 'finalKey' must be provided.",
                        path: ["name"]
                    })
            )
            .mutation(async ({ input }) => {
                const conditions: SQL[] = [];
                if (input.name)
                    conditions.push(eq(videos.name, input.name), eq(videos.projectId, input.projectId));
                else if (input.videoId)
                    conditions.push(eq(videos.id, input.videoId), eq(videos.projectId, input.projectId));

                const updatePayload = {
                    status: input.status,
                    expectedChunks: input.expectedChunks,
                    finalKey: input.finalKey,
                };
                
                await withDb(() =>
                    db
                        .update(videos)
                        .set(updatePayload)
                        .where(and(...conditions))
                );
            })
    })