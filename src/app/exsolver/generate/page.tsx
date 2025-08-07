"use client";

import React, { useState, useRef } from 'react';
import {
    Upload,
    FileText,
    Sparkles,
    Settings,
    Check,
    X,
    ChevronDown,
    Brain,
    Target,
    HelpCircle,
    BookOpen,
    Zap,
    Clock,
    AlertCircle,
    Play,
    Plus,
    FileCheck,
    Calculator,
    PenTool,
    MessageCircle
} from 'lucide-react';
import { FileInfoService } from '@/services/FileInfoService';
import NavBar from '@/components/layout/navBar';

export default function ExerciseSolutionGenerator() {
    const [formData, setFormData] = useState({
        id: '',
        file: null,
        subject: '',
        solutionType: 'step-by-step',
        userAdds: ''
    });

    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [processingStatus, setProcessingStatus] = useState('');

    const fileInputRef = useRef(null);

    const solutionTypes = [
        {
            id: 'step-by-step',
            label: 'Step-by-Step Solutions',
            icon: <Target className="h-4 w-4" />,
            description: 'Detailed breakdown of solution process'
        },
        {
            id: 'concise',
            label: 'Concise Solutions',
            icon: <Zap className="h-4 w-4" />,
            description: 'Quick, direct answers with key points'
        },
        {
            id: 'conceptual',
            label: 'Conceptual Explanations',
            icon: <Brain className="h-4 w-4" />,
            description: 'Focus on underlying concepts and theory'
        },
        {
            id: 'visual',
            label: 'Visual Solutions',
            icon: <PenTool className="h-4 w-4" />,
            description: 'Diagrams, charts, and visual aids'
        },
        {
            id: 'interactive',
            label: 'Interactive Format',
            icon: <MessageCircle className="h-4 w-4" />,
            description: 'Q&A style with guided discovery'
        }
    ];

    const subjects = [
        { value: 'mathematics', label: 'Mathematics', icon: <Calculator className="h-4 w-4" /> },
        { value: 'physics', label: 'Physics', icon: <Zap className="h-4 w-4" /> },
        { value: 'chemistry', label: 'Chemistry', icon: <BookOpen className="h-4 w-4" /> },
        { value: 'biology', label: 'Biology', icon: <Target className="h-4 w-4" /> },
        { value: 'computer-science', label: 'Computer Science', icon: <Brain className="h-4 w-4" /> },
        { value: 'engineering', label: 'Engineering', icon: <Settings className="h-4 w-4" /> },
        { value: 'economics', label: 'Economics', icon: <HelpCircle className="h-4 w-4" /> },
        { value: 'other', label: 'Other', icon: <FileText className="h-4 w-4" /> }
    ];

    const formatFileSize = (bytes: any) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDrag = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (selectedFile: any) => {
        if (selectedFile) {
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'text/markdown', 'image/jpeg', 'image/png'];

            if (allowedTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.md') || selectedFile.name.endsWith('.txt')) {
                setFormData(prev => ({ ...prev, file: selectedFile }));
                setFileName(selectedFile.name);
                setFileSize(formatFileSize(selectedFile.size));
            } else {
                alert('Please upload a PDF, Word document, text file, markdown file, or image (JPG/PNG).');
            }
        }
    };

    const removeFile = () => {
        setFormData(prev => ({ ...prev, file: null }));
        setFileName('');
        setFileSize('');
        setProcessingStatus('');
    };

    const handleInputChange = (field: any, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.file || !formData.subject || !formData.solutionType) {
            alert('Please upload a file with exercises, select a subject, and choose a solution type.');
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setProcessingStatus('processing');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        try {
            // Here you would call your actual service
            const service = new FileInfoService();
            const response = await service.generateExerciseSolution(formData);
            setProcessingStatus('completed');
        } catch (error) {
            console.error('Error generating solutions:', error);
            setProcessingStatus('error');
            alert('An error occurred while processing your request. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 mb-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-3">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">AI Exercise Solution Generator</h1>
                            <p className="text-gray-600">Upload your exercise sheets and get detailed solutions with explanations</p>
                        </div>
                    </div>
                </div>
            </header>

            {processingStatus && (
                <div className="max-w-4xl mx-auto px-4 mb-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-500 mr-3"></div>
                            <span className="text-gray-700 font-medium">
                                {processingStatus === 'processing' && 'Analyzing exercises and generating solutions...'}
                                {processingStatus === 'completed' && 'Solutions generated successfully!'}
                                {processingStatus === 'error' && 'Error occurred during processing'}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto space-y-6 mt-3 px-4">
                {/* File Upload Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                            <Upload className="w-4 h-4 text-sky-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Upload Exercise Sheet</h2>
                    </div>

                    {!fileName ? (
                        <div
                            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                                dragActive
                                    ? 'border-sky-400 bg-sky-50 scale-[1.01]'
                                    : 'border-gray-300 hover:border-sky-300 hover:bg-gray-50'
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileCheck className="w-6 h-6 text-gray-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Drop your exercise sheet here or click to browse
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Upload PDFs with exercises, problem sets, homework, or practice questions • Max size: 50MB
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const  files = e.target.files;
                                    if (files && files[0]) {
                                        handleFileSelect(files[0]);
                                    }
                                }}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="inline-flex items-center px-5 py-2.5 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 cursor-pointer transition-all duration-200 shadow-sm"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Select Exercise File
                            </label>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-sky-50 rounded-2xl border border-sky-200">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3 shadow-sm">
                                        <FileCheck className="w-5 h-5 text-sky-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{fileName}</p>
                                        <p className="text-sm text-gray-600">{fileSize}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="p-2 hover:bg-white hover:bg-opacity-70 rounded-xl transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Subject Selection */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                            <BookOpen className="w-4 h-4 text-sky-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Subject Area</h2>
                    </div>
                    <p className="text-gray-600 mb-5">
                        Select the subject area of your exercises to get more accurate and relevant solutions
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                        {subjects.map((subject) => {
                            const isSelected = formData.subject === subject.value;
                            return (
                                <button
                                    key={subject.value}
                                    onClick={() => handleInputChange('subject', subject.value)}
                                    className={`p-4 rounded-2xl border-2 transition-all text-center transform hover:scale-[1.02] ${
                                        isSelected
                                            ? 'border-sky-400 bg-sky-50 shadow-sm'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 shadow-sm'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2 text-white ${
                                        isSelected ? 'bg-sky-500' : 'bg-gray-400'
                                    }`}>
                                        {subject.icon}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-sm">{subject.label}</h3>
                                </button>
                            );
                        })}
                    </div>

                    {!formData.subject && (
                        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center">
                            <AlertCircle className="h-4 w-4 text-orange-600 mr-2" />
                            <span className="text-orange-800 font-medium">Please select a subject area</span>
                        </div>
                    )}
                </div>

                {/* Solution Type Selection */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                            <Settings className="w-4 h-4 text-sky-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Solution Format</h2>
                    </div>
                    <p className="text-gray-600 mb-5">
                        Choose how you'd like the exercise solutions to be presented and explained
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                        {solutionTypes.map((type) => {
                            const isSelected = formData.solutionType === type.id;
                            return (
                                <button
                                    key={type.id}
                                    onClick={() => handleInputChange('solutionType', type.id)}
                                    className={`p-4 rounded-2xl border-2 transition-all text-left transform hover:scale-[1.02] ${
                                        isSelected
                                            ? 'border-sky-400 bg-sky-50 shadow-sm'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 shadow-sm'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${
                                            isSelected ? 'bg-sky-500' : 'bg-gray-400'
                                        }`}>
                                            {type.icon}
                                        </div>
                                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center ${
                                            isSelected ? 'border-sky-500 bg-sky-500' : 'border-gray-300'
                                        }`}>
                                            {isSelected && <Check className="h-3 w-3 text-white" />}
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{type.label}</h3>
                                    <p className="text-sm text-gray-600">{type.description}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
</div>
                {/* Additional Instructions */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                            <MessageCircle className="w-4 h-4 text-sky-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Additional Instructions</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Special Requirements or Focus Areas (Optional)
                        </label>
                        <textarea
                            value={formData.userAdds}
                            onChange={(e) => handleInputChange('userAdds', e.target.value)}
                            placeholder="e.g., Focus on specific problem numbers, explanation level preferences, particular solution methods you want to see, or any other special instructions for solving the exercises..."
                            rows={4}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none text-gray-900 placeholder-gray-500"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Help us provide solutions tailored to your specific needs and learning style
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pb-8">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!formData.file || !formData.subject || !formData.solutionType || processingStatus === 'processing'}
                        className="inline-flex items-center px-8 py-3 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        {processingStatus === 'processing' ? 'Generating Solutions...' : 'Generate Solutions'}
                    </button>
                </div>
            </div>
        </div>
    );
}