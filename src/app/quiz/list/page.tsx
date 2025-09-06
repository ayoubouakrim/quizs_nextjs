"use client";
import { QuizService } from '@/services/QuizService';
import React, { useState, useEffect } from 'react';
import { Quiz } from '@/model/Quiz';
import { 
    Search, 
    Filter, 
    Calendar, 
    Clock, 
    Users, 
    Trophy, 
    Eye, 
    Edit, 
    Trash2, 
    Plus,
    ChevronDown,
    BookOpen,
    Target,
    BarChart3
} from 'lucide-react';
import NavBar from '@/components/layout/navBar';
import Footer from '@/components/layout/footer';
import Link from 'next/link';


const QuizsListPage = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSubject, setFilterSubject] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");


    // Mock Data
    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            const quizService = new QuizService()
            const data = await quizService.getAllQuizzes();
            console.log("Fetched quizzes in FE:", data);
            setQuizzes(data)
        } catch (e) {
            setError("Failed to fetch quizzes: " + e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    // Filter & Sort Logic
    useEffect(() => {
        let filtered = quizzes.filter(quiz => {
            const matchesSearch = quiz.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                quiz.subjectArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesSubject = !filterSubject || quiz.subjectArea === filterSubject;
            const matchesDifficulty = !filterDifficulty || quiz.difficulty === filterDifficulty;
        
            
            return matchesSearch && matchesSubject && matchesDifficulty;
        });

        // Sort Logic
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'title':
                    aValue = a.libelle.toLowerCase();
                    bValue = b.libelle.toLowerCase();
                    break;
                case 'createdAt':
                    aValue = new Date(a.createdAt).getTime();
                    bValue = new Date(b.createdAt).getTime();
                    break;
                case 'averageScore':
                    aValue = a.score; // assuming `score` is average score
                    bValue = b.score;
                    break;
                case 'totalAttempts':
                    aValue = a.nbRepCorrect; // assuming this is total attempts
                    bValue = b.nbRepCorrect;
                    break;
                default:
                    aValue = a.createdAt;
                    bValue = b.createdAt;
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredQuizzes(filtered);
    }, [quizzes, searchTerm, filterSubject, filterDifficulty, filterStatus, sortBy, sortOrder]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner':
                return 'bg-green-100 text-green-800';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800';
            case 'advanced':
                return 'bg-red-100 text-red-800';
            case 'mixed':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'draft':
                return 'bg-gray-100 text-gray-800';
            case 'archived':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const subjectAreas = [...new Set(quizzes.map(quiz => quiz.subjectArea))];
    const difficulties = ['beginner', 'intermediate', 'advanced', 'mixed'];
    const statuses = ['active', 'draft', 'archived'];

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (error) return <div className="flex items-center justify-center h-screen text-red-600">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Quizzes</h1>
                        <p className="text-gray-600">Manage and track your generated quizzes</p>
                    </div>
                    <Link href="/quiz/create" className="mt-4 sm:mt-0">
                        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Plus className="w-4 h-4 mr-2" />
                            Create New Quiz
                        </button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search quizzes..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Filters */}
                        <div className="flex flex-wrap gap-4">
                            <div className="relative">
                                <select
                                    value={filterSubject}
                                    onChange={(e) => setFilterSubject(e.target.value)}
                                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white min-w-[150px]"
                                >
                                    <option value="">All Subjects</option>
                                    {subjectAreas.map(subject => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-2 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <select
                                    value={filterDifficulty}
                                    onChange={(e) => setFilterDifficulty(e.target.value)}
                                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white min-w-[150px]"
                                >
                                    <option value="">All Difficulties</option>
                                    {difficulties.map(difficulty => (
                                        <option key={difficulty} value={difficulty}>
                                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-2 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white min-w-[120px]"
                                >
                                    <option value="">All Status</option>
                                    {statuses.map(status => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-2 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>

                            <div className="relative">
                                <select
                                    value={`${sortBy}-${sortOrder}`}
                                    onChange={(e) => {
                                        const [field, order] = e.target.value.split('-');
                                        setSortBy(field);
                                        setSortOrder(order as 'asc' | 'desc');
                                    }}
                                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white min-w-[150px]"
                                >
                                    <option value="createdAt-desc">Newest First</option>
                                    <option value="createdAt-asc">Oldest First</option>
                                    <option value="title-asc">Title A-Z</option>
                                    <option value="title-desc">Title Z-A</option>
                                    <option value="averageScore-desc">Highest Score</option>
                                    <option value="averageScore-asc">Lowest Score</option>
                                    <option value="totalAttempts-desc">Most Attempts</option>
                                    <option value="totalAttempts-asc">Least Attempts</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quiz Cards Grid */}
                {filteredQuizzes.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4"/>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No quizzes found</h3>
                        <p className="text-gray-600">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredQuizzes.map((quiz) => (
                            <div 
                                key={quiz.id} 
                                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
                            >
                                <div className="p-5 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{quiz.libelle}</h3>
                                        <div className="flex flex-col sm:flex-row gap-2 ml-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getDifficultyColor(quiz.difficulty)}`}>
                                                {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                                            </span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(quiz.difficulty)}`}>
                                                {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{quiz.description}</p>

                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 mb-4">
                                        <span className="flex items-center">
                                            <BookOpen className="w-3 h-3 mr-1" />
                                            {quiz.subjectArea}
                                        </span>
                                        <span className="flex items-center">
                                            <Target className="w-3 h-3 mr-1" />
                                            {quiz.academicLevel}
                                        </span>
                                        <span className="flex items-center">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {quiz.numQuestions} questions
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {formatDate(quiz.createdAt)}
                                        </span>
                                    </div>

                                    {quiz.nbRepCorrect > 0 && (
                                        <div className="flex gap-4 text-sm mb-4">
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">{quiz.nbRepCorrect}</p>
                                                <p className="text-gray-500 text-xs">Attempts</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">{quiz.score}%</p>
                                                <p className="text-gray-500 text-xs">Avg Score</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-2 border-t border-gray-100 mt-auto">
                                        <Link href={`/quiz/${quiz.id}`} className="flex-1">
                                            <button className="w-full p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex justify-center">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </Link>
                                        <button className="flex-1 p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors flex justify-center">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="flex-1 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex justify-center">
                                            <BarChart3 className="w-4 h-4" />
                                        </button>
                                        <button className="flex-1 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex justify-center">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default QuizsListPage;