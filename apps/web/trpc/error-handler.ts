/**
 * tRPC error formatter, mapper, and logging handler.
 *
 * - `mapToTRPCError` converts any AppError, database error, or unknown error into a TRPCError.
 * - `errorFormatter` enriches and sanitizes the error payload sent to the client.
 * - `onErrorHandler` logs full diagnostics server-side without leaking sensitive details to clients.
 */
import { TRPCError } from "@trpc/server";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";
import {
    AppError,
    DatabaseError,
    InternalError,
    isAppError,
    type AppErrorCode,
} from "@repo/lib/errors";
import { isDatabaseError, mapDatabaseError } from "@repo/lib/safe-db";

// ─── AppError → tRPC code mapping ───────────────────────────────────────────

const APP_TO_TRPC_CODE: Record<AppErrorCode, TRPC_ERROR_CODE_KEY> = {
    AUTH_ERROR: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    VALIDATION_ERROR: "BAD_REQUEST",
    BAD_REQUEST: "BAD_REQUEST",
    CONFLICT: "CONFLICT",
    DATABASE_ERROR: "INTERNAL_SERVER_ERROR",
    RATE_LIMIT: "TOO_MANY_REQUESTS",
    EXTERNAL_SERVICE_ERROR: "INTERNAL_SERVER_ERROR",
    SERVICE_UNAVAILABLE: "INTERNAL_SERVER_ERROR",
    TIMEOUT: "TIMEOUT",
    INTERNAL_ERROR: "INTERNAL_SERVER_ERROR",
};

// ─── Mapper ──────────────────────────────────────────────────────────────────

/**
 * Converts any thrown error (AppError, Drizzle/Postgres error, or unknown error)
 * into a well-formed TRPCError.
 *
 * Guaranteed to sanitize database and internal errors to non-specific client messages.
 */
export function mapToTRPCError(error: unknown): TRPCError {
    // Already a TRPCError
    if (error instanceof TRPCError) {
        // If the cause is an AppError or raw DB error, refine it
        if (error.cause && isAppError(error.cause)) {
            return new TRPCError({
                code: APP_TO_TRPC_CODE[error.cause.code] ?? error.code,
                message: error.cause.getSafeClientMessage(),
                cause: error.cause,
            });
        }
        if (error.cause && isDatabaseError(error.cause)) {
            const dbAppError = mapDatabaseError(error.cause);
            return new TRPCError({
                code: APP_TO_TRPC_CODE[dbAppError.code] ?? "INTERNAL_SERVER_ERROR",
                message: dbAppError.getSafeClientMessage(),
                cause: dbAppError,
            });
        }
        return error;
    }

    // Direct AppError
    if (isAppError(error))
        return new TRPCError({
            code: APP_TO_TRPC_CODE[error.code] ?? "INTERNAL_SERVER_ERROR",
            message: error.getSafeClientMessage(),
            cause: error,
        });

    // Uncaught raw database error (e.g. from Neon / Drizzle directly)
    if (isDatabaseError(error)) {
        const dbAppError = mapDatabaseError(error);
        return new TRPCError({
            code: APP_TO_TRPC_CODE[dbAppError.code] ?? "INTERNAL_SERVER_ERROR",
            message: dbAppError.getSafeClientMessage(),
            cause: dbAppError,
        });
    }

    // Standard JavaScript Error / unknown error
    const internalErr = new InternalError(
        InternalError.NON_SPECIFIC_MESSAGE,
        {
            cause: error,
            internalMessage: error instanceof Error ? error.message : "Unknown error",
        }
    );

    return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: internalErr.getSafeClientMessage(),
        cause: internalErr,
    });
}

// ─── Error Formatter ─────────────────────────────────────────────────────────

export interface FormattedErrorShape {
    message: string;
    code: number;
    data: {
        code: string;
        httpStatus: number;
        path?: string;
        stack?: string;
        appCode: AppErrorCode;
        statusCode: number;
        details?: Record<string, unknown>;
    };
}

/**
 * Enriches the error shape returned over HTTP with our typed app fields.
 * Sanitizes messages so clients never receive raw database queries or secrets.
 */
export const errorFormatter = ({
    shape,
    error,
}: {
    shape: {
        message: string;
        code: number;
        data: {
            code: string;
            httpStatus: number;
            path?: string;
            stack?: string;
        };
    };
    error: { cause?: unknown; message: string; code: string };
}) => {
    const cause = error.cause;
    const isApp = isAppError(cause);

    const appCode: AppErrorCode = isApp
        ? cause.code
        : error.code === "UNAUTHORIZED"
            ? "AUTH_ERROR"
            : error.code === "FORBIDDEN"
                ? "FORBIDDEN"
                : error.code === "NOT_FOUND"
                    ? "NOT_FOUND"
                    : error.code === "BAD_REQUEST"
                        ? "VALIDATION_ERROR"
                        : error.code === "CONFLICT"
                            ? "CONFLICT"
                            : error.code === "TOO_MANY_REQUESTS"
                                ? "RATE_LIMIT"
                                : error.code === "TIMEOUT"
                                    ? "TIMEOUT"
                                    : "INTERNAL_ERROR";

    const statusCode = isApp ? cause.statusCode : shape.data.httpStatus;

    // Determine user-safe message
    let safeMessage: string;
    if (isApp)
        safeMessage = cause.getSafeClientMessage();
    else if (shape.data.httpStatus >= 500 && process.env.NODE_ENV === "production")
        safeMessage = "An unexpected error occurred. Please try again later.";
    else 
        safeMessage = shape.message;

    return {
        ...shape,
        message: safeMessage,
        data: {
            ...shape.data,
            appCode,
            statusCode,
            details: isApp ? cause.details : undefined,
            // Hide stack traces in production
            stack: process.env.NODE_ENV === "production" ? undefined : shape.data.stack,
        },
    };
};

/**
 * Server-side error logger for tRPC route handler.
 */
export const onErrorHandler = ({
    error,
    path,
    req,
}: {
    error: TRPCError;
    path?: string;
    req?: Request;
}) => {
    const isServerError =
        error.code === "INTERNAL_SERVER_ERROR" ||
        error.code === "TIMEOUT";

    const errorDetails = {
        code: error.code,
        message: error.message,
        path: path ?? "unknown",
        url: req?.url,
        cause: error.cause,
        stack: error.stack,
    };

    if (isServerError)
        console.error(`[tRPC 5xx] Error on "${path ?? "unknown"}":`, errorDetails);
    else {
        console.warn(`[tRPC ${error.code}] Warning on "${path ?? "unknown"}":`, {
            message: error.message,
            path: path ?? "unknown",
        });
    }
};
