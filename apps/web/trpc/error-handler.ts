/**
 * tRPC error formatter and onError handler.
 *
 * - `errorFormatter` shapes the error payload sent to the client.
 * - `onErrorHandler` logs server-side errors.
 * - `mapToTRPCError` converts any AppError / unknown error into a TRPCError.
 */
import { TRPCError } from "@trpc/server";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";
import {
    AppError,
    type AppErrorCode,
} from "@repo/lib/errors";

// ─── AppError → tRPC code mapping ───────────────────────────────────────────

const APP_TO_TRPC_CODE: Record<AppErrorCode, TRPC_ERROR_CODE_KEY> = {
    AUTH_ERROR: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    VALIDATION_ERROR: "BAD_REQUEST",
    CONFLICT: "CONFLICT",
    DATABASE_ERROR: "INTERNAL_SERVER_ERROR",
    RATE_LIMIT: "TOO_MANY_REQUESTS",
    EXTERNAL_SERVICE_ERROR: "INTERNAL_SERVER_ERROR",
    INTERNAL_ERROR: "INTERNAL_SERVER_ERROR",
};

// ─── Mapper ──────────────────────────────────────────────────────────────────

/**
 * Converts any thrown value into a well-formed TRPCError.
 * - AppError subclasses → mapped automatically.
 * - TRPCError → passed through (e.g., Zod validation errors from tRPC).
 * - Unknown errors → sanitised INTERNAL_SERVER_ERROR.
 */
export function mapToTRPCError(error: unknown): TRPCError {
    if (error instanceof TRPCError) {
        return error;
    }

    if (error instanceof AppError) {
        return new TRPCError({
            code: APP_TO_TRPC_CODE[error.code],
            message: error.message,
            cause: error,
        });
    }

    // Unknown error — sanitise so internals never leak
    return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
        cause: error,
    });
}

// ─── Error Formatter ─────────────────────────────────────────────────────────

/**
 * Enriches the error shape returned to the client with our app-specific fields.
 * Plug this into `initTRPC.create({ errorFormatter })`.
 */
export const errorFormatter = ({ shape, error }: {
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
    error: { cause?: unknown };
}) => {
    const cause = error.cause;
    const isAppError = cause instanceof AppError;

    return {
        ...shape,
        data: {
            ...shape.data,
            appCode: isAppError ? cause.code : "INTERNAL_ERROR",
            statusCode: isAppError ? cause.statusCode : shape.data.httpStatus,
            details: isAppError ? cause.details : undefined,
            // Remove stack in production
            stack: process.env.NODE_ENV === "production" ? undefined : shape.data.stack,
        },
    };
};

// ─── onError Handler ─────────────────────────────────────────────────────────

/**
 * Server-side error logging hook.
 * Plug this into `initTRPC.create()` via the tRPC config.
 */
export const onErrorHandler = ({ error, path }: {
    error: TRPCError;
    path?: string;
}) => {
    // Always log 5xx errors with full stack
    if (
        error.code === "INTERNAL_SERVER_ERROR" ||
        error.code === "TOO_MANY_REQUESTS"
    ) {
        console.error(`[tRPC] ❌ ${error.code} on "${path ?? "unknown"}":`, {
            message: error.message,
            cause: error.cause,
            stack: error.stack,
        });
    } else {
        // 4xx — log at warn level without stack
        console.warn(`[tRPC] ⚠️ ${error.code} on "${path ?? "unknown"}":`, error.message);
    }
};
