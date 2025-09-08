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

    const [quiz, setQuiz] = useState<Quiz | undefined>();
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

        quiz.nbRepCorrect = correctAnswers; // Assuming Quiz has a nbRepCorrectes property
        quiz.score = score; // Assuming Quiz has a score property
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

            {/* Header */}
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
                {/* Title + Icon */}
                <div className="flex items-start gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Quiz</h1>
                        <p className="text-gray-600 text-sm mt-1">Test your knowledge</p>
                    </div>
                </div>

                {/* Progress Stat */}
                <div className="text-center flex flex-col justify-center">
                    <div className="text-3xl font-bold text-gray-900">{getAnsweredCount()}/{questions.length}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Completed</div>
                </div>

                {/* Progress Bar */}
                <div className="flex flex-col justify-center">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                        <span>Progress</span>
                        <span className="font-bold">{getCompletionPercentage()}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700"
                            style={{ width: `${getCompletionPercentage()}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-4">



                {/* Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {questions.map((question, index) => (
                        <div
                            key={question.id}
                            className="bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8 relative overflow-hidden group hover:border-gray-300 hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-0.5"

                        >
                            {/* Header */}
                            <div className="relative mb-6">
                                <div className="flex items-center gap-3 mb-5">
                                    {/* Step Badge — Elegant, glassmorphic feel */}
                                    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold shadow-sm">
                                        {index + 1}
                                    </div>
                                    {/* Tag — Modern, soft color */}
                                    <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                                        Question
                                    </span>
                                </div>

                                {/* Question Title — Improved spacing & typography */}
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
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
            w-full p-4 rounded-xl border transition-all duration-300 group/button
            relative overflow-hidden
            ${isSelected
                                                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-900 shadow-md'
                                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                                                }
            hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          `}
                                        >
                                            {/* Selection Background Overlay (Subtle) */}
                                            {isSelected && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 pointer-events-none"></div>
                                            )}

                                            <div className="flex items-center">
                                                {/* ✅ Redesigned Select Box — Smooth, tactile, beautiful */}
                                                <div
                                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 relative
                                                        ${isSelected
                                                            ? 'border-blue-500 bg-blue-500 scale-105 shadow-inner shadow-blue-300/30'
                                                            : 'border-gray-300 group-hover/button:border-gray-400'
                                                        }`}
                                                >

                                                </div>

                                                {/* Option Label */}
                                                <span className="font-medium text-sm sm:text-base ml-4">
                                                    {option.libelle}
                                                </span>


                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50/30 to-blue-50/30"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="text-sm font-medium">No time limit • Take your time</span>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium hover:shadow-md text-sm">
                                Save Progress
                            </button>
                            {!isQuizComplete() && (
                                <div className="text-sm text-amber-600 flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    Please answer all questions ({getAnsweredCount()}/{questions.length})
                                </div>
                            )}
                            <button
                                onClick={handleSubmitQuiz}
                                disabled={!isQuizComplete()}
                                className={`px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm ${isQuizComplete()
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Submit Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default QuizPage;
