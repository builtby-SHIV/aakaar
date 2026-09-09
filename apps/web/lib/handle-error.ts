/**
 * Client-side error handler for tRPC errors.
 *
 * Extracts structured error information from tRPC error responses
 * and provides user-friendly messages for toast notifications.
 *
 * Usage with react-query's onError:
 *   onError: (err) => {
 *       const { message, appCode } = handleTRPCError(err);
 *       toast.error(message);
 *   }
 */

import type { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "../trpc/routers/_app";

export type ParsedError = {
    /** User-friendly message suitable for display in a toast */
    message: string;
    /** Machine-readable error code for conditional handling */
    appCode: string;
    /** HTTP-equivalent status code */
    statusCode: number;
    /** Extra details (field errors, resource info, etc.) */
    details?: Record<string, unknown>;
};

/** Default messages for known app error codes */
const DEFAULT_MESSAGES: Record<string, string> = {
    AUTH_ERROR: "Please log in to continue",
    FORBIDDEN: "You don't have permission to do this",
    NOT_FOUND: "The requested resource was not found",
    VALIDATION_ERROR: "Please check your input and try again",
    CONFLICT: "This resource already exists",
    DATABASE_ERROR: "Something went wrong, please try again",
    RATE_LIMIT: "Too many requests — please slow down",
    EXTERNAL_SERVICE_ERROR: "An external service is unavailable, please try again later",
    INTERNAL_ERROR: "Something went wrong, please try again",
};

/**
 * Parses a tRPC client error into a structured, user-friendly format.
 *
 * @example
 * ```tsx
 * const mutation = trpc.meeting.getToken.useMutation({
 *     onError: (err) => {
 *         const { message } = handleTRPCError(err);
 *         toast.error(message);
 *     },
 * });
 * ```
 */
export function handleTRPCError(
    error: TRPCClientErrorLike<AppRouter>,
): ParsedError {
    // tRPC attaches `data` to the error shape
    const data = error.data as {
        appCode?: string;
        statusCode?: number;
        details?: Record<string, unknown>;
    } | undefined;

    const appCode = data?.appCode ?? "INTERNAL_ERROR";
    const statusCode = data?.statusCode ?? 500;
    const details = data?.details;

    // Prefer the server's message if it's meaningful, otherwise use default
    const message =
        error.message && error.message !== "An unexpected error occurred"
            ? error.message
            : DEFAULT_MESSAGES[appCode] ?? DEFAULT_MESSAGES.INTERNAL_ERROR!;

    return { message, appCode, statusCode, details };
}

/**
 * Returns true if the error is an auth error (401/403).
 * Useful for triggering redirects to login.
 */
export function isAuthError(error: TRPCClientErrorLike<AppRouter>): boolean {
    const data = error.data as { appCode?: string } | undefined;
    return data?.appCode === "AUTH_ERROR" || data?.appCode === "FORBIDDEN";
}

/**
 * Returns true if the error is a not-found error (404).
 */
export function isNotFoundError(error: TRPCClientErrorLike<AppRouter>): boolean {
    const data = error.data as { appCode?: string } | undefined;
    return data?.appCode === "NOT_FOUND";
}
