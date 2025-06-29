"use client";

import React, { useState, useEffect } from 'react';
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

interface Quiz {
    id: string;
    title: string;
    subjectArea: string;
    academicLevel: string;
    difficulty: string;
    numQuestions: number;
    createdAt: string;
    lastTaken?: string;
    totalAttempts: number;
    averageScore: number;
    description: string;
    status: 'active' | 'draft' | 'archived';
}

const QuizsListPage = () => {

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSubject, setFilterSubject] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");


    // Mock Data
    useEffect(() => {
        const mockQuizzes: Quiz[] = [
            {
                id: '1',
                title: 'Advanced React Concepts',
                subjectArea: 'Computer Science',
                academicLevel: 'Undergraduate',
                difficulty: 'advanced',
                numQuestions: 25,
                createdAt: '2024-12-20T10:30:00Z',
                lastTaken: '2024-12-22T14:20:00Z',
                totalAttempts: 12,
                averageScore: 78.5,
                description: 'Comprehensive quiz covering hooks, context, and advanced patterns',
                status: 'active'
            },
            {
                id: '2',
                title: 'World War II History',
                subjectArea: 'History',
                academicLevel: 'High School',
                difficulty: 'intermediate',
                numQuestions: 20,
                createdAt: '2024-12-18T09:15:00Z',
                lastTaken: '2024-12-21T16:45:00Z',
                totalAttempts: 8,
                averageScore: 85.2,
                description: 'Key events, figures, and consequences of WWII',
                status: 'active'
            },
            {
                id: '3',
                title: 'Basic Algebra',
                subjectArea: 'Mathematics',
                academicLevel: 'Middle School',
                difficulty: 'beginner',
                numQuestions: 15,
                createdAt: '2024-12-15T11:45:00Z',
                lastTaken: '2024-12-20T10:30:00Z',
                totalAttempts: 25,
                averageScore: 72.1,
                description: 'Fundamental algebraic concepts and problem solving',
                status: 'active'
            },
            {
                id: '4',
                title: 'Organic Chemistry Basics',
                subjectArea: 'Chemistry',
                academicLevel: 'Undergraduate',
                difficulty: 'intermediate',
                numQuestions: 30,
                createdAt: '2024-12-10T14:20:00Z',
                totalAttempts: 0,
                averageScore: 0,
                description: 'Introduction to organic compounds and reactions',
                status: 'draft'
            }
        ];
        setQuizzes(mockQuizzes);
        setFilteredQuizzes(mockQuizzes);
    }, []);

    // Filter Logic
    useEffect(() => {
        let filtered = quizzes.filter(quiz => {
            const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                quiz.subjectArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesSubject = !filterSubject || quiz.subjectArea === filterSubject;
            const matchesDifficulty = !filterDifficulty || quiz.difficulty === filterDifficulty;
            const matchesStatus = !filterStatus || quiz.status === filterStatus;
            
            return matchesSearch && matchesSubject && matchesDifficulty && matchesStatus;
        });

        // Sort Logic
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'title':
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                case 'createdAt':
                    aValue = new Date(a.createdAt).getTime();
                    bValue = new Date(b.createdAt).getTime();
                    break;
                case 'averageScore':
                    aValue = a.averageScore;
                    bValue = b.averageScore;
                    break;
                case 'totalAttempts':
                    aValue = a.totalAttempts;
                    bValue = b.totalAttempts;
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


    return (
        <div className=" min-h-screen bg-gray-50">
            <NavBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Quizs</h1>
                        <p className="text-gray-600">Manage and track your generated quizzes</p>
                    </div>
                    <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Quiz
                    </button>
                </div>
                {/* Filters */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-6">
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
                        <div className=" flex flex-wrap gap-4">
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
                {/* Quiz List */}
                <div className="space-y-4">
                    {filteredQuizzes.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
                            <p className="text-gray-600">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        filteredQuizzes.map((quiz) => (
                            <div key={quiz.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                                                <div className="flex gap-2 ml-4">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                                                        {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                                                    </span>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(quiz.status)}`}>
                                                        {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 mb-3">{quiz.description}</p>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    <BookOpen className="w-4 h-4 mr-1" />
                                                    {quiz.subjectArea}
                                                </span>
                                                <span className="flex items-center">
                                                    <Target className="w-4 h-4 mr-1" />
                                                    {quiz.academicLevel}
                                                </span>
                                                <span className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {quiz.numQuestions} questions
                                                </span>
                                                <span className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    Created {formatDate(quiz.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-4 lg:mt-0 lg:ml-6">
                                            {quiz.totalAttempts > 0 && (
                                                <div className="flex gap-6 text-sm">
                                                    <div className="text-center">
                                                        <p className="font-semibold text-gray-900">{quiz.totalAttempts}</p>
                                                        <p className="text-gray-500">Attempts</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="font-semibold text-gray-900">{quiz.averageScore}%</p>
                                                        <p className="text-gray-500">Avg Score</p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex gap-2">
                                                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <BarChart3 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        
                    )}

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default QuizsListPage;