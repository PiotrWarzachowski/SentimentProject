'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { FiChevronDown, FiExternalLink, FiLogOut, FiUser, FiBarChart2 } from 'react-icons/fi';
import { trpc } from '@/utils/trpc';
import Link from 'next/link';

type SentimentFilter = 'positive' | 'negative' | 'mixed';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>('mixed');

    // Use effect for redirection
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    // Conditionally execute queries based on authentication status
    const { data: news, isLoading: newsLoading } = trpc.news.getNews.useQuery(
        {
            sentiment: sentimentFilter,
            limit: 20,
        },
        {
            // Only run the query if the user is authenticated
            enabled: status === 'authenticated',
        }
    );

    const { data: stats } = trpc.news.getStats.useQuery(undefined, {
        // Only run the query if the user is authenticated
        enabled: status === 'authenticated',
    });

    // Handle loading state
    if (status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // If not authenticated, show loading while useEffect handles the redirect
    if (status === 'unauthenticated') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header/Nav */}
            <header className="bg-white border-b border-gray-200">
                <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
                    <Link href="/">
                        <h1 className="text-2xl font-bold text-blue-700 cursor-pointer hover:text-blue-800 transition-colors">SentiNews</h1>
                    </Link>

                    {session?.user && (
                        <div className="relative flex items-center">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 overflow-hidden">
                                    {session.user.image ? (
                                        <img
                                            src={session.user.image}
                                            alt={session.user.name || 'User'}
                                            className="h-10 w-10 object-cover"
                                        />
                                    ) : (
                                        <FiUser size={20} />
                                    )}
                                </div>
                                <span className="font-medium text-gray-800">{session.user.name}</span>
                            </div>

                            <button
                                onClick={() => signOut()}
                                className="ml-6 flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                            >
                                <FiLogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="mx-auto max-w-7xl p-6">
                {/* Stats */}
                {stats && (
                    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-4">
                        <div className="rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                                    <FiBarChart2 size={16} />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Total Articles</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                        </div>
                        <div className="rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="rounded-full bg-green-100 p-2 text-green-600">
                                    <FiBarChart2 size={16} />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Positive Articles</h3>
                            </div>
                            <p className="text-3xl font-bold text-green-600">{stats.positive}</p>
                        </div>
                        <div className="rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="rounded-full bg-red-100 p-2 text-red-600">
                                    <FiBarChart2 size={16} />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Negative Articles</h3>
                            </div>
                            <p className="text-3xl font-bold text-red-600">{stats.negative}</p>
                        </div>
                        <div className="rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="rounded-full bg-gray-100 p-2 text-gray-600">
                                    <FiBarChart2 size={16} />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Neutral Articles</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-700">{stats.neutral}</p>
                        </div>
                    </div>
                )}

                {/* Filter */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">News Articles</h2>

                    <div className="flex w-full md:w-auto items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">Filter by sentiment:</span>
                        <div className="relative w-full md:w-auto">
                            <select
                                value={sentimentFilter}
                                onChange={(e) => setSentimentFilter(e.target.value as SentimentFilter)}
                                className="appearance-none w-full md:w-auto rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="mixed">All Articles</option>
                                <option value="positive">Positive Only</option>
                                <option value="negative">Negative Only</option>
                            </select>
                            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Articles List */}
                {newsLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {news?.map((article) => (
                            <div key={article.id} className="flex flex-col rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
                                <div className="flex-1 p-5">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                            {article.source}
                                        </span>

                                        {article.sentimentData && (
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${article.sentimentData.score > 0
                                                ? 'bg-green-100 text-green-700'
                                                : article.sentimentData.score < 0
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                Score: {article.sentimentData.score}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-tight text-gray-800">
                                        {article.title}
                                    </h3>

                                    <p className="mb-5 line-clamp-3 text-sm text-gray-700">
                                        {article.content.slice(0, 150)}...
                                    </p>
                                </div>

                                <div className="border-t border-gray-100 p-4">
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        <span>Read Full Article</span>
                                        <FiExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        ))}

                        {news?.length === 0 && (
                            <div className="col-span-full rounded-xl border border-gray-200 bg-white p-8 text-center">
                                <p className="text-gray-700">No articles found with the selected filter.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
} 