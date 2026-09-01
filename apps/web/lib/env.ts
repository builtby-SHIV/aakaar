import { z } from "zod";
import "dotenv/config";

const EnvSchema = z.object({
    LIVEKIT_URL: z.url(),
    LIVEKIT_API_KEY: z.string().nonempty(),
    LIVEKIT_API_SECRET: z.string().nonempty(),
    GOOGLE_CLIENT_ID: z.string().nonempty(),
    GOOGLE_CLIENT_SECRET: z.string().nonempty(),
    AUTH_SECRET: z.string().nonempty()
});

export const ENV = EnvSchema.parse(process.env);