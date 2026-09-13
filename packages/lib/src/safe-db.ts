import {
    ConflictError,
    DatabaseError,
    NotFoundError,
    ValidationError,
    type AppError,
} from "./errors";

/**
 * Wraps any database operation and translates low-level SQL errors
 * into application-level error classes.
 */
export async function withDb<T>(fn: () => Promise<T>): Promise<T> {
    try {
        return await fn();
    } catch (error: unknown) {
        throw mapDatabaseError(error);
    }
}

export function mapDatabaseError(error: unknown): AppError {
    // If it's already an AppError, re-throw as is
    if (error && typeof error === "object" && "code" in error && "statusCode" in error)
        return error as AppError;

    const rawError = error as {
        code?: string;
        message?: string;
        detail?: string;
        constraint?: string;
        table?: string;
    } | null | undefined;

    const pgCode = rawError?.code;
    const internalMessage = rawError?.message || "Unknown database error";

    if (pgCode === "23505") {
        return new ConflictError("A record with these details already exists", {
            cause: error,
            details: { pgCode, constraint: rawError?.constraint },
        });
    }

    if (pgCode === "23503") {
        return new NotFoundError("Referenced resource", {
            cause: error,
            details: { pgCode, constraint: rawError?.constraint },
        });
    }

    if (pgCode === "23502") {
        return new ValidationError("A required database field was missing", {
            cause: error,
            details: { pgCode, table: rawError?.table },
        });
    }

    if (pgCode === "23514") {
        return new ValidationError("A database constraint check failed", {
            cause: error,
            details: { pgCode, constraint: rawError?.constraint },
        });
    }

    if (pgCode?.startsWith("08")) {
        return new DatabaseError(DatabaseError.NON_SPECIFIC_MESSAGE, {
            cause: error,
            internalMessage: `Database connection error (${pgCode}): ${internalMessage}`,
            details: { pgCode },
        });
    }

    if (pgCode?.startsWith("57")) {
        return new DatabaseError("Database operation timed out. Please try again.", {
            cause: error,
            internalMessage: `Database query timed out (${pgCode}): ${internalMessage}`,
            details: { pgCode },
        });
    }

    return new DatabaseError(DatabaseError.NON_SPECIFIC_MESSAGE, {
        cause: error,
        internalMessage,
        details: { pgCode },
    });
}

export function isDatabaseError(error: unknown): boolean {
    if (!error || typeof error !== "object") return false;
    const err = error as { code?: string; routine?: string; severity?: string };
    return (
        typeof err.code === "string" &&
        (err.code.length === 5 || err.severity !== undefined || err.routine !== undefined)
    );
}
