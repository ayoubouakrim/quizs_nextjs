'use client';

import React, { useState } from 'react';
import { BookOpen, Brain, FileText, BarChart3, Settings, User, Menu, X, GraduationCap, Upload, Zap } from 'lucide-react';

export default function DashboardPage() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const toggleDropdown = (dropdowwnName : any) => {
        setActiveDropdown(activeDropdown === dropdowwnName ? null : dropdowwnName);
    }

    return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-gray-800 text-xl font-bold">EduAI</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Dashboard */}
              <a
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center"
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Dashboard
              </a>

              {/* AI Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('aitools')}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center"
                >
                  <Brain className="h-4 w-4 mr-1" />
                  AI Tools
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'aitools' && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <a href="/quiz-generator" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        <FileText className="h-4 w-4 mr-2" />
                        Quiz Generator
                      </a>
                      <a href="/summarizer" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Summarizer
                      </a>
                      <a href="/exercises" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        <Zap className="h-4 w-4 mr-2" />
                        Exercise Builder
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload */}
              <a
                href="/upload"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center"
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </a>

              {/* Library */}
              <a
                href="/library"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Library
              </a>
            </div>
          </div>

          {/* Right side - User menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Notifications */}
              <button className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                <span className="sr-only">View notifications</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a5.98 5.98 0 010-8.48L21 2H9.5C7 2 5 4 5 6.5s2 4.5 4.5 4.5H15v6z" />
                </svg>
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <button
                  onClick={() => toggleDropdown('profile')}
                  className="bg-gray-100 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-200"
                >
                  <span className="sr-only">Open user menu</span>
                  <User className="h-8 w-8 text-gray-600 p-1" />
                </button>
                {activeDropdown === 'profile' && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        <User className="h-4 w-4 mr-2" />
                        Your Profile
                      </a>
                      <a href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </a>
                      <a href="/logout" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Sign out
                      </a>
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
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <a
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Dashboard
            </a>
            
            {/* Mobile AI Tools */}
            <div className="space-y-1">
              <div className="text-gray-700 px-3 py-2 text-base font-medium flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI Tools
              </div>
              <div className="pl-6 space-y-1">
                <a href="/quiz-generator" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Quiz Generator
                </a>
                <a href="/summarizer" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Summarizer
                </a>
                <a href="/exercises" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Exercise Builder
                </a>
              </div>
            </div>

            <a
              href="/upload"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload
            </a>
            
            <a
              href="/library"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Library
            </a>
          </div>
          
          {/* Mobile user menu */}
          <div className="pt-4 pb-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 text-gray-600 bg-gray-200 rounded-full p-2" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">User Name</div>
                <div className="text-sm font-medium text-gray-500">user@example.com</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a
                href="/profile"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <User className="h-5 w-5 mr-2" />
                Your Profile
              </a>
              <a
                href="/settings"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </a>
              <a
                href="/logout"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}