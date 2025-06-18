import { CronJob } from 'cron';
import { prisma } from '@/utils/prisma';

/**
 * Function to clean up old news articles from the database
 * Removes articles that are older than 3 days
 */
export async function cleanupOldArticles(): Promise<void> {
    console.log('Starting article cleanup process...');

    try {
        // Calculate the date 3 days ago
        const thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() - 3);

        // Find and delete articles older than 3 days
        const deletedArticles = await prisma.newsArticle.deleteMany({
            where: {
                publishedAt: {
                    lt: thresholdDate,
                },
            },
        });

        console.log(`Cleanup complete. Removed ${deletedArticles.count} articles older than 3 days.`);
    } catch (error) {
        console.error('Error during article cleanup:', error);
    }
}

/**
 * Starts a scheduled job to clean up old articles
 * Runs daily at midnight (0 0 * * *)
 */
export const startCleanupScheduler = () => {
    // Run cleanup job daily at midnight
    const job = new CronJob('0 0 * * *', async () => {
        await cleanupOldArticles();
    });

    job.start();
    console.log('News article cleanup scheduler started');

    return job;
}; 