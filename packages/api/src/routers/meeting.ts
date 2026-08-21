import { z } from "zod";
import { AccessToken } from "livekit-server-sdk";
import { procedure, router } from "../trpc";

export const meetingRouter = router({
    getToken: procedure
        .input(
            z.object({
                meetingId: z.string().min(1),
                participantName: z.string().min(1),
            }),
        )
        .mutation(async ({ input }) => {
            const token = new AccessToken(
                process.env.LIVEKIT_API_KEY,
                process.env.LIVEKIT_API_SECRET,
                {
                    identity: input.participantName,
                },
        );

        token.addGrant({
            roomJoin: true,
            room: input.meetingId,
            canPublish: true,
            canSubscribe: true,
        });

        return {
            token: await token.toJwt(),
        };
    }),
});