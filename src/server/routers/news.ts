import { z } from 'zod';

import { prisma } from '@/utils/prisma';
import { publicProcedure, protectedProcedure, router } from '@/server/trpc';

export const newsRouter = router({
    getNews: protectedProcedure
        .input(
            z.object({
                sentiment: z.enum(['positive', 'negative', 'mixed']).default('mixed'),
                limit: z.number().min(1).max(100).default(10),
            })
        )
        .query(async ({ input }) => {
            const { sentiment, limit } = input;

            let articles;

            if (sentiment === 'positive') {
                // Get positive news (sentiment score > 0)
                // Sort from highest positive to lowest positive score
                articles = await prisma.newsArticle.findMany({
                    where: {
                        sentimentData: {
                            score: {
                                gt: 0,
                            },
                        },
                    },
                    include: {
                        sentimentData: true,
                    },
                    take: limit,
                    orderBy: {
                        sentimentData: {
                            score: 'desc', // Highest positive score first
                        },
                    },
                });
            } else if (sentiment === 'negative') {
                // Get negative news (sentiment score < 0)
                // Sort from most negative to least negative score
                articles = await prisma.newsArticle.findMany({
                    where: {
                        sentimentData: {
                            score: {
                                lt: 0,
                            },
                        },
                    },
                    include: {
                        sentimentData: true,
                    },
                    take: limit,
                    orderBy: {
                        sentimentData: {
                            score: 'asc', // Most negative (lowest) score first
                        },
                    },
                });
            } else {
                // Get all news - no sentiment-based sorting
                articles = await prisma.newsArticle.findMany({
                    include: {
                        sentimentData: true,
                    },
                    take: limit,
                    orderBy: {
                        publishedAt: 'desc', // Newest first
                    },
                });
            }

            return articles;
        }),

    getStats: publicProcedure.query(async () => {
        const totalArticles = await prisma.newsArticle.count();

        const positiveArticles = await prisma.newsArticle.count({
            where: {
                sentimentData: {
                    score: {
                        gt: 0,
                    },
                },
            },
        });

        const negativeArticles = await prisma.newsArticle.count({
            where: {
                sentimentData: {
                    score: {
                        lt: 0,
                    },
                },
            },
        });

        const neutralArticles = totalArticles - positiveArticles - negativeArticles;

        return {
            total: totalArticles,
            positive: positiveArticles,
            negative: negativeArticles,
            neutral: neutralArticles,
        };
    }),
}); 