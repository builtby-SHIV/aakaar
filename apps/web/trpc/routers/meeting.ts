import { AccessToken } from "livekit-server-sdk";
import { z } from "zod";
import { ENV } from "../../lib/env";
import { createTRPCRouter, protectedProcedure } from "../init";

export const meetingRouter = createTRPCRouter({
    getToken: protectedProcedure
        .input(
            z.object({
                roomName: z.string().min(1).nonoptional(),
                participantName: z.string().min(1).nonoptional(),
            }),
        )
        .mutation(async ({ input }) => {
            const token = new AccessToken(
                ENV.LIVEKIT_API_KEY,
                ENV.LIVEKIT_API_SECRET,
                {
                    identity: input.participantName,
                },
            );
            token.addGrant({
                roomJoin: true,
                room: input.roomName,
                canPublish: true,
                canSubscribe: true,
            });

            return {
                token: await token.toJwt(),
                serverUrl: ENV.LIVEKIT_URL,
            };
    }),
});
