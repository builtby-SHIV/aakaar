import { initTRPC } from '@trpc/server';
import { auth } from '../app/auth';
import { AuthError } from '@repo/lib/errors';
import { errorFormatter, mapToTRPCError } from './error-handler';

/**
 * This context creator accepts `headers` so it can be reused in both
 * the RSC server caller (where you pass `next/headers`) and the
 * API route handler (where you pass the request headers).
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
    const session = await auth(); // reads the session from cookies server-side
    return {
        session,
        headers: opts.headers,
    };
};

const t = initTRPC
    .context<Awaited<ReturnType<typeof createTRPCContext>>>()
    .create({
        errorFormatter,
    });

/**
 * Global procedure middleware that catches any thrown error
 * (including AppError subclasses and raw database errors),
 * mapping them into safe, well-formed TRPCErrors.
 */
export const errorHandlingMiddleware = t.middleware(async ({ next }) => {
    const result = await next();
    if (!result.ok)
        throw mapToTRPCError(result.error.cause ?? result.error);

    return result;
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

// Base procedure equipped with error middleware
export const baseProcedure = t.procedure.use(errorHandlingMiddleware);

// Protected procedure verifying user authentication
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
    if (!ctx.session?.user?.id)
        throw new AuthError("You must be logged in to perform this action");

    return next({
        ctx: {
            ...ctx,
            session: { ...ctx.session, user: ctx.session.user }, // now userId is guaranteed non-null downstream
        },
    });
});