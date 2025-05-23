'use client';

import { SessionProvider } from 'next-auth/react';
import { TRPCProvider } from '@/utils/trpc';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider refetchInterval={0}>
            <TRPCProvider>{children}</TRPCProvider>
        </SessionProvider>
    );
} 