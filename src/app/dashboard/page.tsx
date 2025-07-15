'use client';

import React, { useState } from 'react';
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
    Book
} from 'lucide-react';
import NavBar from '@/components/layout/navBar';
import Footer from '@/components/layout/footer';
import { useRouter } from 'next/navigation';

const ImprovedNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const router = useRouter();


    const stats = [
        { icon: FileText, label: "Documents", value: "12", change: "+3", color: "text-blue-600", bg: "bg-blue-50" },
        { icon: Brain, label: "Quizzes", value: "48", change: "+12", color: "text-purple-600", bg: "bg-purple-50" },
        { icon: BookOpen, label: "Summaries", value: "24", change: "+8", color: "text-green-600", bg: "bg-green-50" },
        { icon: PenTool, label: "Exercises", value: "36", change: "+15", color: "text-orange-600", bg: "bg-orange-50" }
    ];

    const recentFiles = [
        { id: 1, name: "Introduction to Machine Learning.pdf", type: "PDF", size: "2.4 MB", date: "2 hours ago", status: "processed" },
        { id: 2, name: "Advanced JavaScript Concepts.docx", type: "DOCX", size: "1.8 MB", date: "1 day ago", status: "processing" },
        { id: 3, name: "Database Design Principles.txt", type: "TXT", size: "856 KB", date: "2 days ago", status: "processed" },
        { id: 4, name: "React Components Guide.md", type: "MD", size: "1.2 MB", date: "3 days ago", status: "processed" }
    ];

    const recentActivity = [
        { action: "Generated quiz", file: "Machine Learning.pdf", time: "30 min ago", type: "quiz" },
        { action: "Created summary", file: "JavaScript Concepts.docx", time: "2 hours ago", type: "summary" },
        { action: "Built exercises", file: "Database Design.txt", time: "5 hours ago", type: "exercise" },
        { action: "Uploaded file", file: "React Components.md", time: "1 day ago", type: "upload" }
    ];


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveDropdown(null);
    };

    const toggleDropdown = (dropdown: any) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const closeDropdowns = () => {
        setActiveDropdown(null);
    };

    return (

        <div className="min-h-screen bg-gray-50" onClick={() => setActiveDropdown(null)}>
            <NavBar />
            <div className="pt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="space-y-6">
                        {/* Welcome Banner */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Hello, welcome to the EduAI Dashboard!
                            </h1>
                            <p className="text-gray-600 mb=4">
                                Ready to transform your educational content with AI? Upload a file to get started.
                            </p>

                            {/* quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <button
                                    onClick={() => router.push('/generate-quiz')}
                                    className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 group"
                                >
                                    <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                                        <Brain className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Generate Quiz</p>
                                        <p className="text-xs text-gray-500">Create questions</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('summaries')}
                                    className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all duration-200 group"
                                >
                                    <div className="p-2 bg-green-100 rounded-lg mr-3 group-hover:bg-green-200 transition-colors">
                                        <BookOpen className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Create Summary</p>
                                        <p className="text-xs text-gray-500">Extract insights</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('exercises')}
                                    className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all duration-200 group"
                                >
                                    <div className="p-2 bg-orange-100 rounded-lg mr-3 group-hover:bg-orange-200 transition-colors">
                                        <BookOpen className="h-4 w-4 text-orange-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Create Exercise</p>
                                        <p className="text-xs text-gray-500">Build interactive exercises</p>
                                    </div>

                                </button>


                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, index) => {
                                const IconComponent = stat.icon;
                                return (
                                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                                <IconComponent className={`h-5 w-5 ${stat.color}`} />
                                            </div>
                                            <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-sm text-gray-600">{stat.label}</p>
                                    </div>
                                );

                            })}
                        </div>

                        {/* File Upload */}
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your educational content</h3>
                            <p className="text-gray-500 mb-4">Drag and drop files here, or click to select</p>
                            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                                <span className="px-2 py-1 bg-gray-100 rounded">PDF</span>
                                <span className="px-2 py-1 bg-gray-100 rounded">DOCX</span>
                                <span className="px-2 py-1 bg-gray-100 rounded">TXT</span>
                                <span className="px-2 py-1 bg-gray-100 rounded">MD</span>
                            </div>
                        </div>

                        {/* Recent files and activities */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Recent Files Section */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-900">Recent Files</h3>
                                </div>
                                <div className="p-4 space-y-3">
                                    {recentFiles.slice(0, 4).map((file) => (
                                        <div key={file.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                    <FileText className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                    <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${file.status === 'processed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {file.status}
                                                </span>
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <MoreVertical className="h-4 w-4 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Recent Activities Section */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                                </div>
                                <div className="p-4 space-y-3">
                                    {recentActivity.map((activity, index) => (
                                        <div key={index} className="flex items-center p-2">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${activity.type === 'quiz' ? 'bg-purple-100' :
                                                activity.type === 'summary' ? 'bg-green-100' :
                                                    activity.type === 'exercise' ? 'bg-orange-100' : 'bg-blue-100'
                                                }`}>
                                                {activity.type === 'quiz' && <Brain className="h-4 w-4 text-purple-600" />}
                                                {activity.type === 'summary' && <BookOpen className="h-4 w-4 text-green-600" />}
                                                {activity.type === 'exercise' && <PenTool className="h-4 w-4 text-orange-600" />}
                                                {activity.type === 'upload' && <Upload className="h-4 w-4 text-blue-600" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                <p className="text-xs text-gray-500">{activity.file} • {activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
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