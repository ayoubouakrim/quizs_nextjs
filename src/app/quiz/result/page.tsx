'use client';

import { useQuizStore } from "@/lib/QuizStore";
import { useRouter, useSearchParams } from 'next/navigation';
import { Trophy, CheckCircle, XCircle, Target, BarChart3, Award } from 'lucide-react';
import NavBar from "@/components/layout/navBar";
import Footer from "@/components/layout/footer";

export default function ResultPage() {
    const { questions, userAnswers } = useQuizStore();
    const searchParams = useSearchParams();

    const router = useRouter();
    
    const correct = parseInt(searchParams.get('correct') || '0');
    const score = parseInt(searchParams.get('score') || '0');
    const total = parseInt(searchParams.get('total') || '0');
    const quizId = searchParams.get('quiz_id') || '';

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'from-green-500 to-emerald-600';
        if (score >= 60) return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-red-600';
    };

    const getScoreMessage = (score: number) => {
        if (score >= 90) return 'Excellent! Outstanding performance!';
        if (score >= 80) return 'Great job! Well done!';
        if (score >= 70) return 'Good work! Keep it up!';
        if (score >= 60) return 'Not bad! Room for improvement.';
        return 'Keep practicing! You can do better!';
    };

    const getScoreIcon = (score: number) => {
        if (score >= 80) return <Trophy className="w-8 h-8 text-white" />;
        if (score >= 60) return <Award className="w-8 h-8 text-white" />;
        return <Target className="w-8 h-8 text-white" />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <NavBar />

            <div className="max-w-5xl mx-auto mt-4">
                {/* Results Summary Header */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 "></div>

                    <div className="relative">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quiz Results</h1>

                        {/* Main Results Line */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-blue-50/50 rounded-xl p-6 border border-gray-200 mb-6">

                            {/* Left Side - Stats in a line */}
                            <div className="flex items-center space-x-8">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <div>
                                        <span className="text-2xl font-bold text-green-600">{correct}</span>
                                        <span className="text-sm text-gray-600 ml-1">correct</span>
                                    </div>
                                </div>

                                <div className="w-px h-8 bg-gray-300"></div>

                                <div className="flex items-center space-x-2">
                                    <BarChart3 className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <span className="text-2xl font-bold text-blue-600">{total}</span>
                                        <span className="text-sm text-gray-600 ml-1">total</span>
                                    </div>
                                </div>

                                <div className="w-px h-8 bg-gray-300"></div>

                                <div className="flex items-center space-x-2">
                                    <Trophy className="w-5 h-5 text-purple-600" />
                                    <div>
                                        <span className="text-2xl font-bold text-purple-600">{score}%</span>
                                        <span className="text-sm text-gray-600 ml-1">score</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Circular Progress */}
                            <div className="relative">
                                <div className="relative w-20 h-20">
                                    {/* Background circle */}
                                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#e5e7eb"
                                            strokeWidth="3"
                                        />
                                        {/* Progress circle */}
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke={score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444"}
                                            strokeWidth="3"
                                            strokeDasharray={`${score}, 100`}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000"
                                        />
                                    </svg>
                                    {/* Center text */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-lg font-bold text-gray-800">{score}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="text-center">
                            <p className={`text-lg font-medium ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {getScoreMessage(score)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Detailed Results */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-xl mr-4">
                            <BarChart3 className="w-6 h-6 text-slate-700" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Detailed Results</h2>
                            <p className="text-sm text-gray-600">Review your answers and learn from mistakes</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {questions.map((question, index) => {
                            const selected = userAnswers[question.id];
                            const correctIndex = question.responses.findIndex(r => r.correct);
                            const isCorrect = selected === correctIndex;

                            return (
                                <div key={question.id} className="bg-gradient-to-r from-gray-50/50 to-blue-50/50 rounded-xl p-6 border border-gray-100">
                                    {/* Question Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 shadow-sm">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                                                    {question.libelle}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${isCorrect
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                            }`}>
                                            {isCorrect ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Correct
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-3 h-3 mr-1" />
                                                    Incorrect
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Answer Options */}
                                    <div className="space-y-3">
                                        {question.responses.map((option, optionIndex) => {
                                            const isCorrectOption = option.correct;
                                            const isSelectedOption = selected === optionIndex;

                                            let bgColor = 'bg-white border-gray-200';
                                            let textColor = 'text-gray-700';
                                            let icon = null;
                                            let badge = null;

                                            if (isCorrectOption) {
                                                bgColor = 'bg-green-50 border-green-300';
                                                textColor = 'text-green-800';
                                                icon = <CheckCircle className="w-4 h-4 text-green-600" />;
                                                badge = (
                                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                                        Correct Answer
                                                    </span>
                                                );
                                            } else if (isSelectedOption) {
                                                bgColor = 'bg-red-50 border-red-300';
                                                textColor = 'text-red-800';
                                                icon = <XCircle className="w-4 h-4 text-red-600" />;
                                                badge = (
                                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                                        Your Choice
                                                    </span>
                                                );
                                            }

                                            return (
                                                <div key={option.id} className={`p-4 rounded-lg border-2 ${bgColor} transition-all duration-200`}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            {icon && <div className="mr-3">{icon}</div>}
                                                            <span className={`font-medium ${textColor}`}>
                                                                {option.libelle}
                                                            </span>
                                                        </div>
                                                        {badge}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Explanation Section */}
                                    {question.explanation && (
                                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                            <div className="flex items-start">
                                                <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-blue-800 mb-2">Explanation</h4>
                                                    <p className="text-sm text-blue-700 leading-relaxed">
                                                        {question.explanation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50/30 to-blue-50/30"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                            <Trophy className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="text-sm font-medium">
                                {score >= 80 ? 'Excellent performance!' : 'Keep practicing to improve!'}
                            </span>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium hover:shadow-md text-sm">
                                View More Quizzes
                            </button>
                            <button 
                            onClick={() => router.push(`/quiz/${quizId}`)}
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm">
                                Retake Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}