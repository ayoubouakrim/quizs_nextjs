'use client';

import React, { useEffect, useState } from 'react';
import {
    GraduationCap,
    BarChart3,
    Brain,
    Upload,
    BookOpen,
    User,
    Settings,
    Menu,
    X,
    FileText,
    Zap,
    PenTool,
    MoreVertical,
    Bell,
    Book,
    ArrowRight,
    School,
    TrendingUp,
    Clock,
    Star,
    Activity
} from 'lucide-react';
import NavBar from '@/components/layout/navBar';
import Footer from '@/components/layout/footer';
import { useRouter } from 'next/navigation';
import { QuizService } from '@/services/QuizService';
import { SummaryService } from '@/services/SummaryService';
import { FlashCardSetService } from '@/services/FlashCardSetService';
import { Quiz } from '@/model/Quiz';
import { Summary } from '@/model/Summary';
import { FlashCardSet } from '@/model/FlashCardSet';
import { FileInfoService } from '@/services/FileInfoService';
import { ExerciseSubmissionService } from '@/services/ExerciseSubmissonService';
import { ExerciseSubmission } from '@/model/ExerciseSubmission';

const ImprovedNavbar = () => {
    const quizService = new QuizService();
    const summaryService = new SummaryService();
    const flashcardService = new FlashCardSetService();
    const fileService = new FileInfoService();
    const exerciseSubmissionService = new ExerciseSubmissionService();

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [files, setFiles] = useState([]);
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [username, setUsername] = useState<string | null>(null);
    const [nbrFlash, setNbrFlash] = useState(0);
    const [nbrQuizzes, setNbrQuizzes] = useState(0);
    const [nbrSummaries, setNbrSummaries] = useState(0);
    const [nbrExercises, setNbrExercises] = useState(0);

    const [flashCardSets, setFlashCardSets] = useState<FlashCardSet[]>([]);
    const [exercises, setExercises] = useState<ExerciseSubmission[]>([]);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const router = useRouter();

    const quickActions = [
        { icon: Brain, label: "Generate Quiz", route: "/quiz/generate", color: "from-purple-400 to-purple-600", bg: "bg-purple-50", count: nbrQuizzes },
        { icon: BookOpen, label: "Create Summary", route: "/summary/generate", color: "from-green-400 to-green-600", bg: "bg-green-50", count: nbrSummaries },
        { icon: Book, label: "Create FlashCard", route: "/flashcards/generate", color: "from-orange-400 to-orange-600", bg: "bg-orange-50", count: nbrFlash },
        { icon: School, label: "Solve Exercise", route: "/exsolver/generate", color: "from-red-400 to-red-600", bg: "bg-red-50", count: nbrExercises }
    ];

    const recentFiles = [
        { id: 1, name: "Introduction to Machine Learning.pdf", type: "PDF", size: "2.4 MB", date: "2 hours ago", status: "processed" },
        { id: 2, name: "Advanced JavaScript Concepts.docx", type: "DOCX", size: "1.8 MB", date: "1 day ago", status: "processing" },
        { id: 3, name: "Database Design Principles.txt", type: "TXT", size: "856 KB", date: "2 days ago", status: "processed" },
        { id: 4, name: "React Components Guide.md", type: "MD", size: "1.2 MB", date: "3 days ago", status: "processed" }
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Hard': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Tutorial': return 'bg-blue-100 text-blue-700';
            case 'Guide': return 'bg-purple-100 text-purple-700';
            case 'Documentation': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    useEffect(() => {
        setUsername(localStorage.getItem('username'));

        quizService.getAllQuizzes()
            .then(quizzes => {
                const latestQuizzes = quizzes
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 3);
                setQuizzes(latestQuizzes);
                setNbrQuizzes(quizzes.length);
            })

        summaryService.getAllSummaries()
            .then(summaries => {
                const latestSummaries = summaries
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 3);
                setSummaries(latestSummaries);
                setNbrSummaries(summaries.length);
            })

        flashcardService.getAllFlashCardSets()
            .then(flashCardSets => {
                const latestFlashCardSets = flashCardSets
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 3);
                setFlashCardSets(latestFlashCardSets);
                setNbrFlash(flashCardSets.length);
            })

        exerciseSubmissionService.getAllSubmissions()
            .then(exercises => {
                const latestExercises = exercises
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 3);
                setExercises(latestExercises);
                setNbrExercises(exercises.length);
            })
    }, []);

    return (
        <div className="min-h-screen bg-white" onClick={() => setActiveDropdown(null)}>
            <NavBar />

            <div className="pt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">

                    {/* Hero Section - Full Width */}
                    <div className="relative overflow-hidden mb-8 rounded-3xl">
                        {/* Multi-layered Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-blue-500/25 to-cyan-400/30"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-pink-400/20"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-400/20 via-transparent to-transparent"></div>

                        {/* Animated Elements */}
                        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-violet-400/40 to-blue-500/40 rounded-full blur-xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-purple-500/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-br from-pink-400/40 to-violet-500/40 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>

                        {/* Glassmorphism Backdrop */}
                        <div className="absolute inset-0 backdrop-blur-xl "></div>

                        {/* Border with Gradient */}
                        <div className="absolute inset-0 border border-white/20 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent"></div>

                        <div className="relative z-10 p-8">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-4 mb-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-110">
                                            <GraduationCap className="w-8 h-8 text-white drop-shadow-lg" />
                                        </div>
                                        {/* Enhanced Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-blue-500 rounded-3xl blur-xl opacity-40 -z-10 animate-pulse"></div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-blue-500 rounded-3xl blur-2xl opacity-20 -z-20 scale-150"></div>
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                                            Welcome back, {username}!
                                        </h1>
                                        <p className="text-gray-700/90 text-lg mt-2 font-medium drop-shadow-sm">
                                            Ready to supercharge your learning journey with AI?
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Action Cards - Enhanced Design */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <button
                                    onClick={() => router.push('/quiz/generate')}
                                    className="relative flex items-center p-4 bg-white/90 backdrop-blur-lg rounded-xl border border-white/30 hover:border-purple-300/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl mr-4 group-hover:from-purple-200 group-hover:to-purple-100 transition-all duration-300 shadow-lg">
                                        <Brain className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div className="relative z-10 text-left">
                                        <p className="font-semibold text-gray-900 text-sm">Generate Quiz</p>
                                        <p className="text-xs text-gray-600">Create questions</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => router.push('/summary/generate')}
                                    className="relative flex items-center p-4 bg-white/90 backdrop-blur-lg rounded-xl border border-white/30 hover:border-green-300/50 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl mr-4 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300 shadow-lg">
                                        <BookOpen className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div className="relative z-10 text-left">
                                        <p className="font-semibold text-gray-900 text-sm">Create Summary</p>
                                        <p className="text-xs text-gray-600">Extract insights</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => router.push('/flashcards/generate')}
                                    className="relative flex items-center p-4 bg-white/90 backdrop-blur-lg rounded-xl border border-white/30 hover:border-orange-300/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl mr-4 group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300 shadow-lg">
                                        <Book className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div className="relative z-10 text-left">
                                        <p className="font-semibold text-gray-900 text-sm">Create FlashCard</p>
                                        <p className="text-xs text-gray-600">Build flashcards</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => router.push('/exsolver/generate')}
                                    className="relative flex items-center p-4 bg-white/90 backdrop-blur-lg rounded-xl border border-white/30 hover:border-red-300/50 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-xl mr-4 group-hover:from-red-200 group-hover:to-red-100 transition-all duration-300 shadow-lg">
                                        <School className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div className="relative z-10 text-left">
                                        <p className="font-semibold text-gray-900 text-sm">Solve Exercise</p>
                                        <p className="text-xs text-gray-600">Create solutions</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid - Enhanced Design */}
                    <div className="relative overflow-hidden mb-6 rounded-3xl">
                        {/* Background Effects - Matching Hero Section */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 via-gray-50/30 to-slate-200/40"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20"></div>

                        {/* Dot Pattern Background */}
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148,163,184,0.1) 1px, transparent 0)`,
                            backgroundSize: '24px 24px'
                        }}></div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-gray-200/15 to-slate-300/15 rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>

                        {/* Subtle Floating Elements */}
                        <div className="absolute top-8 left-16 w-2 h-2 bg-blue-300/40 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute top-12 right-24 w-1.5 h-1.5 bg-purple-300/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute bottom-8 left-32 w-2.5 h-2.5 bg-slate-300/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

                        {/* Moving Light Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/4 to-transparent animate-pulse"></div>

                        {/* Glassmorphism Layer */}
                        <div className="absolute inset-0 backdrop-blur-lg bg-white/10"></div>

                        {/* Border */}
                        <div className="absolute inset-0 border border-white/30 rounded-3xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-3xl"></div>

                        <div className="relative z-10 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl shadow-sm">
                                    <TrendingUp className="h-5 w-5 text-slate-700" />
                                </div>
                                <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                                    Statistics Overview
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="relative group overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/40 hover:border-blue-300/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300 shadow-sm">
                                                <FileText className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">+3</span>
                                        </div>
                                        <p className="text-2xl font-black text-gray-900 mb-1">12</p>
                                        <p className="text-sm text-gray-600 font-medium">Documents</p>
                                    </div>
                                </div>

                                <div className="relative group overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/40 hover:border-purple-300/60 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all duration-300 shadow-sm">
                                                <Brain className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">+{nbrQuizzes}</span>
                                        </div>
                                        <p className="text-2xl font-black text-gray-900 mb-1">{nbrQuizzes}</p>
                                        <p className="text-sm text-gray-600 font-medium">Quizzes</p>
                                    </div>
                                </div>

                                <div className="relative group overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/40 hover:border-green-300/60 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300 shadow-sm">
                                                <BookOpen className="h-5 w-5 text-green-600" />
                                            </div>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">+{nbrSummaries}</span>
                                        </div>
                                        <p className="text-2xl font-black text-gray-900 mb-1">{nbrSummaries}</p>
                                        <p className="text-sm text-gray-600 font-medium">Summaries</p>
                                    </div>
                                </div>

                                <div className="relative group overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/40 hover:border-orange-300/60 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300 shadow-sm">
                                                <Book className="h-5 w-5 text-orange-600" />
                                            </div>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">+{nbrFlash}</span>
                                        </div>
                                        <p className="text-2xl font-black text-gray-900 mb-1">{nbrFlash}</p>
                                        <p className="text-sm text-gray-600 font-medium">Flashcards</p>
                                    </div>
                                </div>

                                <div className="relative group overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/40 hover:border-red-300/60 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-red-100 to-red-50 group-hover:from-red-200 group-hover:to-red-100 transition-all duration-300 shadow-sm">
                                                <School className="h-5 w-5 text-red-600" />
                                            </div>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">+{nbrExercises}</span>
                                        </div>
                                        <p className="text-2xl font-black text-gray-900 mb-1">{nbrExercises}</p>
                                        <p className="text-sm text-gray-600 font-medium">Solutions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Enhanced Modern Layout */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Left Main Content */}
                        <div className="col-span-12 lg:col-span-8">
                            <div className="space-y-6">
                                {/* Featured Highlights - Full Width Card */}
                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 to-purple-200">
                                    {/* Enhanced Background Effects */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-purple-50/25 to-pink-100/30"></div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-100/20 via-transparent to-blue-100/20"></div>
                                    {/* Dot Pattern — Tailwind-only */}
                                    <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,_rgba(139,69,193,0.08)_1px,_transparent_0)] [background-size:24px_24px]"></div>
                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/25 to-pink-200/25 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>
                                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-violet-300/20 rounded-full blur-3xl -translate-x-20 translate-y-20"></div>
                                    {/* Floating Elements — animation delay via arbitrary value */}
                                    <div className="absolute top-8 left-20 w-2 h-2 bg-purple-300/50 rounded-full animate-pulse"></div>
                                    <div className="absolute bottom-12 right-24 w-1.5 h-1.5 bg-indigo-300/60 rounded-full animate-pulse [animation-delay:2s]"></div>
                                    {/* Glassmorphism */}
                                    <div className="absolute inset-0 backdrop-blur-lg bg-white/20"></div>
                                    <div className="absolute inset-0 border border-white/30 rounded-3xl"></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/8 rounded-3xl"></div>

                                    <div className="relative z-10 p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl shadow-lg">
                                                    <Star className="h-6 w-6 text-purple-700" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                                                        Today's Highlights
                                                    </h2>
                                                    <p className="text-sm text-gray-600 font-medium">Your most recent achievements</p>
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl text-sm font-medium text-purple-700 hover:bg-white/80 transition-all duration-300">
                                                View All
                                            </button>
                                        </div>

                                        {/* Featured Items - Horizontal Layout */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Latest Quiz Highlight */}
                                            {quizzes[0] && (
                                                <button onClick={() => router.push(`/quiz/${quizzes[0].id}`)} className="text-left group">
                                                    <div className="relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 hover:border-purple-300/60 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        <div className="relative z-10">
                                                            <div className="flex items-center gap-4 mb-4">
                                                                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center shadow-sm">
                                                                    <Brain className="h-7 w-7 text-purple-600" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <span className="inline-block text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full mb-2">
                                                                        Latest Quiz
                                                                    </span>
                                                                    <h3 className="font-bold text-gray-900 group-hover:text-purple-900 line-clamp-1">
                                                                        {quizzes[0].libelle}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm text-gray-600">{quizzes[0].nbRepCorrect} questions • {quizzes[0].difficulty}</p>
                                                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            )}

                                            {/* Latest Flashcard Highlight */}
                                            {flashCardSets[0] && (
                                                <button onClick={() => router.push(`/flashcards/${flashCardSets[0].id}`)} className="text-left group">
                                                    <div className="relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 hover:border-orange-300/60 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        <div className="relative z-10">
                                                            <div className="flex items-center gap-4 mb-4">
                                                                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-sm">
                                                                    <Book className="h-7 w-7 text-orange-600" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <span className="inline-block text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full mb-2">
                                                                        Latest Cards
                                                                    </span>
                                                                    <h3 className="font-bold text-gray-900 group-hover:text-orange-900 line-clamp-1">
                                                                        {flashCardSets[0].title}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm text-gray-600">{flashCardSets[0].totalCards} cards • {flashCardSets[0].difficulty}</p>
                                                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Grid - 3 Column Layout */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Recent Quizzes */}
                                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50/50 to-purple-100/50">
                                        
                                        <div className="relative z-10 p-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-200 to-purple-300 rounded-xl flex items-center justify-center shadow-sm">
                                                        <Brain className="h-4 w-4 text-purple-700" />
                                                    </div>
                                                    <h3 className="font-bold text-sm bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Quizzes</h3>
                                                </div>
                                                <button onClick={() => router.push('/quiz/list')} className="text-xs text-purple-600 hover:text-purple-800 font-medium">View All</button>
                                            </div>
                                            <div className="space-y-3">
                                                {quizzes.slice(0, 3).map((quiz, index) => (
                                                    <button onClick={() => router.push(`/quiz/${quiz.id}`)} key={index} className="w-full text-left group">
                                                        <div className="p-3 rounded-xl bg-white/60 hover:bg-white/80 border border-white/40 hover:border-purple-200/60 transition-all duration-200">
                                                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-purple-900 mb-1">{quiz.libelle}</p>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-xs text-gray-600">{quiz.subjectArea} • {quiz.difficulty}</p>
                                                                {quiz.score && (
                                                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${quiz.score >= 80 ? 'bg-green-100 text-green-700' :
                                                                            quiz.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                                                                'bg-red-100 text-red-700'
                                                                        }`}>
                                                                        {quiz.score}%
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recent Summaries */}
                                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50/50 to-green-100/50">
                                        
                                        <div className="relative z-10 p-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-green-200 to-green-300 rounded-xl flex items-center justify-center shadow-sm">
                                                        <BookOpen className="h-4 w-4 text-green-700" />
                                                    </div>
                                                    <h3 className="font-bold text-sm bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Summaries</h3>
                                                </div>
                                                <button onClick={() => router.push('/summary/list')} className="text-xs text-green-600 hover:text-green-800 font-medium">View All</button>
                                            </div>
                                            <div className="space-y-3">
                                                {summaries.slice(0, 3).map((summary, index) => (
                                                    <button onClick={() => router.push(`/summary/${summary.id}`)} key={index} className="w-full text-left group">
                                                        <div className="p-3 rounded-xl bg-white/60 hover:bg-white/80 border border-white/40 hover:border-green-200/60 transition-all duration-200">
                                                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-green-900 mb-1">{summary.libelle}</p>
                                                            <p className="text-xs text-gray-600">{summary.summaryType} • {summary.language}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recent Solutions */}
                                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-50/50 to-red-100/50">
                                        
                                        <div className="relative z-10 p-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-red-200 to-red-300 rounded-xl flex items-center justify-center shadow-sm">
                                                        <School className="h-4 w-4 text-red-700" />
                                                    </div>
                                                    <h3 className="font-bold text-sm bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Solutions</h3>
                                                </div>
                                                <button onClick={() => router.push('/exsolver/list')} className="text-xs text-red-600 hover:text-red-800 font-medium">View All</button>
                                            </div>
                                            <div className="space-y-3">
                                                {exercises.slice(0, 3).map((exercise, index) => (
                                                    <button onClick={() => router.push(`/exsolver/${exercise.id}`)} key={index} className="w-full text-left group">
                                                        <div className="p-3 rounded-xl bg-white/60 hover:bg-white/80 border border-white/40 hover:border-red-200/60 transition-all duration-200">
                                                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-red-900 mb-1">{exercise.submissionTitle}</p>
                                                            <p className="text-xs text-gray-600">{exercise.nbrOfExercises} exercises • {exercise.subject}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Weekly Performance */}
                                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/50 to-blue-100/50">
                                        <div className="relative z-10 p-6">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl flex items-center justify-center shadow-sm">
                                                    <TrendingUp className="h-4 w-4 text-blue-700" />
                                                </div>
                                                <h3 className="font-bold text-sm bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">This Week</h3>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center p-3 bg-white/60 rounded-xl">
                                                    <span className="text-sm text-gray-700 font-medium">Study Time</span>
                                                    <span className="text-lg font-black text-blue-600">12.5h</span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-white/60 rounded-xl">
                                                    <span className="text-sm text-gray-700 font-medium">Quizzes Completed</span>
                                                    <span className="text-lg font-black text-purple-600">8</span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-white/60 rounded-xl">
                                                    <span className="text-sm text-gray-700 font-medium">Average Score</span>
                                                    <span className="text-lg font-black text-green-600">94%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                            </div>
                        </div>

                        {/* Right Sidebar - Enhanced */}
                        <div className="col-span-12 lg:col-span-4">
                            <div className="space-y-6">
                                {/* Quick Upload Panel */}
                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-200 to-indigo-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-50/40 via-white/30 to-indigo-100/40"></div>
                                    <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,_rgba(99,102,241,0.06)_1px,_transparent_0)] [background-size:20px_20px]"></div>
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-200/30 to-indigo-200/30 rounded-full blur-xl translate-x-12 -translate-y-12"></div>
                                    <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
                                    <div className="absolute inset-0 border border-white/30 rounded-3xl"></div>
                                    <div className="relative z-10 p-6">
                                        <div className="text-center mb-6">
                                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                                <Upload className="h-7 w-7 text-indigo-700" />
                                            </div>
                                            <h3 className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                                                Quick Upload
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-6">Drop your files here to get started instantly</p>
                                            <button className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-2xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                                                Choose Files
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Files */}
                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-gray-100">
                                    <div className="absolute inset-0 border border-white/30 rounded-3xl"></div>
                                    <div className="relative z-10 p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center shadow-sm">
                                                <FileText className="h-4 w-4 text-slate-700" />
                                            </div>
                                            <h3 className="font-bold text-sm bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Recent Files</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {recentFiles.slice(0, 4).map((file) => (
                                                <div key={file.id} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                                                        <FileText className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-gray-900 truncate">{file.name}</p>
                                                        <p className="text-xs text-gray-600">{file.size} • {file.date}</p>
                                                    </div>
                                                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${file.status === 'processed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                                </div>
                                            ))}
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
};

export default ImprovedNavbar;