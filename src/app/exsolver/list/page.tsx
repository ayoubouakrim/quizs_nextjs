"use client";

import React, { useState, useEffect } from 'react';
import {
    FileText, Calendar, BookOpen, Hash, Search, Filter,
    ChevronDown, Clock, MoreVertical, Eye, Download,
    Trash2, Edit, Plus, AlertCircle, Calculator, Zap,
    Target, Brain, Settings, HelpCircle
} from 'lucide-react';
import NavBar from '@/components/layout/navBar';
import { ExerciseSubmissionService } from '@/services/ExerciseSubmissonService';
import { ExerciseSubmission } from '@/model/ExerciseSubmission';

// Mock data matching your ExerciseSubmission class structure

const SUBJECT_COLORS = {
    "mathematics": { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", label: "Mathematics", icon: <Calculator className="h-4 w-4" /> },
    "physics": { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200", label: "Physics", icon: <Zap className="h-4 w-4" /> },
    "chemistry": { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", label: "Chemistry", icon: <BookOpen className="h-4 w-4" /> },
    "computer-science": { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200", label: "Computer Science", icon: <Brain className="h-4 w-4" /> },
    "biology": { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200", label: "Biology", icon: <Target className="h-4 w-4" /> },
    "engineering": { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200", label: "Engineering", icon: <Settings className="h-4 w-4" /> },
    "economics": { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", label: "Economics", icon: <HelpCircle className="h-4 w-4" /> },
    "other": { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200", label: "Other", icon: <FileText className="h-4 w-4" /> }
};

export default function ExerciseSubmissionsList() {
    const [submissions, setSubmissions] = useState<ExerciseSubmission[]>([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState<ExerciseSubmission[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [loading, setLoading] = useState(true);

    const submissionService = new ExerciseSubmissionService();

    const fetchSubmissions = async () => {
        try {
            const response = await submissionService.getAllSubmissions();
            console.log("Fetched submissions:", response);
            setSubmissions(response);
            setFilteredSubmissions(response);
        } catch (error) {
            console.error("Error fetching submissions:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        setLoading(true);
        fetchSubmissions();

    }, []);

    useEffect(() => {
        let filtered = [...submissions];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(sub =>
                sub.submissionTitle.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by subject
        if (selectedSubject !== 'all') {
            filtered = filtered.filter(sub => sub.subject === selectedSubject);
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'date') {
                // Convert dates to timestamps for comparison
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            if (sortBy === 'title') return a.submissionTitle.localeCompare(b.submissionTitle);
            if (sortBy === 'exercises') return b.nbrOfExercises - a.nbrOfExercises;
            return 0;
        });

        setFilteredSubmissions(filtered);
    }, [searchTerm, selectedSubject, sortBy, submissions]);

    const formatDate = (date: Date) => {
        const now = new Date();
        // Convert dates to timestamps (milliseconds since epoch)
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (diffDays === 1) {
            return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    };

    const getSubjectColors = (subject: string) => {
        return SUBJECT_COLORS[subject] || SUBJECT_COLORS.other;
    };

    const uniqueSubjects = Array.from(new Set(submissions.map(sub => sub.subject)));

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Exercise Submissions</h1>
                            <p className="text-gray-600 mt-1">Manage and review all your exercise submissions</p>
                        </div>
                        <button className="inline-flex items-center px-4 py-2 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 transition-colors shadow-sm">
                            <Plus className="w-4 h-4 mr-2" />
                            New Submission
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search submissions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                />
                            </div>
                        </div>

                        {/* Subject Filter */}
                        <div className="relative">
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                            >
                                <option value="all">All Subjects</option>
                                {uniqueSubjects.map(subject => {
                                    const subjectInfo = getSubjectColors(subject);
                                    return (
                                        <option key={subject} value={subject}>{subjectInfo.label}</option>
                                    );
                                })}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="title">Sort by Title</option>
                                <option value="exercises">Sort by Exercises</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        </div>
                    </div>
                </div>


                {/* Submissions Cards */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
                        <div className="flex flex-col items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mb-4"></div>
                            <p className="text-gray-600">Loading submissions...</p>
                        </div>
                    </div>
                ) : filteredSubmissions.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
                        <div className="flex flex-col items-center justify-center">
                            <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-gray-600 text-lg font-medium">No submissions found</p>
                            <p className="text-gray-500 mt-1">Try adjusting your filters or search term</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredSubmissions.map((submission) => {
                            const colors = getSubjectColors(submission.subject);
                            return (
                                <div key={submission.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-sky-200 transition-all duration-200">
                                    {/* Header with Subject Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} ${colors.border} border flex items-center gap-1`}>
                                            {colors.icon}
                                            {colors.label}
                                        </span>
                                        <span className="text-xs text-gray-500 font-medium">#{submission.id}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">
                                        {submission.submissionTitle}
                                    </h3>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center mr-2">
                                                <Hash className="w-4 h-4 text-sky-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {submission.nbrOfExercises}
                                                </p>
                                                <p className="text-xs text-gray-500">Exercises</p>

                                            </div>
                                        </div>

                                    </div>

                                    {/* Full Date */}
                                    <div className="pt-3 border-t border-gray-100 mb-4">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {formatDate(submission.createdAt)}
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                                                <Eye className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                                                <Download className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                                                <Edit className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}