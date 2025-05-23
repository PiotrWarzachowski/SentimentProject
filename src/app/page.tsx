'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FiBarChart2, FiFilter, FiRefreshCw, FiUser, FiLogOut, FiChevronDown, FiExternalLink } from 'react-icons/fi';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-indigo-100 opacity-50 blur-3xl"></div>
        </div>

        <div className="w-full max-w-4xl text-center relative z-10">
          <h1 className="mb-4 text-5xl font-bold text-blue-700 md:text-7xl">
            SentiNews
          </h1>
          <p className="mb-8 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover news sorted by sentiment analysis. Filter news by positive, negative, or mixed sentiments.
          </p>

          <div className="mb-12 flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0 justify-center">
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-md">
                <FiBarChart2 size={28} />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Sentiment Analytics</h2>
              <p className="text-gray-600">Get insights into news sentiment</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-md">
                <FiFilter size={28} />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Smart Filtering</h2>
              <p className="text-gray-600">Choose positive or negative news</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-md">
                <FiRefreshCw size={28} />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Hourly Updates</h2>
              <p className="text-gray-600">Fresh content from top sources</p>
            </div>
          </div>

          {status === 'unauthenticated' && (
            <button
              onClick={() => router.push('/auth/signin')}
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
            >
              Sign in to continue
            </button>
          )}

          {status === 'authenticated' && (
            <button
              onClick={() => router.push('/dashboard')}
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
            >
              Go to Dashboard
            </button>
          )}

          {status === 'loading' && (
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Dashboard Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Dashboard</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access a beautifully designed dashboard to view and filter news by sentiment score
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              {/* macOS-style traffic light buttons */}
              <div className="bg-blue-600 p-3 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              {/* Dashboard Header/Navigation */}
              <div className="bg-white border-b border-gray-200">
                <div className="flex items-center justify-between p-4">
                  <h1 className="text-2xl font-bold text-blue-700">SentiNews</h1>

                  <div className="relative flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 overflow-hidden">
                        <FiUser size={20} />
                      </div>
                      <span className="font-medium text-gray-800">John Doe</span>
                    </div>

                    <button className="ml-6 flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200">
                      <FiLogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Dashboard Content */}
              <div className="bg-gray-100 p-6">
                {/* Stats */}
                <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <FiBarChart2 size={16} />
                      </div>
                      <h3 className="text-sm font-medium text-gray-600">Total Articles</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">128</p>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-full bg-green-100 p-2 text-green-600">
                        <FiBarChart2 size={16} />
                      </div>
                      <h3 className="text-sm font-medium text-gray-600">Positive Articles</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-600">57</p>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-full bg-red-100 p-2 text-red-600">
                        <FiBarChart2 size={16} />
                      </div>
                      <h3 className="text-sm font-medium text-gray-600">Negative Articles</h3>
                    </div>
                    <p className="text-3xl font-bold text-red-600">43</p>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-full bg-gray-100 p-2 text-gray-600">
                        <FiBarChart2 size={16} />
                      </div>
                      <h3 className="text-sm font-medium text-gray-600">Neutral Articles</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-700">28</p>
                  </div>
                </div>

                {/* Filter */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-2xl font-bold text-gray-800">News Articles</h2>

                  <div className="flex w-full md:w-auto items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Filter by sentiment:</span>
                    <div className="relative w-full md:w-auto">
                      <select
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

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Article 1 */}
                  <div className="flex flex-col rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                    <div className="flex-1 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          BBC News
                        </span>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Score: +5
                        </span>
                      </div>
                      <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-tight text-gray-800">
                        Global Economy Shows Signs of Recovery
                      </h3>
                      <p className="mb-5 line-clamp-3 text-sm text-gray-700">
                        Latest economic data suggests a positive trend in global markets, with several indicators showing growth across multiple sectors. Analysts remain optimistic about continued expansion...
                      </p>
                    </div>
                    <div className="border-t border-gray-100 p-4">
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>Read Full Article</span>
                        <FiExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Article 2 */}
                  <div className="flex flex-col rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                    <div className="flex-1 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          The Guardian
                        </span>
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Score: -3
                        </span>
                      </div>
                      <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-tight text-gray-800">
                        Climate Change Impacts Accelerating
                      </h3>
                      <p className="mb-5 line-clamp-3 text-sm text-gray-700">
                        Scientists warn of increasing climate change impacts on global ecosystems. New research shows acceleration in ice melt and rising sea levels, with potential consequences for coastal communities...
                      </p>
                    </div>
                    <div className="border-t border-gray-100 p-4">
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>Read Full Article</span>
                        <FiExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Article 3 */}
                  <div className="flex flex-col rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                    <div className="flex-1 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          The New York Times
                        </span>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Score: +4
                        </span>
                      </div>
                      <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-tight text-gray-800">
                        Medical Breakthrough in Cancer Treatment
                      </h3>
                      <p className="mb-5 line-clamp-3 text-sm text-gray-700">
                        Researchers announce promising results from clinical trials of a new therapy targeting specific cancer cells. The treatment has shown significant efficacy in early-stage trials with minimal side effects...
                      </p>
                    </div>
                    <div className="border-t border-gray-100 p-4">
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>Read Full Article</span>
                        <FiExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Article 4 */}
                  <div className="flex flex-col rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                    <div className="flex-1 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          CNN
                        </span>
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Score: -2
                        </span>
                      </div>
                      <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-tight text-gray-800">
                        Supply Chain Disruptions Impact Consumers
                      </h3>
                      <p className="mb-5 line-clamp-3 text-sm text-gray-700">
                        Ongoing supply chain challenges are affecting product availability and causing price increases across multiple sectors. Industry experts anticipate continued disruptions through the end of the year...
                      </p>
                    </div>
                    <div className="border-t border-gray-100 p-4">
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>Read Full Article</span>
                        <FiExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Article 5 */}
                  <div className="flex flex-col rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                    <div className="flex-1 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          Reuters
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          Score: 0
                        </span>
                      </div>
                      <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-tight text-gray-800">
                        Central Bank Maintains Current Interest Rates
                      </h3>
                      <p className="mb-5 line-clamp-3 text-sm text-gray-700">
                        The central bank has voted to maintain current interest rates, citing balanced economic indicators. Economists had widely expected this decision, with future adjustments dependent on upcoming data...
                      </p>
                    </div>
                    <div className="border-t border-gray-100 p-4">
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>Read Full Article</span>
                        <FiExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Article 6 */}
                  <div className="flex flex-col rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                    <div className="flex-1 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          WSJ
                        </span>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Score: +3
                        </span>
                      </div>
                      <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-tight text-gray-800">
                        Tech Company Exceeds Quarterly Expectations
                      </h3>
                      <p className="mb-5 line-clamp-3 text-sm text-gray-700">
                        Leading technology firm reports quarterly earnings significantly above analyst expectations. Revenue growth was driven by strong performance in cloud services and subscription-based products...
                      </p>
                    </div>
                    <div className="border-t border-gray-100 p-4">
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>Read Full Article</span>
                        <FiExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-blue-400">SentiNews</h3>
              <p className="text-gray-400 text-sm mt-1">Intelligent news analysis with sentiment</p>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} SentiNews. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
