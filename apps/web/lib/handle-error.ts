/**
 * Client-side error handler for tRPC errors.
 *
 * Extracts structured error information from tRPC error responses
 * and provides user-friendly notifications via the toast manager.
 *
 * Usage:
 *   onError: (err) => {
 *       notifyTRPCError(err);
 *   }
 */

import type { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "../trpc/routers/_app";
import { toast } from "./toast";

export type ParsedError = {
    /** User-friendly message suitable for display in a notification */
    message: string;
    /** Machine-readable error code for conditional handling */
    appCode: string;
    /** HTTP-equivalent status code */
    statusCode: number;
    /** Extra details (field errors, resource info, etc.) */
    details?: Record<string, unknown>;
};

/** Default user-friendly messages for known error codes */
const DEFAULT_MESSAGES: Record<string, string> = {
    AUTH_ERROR: "Please log in to continue",
    FORBIDDEN: "You don't have permission to do this",
    NOT_FOUND: "The requested item was not found",
    VALIDATION_ERROR: "Please check your input and try again",
    BAD_REQUEST: "The request could not be processed",
    CONFLICT: "This item already exists",
    DATABASE_ERROR: "A database error occurred. Please try again later.",
    RATE_LIMIT: "Too many requests — please slow down",
    EXTERNAL_SERVICE_ERROR: "An external service is temporarily unavailable. Please try again later.",
    SERVICE_UNAVAILABLE: "The service is temporarily unavailable. Please try again later.",
    TIMEOUT: "The operation timed out. Please try again.",
    INTERNAL_ERROR: "Something went wrong, please try again.",
};

/**
 * Parses any tRPC client error or unexpected error into a structured, user-friendly format.
 */
export function handleTRPCError(error: unknown): ParsedError {
    if (!error || typeof error !== "object") {
        return {
            message: DEFAULT_MESSAGES.INTERNAL_ERROR!,
            appCode: "INTERNAL_ERROR",
            statusCode: 500,
        };
    }

    const trpcErr = error as TRPCClientErrorLike<AppRouter>;
    const data = trpcErr.data as {
        appCode?: string;
        statusCode?: number;
        details?: Record<string, unknown>;
    } | undefined;

    const appCode = data?.appCode ?? "INTERNAL_ERROR";
    const statusCode = data?.statusCode ?? 500;
    const details = data?.details;

    // Prefer the server's message if it is non-generic, otherwise fall back to safe default
    const message =
        trpcErr.message &&
        trpcErr.message !== "An unexpected error occurred" &&
        trpcErr.message !== "INTERNAL_SERVER_ERROR"
            ? trpcErr.message
            : DEFAULT_MESSAGES[appCode] ?? DEFAULT_MESSAGES.INTERNAL_ERROR!;

    return { message, appCode, statusCode, details };
}

/**
 * Parses an error and automatically triggers a user-facing toast notification.
 */
export function notifyTRPCError(error: unknown, fallbackMessage?: string): ParsedError {
    const parsed = handleTRPCError(error);
    const displayMessage = fallbackMessage ?? parsed.message;

    const titleMap: Record<string, string> = {
        AUTH_ERROR: "Authentication Required",
        FORBIDDEN: "Access Denied",
        NOT_FOUND: "Not Found",
        VALIDATION_ERROR: "Validation Error",
        CONFLICT: "Conflict",
        RATE_LIMIT: "Rate Limit Exceeded",
        EXTERNAL_SERVICE_ERROR: "Service Error",
        TIMEOUT: "Timed Out",
        DATABASE_ERROR: "Database Error",
    };

    toast.error(displayMessage, {
        title: titleMap[parsed.appCode] ?? "Error",
    });

    return parsed;
}

/**
 * Returns true if the error is an auth error (401/403).
 */
export function isAuthError(error: unknown): boolean {
    const parsed = handleTRPCError(error);
    return parsed.appCode === "AUTH_ERROR" || parsed.appCode === "FORBIDDEN" || parsed.statusCode === 401 || parsed.statusCode === 403;
}

/**
 * Returns true if the error is a not-found error (404).
 */
export function isNotFoundError(error: unknown): boolean {
    const parsed = handleTRPCError(error);
    return parsed.appCode === "NOT_FOUND" || parsed.statusCode === 404;
}

/**
 * Returns true if the error is a validation error (400).
 */
export function isValidationError(error: unknown): boolean {
    const parsed = handleTRPCError(error);
    return parsed.appCode === "VALIDATION_ERROR" || parsed.statusCode === 400;
}
