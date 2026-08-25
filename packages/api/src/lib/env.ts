import { z } from "zod";
import "dotenv/config";

const EnvSchema = z.object({
    LIVEKIT_URL: z.string().url(),
    LIVEKIT_API_KEY: z.string(),
    LIVEKIT_API_SECRET: z.string(),
});

export const ENV = EnvSchema.parse(process.env);