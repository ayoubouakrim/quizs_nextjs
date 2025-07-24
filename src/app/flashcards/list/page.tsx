'use client';

import NavBar from "@/components/layout/navBar";
import { FlashCardSet } from "@/model/FlashCardSet";
import { FlashCardSetService } from "@/services/FlashCardSetService";
import { ChevronDown, Filter, Grid, List, Plus, Search, BookOpen, Star, MoreVertical, BarChart3, Play, Edit, Brain, Target, Zap, HelpCircle, Settings, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Updated interface to match what the component expects
interface ExtendedFlashCardSet extends FlashCardSet {
    cardCount?: number;
    accuracy?: number;
    isFavorite?: boolean;
    cardTypes?: string[];
    tags?: string[];
    studySessions?: number;
    fileType?: 'pdf' | 'docx' | 'txt' | 'md';
}

const FlashCardsListPage = () => {
    const [flashcardSets, setFlashcardSets] = useState<ExtendedFlashCardSet[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('recent');
    const [viewMode, setViewMode] = useState('grid');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getFlashcardSets = async () => {
        const flashCardsService = new FlashCardSetService();
        try {
            setIsLoading(true);
            setError(null);
            const sets = await flashCardsService.getAllFlashCardSets();
            
            // Transform the data to match expected interface
            const transformedSets = sets.map((set: FlashCardSet) => ({
                ...set,
                cardCount: set.totalCards || 0,
                accuracy: Math.floor(Math.random() * 40) + 60, // Mock data - replace with real data
                isFavorite: false, // Mock data - replace with real data
                cardTypes: ['definition', 'concept'], // Mock data - replace with real data
                tags: ['Study', 'Important'], // Mock data - replace with real data
                studySessions: Math.floor(Math.random() * 20) + 1, // Mock data - replace with real data
                fileType: 'pdf' as const, // Mock data - replace with real data
            }));
            
            setFlashcardSets(transformedSets);
        } catch (error) {
            console.error("Error fetching flashcard sets:", error);
            setError("Failed to load flashcard sets");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getFlashcardSets();
    }, []);

    const cardTypeIcons: Record<string, JSX.Element> = {
        definition: <BookOpen className="w-3 h-3" />,
        concept: <Brain className="w-3 h-3" />,
        example: <Target className="w-3 h-3" />,
        process: <Zap className="w-3 h-3" />,
        comparison: <HelpCircle className="w-3 h-3" />,
        formula: <Settings className="w-3 h-3" />
    };

    const difficultyColors: Record<string, string> = {
        beginner: 'bg-green-100 text-green-800 border-green-200',
        easy: 'bg-green-100 text-green-800 border-green-200',
        intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        advanced: 'bg-red-100 text-red-800 border-red-200',
        hard: 'bg-red-100 text-red-800 border-red-200'
    };

    const fileTypeIcons: Record<string, JSX.Element> = {
        pdf: <FileText className="h-4 w-4 text-red-500" />,
        docx: <FileText className="h-4 w-4 text-blue-500" />,
        txt: <FileText className="h-4 w-4 text-gray-500" />,
        md: <FileText className="h-4 w-4 text-purple-500" />
    };

    const filteredSets = flashcardSets.filter(set =>
        set.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        set.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading flashcard sets...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button 
                                onClick={getFlashcardSets}
                                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
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

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search and Filter */}
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

                {/* Flashcard Sets List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSets.map((set) => (
                            <div key={set.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        {set.fileType && fileTypeIcons[set.fileType]}
                                        <span className={`ml-2 px-2 py-1 rounded-lg text-xs font-medium border ${difficultyColors[set.difficulty] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
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
                                        {set.totalCards || set.cardCount || 0} cards
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <BarChart3 className="w-4 h-4 mr-1" />
                                        {set.accuracy || 0}% accuracy
                                    </div>
                                </div>

                                {/* Card Types */}
                                {set.cardTypes && set.cardTypes.length > 0 && (
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xs text-gray-500">Types:</span>
                                        <div className="flex items-center gap-1">
                                            {set.cardTypes.slice(0, 4).map((type, index) => (
                                                <div key={index} className="w-6 h-6 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                                                    {cardTypeIcons[type] || <FileText className="w-3 h-3" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                {set.tags && set.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {set.tags.slice(0, 3).map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Link href={`/flashcards/${set.id}`}>
                                    <button className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600 transition-colors">
                                        <Play className="w-4 h-4 mr-1" />
                                        Study
                                    </button>
                                    </Link>
                                    <button className="px-3 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                                    <span>Created {set.createdAt ? new Date(set.createdAt).toLocaleDateString() : 'Unknown'}</span>
                                    <span>{set.studySessions || 0} sessions</span>
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
                                                {set.fileType && fileTypeIcons[set.fileType]}
                                                <button className="ml-3 p-1 hover:bg-white hover:bg-opacity-70 rounded-lg transition-colors">
                                                    <Star className={`w-4 h-4 ${set.isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                                                </button>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-semibold text-gray-900">{set.title}</h3>
                                                    <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${difficultyColors[set.difficulty] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                                                        {set.difficulty}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{set.description}</p>
                                                {set.tags && set.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {set.tags.map((tag, index) => (
                                                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8">
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-900">{set.totalCards || 0}</p>
                                                <p className="text-xs text-gray-500">Cards</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-900">{set.accuracy || 0}%</p>
                                                <p className="text-xs text-gray-500">Accuracy</p>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                <Link href={`/flashcards/${set.id}`}>
                                                <button className="inline-flex items-center px-4 py-2 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600 transition-colors">
                                                    <Play className="w-4 h-4 mr-1" />
                                                    Study
                                                </button>
                                                </Link>
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

                {filteredSets.length === 0 && !isLoading && (
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

export default FlashCardsListPage;