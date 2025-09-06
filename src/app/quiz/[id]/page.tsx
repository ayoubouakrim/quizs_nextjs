"use client";

import { useEffect, useState } from "react";
import { BookOpen, Check, Clock, AlertTriangle } from 'lucide-react';
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

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
    const [isLoading, setIsLoading] = useState(true);

    const getQuizWithQsts = async (id: string) => {
        try {
            setIsLoading(true);
            const quizData = await quizService.getQuizById(id);
            const questionService = new QuestionService();
            const fetchedQuestions = await questionService.getQuestionsByQuizId(id);
            setQuestions(fetchedQuestions);
            setQuiz(quizData);
        } catch (error) {
            console.error("Failed to load quiz:", error);
            alert("Failed to load quiz. Please try again later.");
        } finally {
            setIsLoading(false);
        }
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
        if (Object.keys(userAnswers).length !== questions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        let correctAnswers = 0;

        questions.forEach((question) => {
            const selectedAnswerIndex = userAnswers[question.id];
            if (selectedAnswerIndex !== undefined) {
                const selectedResponse = question.responses[selectedAnswerIndex];
                if (selectedResponse && selectedResponse.correct === true) {
                    correctAnswers++;
                }
            }
        });

        const score = Math.round((correctAnswers / questions.length) * 100);

        // Update quiz stats
        if (quiz) {
            quiz.nbRepCorrect = correctAnswers;
            quiz.score = score;
            quizService.updateQuiz(quiz);
        }

        useQuizStore.getState().setQuiz(questions, userAnswers);

        router.push(`/quiz/result?quiz_id=${quizId}&correct=${correctAnswers}&score=${score}&total=${questions.length}`);
    };

    const isQuizComplete = () => {
        return Object.keys(userAnswers).length === questions.length;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
                <NavBar />
                <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading your quiz...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
                <NavBar />
                <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
                    <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-4">
                        <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz Not Found</h3>
                        <p className="text-gray-600 mb-6">We couldn't load the requested quiz.</p>
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <NavBar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-10 relative overflow-hidden group">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>

                    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-5 rounded-2xl mr-6 shadow-lg drop-shadow-md">
                                <BookOpen className="w-9 h-9 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
                                    {quiz.libelle || 'Quiz'}
                                </h1>
                                <p className="text-gray-600 text-sm font-medium">{quiz.description || 'Test your knowledge'}</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {getAnsweredCount()}<span className="text-gray-400">/{questions.length}</span>
                            </div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Answered</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-8">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                            <span>Progress</span>
                            <span className="text-blue-600 font-bold">{getCompletionPercentage()}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                            <div
                                className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-sm relative"
                                style={{ width: `${getCompletionPercentage()}%` }}
                            >
                                <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-8 mb-10">
                    {questions.map((question, index) => (
                        <div
                            key={question.id}
                            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-purple-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-50 to-pink-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative mb-6">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center">
                                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 shadow-lg">
                                            {index + 1}
                                        </div>
                                        <div className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                                            Question {index + 1} of {questions.length}
                                        </div>
                                    </div>
                                    {userAnswers[question.id] !== undefined && (
                                        <div className="flex items-center text-green-600 text-sm font-medium">
                                            <Check className="w-4 h-4 mr-1" />
                                            Answered
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 leading-relaxed">
                                    {question.libelle}
                                </h2>
                            </div>

                            {/* Options */}
                            <div className="space-y-4">
                                {question.responses.map((option, optionIndex) => {
                                    const isSelected = userAnswers[question.id] === optionIndex;

                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => handleAnswerSelect(question.id, optionIndex)}
                                            className={`
                                                w-full p-5 rounded-2xl border-2 transition-all duration-300 
                                                hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
                                                text-left relative overflow-hidden
                                                ${isSelected
                                                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500 text-blue-900 shadow-md'
                                                    : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center">
                                                <div className={`
                                                    w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200
                                                    ${isSelected
                                                        ? 'border-blue-500 bg-blue-500 shadow-sm'
                                                        : 'border-gray-300 group-hover:border-gray-400'
                                                    }
                                                `}>
                                                    {isSelected && (
                                                        <Check className="w-3 h-3 text-white animate-fade-in" />
                                                    )}
                                                </div>
                                                <span className="font-medium text-base text-gray-800 group-hover:text-gray-900">
                                                    {option.libelle}
                                                </span>
                                            </div>

                                            {isSelected && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky bottom-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div className="flex items-center text-gray-600 bg-gray-50 rounded-2xl px-4 py-3">
                            <Clock className="w-5 h-5 mr-3 text-blue-600" />
                            <span className="text-sm font-medium">No time limit • Take your time</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            {!isQuizComplete() && (
                                <div className="flex items-center bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-200">
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    <span className="text-sm font-medium">
                                        Answer all questions ({getAnsweredCount()}/{questions.length})
                                    </span>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                    Save Progress
                                </button>
                                <button
                                    onClick={handleSubmitQuiz}
                                    disabled={!isQuizComplete()}
                                    className={`
                                        px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl 
                                        transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97]
                                        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                                        ${isQuizComplete()
                                            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700'
                                            : 'bg-gray-300'
                                        }
                                    `}
                                >
                                    Submit Quiz
                                </button>
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