'use client';

import React, { useState } from 'react';
import { BookOpen, Check, Clock, Users } from 'lucide-react';

const ModernQuizInterface = () => {
  const [userAnswers, setUserAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of React's useEffect hook?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To create reusable components",
        "To optimize rendering performance"
      ],
      type: "multiple-choice"
    },
    {
      id: 2,
      question: "Which of the following are valid ways to style components in React?",
      options: [
        "CSS Modules",
        "Styled Components",
        "Tailwind CSS",
        "Inline styles"
      ],
      type: "multiple-select"
    },
    {
      id: 3,
      question: "Next.js uses file-based routing by default.",
      options: ["True", "False"],
      type: "true-false"
    },
    {
      id: 4,
      question: "What does SSR stand for in the context of Next.js?",
      options: [
        "Static Site Rendering",
        "Server-Side Rendering",
        "Secure Socket Routing",
        "Single State Repository"
      ],
      type: "multiple-choice"
    },
    {
      id: 5,
      question: "Which React patterns are used for sharing logic between components?",
      options: [
        "Higher-Order Components (HOC)",
        "Render Props",
        "Custom Hooks",
        "Context API"
      ],
      type: "multiple-select"
    },
    {
      id: 6,
      question: "What is the virtual DOM in React?",
      options: [
        "A direct representation of the browser DOM",
        "A JavaScript representation of the real DOM kept in memory",
        "A server-side rendering technique",
        "A CSS-in-JS library"
      ],
      type: "multiple-choice"
    },
    {
      id: 7,
      question: "Which Next.js features help with performance optimization?",
      options: [
        "Automatic code splitting",
        "Image optimization",
        "Static generation",
        "Server-side rendering"
      ],
      type: "multiple-select"
    },
    {
      id: 8,
      question: "React components must always return a single element.",
      options: ["True", "False"],
      type: "true-false"
    }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question.type === 'multiple-select') {
      const currentAnswers = userAnswers[questionId] || [];
      let newAnswers;
      
      if (currentAnswers.includes(answerIndex)) {
        newAnswers = currentAnswers.filter(ans => ans !== answerIndex);
      } else {
        newAnswers = [...currentAnswers, answerIndex];
      }
      
      setUserAnswers(prev => ({
        ...prev,
        [questionId]: newAnswers
      }));
    } else {
      setUserAnswers(prev => ({
        ...prev,
        [questionId]: answerIndex
      }));
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(userAnswers).length;
  };

  const getCompletionPercentage = () => {
    return Math.round((getAnsweredCount() / questions.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-2xl mr-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">React & Next.js Quiz</h1>
                <p className="text-gray-600 text-lg">Test your knowledge with 8 comprehensive questions</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{getAnsweredCount()}/{questions.length}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Completed</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-8 relative">
            <div className="flex justify-between text-sm text-gray-600 mb-3">
              <span className="font-medium">Progress</span>
              <span className="font-bold">{getCompletionPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mr-4 shadow-sm">
                    {index + 1}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-4 py-2 rounded-full">
                    {question.type.replace('-', ' ')}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 leading-relaxed mb-2">
                  {question.question}
                </h2>
                {question.type === 'multiple-select' && (
                  <p className="text-sm text-gray-500 flex items-center">
                    <Check className="w-4 h-4 mr-2 text-blue-600" />
                    Select all that apply
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-4 relative">
                {question.options.map((option, optionIndex) => {
                  const isSelected = question.type === 'multiple-select' 
                    ? userAnswers[question.id]?.includes(optionIndex) 
                    : userAnswers[question.id] === optionIndex;
                  
                  return (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerSelect(question.id, optionIndex)}
                      className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md text-left group ${
                        isSelected 
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-400 text-blue-900 shadow-md' 
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                          isSelected ? 'border-blue-500 bg-blue-500 shadow-sm' : 'border-gray-300 group-hover:border-gray-400'
                        }`}>
                          {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                        </div>
                        <span className="font-medium text-lg">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm">No time limit</span>
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Save Progress
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernQuizInterface;