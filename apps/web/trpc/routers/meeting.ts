import { AccessToken } from "livekit-server-sdk";
import { z } from "zod";
import { ENV } from "../../lib/env";
import { baseProcedure, createTRPCRouter } from "../init";

export const meetingRouter = createTRPCRouter({
    getToken: baseProcedure
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
