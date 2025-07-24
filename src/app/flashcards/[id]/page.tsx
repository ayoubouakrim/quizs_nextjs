"use client";
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Share2, Download, Play, Sparkles, Brain, Star, FileText, Target, Clock, Volume2, Edit, Bookmark, Settings, Maximize, RotateCcw, Eye, Users } from 'lucide-react';
import NavBar from '@/components/layout/navBar';
import { FlashCardService } from '@/services/FlashCardService';
import { FlashCardSetService } from '@/services/FlashCardSetService';
import { FlashCard } from '@/model/FlashCard';
import { FlashCardSet } from '@/model/FlashCardSet';
import Footer from '@/components/layout/footer';

interface Props {
    params: { id: string }
}

export default function StructuredFlashcardDisplay({ params }: Props) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isStudyMode, setIsStudyMode] = useState(false);
    const [flashcardSet, setFlashcardSet] = useState<FlashCardSet | null>(null);
    const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const flashcardSetId = params.id;
    const flashCardService = new FlashCardService();
    const flashCardSetService = new FlashCardSetService();

    const getFlashcards = async (flashcardSetId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const readyset = await flashCardSetService.getFlashCardSetById(flashcardSetId);
            setFlashcardSet(readyset);
            console.log("Flashcard Set:", readyset);

            const cards = await flashCardService.getFlashCardsBySetId(flashcardSetId);
            setFlashcards(cards);
            console.log("Flashcards:", cards);
        } catch (err) {
            console.error('Error loading flashcards:', err);
            setError('Failed to load flashcards');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getFlashcards(flashcardSetId);
    }, [flashcardSetId]);

    const getTypeIcon = (cardType: any) => {
        switch (cardType) {
            case 'definition': return <Brain className="h-4 w-4" />;
            case 'comparison': return <Target className="h-4 w-4" />;
            case 'example': return <Star className="h-4 w-4" />;
            case 'process': return <Play className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    // Safe access to current card
    const currentCard = flashcards.length > 0 ? flashcards[currentCardIndex] : null;

    const nextCard = () => {
        if (flashcards.length > 0) {
            setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
            setIsFlipped(false);
        }
    };

    const prevCard = () => {
        if (flashcards.length > 0) {
            setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
            setIsFlipped(false);
        }
    };

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <NavBar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading flashcards...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <NavBar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={() => getFlashcards(flashcardSetId)}
                            className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // No flashcards found
    if (!flashcardSet || flashcards.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <NavBar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No flashcards found</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <NavBar />
            {/* Top Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    {/* Title Section */}
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                                    <Brain className="h-5 w-5 text-sky-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{flashcardSet.title}</h1>
                                    <p className="text-gray-600">{flashcardSet.description}</p>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="flex items-center space-x-6 text-sm">
                                <div className="flex items-center space-x-1">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(5.4) ? 'fill-current' : ''}`} />
                                        ))}
                                    </div>
                                    <span className="font-semibold text-gray-900">5.4</span>
                                    <span className="text-gray-500">(300 reviews)</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Users className="h-4 w-4 mr-1" />
                                    <span>500 students</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FileText className="h-4 w-4 mr-1" />
                                    <span>{flashcardSet.totalCards} cards</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Target className="h-4 w-4 mr-1" />
                                    <span className="capitalize">{flashcardSet.difficulty}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors">
                                <Share2 className="h-4 w-4" />
                                <span>Share</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors">
                                <Edit className="h-4 w-4" />
                                <span>Edit</span>
                            </button>
                            <button className="flex items-center space-x-2 px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors">
                                <Download className="h-4 w-4" />
                                <span>Export</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Study Area */}
            <div className="max-w-4xl mx-auto px-4 py-4">
                {/* Study Tools Bar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span className="font-medium">Progress:</span>
                                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-sky-500 to-sky-600 transition-all duration-300"
                                        style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-sky-600 font-semibold">{currentCardIndex + 1}/{flashcards.length}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-sky-600 hover:bg-sky-50 rounded-xl transition-colors">
                                <Sparkles className="h-4 w-4" />
                                <span>Get hint</span>
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                                <Volume2 className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                                <Bookmark className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                                <Settings className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Flashcard Container - Only render if currentCard exists */}
                {currentCard && (
                    <div className="relative mb-4">
                        {/* Card Type Indicator */}
                        <div className="flex items-center justify-center mb-4">
                            <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                                {getTypeIcon(currentCard.cardType)}
                                <span className="text-sm font-medium text-gray-700 capitalize">{currentCard.cardType}</span>
                            </div>
                        </div>

                        {/* Main Flashcard */}
                        <div
                            className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.01] hover:shadow-md"
                            onClick={handleCardClick}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-sky-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative p-12 min-h-[400px] flex items-center justify-center">
                                <div className="text-center max-w-3xl">
                                    {!isFlipped ? (
                                        <div>
                                            <div className="text-sm text-gray-500 mb-4 font-semibold">QUESTION</div>
                                            <p className="text-2xl text-gray-900 leading-relaxed font-medium">
                                                {currentCard.question}
                                            </p>
                                            <div className="mt-8 text-sm text-gray-400">
                                                Click to reveal answer
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="text-sm text-sky-600 mb-4 font-semibold">ANSWER</div>
                                            <p className="text-xl text-gray-700 leading-relaxed">
                                                {currentCard.answer}
                                            </p>
                                            <div className="mt-8 text-sm text-gray-400">
                                                Click to show question
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Flip Indicator */}
                            <div className="absolute top-4 right-4">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                                    <RotateCcw className="h-4 w-4 text-gray-500 group-hover:text-sky-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Controls */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-2">
                    <div className="flex items-center justify-between">
                        {/* Left Controls */}
                        <div className="flex items-center space-x-3">
                            <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                                <Settings className="h-5 w-5" />
                            </button>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600 font-medium">Card Sorting</span>
                                <div className="relative">
                                    <input type="checkbox" className="sr-only" />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full shadow-inner cursor-pointer"></div>
                                    <div className="absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition-transform cursor-pointer"></div>
                                </div>
                            </div>
                        </div>

                        {/* Center Navigation */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={prevCard}
                                className="w-8 h-8 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full flex items-center justify-center shadow-sm transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                disabled={flashcards.length <= 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1 shadow-sm">
                                <span className="text-lg font-bold text-gray-900">
                                    {currentCardIndex + 1} / {flashcards.length}
                                </span>
                            </div>

                            <button
                                onClick={nextCard}
                                className="w-8 h-8 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full flex items-center justify-center shadow-sm transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                disabled={flashcards.length <= 1}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center space-x-3">
                            <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                                <Bookmark className="h-5 w-5" />
                            </button>
                            <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                                <Maximize className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Study Set Summary */}
                <div className="mt-8 relative">
                    {/* Background gradient with blur effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>

                    {/* Main container */}
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">

                        {/* Header with animated gradient */}
                        <div className="relative bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 px-4 py-4">
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
                                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full mix-blend-overlay animate-pulse delay-1000"></div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Study Set Overview</h3>
                                <p className="text-blue-100 text-md">Master your knowledge with detailed insights and progress tracking</p>
                            </div>
                        </div>

                        {/* Stats grid */}
                        <div className="p-4 bg-gradient-to-b from-gray-50/50 to-white">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* Total Cards */}
                                <div className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <div className="relative bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <FileText className="h-7 w-7 text-white" />
                                            </div>
                                            <div className="w-2 h-7 bg-gradient-to-b from-sky-500 to-sky-600 rounded-full"></div>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
                                            {flashcardSet.totalCards}
                                        </div>
                                        <div className="text-gray-600 font-medium">Total Cards</div>
                                        <div className="mt-2 text-xs text-sky-600 font-semibold uppercase tracking-wide">Ready to Study</div>
                                    </div>
                                </div>

                                {/* Difficulty Level */}
                                <div className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <div className="relative bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Target className="h-7 w-7 text-white" />
                                            </div>
                                            <div className="w-2 h-7 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent capitalize">
                                            {flashcardSet.difficulty}
                                        </div>
                                        <div className="text-gray-600 font-medium">Difficulty Level</div>
                                        <div className="mt-2">
                                            <div className="flex space-x-1">
                                                {[1, 2, 3, 4, 5].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`w-2 h-2 rounded-full ${level <= (flashcardSet.difficulty === 'easy' ? 2 : flashcardSet.difficulty === 'medium' ? 3 : 5)
                                                                ? 'bg-purple-500'
                                                                : 'bg-gray-200'
                                                            }`}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Created Date */}
                                <div className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <div className="relative bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Clock className="h-7 w-7 text-white" />
                                            </div>
                                            <div className="w-2 h-7 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></div>
                                        </div>
                                        <div className="text-lg font-bold text-gray-900 mb-1 bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                                            {flashcardSet.createdAt && new Date(flashcardSet.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                        <div className="text-gray-600 font-medium">Created</div>
                                        <div className="mt-2 text-xs text-emerald-600 font-semibold uppercase tracking-wide">
                                            {flashcardSet.createdAt && Math.floor((new Date().getTime() - new Date(flashcardSet.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days ago
                                        </div>
                                    </div>
                                </div>
                            </div>                   
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}