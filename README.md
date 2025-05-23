# SentiNews - News with Sentiment Analysis

A Next.js application that scrapes popular news sites, analyzes their sentiment, and allows users to filter news by positive, negative, or mixed sentiments.

## Features

- Modern UI with blue-white color palette using TailwindCSS
- User authentication with NextAuth (GitHub and Google providers)
- News articles scraped from top 5 news sites
- Sentiment analysis of article content
- Filter news by positive or negative sentiment
- Hourly cron job for fresh content
- tRPC API for type-safe client-server communication
- PostgreSQL database with Prisma ORM

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- TailwindCSS
- tRPC
- NextAuth
- Prisma ORM
- PostgreSQL
- Sentiment
- Got for web scraping
- Cheerio for HTML parsing
- React Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd sentiment-project
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:

   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/sentiment_db"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"

   # GitHub OAuth
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. Initialize the database:

   ```
   npx prisma migrate dev --name init
   ```

5. Generate Prisma client:

   ```
   npx prisma generate
   ```

6. Run the development server:

   ```
   npm run dev
   ```

## Project Structure

- `/prisma` - Database schema and migrations
- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/server` - tRPC API and server-side code
- `/src/utils` - Utility functions
- `/src/types` - TypeScript type definitions

## Scraping Schedule

The application scrapes news from the configured sites using a cron job that runs every hour. The initial scrape is performed automatically when the application starts in development mode.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## OAuth Setup

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on "New OAuth App"
3. Fill in the application details:
   - Application name: SentiNews (or your preferred name)
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github
4. Register the application
5. Copy the Client ID and generate a new Client Secret
6. Add these values to your `.env.local` file

### Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure the OAuth consent screen if prompted
6. For Application type, select "Web application"
7. Add authorized JavaScript origins: http://localhost:3000
8. Add authorized redirect URIs: http://localhost:3000/api/auth/callback/google
9. Click "Create"
10. Copy the Client ID and Client Secret
11. Add these values to your `.env.local` file
