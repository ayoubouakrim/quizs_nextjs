"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Eye, EyeOff, Share2, Download, Play, Sparkles, Brain, Zap, Target, Clock, FileText, Star, Edit3, Trash2, Filter, MoreVertical, ArrowLeft, ArrowRight, Shuffle } from 'lucide-react';

export default function SingleFlashcardDisplay() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [isStudyMode, setIsStudyMode] = useState(false);

  const generationInfo = {
    sourceDocument: "Machine Learning Fundamentals.pdf",
    totalCards: 12,
    processingTime: "2.3s",
    generatedAt: new Date().toISOString()
  };

  const flashcards = [
    {
      id: 1,
      front: "What is Machine Learning?",
      back: "Machine Learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.",
      difficulty: "beginner",
      category: "Fundamentals",
      confidence: 0.95,
      type: "definition"
    },
    {
      id: 2,
      front: "Supervised vs Unsupervised Learning",
      back: "Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data without predefined correct answers.",
      difficulty: "intermediate",
      category: "Learning Types",
      confidence: 0.88,
      type: "comparison"
    },
    {
      id: 3,
      front: "Real-world ML Example",
      back: "Email spam detection - the algorithm is trained on emails labeled as 'spam' or 'not spam' to classify new incoming emails.",
      difficulty: "intermediate",
      category: "Applications",
      confidence: 0.92,
      type: "example"
    },
    {
      id: 4,
      front: "ML Workflow Steps",
      back: "Data Collection → Preprocessing → Model Selection → Training → Evaluation → Deployment → Monitoring",
      difficulty: "advanced",
      category: "Process",
      confidence: 0.90,
      type: "process"
    },
    {
      id: 5,
      front: "What is Overfitting?",
      back: "When a model learns training data too well, including noise, resulting in poor performance on new data.",
      difficulty: "advanced",
      category: "Concepts",
      confidence: 0.85,
      type: "definition"
    },
    {
      id: 6,
      front: "Cross-validation Purpose",
      back: "Technique to assess how well a model generalizes to unseen data by splitting data into multiple train/test sets.",
      difficulty: "intermediate",
      category: "Validation",
      confidence: 0.91,
      type: "definition"
    }
  ];

  const getDifficultyGradient = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'from-emerald-400 to-teal-600';
      case 'intermediate': return 'from-amber-400 to-orange-600';
      case 'advanced': return 'from-rose-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'definition': return <Brain className="h-4 w-4" />;
      case 'comparison': return <RotateCcw className="h-4 w-4" />;
      case 'example': return <Star className="h-4 w-4" />;
      case 'process': return <Play className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredCards = flashcards.filter(card => 
    filterDifficulty === 'all' || card.difficulty === filterDifficulty
  );

  const currentCard = filteredCards[currentCardIndex];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const shuffleCards = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No cards match your filter</h3>
          <p className="text-gray-600">Try selecting a different difficulty level.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Floating Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-lg transition-all duration-200">
                <ChevronLeft className="h-4 w-4" />
                <span className="font-medium">Back</span>
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Generated Flashcards
                  </h1>
                  <p className="text-sm text-gray-500 font-medium">{generationInfo.sourceDocument}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200/50 transition-all duration-200 font-medium text-gray-700 hover:text-gray-900">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200/50 transition-all duration-200 font-medium text-gray-700 hover:text-gray-900">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button 
                onClick={() => setIsStudyMode(!isStudyMode)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg rounded-lg transition-all duration-200 font-medium"
              >
                <Play className="h-4 w-4" />
                <span>{isStudyMode ? 'Exit Study' : 'Start Study'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 space-y-6 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-xl px-5 py-3 border border-gray-200/50 shadow-sm">
              <Filter className="h-5 w-5 text-gray-500" />
              <select 
                value={filterDifficulty}
                onChange={(e) => {
                  setFilterDifficulty(e.target.value);
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className="bg-transparent border-none focus:outline-none text-sm font-medium text-gray-700"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <button
              onClick={shuffleCards}
              className="flex items-center space-x-2 px-5 py-3 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 shadow-sm"
            >
              <Shuffle className="h-4 w-4" />
              <span>Shuffle</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={prevCard}
              disabled={filteredCards.length <= 1}
              className="flex items-center justify-center w-12 h-12 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            
            <div className="px-6 py-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 text-sm font-bold text-gray-800 shadow-sm">
              {currentCardIndex + 1} of {filteredCards.length}
            </div>
            
            <button
              onClick={nextCard}
              disabled={filteredCards.length <= 1}
              className="flex items-center justify-center w-12 h-12 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <ArrowRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Single Card Display */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <div
              className="cursor-pointer"
              onClick={flipCard}
            >
              {!isFlipped ? (
                /* Front of Card */
                <div className="w-full h-[28rem] transition-all duration-500">
                  <div className={`h-full bg-gradient-to-br ${getDifficultyGradient(currentCard.difficulty)} rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02]`}>
                    <div className="absolute inset-0 bg-black/10 rounded-3xl" />
                    <div className="relative h-full p-10 flex flex-col justify-between text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            {getTypeIcon(currentCard.type)}
                          </div>
                          <span className="text-sm font-semibold opacity-90 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            {currentCard.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          <span className="text-sm font-medium">{Math.round(currentCard.confidence * 100)}%</span>
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center px-4">
                        <p className="text-2xl font-semibold text-center leading-relaxed drop-shadow-sm">
                          {currentCard.front}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          {currentCard.difficulty}
                        </span>
                        <div className="flex items-center space-x-2 text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          <RotateCcw className="h-4 w-4" />
                          <span className="font-medium">Click to flip</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Back of Card */
                <div className="w-full h-[28rem] transition-all duration-500">
                  <div className="h-full bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-200/50 overflow-hidden transform hover:scale-[1.02]">
                    <div className="h-full p-10 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-r ${getDifficultyGradient(currentCard.difficulty)} flex items-center justify-center shadow-sm`}>
                            <div className="w-3 h-3 bg-white rounded-full" />
                          </div>
                          <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                            {currentCard.category}
                          </span>
                        </div>
                        <button className="p-2 opacity-40 hover:opacity-100 hover:bg-gray-100 rounded-lg transition-all duration-200">
                          <MoreVertical className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center px-4">
                        <p className="text-gray-800 text-center leading-relaxed text-lg font-medium">
                          {currentCard.back}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                          <RotateCcw className="h-4 w-4" />
                          <span className="font-medium">Click to flip</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Hints */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <kbd className="px-3 py-1 bg-white/70 rounded-lg border border-gray-200/50 font-medium text-gray-700 shadow-sm">←</kbd>
              <span className="font-medium">Previous</span>
            </div>
            <div className="flex items-center space-x-2">
              <kbd className="px-3 py-1 bg-white/70 rounded-lg border border-gray-200/50 font-medium text-gray-700 shadow-sm">Space</kbd>
              <span className="font-medium">Flip</span>
            </div>
            <div className="flex items-center space-x-2">
              <kbd className="px-3 py-1 bg-white/70 rounded-lg border border-gray-200/50 font-medium text-gray-700 shadow-sm">→</kbd>
              <span className="font-medium">Next</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}