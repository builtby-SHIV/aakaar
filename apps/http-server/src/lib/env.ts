import { z } from "zod";
import "dotenv/config";

const EnvSchema = z.object({
    PORT: z.coerce.number().int(),
    CLIENT_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    LIVEKIT_URL: z.string().url(),
    LIVEKIT_API_KEY: z.string(),
    LIVEKIT_API_SECRET: z.string(),
});

export const ENV = EnvSchema.parse(process.env);