import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/utils/prisma';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: process.env.NODE_ENV === 'development',
    logger: {
        error(code, metadata) {
            console.error(`Auth Error: ${code}`, metadata);
        },
        warn(code) {
            console.warn(`Auth Warning: ${code}`);
        },
        debug(code, metadata) {
            console.log(`Auth Debug: ${code}`, metadata);
        },
    },
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub!;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id;
            }
            return token;
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
};

// Create a simple handler that just passes through to NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 