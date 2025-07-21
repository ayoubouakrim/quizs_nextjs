"use client";

import React, { useState } from 'react';
import {
    Search,
    Filter,
    Grid,
    List,
    BookOpen,
    Brain,
    Target,
    HelpCircle,
    Settings,
    Zap,
    Calendar,
    Clock,
    Star,
    Play,
    Edit,
    Trash2,
    MoreVertical,
    Plus,
    TrendingUp,
    Users,
    Eye,
    Download,
    Share2,
    ChevronDown,
    FileText,
    Award,
    BarChart3
} from 'lucide-react';

export default function FlashcardSetsList() {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('recent');

    // Mock data - replace with your actual data
    const flashcardSets = [
        {
            id: 1,
            title: "Advanced React Patterns",
            description: "Complex patterns and architectural concepts for React development",
            difficulty: "advanced",
            cardCount: 35,
            cardTypes: ['definition', 'concept', 'example'],
            createdAt: "2024-07-20",
            lastStudied: "2024-07-21",
            progress: 68,
            tags: ['React', 'JavaScript', 'Frontend'],
            studySessions: 12,
            accuracy: 89,
            isFavorite: true,
            fileType: 'pdf'
        },
        {
            id: 2,
            title: "Machine Learning Fundamentals",
            description: "Core concepts and algorithms in machine learning",
            difficulty: "intermediate",
            cardCount: 42,
            cardTypes: ['definition', 'formula', 'concept'],
            createdAt: "2024-07-18",
            lastStudied: "2024-07-20",
            progress: 34,
            tags: ['ML', 'Python', 'Data Science'],
            studySessions: 8,
            accuracy: 76,
            isFavorite: false,
            fileType: 'docx'
        },
        {
            id: 3,
            title: "Spanish Vocabulary - Intermediate",
            description: "Essential vocabulary for intermediate Spanish learners",
            difficulty: "intermediate",
            cardCount: 28,
            cardTypes: ['definition', 'example'],
            createdAt: "2024-07-15",
            lastStudied: "2024-07-19",
            progress: 92,
            tags: ['Spanish', 'Language', 'Vocabulary'],
            studySessions: 25,
            accuracy: 94,
            isFavorite: true,
            fileType: 'txt'
        },
        {
            id: 4,
            title: "Organic Chemistry Reactions",
            description: "Key reactions and mechanisms in organic chemistry",
            difficulty: "advanced",
            cardCount: 56,
            cardTypes: ['formula', 'process', 'concept'],
            createdAt: "2024-07-12",
            lastStudied: "2024-07-18",
            progress: 23,
            tags: ['Chemistry', 'Organic', 'Reactions'],
            studySessions: 6,
            accuracy: 67,
            isFavorite: false,
            fileType: 'pdf'
        },
        {
            id: 5,
            title: "World History - Modern Era",
            description: "Important events and figures from the modern era",
            difficulty: "beginner",
            cardCount: 31,
            cardTypes: ['definition', 'example', 'concept'],
            createdAt: "2024-07-10",
            lastStudied: "2024-07-16",
            progress: 78,
            tags: ['History', 'Modern', 'Events'],
            studySessions: 15,
            accuracy: 85,
            isFavorite: false,
            fileType: 'md'
        }
    ];

    const cardTypeIcons = {
        definition: <BookOpen className="h-3 w-3" />,
        concept: <Brain className="h-3 w-3" />,
        example: <Target className="h-3 w-3" />,
        process: <Zap className="h-3 w-3" />,
        comparison: <HelpCircle className="h-3 w-3" />,
        formula: <Settings className="h-3 w-3" />
    };

    const difficultyColors = {
        beginner: 'bg-green-100 text-green-800 border-green-200',
        intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        advanced: 'bg-red-100 text-red-800 border-red-200'
    };

    const fileTypeIcons = {
        pdf: <FileText className="h-4 w-4 text-red-500" />,
        docx: <FileText className="h-4 w-4 text-blue-500" />,
        txt: <FileText className="h-4 w-4 text-gray-500" />,
        md: <FileText className="h-4 w-4 text-purple-500" />
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return 'bg-green-500';
        if (progress >= 50) return 'bg-yellow-500';
        return 'bg-blue-500';
    };

    const filteredSets = flashcardSets.filter(set =>
        set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        set.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        set.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Flashcard Sets</h1>
                            <p className="text-gray-600 mt-1">Manage and study your personalized flashcard collections</p>
                        </div>
                        <button className="inline-flex items-center px-4 py-2 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 transition-all duration-200 shadow-sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Create New Set
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center mr-3">
                                <BookOpen className="w-5 h-5 text-sky-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Sets</p>
                                <p className="text-2xl font-bold text-gray-900">{flashcardSets.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Avg Progress</p>
                                <p className="text-2xl font-bold text-gray-900">59%</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                                <Award className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Avg Accuracy</p>
                                <p className="text-2xl font-bold text-gray-900">82%</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-3">
                                <Clock className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Study Sessions</p>
                                <p className="text-2xl font-bold text-gray-900">66</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-3 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search flashcard sets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                />
                            </div>
                            
                            <div className="relative">
                                <button
                                    onClick={() => setFilterOpen(!filterOpen)}
                                    className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filters
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            >
                                <option value="recent">Recently Created</option>
                                <option value="progress">Progress</option>
                                <option value="accuracy">Accuracy</option>
                                <option value="name">Name</option>
                            </select>

                            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 ${viewMode === 'grid' ? 'bg-sky-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 ${viewMode === 'list' ? 'bg-sky-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Flashcard Sets Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSets.map((set) => (
                            <div key={set.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        {fileTypeIcons[set.fileType]}
                                        <span className={`ml-2 px-2 py-1 rounded-lg text-xs font-medium border ${difficultyColors[set.difficulty]}`}>
                                            {set.difficulty}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Star className={`w-4 h-4 ${set.isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                {/* Title and Description */}
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{set.title}</h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{set.description}</p>

                                {/* Stats */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <BookOpen className="w-4 h-4 mr-1" />
                                        {set.cardCount} cards
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <BarChart3 className="w-4 h-4 mr-1" />
                                        {set.accuracy}% accuracy
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-gray-600">Progress</span>
                                        <span className="font-medium text-gray-900">{set.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${getProgressColor(set.progress)}`}
                                            style={{ width: `${set.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Card Types */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs text-gray-500">Types:</span>
                                    <div className="flex items-center gap-1">
                                        {set.cardTypes.map((type) => (
                                            <div key={type} className="w-6 h-6 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                                                {cardTypeIcons[type]}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {set.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600 transition-colors">
                                        <Play className="w-4 h-4 mr-1" />
                                        Study
                                    </button>
                                    <button className="px-3 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                                    <span>Created {new Date(set.createdAt).toLocaleDateString()}</span>
                                    <span>{set.studySessions} sessions</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {filteredSets.map((set) => (
                                <div key={set.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 flex-1">
                                            <div className="flex items-center">
                                                {fileTypeIcons[set.fileType]}
                                                <button className="ml-3 p-1 hover:bg-white hover:bg-opacity-70 rounded-lg transition-colors">
                                                    <Star className={`w-4 h-4 ${set.isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                                                </button>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-semibold text-gray-900">{set.title}</h3>
                                                    <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${difficultyColors[set.difficulty]}`}>
                                                        {set.difficulty}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{set.description}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {set.tags.map((tag) => (
                                                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8">
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-900">{set.cardCount}</p>
                                                <p className="text-xs text-gray-500">Cards</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-900">{set.progress}%</p>
                                                <p className="text-xs text-gray-500">Progress</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-900">{set.accuracy}%</p>
                                                <p className="text-xs text-gray-500">Accuracy</p>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                <button className="inline-flex items-center px-4 py-2 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600 transition-colors">
                                                    <Play className="w-4 h-4 mr-1" />
                                                    Study
                                                </button>
                                                <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                                    <MoreVertical className="w-4 h-4 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {filteredSets.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No flashcard sets found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search or create your first flashcard set.</p>
                        <button className="inline-flex items-center px-4 py-2 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 transition-colors">
                            <Plus className="w-4 h-4 mr-2" />
                            Create New Set
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}