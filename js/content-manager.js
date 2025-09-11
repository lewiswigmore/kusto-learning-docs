/**
 * Content Management System for Kusto Learning Docs
 * Handles loading and managing learning content from JSON configuration
 */

class ContentManager {
    constructor(progressTracker = null) {
        this.config = null;
        this.contentCache = new Map();
        this.progressTracker = progressTracker;
    }

    async loadConfiguration() {
        try {
            const response = await fetch('content/sessions-config.json');
            this.config = await response.json();
            return this.config;
        } catch (error) {
            console.error('Failed to load sessions configuration:', error);
            return this.getFallbackConfiguration();
        }
    }

    getFallbackConfiguration() {
        // Fallback configuration if JSON file fails to load
        return {
            sessions: [
                {
                    id: 'session-01',
                    title: 'KQL Basics & Fundamentals',
                    description: 'Introduction to KQL, basic operators, and data exploration',
                    difficulty: 'Beginner',
                    estimatedTime: '2-3 hours',
                    prerequisites: [],
                    tags: ['basics', 'introduction', 'fundamentals'],
                    topics: [
                        { id: 'introduction', title: 'Introduction', type: 'overview' },
                        { id: 'testing-access', title: 'Testing Access', type: 'setup' },
                        { id: 'part1', title: 'KQL Basics', type: 'tutorial' },
                        { id: 'part2', title: 'Filtering & Projecting', type: 'tutorial' },
                        { id: 'part3', title: 'Aggregation & Time', type: 'tutorial' },
                        { id: 'part4', title: 'Joining Tables', type: 'tutorial' },
                        { id: 'part5', title: 'Advanced Concepts', type: 'tutorial' },
                        { id: 'part6', title: 'Challenge Queries', type: 'practice' }
                    ]
                }
            ]
        };
    }

    getSessions() {
        return this.config?.sessions || [];
    }

    getSession(sessionId) {
        return this.getSessions().find(session => session.id === sessionId);
    }

    getTopic(sessionId, topicId) {
        const session = this.getSession(sessionId);
        return session?.topics.find(topic => topic.id === topicId);
    }

    async loadTopicContent(sessionId, topicId) {
        const cacheKey = `${sessionId}/${topicId}`;
        
        if (this.contentCache.has(cacheKey)) {
            return this.contentCache.get(cacheKey);
        }

        try {
            // Try to load from individual content files first
            const response = await fetch(`content/${sessionId}/${topicId}.html`);
            if (response.ok) {
                const content = await response.text();
                this.contentCache.set(cacheKey, content);
                return content;
            }
        } catch (error) {
            // Fallback to generated content
        }

        // Generate placeholder content if no file exists
        const topic = this.getTopic(sessionId, topicId);
        const session = this.getSession(sessionId);
        
        if (topic && session) {
            const content = this.generatePlaceholderTopicContent(session, topic);
            this.contentCache.set(cacheKey, content);
            return content;
        }

        return '<div class="text-center py-12"><p class="text-gray-500">Content not found</p></div>';
    }

    generatePlaceholderTopicContent(session, topic) {
        const typeIcons = {
            'overview': 'fas fa-info-circle',
            'setup': 'fas fa-cog', 
            'tutorial': 'fas fa-book-open',
            'practice': 'fas fa-dumbbell'
        };

        const typeColors = {
            'overview': 'blue',
            'setup': 'green',
            'tutorial': 'purple', 
            'practice': 'orange'
        };

        const color = typeColors[topic.type] || 'gray';

        return `
            <div class="max-w-4xl">
                <div class="mb-8">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center">
                            <i class="${typeIcons[topic.type]} text-${color}-600 text-lg"></i>
                        </div>
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">${topic.title}</h1>
                            <p class="text-gray-600">${topic.description || 'Learn the fundamentals of this topic'}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 text-sm">
                        <span class="px-3 py-1 bg-${color}-100 text-${color}-800 rounded-full capitalize">${topic.type}</span>
                        ${topic.duration ? `<span class="text-gray-600">⏱️ ${topic.duration}</span>` : ''}
                        <span class="text-gray-600">📚 ${session.title}</span>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-${color}-50 to-${color}-100 border border-${color}-200 rounded-xl p-8 mb-8">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-${color}-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <i class="fas fa-hammer text-${color}-600 text-xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Content Under Development</h2>
                        <p class="text-gray-700 mb-6">This topic is being prepared with comprehensive examples and exercises.</p>
                        
                        <div class="bg-white rounded-lg p-6 max-w-lg mx-auto">
                            <h3 class="font-semibold text-gray-800 mb-4">What You'll Learn:</h3>
                            <div class="text-left space-y-2 text-gray-600">
                                ${this.generateLearningObjectives(topic)}
                            </div>
                        </div>
                    </div>
                </div>

                ${topic.type === 'tutorial' ? this.generateTutorialPlaceholder() : ''}
                ${topic.type === 'practice' ? this.generatePracticePlaceholder() : ''}
                ${topic.type === 'setup' ? this.generateSetupPlaceholder() : ''}
                
                <div class="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 class="font-semibold text-blue-900 mb-2">💡 Coming Soon</h3>
                    <p class="text-blue-800">This modular structure will allow us to easily add rich, interactive content for each topic including:</p>
                    <ul class="mt-3 space-y-1 text-blue-700 text-sm">
                        <li>• Interactive code examples with syntax highlighting</li>
                        <li>• Step-by-step guided exercises</li>
                        <li>• Real-world scenario demonstrations</li>
                        <li>• Progressive difficulty challenges</li>
                        <li>• Video tutorials and visual explanations</li>
                    </ul>
                </div>
            </div>
        `;
    }

    generateLearningObjectives(topic) {
        const objectives = {
            'introduction': [
                '• Understanding KQL fundamentals and use cases',
                '• Overview of Azure Data Explorer ecosystem', 
                '• Setting expectations for the learning journey'
            ],
            'testing-access': [
                '• Connecting to the practice environment',
                '• Running your first KQL queries',
                '• Troubleshooting common connection issues'
            ],
            'part1': [
                '• Core KQL operators and syntax',
                '• Data flow and piping concepts',
                '• Table schema exploration techniques'
            ],
            'part2': [
                '• Advanced filtering with where operator',
                '• Column selection and transformation',
                '• Performance optimization techniques'
            ],
            'window-functions': [
                '• Row numbering and ranking functions',
                '• Sliding window calculations',
                '• Partition-based analytics'
            ],
            'threat-hunting-basics': [
                '• Threat hunting methodology',
                '• Common attack patterns in data',
                '• Building detection queries'
            ]
        };

        const topicObjectives = objectives[topic.id] || [
            '• Core concepts and principles',
            '• Practical implementation techniques', 
            '• Real-world application examples'
        ];

        return topicObjectives.join('<br>');
    }

    generateTutorialPlaceholder() {
        return `
            <div class="space-y-8">
                <div class="bg-white border rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">📝 Tutorial Structure</h3>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div class="text-center p-4 bg-blue-50 rounded-lg">
                            <i class="fas fa-lightbulb text-blue-600 text-2xl mb-2"></i>
                            <h4 class="font-medium">Concepts</h4>
                            <p class="text-sm text-gray-600">Theory and background</p>
                        </div>
                        <div class="text-center p-4 bg-green-50 rounded-lg">
                            <i class="fas fa-code text-green-600 text-2xl mb-2"></i>
                            <h4 class="font-medium">Examples</h4>
                            <p class="text-sm text-gray-600">Hands-on code samples</p>
                        </div>
                        <div class="text-center p-4 bg-purple-50 rounded-lg">
                            <i class="fas fa-tasks text-purple-600 text-2xl mb-2"></i>
                            <h4 class="font-medium">Practice</h4>
                            <p class="text-sm text-gray-600">Apply your knowledge</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generatePracticePlaceholder() {
        return `
            <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-orange-900 mb-4">🎯 Practice Exercises</h3>
                <div class="space-y-3">
                    <div class="flex items-center p-3 bg-white rounded border">
                        <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <span class="text-orange-600 text-sm font-bold">1</span>
                        </div>
                        <span class="text-gray-700">Interactive coding challenges</span>
                    </div>
                    <div class="flex items-center p-3 bg-white rounded border">
                        <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <span class="text-orange-600 text-sm font-bold">2</span>
                        </div>
                        <span class="text-gray-700">Real-world scenario problems</span>
                    </div>
                    <div class="flex items-center p-3 bg-white rounded border">
                        <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <span class="text-orange-600 text-sm font-bold">3</span>
                        </div>
                        <span class="text-gray-700">Progressive difficulty levels</span>
                    </div>
                </div>
            </div>
        `;
    }

    generateSetupPlaceholder() {
        return `
            <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-green-900 mb-4">⚙️ Setup Instructions</h3>
                <div class="space-y-4">
                    <div class="flex items-start">
                        <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                            <i class="fas fa-check text-white text-xs"></i>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900">Environment Preparation</h4>
                            <p class="text-sm text-gray-600">Step-by-step environment setup</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                            <i class="fas fa-check text-white text-xs"></i>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900">Connection Verification</h4>
                            <p class="text-sm text-gray-600">Test your setup with sample queries</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                            <i class="fas fa-check text-white text-xs"></i>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900">Troubleshooting Guide</h4>
                            <p class="text-sm text-gray-600">Common issues and solutions</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Search functionality
    createSearchIndex() {
        const searchData = [];
        
        this.getSessions().forEach(session => {
            // Add session to search index
            searchData.push({
                id: session.id,
                type: 'session',
                title: session.title,
                description: session.description,
                content: `${session.description} ${session.tags.join(' ')}`,
                tags: session.tags,
                difficulty: session.difficulty
            });

            // Add topics to search index
            session.topics.forEach(topic => {
                searchData.push({
                    id: topic.id,
                    sessionId: session.id,
                    type: 'topic',
                    title: topic.title,
                    description: topic.description || '',
                    content: `${topic.title} ${topic.description || ''} ${topic.type}`,
                    sessionTitle: session.title,
                    topicType: topic.type,
                    duration: topic.duration
                });
            });
        });

        return searchData;
    }

    // Progress tracking
    getSessionProgress(sessionId) {
        const completedTopics = JSON.parse(localStorage.getItem(`kql-progress-${sessionId}`) || '[]');
        const session = this.getSession(sessionId);
        
        if (!session) return { completed: 0, total: 0, percentage: 0 };
        
        return {
            completed: completedTopics.length,
            total: session.topics.length,
            percentage: Math.round((completedTopics.length / session.topics.length) * 100)
        };
    }

    markTopicComplete(sessionId, topicId) {
        if (this.progressTracker) {
            this.progressTracker.markTopicComplete(sessionId, topicId);
        } else {
            // Fallback to legacy localStorage if no progressTracker
            const completedTopics = JSON.parse(localStorage.getItem(`kql-progress-${sessionId}`) || '[]');
            if (!completedTopics.includes(topicId)) {
                completedTopics.push(topicId);
                localStorage.setItem(`kql-progress-${sessionId}`, JSON.stringify(completedTopics));
            }
        }
    }

    markTopicIncomplete(sessionId, topicId) {
        if (this.progressTracker) {
            this.progressTracker.markTopicIncomplete(sessionId, topicId);
        } else {
            // Fallback to legacy localStorage if no progressTracker
            const completedTopics = JSON.parse(localStorage.getItem(`kql-progress-${sessionId}`) || '[]');
            const index = completedTopics.indexOf(topicId);
            if (index > -1) {
                completedTopics.splice(index, 1);
                localStorage.setItem(`kql-progress-${sessionId}`, JSON.stringify(completedTopics));
            }
        }
    }

    isTopicComplete(sessionId, topicId) {
        if (this.progressTracker) {
            return this.progressTracker.isTopicComplete(sessionId, topicId);
        } else {
            // Fallback to legacy localStorage if no progressTracker
            const completedTopics = JSON.parse(localStorage.getItem(`kql-progress-${sessionId}`) || '[]');
            return completedTopics.includes(topicId);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentManager;
} else {
    window.ContentManager = ContentManager;
}