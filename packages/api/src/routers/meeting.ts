import { z } from "zod";
import { AccessToken } from "livekit-server-sdk";
import { procedure, router } from "../trpc";
import { ENV } from "../lib/env";

export const meetingRouter = router({
    getToken: procedure
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
            };
    }),

    
});