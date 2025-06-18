import { load } from 'cheerio';
import { CronJob } from 'cron';
import got from 'got';
import Sentiment from 'sentiment';

import { prisma } from '@/utils/prisma';

// Initialize sentiment analyzer
const sentiment = new Sentiment();

// Article interface
interface ArticlePreview {
    title: string;
    url: string;
    source: string;
}

// Top news sites to scrape
const newsSites = [
    {
        name: 'CNN',
        url: 'https://www.cnn.com',
        selectors: {
            articles: '.container_lead-plus-headlines__item',
            title: '.container__headline-text',
            link: 'a',
        },
    },
    {
        name: 'BBC',
        url: 'https://www.bbc.com/news',
        selectors: {
            articles: '[data-indexcard="true"]', 
            title:  'h2',
            link: 'a',
        },
    },
    {
        name: 'The Guardian',
        url: 'https://www.theguardian.com/international',
        selectors: {
            articles: 'li',
            title: 'span',
            link: 'a',
        },
    },
    {
        name: 'Al Jazeera',
        url: 'https://www.aljazeera.com',
        selectors: {
            articles: '.article-card',
            title: '.article-card__title',
            link: 'a',
        },
    },
];

// Function to scrape a single news site
async function scrapeNewsSite(site: typeof newsSites[0]): Promise<ArticlePreview[]> {
    try {
        const response = await got.get(site.url);
        const $ = load(response.body);

        const articles: ArticlePreview[] = [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $(site.selectors.articles).each((i: number, el: any) => {
            // Limit to 10 articles per site
            if (i >= 10) return false;

            const titleEl = $(el).find(site.selectors.title);
            const title = titleEl.text().trim();

            if (!title) return;

            let link = $(el).find(site.selectors.link).attr('href');

            // Handle relative URLs
            if (link && !link.startsWith('http')) {
                link = new URL(link, site.url).toString();
            }

            if (!link) return;

            articles.push({
                title,
                url: link,
                source: site.name,
            });
        });
        console.log(site.name, articles.length, '\n');

        return articles;
    } catch (error) {
        console.error(`Error scraping ${site.name}:`, error);
        return [];
    }
}

// Function to get article content
async function getArticleContent(url: string): Promise<string> {
    try {
        const response = await got.get(url);
        const $ = load(response.body);

        // Remove script tags, style tags, and other non-content elements
        $('script, style, nav, header, footer, iframe, .advertisement').remove();

        // Get text from paragraphs
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const paragraphs = $('p').map((i: number, el: any) => $(el).text().trim()).get();

        return paragraphs.join(' ').slice(0, 5000); // Limit content to 5000 chars
    } catch (error) {
        console.error(`Error fetching article content from ${url}:`, error);
        return '';
    }
}

// Analyze sentiment of article content
function analyzeSentiment(content: string) {
    const result = sentiment.analyze(content);

    return {
        score: result.score,
        comparative: result.comparative,
        positive: result.positive,
        negative: result.negative,
    };
}

// Function to scrape all sites and save to DB
export async function scrapeAllSites(): Promise<void> {
    console.log('Starting news scraping...');

    try {
        // Scrape all sites in parallel
        const allArticlesArrays = await Promise.all(
            newsSites.map(site => scrapeNewsSite(site))
        );

        // Flatten the array of arrays
        const allArticles = allArticlesArrays.flat();

        console.log(`Found ${allArticles.length} articles`);

        // Process each article
        for (const article of allArticles) {
            // Check if article already exists in DB
            const existing = await prisma.newsArticle.findUnique({
                where: { url: article.url },
            });

            if (existing) continue;

            // Get article content
            const content = await getArticleContent(article.url);

            if (!content) continue;

            // Analyze sentiment
            const sentimentData = analyzeSentiment(content);

            // Save to database
            await prisma.newsArticle.create({
                data: {
                    title: article.title,
                    content,
                    url: article.url,
                    source: article.source,
                    publishedAt: new Date(),
                    sentimentData: {
                        create: {
                            score: sentimentData.score,
                            comparative: sentimentData.comparative,
                            positive: sentimentData.positive,
                            negative: sentimentData.negative,
                        },
                    },
                },
            });

            console.log(`Saved article: ${article.title}`);
        }

        console.log('Scraping completed successfully');
    } catch (error) {
        console.error('Error during scraping process:', error);
    }
}

// Set up cron job to run every hour
export const startScrapingScheduler = () => {
    const job = new CronJob('0 * * * *', async () => {
        await scrapeAllSites();
    });

    job.start();
    console.log('News scraping scheduler started');

    return job;
}; 