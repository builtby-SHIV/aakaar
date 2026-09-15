import { AccessToken } from "livekit-server-sdk";
import { z } from "zod";
import { ENV } from "../../lib/env";
import { createTRPCRouter, protectedProcedure } from "../init";
import { ExternalServiceError } from "@repo/lib/errors";

export const meetingRouter = createTRPCRouter({
    getToken: protectedProcedure
        .input(
            z.object({
                roomName: z.string().min(1).nonoptional(),
                participantName: z.string().min(1).nonoptional(),
            }),
        )
        .mutation(async ({ input }) => {
            try {
                if (!ENV.LIVEKIT_API_KEY || !ENV.LIVEKIT_API_SECRET) {
                    throw new ExternalServiceError("LiveKit", {
                        clientMessage: "LiveKit server credentials are not configured on the server",
                    });
                }

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
            } catch (error) {
                if (error instanceof ExternalServiceError) throw error;
                throw new ExternalServiceError("LiveKit", {
                    cause: error,
                    clientMessage: "Failed to create meeting session token. Please try again.",
                });
            }
    }),
});
