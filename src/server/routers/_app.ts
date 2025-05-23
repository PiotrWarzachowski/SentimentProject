import { router } from '@/server/trpc';
import { newsRouter } from '@/server/routers/news';

export const appRouter = router({
    news: newsRouter,
});

export type AppRouter = typeof appRouter; 