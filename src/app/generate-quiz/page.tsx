"use client";

import React, { useState } from 'react';
import { Upload, FileText, Plus, X, Settings, Target, ChevronDown, Brain } from 'lucide-react';
import NavBar from '@/components/layout/navBar';
import Footer from '@/components/layout/footer';

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

    const handleDrag = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if( e.type === "dragleave"){
            setDragActive(false);
        }
    }

    const handleDrop = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setFormData(prev => ({ ...prev, file }));
            setFileName(file.name);
        }
    }

    const handleFileSelect = (e : any) => {
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

    const handleInputChange = (field : any , value : any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }

    const handleSubmit = (e : any) => {
        e.preventDefault();
        // Here you would typically handle the form submission, e.g., send data to an API
        console.log('Form submitted:', formData);
    }




    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Brain className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Quiz</h1>
                    <p className="text-gray-600">Upload your content and customize your quiz settings</p>
                </div>

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
                            <Brain className="w5 h-5 mr-2"/>
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