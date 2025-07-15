"use client";

import React, { useState } from 'react';
import { Upload, FileText, Plus, X, Settings, BookOpen, ChevronDown, FileCheck, AlertCircle, Clock } from 'lucide-react';
import NavBar from '@/components/layout/navBar';
import { SummaryPrompt } from '@/model/SummaryPrompt';
import { FileInfoService } from '@/services/FileInfoService';

const SummaryGeneratorPage = () => {
    const [formData, setFormData] = useState<SummaryPrompt>({
        id: '',
        file: null,
        summaryLength: 'medium',
        summaryType: 'general',
        language: 'auto',
        focusArea: '',
        outputFormat: 'text'
    });

    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [processingStatus, setProcessingStatus] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const summaryLengths = [
        { value: 'brief', label: 'Brief', desc: '1-2 paragraphs, key points only' },
        { value: 'medium', label: 'Medium', desc: '3-5 paragraphs, balanced overview' },
        { value: 'detailed', label: 'Detailed', desc: '6+ paragraphs, comprehensive analysis' }
    ];

    const summaryTypes = [
        { value: 'general', label: 'General', desc: 'Balanced overview for all audiences' },
        { value: 'academic', label: 'Academic', desc: 'Scholarly focus with key arguments' },
        { value: 'business', label: 'Business', desc: 'Executive summary style' },
        { value: 'technical', label: 'Technical', desc: 'Focus on procedures and specifications' }
    ];

    const languages = [
        { value: 'auto', label: 'Auto-detect' },
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'French' },
        { value: 'es', label: 'Spanish' },
        { value: 'de', label: 'German' },
        { value: 'ar', label: 'Arabic' }
    ];

    const outputFormats = [
        { value: 'text', label: 'Plain Text', desc: 'Simple text format' },
        { value: 'bullets', label: 'Bullet Points', desc: 'Structured key points' },
        { value: 'outline', label: 'Outline', desc: 'Hierarchical structure' },
        { value: 'report', label: 'Report', desc: 'Formal document style' }
    ];

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'application/pdf') {
                setFormData(prev => ({ ...prev, file }));
                setFileName(file.name);
                setFileSize(formatFileSize(file.size));
            } else {
                alert('Please upload a PDF file only.');
            }
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type === 'application/pdf') {
                setFormData(prev => ({ ...prev, file }));
                setFileName(file.name);
                setFileSize(formatFileSize(file.size));
            } else {
                alert('Please upload a PDF file only.');
            }
        }
    };

    const removeFile = () => {
        setFormData(prev => ({ ...prev, file: null }));
        setFileName('');
        setFileSize('');
        setProcessingStatus('');
        setUploadProgress(0);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.file || !formData.focusArea || !formData.summaryLength || !formData.summaryType || !formData.language || !formData.outputFormat) {
            alert('Please upload a PDF file and remplir les informations.');
            return;
        }

        setProcessingStatus('uploading');
        setUploadProgress(0);

        // Send to API or handle the quiz generation logic here
        const service = new FileInfoService();
        const response = await service.generateSummary(formData);
        if (response) {
            console.log('Quiz generated successfully:', response);
            // Redirect or show success message
        } else {
            console.error('Failed to generate quiz');
            // Show error message
        }

        // Simulate upload progress
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setProcessingStatus('processing');
                    return 100;
                }
                return prev + 10;
            });
        }, 200);

        // Simulate processing
        setTimeout(() => {
            setProcessingStatus('analyzing');
        }, 3000);

        setTimeout(() => {
            setProcessingStatus('generating');
        }, 5000);

        setTimeout(() => {
            setProcessingStatus('complete');
        }, 7000);
    };

    const getStatusIcon = () => {
        switch (processingStatus) {
            case 'uploading':
                return <Upload className="w-5 h-5 text-blue-600 animate-pulse" />;
            case 'processing':
                return <FileCheck className="w-5 h-5 text-yellow-600 animate-pulse" />;
            case 'analyzing':
                return <BookOpen className="w-5 h-5 text-purple-600 animate-pulse" />;
            case 'generating':
                return <Clock className="w-5 h-5 text-green-600 animate-pulse" />;
            case 'complete':
                return <FileCheck className="w-5 h-5 text-green-600" />;
            default:
                return null;
        }
    };

    const getStatusText = () => {
        switch (processingStatus) {
            case 'uploading':
                return 'Uploading file...';
            case 'processing':
                return 'Processing PDF...';
            case 'analyzing':
                return 'Analyzing content...';
            case 'generating':
                return 'Generating summary...';
            case 'complete':
                return 'Summary generated successfully!';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className=" mx-auto">
                {/* Header */}
                <header className="bg-gray-700 border-b-2  py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">PDF Summary Generator</h1>
                                <p className="text-sm text-blue-300">Upload your PDF and get an intelligent summary</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto space-y-8 mt-4">
                    {/* File Upload */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center mb-4">
                            <Upload className="w-5 h-5 text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Upload PDF Document</h2>
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
                                    Drop your PDF here or click to browse
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Only PDF files are supported • Max size: 50MB
                                </p>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    id="pdf-upload"
                                />
                                <label
                                    htmlFor="pdf-upload"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Select PDF File
                                </label>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center">
                                        <FileText className="w-8 h-8 text-blue-600 mr-3" />
                                        <div>
                                            <p className="font-medium text-gray-900">{fileName}</p>
                                            <p className="text-sm text-gray-600">{fileSize}</p>
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

                                {/* Progress Bar */}
                                {processingStatus && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                {getStatusIcon()}
                                                <span className="ml-2 text-sm font-medium text-gray-700">
                                                    {getStatusText()}
                                                </span>
                                            </div>
                                            {processingStatus === 'uploading' && (
                                                <span className="text-sm text-gray-500">{uploadProgress}%</span>
                                            )}
                                        </div>
                                        {processingStatus === 'uploading' && (
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Summary Options */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center mb-6">
                            <Settings className="w-5 h-5 text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Summary Configuration</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Summary Length */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Summary Length
                                </label>
                                <div className="space-y-2">
                                    {summaryLengths.map((length) => (
                                        <label key={length.value} className="flex items-start">
                                            <input
                                                type="radio"
                                                name="summaryLength"
                                                value={length.value}
                                                checked={formData.summaryLength === length.value}
                                                onChange={(e) => handleInputChange('summaryLength', e.target.value)}
                                                className="mt-0.5 mr-3 text-blue-600 focus:ring-blue-500"
                                            />
                                            <div>
                                                <span className="font-medium text-gray-900">{length.label}</span>
                                                <p className="text-xs text-gray-500">{length.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Summary Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Summary Type
                                </label>
                                <div className="space-y-2">
                                    {summaryTypes.map((type) => (
                                        <label key={type.value} className="flex items-start">
                                            <input
                                                type="radio"
                                                name="summaryType"
                                                value={type.value}
                                                checked={formData.summaryType === type.value}
                                                onChange={(e) => handleInputChange('summaryType', e.target.value)}
                                                className="mt-0.5 mr-3 text-blue-600 focus:ring-blue-500"
                                            />
                                            <div>
                                                <span className="font-medium text-gray-900">{type.label}</span>
                                                <p className="text-xs text-gray-500">{type.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Language */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Document Language
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.language}
                                        onChange={(e) => handleInputChange('language', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                    >
                                        {languages.map((lang) => (
                                            <option key={lang.value} value={lang.value}>{lang.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Output Format */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Output Format
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.outputFormat}
                                        onChange={(e) => handleInputChange('outputFormat', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                    >
                                        {outputFormats.map((format) => (
                                            <option key={format.value} value={format.value}>{format.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Focus Area */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Focus Area (Optional)
                            </label>
                            <textarea
                                value={formData.focusArea}
                                onChange={(e) => handleInputChange('focusArea', e.target.value)}
                                placeholder="Specify particular topics, sections, or aspects you want the summary to focus on..."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Help us create a more targeted summary by specifying areas of interest
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!formData.file || processingStatus}
                            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <BookOpen className="w-5 h-5 mr-2" />
                            {processingStatus ? 'Processing...' : 'Generate Summary'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryGeneratorPage;