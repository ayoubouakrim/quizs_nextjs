"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, FileText, Tag, Globe, BookOpen, Share2, Download, ChevronRight, Bookmark, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

// Mock data - replace with actual API call
const mockSummary = {
  id: 1,
  libelle: "Advanced Machine Learning Techniques in Healthcare: A Comprehensive Analysis",
  summaryLength: "detailed",
  summaryType: "academic",
  language: "en",
  focusArea: "Healthcare applications and ethical considerations",
  outputFormat: "report",
  createdAt: "2025-01-15T10:30:00Z",
  paragraphs: [
    {
      id: 1,
      title: "Introduction to ML in Healthcare",
      content: "Machine learning has revolutionized healthcare by enabling predictive analytics, diagnostic assistance, and personalized treatment plans. The integration of AI technologies in medical settings has shown remarkable potential in improving patient outcomes while reducing costs. From image recognition in radiology to natural language processing in electronic health records, ML applications are transforming how healthcare professionals approach diagnosis and treatment."
    },
    {
      id: 2,
      title: "Diagnostic and Imaging Applications",
      content: "Computer vision and deep learning models have achieved unprecedented accuracy in medical imaging analysis. These systems can detect anomalies in X-rays, MRIs, and CT scans with precision that often matches or exceeds human radiologists. Notable examples include Google's DeepMind detecting over 50 eye diseases and IBM Watson's cancer detection capabilities. The technology has proven particularly valuable in early detection of conditions like diabetic retinopathy and various forms of cancer."
    },
    {
      id: 3,
      title: "Predictive Analytics and Risk Assessment",
      content: "Healthcare institutions are leveraging machine learning algorithms to predict patient deterioration, readmission risks, and treatment outcomes. These predictive models analyze vast amounts of patient data including vital signs, lab results, and historical medical records to identify patterns that human analysis might miss. Hospitals using these systems report significant reductions in mortality rates and improved resource allocation efficiency."
    },
    {
      id: 4,
      title: "Ethical Considerations and Challenges",
      content: "The implementation of ML in healthcare raises critical ethical questions regarding patient privacy, algorithmic bias, and the potential for over-reliance on automated systems. Healthcare providers must navigate complex regulatory frameworks while ensuring that AI systems do not perpetuate existing healthcare disparities. Transparency in algorithmic decision-making and maintaining human oversight remain essential components of responsible AI deployment in medical settings."
    }
  ]
};

export default function SummaryDetailPage() {
  
  const id = 1;
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingMode, setReadingMode] = useState('single'); // 'single' or 'all'
  const [expandedCards, setExpandedCards] = useState(new Set());

  useEffect(() => {
    // Simulate API call
    const fetchSummary = async () => {
      if (id) {
        setLoading(true);
        // Replace with actual API call: await fetch(`/api/summaries/${id}`)
        setTimeout(() => {
          setSummary(mockSummary);
          setLoading(false);
        }, 1000);
      }
    };

    fetchSummary();
  }, [id]);

  const getSummaryTypeColor = (type) => {
    const colors = {
      academic: 'from-blue-500 to-indigo-600',
      business: 'from-green-500 to-emerald-600',
      technical: 'from-purple-500 to-violet-600',
      general: 'from-gray-500 to-slate-600'
    };
    return colors[type] || colors.general;
  };

  const getSummaryLengthIcon = (length) => {
    const icons = {
      brief: <FileText className="h-4 w-4" />,
      medium: <BookOpen className="h-4 w-4" />,
      detailed: <BookOpen className="h-4 w-4" />
    };
    return icons[length] || icons.brief;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const goToNextParagraph = () => {
    if (currentParagraph < summary.paragraphs.length - 1) {
      setCurrentParagraph(currentParagraph + 1);
    }
  };

  const goToPreviousParagraph = () => {
    if (currentParagraph > 0) {
      setCurrentParagraph(currentParagraph - 1);
    }
  };

  const toggleCardExpansion = (cardId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading your summary...</p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-6 mb-6 inline-block">
            <FileText className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Summary Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">The summary you're looking for seems to have wandered off.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium"
          >
            Back to Summaries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Floating Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 hover:bg-indigo-50 px-4 py-2 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setReadingMode(readingMode === 'single' ? 'all' : 'single')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  readingMode === 'single' 
                    ? 'bg-indigo-100 text-indigo-600' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {readingMode === 'single' ? 'Single' : 'All'}
              </button>
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isBookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-200">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-200">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6 pt-4">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className={`bg-gradient-to-r ${getSummaryTypeColor(summary.summaryType)} text-white px-3 py-1 rounded-md text-xs font-medium`}>
                {summary.summaryType.toUpperCase()}
              </div>
              {summary.focusArea && (
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {summary.focusArea}
                </div>
              )}
            </div>
            <h1 className="text-2xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {summary.libelle}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(summary.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{Math.ceil(summary.paragraphs.length * 1.5)} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>{summary.language.toUpperCase()}</span>
              </div>
              <div className="flex items-center space-x-1">
                {getSummaryLengthIcon(summary.summaryLength)}
                <span className="capitalize">{summary.summaryLength}</span>
              </div>
            </div>
          </div>

          {/* Content Display */}
          {readingMode === 'single' ? (
            /* Single Paragraph View */
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Section {currentParagraph + 1} of {summary.paragraphs.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(((currentParagraph + 1) / summary.paragraphs.length) * 100)}% complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentParagraph + 1) / summary.paragraphs.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Paragraph */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-sm">
                      {currentParagraph + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {summary.paragraphs[currentParagraph].title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {summary.paragraphs[currentParagraph].content}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                <button
                  onClick={goToPreviousParagraph}
                  disabled={currentParagraph === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    currentParagraph === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="font-medium">Previous</span>
                </button>

                <div className="flex items-center space-x-2">
                  {summary.paragraphs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentParagraph(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentParagraph 
                          ? 'bg-indigo-500' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNextParagraph}
                  disabled={currentParagraph === summary.paragraphs.length - 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    currentParagraph === summary.paragraphs.length - 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                  }`}
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            /* All Paragraphs View - 2 Cards per Row */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {summary.paragraphs.map((paragraph, index) => (
                <div
                  key={paragraph.id}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <button
                        onClick={() => toggleCardExpansion(paragraph.id)}
                        className="w-full text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200">
                            {paragraph.title}
                          </h3>
                          <div className="flex-shrink-0 ml-2">
                            {expandedCards.has(paragraph.id) ? (
                              <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" />
                            )}
                          </div>
                        </div>
                      </button>
                      
                      {expandedCards.has(paragraph.id) && (
                        <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
                          <p className="text-gray-700 leading-relaxed">
                            {paragraph.content}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Enjoyed this summary?</h3>
              <p className="text-indigo-100 mb-6 text-lg">Discover more insights and summaries tailored just for you.</p>
              <button
                onClick={() => window.location.href = '/summaries'}
                className="bg-white text-indigo-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
              >
                Explore More Summaries
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}