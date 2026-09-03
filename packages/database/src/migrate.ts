import "dotenv/config";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./drizzle";

async function main() {
    await migrate(db, { migrationsFolder: "./migrations" });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
