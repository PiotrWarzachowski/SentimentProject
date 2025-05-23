import { initTRPC, TRPCError } from '@trpc/server';
import { getServerSession } from 'next-auth';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * Context for tRPC requests
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
    const session = await getServerSession(authOptions);

    return {
        session,
        headers: opts.headers,
    };
};

/**
 * Initialize tRPC
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

/**
 * Export reusable router and procedure helpers
 */
export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Protected procedure - requires user to be logged in
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            ...ctx,
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
}); 