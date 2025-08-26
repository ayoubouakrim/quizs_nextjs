'use client'

import React, { useState } from 'react';
import { GraduationCap, BarChart3, Brain, FileText, BookOpen, Zap, Upload, Bell, User, Settings, Menu, X, Book } from 'lucide-react';
import Link from 'next/link';

const NavBar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

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


        <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center group">
                            <img
                                src="/brand/scribe-logoo.png"
                                alt="Scribe Logo"
                                className="h-14 w-auto mr-3 group-hover:scale-105 transition-all duration-300"
                            />
                            
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-1">
                            {/* Dashboard */}
                            <Link
                                href="/dashboard"
                                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center group"
                            >
                                <BarChart3 className="h-4 w-4 mr-1.5 group-hover:scale-110 transition-transform duration-200" />
                                Dashboard
                            </Link>

                            {/* AI Tools Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('aitools')}
                                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center group"
                                >
                                    <Brain className="h-4 w-4 mr-1.5 group-hover:scale-110 transition-transform duration-200" />
                                    AI Tools
                                    <svg
                                        className={`ml-1 h-3 w-3 transition-transform duration-200 ${activeDropdown === 'aitools' ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {activeDropdown === 'aitools' && (
                                    <div className="absolute left-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-gray-100 backdrop-blur-sm z-50">
                                        <div className="py-2">
                                            <Link href="/quiz/generate" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group">
                                                <FileText className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                                Quiz Generator
                                            </Link>
                                            <Link href="/summary/generate" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group">
                                                <BookOpen className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                                Summarizer
                                            </Link>
                                            <Link href="/flashcards/generate" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group">
                                                <Zap className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                                FlashCards Builder
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Upload */}
                            <Link
                                href="/upload"
                                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center group"
                            >
                                <Upload className="h-4 w-4 mr-1.5 group-hover:scale-110 transition-transform duration-200" />
                                Upload
                            </Link>

                            {/* Library Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('library')}
                                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center group"
                                >
                                    <BookOpen className="h-4 w-4 mr-1.5 group-hover:scale-110 transition-transform duration-200" />
                                    Library
                                    <svg
                                        className={`ml-1 h-3 w-3 transition-transform duration-200 ${activeDropdown === 'library' ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {activeDropdown === 'library' && (
                                    <div className="absolute left-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-gray-100 backdrop-blur-sm z-50">
                                        <div className="py-2">
                                            <Link href="/quiz/list" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group">
                                                <FileText className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                                Quizzes
                                            </Link>
                                            <Link href="/summary/list" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group">
                                                <BookOpen className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                                Summaries
                                            </Link>
                                            <Link href="/flashcards/list" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group">
                                                <Zap className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                                Flashcards
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right side - User menu */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-2">
                            {/* Notifications */}
                            <button className="relative bg-gray-50 hover:bg-gray-100 p-2 rounded-lg text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 group">
                                <span className="sr-only">View notifications</span>
                                <Bell className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Profile dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('profile')}
                                    className="bg-gray-50 hover:bg-gray-100 flex items-center text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 p-1.5"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <User className="h-5 w-5 text-gray-600" />
                                </button>
                                {activeDropdown === 'profile' && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-gray-100 backdrop-blur-sm z-50">
                                        <div className="py-2">
                                            <Link href="/profile" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group">
                                                <User className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                                Your Profile
                                            </Link>
                                            <Link href="/settings" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group">
                                                <Settings className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                                Settings
                                            </Link>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <Link href="/logout" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                                                Sign out
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="bg-gray-50 hover:bg-gray-100 inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-5 w-5" />
                            ) : (
                                <Menu className="block h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-4 pt-3 pb-4 space-y-2">
                        <Link
                            href="/dashboard"
                            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2.5 rounded-lg text-base font-medium flex items-center transition-all duration-200 group"
                        >
                            <BarChart3 className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                            Dashboard
                        </Link>

                        {/* Mobile AI Tools */}
                        <div className="space-y-1">
                            <div className="text-gray-600 px-3 py-2.5 text-base font-medium flex items-center">
                                <Brain className="h-5 w-5 mr-3" />
                                AI Tools
                            </div>
                            <div className="ml-6 space-y-1">
                                <Link href="/quiz/generate" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200 group">
                                    <FileText className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                    Quiz Generator
                                </Link>
                                <Link href="/summary/generate" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200 group">
                                    <BookOpen className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                    Summarizer
                                </Link>
                                <Link href="/flashcards/generate" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200 group">
                                    <Book className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                    FlashCards Builder
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="/upload"
                            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2.5 rounded-lg text-base font-medium flex items-center transition-all duration-200 group"
                        >
                            <Upload className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                            Upload
                        </Link>

                        {/* Mobile Library */}
                        <div className="space-y-1">
                            <div className="text-gray-600 px-3 py-2.5 text-base font-medium flex items-center">
                                <BookOpen className="h-5 w-5 mr-3" />
                                Library
                            </div>
                            <div className="ml-6 space-y-1">
                                <Link href="/library/quizzes" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200 group">
                                    <FileText className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                    Quizzes
                                </Link>
                                <Link href="/library/summaries" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200 group">
                                    <BookOpen className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                    Summaries
                                </Link>
                                <Link href="/library/flashcards" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200 group">
                                    <Zap className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                    Flashcards
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile user menu */}
                    <div className="pt-4 pb-4 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-center px-5 mb-3">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">User Name</div>
                                <div className="text-sm font-medium text-gray-500">user@example.com</div>
                            </div>
                        </div>
                        <div className="px-2 space-y-1">
                            <Link
                                href="/profile"
                                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2.5 rounded-lg text-base font-medium flex items-center transition-all duration-200 group"
                            >
                                <User className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                Your Profile
                            </Link>
                            <Link
                                href="/settings"
                                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2.5 rounded-lg text-base font-medium flex items-center transition-all duration-200 group"
                            >
                                <Settings className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                Settings
                            </Link>
                            <Link
                                href="/logout"
                                className="text-gray-600 hover:text-red-600 hover:bg-red-50 block px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-200"
                            >
                                Sign out
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop for dropdowns */}
            {activeDropdown && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={closeDropdowns}
                ></div>
            )}
        </nav>
    );
}

export default NavBar;