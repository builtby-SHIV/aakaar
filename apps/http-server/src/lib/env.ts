import { z } from "zod";
import "dotenv/config";

const EnvSchema = z.object({
    PORT: z.coerce.number().int(),
    CLIENT_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
});

export const ENV = EnvSchema.parse(process.env);