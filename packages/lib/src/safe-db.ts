/**
 * Database operation wrapper that catches Drizzle / Neon errors
 * and converts them into typed AppError subclasses.
 *
 * Usage:
 *   const rows = await withDb(() => db.select().from(users));
 */
import { ConflictError, DatabaseError, NotFoundError } from "./errors";

/**
 * Wraps a database operation and translates low-level SQL errors
 * into application-level error classes.
 */
export async function withDb<T>(fn: () => Promise<T>): Promise<T> {
    try {
        return await fn();
    } catch (error: unknown) {
        throw mapDatabaseError(error);
    }
}

/**
 * Maps a raw database error to the appropriate AppError subclass
 * based on PostgreSQL error codes.
 *
 * @see https://www.postgresql.org/docs/current/errcodes-appendix.html
 */
function mapDatabaseError(error: unknown): DatabaseError | ConflictError | NotFoundError {
    // Neon / node-postgres surfaces `code` on the error object
    const pgCode = (error as { code?: string })?.code;

    // 23505 — unique_violation
    if (pgCode === "23505") {
        return new ConflictError("Resource", {
            cause: error,
            details: { pgCode },
        });
    }

    // 23503 — foreign_key_violation (referenced row missing)
    if (pgCode === "23503") {
        return new NotFoundError("Referenced resource", {
            cause: error,
            details: { pgCode },
        });
    }

    // 23502 — not_null_violation
    if (pgCode === "23502") {
        return new DatabaseError("A required field was missing", {
            cause: error,
            details: { pgCode },
        });
    }

    // 23514 — check_violation
    if (pgCode === "23514") {
        return new DatabaseError("A database constraint check failed", {
            cause: error,
            details: { pgCode },
        });
    }

    // 08xxx — connection exceptions
    if (pgCode?.startsWith("08")) {
        return new DatabaseError("Database connection failed", {
            cause: error,
            details: { pgCode },
        });
    }

    // 57xxx — operator intervention (e.g., statement_timeout)
    if (pgCode?.startsWith("57")) {
        return new DatabaseError("Database operation timed out or was cancelled", {
            cause: error,
            details: { pgCode },
        });
    }

    // Fallback
    const message =
        error instanceof Error ? error.message : "An unknown database error occurred";

    return new DatabaseError(message, { cause: error });
}
