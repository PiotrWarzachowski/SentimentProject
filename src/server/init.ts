import { startScrapingScheduler, scrapeAllSites } from '@/server/services/scraper';
import { startCleanupScheduler, cleanupOldArticles } from '@/server/services/cleanup';

let scraperJob: ReturnType<typeof startScrapingScheduler> | null = null;
let cleanupJob: ReturnType<typeof startCleanupScheduler> | null = null;

export const initializeApp = async () => {
    // Start the scraper and cleanup jobs in production
    if (process.env.NODE_ENV === 'production') {
        if (!scraperJob) {
            scraperJob = startScrapingScheduler();
        }
        if (!cleanupJob) {
            cleanupJob = startCleanupScheduler();
        }
    }

    // Perform an initial scraping in development for testing
    if (process.env.NODE_ENV !== 'production') {
        try {
            await scrapeAllSites();
            // Uncomment to test cleanup on startup (be careful as it will delete old articles)
            await cleanupOldArticles();
        } catch (error) {
            console.error('Error running initial tasks:', error);
        }
    }
};

export const shutdownApp = () => {
    if (scraperJob) {
        scraperJob.stop();
        scraperJob = null;
    }

    if (cleanupJob) {
        cleanupJob.stop();
        cleanupJob = null;
    }
}; 