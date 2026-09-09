/**
 * Global error classes for the entire application.
 * These are thrown inside tRPC routers, database wrappers,
 * and any server-side code — then mapped to tRPC errors via the error handler.
 */

// ─── Base ────────────────────────────────────────────────────────────────────

export type AppErrorCode =
    | "AUTH_ERROR"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "VALIDATION_ERROR"
    | "CONFLICT"
    | "DATABASE_ERROR"
    | "RATE_LIMIT"
    | "EXTERNAL_SERVICE_ERROR"
    | "INTERNAL_ERROR";

export class AppError extends Error {
    public readonly code: AppErrorCode;
    public readonly statusCode: number;
    public readonly details?: Record<string, unknown>;

    constructor(opts: {
        code: AppErrorCode;
        message: string;
        statusCode: number;
        cause?: unknown;
        details?: Record<string, unknown>;
    }) {
        super(opts.message, { cause: opts.cause });
        this.name = this.constructor.name;
        this.code = opts.code;
        this.statusCode = opts.statusCode;
        this.details = opts.details;
    }
}

// ─── Auth ────────────────────────────────────────────────────────────────────

/** Thrown when a user is not authenticated (401). */
export class AuthError extends AppError {
    constructor(
        message = "You must be logged in to perform this action",
        opts?: { cause?: unknown; details?: Record<string, unknown> },
    ) {
        super({
            code: "AUTH_ERROR",
            message,
            statusCode: 401,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

/** Thrown when a user lacks permission (403). */
export class ForbiddenError extends AppError {
    constructor(
        message = "You do not have permission to perform this action",
        opts?: { cause?: unknown; details?: Record<string, unknown> },
    ) {
        super({
            code: "FORBIDDEN",
            message,
            statusCode: 403,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

// ─── Resource ────────────────────────────────────────────────────────────────

/** Thrown when a requested resource does not exist (404). */
export class NotFoundError extends AppError {
    constructor(
        resource = "Resource",
        opts?: { cause?: unknown; details?: Record<string, unknown> },
    ) {
        super({
            code: "NOT_FOUND",
            message: `${resource} not found`,
            statusCode: 404,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

// ─── Validation ──────────────────────────────────────────────────────────────

/** Thrown for input or business-rule validation failures (400). */
export class ValidationError extends AppError {
    constructor(
        message = "Validation failed",
        opts?: { cause?: unknown; details?: Record<string, unknown> },
    ) {
        super({
            code: "VALIDATION_ERROR",
            message,
            statusCode: 400,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

// ─── Conflict ────────────────────────────────────────────────────────────────

/** Thrown for duplicate / unique-constraint violations (409). */
export class ConflictError extends AppError {
    constructor(
        resource = "Resource",
        opts?: { cause?: unknown; details?: Record<string, unknown> },
    ) {
        super({
            code: "CONFLICT",
            message: `${resource} already exists`,
            statusCode: 409,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

// ─── Database ────────────────────────────────────────────────────────────────

/** Wraps Drizzle / Neon failures that aren't covered by a more specific class (500). */
export class DatabaseError extends AppError {
    constructor(
        message = "A database error occurred",
        opts?: { cause?: unknown; details?: Record<string, unknown> },
    ) {
        super({
            code: "DATABASE_ERROR",
            message,
            statusCode: 500,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

// ─── Rate Limit ──────────────────────────────────────────────────────────────

/** Thrown when a client exceeds the allowed request rate (429). */
export class RateLimitError extends AppError {
    constructor(
        message = "Too many requests, please try again later",
        opts?: { cause?: unknown; details?: Record<string, unknown> },
    ) {
        super({
            code: "RATE_LIMIT",
            message,
            statusCode: 429,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

// ─── External Service ────────────────────────────────────────────────────────

/** Thrown when a third-party service (LiveKit, S3, etc.) fails (502). */
export class ExternalServiceError extends AppError {
    constructor(
        service: string,
        opts?: { cause?: unknown; details?: Record<string, unknown> },
    ) {
        super({
            code: "EXTERNAL_SERVICE_ERROR",
            message: `External service failure: ${service}`,
            statusCode: 502,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

// ─── Internal ────────────────────────────────────────────────────────────────

/** Catch-all for unexpected / unclassified errors (500). */
export class InternalError extends AppError {
    constructor(
        message = "An unexpected error occurred",
        opts?: { cause?: unknown; details?: Record<string, unknown> },
    ) {
        super({
            code: "INTERNAL_ERROR",
            message,
            statusCode: 500,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}
