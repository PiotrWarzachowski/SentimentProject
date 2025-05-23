'use client';

import { signIn } from 'next-auth/react';
import { FiGithub, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
    const router = useRouter();
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);

    const handleSignIn = async (provider: string) => {
        if (provider === 'github') {
            setIsGithubLoading(true);
        } else if (provider === 'google') {
            setIsGoogleLoading(true);
        }

        await signIn(provider, { callbackUrl: '/dashboard' });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">Welcome to SentiNews</h1>
                    <p className="text-gray-600">Sign in to access sentiment-filtered news</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleSignIn('github')}
                        disabled={isGithubLoading || isGoogleLoading}
                        className="relative flex w-full items-center justify-center gap-3 rounded-lg bg-gray-900 px-6 py-4 text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-70"
                    >
                        {isGithubLoading ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                        ) : (
                            <FiGithub size={20} />
                        )}
                        <span className="font-medium">{isGithubLoading ? 'Signing in...' : 'Continue with GitHub'}</span>
                    </button>

                    <button
                        onClick={() => handleSignIn('google')}
                        disabled={isGithubLoading || isGoogleLoading}
                        className="relative flex w-full items-center justify-center gap-3 rounded-lg bg-white border border-gray-300 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-70"
                    >
                        {isGoogleLoading ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M21.6 12.227c0-.709-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35Z" />
                                <path fill="#34A853" d="M12 22c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H3.064v2.59A9.996 9.996 0 0 0 12 22Z" />
                                <path fill="#FBBC05" d="M6.405 13.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V7.51H3.064A9.996 9.996 0 0 0 2 12c0 1.614.386 3.14 1.064 4.49l3.34-2.59Z" />
                                <path fill="#EA4335" d="M12 5.977c1.467 0 2.786.505 3.823 1.496l2.868-2.868C16.959 2.99 14.695 2 12 2 8.09 2 4.71 4.24 3.064 7.51l3.34 2.59C7.192 7.736 9.396 5.977 12 5.977Z" />
                            </svg>
                        )}
                        <span className="font-medium">{isGoogleLoading ? 'Signing in...' : 'Continue with Google'}</span>
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-4 text-sm text-gray-500">or</span>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push('/')}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-4 text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    >
                        <FiArrowLeft size={18} />
                        <span className="font-medium">Back to Home</span>
                    </button>
                </div>

                <div className="mt-8 text-center text-xs text-gray-500">
                    <p>
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
} 