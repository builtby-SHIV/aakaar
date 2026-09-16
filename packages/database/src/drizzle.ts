import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import * as relations from "./relations";

config({ path: ".env" });
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/aakaar";
const sql = neon(connectionString);

export const fullSchema = { ...schema, ...relations };
export const db = drizzle(sql, { schema: fullSchema });

export * from "./schema";
export * from "./relations";

