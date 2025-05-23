'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

export default function AuthError() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const error = searchParams.get('error');

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-6 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <FiAlertCircle size={32} />
                    </div>
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">Authentication Error</h1>

                    {error ? (
                        <p className="text-gray-600">
                            Error: {error}
                        </p>
                    ) : (
                        <p className="text-gray-600">
                            There was a problem authenticating your account.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => router.push('/auth/signin')}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={() => router.push('/')}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        <FiArrowLeft size={18} />
                        <span>Back to Home</span>
                    </button>
                </div>
            </div>
        </div>
    );
} 