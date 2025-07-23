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
    FileCheck
} from 'lucide-react';
import NavBar from '@/components/layout/navBar';
import { FileInfoService } from '@/services/FileInfoService';
import { FlashCardSetPrompt } from '@/model/FlashCardSetPrompt';
import { resolve } from 'path';
import ProcessingComponent from '@/components/flashCards/ProcessingComponent';
import Footer from '@/components/layout/footer';

export default function FlashcardGenerator() {
    const [formData, setFormData] = useState<FlashCardSetPrompt>({
        id: '',
        file: null,
        title: '',
        description: '',
        difficulty: 'intermediate',
        totalCards: 20,
        selectedCardTypes: ['definition', 'example', 'concept']

    });

    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [processingStatus, setProcessingStatus] = useState('');


    const fileInputRef = useRef(null);

    const cardTypes = [
        {
            id: 'definition',
            label: 'Definitions',
            icon: <BookOpen className="h-4 w-4" />,
            description: 'Key terms and their meanings'
        },
        {
            id: 'concept',
            label: 'Concepts',
            icon: <Brain className="h-4 w-4" />,
            description: 'Important ideas and principles'
        },
        {
            id: 'example',
            label: 'Examples',
            icon: <Target className="h-4 w-4" />,
            description: 'Real-world applications'
        },
        {
            id: 'process',
            label: 'Processes',
            icon: <Zap className="h-4 w-4" />,
            description: 'Step-by-step procedures'
        },
        {
            id: 'comparison',
            label: 'Comparisons',
            icon: <HelpCircle className="h-4 w-4" />,
            description: 'Similarities and differences'
        },
        {
            id: 'formula',
            label: 'Formulas',
            icon: <Settings className="h-4 w-4" />,
            description: 'Mathematical equations'
        }
    ];

    const difficulties = [
        { value: 'beginner', label: 'Beginner', desc: 'Basic concepts and simple explanations' },
        { value: 'intermediate', label: 'Intermediate', desc: 'Moderate complexity with detailed explanations' },
        { value: 'advanced', label: 'Advanced', desc: 'Complex concepts requiring deep understanding' }
    ];

    const formatFileSize = (bytes: any) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDrag = (e: any) => {
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
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'text/markdown'];

            if (allowedTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.md') || selectedFile.name.endsWith('.txt')) {
                setFormData(prev => ({ ...prev, file: selectedFile }));
                setFileName(selectedFile.name);
                setFileSize(formatFileSize(selectedFile.size));

                // Auto-generate title from filename if empty
                if (!formData.title) {
                    const title = selectedFile.name.replace(/\.[^/.]+$/, "");
                    setFormData(prev => ({ ...prev, title: title }));
                }
            } else {
                alert('Please upload a PDF, Word document, text file, or markdown file.');
            }
        }
    };

    const removeFile = () => {
        setFormData(prev => ({ ...prev, file: null, title: '' }));
        setFileName('');
        setFileSize('');
        setProcessingStatus('');

    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCardTypeToggle = (typeId: string) => {
        setFormData(prev => ({
            ...prev,
            selectedCardTypes: prev.selectedCardTypes.includes(typeId)
                ? prev.selectedCardTypes.filter(id => id !== typeId)
                : [...prev.selectedCardTypes, typeId]
        }));
    };

    const handleSubmit = async () => {
        if (!formData.file || !formData.title || formData.selectedCardTypes.length === 0) {
            alert('Please upload a file, provide a title, and select at least one card type.');
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setProcessingStatus('preprocessing');
        await new Promise(resolve => setTimeout(resolve, 5000));

        try {
            setProcessingStatus('generating');

            const service = new FileInfoService();
            const response = await service.generateFlashCards(formData);
            console.log('Flashcards generated successfully:', response);
            localStorage.setItem('flashcards', JSON.stringify(response));

            setProcessingStatus('completed')
        } catch (error) {
            console.error('Error generating flash cards:', error);
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
                            <h1 className="text-2xl font-bold text-gray-900">AI Flashcard Generator</h1>
                            <p className="text-gray-600">Upload your document and get intelligent flashcards</p>
                        </div>
                    </div>
                </div>
            </header>

            {processingStatus !== '' && (
                <ProcessingComponent processingStatus={processingStatus} fileName={fileName} />
            )}


            <div className="max-w-4xl mx-auto space-y-6 mt-3 px-4">
                {/* File Upload Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                            <Upload className="w-4 h-4 text-sky-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Upload Document</h2>
                    </div>

                    {!fileName ? (
                        <div
                            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${dragActive
                                ? 'border-sky-400 bg-sky-50 scale-[1.01]'
                                : 'border-gray-300 hover:border-sky-300 hover:bg-gray-50'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-6 h-6 text-gray-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Drop your document here or click to browse
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Supports PDF, Word, Text, and Markdown files • Max size: 50MB
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx,.txt,.md"
                                onChange={(e) => handleFileSelect(e.target.files[0])}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="inline-flex items-center px-5 py-2.5 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 cursor-pointer transition-all duration-200 shadow-sm"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Select Document
                            </label>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-sky-50 rounded-2xl border border-sky-200">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3 shadow-sm">
                                        <FileText className="w-5 h-5 text-sky-600" />
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

                {/* Basic Information */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                            <FileText className="w-4 h-4 text-sky-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Flashcard Set Details</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Set Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Enter a title for your flashcard set"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-900 placeholder-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description (Optional)
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Brief description of what this set covers"
                                rows={2}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none text-gray-900 placeholder-gray-500"
                            />
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Help us create more targeted flashcards by specifying areas of interest
                            </p>
                        </div>
                    </div>
                </div>

                {/* Configuration Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                            <Settings className="w-4 h-4 text-sky-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Flashcard Configuration</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Difficulty Level */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Difficulty Level
                            </label>
                            <div className="space-y-2">
                                {difficulties.map((diff) => (
                                    <label key={diff.value} className="flex items-start cursor-pointer">
                                        <input
                                            type="radio"
                                            name="difficulty"
                                            value={diff.value}
                                            checked={formData.difficulty === diff.value}
                                            onChange={(e) => handleInputChange('difficulty', e.target.value)}
                                            className="mt-1 mr-3 text-sky-600 focus:ring-sky-500"
                                        />
                                        <div>
                                            <span className="font-semibold text-gray-900">{diff.label}</span>
                                            <p className="text-sm text-gray-600 mt-0.5">{diff.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Max Cards */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Maximum Cards: <span className="text-sky-600 font-bold">{formData.maxCards}</span>
                            </label>
                            <input
                                type="range"
                                min="5"
                                max="50"
                                value={formData.maxCards}
                                onChange={(e) => handleInputChange('maxCards', parseInt(e.target.value))}
                                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                style={{
                                    background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((formData.maxCards - 5) / 45) * 100}%, #e2e8f0 ${((formData.maxCards - 5) / 45) * 100}%, #e2e8f0 100%)`
                                }}
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-2 font-medium">
                                <span>5 cards</span>
                                <span>50 cards</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Types Selection */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                            <Brain className="w-4 h-4 text-sky-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Select Card Types</h2>
                    </div>
                    <p className="text-gray-600 mb-5">
                        Choose which types of flashcards you'd like AI to create from your document
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {cardTypes.map((type) => {
                            const isSelected = formData.selectedCardTypes.includes(type.id);
                            return (
                                <button
                                    key={type.id}
                                    onClick={() => handleCardTypeToggle(type.id)}
                                    className={`p-4 rounded-2xl border-2 transition-all text-left transform hover:scale-[1.02] ${isSelected
                                        ? 'border-sky-400 bg-sky-50 shadow-sm'
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${isSelected
                                            ? 'bg-sky-500'
                                            : 'bg-gray-400'
                                            }`}>
                                            {type.icon}
                                        </div>
                                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center ${isSelected ? 'border-sky-500 bg-sky-500' : 'border-gray-300'
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

                    {formData.selectedCardTypes.length === 0 && (
                        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center">
                            <AlertCircle className="h-4 w-4 text-orange-600 mr-2" />
                            <span className="text-orange-800 font-medium">Please select at least one card type</span>
                        </div>
                    )}
                </div>



                {/* Submit Button */}
                <div className="flex justify-end pb-8">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!formData.file || !formData.title || formData.selectedCardTypes.length === 0 || processingStatus !== ''}
                        className="inline-flex  items-center px-8 py-3 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        {processingStatus ? processingStatus : 'Generate Flashcards'}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}



