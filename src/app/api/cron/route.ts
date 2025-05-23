import { scrapeAllSites } from '@/server/services/scraper';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await scrapeAllSites();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error running cron job:', error);
        return NextResponse.json({ success: false, error: 'Failed to run scraper' }, { status: 500 });
    }
} 