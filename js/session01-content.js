/**
 * Session 1 Content Integration
 * This file contains the complete Session 1 content from the original file
 * to be integrated into the enhanced learning system
 */

class Session01ContentLoader {
    static getCompleteSession01Content() {
        return `
            <header class="mb-12">
                <div class="border-b border-stone-200 pb-8">
                    <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Interactive KQL Session 1</h1>
                    <p class="text-lg text-gray-600 max-w-3xl">A hands-on guide to Kusto Query Language using the public <code class="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-mono text-sm">help.kusto.windows.net</code> cluster.</p>
                </div>
            </header>
        
            <section id="introduction" class="mb-16 scroll-mt-20">
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-8 mb-8">
                    <div class="flex items-center mb-4">
                        <div class="w-3 h-8 bg-blue-500 rounded-full mr-4"></div>
                        <h2 class="text-3xl font-bold text-gray-900">Session 1: Introduction</h2>
                    </div>
                    <div class="space-y-4 text-gray-700 leading-relaxed">
                        <p>Welcome to the first session of our interactive Kusto Query Language (KQL) guide! In this session, our goal is to get you comfortable with the fundamental building blocks of KQL. By the end, you'll be able to navigate tables, filter data, and perform basic analysis.</p>
                        <p>We will focus our learning primarily on two tables: <code class="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-mono text-sm">AuthenticationEvents</code> and <code class="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-mono text-sm">Employees</code>. We'll also briefly use <code class="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-mono text-sm">InboundBrowsing</code> and <code class="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-mono text-sm">OutboundBrowsing</code> to explore advanced concepts.</p>
                    </div>
                </div>
                
                <!-- Getting Started Section -->
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 mb-8">
                    <div class="flex items-center mb-6">
                        <div class="w-3 h-8 bg-green-500 rounded-full mr-4"></div>
                        <h3 class="text-2xl font-bold text-gray-900">Getting Started: Connect to the Practice Environment</h3>
                    </div>
                    <div class="space-y-6">
                        <p class="text-gray-700 leading-relaxed">
                            Before diving into the queries, you'll need to connect to our practice environment. We'll be using the public 
                            <code class="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-mono text-sm">help.kusto.windows.net</code> cluster, 
                            which contains sample data perfect for learning KQL.
                        </p>
                        
                        <div class="bg-white border border-green-200 rounded-lg p-6">
                            <h4 class="text-lg font-semibold text-gray-800 mb-4">🚀 Quick Setup Steps:</h4>
                            <ol class="list-decimal list-inside space-y-3 text-gray-700">
                                <li class="flex items-start">
                                    <span class="font-semibold mr-2">1.</span>
                                    <div>
                                        Open your browser and navigate to: 
                                        <a href="https://aka.ms/adx" target="_blank" rel="noopener noreferrer" 
                                           class="inline-flex items-center ml-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                            🔗 aka.ms/adx
                                            <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </li>
                                <li class="flex items-start">
                                    <span class="font-semibold mr-2">2.</span>
                                    <div>Sign in with your Microsoft account (or create one if needed)</div>
                                </li>
                                <li class="flex items-start">
                                    <span class="font-semibold mr-2">3.</span>
                                    <div>
                                        Connect to the cluster by entering: 
                                        <code class="bg-gray-100 text-gray-800 px-2 py-1 rounded-md font-mono text-sm ml-1">help.kusto.windows.net</code>
                                    </div>
                                </li>
                                <li class="flex items-start">
                                    <span class="font-semibold mr-2">4.</span>
                                    <div>You're ready to start querying! Try copying and pasting the examples below.</div>
                                </li>
                            </ol>
                        </div>
                        
                        <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg class="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm text-amber-700">
                                        <strong>Note:</strong> The help.kusto.windows.net cluster is a public learning environment. 
                                        Don't use it for sensitive data - stick to the practice queries in this guide!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    static getTestingAccessContent() {
        return `
            <section id="testing-access" class="mb-16 scroll-mt-20">
                <div class="mb-8">
                    <div class="flex items-center mb-4">
                        <div class="w-3 h-8 bg-orange-500 rounded-full mr-4"></div>
                        <h2 class="text-3xl font-bold text-gray-900">Testing Access</h2>
                    </div>
                    <p class="text-lg text-gray-600 mb-6 leading-relaxed">Before we dive into learning KQL, let's make sure you're properly connected to the cluster and can execute queries successfully. We'll start with a simple test to verify everything is working.</p>
                </div>
                
                <div class="space-y-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-6 mt-8 text-gray-800">1. Verify Cluster Connection</h3>
                        <p class="mb-6">First, let's confirm that you can connect to the help.kusto.windows.net cluster and access the SecurityLogs database. Run this simple query to print a "Hello World" message:</p>
                        
                        <div class="code-block relative rounded-lg p-4 font-mono text-sm my-6 shadow-sm">
                            <div class="flex space-x-2 absolute top-2 right-2">
                                <button class="copy-btn bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs hover:bg-blue-200 transition-colors">Copy</button>
                            </div>
                            <pre><code><span class="kql-comment">// Simple test query to verify cluster access</span>
<span class="kql-function">print</span> <span class="kql-string">"Hello World"</span></code></pre>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold mb-6 mt-8 text-gray-800">2. Test Database Access</h3>
                        <p class="mb-6">Now let's verify you can query the SecurityLogs database. This query will show you the available tables in the database:</p>
                        
                        <div class="code-block relative rounded-lg p-4 font-mono text-sm my-6 shadow-sm">
                            <div class="flex space-x-2 absolute top-2 right-2">
                                <button class="copy-btn bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs hover:bg-blue-200 transition-colors">Copy</button>
                            </div>
                            <pre><code><span class="kql-comment">// List all tables available in the SecurityLogs database</span>
.<span class="kql-keyword">show</span> <span class="kql-keyword">tables</span></code></pre>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold mb-6 mt-8 text-gray-800">3. Basic Data Query Test</h3>
                        <p class="mb-6">Finally, let's run a simple query against one of the tables to ensure you can retrieve data without any errors:</p>
                        
                        <div class="code-block relative rounded-lg p-4 font-mono text-sm my-6 shadow-sm">
                            <div class="flex space-x-2 absolute top-2 right-2">
                                <button class="copy-btn bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs hover:bg-blue-200 transition-colors">Copy</button>
                            </div>
                            <pre><code><span class="kql-comment">// Test query to retrieve a small sample from AuthenticationEvents</span>
<span class="kql-table">AuthenticationEvents</span>
<span class="kql-pipe">|</span> <span class="kql-function">take</span> 5</code></pre>
                        </div>
                    </div>
                </div>
                
                <div class="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg mt-8">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-green-700">
                                <strong>Success Indicators:</strong> If all three queries run without errors and return results, you're ready to proceed! 
                                The first query should display your "Hello World" message, the second should show a list of available tables, 
                                and the third should return 5 rows of sample security log data.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg mt-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-red-700">
                                <strong>Troubleshooting:</strong> If you get errors, double-check that you've connected to the correct cluster 
                                (help.kusto.windows.net) and selected the SecurityLogs database. Make sure you're signed in with a valid Microsoft account.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

// Export for use in the content manager
if (typeof window !== 'undefined') {
    window.Session01ContentLoader = Session01ContentLoader;
}