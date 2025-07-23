"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Share2, Download, Play, Sparkles, Brain, Star, FileText, Target, Clock, Volume2, Edit, Bookmark, Settings, Maximize, RotateCcw, Eye, Users } from 'lucide-react';

export default function StructuredFlashcardDisplay() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isStudyMode, setIsStudyMode] = useState(false);

  const flashcards = [
    {
      id: "1",
      question: "What is Machine Learning?",
      answer: "Machine Learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.",
      cardType: "definition"
    },
    {
      id: "2",
      question: "Supervised vs Unsupervised Learning",
      answer: "Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data without predefined correct answers.",
      cardType: "comparison"
    },
    {
      id: "3",
      question: "Real-world ML Example",
      answer: "Email spam detection - the algorithm is trained on emails labeled as 'spam' or 'not spam' to classify new incoming emails.",
      cardType: "example"
    },
    {
      id: "4",
      question: "ML Workflow Steps",
      answer: "Data Collection → Preprocessing → Model Selection → Training → Evaluation → Deployment → Monitoring",
      cardType: "process"
    },
    {
      id: "5",
      question: "What is Overfitting?",
      answer: "When a model learns training data too well, including noise, resulting in poor performance on new data.",
      cardType: "definition"
    },
    {
      id: "6",
      question: "Cross-validation Purpose",
      answer: "Technique to assess how well a model generalizes to unseen data by splitting data into multiple train/test sets.",
      cardType: "definition"
    }
  ];

  const flashcardSet = {
    id: "1",
    title: "Cellular Microscopy Image Segmentation Project – Key Vocabulary",
    description: "Essential concepts and definitions in machine learning",
    difficulty: "intermediate",
    totalCards: flashcards.length,
    createdAt: new Date(),
    studiedBy: 1247,
    rating: 4.6
  };

  const getTypeIcon = (cardType) => {
    switch(cardType) {
      case 'definition': return <Brain className="h-4 w-4" />;
      case 'comparison': return <Target className="h-4 w-4" />;
      case 'example': return <Star className="h-4 w-4" />;
      case 'process': return <Play className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const currentCard = flashcards[currentCardIndex];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Top Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span className="hover:text-gray-700 cursor-pointer">Home</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="hover:text-gray-700 cursor-pointer">Study Sets</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">Current Set</span>
          </div>
          
          {/* Title Section */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 leading-tight">{flashcardSet.title}</h1>
                  <p className="text-gray-600 mt-1">{flashcardSet.description}</p>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(flashcardSet.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{flashcardSet.rating}</span>
                  <span className="text-gray-500">({flashcardSet.studiedBy} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{flashcardSet.studiedBy.toLocaleString()} students</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>{flashcardSet.totalCards} cards</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Target className="h-4 w-4 mr-1" />
                  <span className="capitalize">{flashcardSet.difficulty}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Study Mode Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            {[
              { icon: Brain, label: 'Learn', color: 'pink', active: false },
              { icon: FileText, label: 'Practice Test', color: 'yellow', active: false },
              { icon: Target, label: 'Spaced Repetition', color: 'blue', active: false },
              { icon: Star, label: 'Match', color: 'red', active: false },
              { icon: Eye, label: 'Flashcards', color: 'purple', active: true }
            ].map((tab, index) => (
              <button
                key={index}
                className={`flex items-center space-x-2 px-6 py-4 rounded-t-lg transition-all ${
                  tab.active 
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <tab.icon className={`h-5 w-5 ${tab.active ? 'text-blue-600' : `text-${tab.color}-500`}`} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Study Area */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Study Tools Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">Progress:</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-blue-600 font-semibold">{currentCardIndex + 1}/{flashcards.length}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Sparkles className="h-4 w-4" />
                <span>Get hint</span>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Volume2 className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Flashcard Container */}
        <div className="relative mb-8">
          {/* Card Type Indicator */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              {getTypeIcon(currentCard.cardType)}
              <span className="text-sm font-medium text-gray-700 capitalize">{currentCard.cardType}</span>
            </div>
          </div>

          {/* Main Flashcard */}
          <div 
            className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            onClick={handleCardClick}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative p-12 min-h-[400px] flex items-center justify-center">
              <div className="text-center max-w-3xl">
                {!isFlipped ? (
                  <div>
                    <div className="text-sm text-gray-500 mb-4 font-medium">QUESTION</div>
                    <p className="text-2xl text-gray-900 leading-relaxed font-medium">
                      {currentCard.question}
                    </p>
                    <div className="mt-8 text-sm text-gray-400">
                      Click to reveal answer
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm text-blue-600 mb-4 font-medium">ANSWER</div>
                    <p className="text-xl text-gray-700 leading-relaxed">
                      {currentCard.answer}
                    </p>
                    <div className="mt-8 text-sm text-gray-400">
                      Click to show question
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Flip Indicator */}
            <div className="absolute top-4 right-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <RotateCcw className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center space-x-3">
              <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Card Sorting</span>
                <div className="relative">
                  <input type="checkbox" className="sr-only" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full shadow-inner cursor-pointer"></div>
                  <div className="absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition-transform cursor-pointer"></div>
                </div>
              </div>
            </div>
            
            {/* Center Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={prevCard}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={flashcards.length <= 1}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl px-6 py-3 shadow-sm">
                <span className="text-lg font-bold text-gray-900">
                  {currentCardIndex + 1} / {flashcards.length}
                </span>
              </div>
              
              <button
                onClick={nextCard}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={flashcards.length <= 1}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-3">
              <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Study Set Summary */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Study Set Information</h3>
            <p className="text-gray-600">Track your progress and review key details about this flashcard set</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{flashcardSet.totalCards}</div>
                <div className="text-gray-600">Total Cards</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1 capitalize">{flashcardSet.difficulty}</div>
                <div className="text-gray-600">Difficulty Level</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{flashcardSet.createdAt.toLocaleDateString()}</div>
                <div className="text-gray-600">Created</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}