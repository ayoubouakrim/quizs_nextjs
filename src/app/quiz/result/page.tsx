'use client';

import { useQuizStore } from "@/lib/QuizStore";
import { useRouter, useSearchParams } from 'next/navigation';
import { Trophy, CheckCircle, XCircle, Target, BarChart3, Award } from 'lucide-react';
import NavBar from "@/components/layout/navBar";
import Footer from "@/components/layout/footer";
import { useEffect } from "react";
import { QuizService } from "@/services/QuizService";



export default function ResultPage() {



    const { questions, userAnswers } = useQuizStore();
    const searchParams = useSearchParams();

    const router = useRouter();
    const quizService = new QuizService();

    const correct = parseInt(searchParams.get('correct') || '0');
    const score = parseInt(searchParams.get('score') || '0');
    const total = parseInt(searchParams.get('total') || '0');
    const quizId = searchParams.get('quiz_id') || '';

    const getQuizResults = () => {

    }


    const getScoreMessage = (score: number) => {
        if (score >= 90) return 'Excellent! Outstanding performance!';
        if (score >= 80) return 'Great job! Well done!';
        if (score >= 70) return 'Good work! Keep it up!';
        if (score >= 60) return 'Not bad! Room for improvement.';
        return 'Keep practicing! You can do better!';
    };





    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <NavBar />


            {/* Modern Quiz Results */}
            <div className="w-full max-w-7xl mx-auto relative overflow-hidden">
                {/* Content container */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 bg-gradient-to-br from-indigo-300 via-indigo-400 to-indigo-300 gap-6 p-4 border border-white/10">
                    {/* Title Section */}
                    <div className="lg:col-span-4 flex items-center gap-4">
                        {/* Animated icon */}
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-violet-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-blue-500 rounded-2xl blur-lg opacity-30 -z-10"></div>
                        </div>

                        <div>
                            <h1 className="text-2xl font-black bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent tracking-tight">
                                Quiz Complete!
                            </h1>
                            <p className="text-gray-300/80 text-sm mt-1 font-medium">
                                Your results are in • Great work!
                            </p>
                        </div>
                    </div>

                    {/* Score Stats */}
                    <div className="lg:col-span-3 text-center flex flex-col justify-center">
                        <div className="relative">
                            {/* Large score number */}
                            <div className="text-2xl sm:text-3xl font-black bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent leading-none">
                                {score}%
                            </div>
                            {/* Floating badge */}
                            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mt-3 shadow-lg">
                                <div className={`w-2 h-2 rounded-full animate-pulse ${score >= 80 ? 'bg-green-400' : score >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                                <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                                    Final Score
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center group">
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2 group-hover:border-white/20 transition-all duration-300">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                                    <div className="text-2xl font-bold text-green-500">{correct}</div>
                                    <div className="text-sm text-gray-100">Correct</div>
                                </div>
                            </div>

                            <div className="text-center group">
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2 group-hover:border-white/20 transition-all duration-300">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                                    <div className="text-2xl font-bold text-blue-500">{total}</div>
                                    <div className="text-sm text-gray-100">Total</div>
                                </div>
                            </div>

                            <div className="text-center group">
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2 group-hover:border-white/20 transition-all duration-300">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-1"></div>
                                    <div className="text-2xl font-bold text-purple-500">{Math.round(((total - correct) / total) * 100)}%</div>
                                    <div className="text-sm text-gray-100">Missed</div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                {/* Message Section */}
                <div className="relative z-10 mt-6 text-center">
                    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border ${score >= 80 ? 'border-emerald-400/30 bg-emerald-500/10' :
                        score >= 60 ? 'border-amber-400/30 bg-amber-500/10' :
                            'border-red-500 bg-red-400'
                        }`}>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${score >= 80 ? 'bg-emerald-400' : score >= 60 ? 'bg-amber-400' : 'bg-red-600'
                            }`}></div>
                        <p className="text-lg font-semibold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                            {getScoreMessage(score)}
                        </p>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${score >= 80 ? 'bg-emerald-400' : score >= 60 ? 'bg-amber-400' : 'bg-red-600'
                            }`} style={{ animationDelay: '0.5s' }}></div>
                    </div>
                </div>

                {/* Subtle floating particles effect */}
                <div className="absolute top-4 left-8 w-1 h-1 bg-violet-400/30 rounded-full animate-ping"></div>
                <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-1/3 w-1 h-1 bg-cyan-400/20 rounded-full animate-ping delay-1000"></div>
            </div>



            <div className="max-w-6xl mx-auto mt-4">
                {/* Detailed Results */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 py-2 px-4 mb-8">
                    {/* Modern Header */}
                    <div className="w-full max-w-7xl mx-auto relative overflow-hidden mb-8">
                        {/* Content container */}
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-8 border border-white/10 rounded-2xl shadow-2xl">

                            {/* Title Section */}
                            <div className="lg:col-span-8 flex items-center gap-4">
                                {/* Animated icon */}
                                <div className="relative">
                                    <div className="w-14 h-14 bg-gradient-to-br from-violet-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                        <BarChart3 className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                                        Detailed Results
                                    </h2>
                                    <p className="text-gray-600/80 text-sm mt-1 font-medium">
                                        Review your answers • Learn from mistakes
                                    </p>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="lg:col-span-4 flex justify-center lg:justify-end items-center">
                                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-4 py-2 shadow-lg">
                                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                                        Analysis Complete
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {questions.map((question, index) => {
                            const selected = userAnswers[question.id];
                            const correctIndex = question.responses.findIndex(r => r.correct);
                            const isCorrect = selected === correctIndex;

                            return (
                                <div key={question.id} className="relative bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-6 border border-violet-100 shadow-lg overflow-hidden">

                                    {/* Background accent */}
                                    <div className="absolute top-4 right-6 w-1 h-1 bg-violet-400/40 rounded-full animate-ping"></div>
                                    <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-pulse"></div>

                                    {/* Question Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            {/* Question Number */}
                                            <div className="w-10 h-8 bg-gradient-to-br from-violet-600 to-blue-600 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                                {index + 1}
                                            </div>

                                            {/* Question Title */}
                                            <div>
                                                <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-relaxed">
                                                    {question.libelle}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border shadow-sm ${isCorrect
                                            ? 'bg-green-100 text-green-700 border-green-200'
                                            : 'bg-red-100 text-red-700 border-red-200'
                                            }`}>
                                            {isCorrect ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4" />
                                                    Correct
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-4 h-4" />
                                                    Incorrect
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Answer Options */}
                                    <div className="space-y-3 mb-6">
                                        {question.responses.map((option, optionIndex) => {
                                            const isCorrectOption = option.correct;
                                            const isSelectedOption = selected === optionIndex;

                                            let bgColor = 'bg-white/80 border-gray-200';
                                            let textColor = 'text-gray-700';
                                            let icon = null;
                                            let badge = null;

                                            if (isCorrectOption) {
                                                bgColor = 'bg-green-50/80 border-green-300';
                                                textColor = 'text-green-800';
                                                icon = <CheckCircle className="w-5 h-5 text-green-600" />;
                                                badge = (
                                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-200">
                                                        Correct Answer
                                                    </span>
                                                );
                                            } else if (isSelectedOption) {
                                                bgColor = 'bg-red-50/80 border-red-300';
                                                textColor = 'text-red-800';
                                                icon = <XCircle className="w-5 h-5 text-red-600" />;
                                                badge = (
                                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold border border-red-200">
                                                        Your Choice
                                                    </span>
                                                );
                                            }

                                            return (
                                                <div key={option.id} className={`p-4 rounded-xl border-2 ${bgColor} backdrop-blur-sm transition-all duration-300 hover:shadow-md`}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            {icon && <div>{icon}</div>}
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
                                        <div className="relative bg-white border border-violet-200/50 rounded-xl p-6 backdrop-blur-sm">
                                            <div className="flex items-start gap-4">                                                
                                                {/* Content */}
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-bold text-violet-800 mb-3 flex items-center gap-2">
                                                        Explanation
                                                        <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></div>
                                                    </h4>
                                                    <p className="text-sm text-gray-950 leading-relaxed font-medium">
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
                <div className="relative bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl shadow-xl border border-white/20 p-6 overflow-hidden">

                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-cyan-400/10"></div>
                    <div className="absolute top-4 right-8 w-1 h-1 bg-violet-400/40 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-12 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-pulse"></div>

                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

                        {/* Performance Section */}
                        <div className="flex items-center gap-4">
                            {/* Trophy Icon */}
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300 ${score >= 80
                                ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                                : 'bg-gradient-to-br from-blue-400 to-indigo-500'
                                }`}>
                                <Trophy className="w-6 h-6 text-white" />
                            </div>

                            {/* Message */}
                            <div>
                                <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    {score >= 80 ? 'Excellent performance!' : 'Keep practicing to improve!'}
                                </span>
                                <div className={`inline-flex items-center gap-2 ml-3 px-3 py-1 rounded-full text-xs font-semibold ${score >= 80
                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                                    }`}>
                                    <div className={`w-2 h-2 rounded-full animate-pulse ${score >= 80 ? 'bg-green-400' : 'bg-blue-400'
                                        }`}></div>
                                    {score >= 80 ? 'GREAT JOB' : 'TRY AGAIN'}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            {/* Secondary Button */}
                            <button className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-white/40 text-gray-700 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-medium text-sm hover:-translate-y-0.5">
                                View More Quizzes
                            </button>

                            {/* Primary Button */}
                            <button
                                onClick={() => router.push(`/quiz/${quizId}`)}
                                className="px-8 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-xl hover:from-violet-600 hover:to-blue-600 transition-all duration-300 font-semibold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 border border-white/20"
                            >
                                <span className="flex items-center gap-2">
                                    Retake Quiz
                                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}