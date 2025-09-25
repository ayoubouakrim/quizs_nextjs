"use client";

import React, { useState } from 'react';
import { Upload, FileText, Plus, X, Settings, Target, ChevronDown, Brain, Sparkles, Zap, Wand2, BookOpen, GraduationCap } from 'lucide-react';

const GenerateQuizPage = () => {
    const [formData, setFormData] = useState({
        file: null,
        subjectArea: '',
        academicLevel: '',
        numQuestions: 10,
        difficulty: '',
        description: ''
    });

    const [fileName, setFileName] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const subjectAreas = [
        'Mathematics', 'Science', 'History', 'Literature', 'Computer Science',
        'Biology', 'Chemistry', 'Physics', 'Geography', 'Economics',
        'Psychology', 'Philosophy', 'Art', 'Music', 'Languages', 'Other'
    ];

    const academicLevels = [
        'Elementary School', 'Middle School', 'High School', 
        'Undergraduate', 'Graduate', 'Professional'
    ];

    const difficultyLevels = [
        { value: 'beginner', label: 'Beginner', desc: 'Basic recall and understanding', icon: '🌱', color: 'from-green-400 to-emerald-500' },
        { value: 'intermediate', label: 'Intermediate', desc: 'Application and analysis', icon: '🚀', color: 'from-blue-400 to-indigo-500' },
        { value: 'advanced', label: 'Advanced', desc: 'Synthesis and evaluation', icon: '🧠', color: 'from-violet-400 to-purple-500' },
        { value: 'mixed', label: 'Mixed', desc: 'Combination of all levels', icon: '🎯', color: 'from-amber-400 to-orange-500' }
    ];

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if(e.type === "dragleave"){
            setDragActive(false);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setFormData(prev => ({ ...prev, file }));
            setFileName(file.name);
        }
    }

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, file }));
            setFileName(file.name);
        }
    }

    const removeFile = () => {
        setFormData(prev => ({ ...prev, file: null }));
        setFileName('');
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }

    const getCompletionPercentage = () => {
        let completed = 0;
        const total = 5; // file, subject, level, difficulty, description (optional)
        
        if (formData.file) completed++;
        if (formData.subjectArea) completed++;
        if (formData.academicLevel) completed++;
        if (formData.difficulty) completed++;
        if (formData.description) completed++;
        
        return Math.round((completed / total) * 100);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.file || !formData.subjectArea || !formData.academicLevel || !formData.difficulty) {
            // Create a more elegant error notification
            return;
        }

        setIsGenerating(true);
        
        // Simulate generation process
        setTimeout(() => {
            setIsGenerating(false);
            console.log('Quiz generated successfully:', formData);
            // Handle actual submission here
        }, 3000);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Animated background particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-1 h-1 bg-violet-400/30 rounded-full animate-ping"></div>
                <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse delay-700"></div>
                <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-cyan-400/20 rounded-full animate-ping delay-1000"></div>
                <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-violet-400/20 rounded-full animate-pulse delay-500"></div>
            </div>

            {/* Modern Header */}
            <div className="w-full max-w-7xl mx-auto relative overflow-hidden mb-8">
                {/* Glassmorphism background */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-blue-500/20 to-cyan-400/20 backdrop-blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>

                {/* Content container */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-8 border border-white/10 rounded-2xl shadow-2xl">
                    
                    {/* Title Section */}
                    <div className="lg:col-span-4 flex items-center gap-4">
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-violet-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <Wand2 className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-blue-500 rounded-2xl blur-lg opacity-30 -z-10"></div>
                        </div>

                        <div>
                            <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                                Quiz Creator
                            </h1>
                            <p className="text-gray-600/80 text-sm mt-1 font-medium">
                                Transform content • Generate brilliance
                            </p>
                        </div>
                    </div>

                    {/* Progress Section */}
                    <div className="lg:col-span-3 text-center flex flex-col justify-center">
                        <div className="relative">
                            <div className="text-2xl sm:text-3xl font-black bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent leading-none">
                                {getCompletionPercentage()}%
                            </div>
                            <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-3 py-1 mt-3 shadow-lg">
                                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Setup Complete
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-blue-500 rounded-full"></div>
                                Configuration Progress
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                                    {getCompletionPercentage()}%
                                </span>
                                {getCompletionPercentage() === 100 && (
                                    <Sparkles className="w-5 h-5 text-yellow-500 animate-bounce" />
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="w-full h-3 bg-gray-100/60 backdrop-blur-sm rounded-full overflow-hidden border border-white/20 shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 rounded-full relative transition-all duration-1000 ease-out shadow-lg"
                                    style={{ width: `${Math.max(getCompletionPercentage(), 2)}%` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-pulse"></div>
                                    <div className="absolute top-0 right-0 w-1 h-full bg-white/60 rounded-r-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* File Upload Section */}
                    <div className="relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/50 to-gray-50/40 backdrop-blur-xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-transparent"></div>
                        
                        <div className="relative z-10 border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 hover:shadow-3xl transition-all duration-500 ease-out hover:-translate-y-1 group-hover:border-white/30">
                            
                            {/* Decorative particles */}
                            <div className="absolute top-4 right-8 w-1 h-1 bg-violet-400/30 rounded-full animate-ping"></div>
                            <div className="absolute bottom-4 left-12 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse"></div>

                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-violet-400/80 to-blue-500/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                        <Upload className="w-5 h-5" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-blue-500 rounded-2xl blur-md opacity-20 -z-10"></div>
                                </div>

                                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-violet-200/50 rounded-full px-4 py-2 shadow-md">
                                    <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-blue-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">
                                        Step 1 • Upload Content
                                    </span>
                                </div>
                            </div>

                            {!fileName ? (
                                <div
                                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 relative overflow-hidden ${
                                        dragActive
                                            ? 'border-violet-400/60 bg-gradient-to-br from-violet-50/80 via-blue-50/60 to-indigo-50/80'
                                            : 'border-gray-300/50 bg-white/40 hover:border-violet-400/40 hover:bg-white/60'
                                    }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    {dragActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 via-blue-400/5 to-indigo-400/10 animate-pulse"></div>
                                    )}
                                    
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                                            <FileText className="w-8 h-8 text-gray-500" />
                                        </div>
                                        
                                        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3">
                                            Upload Your Learning Material
                                        </h3>
                                        
                                        <p className="text-gray-600 mb-6 text-sm">
                                            Drag & drop your file here, or click to browse
                                        </p>
                                        
                                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                                            {['PDF', 'DOCX', 'TXT', 'MD'].map((format) => (
                                                <span key={format} className="px-3 py-1 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full text-xs font-medium text-gray-600">
                                                    {format}
                                                </span>
                                            ))}
                                        </div>

                                        <input
                                            type="file"
                                            accept=".pdf,.docx,.txt,.md"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 via-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-violet-600 hover:via-blue-600 hover:to-indigo-600 transition-all cursor-pointer transform hover:-translate-y-0.5 relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-pulse"></div>
                                            <span className="relative flex items-center gap-2">
                                                <Plus className="w-4 h-4" />
                                                Choose File
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-50/80 via-emerald-50/60 to-teal-50/80 backdrop-blur-sm"></div>
                                    
                                    <div className="relative z-10 flex items-center justify-between p-6 border border-green-200/50 rounded-2xl shadow-md">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-green-400/80 to-emerald-500/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/20">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{fileName}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                    <span className="text-sm text-green-700 font-medium">Upload successful</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="p-2 text-gray-500 hover:bg-white/80 hover:text-red-600 rounded-full transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Configuration Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Subject & Level */}
                        <div className="relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/50 to-gray-50/40 backdrop-blur-xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-transparent"></div>
                            
                            <div className="relative z-10 border border-white/20 rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500 ease-out hover:-translate-y-1">
                                
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400/80 to-indigo-500/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-md opacity-20 -z-10"></div>
                                    </div>

                                    <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-blue-200/50 rounded-full px-4 py-2 shadow-md">
                                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                            Step 2 • Subject & Level
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Subject Area */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Subject Area *
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.subjectArea}
                                                onChange={(e) => handleInputChange('subjectArea', e.target.value)}
                                                className="w-full px-4 py-3.5 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 appearance-none shadow-sm hover:shadow-md transition-all text-gray-700 font-medium"
                                                required
                                            >
                                                <option value="">Choose your subject area</option>
                                                {subjectAreas.map((subject) => (
                                                    <option key={subject} value={subject}>
                                                        {subject}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Academic Level */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Academic Level *
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.academicLevel}
                                                onChange={(e) => handleInputChange('academicLevel', e.target.value)}
                                                className="w-full px-4 py-3.5 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 appearance-none shadow-sm hover:shadow-md transition-all text-gray-700 font-medium"
                                                required
                                            >
                                                <option value="">Select academic level</option>
                                                {academicLevels.map((level) => (
                                                    <option key={level} value={level}>
                                                        {level}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quiz Settings */}
                        <div className="relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/50 to-gray-50/40 backdrop-blur-xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent"></div>
                            
                            <div className="relative z-10 border border-white/20 rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500 ease-out hover:-translate-y-1">
                                
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400/80 to-pink-500/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                            <Settings className="w-5 h-5" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur-md opacity-20 -z-10"></div>
                                    </div>

                                    <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-purple-200/50 rounded-full px-4 py-2 shadow-md">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                                            Step 3 • Quiz Settings
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Number of Questions */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Number of Questions *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="5"
                                                max="100"
                                                value={formData.numQuestions}
                                                onChange={(e) => handleInputChange('numQuestions', parseInt(e.target.value))}
                                                className="w-full px-4 py-3.5 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 shadow-sm hover:shadow-md transition-all text-gray-700 font-medium"
                                                required
                                            />
                                            <div className="absolute right-4 top-4">
                                                <span className="text-gray-400 text-sm">questions</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                            Recommended: 10-20 for optimal learning
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Difficulty Selection */}
                    <div className="relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/50 to-gray-50/40 backdrop-blur-xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-transparent"></div>
                        
                        <div className="relative z-10 border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 hover:shadow-3xl transition-all duration-500 ease-out hover:-translate-y-1">
                            
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/80 to-teal-500/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl blur-md opacity-20 -z-10"></div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-emerald-200/50 rounded-full px-4 py-2 shadow-md mb-2">
                                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                            Step 4 • Difficulty Level
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                        Choose Challenge Level
                                    </h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {difficultyLevels.map((level) => {
                                    const isSelected = formData.difficulty === level.value;
                                    
                                    return (
                                        <label
                                            key={level.value}
                                            className={`
                                                flex items-start p-5 rounded-2xl transition-all duration-300 cursor-pointer group/option
                                                relative overflow-hidden backdrop-blur-sm border
                                                ${isSelected
                                                    ? 'border-violet-300/60 bg-gradient-to-r from-violet-50/80 via-blue-50/60 to-indigo-50/80 shadow-lg transform scale-[1.02]'
                                                    : 'border-white/40 bg-white/60 hover:bg-white/80 hover:border-white/60 hover:shadow-md'
                                                }
                                                hover:-translate-y-0.5 active:scale-[0.99]
                                            `}
                                        >
                                            {isSelected && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-violet-400/5 via-blue-400/5to-indigo-400/5 animate-pulse"></div>
                                            )}
                                            
                                            <input
                                                type="radio"
                                                name="difficulty"
                                                value={level.value}
                                                checked={isSelected}
                                                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                                                className="sr-only"
                                            />
                                            
                                            <div className="flex items-start gap-4 w-full">
                                                <div className={`
                                                    w-12 h-12 rounded-2xl flex items-center justify-center text-2xl
                                                    shadow-md border border-white/20 backdrop-blur-sm
                                                    bg-gradient-to-br ${level.color}
                                                    ${isSelected ? 'transform scale-110' : 'group-hover/option:scale-105'}
                                                    transition-transform duration-300
                                                `}>
                                                    {level.icon}
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-bold text-gray-900">{level.label}</h4>
                                                        {isSelected && (
                                                            <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full animate-pulse"></div>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 leading-relaxed">{level.desc}</p>
                                                </div>
                                                
                                                <div className={`
                                                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                                                    ${isSelected
                                                        ? 'border-violet-500 bg-gradient-to-br from-violet-500 to-blue-500'
                                                        : 'border-gray-300 bg-white group-hover/option:border-gray-400'
                                                    }
                                                    transition-all duration-200
                                                `}>
                                                    {isSelected && (
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    )}
                                                </div>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Optional Description */}
                    <div className="relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/50 to-gray-50/40 backdrop-blur-xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-teal-500/5 to-transparent"></div>
                        
                        <div className="relative z-10 border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 hover:shadow-3xl transition-all duration-500 ease-out hover:-translate-y-1">
                            
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/80 to-teal-500/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                        <Brain className="w-5 h-5" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl blur-md opacity-20 -z-10"></div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-cyan-200/50 rounded-full px-4 py-2 shadow-md mb-2">
                                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-semibold text-cyan-700 uppercase tracking-wider">
                                            Step 5 • Custom Instructions
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                        Additional Context (Optional)
                                    </h3>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Special Instructions or Focus Areas
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="e.g., Focus on practical applications, include visual elements, emphasize key concepts from chapter 3..."
                                    className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 shadow-sm hover:shadow-md transition-all text-gray-700 font-medium resize-none"
                                    rows="4"
                                />
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                    Help us customize the quiz to your specific needs
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Generate Button */}
                    <div className="relative pt-4">
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={!formData.file || !formData.subjectArea || !formData.academicLevel || !formData.difficulty || isGenerating}
                                className={`
                                    group relative px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl
                                    transition-all duration-500 transform
                                    ${!formData.file || !formData.subjectArea || !formData.academicLevel || !formData.difficulty || isGenerating
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-violet-500 via-blue-500 to-indigo-500 text-white hover:shadow-3xl hover:-translate-y-1 hover:scale-105 active:scale-95'
                                    }
                                    overflow-hidden
                                `}
                            >
                                {/* Animated background effect */}
                                {!isGenerating && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                )}
                                
                                {/* Loading animation */}
                                {isGenerating && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/80 via-blue-600/80 to-indigo-600/80">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                                    </div>
                                )}

                                <span className="relative flex items-center gap-3">
                                    {isGenerating ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Generating Quiz...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-5 h-5 group-hover:animate-bounce" />
                                            Generate Quiz
                                            <Sparkles className="w-5 h-5 opacity-80 group-hover:animate-pulse" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                        
                        {/* Progress indicator */}
                        {isGenerating && (
                            <div className="mt-6 text-center">
                                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-white/40 rounded-full px-6 py-3 shadow-lg">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">
                                        AI is analyzing your content and crafting questions...
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenerateQuizPage;