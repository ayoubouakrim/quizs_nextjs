"use client";

import React, { useState } from 'react';
import { Upload, FileText, Plus, X, Settings, Target, ChevronDown, Brain } from 'lucide-react';
import NavBar from '@/components/layout/navBar';
import Footer from '@/components/layout/footer';
import { FileInfoService } from '@/services/FileInfoService';

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
        { value: 'beginner', label: 'Beginner', desc: 'Basic recall and understanding' },
        { value: 'intermediate', label: 'Intermediate', desc: 'Application and analysis' },
        { value: 'advanced', label: 'Advanced', desc: 'Synthesis and evaluation' },
        { value: 'mixed', label: 'Mixed', desc: 'Combination of all levels' }
    ];

    const handleDrag = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setFormData(prev => ({ ...prev, file }));
            setFileName(file.name);
        }
    }

    const handleFileSelect = (e: any) => {
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

    const handleInputChange = (field: any, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Here you would typically handle the form submission, e.g., send data to an API
        if (!formData.file || !formData.subjectArea || !formData.academicLevel || !formData.difficulty) {
            alert('Please fill in all required fields and upload a file.');
            return;
        }

        // Send to API or handle the quiz generation logic here
        const service = new FileInfoService();
        const response = await service.generateQuiz(formData);
        if (response) {
            console.log('Quiz generated successfully:', response);
            // Redirect or show success message
        } else {
            console.error('Failed to generate quiz');
            // Show error message
        }
    }




    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            {/* Header - ONE LINE */}
            <header className="relative bg-white md:p-8 p-6 text-gray-900 overflow-hidden ">
                {/* Glassmorphism background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-blue-500/20 to-cyan-400/20 backdrop-blur-xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-violet-400/30 to-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute top-0 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-400/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between gap-6">
                        {/* Left: Icon + Main Content */}
                        <div className="flex items-center gap-6">
                            {/* Premium Icon */}
                            <div className="relative group cursor-pointer flex-shrink-0">
                                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-violet-400 to-blue-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-40 transition-opacity -z-10"></div>
                                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:rotate-0 transition-all duration-500 border border-white/20 transform rotate-3">
                                    <Brain className="w-8 h-8 text-white drop-shadow-lg" />
                                    <div className="absolute inset-1 rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>

                            {/* Title + Description */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                <h1 className="text-2xl sm:text-2xl lg:text-2xl font-black leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                    Turn{" "}
                                    <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-[length:300%_300%]">
                                        Any Content
                                    </span>{" "}
                                    into Interactive Quizzes

                                </h1>
                                <div className="hidden lg:block w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-600/80 font-medium max-w-md">
                                    Paste text, upload documents, or share a webpage — our{" "}
                                    <span className="font-semibold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                                        AI creates smart questions
                                    </span>{" "}
                                    in seconds
                                </p>
                            </div>
                        </div>

                        {/* Right: Status CTA */}
                        <div className="hidden sm:flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer flex-shrink-0">
                            <div className="relative">
                                <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                                <div className="absolute inset-0 w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                                Ready to transform your content
                            </span>
                            <div className="w-4 h-4 text-violet-600 group-hover:translate-x-1 transition-transform duration-300">
                                →
                            </div>
                        </div>
                    </div>
                </div>


            </header>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* File */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center mb-4">
                            <Upload className="w-5 h-5 text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Upload Content</h2>
                        </div>
                        {!fileName ? (
                            <div
                                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                                    ? 'border-blue-400 bg-blue-50'
                                    : 'border-gray-300 hover:border-blue-400'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Drop your file here or click to browse
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Supported formats: PDF, DOCX, TXT, MD
                                </p>
                                <input
                                    type="file"
                                    accept=".pdf,.docx,.txt,.md"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Select File
                                </label>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center">
                                    <FileText className="w-8 h-8 text-blue-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-900">{fileName}</p>
                                        <p className="text-sm text-gray-600">File uploaded successfully</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Settings */}
                    <div>
                        <div className="flex items-center mb-6">
                            <Settings className="w-5 h-5 text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Quiz Configuration</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject Area *
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.subjectArea}
                                        onChange={(e) => handleInputChange('subjectArea', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                        required
                                    >
                                        <option value="">Select subject area</option>
                                        {subjectAreas.map((subject) => (
                                            <option key={subject} value={subject}>{subject}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Academic Level */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Academic Level *
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.academicLevel}
                                        onChange={(e) => handleInputChange('academicLevel', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                        required
                                    >
                                        <option value="">Select academic level</option>
                                        {academicLevels.map((level) => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Number of Questions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Questions *
                                </label>
                                <input
                                    type="number"
                                    min="5"
                                    max="100"
                                    value={formData.numQuestions}
                                    onChange={(e) => handleInputChange('numQuestions', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Between 5 and 100 questions</p>
                            </div>

                            {/* Difficulty Level */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Difficulty Level *
                                </label>
                                <div className="space-y-2">
                                    {difficultyLevels.map((level) => (
                                        <label key={level.value} className="flex items-start">
                                            <input
                                                type="radio"
                                                name="difficulty"
                                                value={level.value}
                                                checked={formData.difficulty === level.value}
                                                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                                                className="mt-0.5 mr-3 text-blue-600 focus:ring-blue-500"
                                                required
                                            />
                                            <div>
                                                <span className="font-medium text-gray-900">{level.label}</span>
                                                <p className="text-xs text-gray-500">{level.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Description */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center mb-4">
                            <Target className="w-5 h-5 text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Learning Objective</h2>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                What do you want to achieve with this quiz?
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Describe the learning goals, key concepts to assess, or specific outcomes you want from this quiz..."
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                This helps generate more targeted and relevant questions
                            </p>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            <Brain className="w5 h-5 mr-2" />
                            Generate Quiz
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>

    );

}

export default GenerateQuizPage;