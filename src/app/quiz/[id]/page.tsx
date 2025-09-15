'use client';

import { useEffect, useState } from "react";
import { BookOpen, Check, Clock } from 'lucide-react';
import NavBar from "@/components/layout/navBar";
import Footer from "@/components/layout/footer";
import { QuestionService } from "@/services/QuestionService";
import { Question } from "@/model/Question";
import { Quiz } from "@/model/Quiz";
import { QuizService } from "@/services/QuizService";
import { useRouter } from 'next/navigation';
import { useQuizStore } from "@/lib/QuizStore";

interface Props {
    params: { id: string }
}

const QuizPage = ({ params }: Props) => {
    const quizId = params.id;

    const quizService = new QuizService();
    const router = useRouter();

    const [quiz, setQuiz] = useState<Quiz>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

    const getQuizWithQsts = async (id: string) => {

        const quizData = await quizService.getQuizById(id);
        const questionService = new QuestionService();
        const questions = await questionService.getQuestionsByQuizId(id);
        console.log("Fetched questions:", questions);
        setQuestions(questions);
        setQuiz(quizData);
    };

    useEffect(() => {
        getQuizWithQsts(quizId);
    }, [quizId]);

    const handleAnswerSelect = (questionId: number, answerIndex: number) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answerIndex
        }));
    };

    const getAnsweredCount = () => Object.keys(userAnswers).length;
    const getCompletionPercentage = () =>
        questions.length === 0 ? 0 : Math.round((getAnsweredCount() / questions.length) * 100);


    const handleSubmitQuiz = async () => {
        // Check if all questions are answered
        if (Object.keys(userAnswers).length !== questions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        // Calculate correct answers
        let correctAnswers = 0;

        questions.forEach((question) => {
            const selectedAnswerIndex = userAnswers[question.id];
            if (selectedAnswerIndex !== undefined) {
                const selectedResponse = question.responses[selectedAnswerIndex];
                console.log('Is correct:', selectedResponse?.correct);
                console.log('Selected answer:', selectedResponse);
                console.log('Selected response object:', selectedResponse);

                if (selectedResponse && selectedResponse.correct === true) {
                    correctAnswers++;
                }
            }
        });

        console.log('Total correct answers:', correctAnswers);
        console.log('Total questions:', questions.length);

        // Calculate score (percentage)
        const score = Math.round((correctAnswers / questions.length) * 100);
        console.log('Final score:', score + '%');

        if (!quiz) {
            console.error('Quiz data is not available.');
            return;
        }

        quiz.nbRepCorrect = correctAnswers; 
        quiz.score = score; 
        console.log('quiz info answers:', quiz);
        // Submit the quiz results
        quizService.updateQuiz(quiz);

        const totalQuestions = questions.length;


        useQuizStore.getState().setQuiz(questions, userAnswers);

        router.push(`/quiz/result?quiz_id=${quizId}&correct=${correctAnswers}&score=${score}&total=${totalQuestions}`);





    };


    const isQuizComplete = () => {
        return Object.keys(userAnswers).length === questions.length;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <NavBar />

            {/* Modern Header */}
            <div className="w-full max-w-7xl mx-auto relative overflow-hidden">
                {/* Glassmorphism background with animated gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-blue-500/20 to-cyan-400/20 backdrop-blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>

                {/* Content container */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-8 border border-white/10 rounded-2xl shadow-2xl">

                    {/* Title Section */}
                    <div className="lg:col-span-4 flex items-center gap-4">
                        {/* Animated icon */}
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-violet-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-blue-500 rounded-2xl blur-lg opacity-30 -z-10"></div>
                        </div>

                        <div>
                            <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                                Quiz Master
                            </h1>
                            <p className="text-gray-600/80 text-sm mt-1 font-medium">
                                Challenge your mind • Test your limits
                            </p>
                        </div>
                    </div>

                    {/* Progress Stats */}
                    <div className="lg:col-span-3 text-center flex flex-col justify-center">
                        <div className="relative">
                            {/* Large progress number */}
                            <div className="text-2xl sm:text-3xl font-black bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent leading-none">
                                {getAnsweredCount()}
                                <span className="text-gray-400/60 font-bold text-2xl">/{questions.length}</span>
                            </div>
                            {/* Floating badge */}
                            <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-3 py-1 mt-3 shadow-lg">
                                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Questions Solved
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Modern Progress Bar */}
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                        {/* Progress label with percentage */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-blue-500 rounded-full"></div>
                                Overall Progress
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                                    {getCompletionPercentage()}%
                                </span>
                                {getCompletionPercentage() === 100 && (
                                    <div className="text-yellow-500 animate-bounce">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Enhanced progress bar */}
                        <div className="relative">
                            <div className="w-full h-3 bg-gray-100/60 backdrop-blur-sm rounded-full overflow-hidden border border-white/20 shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 rounded-full relative transition-all duration-1000 ease-out shadow-lg"
                                    style={{ width: `${Math.max(getCompletionPercentage(), 2)}%` }}
                                >
                                    {/* Animated shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-pulse"></div>
                                    {/* Glowing edge */}
                                    <div className="absolute top-0 right-0 w-1 h-full bg-white/60 rounded-r-full"></div>
                                </div>
                            </div>

                            {/* Progress milestones */}
                            <div className="flex justify-between mt-2 px-1">
                                {[25, 50, 75, 100].map((milestone) => (
                                    <div key={milestone} className="flex flex-col items-center">
                                        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${getCompletionPercentage() >= milestone
                                            ? 'bg-gradient-to-r from-violet-500 to-blue-500'
                                            : 'bg-gray-300'
                                            }`}></div>
                                        <span className="text-xs text-gray-500 font-medium mt-1">{milestone}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle floating particles effect */}
                <div className="absolute top-4 left-8 w-1 h-1 bg-violet-400/30 rounded-full animate-ping"></div>
                <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-1/3 w-1 h-1 bg-cyan-400/20 rounded-full animate-ping delay-1000"></div>
            </div>

            <div className="max-w-6xl mx-auto mt-8">
                {/* Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {questions.map((question, index) => (
                        <div
                            key={question.id}
                            className="relative overflow-hidden group"
                        >
                            

                            {/* Content container */}
                            <div className="relative z-10 border border-white/20 rounded-2xl bg-white  p-6 sm:p-8 hover:shadow-3xl transition-all duration-500 ease-out hover:-translate-y-1 group-hover:border-white/30">

                                {/* Animated particles */}
                                <div className="absolute top-3 right-4 w-1 h-1 bg-violet-400/40 rounded-full animate-ping"></div>
                                <div className="absolute bottom-4 left-6 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-pulse delay-700"></div>

                                {/* Header */}
                                <div className="relative mb-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        {/* Modern Step Badge */}
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-gradient-to-br from-violet-400/80 to-blue-500/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg border border-white/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                                {index + 1}
                                            </div>
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-blue-500 rounded-2xl blur-md opacity-20 -z-10"></div>
                                        </div>

                                        {/* Modern Tag */}
                                        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-violet-200/50 rounded-full px-4 py-2 shadow-md">
                                            <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-blue-500 rounded-full animate-pulse"></div>
                                            <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">
                                                Question
                                            </span>
                                        </div>
                                    </div>

                                    {/* Question Title */}
                                    <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-relaxed group-hover:from-violet-800 group-hover:via-blue-800 group-hover:to-gray-800 transition-all duration-300">
                                        {question.libelle}
                                    </h2>
                                </div>

                                {/* Options */}
                                <div className="space-y-3">
                                    {question.responses.map((option, optionIndex) => {
                                        const isSelected = userAnswers[question.id] === optionIndex;

                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => handleAnswerSelect(question.id, optionIndex)}
                                                aria-pressed={isSelected}
                                                className={`
                    w-full p-4 rounded-xl transition-all duration-300 group/button
                    relative overflow-hidden backdrop-blur-sm border
                    ${isSelected
                                                        ? 'border-violet-300/60 bg-gradient-to-r from-violet-50/80 via-blue-50/60 to-indigo-50/80 shadow-lg transform scale-[1.02]'
                                                        : 'border-white/30 bg-white/40 hover:bg-white/60 hover:border-white/50 hover:shadow-md'
                                                    }
                    hover:-translate-y-0.5 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-transparent
                  `}
                                            >
                                                {/* Selection Background Overlay */}
                                                {isSelected && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 via-blue-400/5 to-indigo-400/10 pointer-events-none"></div>
                                                )}

                                                

                                                <div className="flex items-center">
                                                    {/* Modern Radio Button */}
                                                    <div className="relative">
                                                        <div
                                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 backdrop-blur-sm
                          ${isSelected
                                                                    ? 'border-violet-500 bg-gradient-to-br from-violet-400 to-blue-500 scale-105 shadow-md shadow-violet-200/40'
                                                                    : 'border-gray-300 bg-white/60 group-hover/button:border-violet-300 group-hover/button:bg-white/80'
                                                                }`}
                                                        >
                                                            {isSelected && (
                                                                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                                            )}
                                                        </div>
                                                        
                                                    </div>

                                                    {/* Option Label */}
                                                    <span className={`font-medium text-sm sm:text-base ml-4 transition-colors duration-300 ${isSelected
                                                        ? 'text-violet-900'
                                                        : 'text-gray-700 group-hover/button:text-gray-800'
                                                        }`}>
                                                        {option.libelle}
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modern Footer Actions */}
                <div className="mt-10 relative overflow-hidden">
                    {/* Glassmorphism background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/50 to-gray-50/40 backdrop-blur-xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-transparent"></div>

                    {/* Content */}
                    <div className="relative z-10 border border-white/20 rounded-2xl shadow-2xl p-6">
                        {/* Decorative particles */}
                        <div className="absolute top-4 left-8 w-1 h-1 bg-violet-400/30 rounded-full animate-ping"></div>
                        <div className="absolute bottom-4 right-12 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse"></div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            {/* Time info */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-blue-200/30">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-gray-700">No time limit</span>
                                    <p className="text-xs text-gray-500">Take your time to think</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                                {/* Progress indicator */}
                                {!isQuizComplete() && (
                                    <div className="flex items-center gap-2 bg-amber-50/80 backdrop-blur-sm border border-amber-200/50 rounded-full px-4 py-2 shadow-sm">
                                        <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-amber-700">
                                            {getAnsweredCount()}/{questions.length} completed
                                        </span>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button className="px-6 py-3 bg-white/60 backdrop-blur-sm border border-white/30 text-gray-700 rounded-xl hover:bg-white/80 hover:border-white/50 transition-all duration-300 font-medium hover:shadow-lg text-sm transform hover:-translate-y-0.5">
                                        Save Progress
                                    </button>

                                    <button
                                        onClick={handleSubmitQuiz}
                                        disabled={!isQuizComplete()}
                                        className={`px-8 py-3 rounded-xl transition-all duration-300 font-semibold text-sm transform hover:-translate-y-0.5 relative overflow-hidden ${isQuizComplete()
                                            ? 'bg-gradient-to-r from-violet-500 via-blue-500 to-indigo-500 text-white hover:from-violet-600 hover:via-blue-600 hover:to-indigo-600 shadow-xl hover:shadow-2xl border border-white/20'
                                            : 'bg-gray-200/60 backdrop-blur-sm border border-gray-300/30 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {isQuizComplete() && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-pulse"></div>
                                        )}
                                        <span className="relative flex items-center gap-2">
                                            Submit Quiz
                                            {isQuizComplete() && (
                                                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default QuizPage;
