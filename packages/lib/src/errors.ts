export type AppErrorCode =
    | "AUTH_ERROR"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "VALIDATION_ERROR"
    | "BAD_REQUEST"
    | "CONFLICT"
    | "DATABASE_ERROR"
    | "RATE_LIMIT"
    | "EXTERNAL_SERVICE_ERROR"
    | "SERVICE_UNAVAILABLE"
    | "TIMEOUT"
    | "INTERNAL_ERROR";

export class AppError extends Error {
    public readonly isAppError: true = true;
    public readonly code: AppErrorCode;
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly clientMessage?: string;
    public readonly details?: Record<string, unknown>;

    constructor(opts: {
        code: AppErrorCode;
        message: string;
        statusCode: number;
        clientMessage?: string;
        isOperational?: boolean;
        cause?: unknown;
        details?: Record<string, unknown>;
    }) {
        super(opts.message, { cause: opts.cause });
        this.name = this.constructor.name;
        this.code = opts.code;
        this.statusCode = opts.statusCode;
        this.clientMessage = opts.clientMessage;
        this.isOperational = opts.isOperational ?? true;
        this.details = opts.details;

        Object.setPrototypeOf(this, new.target.prototype);
    }

    public getSafeClientMessage(): string {
        return this.clientMessage ?? this.message;
    }
}

export class AuthError extends AppError {
    constructor(
        message = "You must be logged in to perform this action",
        opts?: { cause?: unknown; details?: Record<string, unknown>; clientMessage?: string },
    ) {
        super({
            code: "AUTH_ERROR",
            message,
            statusCode: 401,
            clientMessage: opts?.clientMessage ?? message,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

export class ForbiddenError extends AppError {
    constructor(
        message = "You do not have permission to perform this action",
        opts?: { cause?: unknown; details?: Record<string, unknown>; clientMessage?: string },
    ) {
        super({
            code: "FORBIDDEN",
            message,
            statusCode: 403,
            clientMessage: opts?.clientMessage ?? message,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

export class NotFoundError extends AppError {
    constructor(
        resource = "Resource",
        opts?: { cause?: unknown; details?: Record<string, unknown>; clientMessage?: string },
    ) {
        const msg = `${resource} not found`;
        super({
            code: "NOT_FOUND",
            message: msg,
            statusCode: 404,
            clientMessage: opts?.clientMessage ?? msg,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

export class ValidationError extends AppError {
    constructor(
        message = "Validation failed",
        opts?: { cause?: unknown; details?: Record<string, unknown>; clientMessage?: string },
    ) {
        super({
            code: "VALIDATION_ERROR",
            message,
            statusCode: 400,
            clientMessage: opts?.clientMessage ?? message,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

export class BadRequestError extends AppError {
    constructor(
        message = "Bad request",
        opts?: { cause?: unknown; details?: Record<string, unknown>; clientMessage?: string },
    ) {
        super({
            code: "BAD_REQUEST",
            message,
            statusCode: 400,
            clientMessage: opts?.clientMessage ?? message,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

export class ConflictError extends AppError {
    constructor(
        resource = "Resource",
        opts?: { cause?: unknown; details?: Record<string, unknown>; clientMessage?: string },
    ) {
        const msg = resource.includes(" ") ? resource : `${resource} already exists`;
        super({
            code: "CONFLICT",
            message: msg,
            statusCode: 409,
            clientMessage: opts?.clientMessage ?? msg,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

export class DatabaseError extends AppError {
    public static readonly NON_SPECIFIC_MESSAGE = "A database error occurred. Please try again later.";

    constructor(
        message = DatabaseError.NON_SPECIFIC_MESSAGE,
        opts?: {
            cause?: unknown;
            details?: Record<string, unknown>;
            internalMessage?: string;
        },
    ) {
        super({
            code: "DATABASE_ERROR",
            message: opts?.internalMessage ?? message,
            statusCode: 500,
            clientMessage: DatabaseError.NON_SPECIFIC_MESSAGE,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

export class RateLimitError extends AppError {
    constructor(
        message = "Too many requests, please try again later",
        opts?: { cause?: unknown; details?: Record<string, unknown>; clientMessage?: string },
    ) {
        super({
            code: "RATE_LIMIT",
            message,
            statusCode: 429,
            clientMessage: opts?.clientMessage ?? message,
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

export class ExternalServiceError extends AppError {
    constructor(
        service: string,
        opts?: { cause?: unknown; details?: Record<string, unknown>; clientMessage?: string },
    ) {
        const msg = `External service failure: ${service}`;
        super({
            code: "EXTERNAL_SERVICE_ERROR",
            message: msg,
            statusCode: 502,
            clientMessage: opts?.clientMessage ?? "An external service error occurred. Please try again later.",
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

export class ServiceUnavailableError extends AppError {
    constructor(
        service = "Service",
        opts?: { cause?: unknown; details?: Record<string, unknown>; clientMessage?: string },
    ) {
        const msg = `${service} is temporarily unavailable`;
        super({
            code: "SERVICE_UNAVAILABLE",
            message: msg,
            statusCode: 503,
            clientMessage: opts?.clientMessage ?? "The service is temporarily unavailable. Please try again later.",
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

export class TimeoutError extends AppError {
    constructor(
        operation = "Operation",
        opts?: { cause?: unknown; details?: Record<string, unknown>; clientMessage?: string },
    ) {
        const msg = `${operation} timed out`;
        super({
            code: "TIMEOUT",
            message: msg,
            statusCode: 504,
            clientMessage: opts?.clientMessage ?? "The request timed out. Please try again.",
            cause: opts?.cause,
            details: opts?.details,
        });
    }
}

export class InternalError extends AppError {
    public static readonly NON_SPECIFIC_MESSAGE = "An unexpected error occurred. Please try again later.";

    constructor(
        message = InternalError.NON_SPECIFIC_MESSAGE,
        opts?: {
            cause?: unknown;
            details?: Record<string, unknown>;
            internalMessage?: string;
        },
    ) {
        super({
            code: "INTERNAL_ERROR",
            message: opts?.internalMessage ?? message,
            statusCode: 500,
            clientMessage: InternalError.NON_SPECIFIC_MESSAGE,
            cause: opts?.cause,
            details: opts?.details,
            isOperational: false,
        });
    }
}

export function isAppError(error: unknown): error is AppError {
    return (
        error instanceof AppError ||
        (typeof error === "object" &&
            error !== null &&
            (error as { isAppError?: boolean }).isAppError === true)
    );
}
