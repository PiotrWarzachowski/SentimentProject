import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from '@/server/routers/_app';
import { createTRPCContext } from '@/server/trpc';

const handler = (req: Request) => {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => createTRPCContext({ headers: req.headers }),
    });
};

export { handler as GET, handler as POST }; 